import SolidNamespace from '../../src/ns'
jest.mock('rdflib')
jest.mock('solid-auth-client')

describe('SolidNamespace', () => {
  it('exists', () => {
    expect(SolidNamespace).toBeInstanceOf(Object)
  })
})
