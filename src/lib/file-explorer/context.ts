import { createContext } from '@lit/context'
import { LiveStore } from 'rdflib'
import type { NamedNode } from 'rdflib'
import type { PaneDefinition } from 'pane-registry'

export interface FileExplorerEdit {
  onEdit?: () => void
  isDirty?: boolean
  updateDirtyState?: (dirty: boolean) => void
}

export interface FileExplorerContext {
  store: LiveStore | undefined
  subjectUri: string | undefined
  pane?: PaneDefinition
  soloPane?: boolean

  onBack?: () => void
  refresh?: () => void
  deleteTargetUri?: string
  openPane?: (subject: NamedNode, paneName: string) => void
  handleSharingClick?: () => void

  paneSupportsEditing?: boolean
  edit?: FileExplorerEdit
}

export const fileExplorerContext = createContext<FileExplorerContext>(Symbol('file-explorer'))
