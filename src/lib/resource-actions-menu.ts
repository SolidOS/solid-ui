import type { NamedNode } from 'rdflib'
import type { DiscoveryState } from '@/lib/discovery'

export type ResourceActionsMenuBindings = {
  deleteLabel: string
  handleAccessClick?: (() => void) | undefined
  handleDeleteClick?: (() => void) | undefined
  discoverPublicly: boolean
  discoverPrivately: boolean
  handleDiscoverPublicClick?: (() => void) | undefined
  handleDiscoverPrivateClick?: (() => void) | undefined
}

export function getResourceDeleteLabel (subject?: NamedNode): string {
  return subject?.dir()?.uri.endsWith('/Trash/') ? 'Permanently Delete' : 'Move to Trash'
}

export function buildResourceActionsMenuBindings (options: {
  subject?: NamedNode
  discoveryState?: DiscoveryState
  handleAccessClick?: (() => void) | undefined
  canDelete?: boolean
  handleDeleteClick?: (() => void) | undefined
  handleDiscoverPublicClick?: (() => void) | undefined
  handleDiscoverPrivateClick?: (() => void) | undefined
}): ResourceActionsMenuBindings {
  return {
    deleteLabel: getResourceDeleteLabel(options.subject),
    handleAccessClick: options.handleAccessClick,
    handleDeleteClick: options.canDelete ? options.handleDeleteClick : undefined,
    discoverPublicly: options.discoveryState?.public ?? false,
    discoverPrivately: options.discoveryState?.private ?? false,
    handleDiscoverPublicClick: options.handleDiscoverPublicClick,
    handleDiscoverPrivateClick: options.handleDiscoverPrivateClick,
  }
}
