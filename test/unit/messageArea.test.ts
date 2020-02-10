jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'
import { dom } from '../helpers/dom'

import { default as MessageArea } from '../../src/messageArea'
  
describe('MessageArea', () => {
  it('exists', () => {
    expect(MessageArea).toBeInstanceOf(Function)
  })
})
