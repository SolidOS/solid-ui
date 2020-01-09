import { adoptACLDefault, getProspectiveHolder, makeACLGraphbyCombo, sameACL } from './acl'
import { graph, NamedNode, UpdateManager } from 'rdflib'
import ns from '../ns'
import { AccessGroups } from './access-groups'
import { DataBrowserContext } from 'pane-registry'
import { shortNameForFolder } from './acl-control'
import utils from '../utils.js'

const ACL = ns.acl

export class AccessController {
  public mainCombo: AccessGroups
  public defaultsCombo: AccessGroups | null
  private readonly isContainer: boolean
  private defaultsDiffer: boolean
  private readonly root: HTMLElement
  private isUsingDefaults: boolean

  constructor (
    public subject: NamedNode,
    public noun: string,
    public context: DataBrowserContext,
    private status: HTMLElement,
    public classes: Record<string, string>,
    public targetIsProtected: boolean,
    private targetDoc: NamedNode,
    private targetACLDoc: NamedNode,
    private defaultHolder: NamedNode | null,
    private defaultACLDoc: NamedNode | null,
    private prospectiveDefaultHolder: NamedNode | undefined,
    public store,
    public dom
  ) {
    this.root = dom.createElement('div')
    this.root.classList.add(classes.aclGroupContent)
    this.isContainer = targetDoc.uri.slice(-1) === '/' // Give default for all directories
    if (defaultHolder && defaultACLDoc) {
      this.isUsingDefaults = true
      const aclDefaultStore = adoptACLDefault(this.targetDoc, targetACLDoc, defaultHolder, defaultACLDoc)
      this.mainCombo = new AccessGroups(targetDoc, targetACLDoc, this, aclDefaultStore, { defaults: true })
      this.defaultsCombo = null
      this.defaultsDiffer = false
    } else {
      this.isUsingDefaults = false
      this.mainCombo = new AccessGroups(targetDoc, targetACLDoc, this, store)
      this.defaultsCombo = new AccessGroups(targetDoc, targetACLDoc, this, store, { defaults: true })
      this.defaultsDiffer = !sameACL(this.mainCombo.aclMap, this.defaultsCombo.aclMap)
    }
  }

  public get isEditable (): boolean {
    return !this.isUsingDefaults
  }

  public render (): HTMLElement {
    this.root.innerHTML = ''
    if (this.isUsingDefaults) {
      this.renderStatus(`The sharing for this ${this.noun} is the default for folder `)
      if (this.defaultHolder) {
        const defaultHolderLink = this.status.appendChild(this.dom.createElement('a'))
        defaultHolderLink.href = this.defaultHolder.uri
        defaultHolderLink.innerText = shortNameForFolder(this.defaultHolder)
      }
    } else if (!this.defaultsDiffer) {
      this.renderStatus('This is also the default for things in this folder.')
    } else {
      this.renderStatus('')
    }
    this.root.appendChild(this.mainCombo.render())
    if (this.defaultsCombo && this.defaultsDiffer) {
      this.root.appendChild(this.renderRemoveDefaultsController())
      this.root.appendChild(this.defaultsCombo.render())
    } else if (this.isEditable) {
      this.root.appendChild(this.renderAddDefaultsController())
    }
    if (!this.targetIsProtected && this.isUsingDefaults) {
      this.root.appendChild(this.renderAddAclsController())
    } else if (!this.targetIsProtected) {
      this.root.appendChild(this.renderRemoveAclsController())
    }
    return this.root
  }

  private renderRemoveAclsController (): HTMLElement {
    const useDefaultButton = this.dom.createElement('button')
    useDefaultButton.innerText = `Stop specific sharing for this ${this.noun} -- just use default${this.prospectiveDefaultHolder ? ` for ${utils.label(this.prospectiveDefaultHolder)}` : ''}`
    useDefaultButton.classList.add(this.classes.bigButton)
    useDefaultButton.addEventListener('click', () => this.removeAcls()
      .then(() => this.render())
      .catch(error => this.renderStatus(error)))
    return useDefaultButton
  }

