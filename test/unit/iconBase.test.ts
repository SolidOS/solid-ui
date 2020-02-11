import { JSDOM } from 'jsdom'

import { iconBase, originalIconBase } from '../../src/iconBase'
jest.mock('rdflib')
jest.mock('solid-auth-client')
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

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
