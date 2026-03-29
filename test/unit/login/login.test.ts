import * as testLogin from '../../../src/login/login'
import { sym } from 'rdflib'

function buildSolidLogicMock () {
  const loadPreferences = jest.fn()
  const loadProfile = jest.fn(async (me) => me?.doc?.() ?? me)
  const store = {
    each: jest.fn(() => []),
    any: jest.fn(() => null),
    holds: jest.fn(() => false),
    add: jest.fn(),
    sym,
    fetcher: {
      load: jest.fn(async () => undefined)
    }
  }

  const mockModule = {
    AppDetails: class AppDetails {},
    AuthenticationContext: class AuthenticationContext {},
    authn: {
      currentUser: jest.fn(() => null),
      checkUser: jest.fn(async () => null),
      saveUser: jest.fn((user) => user)
    },
    authSession: {
      info: { isLoggedIn: false, webId: undefined },
      events: { on: jest.fn() },
      login: jest.fn(async () => undefined),
      logout: jest.fn(async () => undefined)
    },
    CrossOriginForbiddenError: class CrossOriginForbiddenError extends Error {},
    FetchError: class FetchError extends Error { status?: number },
    getSuggestedIssuers: jest.fn(() => []),
    NotEditableError: class NotEditableError extends Error {},
    offlineTestID: jest.fn(() => null),
    SameOriginForbiddenError: class SameOriginForbiddenError extends Error {},
    UnauthorizedError: class UnauthorizedError extends Error {},
    WebOperationError: class WebOperationError extends Error {},
    store,
    solidLogicSingleton: {
      store,
      profile: {
        loadPreferences,
        loadProfile
      },
      typeIndex: {
        getScopedAppInstances: jest.fn(async () => []),
        getRegistrations: jest.fn(() => []),
        loadAllTypeIndexes: jest.fn(async () => []),
        getScopedAppsFromIndex: jest.fn(async () => []),
        deleteTypeIndexRegistration: jest.fn(async () => undefined)
      }
    }
  }

  return { mockModule, loadPreferences, store }
}

function loadLoginWithMock () {
  const { mockModule, loadPreferences, store } = buildSolidLogicMock()
  jest.doMock('solid-logic', () => mockModule)
  const loginModule = require('../../../src/login/login')
  return { loginModule, solidLogic: mockModule, loadPreferences, store }
}

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
    jest.clearAllMocks()
  })

  it('returns [] and does not load preferences when current user is missing', async () => {
    const solidLogic = require('solid-logic')

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

  it('shares in-flight ensureLoadedPreferences work for concurrent callers', async () => {
    const { loginModule, solidLogic, loadPreferences } = loadLoginWithMock()

    const me = sym('https://alice.example.com/profile/card#me')
    let resolvePreferences: (value: any) => void = () => {}
    const preferencesFile = sym('https://alice.example.com/settings/prefs.ttl')

    solidLogic.authn.currentUser.mockReturnValue(me)
    loadPreferences.mockImplementation(() => new Promise((resolve) => {
      resolvePreferences = resolve
    }))

    const p1 = loginModule.ensureLoadedPreferences({ me, publicProfile: me.doc() })
    const p2 = loginModule.ensureLoadedPreferences({ me, publicProfile: me.doc() })

    await Promise.resolve()
    expect(loadPreferences).toHaveBeenCalledTimes(1)

    resolvePreferences(preferencesFile)
    const [first, second] = await Promise.all([p1, p2])

    expect(first.preferencesFile).toEqual(preferencesFile)
    expect(second.preferencesFile).toEqual(preferencesFile)
    expect(loadPreferences).toHaveBeenCalledTimes(1)
  })

  it('caches successful role lookups per WebID', async () => {
    const { loginModule, solidLogic, loadPreferences, store } = loadLoginWithMock()

    const me = sym('https://alice.example.com/profile/card#me')
    const preferencesFile = sym('https://alice.example.com/settings/prefs.ttl')
    const role = sym('http://example.com/ns#PowerUser')

    solidLogic.authSession.info = { isLoggedIn: true, webId: me.uri }
    solidLogic.authn.currentUser.mockReturnValue(me)
    loadPreferences.mockResolvedValue(preferencesFile)
    store.each.mockReturnValue([role])

    const first = await loginModule.getUserRoles()
    const second = await loginModule.getUserRoles()

    expect(first).toEqual([role])
    expect(second).toEqual([role])
    expect(loadPreferences).toHaveBeenCalledTimes(1)
    expect(store.each).toHaveBeenCalledTimes(1)
  })

  it('does not cache failed role lookups', async () => {
    const { loginModule, solidLogic, loadPreferences, store } = loadLoginWithMock()

    const me = sym('https://alice.example.com/profile/card#me')
    const preferencesFile = sym('https://alice.example.com/settings/prefs.ttl')
    const role = sym('http://example.com/ns#Developer')

    solidLogic.authSession.info = { isLoggedIn: true, webId: me.uri }
    solidLogic.authn.currentUser.mockReturnValue(me)
    loadPreferences.mockRejectedValueOnce(new Error('transient failure'))
    loadPreferences.mockResolvedValueOnce(preferencesFile)
    store.each.mockReturnValue([role])

    const first = await loginModule.getUserRoles()
    const second = await loginModule.getUserRoles()

    expect(first).toEqual([])
    expect(second).toEqual([role])
    expect(loadPreferences).toHaveBeenCalledTimes(2)
    expect(store.each).toHaveBeenCalledTimes(1)
  })
})
