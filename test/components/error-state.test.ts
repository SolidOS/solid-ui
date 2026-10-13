// @vitest-environment jsdom

import { describe, expect, it } from 'vitest'
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
    expect(closeButton?.getAttribute('aria-label')).toBe('Close')
    expect(element.querySelector('li')?.textContent).toBe('Network request failed')
  })
})
