jest.mock('rdflib')
jest.mock('solid-auth-client')
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

import { default as NounCamera1618446_000000 } from '../../src/noun_Camera_1618446_000000'
  
describe('NounCamera1618446_000000', () => {
  it('exists', () => {
    expect(typeof NounCamera1618446_000000).toEqual('string')
  })
})
