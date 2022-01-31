import * as testLogin from '../../../src/login/login'

const mockAppContext = {
  viewingNoAuthPage: true,
  webId: 'https://timea-test.solidcommunity.net/profile/card#me'
}

describe('logIn', () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })
  it('exists', () => {
    expect(testLogin.loggedInContext).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(testLogin.loggedInContext({})).toBeInstanceOf(Object)
  })
})
