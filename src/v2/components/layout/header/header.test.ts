import Features from '../../../../lib/features'
import { Header } from './Header'
import './index'
import { authn, authSession } from 'solid-logic'

type Listener = () => void
const mockSessionListeners = new Map<string, Set<Listener>>()

jest.mock('solid-logic', () => ({
  authn: {
    checkUser: jest.fn(async () => null),
    currentUser: jest.fn(() => null)
  },
  performServerSideLogout: jest.fn(async () => false),
  authSession: {
    logout: jest.fn(async () => undefined),
    events: {
      on: jest.fn((event: string, handler: Listener) => {
        if (!mockSessionListeners.has(event)) mockSessionListeners.set(event, new Set())
        mockSessionListeners.get(event)?.add(handler)
      }),
      off: jest.fn((event: string, handler: Listener) => {
        mockSessionListeners.get(event)?.delete(handler)
      }),
      emit: jest.fn((event: string) => {
        mockSessionListeners.get(event)?.forEach(handler => handler())
      })
    }
  }
}))

describe('SolidUIHeaderElement', () => {
  async function waitForAuthRefresh (header: Header): Promise<void> {
    await Promise.resolve()
    await Promise.resolve()
    await header.updateComplete
  }

  beforeEach(() => {
    Features.DESIGN_SYSTEM_HEADER_ACCOUNT = false
    document.body.innerHTML = ''
    jest.clearAllMocks()
    mockSessionListeners.clear()
    ;(authn.currentUser as jest.Mock).mockReturnValue(null)
    ;(authn.checkUser as jest.Mock).mockResolvedValue(null)
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
    header.authResolved = true
    header.helpMenuList = [{ label: 'Help', action: 'open-help' }]
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

    expect(shadow?.querySelector('solid-ui-login-button')).not.toBeNull()
    expect(shadow?.querySelector('solid-ui-signup-button')).not.toBeNull()

    const helpMenuSlot = shadow?.querySelector('slot[name="help-menu"]')
    expect(helpMenuSlot).not.toBeNull()
    expect(header.querySelector('#helpBtn')).not.toBeNull()
  })

  it('renders login and sign up actions when logged out', async () => {
    const header = new Header()
    const authActionSelected = jest.fn()

    header.authState = 'logged-out'
    header.authResolved = true
    header.loginAction = { label: 'Log in', action: 'login', icon: 'https://example.com/login-icon.svg' }
    header.signUpAction = { label: 'Sign Up', url: '/signup', icon: 'https://example.com/signup-icon.svg' }
    header.loginIcon = 'https://example.com/login-icon-top.svg'
    header.signUpIcon = 'https://example.com/signup-icon-top.svg'

    header.addEventListener('auth-action-select', (event: Event) => {
      authActionSelected((event as CustomEvent).detail)
    })

    document.body.appendChild(header)
    await header.updateComplete

    const shadow = header.shadowRoot
    const loginButton = shadow?.querySelector('solid-ui-login-button') as HTMLElement
    const signUpLink = shadow?.querySelector('solid-ui-signup-button') as HTMLElement

    expect(loginButton).not.toBeNull()
    expect(signUpLink).not.toBeNull()
    expect(loginButton.getAttribute('label')).toBe('Log in')
    expect(loginButton.getAttribute('icon')).toBe('https://example.com/login-icon-top.svg')
    expect(signUpLink.getAttribute('label')).toBe('Sign Up')
    expect(signUpLink.getAttribute('signup-url')).toBe('/signup')
    expect(signUpLink.getAttribute('icon')).toBe('https://example.com/signup-icon-top.svg')

    loginButton.dispatchEvent(new CustomEvent('login-success', { bubbles: true, composed: true }))
    await waitForAuthRefresh(header)

    expect(authActionSelected).toHaveBeenCalledWith({
      role: 'login'
    })
  })

  it('does not show login or signup icons on mobile layout', async () => {
    const header = new Header()
    header.authState = 'logged-out'
    header.authResolved = true
    header.layout = 'mobile'
    header.loginAction = { label: 'Log in', action: 'login', icon: 'https://example.com/login-icon.svg' }
    header.signUpAction = { label: 'Sign Up', url: '/signup', icon: 'https://example.com/signup-icon.svg' }
    header.loginIcon = 'https://example.com/login-icon-top.svg'
    header.signUpIcon = 'https://example.com/signup-icon-top.svg'

    document.body.appendChild(header)
    await header.updateComplete

    const shadow = header.shadowRoot
    const loginButton = shadow?.querySelector('solid-ui-login-button') as HTMLElement
    const signUpButton = shadow?.querySelector('solid-ui-signup-button') as HTMLElement

    expect(loginButton?.shadowRoot?.querySelector('.login-button-icon')).toBeNull()
    expect(signUpButton?.shadowRoot?.querySelector('.signup-button-icon')).toBeNull()
  })

  it('uses a custom fallback avatar when no accountAvatar is configured', async () => {
    const header = new Header()
    ;(authn.currentUser as jest.Mock).mockReturnValue({ uri: 'https://alice.example/profile/card#me' })

    header.authState = 'logged-in'
    header.authResolved = true
    header.accountAvatar = ''
    header.accountAvatarFallback = 'https://example.com/fallback-avatar.png'

    document.body.appendChild(header)
    await header.updateComplete

    const shadow = header.shadowRoot
    const avatarImg = shadow?.querySelector('.account-avatar img') as HTMLImageElement

    expect(avatarImg).not.toBeNull()
    expect(avatarImg.src).toContain('https://example.com/fallback-avatar.png')
  })

  it('renders an accounts dropdown with avatar when logged in', async () => {
    const header = new Header()
    const accountMenuSelected = jest.fn()
    ;(authn.currentUser as jest.Mock).mockReturnValue({ uri: 'https://alice.example/profile/card#me' })

    header.authState = 'logged-in'
    header.authResolved = true
    header.accountIcon = 'https://example.com/account-icon.svg'
    header.accountAvatar = 'https://example.com/avatar.png'
    header.logoutIcon = 'https://example.com/logout-icon.svg'
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
    expect((trigger.querySelector('img.account-menu-trigger-icon') as HTMLImageElement)?.src).toContain('https://example.com/account-icon.svg')
    expect((shadow?.querySelector('.account-avatar img') as HTMLImageElement)?.src).toContain('https://example.com/avatar.png')

    trigger.click()
    await header.updateComplete

    const dropdown = shadow?.getElementById('accountMenu') as HTMLElement
    const accountButtons = shadow?.querySelectorAll('.account-menu-item-button') as NodeListOf<HTMLButtonElement>
    const firstItem = accountButtons[0]
    const lastItem = accountButtons[accountButtons.length - 1]

    expect(dropdown.hidden).toBe(false)
    expect(firstItem.textContent).toContain('Personal Pod')
    expect(lastItem.textContent).toContain('Log Out')
    expect((lastItem.querySelector('img.logout-action-icon') as HTMLImageElement)?.src).toContain('https://example.com/logout-icon.svg')

    firstItem.click()

    expect(accountMenuSelected).toHaveBeenCalledWith({
      label: 'Personal Pod',
      webid: 'https://pod.example/profile/card#me',
      action: 'switch-personal'
    })

    expect(lastItem.textContent?.trim()).toBe('Log Out')
  })

  it('does not render the logout icon on mobile layout', async () => {
    const header = new Header()
    ;(authn.currentUser as jest.Mock).mockReturnValue({ uri: 'https://alice.example/profile/card#me' })
    header.layout = 'mobile'
    header.authState = 'logged-in'
    header.authResolved = true
    header.logoutIcon = 'https://example.com/logout-icon.svg'
    header.logoutLabel = 'Log Out'

    document.body.appendChild(header)
    await header.updateComplete

    const shadow = header.shadowRoot
    const trigger = shadow?.getElementById('accountMenuTrigger') as HTMLButtonElement
    expect(trigger).not.toBeNull()

    trigger.click()
    await header.updateComplete

    const lastItem = shadow?.querySelectorAll('.account-menu-item-button')[0] as HTMLButtonElement
    expect(lastItem).not.toBeNull()
    expect(lastItem.querySelector('img.logout-action-icon')).toBeNull()
    expect(lastItem.textContent?.trim()).toBe('Log Out')
  })

  it('does not render account webid on mobile layout', async () => {
    const header = new Header()
    ;(authn.currentUser as jest.Mock).mockReturnValue({ uri: 'https://alice.example/profile/card#me' })
    header.layout = 'mobile'
    header.authState = 'logged-in'
    header.authResolved = true
    header.accountMenu = [
      { label: 'Personal Pod', webid: 'https://pod.example/profile/card#me', action: 'switch-personal' }
    ]

    document.body.appendChild(header)
    await header.updateComplete

    const shadow = header.shadowRoot
    const trigger = shadow?.getElementById('accountMenuTrigger') as HTMLButtonElement
    expect(trigger).not.toBeNull()

    trigger.click()
    await header.updateComplete

    const firstItem = shadow?.querySelector('.account-menu-item-button') as HTMLButtonElement
    expect(firstItem).not.toBeNull()
    expect(firstItem.querySelector('.account-menu-webid')).toBeNull()
    expect(firstItem.textContent?.trim()).toBe('Personal Pod')
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
    ;(authn.currentUser as jest.Mock).mockReturnValue({ uri: 'https://alice.example/profile/card#me' })

    const helpMenuClicked = jest.fn()

    header.authState = 'logged-in'
    header.authResolved = true
    header.helpIcon = ''
    header.helpMenuList = [{ label: 'Docs', url: 'https://example.com/docs', target: '_blank' }]

    header.addEventListener('help-menu-select', (event: Event) => {
      helpMenuClicked((event as CustomEvent).detail)
    })

    document.body.appendChild(header)
    await header.updateComplete

    const shadow = header.shadowRoot
    const helpTrigger = shadow?.getElementById('helpMenuTrigger') as HTMLButtonElement

    expect(helpTrigger?.disabled).toBe(false)
    expect(helpTrigger?.textContent?.trim()).toBe('Help')

    helpTrigger?.click()
    await header.updateComplete

    const helpMenu = shadow?.getElementById('helpMenu') as HTMLElement
    const helpLink = shadow?.querySelector('a[part="help-menu-item"]') as HTMLAnchorElement

    expect(helpMenu?.hidden).toBe(false)
    expect(helpLink?.textContent?.trim()).toBe('Docs')

    const originalWindowOpen = window.open
    window.open = jest.fn()

    expect(helpLink?.getAttribute('rel')).toBe('noopener noreferrer')

    helpLink?.click()

    expect(helpMenuClicked).toHaveBeenCalledWith({ label: 'Docs', url: 'https://example.com/docs', target: '_blank' })
    expect(window.open).toHaveBeenCalledWith('https://example.com/docs', '_blank', 'noopener,noreferrer')

    window.open = originalWindowOpen
  })

  it('derives auth state from session on connect', async () => {
    const header = new Header()
    ;(authn.currentUser as jest.Mock).mockReturnValue({ uri: 'https://alice.example/profile/card#me' })

    document.body.appendChild(header)
    await header.updateComplete
    await waitForAuthRefresh(header)

    expect(authn.checkUser).toHaveBeenCalled()
    expect(header.authState).toBe('logged-in')
  })

  it('retries session resolution once before settling logged-out state', async () => {
    const header = new Header()
    let callCount = 0
    ;(authn.currentUser as jest.Mock).mockImplementation(() => {
      return callCount >= 2 ? { uri: 'https://alice.example/profile/card#me' } : null
    })
    ;(authn.checkUser as jest.Mock).mockImplementation(async () => {
      callCount += 1
      return callCount >= 2 ? { uri: 'https://alice.example/profile/card#me' } : null
    })

    document.body.appendChild(header)
    await header.updateComplete
    await Promise.resolve()
    await header.updateComplete

    expect(authn.checkUser).toHaveBeenCalledTimes(2)
    expect(header.authResolved).toBe(true)
    expect(header.authState).toBe('logged-in')
  })

  it('refreshes auth state when session events fire', async () => {
    const header = new Header()
    document.body.appendChild(header)
    await header.updateComplete

    ;(authn.currentUser as jest.Mock).mockReturnValue({ uri: 'https://alice.example/profile/card#me' })
    ;(authSession.events as any).emit('login')
    await waitForAuthRefresh(header)
    expect(header.authState).toBe('logged-in')

    ;(authn.currentUser as jest.Mock).mockReturnValue(null)
    ;(authSession.events as any).emit('logout')
    await waitForAuthRefresh(header)
    expect(header.authState).toBe('logged-out')
  })
})
