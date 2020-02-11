import { JSDOM } from 'jsdom'
import { AddAgentButtons } from '../../../src/acl/add-agent-buttons'
import { AccessGroups } from '../../../src/acl/access-groups'

jest.mock('rdflib')
jest.mock('solid-auth-client')
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

function instantiateAddAgentButtons () {
  return new AddAgentButtons({
    controller: {
      dom
    }
  } as AccessGroups)
}

describe('AddAgentButtons', () => {
  it('exists', () => {
    expect(AddAgentButtons).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(instantiateAddAgentButtons()).toBeInstanceOf(Object)
  })
})

describe('AddAgentButtons#render', () => {
  it('exists', () => {
    expect(instantiateAddAgentButtons().render).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(instantiateAddAgentButtons().render()).toBeInstanceOf(Object)
  })
})
