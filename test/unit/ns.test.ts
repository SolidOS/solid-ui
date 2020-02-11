jest.mock('rdflib')
jest.mock('solid-auth-client')
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

import { default as SolidNamespace } from '../../src/ns'
  
describe('SolidNamespace', () => {
  it('exists', () => {
    expect(SolidNamespace).toBeInstanceOf(Object)
  })
})
