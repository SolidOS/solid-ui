import { consume } from '@lit/context'
import { html, nothing, TemplateResult } from 'lit'
import { property } from 'lit/decorators.js'
import { customElement, WebComponent } from '@/lib/components'
import { authContext, AuthContext, DEFAULT_AUTH_CONTEXT } from '@/lib/auth'

import '@/components/avatar'
import '@/components/button'
import '@/components/login-button'
import '@/components/logout-button'
import '@/components/menu-item'
import '@/components/menu'
import '@/components/signup-button'
import '~icons/lucide/chevron-down'
import '~icons/lucide/log-in'
import '~icons/lucide/log-out'
import '~icons/lucide/user'
import '~icons/svg-spinners/180-ring'

import styles from './Account.styles.css'

export interface AccountMenuItem {
  label: string | TemplateResult
  href?: string
  selected?: boolean
  onSelected?(): void
}

@customElement('solid-ui-account')
export default class Account extends WebComponent {
  static styles = styles
  static states = {
    initializing: (component: Account) => !component.auth.initialized,
    loggedIn: (component: Account) => !!component.auth.account,
  }

  @property({ type: Array })
  accessor menuItems: AccountMenuItem[] = []

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
    if (!this.auth.initialized) {
      return html`
        <icon-svg-spinners-180-ring></icon-svg-spinners-180-ring>
      `
    }

    if (!this.auth.account) {
      return html`
        <solid-ui-login-button>
            <solid-ui-button slot="trigger">
                <icon-lucide-user slot="left-icon"></icon-lucide-user>
                Log In
            </solid-ui-button>
        </solid-ui-login-button>
        <solid-ui-signup-button>
            <solid-ui-button slot="trigger" variant="outline">
                <icon-lucide-log-in slot="left-icon"></icon-lucide-log-in>
                Sign Up
            </solid-ui-button>
        </solid-ui-signup-button>
      `
    }

    return html`
        <solid-ui-menu placement="bottom-end">
            <button type="button" slot="trigger">
                <solid-ui-avatar></solid-ui-avatar>
                <icon-lucide-chevron-down slot="right-icon"></icon-lucide-chevron-down>
            </button>

            ${this.menuItems.map(menuItem => html`
                <solid-ui-menu-item .href=${menuItem.href ?? nothing} ?selected=${menuItem.selected} @solid-ui-select=${() => menuItem.onSelected?.()}>
                    ${menuItem.label}
                </solid-ui-menu-item>
            `)}
            <solid-ui-logout-button>
                <solid-ui-menu-item slot="trigger">
                    <icon-lucide-log-out slot="left-icon"></icon-lucide-log-out>
                    Sign out
                </solid-ui-menu-item>
            </solid-ui-logout-button>
        </solid-ui-menu>
    `
  }
}
