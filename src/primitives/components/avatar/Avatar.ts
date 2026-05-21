import { html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import '~icons/lucide/circle-user'

import styles from './Avatar.styles.css'

import WebComponent from '../../lib/WebComponent'
import { consume } from '@lit/context'
import { authContext, DEFAULT_AUTH_CONTEXT, AuthContext } from '../../lib/auth/context'
import commonStyles from '../../styles/common.styles.css'

@customElement('solid-avatar')
export default class Avatar extends WebComponent {
  static styles = [commonStyles, styles]
  static states = {
    fallback: (component: Avatar) => !component.auth.account?.avatarUrl,
  }

  @state()
  @consume({ context: authContext })
  private auth: AuthContext = DEFAULT_AUTH_CONTEXT

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
