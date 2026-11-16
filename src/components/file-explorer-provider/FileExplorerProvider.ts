import { html } from 'lit-html'
import { provide } from '@lit/context'
import { customElement, WebComponent } from '@/lib/components'
import { property, state } from 'lit/decorators.js'
import { DataBrowserContext, PaneDefinition } from 'pane-registry'
import { FileExplorerContext, FileExplorerEditor, fileExplorerContext } from '@/lib/file-explorer/context'

@customElement('solid-ui-file-explorer-provider')
export default class FileExplorerProvider extends WebComponent {
  @property({ attribute: false })
  accessor context: DataBrowserContext | undefined

  @property({ attribute: false })
  accessor subjectUri: string | undefined

  @property({ attribute: false })
  accessor pane: PaneDefinition | undefined

  @property({ attribute: false })
  accessor relevantPanes: PaneDefinition[] = []

  @property({ attribute: false })
  accessor soloPane: boolean | undefined

  @state() private accessor editor: FileExplorerEditor | undefined
  @state() private accessor isDirty = false

  @provide({ context: fileExplorerContext })
  accessor value!: FileExplorerContext

  private registerEditor = (editor: FileExplorerEditor) => {
    this.editor = editor
    return () => { if (this.editor === editor) this.editor = undefined }
  }

  protected willUpdate () {
    this.value = {
      store: this.context?.session.store,
      subjectUri: this.subjectUri,
      pane: this.pane,
      isDirty: this.isDirty,
      canEdit: !!this.editor,
      registerEditor: this.registerEditor,
      beginEditing: () => { this.editor?.beginEditing() },
      setDirty: (dirty) => { this.isDirty = dirty }
    }
  }

  render () {
    return html`<slot></slot>`
  }
}
