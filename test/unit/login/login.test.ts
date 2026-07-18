import { afterAll, afterEach, describe, expect, it, vi } from 'vitest'
import * as testLogin from '../../../src/login/login'

describe('ensureLoggedIn', () => {
  afterAll(() => {
    vi.restoreAllMocks()
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
    vi.restoreAllMocks()
  })

  it('returns [] and does not load preferences when current user is missing', async () => {
    vi.resetModules()

    const { authn, authSession, solidLogicSingleton } = await import('solid-logic')

    authSession.info = {
      isLoggedIn: true,
      webId: 'https://alice.example.com/profile/card#me'
    }

    vi.spyOn(authn, 'checkUser').mockResolvedValue(null)

    const currentUserSpy = vi.spyOn(authn, 'currentUser').mockReturnValue(null)
    const loadPreferencesSpy = vi.spyOn(solidLogicSingleton.profile, 'loadPreferences')

    const { getUserRoles } = await import('../../../src/login/login')
    const roles = await getUserRoles()

    expect(roles).toEqual([])
    expect(currentUserSpy).toHaveBeenCalled()
    expect(loadPreferencesSpy).not.toHaveBeenCalled()
  })
})
