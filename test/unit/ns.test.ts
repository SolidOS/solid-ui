jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'
import { dom } from '../helpers/dom'

import { default as SolidNamespace } from '../../src/ns'
  
describe('SolidNamespace', () => {
  it('exists', () => {
    expect(SolidNamespace).toBeInstanceOf(Object)
  })
})
