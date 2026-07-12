import { Fetcher, NamedNode, Store, UpdateManager } from 'rdflib'
import ns from '../../lib/ns'
import { Mode, Permission } from './types'
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

  // Placeholder for access control logic, e.g., checking user permissions, roles, etc.
  hasAccess(userId: string, resource: string): boolean {
    // Implement access control logic here
    return true // Placeholder return value
  }

  /* initially copied from acl/acl.ts (readACL) adapted for the service */
  /* Notes: need to test again but if there is no specific ACL for the resource
  it comes back with a 404 and doesn't display the container acl details.
  when you say default true (when there is already a resource specific acl
  it shows the default ACL instead of the specific one)
  I feel like this should happen even when there isn't a specific
  acl for the resource. */
  readACL(doc: NamedNode, getDefaults: boolean = false): Permission[] {
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
          .filter((mode): mode is Mode => Boolean(mode))

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
