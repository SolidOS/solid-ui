/**
 * Contains the [[AccessController]] class
 * @packageDocumentation
 */

import { adoptACLDefault, getProspectiveHolder, makeACLGraphbyCombo, sameACL } from './acl'
import { fetcher, graph, NamedNode, UpdateManager } from 'rdflib'
import { AccessGroups } from './access-groups'
import { DataBrowserContext } from 'pane-registry'
import { shortNameForFolder } from './acl-control'
import * as utils from '../utils'
import * as debug from '../debug'
import { style } from '../style'

/**
 * Rendered HTML component used in the databrowser's Sharing pane.
 */
export class AccessController {
  public mainCombo: AccessGroups
  public defaultsCombo: AccessGroups | null
  private readonly isContainer: boolean
  private defaultsDiffer: boolean
  private readonly rootElement: HTMLDivElement
  private isUsingDefaults: boolean

  constructor (
    public subject: NamedNode,
    public noun: string,
    public context: DataBrowserContext,
    private statusElement: HTMLElement,
    public targetIsProtected: boolean,
    private targetDoc: NamedNode,
    private targetACLDoc: NamedNode,
    private defaultHolder: NamedNode | null,
    private defaultACLDoc: NamedNode | null,
    private prospectiveDefaultHolder: NamedNode | undefined,
    public store,
    public dom: HTMLDocument
  ) {
    this.rootElement = dom.createElement('div')
    this.rootElement.setAttribute('style', style.aclGroupContent)
    this.isContainer = targetDoc.uri.slice(-1) === '/' // Give default for all directories
    if (defaultHolder && defaultACLDoc) {
      this.isUsingDefaults = true
      const aclDefaultStore = adoptACLDefault(this.targetDoc, targetACLDoc, defaultHolder, defaultACLDoc)
      this.mainCombo = new AccessGroups(targetDoc, targetACLDoc, this, aclDefaultStore, { defaults: this.isContainer })
      this.defaultsCombo = null
      this.defaultsDiffer = false
    } else {
      this.isUsingDefaults = false
      this.mainCombo = new AccessGroups(targetDoc, targetACLDoc, this, store)
      this.defaultsCombo = new AccessGroups(targetDoc, targetACLDoc, this, store, { defaults: this.isContainer })
      this.defaultsDiffer = !sameACL(this.mainCombo.aclMap, this.defaultsCombo.aclMap)
    }
  }

  public get isEditable (): boolean {
    return !this.isUsingDefaults
  }

  public render (): HTMLElement {
    this.rootElement.innerHTML = ''
    if (this.isUsingDefaults) {
      this.renderStatus(`The sharing for this ${this.noun} is the default for folder `)
      if (this.defaultHolder) {
        const defaultHolderLink = this.statusElement.appendChild(this.dom.createElement('a'))
        defaultHolderLink.href = this.defaultHolder.uri
        defaultHolderLink.innerText = shortNameForFolder(this.defaultHolder)
      }
    } else if (!this.defaultsDiffer && this.isContainer) {
      this.renderStatus('This is also the default for things in this folder.')
    } else {
      this.renderStatus('')
    }
    this.rootElement.appendChild(this.mainCombo.render())
    if (this.defaultsCombo && this.defaultsDiffer) {
      this.rootElement.appendChild(this.renderRemoveDefaultsController())
      this.rootElement.appendChild(this.defaultsCombo.render())
    } else if (this.isEditable && this.isContainer) {
      this.rootElement.appendChild(this.renderAddDefaultsController())
    }
    if (!this.targetIsProtected && this.isUsingDefaults) {
      this.rootElement.appendChild(this.renderAddAclsController())
    } else if (!this.targetIsProtected) {
      this.rootElement.appendChild(this.renderRemoveAclsController())
    }
    return this.rootElement
  }

  private renderRemoveAclsController (): HTMLElement {
    const useDefaultButton = this.dom.createElement('button')
    useDefaultButton.innerText = `Remove custom sharing settings for this ${this.noun} -- just use default${this.prospectiveDefaultHolder ? ` for ${utils.label(this.prospectiveDefaultHolder)}` : ''}`
    useDefaultButton.setAttribute('style', style.bigButton)
    useDefaultButton.addEventListener('click', () => this.removeAcls()
      .then(() => this.render())
      .catch(error => this.renderStatus(error)))
    return useDefaultButton
  }

  private renderAddAclsController (): HTMLElement {
    const addAclButton = this.dom.createElement('button')
    addAclButton.innerText = `Set specific sharing for this ${this.noun}`
    addAclButton.setAttribute('style', style.bigButton)
    addAclButton.addEventListener('click', () => this.addAcls()
      .then(() => this.render())
      .catch(error => this.renderStatus(error)))
    return addAclButton
  }

  private renderAddDefaultsController (): HTMLElement {
    const containerElement = this.dom.createElement('div')
    containerElement.setAttribute('style', style.defaultsController)

    const noticeElement = containerElement.appendChild(this.dom.createElement('div'))
    noticeElement.innerText = 'Sharing for things within the folder currently tracks sharing for the folder.'
    noticeElement.setAttribute('style', style.defaultsControllerNotice)

    const button = containerElement.appendChild(this.dom.createElement('button'))
    button.innerText = 'Set the sharing of folder contents separately from the sharing for the folder'
    button.setAttribute('style', style.bigButton)
    button.addEventListener('click', () => this.addDefaults()
      .then(() => this.render()))
    return containerElement
  }

