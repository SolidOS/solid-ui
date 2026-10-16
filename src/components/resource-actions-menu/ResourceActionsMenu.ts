import { WebComponent } from '@/lib/components'
import { customElement, property } from 'lit/decorators.js'
import { html, nothing } from 'lit'
import '@/components/button'
import '@/components/menu'
import '@/components/menu-item'
import '~icons/lucide/ellipsis-vertical'
import '~icons/lucide/user-round-cog'
import '~icons/lucide/pencil'
import { LiveStore } from 'rdflib'
import styles from './ResourceActionsMenu.styles.css'
import { isContainerSubject } from '@/utils/podUtils'

type ResourceActionMenuItem = {
  label: string
  icon?: unknown
  action?: (event: Event) => void
}

type ActionableResourceActionMenuItem = ResourceActionMenuItem & {
  action: (event: Event) => void
}

@customElement('solid-ui-resource-actions-menu')
export default class ResourceActionsMenu extends WebComponent {
  static styles = styles

  @property({ attribute: false })
  accessor store: LiveStore | undefined

  @property({ type: String })
  accessor subjectUri: string | undefined

  @property({ attribute: false })
  accessor handleAccessClick: (() => void) | undefined = undefined

  @property({ attribute: false })
  accessor handleEditingClick: (() => void) | undefined = undefined

  @property({ type: Boolean })
  accessor paneSupportsEditing = false

  @property({ type: Boolean })
  accessor canEdit = false

  @property({ type: Boolean })
  accessor isMobile = false

  @property({ attribute: false })
  accessor menuItems: ResourceActionMenuItem[] = []

  render () {
    const isContainerResource = isContainerSubject(this.store, this.subjectUri)
    const canEdit = !isContainerResource && this.isMobile && this.paneSupportsEditing && this.canEdit && !!this.handleEditingClick
    const canManageAccess = !!this.handleAccessClick
    const actionableMenuItems = this.menuItems.filter((item): item is ActionableResourceActionMenuItem => typeof item.action === 'function')
    return html`
      <solid-ui-menu>
        <solid-ui-button slot="trigger" class="file-explorer-header-more-button" variant="ghost" title="More options">
          <icon-lucide-ellipsis-vertical slot="icon" class="ellipsisIcon"></icon-lucide-ellipsis-vertical>
          <span class="sr-only">More options</span>
        </solid-ui-button>
        ${actionableMenuItems.map(item => html`
          <solid-ui-menu-item @solid-ui-select=${(event: Event) => item.action(event)}>
            ${item.icon}
            ${item.label}
          </solid-ui-menu-item>
        `)}
        ${canEdit
          ? html`
              <solid-ui-menu-item @solid-ui-select=${this.handleEditingClick}>
                <icon-lucide-pencil slot="left-icon"></icon-lucide-pencil>
                Edit
              </solid-ui-menu-item>
            `
          : nothing}
        ${!isContainerResource && this.isMobile && canManageAccess
          ? html`
              <solid-ui-menu-item @solid-ui-select=${this.handleAccessClick}>
                <icon-lucide-user-round-cog slot="left-icon"></icon-lucide-user-round-cog>
                Manage Access
              </solid-ui-menu-item>
            `
          : nothing}
        ${isContainerResource && canManageAccess
          ? html`
              <solid-ui-menu-item @solid-ui-select=${this.handleAccessClick}>
                <icon-lucide-user-round-cog slot="left-icon"></icon-lucide-user-round-cog>
                Manage Access
              </solid-ui-menu-item>
            `
          : nothing}
      </solid-ui-menu>
    `
  }
}
