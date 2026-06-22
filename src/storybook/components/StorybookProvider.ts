import { customElement, WebComponent } from '@/lib/components'
import { provide } from '@lit/context'
import { html } from 'lit'
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

  @provide({ context: authContext })
  private accessor auth = new StorybookAuth()

  willUpdate (changedProperties: Map<string, any>) {
    super.willUpdate(changedProperties)

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
