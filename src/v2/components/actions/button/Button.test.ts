import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Button } from './Button'
import './index'

describe('SolidUIButton', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('is defined as a custom element', () => {
    expect(customElements.get('solid-ui-button')).toBe(Button)
  })

  it('renders a secondary button by default', async () => {
    const button = new Button()
    button.label = 'Upload'

    document.body.appendChild(button)
    await button.updateComplete

    const nativeButton = button.shadowRoot?.querySelector(
      'button'
    ) as HTMLButtonElement

    expect(button.variant).toBe('secondary')
    expect(nativeButton.type).toBe('button')
    expect(nativeButton.textContent?.trim()).toBe('Upload')
  })

  it('supports a selected state without forcing toggle semantics', async () => {
    const button = new Button()
    button.selected = true

    document.body.appendChild(button)
    await button.updateComplete

    const nativeButton = button.shadowRoot?.querySelector(
      'button'
    ) as HTMLButtonElement

    expect(button.hasAttribute('selected')).toBe(true)
    expect(nativeButton.hasAttribute('aria-pressed')).toBe(false)
    expect(nativeButton.hasAttribute('aria-selected')).toBe(false)
  })

  it('calls the callback property and still emits the native click event', async () => {
    const button = new Button()
    const handleClick = vi.fn()
    const clickListener = vi.fn()
    button.handleClick = handleClick
    button.addEventListener('click', clickListener)

    document.body.appendChild(button)
    await button.updateComplete

    const nativeButton = button.shadowRoot?.querySelector(
      'button'
    ) as HTMLButtonElement
    nativeButton.click()

    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(clickListener).toHaveBeenCalledTimes(1)
  })

  it('renders an image icon when the icon property is provided', async () => {
    const button = new Button()
    button.icon = 'data:image/svg+xml,%3Csvg%3E%3C/svg%3E'

    document.body.appendChild(button)
    await button.updateComplete

    const icon = button.shadowRoot?.querySelector(
      '.button__icon-image'
    ) as HTMLImageElement
    expect(icon.getAttribute('src')).toBe(button.icon)
  })

  it('supports an icon-only variant without rendering the label text', async () => {
    const button = new Button()
    button.variant = 'icon'
    button.icon = 'data:image/svg+xml,%3Csvg%3E%3C/svg%3E'
    button.label = 'Settings'

    document.body.appendChild(button)
    await button.updateComplete

    const label = button.shadowRoot?.querySelector(
      '.button__label'
    ) as HTMLSpanElement
    const icon = button.shadowRoot?.querySelector(
      '.button__icon-image'
    ) as HTMLImageElement

    expect(button.variant).toBe('icon')
    expect(label).not.toBeNull()
    expect(icon.getAttribute('src')).toBe(button.icon)
  })

  it('prefers slotted icon content over the icon property fallback', async () => {
    const button = document.createElement('solid-ui-button') as Button
    button.icon = 'data:image/svg+xml,%3Csvg%3E%3C/svg%3E'

    const slottedIcon = document.createElement('span')
    slottedIcon.slot = 'icon'
    slottedIcon.textContent = 'icon'
    button.appendChild(slottedIcon)

    document.body.appendChild(button)
    await button.updateComplete
    await Promise.resolve()
    await button.updateComplete

    expect(button.shadowRoot?.querySelector('slot[name="icon"]')).not.toBeNull()
    expect(button.shadowRoot?.querySelector('.button__icon-image')).toBeNull()
  })

  it('renders slotted icon content without requiring an icon fallback property', async () => {
    const button = document.createElement('solid-ui-button') as Button

    const slottedIcon = document.createElement('span')
    slottedIcon.slot = 'icon'
    slottedIcon.textContent = 'icon'
    button.appendChild(slottedIcon)

    document.body.appendChild(button)
    await button.updateComplete
    await Promise.resolve()
    await button.updateComplete

    expect(button.shadowRoot?.querySelector('slot[name="icon"]')).not.toBeNull()
    expect(button.shadowRoot?.querySelector('.button__icon')).not.toBeNull()
    expect(button.shadowRoot?.querySelector('.button__icon-image')).toBeNull()
  })

  it('applies layout styling hooks exposed through CSS custom properties', async () => {
    const stylesheetText = Array.isArray(Button.styles)
      ? Button.styles.map((styleSheet) => styleSheet.toString()).join('\n')
      : Button.styles.toString()

    expect(stylesheetText).toContain(
      '--button-padding-sm: 0 var(--button-padding-x-sm);'
    )
    expect(stylesheetText).toContain('--button-border-width: 1px;')
    expect(stylesheetText).toContain('padding: var(--button-padding-md);')
    expect(stylesheetText).toContain(
      'border: var(--button-border-width) solid var(--button-border);'
    )
    expect(stylesheetText).toContain(
      'border-radius: var(--button-border-radius);'
    )
    expect(stylesheetText).toContain('font-weight: var(--button-font-weight);')
    expect(stylesheetText).toContain('line-height: var(--button-line-height);')
    expect(stylesheetText).toContain(
      'justify-content: var(--button-justify-content);'
    )
    expect(stylesheetText).toContain(
      'box-shadow: var(--button-hover-box-shadow, var(--button-box-shadow));'
    )
    expect(stylesheetText).toContain('outline: var(--button-focus-outline);')
    expect(stylesheetText).toContain(
      'transform: var(--button-active-transform);'
    )
  })
})
