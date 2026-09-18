import { sym } from 'rdflib'
import { html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { consume } from '@lit/context'
import { WebComponent } from '@/lib/components'
import { fileExplorerContext, type FileExplorerContext } from '@/lib/file-explorer/context'
import { storeContext, DEFAULT_STORE } from '@/lib/store/context'
import { solidLogicSingleton } from 'solid-logic'
import type { LiveStore } from 'rdflib'
import styles from './FileExplorerHeaderSummary.styles.css'
import { getContainerItemCount } from './metadata'
import type { FileExplorerResourceMetadata, PaneIcon } from './types'
import '@/components/button'
import { makeDraggable } from '@/widgets/dragAndDrop.js'
import { label as resourceLabel } from '@/utils/label'
import '~icons/lucide/globe'
import '~icons/lucide/lock-keyhole'
import '~icons/lucide/arrow-left'
import '~icons/lucide/folder'

@customElement('file-explorer-header-summary')
export default class FileExplorerHeaderSummary extends WebComponent {
  static styles = styles

  private _draggableSubjectUri: string | undefined
  private _resolvedPaneIconFor: PaneIcon | undefined

  @consume({ context: fileExplorerContext, subscribe: true })
  accessor fileExplorerContext: FileExplorerContext = undefined as unknown as FileExplorerContext

  @consume({ context: storeContext, subscribe: true })
  accessor store: LiveStore = DEFAULT_STORE

  @property({ attribute: false })
  accessor paneIcon: PaneIcon | undefined

  @property({ attribute: false })
  accessor onBackClick: (() => void) | undefined

  @property({ attribute: false })
  accessor responseMetadata: Pick<FileExplorerResourceMetadata, 'modified' | 'isPublic'> = {
    modified: undefined,
    isPublic: false
  }

  @state()
  accessor resolvedPaneIcon: string | undefined = undefined

  @query('h1')
  private accessor titleHeading: HTMLHeadingElement | null = null

  private formatModifiedDate (modified: string | undefined) {
    if (!modified) return ''

    const date = new Date(modified)
    if (Number.isNaN(date.getTime())) return modified

    const parts = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).formatToParts(date)

    const getPart = (type: Intl.DateTimeFormatPartTypes) => parts.find(part => part.type === type)?.value ?? ''
    const day = getPart('day')
    const month = getPart('month')
    const year = getPart('year')
    const hour = getPart('hour')
    const minute = getPart('minute')
    const dayPeriod = getPart('dayPeriod').toUpperCase()

    return `${day} ${month}, ${year} at ${hour}:${minute} ${dayPeriod}`
  }

  protected updated () {
    if (this.paneIcon !== undefined && this._resolvedPaneIconFor !== this.paneIcon) {
      this._resolvedPaneIconFor = this.paneIcon
      this.resolvePaneIcon()
    }

    if (!this.titleHeading || !this.fileExplorerContext?.subjectUri || this._draggableSubjectUri === this.fileExplorerContext.subjectUri) return

    makeDraggable(this.titleHeading, sym(this.fileExplorerContext.subjectUri))
    this._draggableSubjectUri = this.fileExplorerContext.subjectUri
  }

  private async resolvePaneIcon () {
    try {
      if (this.paneIcon == null) {
        this.resolvedPaneIcon = undefined
        return
      }

      const icon = await this.paneIcon
      this.resolvedPaneIcon = icon ?? undefined
    } catch (error) {
      this.resolvedPaneIcon = undefined
      console.warn('file-explorer-header-summary: failed to resolve pane icon', error)
    }
  }

  private renderContainerResourceHeader (label: string, isPublic: boolean) {
    const itemCount = getContainerItemCount(this.store, this.fileExplorerContext?.subjectUri) ?? 0
    return html`
      <div class="container-info">
        <h1>
          <span>${label}</span>
        </h1>
        <p>
        ${itemCount} items
          ${isPublic
            ? html`<span class="public"><icon-lucide-globe></icon-lucide-globe></span>`
            : html`<span class="private"><icon-lucide-lock-keyhole></icon-lucide-lock-keyhole></span>`}
        </p>
      </div>
    `
  }

  private renderResourceHeader (label: string, isPublic: boolean) {
    const modified = this.formatModifiedDate(this.responseMetadata.modified)

    return html`
        <div class="resource-info">
          <h1>
            <span>${label}</span>
          </h1>
          <p><span class="resource-date">${modified}</span> ${isPublic ? html`<span class="public"><icon-lucide-globe></icon-lucide-globe> Public</span>` : html`<span class="private"><icon-lucide-lock-keyhole></icon-lucide-lock-keyhole> Private</span>`}</p>
        </div>
    `
  }

  render () {
    const subject = this.fileExplorerContext?.subjectUri ? sym(this.fileExplorerContext.subjectUri) : undefined
    const label = subject ? resourceLabel(subject) : ''
    const isPublic = this.responseMetadata.isPublic
    const isContainerResource = subject ? solidLogicSingleton.resource.isContainer(subject) : false

    return html`
      <div class="file-explorer-header-summary">
        <solid-ui-button
          variant="ghost"
          @click=${() => this.onBackClick?.()}
          title="Back"
        >
          <icon-lucide-arrow-left></icon-lucide-arrow-left>
        </solid-ui-button>
        <span class="pane-icon">
          ${this.resolvedPaneIcon ? html`<img src=${this.resolvedPaneIcon} alt="" />` : ''}
        </span>
        ${isContainerResource ? this.renderContainerResourceHeader(label, isPublic) : this.renderResourceHeader(label, isPublic)}
      </div>
    `
  }
}
