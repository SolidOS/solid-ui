import { provide } from '@lit/context'
import { customElement, property } from 'lit/decorators.js'
import StorybookAuth from '../auth/StorybookAuth'
import Account from '../../primitives/lib/auth/Account'
import { authContext } from '../../primitives/lib/auth/context'
import WebComponent from '../../primitives/lib/WebComponent'

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
}
