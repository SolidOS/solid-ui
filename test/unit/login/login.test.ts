import { afterAll, afterEach, describe, expect, it, vi } from 'vitest'
import { authn, authSession, solidLogicSingleton } from 'solid-logic'
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
    vi.spyOn(authSession, 'info', 'get').mockReturnValue({
      isLoggedIn: true,
      webId: 'https://alice.example.com/profile/card#me',
      sessionId: 'test-session'
    })

    const currentUserSpy = vi
      .spyOn(authn, 'currentUser')
      .mockReturnValue(null)
    const loadPreferencesSpy = vi.spyOn(
      solidLogicSingleton.profile,
      'loadPreferences'
    )

    const roles = await testLogin.getUserRoles()

    expect(currentUserSpy).toHaveBeenCalled()
    expect(roles).toEqual([])
    expect(loadPreferencesSpy).not.toHaveBeenCalled()
  })
})
