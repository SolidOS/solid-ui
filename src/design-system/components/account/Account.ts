import { consume } from '@lit/context'
import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import WebComponent from '../../../primitives/lib/WebComponent'
import { authContext, AuthContext, DEFAULT_AUTH_CONTEXT } from '../../../primitives/lib/auth/context'

import '../../../design-system/components/button'
import '../../../primitives/components/avatar'
import '../../../primitives/components/login-button'
import '../../../primitives/components/signup-button'
import '../../../primitives/components/logout-button'
import '../menu'
import '../menu-items'
import '../menu-item'
import '~icons/lucide/user'
import '~icons/lucide/log-in'
import '~icons/lucide/chevron-down'
import '~icons/lucide/log-out'
import styles from './Account.styles.css'

@customElement('solid-ui-account')
export default class Account extends WebComponent {
  static styles = styles
  static states = {
    loggedIn: (component: Account) => !!component.auth.account,
  }

  @consume({ context: authContext, subscribe: true })
  private accessor auth: AuthContext = DEFAULT_AUTH_CONTEXT

  private unsubscribeSessionUpdated?: () => void

  connectedCallback () {
    super.connectedCallback()

    this.unsubscribeSessionUpdated = this.auth.onSessionUpdated(() => this.requestUpdate())
  }

  disconnectedCallback () {
    super.disconnectedCallback()

    this.unsubscribeSessionUpdated?.()
  }

  protected render () {
    if (!this.auth.account) {
      return html`
        <solid-login-button>
            <solid-ui-button slot="trigger">
                <icon-lucide-user slot="left-icon"></icon-lucide-user>
                Log In
            </solid-ui-button>
        </solid-login-button>
        <solid-signup-button>
            <solid-ui-button slot="trigger" variant="secondary">
                <icon-lucide-log-in slot="left-icon"></icon-lucide-log-in>
                Sign Up
            </solid-ui-button>
        </solid-signup-button>
      `
    }

    return html`
        <solid-ui-menu>
            <button type="button" slot="trigger">
                <solid-avatar></solid-avatar>
                <icon-lucide-chevron-down slot="right-icon"></icon-lucide-chevron-down>
            </button>

            <solid-ui-menu-items>
                <solid-logout-button>
                    <solid-ui-menu-item slot="trigger">
                        <icon-lucide-log-out slot="left-icon"></icon-lucide-log-out>
                        Sign out
                    </solid-ui-menu-item>
                </solid-logout-button>
            </solid-ui-menu-items>
        </solid-ui-menu>
    `
  }
}
