import { LiveStore, sym } from 'rdflib'
import { AccessGroups } from '../../../src/acl/access-groups'
import { instantiateAccessController } from './instantiateAccessController'

export function instantiateAccessGroups (dom: HTMLDocument, store: LiveStore) {
  return new AccessGroups(
    sym('http://test.test/doc'),
    sym('http://test.test/doc.acl'),
    instantiateAccessController(dom, store),
    store,
    {})
}
