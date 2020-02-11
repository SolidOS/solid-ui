import { AccessGroups, AccessGroupsOptions } from '../../../src/acl/access-groups'
import { NamedNode, IndexedFormula, graph } from 'rdflib'
import { AccessController } from '../../../src/acl/access-controller'
import { JSDOM } from 'jsdom'
import { instantiateAccessController } from './access-controller.test'

jest.mock('rdflib')
jest.mock('solid-auth-client')
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

function instantiateAccessGroups () {
  return new AccessGroups(
    {} as NamedNode,
    {} as NamedNode,
    instantiateAccessController(),
    graph() as IndexedFormula,
    {} as AccessGroupsOptions)
}
describe('AccessGroups', () => {
  it('exists', () => {
    expect(AccessGroups).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(instantiateAccessGroups()).toBeTruthy()
  })
})

describe('AccessGroups#store', () => {
  it.skip('has a getter', () => {
    expect(instantiateAccessGroups().store).toBeInstanceOf(IndexedFormula)
  })
  it.skip('has a setter', () => {
    const groups = instantiateAccessGroups()
    groups.store
    const newStore = graph()
    ;(newStore as any).foo = 'bar'
    expect((groups.store as any).foo).toEqual('bar')
  })
})

describe('AccessGroups#render', () => {
  it('exists', () => {
    expect(instantiateAccessGroups().render).toBeInstanceOf(Function)
  })
  it.skip('runs', () => {
    expect(instantiateAccessGroups().render()).toBeInstanceOf(HTMLDivElement)
  })
})

describe('AccessGroups#addNewURI', () => {
  it('exists', () => {
    expect(instantiateAccessGroups().addNewURI).toBeInstanceOf(Function)
  })
  it.skip('runs', async () => {
    expect(await instantiateAccessGroups().addNewURI('')).toEqual(undefined)
  })
})