  private renderAddAclsController (): HTMLElement {
    const addAclButton = this.dom.createElement('button')
    addAclButton.innerText = `Set specific sharing for this ${this.noun}`
    addAclButton.classList.add(this.classes.bigButton)
    addAclButton.addEventListener('click', () => this.addAcls()
      .then(() => this.render())
      .catch(error => this.renderStatus(error)))
    return addAclButton
  }

  private renderAddDefaultsController (): HTMLElement {
    const addDefaults = this.dom.createElement('div')
    addDefaults.classList.add(this.classes.defaultsController)

    const notice = addDefaults.appendChild(this.dom.createElement('div'))
    notice.innerText = 'Sharing for things within the folder currently tracks sharing for the folder.'
    notice.classList.add(this.classes.defaultsControllerNotice)

    const button = addDefaults.appendChild(this.dom.createElement('button'))
    button.innerText = 'Set the sharing of folder contents separately from the sharing for the folder'
    button.classList.add(this.classes.bigButton)
    button.addEventListener('click', () => this.addDefaults()
      .then(() => this.render()))
    return addDefaults
  }

  private renderRemoveDefaultsController (): HTMLElement {
    const removeDefaults = this.dom.createElement('div')
    removeDefaults.classList.add(this.classes.defaultsController)

    const notice = removeDefaults.appendChild(this.dom.createElement('div'))
    notice.innerText = 'Access to things within this folder:'
    notice.classList.add(this.classes.defaultsControllerNotice)

    const button = removeDefaults.appendChild(this.dom.createElement('button'))
    button.innerText = 'Set default for folder contents to just track the sharing for the folder'
    button.classList.add(this.classes.bigButton)
    button.addEventListener('click', () => this.removeDefaults()
      .then(() => this.render())
      .catch(error => this.renderStatus(error)))
    return removeDefaults
  }

  public renderTemporaryStatus (message: string): void {
    // @@ TODO Introduce better system for error notification to user https://github.com/solid/mashlib/issues/87
    this.status.classList.add(this.classes.aclControlBoxStatusRevealed)
    this.status.innerText = message
    this.status.classList.add(this.classes.temporaryStatusInit)
    setTimeout(() => {
      this.status.classList.add(this.classes.temporaryStatusEnd)
    })
    setTimeout(() => {
      this.status.innerText = ''
    }, 5000)
  }

  public renderStatus (message: string): void {
    // @@ TODO Introduce better system for error notification to user https://github.com/solid/mashlib/issues/87
    this.status.classList.toggle(this.classes.aclControlBoxStatusRevealed, !!message)
    this.status.innerText = message
  }

  private async addAcls (): Promise<void> {
    if (!this.defaultHolder || !this.defaultACLDoc) {
      const message = 'Unable to find defaults to copy'
      console.error(message)
      return Promise.reject(message)
    }
    const aclGraph = adoptACLDefault(this.targetDoc, this.targetACLDoc, this.defaultHolder, this.defaultACLDoc)
    aclGraph.statements.forEach(st => this.store.add(st.subject, st.predicate as NamedNode, st.object, this.targetACLDoc))
    try {
      await this.store.fetcher.putBack(this.targetACLDoc)
      this.isUsingDefaults = false
      return Promise.resolve()
    } catch (error) {
      const message = ` Error writing back access control file! ${error}`
      console.error(message)
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
        console.warn(error)
      }
    } catch (error) {
      const message = `Error deleting access control file: ${this.targetACLDoc}: ${error}`
      console.error(message)
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
      console.error(error)
      return Promise.reject(error)
    }
  }

  public save (): Promise<void> {
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
    const updater = newAClGraph.updater || new UpdateManager(newAClGraph)
    return new Promise((resolve, reject) => updater.put(
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
        this.mainCombo.updateStore(this.store)
        if (this.defaultsCombo) {
          this.defaultsCombo.updateStore(this.store)
        }
        this.defaultsDiffer = !!this.defaultsCombo && !sameACL(this.mainCombo.aclMap, this.defaultsCombo.aclMap)
        console.log('ACL modification: success!')
        resolve()
      }
    ))
  }
}
