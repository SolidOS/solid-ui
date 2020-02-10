jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'
import { dom } from '../helpers/dom'

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
