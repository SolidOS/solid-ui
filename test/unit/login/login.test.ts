import * as testLogin from '../../../src/login/login'

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
