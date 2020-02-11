jest.mock('rdflib')
jest.mock('solid-auth-client')
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

import { default as MessageArea } from '../../src/messageArea'
  
describe('MessageArea', () => {
  it('exists', () => {
    expect(MessageArea).toBeInstanceOf(Function)
  })
})
