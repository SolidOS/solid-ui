import { sym } from 'rdflib'
import { solidLogicSingleton } from 'solid-logic'
import { WebComponent } from '@/lib/components'
import { DEFAULT_FILE_EXPLORER_CONTEXT, fileExplorerContext } from '@/lib/file-explorer/context'
import { FILE_EXPLORER_BACK_EVENT } from '@/lib/file-explorer/events'
import { customElement, property, state } from 'lit/decorators.js'
import { consume } from '@lit/context'
import { html } from 'lit'
import '~icons/lucide/share-2'
import '~icons/lucide/pencil'
import '~icons/lucide/ellipsis-vertical'
import styles from './FileExplorerHeader.styles.css'
import './FileExplorerHeaderSummary'
import './FileExplorerHeaderControls'
import { PaneIcon } from './types'
import { type FileExplorerResourceMetadata } from './types'

@customElement('solid-ui-file-explorer-header')
export default class FileExplorerHeader extends WebComponent {
  static styles = styles

  private _loadedMetadataForUri: string | undefined

  @consume({ context: fileExplorerContext, subscribe: true })
  accessor fileExplorerContext = DEFAULT_FILE_EXPLORER_CONTEXT

  @property({ attribute: false })
  accessor menuItems: Array<{ label: string, action: (event: Event) => void }> = []

  @property({ attribute: false })
  accessor paneIcon: PaneIcon = undefined as unknown as PaneIcon

  @state()
  accessor responseMetadata: Pick<FileExplorerResourceMetadata, 'modified' | 'isPublic' | 'canEdit' | 'aclUri'> = {
    modified: undefined,
    isPublic: false,
    canEdit: false,
    aclUri: undefined
  }

  private handleBack = () => {
    this.dispatchEvent(new CustomEvent(FILE_EXPLORER_BACK_EVENT, {
      bubbles: true,
      composed: true,
      detail: {
        subjectUri: this.fileExplorerContext.subjectUri
      }
    }))
  }

  private getDefaultResponseMetadata (): Pick<FileExplorerResourceMetadata, 'modified' | 'isPublic' | 'canEdit' | 'aclUri'> {
    return {
      modified: undefined,
      isPublic: false,
      canEdit: false,
      aclUri: undefined
    }
  }

  protected updated () {
    if (this.fileExplorerContext?.store && this.fileExplorerContext.subjectUri && this._loadedMetadataForUri !== this.fileExplorerContext.subjectUri) {
      this._loadedMetadataForUri = this.fileExplorerContext.subjectUri
      this.loadResponseMetadata()
    }
  }

  private async loadResponseMetadata () {
    if (!this.fileExplorerContext?.store || !this.fileExplorerContext.subjectUri) return

    try {
      const metadata = await solidLogicSingleton.resource.fetchMetadata(sym(this.fileExplorerContext.subjectUri))
      this.responseMetadata = {
        modified: metadata.modified,
        isPublic: metadata.access.isPublic,
        canEdit: metadata.access.canEdit,
        aclUri: metadata.aclUri
      }
    } catch (error) {
      this.responseMetadata = this.getDefaultResponseMetadata()
      console.warn('Failed to load response metadata', error)
    }
  }

  render () {
    return html`
      <header>
        <solid-ui-file-explorer-header-summary
          .paneIcon=${this.paneIcon}
          .onBackClick=${this.handleBack}
          .responseMetadata=${this.responseMetadata}
        ></solid-ui-file-explorer-header-summary>
        <solid-ui-file-explorer-header-controls
          .menuItems=${this.menuItems}
          .canEdit=${this.responseMetadata.canEdit}
        ></solid-ui-file-explorer-header-controls>
      </header>
    `
  }
}
