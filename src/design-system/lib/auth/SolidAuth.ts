import { authSession, solidLogicSingleton } from 'solid-logic'
import Account from '../../../primitives/lib/auth/Account'
import { AuthContext } from '../../../primitives/lib/auth/context'
import { showDialog } from '../dialogs'
import { html } from 'lit'
import ns from '../../../ns'

import '../../components/login-modal'

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
  constructor (public signupUrl: string = DEFAULT_SIGNUP_URL) {}

  get account (): Account | null {
    const sessionAny = authSession as any
    const webId: string | undefined = sessionAny.webId ?? sessionAny.info?.webId
    const isActive: boolean = sessionAny.isActive ?? sessionAny.info?.isLoggedIn ?? Boolean(webId)
    if (!isActive || !webId) {
      return null
    }

    const avatarUrl = findAccountImage(webId)

    return new Account(webId, avatarUrl)
  }

  async login (loginUrl?: string) {
    if (!loginUrl) {
      showDialog(html`<solid-ui-login-modal></solid-ui-login-modal>`)

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

    await (authSession as any).login(loginUrl, locationUrl.href)
  }

  async signup () {
    window.open(this.signupUrl, '_blank', 'noopener,noreferrer')
  }

  async logout () {
    await authSession.logout()
  }

  onSessionUpdated (callback: () => unknown) {
    const sessionEventTarget = authSession as unknown as EventTarget
    const sessionAny = authSession as any
    const listener = () => {
      callback()
    }
    if (typeof sessionEventTarget.addEventListener === 'function') {
      sessionEventTarget.addEventListener('sessionStateChange', listener)
    } else {
      sessionAny.events.on('login', callback)
      sessionAny.events.on('logout', callback)
      sessionAny.events.on('sessionRestore', callback)
    }

    return () => {
      if (typeof sessionEventTarget.removeEventListener === 'function') {
        sessionEventTarget.removeEventListener('sessionStateChange', listener)
      } else {
        sessionAny.events.off('login', callback)
        sessionAny.events.off('logout', callback)
        sessionAny.events.off('sessionRestore', callback)
      }
    }
  }
}
