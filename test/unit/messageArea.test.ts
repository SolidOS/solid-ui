import { silenceDebugMessages } from './helpers/debugger'
import { JSDOM } from 'jsdom'
import { messageArea } from '../../src/messageArea'
import { graph, sym } from 'rdflib'

silenceDebugMessages()
const window = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window
const dom = window.document

describe('messageArea', () => {
  it('exists', () => {
    expect(messageArea).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(messageArea(
      dom,
      graph(),
      sym('https://test.test'),
      sym('https://test.test'),
      {}
    )).toBeTruthy()
  })
})
