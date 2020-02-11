jest.mock('rdflib')
jest.mock('solid-auth-client')
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

import { iconBase, originalIconBase } from '../../src/iconBase'
  
describe('iconBase', () => {
  it('exists', () => {
    expect(iconBase).toEqual('https://solid.github.io/solid-ui/src/icons/')
  })
})
  
describe('originalIconBase', () => {
  it('exists', () => {
    expect(originalIconBase).toEqual('https://solid.github.io/solid-ui/src/originalIcons/')
  })
})
