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
  it('saves the resolved webId into context when checkUser returns a webId', async () => {
    const { authn } = await import('solid-logic')
    const context: any = {}
    const resolvedWebId = 'https://alice.example.com/profile/card#me'

    const currentUserSpy = vi.spyOn(authn, 'currentUser').mockReturnValue(null)
    const checkUserSpy = vi.spyOn(authn, 'checkUser').mockResolvedValue(resolvedWebId as any)
    const saveUserSpy = vi.spyOn(authn, 'saveUser')

    const resultPromise = testLogin.ensureLoggedIn(context)

    await expect(resultPromise).resolves.toBe(context)
    expect(currentUserSpy).toHaveBeenCalled()
    expect(checkUserSpy).toHaveBeenCalled()
    expect(saveUserSpy).toHaveBeenCalledWith(resolvedWebId, context)
    expect(context.me?.uri).toBe(resolvedWebId)
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
