jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'

import * as AccessController from '../../../src/acl/access-controller'

describe('AccessController', () => {
  it.skip('exists', () => {
    expect(AccessController).toBeInstanceOf(AccessController)
  })
})