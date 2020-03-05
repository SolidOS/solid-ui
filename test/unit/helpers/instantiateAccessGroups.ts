import { NamedNode, graph, IndexedFormula } from 'rdflib'
import { AccessGroups, AccessGroupsOptions } from '../../../src/acl/access-groups'
import { instantiateAccessController } from './instantiateAccessController'

export function instantiateAccessGroups (dom: HTMLDocument, store: IndexedFormula) {
  return new AccessGroups(
    {} as NamedNode,
    {} as NamedNode,
    instantiateAccessController(dom, store),
    graph() as IndexedFormula,
    {} as AccessGroupsOptions)
}
