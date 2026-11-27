// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { html } from 'lit'
import Combobox, { type ComboboxOptionData } from '../../src/components/combobox/Combobox'

describe('combobox option icons', () => {
  let element: Combobox

  beforeEach(() => {
    const attachInternals = HTMLElement.prototype.attachInternals
    vi.spyOn(HTMLElement.prototype, 'attachInternals').mockImplementation(function (this: HTMLElement) {
      return Object.assign(attachInternals.call(this), {
        setFormValue: vi.fn(),
        setValidity: vi.fn()
      })
    })
  })

  afterEach(() => {
    element.remove()
    vi.restoreAllMocks()
  })

  async function renderOptions (options: ComboboxOptionData[]) {
    element = new Combobox()
    element.asyncOptionsProvider = async () => options
    document.body.append(element)
    await vi.waitFor(() => {
      expect(element.shadowRoot?.querySelectorAll('[role="option"]')).toHaveLength(options.length)
    })
    element.shadowRoot!.querySelectorAll<HTMLElement>('[role="option"]').forEach(option => {
      option.scrollIntoView = vi.fn()
    })
    return element.shadowRoot!
  }

  it('renders a decorative icon separately from the label and preserves selection data', async () => {
    const option = { value: 'alice', label: 'Alice', icon: html`<span class="test-icon">A</span>` }
    const root = await renderOptions([option])
    const renderedOption = root.querySelector<HTMLElement>('[role="option"]')!
    expect(renderedOption.querySelector('.option-icon')?.getAttribute('aria-hidden')).toBe('true')
    expect(renderedOption.querySelector('.test-icon')).not.toBeNull()
    expect(renderedOption.querySelector('.option-content > span:last-child')?.textContent).toBe('Alice')

    const onChange = vi.fn()
    element.addEventListener('change', (event) => {
      onChange(event)
      expect(element.shadowRoot?.querySelector<HTMLInputElement>('input')?.value).toBe('Alice')
    })
    renderedOption.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    expect(element.value).toBe('alice')
    expect(onChange.mock.calls[0][0].detail.option).toEqual(option)
  })

  it('preserves custom option templates and does not add icon layout to iconless options', async () => {
    const root = await renderOptions([
      { value: 'alice', label: 'Alice', icon: html`<span>A</span>`, template: html`<em>Alice details</em>` },
      { value: 'bob', label: 'Bob', template: html`<em>Bob details</em>` }
    ])
    const options = root.querySelectorAll('[role="option"]')
    expect(options[0].querySelector('.option-content em')?.textContent).toBe('Alice details')
    expect(options[1].querySelector('.option-content')).toBeNull()
    expect(options[1].querySelector('em')?.textContent).toBe('Bob details')
  })
})
