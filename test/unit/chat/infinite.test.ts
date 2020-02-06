jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'

import { infiniteMessageArea } from '../../../src/chat/infinite'

describe('infiniteMessageArea', () => {
  it('exists', () => {
    expect(infiniteMessageArea).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const element = {
      appendChild: () => {},
      setAttribute: () => {},
    }
    const dom = {
      createElement: () => {
        return element
      }
    }
    const kb = {
      query: () => {
        return {}
      }
    }
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
    expect(result).toEqual(element)
  })
})
