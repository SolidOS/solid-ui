import type { LiveStore } from 'rdflib'
import type { PaneDefinition } from 'pane-registry'
import { createContext } from '@lit/context'
import { noopContext } from '@/lib/context/noopContext'

export interface FileExplorerEditor {
  beginEditing (): void
}

export interface FileExplorerContext {
  readonly store: LiveStore | undefined
  readonly subjectUri: string | undefined
  readonly pane: PaneDefinition | undefined
  readonly isDirty: boolean
  readonly canEdit: boolean            // true while an editor is registered
  registerEditor (editor: FileExplorerEditor): () => void   // returns unregister
  beginEditing (): void
  setDirty (dirty: boolean): void
}

export const fileExplorerContext = createContext<FileExplorerContext>(Symbol('file-explorer'))
export const DEFAULT_FILE_EXPLORER_CONTEXT = noopContext<FileExplorerContext>('file-explorer')
