jest.mock('rdflib')
jest.mock('solid-auth-client')
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

import { AddAgentButtons } from '../../../src/acl/add-agent-buttons'
import { AccessGroups } from '../../../src/acl/access-groups'

function instantiateAddAgentButtons() {
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
})