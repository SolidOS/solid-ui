import { customElement, WebComponent } from '@/lib/components'
import { consume } from '@lit/context'
import { html } from 'lit'
import { authContext, AuthContext, DEFAULT_AUTH_CONTEXT } from '@/lib/auth'

import '@/components/button'

@customElement('solid-ui-logout-button')
export default class LogoutButton extends WebComponent {
  @consume({ context: authContext, subscribe: true })
  private accessor auth: AuthContext = DEFAULT_AUTH_CONTEXT

  protected render () {
    return html`
      <slot name="trigger" @click=${this.onClick}>
        <solid-ui-button>
            <slot>
                Log Out
            </slot>
        </solid-ui-button>
      </slot>
    `
  }

  private onClick (e: MouseEvent) {
    e.preventDefault()

    this.auth.logout()
  }
}
