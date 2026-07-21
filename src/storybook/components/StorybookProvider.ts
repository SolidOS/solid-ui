import { customElement, WebComponent } from '@/lib/components'
import { provide } from '@lit/context'
import { html, type PropertyValues } from 'lit'
import { property } from 'lit/decorators.js'
import StorybookAuth from '../auth/StorybookAuth'
import { Account, authContext } from '@/lib/auth'

import '@/components/dialogs-root'

@customElement('storybook-provider')
export class StorybookProvider extends WebComponent {
  @property({ type: String, reflect: true })
  accessor webId: string | undefined

  @property({ type: String, reflect: true })
  accessor avatarUrl: string | undefined

  @property({ type: Boolean, reflect: true })
  accessor initialized = true

  @provide({ context: authContext })
  private accessor auth = new StorybookAuth()

  willUpdate (changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties)

    this.auth.initialized = this.initialized

    if (!this.webId) {
      this.auth.account = null

      return
    }

    this.auth.account = new Account(this.webId, this.avatarUrl)
  }

  protected render () {
    return html`
      <slot></slot>
      <solid-ui-dialogs-root></solid-ui-dialogs-root>
    `
  }
}
