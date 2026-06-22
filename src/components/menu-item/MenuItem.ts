import { customElement, WebComponent } from '@/lib/components'
import { property } from 'lit/decorators.js'
import { html } from 'lit'

import styles from './MenuItem.styles.css'

@customElement('solid-ui-menu-item')
export default class MenuItem extends WebComponent {
  static styles = styles

  @property({ type: String })
  accessor href: string | undefined

  render () {
    if (this.href) {
      return html`
        <a href="${this.href}" target="_blank" rel="noopener noreferrer">
            <slot name="left-icon"></slot>
            <slot></slot>
            <slot name="right-icon"></slot>
        </a>
      `
    }

    return html`
        <button type="button">
            <slot name="left-icon"></slot>
            <slot></slot>
            <slot name="right-icon"></slot>
        </button>
    `
  }
}
