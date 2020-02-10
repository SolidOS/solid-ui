jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'
import { dom } from '../helpers/dom'

import { matrixForQuery } from '../../src/matrix'
  
describe('matrixForQuery', () => {
  it('exists', () => {
    expect(matrixForQuery).toBeInstanceOf(Function)
  })
})
