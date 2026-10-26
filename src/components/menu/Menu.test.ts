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
    expect(child1.getAttribute('slot')).toBe('menu-item-index-0')
    expect(child2.getAttribute('slot')).toBe('menu-item-index-1')

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
    expect(child1.getAttribute('slot')).toBe('menu-item-index-0')

    // Trigger a re-sync by adding another child (MutationObserver)
    const child2 = document.createElement('div')
    child2.textContent = 'Item 2'
    menu.appendChild(child2)
    await menu.updateComplete

    // Both children should still have valid slot assignments
    expect(child1.getAttribute('slot')).toBe('menu-item-index-0')
    expect(child2.getAttribute('slot')).toBe('menu-item-index-1')

    document.body.removeChild(menu)
  })

  it('excludes trigger element from items', async () => {
    const menu = createMenu()
    document.body.appendChild(menu)

    const child = document.createElement('div')
    child.textContent = 'Only Item'
    menu.appendChild(child)
    await menu.updateComplete

    expect(child.getAttribute('slot')).toBe('menu-item-index-0')

    // Trigger should not have been re-assigned
    const trigger = menu.querySelector('[slot="trigger"]')
    expect(trigger?.getAttribute('slot')).toBe('trigger')

    document.body.removeChild(menu)
  })

  it('keeps keyed and positional slots distinct', async () => {
    const menu = createMenu()

    const keyedChild = document.createElement('div')
    keyedChild.dataset.menuKey = '1'
    menu.appendChild(keyedChild)

    const positionalChild = document.createElement('div')
    menu.appendChild(positionalChild)

    document.body.appendChild(menu)
    await menu.updateComplete

    expect(keyedChild.getAttribute('slot')).toBe('menu-item-key-1')
    expect(positionalChild.getAttribute('slot')).toBe('menu-item-index-1')

    document.body.removeChild(menu)
  })

  it('moves keyed dropdown items instead of recreating them when actions reorder', async () => {
    const menu = createMenu()
    const first = document.createElement('div')
    first.dataset.menuKey = 'first'
    const second = document.createElement('div')
    second.dataset.menuKey = 'second'
    menu.append(first, second)

    document.body.appendChild(menu)
    await menu.updateComplete

    const firstWrapper = Array.from(menu.shadowRoot?.querySelectorAll('wa-dropdown-item') || [])
      .find(item => item.children[0]?.getAttribute('name') === 'menu-item-key-first')
    const secondWrapper = Array.from(menu.shadowRoot?.querySelectorAll('wa-dropdown-item') || [])
      .find(item => item.children[0]?.getAttribute('name') === 'menu-item-key-second')
    expect(firstWrapper).toBeTruthy()
    expect(secondWrapper).toBeTruthy()

    menu.insertBefore(second, first)
    await new Promise(resolve => setTimeout(resolve, 0))
    await menu.updateComplete

    const reorderedWrappers = Array.from(menu.shadowRoot?.querySelectorAll('wa-dropdown-item') || [])
    expect(reorderedWrappers[0]).toBe(secondWrapper)
    expect(reorderedWrappers[1]).toBe(firstWrapper)

    document.body.removeChild(menu)
  })
})
