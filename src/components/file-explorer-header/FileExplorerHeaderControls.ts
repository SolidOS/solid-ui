import { html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { WebComponent } from '@/lib/components'
import '@/components/button'
import '@/components/resource-actions-menu'
import { consume } from '@lit/context'
import { fileExplorerContext, type FileExplorerContext } from '@/lib/file-explorer/context'
import { storeContext, DEFAULT_STORE } from '@/lib/store/context'
import type { LiveStore } from 'rdflib'
import { solidLogicSingleton } from 'solid-logic'
import { sym } from 'rdflib'
import styles from './FileExplorerHeaderControls.styles.css'

@customElement('file-explorer-header-controls')
export default class FileExplorerHeaderControls extends WebComponent {
  static styles = styles

  private mobileMediaQuery: MediaQueryList | undefined
  private readonly mobileQuery = '(max-width: 600px)'
  private readonly handleMobileMediaChange = (event: MediaQueryListEvent) => {
    this.isMobile = event.matches
  }

  private handleMobileAccessClick = () => {
    const subject = this.fileExplorerContext.subjectUri ? sym(this.fileExplorerContext.subjectUri) : undefined

    if (subject && this.fileExplorerContext.openPane) {
      this.fileExplorerContext.openPane(subject, 'sharing')
      return
    }

    this.fileExplorerContext.handleAccessClick?.()
  }

  @consume({ context: fileExplorerContext, subscribe: true })
  accessor fileExplorerContext: FileExplorerContext = undefined as unknown as FileExplorerContext

  @consume({ context: storeContext, subscribe: true })
  accessor store: LiveStore = DEFAULT_STORE

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

  private getEditTooltip () {
    if (!this.fileExplorerContext.paneSupportsEditing) return 'Not Supported'
    if (!this.canEdit) return 'No Access'
    return 'Edit'
  }

  private renderDirtyIndicator () {
    if (!this.fileExplorerContext.edit?.isDirty) return nothing

    return html`<span class="dirtyIndicator" title="This file has unsaved changes">Unsaved</span>`
  }

  render () {
    const subject = this.fileExplorerContext.subjectUri ? sym(this.fileExplorerContext.subjectUri) : undefined
    const isContainerResource = subject ? solidLogicSingleton.resource.isContainer(subject) : false

    return html`
      <div>
        ${this.renderDirtyIndicator()}
        ${!this.isMobile
          ? html`
              <solid-ui-button class="file-explorer-header-access-button" variant="ghost" title="Manage Access" @click=${this.fileExplorerContext.handleAccessClick}>
                <icon-lucide-share-2 slot="icon"></icon-lucide-share-2>
              </solid-ui-button>
              <solid-ui-button
                class="file-explorer-header-edit-button"
                variant="ghost"
                title=${this.getEditTooltip()}
                ?disabled=${!this.fileExplorerContext.paneSupportsEditing || !this.canEdit}
                @click=${this.fileExplorerContext.edit?.onEdit}
              >
                <icon-lucide-pencil slot="icon"></icon-lucide-pencil>
              </solid-ui-button>
            `
          : nothing}
        <solid-ui-resource-actions-menu
          .isContainerResource=${isContainerResource}
          .handleAccessClick=${this.isMobile ? this.handleMobileAccessClick : undefined}
          .handleEditingClick=${this.fileExplorerContext.edit?.onEdit}
          .paneSupportsEditing=${this.fileExplorerContext.paneSupportsEditing}
          .canEdit=${this.canEdit}
          .menuItems=${this.menuItems}
          .isMobile=${this.isMobile}
        ></solid-ui-resource-actions-menu>
      </div>
    `
  }
}
