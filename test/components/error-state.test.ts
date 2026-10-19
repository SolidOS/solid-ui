// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest'
import '../../src/components/error-state'

describe('solid-ui-error-state', () => {
  it('renders its title, message, close button, and slotted errors', async () => {
    const element = document.createElement('solid-ui-error-state')
    element.setAttribute('title', 'Changes could not be synced')
    element.setAttribute('message', 'Try again when your connection is restored.')
    element.innerHTML = '<ul><li>Network request failed</li></ul>'
    document.body.append(element)

    await (element as unknown as { updateComplete: Promise<boolean> }).updateComplete

    expect(element.shadowRoot?.textContent).toContain('Changes could not be synced')
    expect(element.shadowRoot?.textContent).toContain('Try again when your connection is restored.')
    const closeButton = element.shadowRoot?.querySelector('solid-ui-button.close-button')
    expect(closeButton?.getAttribute('variant')).toBe('ghost')
    expect(closeButton?.textContent).toContain('Close')
    expect(element.querySelector('li')?.textContent).toBe('Network request failed')
  })

  it('dispatches a close event when the close button is activated', async () => {
    const element = document.createElement('solid-ui-error-state')
    document.body.append(element)

    await (element as unknown as { updateComplete: Promise<boolean> }).updateComplete

    const closeButton = element.shadowRoot?.querySelector('solid-ui-button.close-button')
    const innerButton = closeButton?.shadowRoot?.querySelector('button')
    const closeHandler = vi.fn()
    element.addEventListener('close', closeHandler)

    innerButton?.click()

    expect(closeHandler).toHaveBeenCalledTimes(1)
    expect(closeHandler.mock.calls[0][0]).toBeInstanceOf(CustomEvent)
  })
})
