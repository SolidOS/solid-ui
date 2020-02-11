jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

import { AccessController } from '../../../src/acl/access-controller'
import { DataBrowserContext } from 'pane-registry'

function instantiateAccessController() {
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
describe('AccessController', () => {
  it('exists', () => {
    expect(AccessController).toBeTruthy()
  })
  it('runs', () => {
    expect(instantiateAccessController()).toBeInstanceOf(AccessController)
  })
})

describe('AccessController#isEditable', () => {
  it('exists', () => {
    expect(instantiateAccessController().isEditable).toEqual(false)
  })
})

describe('AccessController#render', () => {
  it('exists', () => {
    expect(instantiateAccessController().render).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(instantiateAccessController().render()).toBeTruthy()
  })
})

describe('AccessController#renderTemporaryStatus', () => {
  it('exists', () => {
    expect(instantiateAccessController().renderTemporaryStatus).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(instantiateAccessController().renderTemporaryStatus('')).toEqual(undefined)
  })
})


describe('AccessController#renderStatus', () => {
  it('exists', () => {
    expect(instantiateAccessController().renderStatus).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(instantiateAccessController().renderStatus('')).toEqual(undefined)
  })
})


describe('AccessController#save', () => {
  it('exists', () => {
    expect(instantiateAccessController().save).toBeInstanceOf(Function)
  })
  it('runs', async () => {
    expect(instantiateAccessController().save()).resolves.toEqual(undefined)
  })
})

