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

    // Note: `authSession.info` is a derived read-only property (from
    // webId/isActive) and can no longer be assigned. The logged-out state is
    // driven by mocking `currentUser` to return null below.

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
