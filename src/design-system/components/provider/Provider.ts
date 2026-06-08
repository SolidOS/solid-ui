import { provide } from '@lit/context'
import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { authContext } from '../../../primitives/lib/auth/context'
import WebComponent from '../../../primitives/lib/WebComponent'
import SolidAuth, { DEFAULT_SIGNUP_URL } from '../../lib/auth/SolidAuth'

import '../dialogs-root'

@customElement('solid-ui-provider')
export default class Provider extends WebComponent {
  @property({ type: String, reflect: true })
  accessor signupUrl: string | undefined

  @provide({ context: authContext })
  private accessor auth = new SolidAuth()

  protected willUpdate (changedProperties: Map<string, any>) {
    super.willUpdate(changedProperties)

    if (changedProperties.has('signupUrl')) {
      this.auth.signupUrl = this.signupUrl ?? DEFAULT_SIGNUP_URL
    }
  }

  protected render () {
    return html`
        <slot></slot>
        <solid-ui-dialogs-root></solid-ui-dialogs-root>
    `
  }
}
