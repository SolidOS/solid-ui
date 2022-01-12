import { sym } from 'rdflib'
import { AccessGroups } from '../../../src/acl/access-groups'
import { instantiateAccessController } from './instantiateAccessController'
import { LiveStore } from 'solid-logic'

export function instantiateAccessGroups (dom: HTMLDocument, store: LiveStore) {
  return new AccessGroups(
    sym('http://test.test/doc'),
    sym('http://test.test/doc.acl'),
    instantiateAccessController(dom, store),
    store,
    {})
}
