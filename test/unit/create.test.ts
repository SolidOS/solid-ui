jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'
import { dom } from '../helpers/dom'

import { newThingUI } from '../../src/create'
  
describe('newThingUI', () => {
  it('exists', () => {
    expect(newThingUI).toBeInstanceOf(Function)
  })
})
