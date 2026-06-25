import { customElement, WebComponent } from '@/lib/components'
import { property, query } from 'lit/decorators.js'
import { html } from 'lit'

import styles from './MenuItem.styles.css'

@customElement('solid-ui-menu-item')
export default class MenuItem extends WebComponent {
  static styles = styles

  @property({ type: String, reflect: true })
  accessor href: string | undefined

  @query('a')
  private accessor anchor: HTMLAnchorElement | null = null

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
        <slot name="left-icon"></slot>
        <slot></slot>
        <slot name="right-icon"></slot>
    `
  }

  click () {
    this.anchor?.click()
  }
}
