jest.mock('rdflib')
jest.mock('solid-auth-client')
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

import { matrixForQuery } from '../../src/matrix'
  
describe('matrixForQuery', () => {
  it('exists', () => {
    expect(matrixForQuery).toBeInstanceOf(Function)
  })
})
