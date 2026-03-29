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

describe('getUserRoles', () => {
  afterEach(() => {
    jest.restoreAllMocks()
    jest.resetModules()
  })

  it('returns [] and does not load preferences when current user is missing', async () => {
    const solidLogic = require('solid-logic')

    solidLogic.authSession.info = {
      isLoggedIn: true,
      webId: 'https://alice.example.com/profile/card#me'
    }

    const currentUserSpy = jest
      .spyOn(solidLogic.authn, 'currentUser')
      .mockReturnValue(null)
    const loadPreferencesSpy = jest.spyOn(
      solidLogic.solidLogicSingleton.profile,
      'loadPreferences'
    )

    const loginModule = require('../../../src/login/login')
    const roles = await loginModule.getUserRoles()

    expect(currentUserSpy).toHaveBeenCalled()
    expect(roles).toEqual([])
    expect(loadPreferencesSpy).not.toHaveBeenCalled()
  })
})
