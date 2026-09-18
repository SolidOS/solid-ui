import { html, nothing, type PropertyValues } from 'lit'
import type { NamedNode } from 'rdflib'
import { DataBrowserContext, type PaneDefinition } from 'pane-registry'
import { WebComponent } from '@/lib/components'
import { AJARImage } from '@/utils'
import { consume, provide } from '@lit/context'
import { fileExplorerContext, type FileExplorerContext } from '@/lib/file-explorer/context'
import { customElement, property, state } from 'lit/decorators.js'
import './FileExplorerHeader'
import styles from './FileExplorerProvider.styles.css'
import '~icons/lucide/share-2'
import '~icons/lucide/user'
import '~icons/lucide/users'

function createFileExplorerContextValue (value: {
  subjectUri: string | undefined
  pane?: PaneDefinition
  soloPane?: boolean
  onBack?: () => void
  openPane?: (subject: NamedNode, paneName: string) => void
  handleAccessClick?: () => void
  paneSupportsEditing?: boolean
  edit?: {
    onEdit?: () => void
    isDirty?: boolean
    updateDirtyState?: (dirty: boolean) => void
  }
}): FileExplorerContext {
  return {
    subjectUri: value.subjectUri,
    pane: value.pane,
    soloPane: value.soloPane,
    onBack: value.onBack,
    openPane: value.openPane,
    handleAccessClick: value.handleAccessClick,
    paneSupportsEditing: value.paneSupportsEditing,
    edit: value.edit
  }
}

@customElement('file-explorer-provider')
export default class FileExplorerProvider extends WebComponent {
  static styles = styles

  @property({ attribute: false })
  accessor context: DataBrowserContext | undefined = undefined

  @property({ attribute: false })
  accessor subjectUri: string | undefined = undefined

  @property({ attribute: false })
  accessor relevantPanes: PaneDefinition[] = []

  @property({ attribute: false })
  accessor pane: PaneDefinition | undefined = undefined

  @property({ attribute: false })
  accessor paneRenderOptions: Record<string, unknown> = {}

  @property({ attribute: false })
  accessor showHeader: boolean = true

  @property({ attribute: false })
  accessor handleAccessClick: (() => void) | undefined = undefined

  @property({ attribute: false })
  accessor soloPane: boolean | undefined = undefined

  @property({ attribute: false })
  accessor openPane: ((subject: NamedNode, paneName: string) => void) | undefined = undefined

  @consume({ context: fileExplorerContext, subscribe: true })
  accessor parentFileExplorerContext: FileExplorerContext = undefined as unknown as FileExplorerContext

  @state()
  accessor menuItems: Array<{ label: string, icon?: HTMLElement, action: (event: Event) => void }> = []

  @state()
  accessor isEditing: boolean = false

  @state()
  accessor isDirty: boolean = false

  @state()
  accessor paneSupportsEditing: boolean = false

  private beginEditingInSourcePane = () => {
    const sourceProvider = this.querySelector('source-pane-source-provider') as {
      beginEditing?: () => void
    } | null

    sourceProvider?.beginEditing?.()
  }

  @state()
  accessor edit = {
    onEdit: this.beginEditingInSourcePane,
    isDirty: false,
    updateDirtyState: (dirty: boolean) => {
      if (this.isDirty === dirty) return

      this.isDirty = dirty
      this.edit = {
        ...this.edit,
        isDirty: dirty
      }
      this.refreshFileExplorerContextValue()
    }
  }

  @state()
  accessor onBack: (() => void) | undefined = undefined

  @provide({ context: fileExplorerContext })
  accessor fileExplorerContextValue: FileExplorerContext = createFileExplorerContextValue({
    subjectUri: this.subjectUri,
    pane: this.pane,
    soloPane: this.soloPane,
    onBack: this.onBack ?? this.parentFileExplorerContext?.onBack,
    openPane: this.openPane,
    handleAccessClick: this.handleAccessClick,
    paneSupportsEditing: false,
    edit: this.edit
  })