  private renderRemoveDefaultsController (): HTMLElement {
    const containerElement = this.dom.createElement('div')
    containerElement.setAttribute('style', style.defaultsController)

    const noticeElement = containerElement.appendChild(this.dom.createElement('div'))
    noticeElement.innerText = 'Access to things within this folder:'
    noticeElement.setAttribute('style', style.defaultsControllerNotice)

    const button = containerElement.appendChild(this.dom.createElement('button'))
    button.innerText = 'Set default for folder contents to just track the sharing for the folder'
    button.setAttribute('style', style.bigButton)
    button.addEventListener('click', () => this.removeDefaults()
      .then(() => this.render())
      .catch(error => this.renderStatus(error)))
    return containerElement
  }

  public renderTemporaryStatus (message: string): void {
    // @@ TODO Introduce better system for error notification to user https://github.com/solidos/mashlib/issues/87
    this.statusElement.setAttribute('style', style.aclControlBoxStatusRevealed)
    this.statusElement.innerText = message
    this.statusElement.setAttribute('style', style.temporaryStatusInit)
    setTimeout(() => {
      this.statusElement.setAttribute('style', style.temporaryStatusEnd)
    })
    setTimeout(() => {
      this.statusElement.innerText = ''
    }, 5000)
  }

  public renderStatus (message: string): void {
    // @@ TODO Introduce better system for error notification to user https://github.com/solidos/mashlib/issues/87
    if (!message) {
      this.statusElement.setAttribute('style', style.aclControlBoxStatusRevealed)
    }
    this.statusElement.innerText = message
  }

  private async addAcls (): Promise<void> {
    if (!this.defaultHolder || !this.defaultACLDoc) {
      const message = 'Unable to find defaults to copy'
      debug.error(message)
      return Promise.reject(message)
    }
    const aclGraph = adoptACLDefault(this.targetDoc, this.targetACLDoc, this.defaultHolder, this.defaultACLDoc)
    aclGraph.statements.forEach(st => this.store.add(st.subject, st.predicate, st.object, this.targetACLDoc))
    try {
      await this.store.fetcher.putBack(this.targetACLDoc)
      this.isUsingDefaults = false
      return Promise.resolve()
    } catch (error) {
      const message = ` Error writing back access control file! ${error}`
      debug.error(message)
      return Promise.reject(message)
    }
  }

  private async addDefaults (): Promise<void> {
    this.defaultsCombo = new AccessGroups(this.targetDoc, this.targetACLDoc, this, this.store, { defaults: true })
    this.defaultsDiffer = true
  }

  private async removeAcls (): Promise<void> {
    try {
      await this.store.fetcher.delete(this.targetACLDoc.uri, {})
      this.isUsingDefaults = true
      try {
        this.prospectiveDefaultHolder = await getProspectiveHolder(this.targetDoc.uri)
      } catch (error) {
        // No need to show this error in status, but good to warn about it in console
        debug.warn(error)
      }
    } catch (error) {
      const message = `Error deleting access control file: ${this.targetACLDoc}: ${error}`
      debug.error(message)
      return Promise.reject(message)
    }
  }

  private async removeDefaults (): Promise<void> {
    const fallbackCombo = this.defaultsCombo
    try {
      this.defaultsCombo = null
      this.defaultsDiffer = false
      await this.save()
    } catch (error) {
      this.defaultsCombo = fallbackCombo
      this.defaultsDiffer = true
      debug.error(error)
      return Promise.reject(error)
    }
  }

  public save (): Promise<void> {
    // build graph
    const newAClGraph = graph()
    if (!this.isContainer) {
      makeACLGraphbyCombo(newAClGraph, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, true)
    } else if (this.defaultsCombo && this.defaultsDiffer) {
      // Pair of controls
      makeACLGraphbyCombo(newAClGraph, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, true)
      makeACLGraphbyCombo(newAClGraph, this.targetDoc, this.defaultsCombo.byCombo, this.targetACLDoc, false, true)
    } else {
      // Linked controls
      makeACLGraphbyCombo(newAClGraph, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, true, true)
    }

    // add authenticated fetcher
    newAClGraph.fetcher = fetcher(newAClGraph, { fetch: this.store.fetcher._fetch })
    const updater = newAClGraph.updater || new UpdateManager(newAClGraph)

    // save ACL resource
    return new Promise((resolve, reject) => {
      updater.put(
        this.targetACLDoc,
        newAClGraph.statementsMatching(undefined, undefined, undefined, this.targetACLDoc),
        'text/turtle',
        (uri, ok, message) => {
          if (!ok) {
            return reject(new Error(`ACL file save failed: ${message}`))
          }
          this.store.fetcher.unload(this.targetACLDoc)
          this.store.add(newAClGraph.statements)
          this.store.fetcher.requested[this.targetACLDoc.uri] = 'done' // missing: save headers
          this.mainCombo.store = this.store
          if (this.defaultsCombo) {
            this.defaultsCombo.store = this.store
          }
          this.defaultsDiffer = !!this.defaultsCombo && !sameACL(this.mainCombo.aclMap, this.defaultsCombo.aclMap)
          debug.log('ACL modification: success!')
          resolve()
        }
      )
    })
  }
}
