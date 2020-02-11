import * as RdfLib from 'rdflib'
import { JSDOM } from 'jsdom'

import thread from '../../../src/chat/thread'
jest.mock('rdflib')
jest.mock('solid-auth-client')
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

describe('Thread', () => {
  it('exists', () => {
    expect(thread).toBeInstanceOf(Function)
  })

  it.skip('runs', () => {
    const kb = RdfLib.graph()
    const subject = ''
    const messageStore = RdfLib.sym('')
    const options = {}

    ;(window as any).$rdf = RdfLib
    ;(window as any).alert = () => {}
    expect(thread(dom, kb, subject, messageStore, options)).toBeInstanceOf(Object)
  })
})
