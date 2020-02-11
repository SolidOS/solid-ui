jest.mock('rdflib')
jest.mock('solid-auth-client')
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

import { newThingUI } from '../../src/create'
  
describe('newThingUI', () => {
  it('exists', () => {
    expect(newThingUI).toBeInstanceOf(Function)
  })
})
