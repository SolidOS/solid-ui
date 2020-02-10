jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'
import { dom } from '../helpers/dom'

import { default as LogWrapper } from '../../src/log'
  
describe('Log Wrapper', () => {
  it('exists', () => {
    expect(LogWrapper).toBeInstanceOf(Object)
  })
})
