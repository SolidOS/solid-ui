import { Fetcher, NamedNode, Store, sym, UpdateManager } from 'rdflib'
import { ACL_LINK } from 'solid-logic'
import ns from '../../lib/ns'
import { ACLResult, Permission } from './types'
import { ACLMode, Mode } from './constants'
import { ACL_MODE_TO_PERMISSION, ACL_PRED_TO_PERMISSION } from './constants'

export class AccessControlService {
  store: Store
  fetcher: Fetcher
  updater!: UpdateManager

  constructor(store: Store, fetcher: Fetcher, updater: UpdateManager) {
    this.store = store
    this.fetcher = fetcher
    this.updater = updater
  }

  async isPublic(resource: NamedNode): Promise<boolean> {
    console.log("resource", resource)
    const acl = await this.getACLorDefault(resource)
    console.log("acl", acl)
    const permissions = await this.readACL(acl as unknown as NamedNode, true)
    console.log("permissions", JSON.stringify(permissions))
    return permissions.some(permission => permission.type === 'agentClass' && permission.target.uri === ns.foaf('Agent').uri && permission.modes.includes(Mode.Read))
  }

  // Placeholder for access control logic, e.g., checking user permissions, roles, etc.
  hasAccess(userId: string, resource: string, mode: ACLMode): boolean {
    // Implement access control logic here
    return true // Placeholder return value
  }

  private async getACL (
    doc: NamedNode
  ): Promise<ACLResult> {

    if (!this.fetcher) {
      throw new Error('kb has no fetcher')
    }

    try {
      const response = await this.fetcher.load(doc, { force: true })
      if (!response.ok) {
        return { kind: 'error', status: response.status, message: `Can't get headers to find ACL for ${doc}: ${response.statusText}` }
      }

      const aclDoc = this.store.any(doc, ACL_LINK) as NamedNode | undefined

      if (!aclDoc) {
        return { kind: 'missing', message: `No Link rel=ACL header for ${doc}` }
      }
      if (this.fetcher.nonexistent[aclDoc.value]) {
        return { kind: 'missing', message: `ACL file ${aclDoc} does not exist.` }
      }

      const aclResponse = await this.fetcher.load(aclDoc, { force: true })
      if (!aclResponse.ok) {
        return { kind: 'error', status: aclResponse.status, message: `Can't read Access Control File ${aclDoc}: ${aclResponse.statusText}` }
      }
      return { kind: 'found', acl: aclDoc }
    } catch (error) {
      return { kind: 'error', message: `Error fetching ${doc}: ${error}` }
    } 
  }

  // Recursively search for the ACL file which gives default access
  private async tryParentForACL (uri: string): Promise<ACLResult> {
    if (uri.slice(-1) === '/') {
      uri = uri.slice(0, -1)
    }
    const right = uri.lastIndexOf('/')
    const left = uri.indexOf('/', uri.indexOf('//') + 2)
    if (left > right) {
      return { kind: 'missing', message: `No ACL found for ${uri}` }
    }
    uri = uri.slice(0, right + 1)
    const doc2 = sym(uri)
    const response = await this.getACL(doc2)
    switch (response.kind) {
      case 'found':
        const defaults = this.store
          .each(undefined, ns.acl('default'), doc2, response.acl)
          .concat(this.store.each(undefined, ns.acl('defaultForNew'), doc2, response.acl))
        if (!defaults.length) {
          return this.tryParentForACL(uri)
        }
        return response
      case 'missing':
        return this.tryParentForACL(uri)
      case 'error':
        return response
    }
  }

  // Flow:
  // 1. Ask getACL() for the resource's own ACL document.
  // 2. If the resource has a direct ACL link, return it.
  // 3. If the ACL is missing, walk up parent containers until a default ACL is found.
  // 4. Treat 403 as forbidden and surface other errors as-is.
  async getACLorDefault (doc: NamedNode): Promise<NamedNode> {
    const response = await this.getACL(doc)
    switch (response.kind) {
      case 'found':
        return response.acl
      case 'missing':
        const parentResponse = await this.tryParentForACL(doc.uri)
        if (parentResponse.kind === 'found') {
          return parentResponse.acl
        } else {
          throw new Error(`No ACL found for ${doc.uri} and no default ACL found in parent directories.`)
        }
      case 'error':
        switch (response.status) {
          case 403:
            throw new Error(`Access to ACL for ${doc.uri} is forbidden: ${response.message}`)
          case 404:
            const parentResponse = await this.tryParentForACL(doc.uri)
            if (parentResponse.kind === 'found') {
              return parentResponse.acl
            } else {
              throw new Error(`No ACL found for ${doc.uri} and no default ACL found in parent directories.`)
            }
          default:
            throw new Error(`Error accessing ACL for ${doc.uri}: ${response.message}`)
        }
    }
  }
      
  /* initially copied from acl/acl.ts (readACL) adapted for the service */
  /* Notes: need to test again but if there is no specific ACL for the resource
  it comes back with a 404 and doesn't display the container acl details.
  when you say default true (when there is already a resource specific acl
  it shows the default ACL instead of the specific one)
  I feel like this should happen even when there isn't a specific
  acl for the resource. */
  async readACL(doc: NamedNode, getDefaults: boolean = false): Promise<Permission[]> {
    const auths: Array<NamedNode> = getDefaults
      ? getDefaultsFallback(this.store, doc)
      : this.store.each(undefined, ns.acl('accessTo'), doc) as Array<NamedNode>

    console.log('auths', JSON.stringify(auths, null, 2)) 

    const permissions: Permission[] = []

    ;['agent', 'agentClass', 'agentGroup', 'origin', 'originClass'].forEach((pred) => {
      auths.forEach((authorization) => {
        const subjects = this.store.each(authorization, ns.acl(pred)) as Array<NamedNode>
        if (!subjects.length) return

        const modes = (this.store.each(authorization, ns.acl('mode')) as Array<NamedNode>)
          .map((modeNode) => ACL_MODE_TO_PERMISSION[modeNode.uri])
          .filter((mode): mode is ACLMode => Boolean(mode))

        if (!modes.length) return
        const permissionType = ACL_PRED_TO_PERMISSION[pred]
        if (!permissionType) return

        subjects.forEach((subject) => {
          permissions.push({
            type: permissionType,
            target: subject,
            modes
          })
        })
      })
    })

    return permissions
  }
}

function getDefaultsFallback(kb: Store, doc: NamedNode): Array<NamedNode> {
  return (
    kb.each(undefined, ns.acl('default'), doc) as Array<NamedNode>
  ).concat(kb.each(undefined, ns.acl('defaultForNew'), doc) as Array<NamedNode>)
}
