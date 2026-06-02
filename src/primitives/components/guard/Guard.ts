import { consume } from '@lit/context'
import { html } from 'lit'
import { customElement } from 'lit/decorators.js'

import WebComponent from '../../lib/WebComponent'
import { authContext, AuthContext, DEFAULT_AUTH_CONTEXT } from '../../lib/auth/context'

@customElement('solid-guard')
export default class Guard extends WebComponent {
  @consume({ context: authContext, subscribe: true })
  private accessor auth: AuthContext = DEFAULT_AUTH_CONTEXT

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
