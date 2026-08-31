import { customElement, WebComponent } from '@/lib/components'
import { provide } from '@lit/context'
import { html, type PropertyValues } from 'lit'
import { property } from 'lit/decorators.js'
import { solidLogicSingleton } from 'solid-logic'
import { authContext } from '@/lib/auth'
import { SolidAuth, DEFAULT_SIGNUP_URL } from '@/lib/auth'
import { storeContext, type StoreContext } from '@/lib/store'

import '@/components/dialogs-root'

@customElement('solid-ui-provider')
export default class Provider extends WebComponent {
  @property({ type: String, reflect: true })
  accessor signupUrl: string | undefined

  @provide({ context: authContext })
  private accessor auth = new SolidAuth()

  @provide({ context: storeContext })
  private accessor store: StoreContext = { store: solidLogicSingleton.store }

  async connectedCallback () {
    super.connectedCallback()

    await this.auth.initialize()
  }

  protected willUpdate (changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties)

    if (changedProperties.has('signupUrl')) {
      this.auth.signupUrl = this.signupUrl ?? DEFAULT_SIGNUP_URL
    }

    if (this.store) {
      // read `store` so the property is considered used
    }
  }

  protected render () {
    return html`
        <slot></slot>
        <solid-ui-dialogs-root></solid-ui-dialogs-root>
    `
  }
}
