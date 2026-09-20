export type ResourceActionMenuItem = {
  kind?: 'custom' | 'edit' | 'access' | 'delete'
  label: string
  icon?: unknown
  action: (event: Event) => void
}

export type ResourceActionsMenuOptions = {
  isContainerResource: boolean
  isMobile: boolean
  paneSupportsEditing: boolean
  canEdit: boolean
  deleteLabel?: string
  handleAccessClick?: (() => void) | undefined
  handleEditingClick?: (() => void) | undefined
  handleDeleteClick?: (() => void) | undefined
  menuItems?: ResourceActionMenuItem[]
}

export function getVisibleResourceActions (options: ResourceActionsMenuOptions): ResourceActionMenuItem[] {
  const visibleItems = [...(options.menuItems ?? [])]

  const canEdit = !options.isContainerResource && options.isMobile && options.paneSupportsEditing && options.canEdit && !!options.handleEditingClick
  if (canEdit && options.handleEditingClick) {
    visibleItems.push({
      kind: 'edit',
      label: 'Edit',
      action: options.handleEditingClick,
    })
  }

  const canManageAccess = !!options.handleAccessClick
  if (canManageAccess && options.handleAccessClick) {
    visibleItems.push({
      kind: 'access',
      label: 'Manage Access',
      action: options.handleAccessClick,
    })
  }

  if (options.handleDeleteClick) {
    visibleItems.push({
      kind: 'delete',
      label: options.deleteLabel ?? 'Move to Trash',
      action: options.handleDeleteClick,
    })
  }

  return visibleItems
}