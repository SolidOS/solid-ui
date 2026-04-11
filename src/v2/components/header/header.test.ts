import { Header } from './Header'
import './index'

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
    header.authState = 'logged-out'
    header.innerHTML = '<button slot="help-menu" id="helpBtn">Help</button>'

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

    const authButtons = shadow?.querySelectorAll('.auth-button')
    expect(authButtons).toHaveLength(2)

    const helpMenuSlot = shadow?.querySelector('slot[name="help-menu"]')
    expect(helpMenuSlot).not.toBeNull()
    expect(header.querySelector('#helpBtn')).not.toBeNull()
  })

  it('renders login and sign up actions when logged out', async () => {
    const header = new Header()
    const authActionSelected = jest.fn()

    header.authState = 'logged-out'
    header.loginAction = { label: 'Log in', action: 'login' }
    header.signUpAction = { label: 'Sign Up', url: '/signup' }

    header.addEventListener('auth-action-select', (event: Event) => {
      authActionSelected((event as CustomEvent).detail)
    })

    document.body.appendChild(header)
    await header.updateComplete

    const shadow = header.shadowRoot
    const authButtons = shadow?.querySelectorAll('.auth-button')
    const loginButton = authButtons?.[0] as HTMLButtonElement
    const signUpLink = authButtons?.[1] as HTMLAnchorElement

    expect(authButtons).toHaveLength(2)
    expect(loginButton.textContent?.trim()).toBe('Log in')
    expect(signUpLink.textContent?.trim()).toBe('Sign Up')

    loginButton.click()

    expect(authActionSelected).toHaveBeenCalledWith({
      role: 'login',
      item: { label: 'Log in', action: 'login' }
    })
  })

  it('renders an accounts dropdown with avatar when logged in', async () => {
    const header = new Header()
    const accountMenuSelected = jest.fn()

    header.authState = 'logged-in'
    header.accountLabel = 'Accounts'
    header.accountAvatar = 'https://example.com/avatar.png'
    header.accountMenu = [
      { label: 'Personal Pod', webid: 'https://pod.example/profile/card#me', action: 'switch-personal' },
      { label: 'Work Pod', webid: 'https://work.example/profile/card#me', url: '/work' }
    ]

    header.addEventListener('account-menu-select', (event: Event) => {
      accountMenuSelected((event as CustomEvent).detail)
    })

    document.body.appendChild(header)
    await header.updateComplete

    const shadow = header.shadowRoot
    const trigger = shadow?.getElementById('accountMenuTrigger') as HTMLButtonElement

    expect(trigger).not.toBeNull()
    expect(trigger.textContent).toContain('Accounts')
    expect((shadow?.querySelector('.account-avatar img') as HTMLImageElement)?.src).toContain('https://example.com/avatar.png')

    trigger.click()
    await header.updateComplete

    const dropdown = shadow?.getElementById('accountMenu') as HTMLElement
    const accountButtons = shadow?.querySelectorAll('.account-menu-item-button') as NodeListOf<HTMLButtonElement>
    const firstItem = accountButtons[0]
    const lastItem = accountButtons[accountButtons.length - 1]

    expect(dropdown.hidden).toBe(false)
    expect(firstItem.textContent).toContain('Personal Pod')
    expect(lastItem.textContent).toContain('Log out')

    firstItem.click()

    expect(accountMenuSelected).toHaveBeenCalledWith({
      label: 'Personal Pod',
      description: 'https://pod.example/profile/card#me',
      action: 'switch-personal'
    })

    trigger.click()
    await header.updateComplete
    lastItem.click()

    expect(accountMenuSelected).toHaveBeenCalledWith({ label: 'Log out', action: 'logout' })
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

    const helpMenuClicked = jest.fn()

    header.authState = 'logged-in'
    header.helpMenuList = [{ label: 'Docs', url: 'https://example.com/docs', target: '_blank' }]

    header.addEventListener('help-menu-select', (event: Event) => {
      helpMenuClicked((event as CustomEvent).detail)
    })

    document.body.appendChild(header)
    await header.updateComplete

    const shadow = header.shadowRoot
    const helpTrigger = shadow?.getElementById('helpMenuTrigger') as HTMLButtonElement

    expect(helpTrigger?.disabled).toBe(false)

    helpTrigger?.click()
    await header.updateComplete

    const helpMenu = shadow?.getElementById('helpMenu') as HTMLElement
    const helpLink = shadow?.querySelector('a[part="help-menu-item"]') as HTMLAnchorElement

    expect(helpMenu?.hidden).toBe(false)
    expect(helpLink?.textContent?.trim()).toBe('Docs')

    helpLink?.click()

    expect(helpMenuClicked).toHaveBeenCalledWith({ label: 'Docs', url: 'https://example.com/docs', target: '_blank' })
  })
})
