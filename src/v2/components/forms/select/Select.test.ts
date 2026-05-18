import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { Select } from './Select'
import './index'

function getPortalRoot () {
  const portalHost = document.querySelector('[data-solid-ui-select-portal]') as HTMLDivElement | null
  return portalHost?.shadowRoot ?? null
}

describe('SolidUISelect', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('is defined as a custom element', () => {
    expect(customElements.get('solid-ui-select')).toBe(Select)
  })

  it('renders the trigger with the first option label by default', async () => {
    const select = new Select()
    select.label = 'Language'
    select.options = [
      { label: 'English', value: 'en' },
      { label: 'French', value: 'fr' }
    ]

    document.body.appendChild(select)
    await select.updateComplete

    const trigger = select.shadowRoot?.querySelector('button.select-trigger') as HTMLButtonElement
    const triggerIcon = select.shadowRoot?.querySelector('.select-trigger-icon svg') as SVGElement

    expect(trigger).not.toBeNull()
    expect(triggerIcon).not.toBeNull()
    expect(trigger.getAttribute('aria-haspopup')).toBe('listbox')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    expect(trigger.textContent).toContain('English')
  })

  it('renders the fallback label when no options are provided', async () => {
    const select = new Select()
    select.label = 'Language'

    document.body.appendChild(select)
    await select.updateComplete

    const trigger = select.shadowRoot?.querySelector('button.select-trigger') as HTMLButtonElement

    expect(trigger).not.toBeNull()
    expect(trigger.textContent).toContain('Language')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })

  it('opens the popup and updates the value when an option is clicked', async () => {
    const select = new Select()
    const changed = jest.fn()

    select.label = 'Language'
    select.options = [
      { label: 'English', value: 'en' },
      { label: 'French', value: 'fr' }
    ]

    select.addEventListener('change', (event: Event) => {
      changed((event as CustomEvent).detail)
    })

    document.body.appendChild(select)
    await select.updateComplete

    const trigger = select.shadowRoot?.querySelector('button.select-trigger') as HTMLButtonElement
    trigger.click()
    await select.updateComplete

    const portalRoot = getPortalRoot()
    const listbox = portalRoot?.querySelector('[role="listbox"]') as HTMLElement
    const options = portalRoot?.querySelectorAll('[role="option"]') as NodeListOf<HTMLElement>

    expect(listbox).not.toBeNull()
    expect(options).toHaveLength(2)

    options[1].click()
    await select.updateComplete

    expect(select.value).toBe('fr')
    expect(trigger.textContent).toContain('French')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    expect(changed).toHaveBeenCalledWith({ value: 'fr' })
  })

  it('renders the selected option first in the popup', async () => {
    const select = new Select()
    select.options = [
      { label: 'English', value: 'en' },
      { label: 'French', value: 'fr' },
      { label: 'Spanish', value: 'es' }
    ]
    select.value = 'fr'

    document.body.appendChild(select)
    await select.updateComplete

    const trigger = select.shadowRoot?.querySelector('button.select-trigger') as HTMLButtonElement
    trigger.click()
    await select.updateComplete

    const options = Array.from(getPortalRoot()?.querySelectorAll('[role="option"]') as NodeListOf<HTMLElement>)

    expect(options).toHaveLength(3)
    expect(options[0].textContent).toContain('French')
    expect(options[0].getAttribute('aria-selected')).toBe('true')
  })

  it('does not reflect options to an HTML attribute', async () => {
    const select = new Select()
    select.options = [
      { label: 'English', value: 'en' },
      { label: 'French', value: 'fr' }
    ]

    document.body.appendChild(select)
    await select.updateComplete

    expect(select.hasAttribute('options')).toBe(false)
  })

  it('supports keyboard selection from the trigger', async () => {
    const select = new Select()
    const changed = jest.fn()

    select.label = 'Language'
    select.options = [
      { label: 'English', value: 'en' },
      { label: 'French', value: 'fr' },
      { label: 'Spanish', value: 'es' }
    ]

    select.addEventListener('change', (event: Event) => {
      changed((event as CustomEvent).detail)
    })

    document.body.appendChild(select)
    await select.updateComplete

    const trigger = select.shadowRoot?.querySelector('button.select-trigger') as HTMLButtonElement

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    await select.updateComplete

    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(trigger.getAttribute('aria-activedescendant')).toBeTruthy()

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    await select.updateComplete

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    await select.updateComplete

    expect(select.value).toBe('fr')
    expect(trigger.textContent).toContain('French')
    expect(changed).toHaveBeenCalledWith({ value: 'fr' })
  })

  it('closes the popup when clicking outside the component', async () => {
    const select = new Select()
    select.options = [
      { label: 'English', value: 'en' },
      { label: 'French', value: 'fr' }
    ]

    document.body.appendChild(select)
    await select.updateComplete

    const trigger = select.shadowRoot?.querySelector('button.select-trigger') as HTMLButtonElement
    trigger.click()
    await select.updateComplete

    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(getPortalRoot()).not.toBeNull()

    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    await select.updateComplete

    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })
})
