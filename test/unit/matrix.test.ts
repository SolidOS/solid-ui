import { matrixForQuery } from '../../src/matrix'
jest.mock('rdflib')
jest.mock('solid-auth-client')

describe('matrixForQuery', () => {
  it('exists', () => {
    expect(matrixForQuery).toBeInstanceOf(Function)
  })
})
