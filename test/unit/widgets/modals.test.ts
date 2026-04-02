import { silenceDebugMessages } from '../helpers/debugger'
import { createListModal } from '../../../src/widgets/modals'

silenceDebugMessages()

describe('modals', () => {
  afterEach(() => {
    jest.useRealTimers()
    document.body.innerHTML = ''
  })

  it('creates a dialog modal with default accessibility attributes', () => {
    const modal = createListModal(document, [], {})

    expect(modal).toBeInstanceOf(HTMLDivElement)
    expect(modal.getAttribute('role')).toEqual('dialog')
    expect(modal.getAttribute('aria-modal')).toEqual('false')
    expect(modal.getAttribute('aria-label')).toEqual('List dialog')
    expect(modal.getAttribute('tabindex')).toEqual('-1')
  })

  it('renders list items with links and custom aria label', () => {
    const modal = createListModal(
      document,
      [{ label: 'Solid', link: 'https://solidproject.org/' }],
      { ariaLabel: 'Resource links', withGreyedBackground: true }
    )

    const list = modal.querySelector('ul') as HTMLUListElement
    const anchor = modal.querySelector('a') as HTMLAnchorElement

    expect(list.getAttribute('role')).toEqual('list')
    expect(anchor.textContent).toEqual('Solid')
    expect(anchor.href).toEqual('https://solidproject.org/')
    expect(modal.getAttribute('aria-label')).toEqual('Resource links')
    expect(modal.getAttribute('aria-modal')).toEqual('true')
  })

  it('uses an accessible close button', () => {
    const modal = createListModal(document, [], {})
    const closeButton = modal.querySelector('button') as HTMLButtonElement

    expect(closeButton).toBeInstanceOf(HTMLButtonElement)
    expect(closeButton.getAttribute('type')).toEqual('button')
    expect(closeButton.getAttribute('aria-label')).toEqual('Close modal')
  })

  it('closes on close button click and restores focus to trigger element', () => {
    jest.useFakeTimers()

    const trigger = document.createElement('button')
    document.body.appendChild(trigger)
    trigger.focus()

    const modal = createListModal(document, [], {})
    document.body.appendChild(modal)

    jest.runAllTimers()

    const closeButton = modal.querySelector('button') as HTMLButtonElement
    modal.style.display = 'block'
    closeButton.click()

    expect(modal.style.display).toEqual('none')
    expect(document.activeElement).toBe(trigger)
  })

  it('closes on Escape and restores focus to trigger element', () => {
    const trigger = document.createElement('button')
    document.body.appendChild(trigger)
    trigger.focus()

    const modal = createListModal(document, [], {})
    document.body.appendChild(modal)
    modal.style.display = 'block'

    modal.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))

    expect(modal.style.display).toEqual('none')
    expect(document.activeElement).toBe(trigger)
  })
})
