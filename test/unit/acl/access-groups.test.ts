jest.mock('rdflib')
jest.mock('solid-auth-client')

import { AccessGroups } from '../../../src/acl/access-groups'

describe('AccessGroups', () => {
  it('exists', () => {
    expect(AccessGroups).toBeInstanceOf(Function)
  })
})