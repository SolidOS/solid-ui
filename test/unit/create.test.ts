import { newThingUI } from '../../src/create'
jest.mock('rdflib')
jest.mock('solid-auth-client')

describe('newThingUI', () => {
  it('exists', () => {
    expect(newThingUI).toBeInstanceOf(Function)
  })
})
