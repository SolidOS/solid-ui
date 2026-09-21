import { createContext } from '@lit/context'
import type { NamedNode } from 'rdflib'
import type { PaneDefinition } from 'pane-registry'

export interface FileExplorerEdit {
  onEdit?: () => void
  isDirty?: boolean
  updateDirtyState?: (dirty: boolean) => void
}

export interface FileExplorerContext {
  subjectUri: string | undefined
  pane?: PaneDefinition
  soloPane?: boolean

  onBack?: () => void
  openPane?: (subject: NamedNode, paneName: string) => void
  handleAccessClick?: () => void
  deleteResource?: (subject: NamedNode) => Promise<void>
  resourceRevision?: number
  discoverClass?: NamedNode

  paneSupportsEditing?: boolean
  edit?: FileExplorerEdit
}

export const fileExplorerContext = createContext<FileExplorerContext>(Symbol('file-explorer'))
