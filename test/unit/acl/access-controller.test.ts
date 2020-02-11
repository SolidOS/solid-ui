import * as RdfLib from 'rdflib'
import { JSDOM } from 'jsdom'

import { AccessController } from '../../../src/acl/access-controller'
import { DataBrowserContext } from 'pane-registry'
jest.mock('rdflib')
jest.mock('solid-auth-client')
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

function instantiateAccessController () {
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
    // FIXME: how can we test that it's actually a constructor?
    expect(AccessController).toBeInstanceOf(Function)
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
