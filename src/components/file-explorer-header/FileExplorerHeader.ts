import { sym } from 'rdflib'
import { html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { consume } from '@lit/context'
import { WebComponent } from '@/lib/components'
import { fileExplorerContext, type FileExplorerContext } from '@/lib/file-explorer/context'
import { storeContext, DEFAULT_STORE } from '@/lib/store/context'
import type { LiveStore } from 'rdflib'
import '~icons/lucide/share-2'
import '~icons/lucide/pencil'
import '~icons/lucide/ellipsis-vertical'
import styles from './FileExplorerHeader.styles.css'
import './FileExplorerHeaderSummary'
import './FileExplorerHeaderControls'
import { type PaneIcon } from './types'
import { fetchResourceMetadata } from './metadata'
import { type FileExplorerResourceMetadata } from './types'

@customElement('file-explorer-header')
export default class FileExplorerHeader extends WebComponent {
  static styles = styles

  private _loadedMetadataForUri: string | undefined

  @consume({ context: fileExplorerContext, subscribe: true })
  accessor fileExplorerContext: FileExplorerContext = undefined as unknown as FileExplorerContext

  @consume({ context: storeContext, subscribe: true })
  accessor store: LiveStore = DEFAULT_STORE

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

  private getDefaultResponseMetadata (): Pick<FileExplorerResourceMetadata, 'modified' | 'isPublic' | 'canEdit' | 'aclUri'> {
    return {
      modified: undefined,
      isPublic: false,
      canEdit: false,
      aclUri: undefined
    }
  }

  private get shouldRenderHeader () {
    return !this.fileExplorerContext?.pane?.mintClass
  }

  protected updated () {
    if (this.store && this.fileExplorerContext.subjectUri && this._loadedMetadataForUri !== this.fileExplorerContext.subjectUri) {
      this._loadedMetadataForUri = this.fileExplorerContext.subjectUri
      this.loadResponseMetadata()
    }
  }

  private async loadResponseMetadata () {
    if (!this.store || !this.fileExplorerContext.subjectUri) return

    try {
      const metadata = await fetchResourceMetadata(this.store, sym(this.fileExplorerContext.subjectUri))
      this.responseMetadata = {
        modified: metadata.modified,
        isPublic: metadata.isPublic,
        canEdit: metadata.canEdit,
        aclUri: metadata.aclUri
      }
    } catch (error) {
      this.responseMetadata = this.getDefaultResponseMetadata()
      console.warn('Failed to load response metadata', error)
    }
  }

  render () {
    if (!this.shouldRenderHeader) {
      return html`${nothing}`
    }

    return html`
      <header>
        <file-explorer-header-summary
          .paneIcon=${this.paneIcon}
          .onBackClick=${this.fileExplorerContext?.onBack}
          .responseMetadata=${this.responseMetadata}
        ></file-explorer-header-summary>
        <file-explorer-header-controls
          .menuItems=${this.menuItems}
          .canEdit=${this.responseMetadata.canEdit}
        ></file-explorer-header-controls>
      </header>
    `
  }
}
