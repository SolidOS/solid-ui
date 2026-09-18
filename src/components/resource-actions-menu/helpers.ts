export type ResourceActionMenuItem = {
  kind?: 'custom' | 'edit' | 'access'
  label: string
  icon?: unknown
  action: (event: Event) => void
}

export type ResourceActionsMenuOptions = {
  isContainerResource: boolean
  isMobile: boolean
  paneSupportsEditing: boolean
  canEdit: boolean
  handleAccessClick?: (() => void) | undefined
  handleEditingClick?: (() => void) | undefined
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

  return visibleItems
}