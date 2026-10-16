import { WebComponent } from '@/lib/components'
import { customElement, property, state } from 'lit/decorators.js'
import { consume } from '@lit/context'
import { html, nothing } from 'lit'
import '@/components/button'
import '~icons/lucide/user-round-cog'
import '~icons/lucide/pencil'
import styles from './FileExplorerHeaderControls.styles.css'
import '@/components/resource-actions-menu/ResourceActionsMenu'
import { DEFAULT_FILE_EXPLORER_CONTEXT, fileExplorerContext } from '@/lib/file-explorer/context'
import { FILE_EXPLORER_MANAGE_ACCESS_EVENT } from '@/lib/file-explorer/events'
import { isContainerSubject } from '@/utils/podUtils'

@customElement('solid-ui-file-explorer-header-controls')
export default class FileExplorerHeaderControls extends WebComponent {
  static styles = styles

  private mobileMediaQuery: MediaQueryList | undefined
  private readonly mobileQuery = '(max-width: 600px)'
  private readonly handleMobileMediaChange = (event: MediaQueryListEvent) => {
    this.isMobile = event.matches
  }

  @consume({ context: fileExplorerContext, subscribe: true })
  accessor fileExplorerContext = DEFAULT_FILE_EXPLORER_CONTEXT

  @property({ attribute: false })
  accessor menuItems: Array<{ label: string, action: (event: Event) => void, icon?: HTMLElement }> = []

  @property({ type: Boolean })
  accessor canEdit: boolean = false

  @state()
  accessor isMobile = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(max-width: 600px)').matches
    : false

  connectedCallback () {
    super.connectedCallback()

    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }

    this.mobileMediaQuery = window.matchMedia(this.mobileQuery)
    this.isMobile = this.mobileMediaQuery.matches
    this.mobileMediaQuery.addEventListener('change', this.handleMobileMediaChange)
  }

  disconnectedCallback () {
    this.mobileMediaQuery?.removeEventListener('change', this.handleMobileMediaChange)
    this.mobileMediaQuery = undefined
    super.disconnectedCallback()
  }

  // TODO: Add broken then use this function to set tooltip and disable edit button
  /* private setEditable() {
    const sourcePaneState = this.sourceContext?.sourcePaneState
    const { canEdit } = this.sourceContext?.headerMetadata ?? { canEdit: false }
    const subject = this.sourceContext?.subject
    if (!sourcePaneState || !canEdit || sourcePaneState.broken || (subject && subject.endsWith('/'))) return

    this.sourceContext?.setEditing?.()
  } */

  private getEditTooltip () {
    if (!this.canEdit) return 'No Access'
    return 'Edit'
  }

  private handleManageAccess = () => {
    const subjectUri = this.fileExplorerContext.subjectUri
    if (!subjectUri) return

    this.dispatchEvent(new CustomEvent(FILE_EXPLORER_MANAGE_ACCESS_EVENT, {
      bubbles: true,
      composed: true,
      detail: { subjectUri }
    }))
  }

  private renderDirtyIndicator () {
    if (!this.fileExplorerContext.isDirty) return nothing

    return html`<span class="dirtyIndicator" title="This file has unsaved changes">Unsaved</span>`
  }

  render () {
    const isContainerResource = isContainerSubject(this.fileExplorerContext.store, this.fileExplorerContext.subjectUri)
    const supportsEditing = this.fileExplorerContext.canEdit

    return html`
      <div>
        ${this.renderDirtyIndicator()}
        ${!isContainerResource && !this.isMobile
          ? html`
              <solid-ui-button class="file-explorer-header-action-button" variant="ghost" title="Manage Access" @click=${this.handleManageAccess}>
                <icon-lucide-user-round-cog slot="icon"></icon-lucide-user-round-cog>
                <span class="sr-only">Manage access</span>
              </solid-ui-button>
              ${supportsEditing
                ? html`
                    <solid-ui-button
                      class="file-explorer-header-action-button"
                      variant="ghost"
                      title=${this.getEditTooltip()}
                      ?disabled=${!this.canEdit}
                      @click=${this.fileExplorerContext.beginEditing}
                    >
                      <icon-lucide-pencil slot="icon"></icon-lucide-pencil>
                      <span class="sr-only">Edit</span>
                    </solid-ui-button>
                  `
                : nothing}
            `
          : nothing}
        <solid-ui-resource-actions-menu
          .store=${this.fileExplorerContext.store}
          .handleAccessClick=${this.handleManageAccess}
          .handleEditingClick=${this.fileExplorerContext.beginEditing}
          .paneSupportsEditing=${this.fileExplorerContext.canEdit}
          .canEdit=${this.canEdit}
          .subjectUri=${this.fileExplorerContext.subjectUri}
          .menuItems=${this.menuItems}
          .isMobile=${this.isMobile}
        ></solid-ui-resource-actions-menu>
      </div>
    `
  }
}
