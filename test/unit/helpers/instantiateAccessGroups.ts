import { NamedNode, graph, IndexedFormula } from 'rdflib'
import { AccessGroups, AccessGroupsOptions } from '../../../src/acl/access-groups'
import { instantiateAccessController } from './instantiateAccessController'

export function instantiateAccessGroups () {
  return new AccessGroups(
    {} as NamedNode,
    {} as NamedNode,
    instantiateAccessController(),
    graph() as IndexedFormula,
    {} as AccessGroupsOptions)
}
