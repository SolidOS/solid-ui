import { consume } from '@lit/context'
import { html } from 'lit'
import { customElement } from '../../lib/customElement'
import WebComponent from '../../lib/WebComponent'
import { authContext, AuthContext, DEFAULT_AUTH_CONTEXT } from '../../lib/auth/context'
import commonStyles from '../../styles/common.styles.css'

import '~icons/lucide/circle-user'
import styles from './Avatar.styles.css'

@customElement('solid-avatar')
export default class Avatar extends WebComponent {
  static styles = [commonStyles, styles]
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