  openSelectedPane (pane: PaneDefinition) {
    const store = this.context?.session.store
    if (!store || !this.subjectUri) return
    this.paneSupportsEditing = pane.name === 'source'
    this.pane = pane
  }

  private getPaneIcon (pane: PaneDefinition | undefined, subject: NamedNode, context: DataBrowserContext | undefined) {
    if (!pane) return undefined

    const paneWithIcon = pane as PaneDefinition & {
      icon?: string | ((subject: NamedNode, context: DataBrowserContext) => string | Promise<string>)
    }

    const icon = typeof paneWithIcon.icon === 'function'
      ? (paneWithIcon.icon as any)(subject, context as DataBrowserContext)
      : paneWithIcon.icon
    return icon
  }

  private async getPaneItems (subject: NamedNode, context: DataBrowserContext, relevantPanes: PaneDefinition[]) {
    const dom = context.dom
    const menuItems = await Promise.all(relevantPanes.map(async pane => {
      const label = pane.label(subject, context) ?? ''

      let icon: HTMLElement | undefined
      if (pane.name === 'profile') {
        icon = dom.createElement('icon-lucide-user')
      } else if (pane.name === 'social') {
        icon = dom.createElement('icon-lucide-users')
      } else {
        const paneIcon = await this.getPaneIcon(pane, subject, context)
        if (typeof paneIcon === 'string' && paneIcon) {
          icon = AJARImage(paneIcon, label, label, dom)
        }
      }

      icon?.setAttribute('slot', 'left-icon')

      return {
        label,
        icon,
        action: () => this.openPane?.(subject, pane.name)
      }
    }))
    return menuItems
  }

  private refreshFileExplorerContextValue () {
    this.fileExplorerContextValue = createFileExplorerContextValue({
      subjectUri: this.subjectUri,
      pane: this.pane,
      soloPane: this.soloPane,
      onBack: this.onBack ?? this.parentFileExplorerContext?.onBack,
      openPane: this.openPane,
      handleAccessClick: this.handleAccessClick,
      paneSupportsEditing: this.paneSupportsEditing,
      edit: this.edit
    })
  }

  private async refreshMenuItems () {
    const store = this.context?.session.store
    if (!store || !this.subjectUri) return

    const subject = store.sym(this.subjectUri)
    const menuItems = await this.getPaneItems(subject, this.context as DataBrowserContext, this.relevantPanes)

    this.menuItems = menuItems
  }

  protected willUpdate (changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties)
    if (!this.subjectUri) {
      throw new Error('The element is missing the required `subjectUri` property.')
    }

    if (
      changedProperties.has('subjectUri') ||
      changedProperties.has('relevantPanes') ||
      changedProperties.has('context')
    ) {
      this.refreshMenuItems().catch(error => {
        console.warn('Failed to refresh menu items', error)
      })
    }

    if (changedProperties.has('pane') || changedProperties.has('subjectUri') || changedProperties.has('context')) {
      this.paneSupportsEditing = this.pane?.name === 'source'
    }

    if (
      changedProperties.has('context') ||
      changedProperties.has('subjectUri') ||
      changedProperties.has('pane') ||
      changedProperties.has('soloPane') ||
      changedProperties.has('onBack') ||
      changedProperties.has('parentFileExplorerContext') ||
      changedProperties.has('openPane') ||
      changedProperties.has('handleAccessClick') ||
      changedProperties.has('paneSupportsEditing') ||
      changedProperties.has('isDirty')
    ) {
      this.refreshFileExplorerContextValue()
    }
  }

  render () {
    const store = this.context?.session.store
    if (!store || !this.subjectUri) {
      return html``
    }

    const subject = store.sym(this.subjectUri)
    return html`
      <div class="file-explorer-provider">
        ${this.showHeader
          ? html`
              <file-explorer-header
                .paneIcon=${this.getPaneIcon(this.pane, subject, this.context)}
                .menuItems=${this.menuItems}
                .paneSupportsEditing=${this.paneSupportsEditing}
              ></file-explorer-header>
            `
          : nothing}
        <slot class="pane"></slot>
      </div>
    `
  }
}
