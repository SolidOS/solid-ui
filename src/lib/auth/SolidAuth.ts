import Account from '@/lib/auth/Account'
import ns from '@/lib/ns'
import { authn, authSession, solidLogicSingleton } from 'solid-logic'
import { AuthContext } from '@/lib/auth'
import { showDialog } from '@/lib/dialogs'

import LoginModal from '@/components/login-modal'

export const DEFAULT_SIGNUP_URL = 'https://solidproject.org/get_a_pod'

function findAccountImage (webId: string): string | undefined {
  const store = solidLogicSingleton.store
  const me = store.sym(webId)
  const image =
    store.any(me, ns.sioc('avatar')) ||
    store.any(me, ns.foaf('img')) ||
    store.any(me, ns.vcard('logo')) ||
    store.any(me, ns.vcard('hasPhoto')) ||
    store.any(me, ns.vcard('photo')) ||
    store.any(me, ns.foaf('depiction'))

  return image ? (image as any).value : undefined
}

export default class SolidAuth implements AuthContext {
  private _initialized = false
  private profileLoaded = false
  private listeners: (() => unknown)[] = []

  constructor (public signupUrl: string = DEFAULT_SIGNUP_URL) {}

  async initialize () {
    await authn.checkUser()

    this._initialized = true
    this.listeners.forEach(listener => listener())
  }

  async loadProfile () {
    if (this.profileLoaded || !this.account) {
      return
    }

    this.profileLoaded = true

    await solidLogicSingleton.profile.loadMe()

    this.listeners.forEach(listener => listener())
  }

  get initialized (): boolean {
    return this._initialized
  }

  get account (): Account | null {
    const webId: string | undefined = authSession.webId ?? authSession.info?.webId
    const isActive: boolean = authSession.isActive ?? authSession.info?.isLoggedIn ?? Boolean(webId)

    if (!isActive || !webId) {
      return null
    }

    const avatarUrl = findAccountImage(webId)

    return new Account(webId, avatarUrl)
  }

  async login (loginUrl?: string) {
    if (!loginUrl) {
      showDialog(LoginModal)

      return
    }

    // clear authorization metadata from store
    ;(solidLogicSingleton.store.updater as any).flagAuthorizationMetadata()

    const preLoginRedirectHash = new URL(window.location.href).hash
    if (preLoginRedirectHash) {
      window.localStorage.setItem('preLoginRedirectHash', preLoginRedirectHash)
    }
    window.localStorage.setItem('loginIssuer', loginUrl)

    const locationUrl = new URL(window.location.href)

    locationUrl.hash = ''

    await authSession.login(loginUrl, locationUrl.href)
  }

  async signup () {
    window.open(this.signupUrl, '_blank', 'noopener,noreferrer')
  }

  async logout () {
    await authSession.logout()
  }

  onSessionUpdated (callback: () => unknown) {
    const sessionEventTarget = authSession as unknown as EventTarget
    const listener = () => {
      callback()
    }

    this.listeners.push(listener)

    if (typeof sessionEventTarget.addEventListener === 'function') {
      sessionEventTarget.addEventListener('sessionStateChange', listener)
    } else {
      authSession.events.on('login', listener)
      authSession.events.on('logout', listener)
      authSession.events.on('sessionRestore', listener)
    }

    return () => {
      this.listeners = this.listeners.filter(_listener => _listener !== listener)

      if (typeof sessionEventTarget.removeEventListener === 'function') {
        sessionEventTarget.removeEventListener('sessionStateChange', listener)
      } else {
        authSession.events.off('login', listener)
        authSession.events.off('logout', listener)
        authSession.events.off('sessionRestore', listener)
      }
    }
  }
}
