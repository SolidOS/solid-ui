import { sym } from 'rdflib'
import { customElement, WebComponent } from '@/lib/components'
import * as utils from '@/utils'
import * as widgets from '@/widgets/index'
import { DEFAULT_FILE_EXPLORER_CONTEXT, fileExplorerContext } from '@/lib/file-explorer/context'
import '@/components/button'
import { property, query, state } from 'lit/decorators.js'
import type { PropertyValues } from 'lit'
import { html } from 'lit'
import { consume } from '@lit/context'
import { PaneIcon } from './types'
import '~icons/lucide/globe'
import '~icons/lucide/lock-keyhole'
import '~icons/lucide/arrow-left'
import '~icons/lucide/folder'
import styles from './FileExplorerHeaderSummary.styles.css'
import { getContainerItemCount, isContainerSubject } from '@/utils/podUtils'
import type { FileExplorerResourceMetadata } from './types'

@customElement('solid-ui-file-explorer-header-summary')
export default class FileExplorerHeaderSummary extends WebComponent {
  static styles = styles

  private _draggableSubjectUri: string | undefined
  private _paneIconGeneration = 0

  @consume({ context: fileExplorerContext, subscribe: true })
  accessor fileExplorerContext = DEFAULT_FILE_EXPLORER_CONTEXT

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

  protected willUpdate (changedProperties: PropertyValues<this>) {
    if (changedProperties.has('paneIcon')) {
      const generation = ++this._paneIconGeneration
      this.resolvedPaneIcon = undefined
      this.resolvePaneIcon(this.paneIcon, generation)
    }
  }

  protected updated () {
    if (!this.titleHeading || !this.fileExplorerContext?.subjectUri || this._draggableSubjectUri === this.fileExplorerContext.subjectUri) return

    widgets.makeDraggable(this.titleHeading, sym(this.fileExplorerContext.subjectUri)) // doing it this way for now, just to keep the same functionality
    this._draggableSubjectUri = this.fileExplorerContext.subjectUri
  }

  // Needed because humanReadable pane can return a promise for an icon.
  private async resolvePaneIcon (paneIcon: PaneIcon | undefined, generation: number) {
    try {
      if (paneIcon == null) return

      const icon = await paneIcon
      if (generation === this._paneIconGeneration) {
        this.resolvedPaneIcon = icon ?? undefined
      }
    } catch (error) {
      if (generation === this._paneIconGeneration) {
        this.resolvedPaneIcon = undefined
        console.warn('file-explorer-header-summary: failed to resolve pane icon', error)
      }
    }
  }

  private renderContainerResourceHeader (label: string, isPublic: boolean) {
    const itemCount = getContainerItemCount(this.fileExplorerContext?.store, this.fileExplorerContext?.subjectUri) ?? 0
    return html`
      <div class="container-info">
        <h1>
          <span>${label}</span>
        </h1>
        <p>
        ${itemCount} items
          ${isPublic
            ? html`<span class="public"><icon-lucide-globe aria-hidden="true"></icon-lucide-globe><span class="sr-only">Public</span></span>`
            : html`<span class="private"><icon-lucide-lock-keyhole aria-hidden="true"></icon-lucide-lock-keyhole><span class="sr-only">Private</span></span>`}
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
    const label = subject ? utils.label(subject) : ''
    const isPublic = this.responseMetadata.isPublic
    const isContainerResource = isContainerSubject(this.fileExplorerContext?.store, this.fileExplorerContext?.subjectUri)

    return html`
      <div class="file-explorer-header-summary">
        <solid-ui-button
          variant="ghost"
          @click=${this.onBackClick}
          title="Back"
        >
          <icon-lucide-arrow-left></icon-lucide-arrow-left>
          <span class="sr-only">Back</span>
        </solid-ui-button>
        <span class="pane-icon">
          ${this.resolvedPaneIcon ? html`<img src=${this.resolvedPaneIcon} alt="" />` : ''}
        </span>
        ${isContainerResource ? this.renderContainerResourceHeader(label, isPublic) : this.renderResourceHeader(label, isPublic)}
      </div>
      </div>
    `
  }
}
