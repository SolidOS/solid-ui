import { customElement, WebComponent } from '@/lib/components'
import { provide } from '@lit/context'
import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { authContext } from '@/lib/auth'
import { SolidAuth, DEFAULT_SIGNUP_URL } from '@/lib/auth'

import '@/components/dialogs-root'

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
