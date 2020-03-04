import { JSDOM } from 'jsdom'
import MessageArea from '../../src/messageArea'
import * as RdfLib from 'rdflib'

jest.mock('solid-auth-client')
const window = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window
const dom = window.document

describe('MessageArea', () => {
  it('exists', () => {
    expect(MessageArea).toBeInstanceOf(Function)
  })
  it('runs', () => {
    ;(global as any).$rdf = RdfLib
    expect(MessageArea(
      dom,
      RdfLib.graph(),
      RdfLib.sym('https://test.test'),
      RdfLib.sym('https://test.test'),
      {}
    )).toBeTruthy()
  })
})
