import { JSDOM } from 'jsdom'

import { newThingUI } from '../../src/create'
jest.mock('rdflib')
jest.mock('solid-auth-client')
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

describe('newThingUI', () => {
  it('exists', () => {
    expect(newThingUI).toBeInstanceOf(Function)
  })
})
