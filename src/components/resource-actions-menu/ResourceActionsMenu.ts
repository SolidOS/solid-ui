import { customElement, property } from 'lit/decorators.js'
import { html, nothing } from 'lit'
import { WebComponent } from '@/lib/components'
import 'solid-ui/components/button'
import 'solid-ui/components/menu'
import 'solid-ui/components/menu-item'
import '~icons/lucide/ellipsis-vertical'
import '~icons/lucide/share-2'
import '~icons/lucide/pencil'

import styles from './ResourceActionsMenu.styles.css'
import { getVisibleResourceActions, type ResourceActionMenuItem } from './helpers'

@customElement('solid-ui-resource-actions-menu')
export default class ResourceActionsMenu extends WebComponent {
  static styles = styles

  @property({ type: Boolean })
  accessor isContainerResource = false

  @property({ type: Boolean })
  accessor isMobile = false

  @property({ type: Boolean })
  accessor paneSupportsEditing = false

  @property({ type: Boolean })
  accessor canEdit = false

  @property({ attribute: false })
  accessor handleAccessClick: (() => void) | undefined = undefined

  @property({ attribute: false })
  accessor handleEditingClick: (() => void) | undefined = undefined

  @property({ attribute: false })
  accessor menuItems: ResourceActionMenuItem[] = []

  render () {
    const visibleItems = getVisibleResourceActions({
      isContainerResource: this.isContainerResource,
      isMobile: this.isMobile,
      paneSupportsEditing: this.paneSupportsEditing,
      canEdit: this.canEdit,
      handleAccessClick: this.handleAccessClick,
      handleEditingClick: this.handleEditingClick,
      menuItems: this.menuItems,
    })

    const renderIcon = (item: ResourceActionMenuItem) => {
      if (item.icon) {
        return item.icon
      }

      if (item.kind === 'edit') {
        return html`<icon-lucide-pencil slot="left-icon"></icon-lucide-pencil>`
      }

      if (item.kind === 'access') {
        return html`<icon-lucide-share-2 slot="left-icon"></icon-lucide-share-2>`
      }

      return nothing
    }

    return html`
      <solid-ui-menu>
        <solid-ui-button slot="trigger" variant="ghost" title="More options">
          <icon-lucide-ellipsis-vertical slot="icon" class="ellipsisIcon"></icon-lucide-ellipsis-vertical>
        </solid-ui-button>
        ${visibleItems.map(item => html`
          <solid-ui-menu-item @solid-ui-select=${item.action}>
            ${renderIcon(item)}
            ${item.label}
          </solid-ui-menu-item>
        `)}
      </solid-ui-menu>
    `
  }
}
