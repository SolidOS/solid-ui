import { describe, expect, it, vi } from 'vitest'
import './ResourceActionsMenu.ts'

describe('solid-ui-resource-actions-menu', () => {
  it('does not duplicate the desktop file header access action in the menu', async () => {
    const menu = document.createElement('solid-ui-resource-actions-menu') as HTMLElement & {
      handleAccessClick?: () => void
      canManageAccess?: boolean
      subjectUri?: string
      updateComplete: Promise<boolean>
    }
    const handleAccessClick = vi.fn()
    menu.subjectUri = 'https://example.test/resource.ttl'
    menu.handleAccessClick = handleAccessClick
    menu.canManageAccess = true

    document.body.appendChild(menu)
    await menu.updateComplete

    const accessItem = Array.from(menu.shadowRoot?.querySelectorAll('solid-ui-menu-item') || [])
      .find(item => item.textContent?.includes('Manage Access'))
    expect(accessItem).toBeUndefined()

    menu.remove()
  })

  it('does not render Manage Access without the capability', async () => {
    const menu = document.createElement('solid-ui-resource-actions-menu') as HTMLElement & {
      handleAccessClick?: () => void
      subjectUri?: string
      showAccessInMenu?: boolean
      updateComplete: Promise<boolean>
    }
    menu.subjectUri = 'https://example.test/resource.ttl'
    menu.handleAccessClick = vi.fn()
    menu.showAccessInMenu = true

    document.body.appendChild(menu)
    await menu.updateComplete

    expect(menu.shadowRoot?.textContent).not.toContain('Manage Access')
    menu.remove()
  })

  it('shows Manage Access when the containing view explicitly enables it', async () => {
    const menu = document.createElement('solid-ui-resource-actions-menu') as HTMLElement & {
      handleAccessClick?: () => void
      subjectUri?: string
      showAccessInMenu?: boolean
      canManageAccess?: boolean
      updateComplete: Promise<boolean>
    }
    const handleAccessClick = vi.fn()
    menu.subjectUri = 'https://example.test/resource.ttl'
    menu.handleAccessClick = handleAccessClick
    menu.showAccessInMenu = true
    menu.canManageAccess = true

    document.body.appendChild(menu)
    await menu.updateComplete

    const accessItem = Array.from(menu.shadowRoot?.querySelectorAll('solid-ui-menu-item') || [])
      .find(item => item.textContent?.includes('Manage Access'))
    expect(accessItem).toBeTruthy()

    accessItem?.dispatchEvent(new CustomEvent('solid-ui-select', { bubbles: true, composed: true }))
    expect(handleAccessClick).toHaveBeenCalledOnce()

    menu.remove()
  })
})
