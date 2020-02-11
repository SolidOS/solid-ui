import * as Styles from '../../../src/acl/styles'

jest.mock('rdflib')
jest.mock('solid-auth-client')

describe('Styles', () => {
  it('exists', () => {
    expect(typeof Styles).toEqual('object')
  })
})