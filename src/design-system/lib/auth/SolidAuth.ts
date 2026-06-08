import { authSession, solidLogicSingleton } from 'solid-logic'
import Account from '../../../primitives/lib/auth/Account'
import { findImage } from '../../../widgets/buttons'
import { AuthContext } from '../../../primitives/lib/auth/context'
import { showDialog } from '../dialogs'
import { html } from 'lit'

import '../../components/login-modal'

export const DEFAULT_SIGNUP_URL = 'https://solidproject.org/get_a_pod'

export default class SolidAuth implements AuthContext {
  constructor (public signupUrl: string = DEFAULT_SIGNUP_URL) {}

  get account (): Account | null {
    if (!authSession.info?.isLoggedIn || !authSession.info?.webId) {
      return null
    }

    const webId = authSession.info.webId
    const me = solidLogicSingleton.store.sym(webId)
    const avatarUrl = findImage(me) ?? undefined

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

    await authSession.login({
      redirectUrl: locationUrl.href,
      oidcIssuer: loginUrl
    })
  }

  async signup () {
    window.open(this.signupUrl, '_blank', 'noopener,noreferrer')
  }

  async logout () {
    await authSession.logout()
  }

  onSessionUpdated (callback: () => unknown) {
    authSession.events.on('login', callback)
    authSession.events.on('logout', callback)
    authSession.events.on('sessionRestore', callback)

    return () => {
      authSession.events.off('login', callback)
      authSession.events.off('logout', callback)
      authSession.events.off('sessionRestore', callback)
    }
  }
}
