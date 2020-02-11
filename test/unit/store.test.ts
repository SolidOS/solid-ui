import Store from '../../src/store'
jest.mock('rdflib')
jest.mock('solid-auth-client')

describe('Store', () => {
  it('exists', () => {
    expect(JSON.stringify(Store)).toEqual('{"fetcher":{},"updater":{}}')
  })
})
