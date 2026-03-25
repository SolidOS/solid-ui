import * as testLogin from '../../../src/login/login'

describe('ensureLoggedIn', () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })
  it('exists', () => {
    expect(testLogin.ensureLoggedIn).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(testLogin.ensureLoggedIn({})).toBeInstanceOf(Object)
  })
})
