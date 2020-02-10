jest.mock('rdflib')
// import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
// import * as SolidAuthClient from 'solid-auth-client'
// import { DataBrowserContext } from 'pane-registry'
const AccessController = require('../../../src/acl/access-controller')
// just a note that the only public functions are isEditable, render, and save
describe('AccessController', () => {
  debugger
  it('exists', () => {
    expect(AccessController).toBeTruthy()
  })
  /* leaving this for now
  const subject = new RdfLib.NamedNode('testing')
  const noun = 'noun'
  const  context = new DataBrowserContext()
  const  statusElement = HTMLElement
  const  classes = new Record<'test','test'>
  const targetIsProtected= false
  const targetDoc = new RdfLib.NamedNode('testing')
  const targetACLDoc = new RdfLib.NamedNode('testing')
  const  defaultHolder = null
  const   defaultACLDoc = null
  const  prospectiveDefaultHolder = undefined
  const  store
  const  dom
  const controller = new AccessController(subject, noun, context, statusElement, classes, targetIsProtected, targetDoc, targetACLDoc, defaultHolder, defaultACLDoc, prospectiveDefaultHolder, store, dom);
  it('exists', () => {
    expect(controller.isEditable()).
  }) */
})
