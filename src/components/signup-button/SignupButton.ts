import { customElement, WebComponent } from '@/lib/components'
import { consume } from '@lit/context'
import { html } from 'lit'
import { authContext, AuthContext, DEFAULT_AUTH_CONTEXT } from '@/lib/auth'

import '@/components/button'

@customElement('solid-ui-signup-button')
export default class SignupButton extends WebComponent {
  @consume({ context: authContext, subscribe: true })
  private accessor auth: AuthContext = DEFAULT_AUTH_CONTEXT

  protected render () {
    return html`
      <slot name="trigger" @click=${this.onClick}>
        <solid-ui-button>
            <slot>
                Sign Up
            </slot>
        </solid-ui-button>
      </slot>
    `
  }

  click () {
    this.auth.signup()
  }

  private onClick (e: MouseEvent) {
    e.preventDefault()

    this.click()
  }
}
