import MessageArea from '../../src/messageArea'
jest.mock('rdflib')
jest.mock('solid-auth-client')

describe('MessageArea', () => {
  it('exists', () => {
    expect(MessageArea).toBeInstanceOf(Function)
  })
})
