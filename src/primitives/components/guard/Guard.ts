import { html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import WebComponent from '../../lib/WebComponent'
import { consume } from '@lit/context'
import { authContext, DEFAULT_AUTH_CONTEXT, AuthContext } from '../../lib/auth/context'

@customElement('solid-guard')
export default class Guard extends WebComponent {
  @state()
  @consume({ context: authContext })
  private auth: AuthContext = DEFAULT_AUTH_CONTEXT

  protected render () {
    if (!this.auth.account) {
      return html`
        <slot name="guest"></slot>
      `
    }

    return html`
      <slot></slot>
    `
  }
}
