jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document
const element = dom.createElement('div')

import { infiniteMessageArea } from '../../../src/chat/infinite'

describe('infiniteMessageArea', () => {
  it('exists', () => {
    expect(infiniteMessageArea).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const kb = RdfLib.graph()
    const chatChannel = { dir: () => {
      uri: ''
    } }
    const options = {}
    ;(window as any).$rdf = {
      Namespace: () => {
        return () => ''
      },
      Query: function () {
        this.vars = []
        this.pat = {
          add: () => {}
        }
      },
      variable: () => {}
    }
    ;(window as any).alert = () => {}

    const result = infiniteMessageArea(dom, kb, chatChannel, options)
    expect(result).toBeTruthy()
  })
})
