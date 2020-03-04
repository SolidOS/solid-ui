import { AccessController } from '../../../src/acl/access-controller'
import { createDataBrowserContext } from './createDataBrowserContext'
import { IndexedFormula, sym } from 'rdflib'

export function instantiateAccessController (dom: HTMLDocument, store: IndexedFormula) {
  const subject = sym('')
  const noun = ''
  const context = createDataBrowserContext(dom, store)
  const statusElement = dom.createElement('div')
  const classes = {}
  const targetIsProtected = false
  const targetDoc = sym('')
  const targetACLDoc = sym('')
  const defaultHolder = sym('')
  const defaultACLDoc = sym('')
  const prospectiveDefaultHolder = sym('')
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
