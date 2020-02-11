jest.mock('rdflib')
jest.mock('solid-auth-client')
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

import * as AddAgentButtons from '../../../src/acl/add-agent-buttons'


describe('AddAgentButtons', () => {
  it('exists', () => {
    expect(AddAgentButtons).toBeTruthy()
  })
})