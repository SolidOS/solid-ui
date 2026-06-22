import { customElement, WebComponent } from '@/lib/components'
import { consume } from '@lit/context'
import { html } from 'lit'
import { authContext, AuthContext, DEFAULT_AUTH_CONTEXT } from '@/lib/auth'

import '~icons/lucide/circle-user'

import styles from './Avatar.styles.css'

@customElement('solid-ui-avatar')
export default class Avatar extends WebComponent {
  static styles = styles
  static states = {
    fallback: (component: Avatar) => !component.auth.account?.avatarUrl,
  }

  @consume({ context: authContext, subscribe: true })
  private accessor auth: AuthContext = DEFAULT_AUTH_CONTEXT

  protected render () {
    if (!this.auth.account?.avatarUrl) {
      return html`
          <icon-lucide-circle-user></icon-lucide-circle-user>
      `
    }

    return html`
        <img src="${this.auth.account?.avatarUrl}" alt="" />
    `
  }
}
