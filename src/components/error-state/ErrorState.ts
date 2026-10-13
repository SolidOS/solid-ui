import { customElement, WebComponent } from '@/lib/components'
import { html, nothing } from 'lit'
import { property } from 'lit/decorators.js'

import '@/components/button'
import '~icons/lucide/triangle-alert'
import '~icons/lucide/x'

import styles from './ErrorState.styles.css'

@customElement('solid-ui-error-state')
export default class ErrorState extends WebComponent {
  static styles = styles

  @property({ type: String })
  accessor title = ''

  @property({ type: String })
  accessor message = ''

  render () {
    return html`
      <section role="alert">
        <solid-ui-button class="close-button" variant="ghost" aria-label="Close">
          <icon-lucide-x slot="icon" aria-hidden="true"></icon-lucide-x>
        </solid-ui-button>
        <div class="icon">
          <icon-lucide-triangle-alert aria-hidden="true"></icon-lucide-triangle-alert>
        </div>
        <div class="content">
          ${this.title ? html`<h2>${this.title}</h2>` : nothing}
          ${this.message ? html`<p>${this.message}</p>` : nothing}
          <slot></slot>
        </div>
      </section>
    `
  }
}
