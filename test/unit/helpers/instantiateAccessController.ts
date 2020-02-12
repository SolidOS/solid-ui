import * as RdfLib from 'rdflib'
import { JSDOM } from 'jsdom'
import { DataBrowserContext } from 'pane-registry'
import { AccessController } from '../../../src/acl/access-controller'

jest.mock('rdflib')
jest.mock('solid-auth-client')
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

export function instantiateAccessController () {
  const subject = RdfLib.sym('')
  const noun = ''
  const context = {} as DataBrowserContext
  const statusElement = dom.createElement('div')
  const classes = {}
  const targetIsProtected = false
  const targetDoc = RdfLib.sym('')
  const targetACLDoc = RdfLib.sym('')
  const defaultHolder = RdfLib.sym('')
  const defaultACLDoc = RdfLib.sym('')
  const prospectiveDefaultHolder = RdfLib.sym('')
  const store = {}
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
