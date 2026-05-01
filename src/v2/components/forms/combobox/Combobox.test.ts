import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { Combobox } from './Combobox'
import './index'

function getPortalRoot () {
  const portalHost = document.querySelector('[data-solid-ui-combobox-portal]') as HTMLDivElement | null
  return portalHost?.shadowRoot ?? null
}

async function flushUpdates () {
  await Promise.resolve()
  await Promise.resolve()
}

describe('SolidUICombobox', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('is defined as a custom element', () => {
    expect(customElements.get('solid-ui-combobox')).toBe(Combobox)
  })

  it('renders the input with label and placeholder', async () => {
    const combobox = new Combobox()
    combobox.label = 'Person'
    combobox.placeholder = 'Search people'

    document.body.appendChild(combobox)
    await combobox.updateComplete

    const label = combobox.shadowRoot?.querySelector('label.text-label') as HTMLLabelElement
    const input = combobox.shadowRoot?.querySelector('input.text-input') as HTMLInputElement
    const toggle = combobox.shadowRoot?.querySelector('button.dropdown-toggle') as HTMLButtonElement

    expect(label).not.toBeNull()
    expect(label.textContent).toContain('Person')
    expect(input).not.toBeNull()
    expect(input.placeholder).toBe('Search people')
    expect(input.getAttribute('role')).toBe('combobox')
    expect(input.getAttribute('aria-expanded')).toBe('false')
    expect(toggle).not.toBeNull()
  })

  it('loads suggestions from suggestionProvider and emits input events', async () => {
    const combobox = new Combobox()
    const inputEvents = jest.fn()
    const suggestionProvider = jest.fn(async (query: string) => [
      { label: `Alice ${query}`, value: 'alice' },
      { label: `Bob ${query}`, value: 'bob' }
    ])

    combobox.suggestionProvider = suggestionProvider
    combobox.addEventListener('input', (event: Event) => {
      inputEvents((event as CustomEvent).detail)
    })

    document.body.appendChild(combobox)
    await combobox.updateComplete

    const input = combobox.shadowRoot?.querySelector('input.text-input') as HTMLInputElement
    input.value = 'al'
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }))

    await flushUpdates()
    await combobox.updateComplete

    const portalRoot = getPortalRoot()
    const options = Array.from(portalRoot?.querySelectorAll('[role="option"]') as NodeListOf<HTMLElement>)

    expect(suggestionProvider).toHaveBeenCalledWith('al')
    expect(inputEvents).toHaveBeenCalledWith({ value: 'al' })
    expect(combobox.inputValue).toBe('al')
    expect(options).toHaveLength(2)
    expect(options[0].textContent).toContain('Alice al')
  })

  it('renders the selected option first in the popup', async () => {
    const combobox = new Combobox()
    combobox.options = [
      { label: 'English', value: 'en' },
      { label: 'French', value: 'fr' },
      { label: 'Spanish', value: 'es' }
    ]
    combobox.value = 'fr'

    document.body.appendChild(combobox)
    await combobox.updateComplete

    const input = combobox.shadowRoot?.querySelector('input.text-input') as HTMLInputElement
    input.dispatchEvent(new Event('focus'))
    await combobox.updateComplete

    const portalRoot = getPortalRoot()
    const options = Array.from(portalRoot?.querySelectorAll('[role="option"]') as NodeListOf<HTMLElement>)

    expect(options).toHaveLength(3)
    expect(options[0].textContent).toContain('French')
    expect(options[0].getAttribute('aria-selected')).toBe('true')
  })

  it('updates value and emits change when an option is clicked', async () => {
    const combobox = new Combobox()
    const changed = jest.fn()

    combobox.options = [
      { label: 'Alice', value: 'alice', publicId: 'https://example.com/alice' },
      { label: 'Bob', value: 'bob' }
    ]

    combobox.addEventListener('change', (event: Event) => {
      changed((event as CustomEvent).detail)
    })

    document.body.appendChild(combobox)
    await combobox.updateComplete

    const input = combobox.shadowRoot?.querySelector('input.text-input') as HTMLInputElement
    input.dispatchEvent(new Event('focus'))
    await combobox.updateComplete

    const portalRoot = getPortalRoot()
    const options = portalRoot?.querySelectorAll('[role="option"]') as NodeListOf<HTMLElement>
    options[1].click()
    await combobox.updateComplete

    expect(combobox.value).toBe('bob')
    expect(combobox.inputValue).toBe('Bob')
    expect(input.getAttribute('aria-expanded')).toBe('false')
    expect(changed).toHaveBeenCalledWith({
      value: 'bob',
      label: 'Bob',
      option: { label: 'Bob', value: 'bob' }
    })
  })

  it('supports keyboard selection from the input', async () => {
    const combobox = new Combobox()
    const changed = jest.fn()

    combobox.options = [
      { label: 'Alice', value: 'alice' },
      { label: 'Bob', value: 'bob' },
      { label: 'Carol', value: 'carol' }
    ]

    combobox.addEventListener('change', (event: Event) => {
      changed((event as CustomEvent).detail)
    })

    document.body.appendChild(combobox)
    await combobox.updateComplete

    const input = combobox.shadowRoot?.querySelector('input.text-input') as HTMLInputElement

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    await combobox.updateComplete

    expect(input.getAttribute('aria-expanded')).toBe('true')
    expect(input.getAttribute('aria-activedescendant')).toBeTruthy()

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    await combobox.updateComplete

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    await combobox.updateComplete

    expect(combobox.value).toBe('bob')
    expect(combobox.inputValue).toBe('Bob')
    expect(changed).toHaveBeenCalledWith({
      value: 'bob',
      label: 'Bob',
      option: { label: 'Bob', value: 'bob' }
    })
  })

  it('closes the popup when clicking outside the component', async () => {
    const combobox = new Combobox()
    combobox.options = [
      { label: 'Alice', value: 'alice' },
      { label: 'Bob', value: 'bob' }
    ]

    document.body.appendChild(combobox)
    await combobox.updateComplete

    const input = combobox.shadowRoot?.querySelector('input.text-input') as HTMLInputElement
    input.dispatchEvent(new Event('focus'))
    await combobox.updateComplete

    expect(input.getAttribute('aria-expanded')).toBe('true')
    expect(getPortalRoot()).not.toBeNull()

    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true, composed: true }))
    await combobox.updateComplete

    expect(input.getAttribute('aria-expanded')).toBe('false')
  })
})
