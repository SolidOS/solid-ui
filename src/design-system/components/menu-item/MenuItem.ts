import { customElement } from 'lit/decorators.js'
import WebComponent from '../../../primitives/lib/WebComponent'
import { html } from 'lit'

import styles from './MenuItem.styles.css'

@customElement('solid-ui-menu-item')
export default class MenuItem extends WebComponent {
  static styles = styles

  render () {
    return html`
        <button type="button">
            <slot name="left-icon"></slot>
            <slot></slot>
            <slot name="right-icon"></slot>
        </button>
    `
  }
}
