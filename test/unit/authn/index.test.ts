jest.mock('rdflib')
jest.mock('solid-auth-client')
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

import * as Authn from '../../../src/authn/authn'
import * as Index from '../../../src/authn/authn'

describe('authn/index', () => {
  it('exports all of authn/authn', () => {
    for (let k in Authn) {
      if (k !== 'default') {
        expect(Index[k]).toEqual(Authn[k])
      }
    }
  })
})