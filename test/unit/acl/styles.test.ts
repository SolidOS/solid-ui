jest.mock('rdflib')
jest.mock('solid-auth-client')
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

import * as Styles from '../../../src/acl/styles'


describe('Styles', () => {
  it('exists', () => {
    expect(Styles).toBeInstanceOf(Object)
  })
})