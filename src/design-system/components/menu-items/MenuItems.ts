import { customElement } from 'lit/decorators.js'
import WebComponent from '../../../primitives/lib/WebComponent'
import { consume } from '@lit/context'
import { menuContext, MenuContext } from '../menu'

import styles from './MenuItems.styles.css'
import { html } from 'lit'

@customElement('solid-ui-menu-items')
export default class MenuItems extends WebComponent {
  static styles = styles

  @consume({ context: menuContext })
  private context?: MenuContext

  connectedCallback () {
    super.connectedCallback()

    this.setAttribute('popover', 'auto')
    this.setAttribute('role', 'menu')

    this.style.positionAnchor = '--menu-anchor'

    if (this.context) {
      this.id = `${this.context.id}-menu-items`
    }
  }

  render () {
    return html`
        <div>
            <slot></slot>
        </div>
    `
  }
}
