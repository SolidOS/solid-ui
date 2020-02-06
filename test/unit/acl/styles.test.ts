jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'

import * as Styles from '../../../src/acl/styles'


describe('Styles', () => {
  it('exists', () => {
    expect(Styles).toBeTruthy()
  })
})