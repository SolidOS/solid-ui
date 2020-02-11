jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

import { default as thread } from '../../../src/chat/thread'
  
describe('Thread', () => {
  it('exists', () => {
    expect(thread).toBeInstanceOf(Function)
  })

  it.skip('runs', () => {
    const kb = RdfLib.graph()
    const subject = ''
    const messageStore = RdfLib.sym('')
    const options = {}

    ;(window as any).$rdf = RdfLib;
    ;(window as any).alert = () => {}
    expect(thread(dom, kb, subject, messageStore, options)).toBeInstanceOf(Object)
  })
})
