import { AccessGroups } from '../../../src/acl/access-groups'

jest.mock('rdflib')
jest.mock('solid-auth-client')

describe('AccessGroups', () => {
  it('exists', () => {
    expect(AccessGroups).toBeInstanceOf(Function)
  })
})