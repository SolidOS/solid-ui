jest.mock('rdflib')
jest.mock('solid-auth-client')
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

import { default as LogWrapper } from '../../src/log'
  
describe('Log Wrapper', () => {
  it('exists', () => {
    expect(LogWrapper).toBeInstanceOf(Object)
  })
})
