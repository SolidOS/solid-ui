import { consume } from '@lit/context'
import { html } from 'lit'
import { customElement } from 'lit/decorators.js'

import WebComponent from '../../lib/WebComponent'
import { authContext, AuthContext, DEFAULT_AUTH_CONTEXT } from '../../lib/auth/context'
import styles from './LoginButton.styles.css'

@customElement('solid-login-button')
export default class LoginButton extends WebComponent {
  static styles = styles

  @consume({ context: authContext, subscribe: true })
  private accessor auth: AuthContext = DEFAULT_AUTH_CONTEXT

  protected render () {
    return html`
      <slot name="trigger" @click=${this.onClick}>
        <button type="button">
            <slot>
                Log In
            </slot>
        </button>
      </slot>
    `
  }

  private onClick (e: MouseEvent) {
    e.preventDefault()

    this.auth.login()
  }
}
