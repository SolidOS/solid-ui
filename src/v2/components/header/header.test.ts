import { Header } from './Header'
// Import the module for side effects (custom element registration)
import './Header'

describe('SolidUIHeaderElement', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    Object.defineProperty(window, 'open', {
      configurable: true,
      writable: true,
      value: jest.fn()
    })
  })


  it('is defined as a custom element', () => {
    const defined = customElements.get('solid-ui-header')
    expect(defined).toBe(Header)
  })

  it('renders a header with logo and menu slots', async () => {
    const header = new Header()
    header.setAttribute('logo', 'https://example.com/logo.png')
    header.setAttribute('help-icon', 'https://example.com/help.png')
    header.setAttribute('brand-link', '/home')
    header.innerHTML = '<a slot="user-menu" href="/profile">Profile</a><button slot="help-menu" id="helpBtn">Help</button>'

    document.body.appendChild(header)
    await header.updateComplete

    const shadow = header.shadowRoot
    expect(shadow).not.toBeNull()

    const brandImg = shadow?.getElementById('brandImg') as HTMLImageElement
    const helpIcon = shadow?.getElementById('helpIcon') as HTMLImageElement
    const brandLink = shadow?.getElementById('brandLink') as HTMLAnchorElement

    expect(brandImg?.src).toContain('https://example.com/logo.png')
    expect(helpIcon?.src).toContain('https://example.com/help.png')
    expect(brandLink?.href).toContain('/home')

    const userMenuSlot = shadow?.querySelector('slot[name="user-menu"]')
    expect(userMenuSlot).not.toBeNull()
    expect(header.querySelector('[slot="user-menu"]')).not.toBeNull()

    const helpMenuSlot = shadow?.querySelector('slot[name="help-menu"]')
    expect(helpMenuSlot).not.toBeNull()
    expect(header.querySelector('#helpBtn')).not.toBeNull()
  })

  it('supports theme and layout attributes', async () => {
    const header = new Header()
    header.setAttribute('theme', 'dark')
    header.setAttribute('layout', 'mobile')
    document.body.appendChild(header)
    await header.updateComplete

    expect(header.getAttribute('theme')).toBe('dark')
    expect(header.getAttribute('layout')).toBe('mobile')

    const shadow = header.shadowRoot
    expect(shadow?.querySelector('.headerInner')).not.toBeNull()
    expect(shadow?.getElementById('brandLink')?.classList.contains('brand-not-displayed')).toBe(true)
    expect(header.getAttribute('theme')).toBe('dark')
    expect(header.getAttribute('layout')).toBe('mobile')
  })

  it('toggles the brand link visibility class by layout', async () => {
    const header = new Header()
    header.setAttribute('brand-link', '/home')

    document.body.appendChild(header)
    await header.updateComplete

    expect(header.layout).toBe('desktop')
    expect(header.shadowRoot?.getElementById('brandLink')).not.toBeNull()
    expect(header.shadowRoot?.getElementById('brandLink')?.classList.contains('brand-not-displayed')).toBe(false)

    header.layout = 'mobile'
    await header.updateComplete

    expect(header.layout).toBe('mobile')
    expect(header.shadowRoot?.getElementById('brandLink')).not.toBeNull()
    expect(header.shadowRoot?.getElementById('brandLink')?.classList.contains('brand-not-displayed')).toBe(true)

    header.layout = 'desktop'
    await header.updateComplete

    expect(header.layout).toBe('desktop')
    expect(header.shadowRoot?.getElementById('brandLink')).not.toBeNull()
    expect(header.shadowRoot?.getElementById('brandLink')?.classList.contains('brand-not-displayed')).toBe(false)
  })

  it('renders helpMenuList inside the help dropdown and dispatches events', async () => {
    const header = new Header()

    const userMenuClicked = jest.fn()
    const helpMenuClicked = jest.fn()

    header.userMenu = [{ label: 'Logout', action: 'logout' }]
    header.helpMenuList = [{ label: 'Docs', url: 'https://example.com/docs', target: '_blank' }]

    header.addEventListener('user-menu-select', (event: Event) => {
      userMenuClicked((event as CustomEvent).detail)
    })
    header.addEventListener('help-menu-select', (event: Event) => {
      helpMenuClicked((event as CustomEvent).detail)
    })

    document.body.appendChild(header)
    await header.updateComplete

    const shadow = header.shadowRoot
    const userButton = shadow?.querySelector('button[part="user-menu-item"]') as HTMLElement
    const helpTrigger = shadow?.getElementById('helpMenuTrigger') as HTMLButtonElement

    expect(userButton?.textContent?.trim()).toBe('Logout')
    expect(helpTrigger?.disabled).toBe(false)

    userButton?.click()
    helpTrigger?.click()
    await header.updateComplete

    const helpMenu = shadow?.getElementById('helpMenu') as HTMLElement
    const helpLink = shadow?.querySelector('a[part="help-menu-item"]') as HTMLAnchorElement

    expect(helpMenu?.hidden).toBe(false)
    expect(helpLink?.textContent?.trim()).toBe('Docs')

    helpLink?.click()

    expect(userMenuClicked).toHaveBeenCalledWith({ label: 'Logout', action: 'logout' })
    expect(helpMenuClicked).toHaveBeenCalledWith({ label: 'Docs', url: 'https://example.com/docs', target: '_blank' })
  })
})
