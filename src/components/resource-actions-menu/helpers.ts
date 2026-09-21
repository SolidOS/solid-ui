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
  discoverPublicly?: boolean
  discoverPrivately?: boolean
  handleDiscoverPublicClick?: (() => void) | undefined
  handleDiscoverPrivateClick?: (() => void) | undefined
  menuItems?: ResourceActionMenuItem[]
}

export function getVisibleResourceActions (options: ResourceActionsMenuOptions): ResourceActionMenuItem[] {
  const visibleItems = [...(options.menuItems ?? [])]
  const createDiscoveryIcon = (iconName: string) => {
    const icon = document.createElement(iconName)
    icon.setAttribute('slot', 'left-icon')
    return icon
  }

  const canEdit = !options.isContainerResource && options.isMobile && options.paneSupportsEditing && options.canEdit && !!options.handleEditingClick
  if (canEdit && options.handleEditingClick) {
    visibleItems.push({
      kind: 'edit',
      label: 'Edit',
      action: options.handleEditingClick,
    })
  }

  visibleItems.push({
    kind: 'custom',
    label: options.discoverPublicly ? 'Undiscover Publicly' : 'Discover Publicly',
    icon: createDiscoveryIcon('icon-lucide-globe'),
    action: options.handleDiscoverPublicClick ?? (() => {
    }),
  })

  visibleItems.push({
    kind: 'custom',
    label: options.discoverPrivately ? 'Undiscover Privately' : 'Discover Privately',
    icon: createDiscoveryIcon('icon-lucide-lock-keyhole'),
    action: options.handleDiscoverPrivateClick ?? (() => {
    }),
  })

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