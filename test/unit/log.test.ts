import LogWrapper from '../../src/log'
jest.mock('rdflib')
jest.mock('solid-auth-client')

describe('Log Wrapper', () => {
  it('exists', () => {
    expect(LogWrapper).toBeInstanceOf(Object)
  })
})
