import { describe, it, expect } from 'vitest'
import './Menu.ts'

describe('solid-ui-menu syncItems', () => {
  function createMenu () {
    const menu = document.createElement('solid-ui-menu')
    menu.setAttribute('placement', 'bottom-end')

    const trigger = document.createElement('button')
    trigger.setAttribute('slot', 'trigger')
    menu.appendChild(trigger)

    return menu
  }

  it('renders children on first sync', async () => {
    const menu = createMenu()

    const child1 = document.createElement('div')
    child1.textContent = 'Item 1'
    menu.appendChild(child1)

    const child2 = document.createElement('div')
    child2.textContent = 'Item 2'
    menu.appendChild(child2)

    document.body.appendChild(menu)
    await menu.updateComplete

    // Children should be assigned slot attributes
    expect(child1.getAttribute('slot')).toBe('menu-item-0')
    expect(child2.getAttribute('slot')).toBe('menu-item-1')

    // Trigger should keep its slot
    const trigger = menu.querySelector('[slot="trigger"]')
    expect(trigger?.getAttribute('slot')).toBe('trigger')

    document.body.removeChild(menu)
  })

  it('keeps children after re-sync (regression: second sync cleared items)', async () => {
    const menu = createMenu()

    const child1 = document.createElement('div')
    child1.textContent = 'Item 1'
    menu.appendChild(child1)

    document.body.appendChild(menu)
    await menu.updateComplete

    // First sync assigned slots
    expect(child1.getAttribute('slot')).toBe('menu-item-0')

    // Trigger a re-sync by adding another child (MutationObserver)
    const child2 = document.createElement('div')
    child2.textContent = 'Item 2'
    menu.appendChild(child2)
    await menu.updateComplete

    // Both children should still have valid slot assignments
    expect(child1.getAttribute('slot')).toBe('menu-item-0')
    expect(child2.getAttribute('slot')).toBe('menu-item-1')

    document.body.removeChild(menu)
  })

  it('excludes trigger element from items', async () => {
    const menu = createMenu()
    document.body.appendChild(menu)

    const child = document.createElement('div')
    child.textContent = 'Only Item'
    menu.appendChild(child)
    await menu.updateComplete

    expect(child.getAttribute('slot')).toBe('menu-item-0')

    // Trigger should not have been re-assigned
    const trigger = menu.querySelector('[slot="trigger"]')
    expect(trigger?.getAttribute('slot')).toBe('trigger')

    document.body.removeChild(menu)
  })

  it('propagates disabled state to dropdown items', async () => {
    const menu = createMenu()

    const child = document.createElement('div')
    child.textContent = 'Disabled Item'
    child.setAttribute('disabled', '')
    menu.appendChild(child)

    document.body.appendChild(menu)
    await menu.updateComplete

    const dropdownItem = menu.shadowRoot?.querySelector('wa-dropdown-item') as HTMLElement & { disabled?: boolean }
    expect(dropdownItem?.disabled).toBe(true)

    document.body.removeChild(menu)
  })
})
