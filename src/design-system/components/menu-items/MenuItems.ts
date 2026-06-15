import { consume } from '@lit/context'
import { html } from 'lit'
import { customElement } from '../../../primitives/lib/customElement'
import WebComponent from '../../../primitives/lib/WebComponent'
import { menuContext, MenuContext } from '../../lib/menus/context'

import styles from './MenuItems.styles.css'

@customElement('solid-ui-menu-items')
export default class MenuItems extends WebComponent {
  static styles = styles

  @consume({ context: menuContext, subscribe: true })
  private accessor context!: MenuContext

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
