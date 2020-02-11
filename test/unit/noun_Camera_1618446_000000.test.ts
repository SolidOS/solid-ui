import { JSDOM } from 'jsdom'

import { default as NounCamera1618446_000000 } from '../../src/noun_Camera_1618446_000000'
jest.mock('rdflib')
jest.mock('solid-auth-client')
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

describe('NounCamera1618446_000000', () => {
  it('exists', () => {
    expect(typeof NounCamera1618446_000000).toEqual('string')
  })
})
