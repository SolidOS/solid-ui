import * as RdfLib from 'rdflib'
import { JSDOM } from 'jsdom'

import { infiniteMessageArea } from '../../../src/chat/infinite'

jest.mock('solid-auth-client')
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

describe('infiniteMessageArea', () => {
  it('exists', () => {
    expect(infiniteMessageArea).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const kb = RdfLib.graph()
    const chatChannel = {
      dir () {
        return {
          uri: ''
        }
      }
    }
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
