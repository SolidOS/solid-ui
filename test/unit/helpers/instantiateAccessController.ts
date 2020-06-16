import { AccessController } from '../../../src/acl/access-controller'
import { createDataBrowserContext } from './createDataBrowserContext'
import { sym } from 'rdflib'
import { LiveStore } from 'pane-registry'

export function instantiateAccessController (dom: HTMLDocument, store: LiveStore) {
  const subject = sym('https://test.test#')
  const noun = ''
  const context = createDataBrowserContext(dom, store)
  const statusElement = dom.createElement('div')
  const classes = {}
  const targetIsProtected = false
  const targetDoc = sym('https://test.test#')
  const targetACLDoc = sym('https://test.test#')
  const defaultHolder = sym('https://test.test#')
  const defaultACLDoc = sym('https://test.test#')
  const prospectiveDefaultHolder = sym('https://test.test#')
  return new AccessController(
    subject,
    noun,
    context,
    statusElement,
    classes,
    targetIsProtected,
    targetDoc,
    targetACLDoc,
    defaultHolder,
    defaultACLDoc,
    prospectiveDefaultHolder,
    store,
    dom
  )
}
