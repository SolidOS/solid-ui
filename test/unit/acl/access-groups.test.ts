jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'

import * as AccessGroups from '../../../src/acl/access-groups'

describe('AccessGroups', () => {
  it('exists', () => {
    expect(AccessGroups).toBeTruthy()
  })
})