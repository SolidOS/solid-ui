import * as testLogin from '../../../src/login/login'
import { authUtil } from 'solid-logic'

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
  it('user logged in already, through appContext', async () => {
    jest.spyOn(authUtil, 'appContext').mockReturnValue(mockAppContext)
    const call = await testLogin.loggedInContext({})
    expect(call).toBeInstanceOf(Object)
    // console.log(call)
    // expect(authUtil.appContext).toHaveBeenCalledTimes(1)
  })
})
