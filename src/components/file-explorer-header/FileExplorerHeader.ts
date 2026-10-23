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
  private _metadataGeneration = 0

  @consume({ context: fileExplorerContext, subscribe: true })
  accessor fileExplorerContext = DEFAULT_FILE_EXPLORER_CONTEXT

  @property({ attribute: false })
  accessor menuItems: Array<{ label: string, action: (event: Event) => void }> = []

  @property({ attribute: false })
  accessor paneIcon: PaneIcon = undefined as unknown as PaneIcon

  @state()
  accessor responseMetadata: Pick<FileExplorerResourceMetadata, 'modified' | 'isPublic' | 'canEdit' | 'canManageAccess' | 'aclUri'> = {
    modified: undefined,
    isPublic: false,
    canEdit: false,
    canManageAccess: false,
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

  private getDefaultResponseMetadata (): Pick<FileExplorerResourceMetadata, 'modified' | 'isPublic' | 'canEdit' | 'canManageAccess' | 'aclUri'> {
    return {
      modified: undefined,
      isPublic: false,
      canEdit: false,
      canManageAccess: false,
      aclUri: undefined
    }
  }

  protected willUpdate () {
    const subjectUri = this.fileExplorerContext?.subjectUri
    if (this.fileExplorerContext?.store && subjectUri && this._loadedMetadataForUri !== subjectUri) {
      this._loadedMetadataForUri = subjectUri
      const generation = ++this._metadataGeneration
      this.responseMetadata = this.getDefaultResponseMetadata()
      this.loadResponseMetadata(subjectUri, generation)
    }
  }

  private async loadResponseMetadata (subjectUri: string, generation: number) {
    try {
      const metadata = await solidLogicSingleton.resource.fetchMetadata(sym(subjectUri))
      if (generation === this._metadataGeneration && this.fileExplorerContext.subjectUri === subjectUri) {
        this.responseMetadata = {
          modified: metadata.modified,
          isPublic: metadata.access.isPublic,
          canEdit: metadata.access.canEdit,
          canManageAccess: metadata.access.canManageAccess,
          aclUri: metadata.aclUri
        }
      }
    } catch (error) {
      if (generation === this._metadataGeneration && this.fileExplorerContext.subjectUri === subjectUri) {
        this.responseMetadata = this.getDefaultResponseMetadata()
        console.warn('Failed to load response metadata', error)
      }
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
          .canManageAccess=${this.responseMetadata.canManageAccess}
        ></solid-ui-file-explorer-header-controls>
      </header>
    `
  }
}
