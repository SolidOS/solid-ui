import { LoginButton } from './LoginButton'
import './index'

jest.mock('solid-logic', () => ({
  authSession: { login: jest.fn() },
  authn: { saveUser: jest.fn() },
  getSuggestedIssuers: jest.fn(() => []),
  offlineTestID: jest.fn(() => false),
  solidLogicSingleton: { store: { updater: { flagAuthorizationMetadata: jest.fn() } } }
}))

describe('SolidUILoginButton', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    Object.defineProperty(window, 'open', {
      configurable: true,
      writable: true,
      value: jest.fn()
    })
    localStorage.clear()
  })

  it('is defined as a custom element', () => {
    expect(customElements.get('solid-ui-login-button')).toBe(LoginButton)
  })

  it('renders the login button and opens a popup with an associated label and input', async () => {
    const loginButton = new LoginButton()
    document.body.appendChild(loginButton)
    await loginButton.updateComplete

    const button = loginButton.shadowRoot?.querySelector('button.login-button') as HTMLButtonElement
    expect(button).not.toBeNull()
    expect(button.textContent?.trim()).toBe('Log In')

    button.click()
    await loginButton.updateComplete

    const label = loginButton.shadowRoot?.querySelector('label.issuer-text-label') as HTMLLabelElement
    const input = loginButton.shadowRoot?.querySelector('input.issuer-text-input') as HTMLInputElement
    expect(label).not.toBeNull()
    expect(input).not.toBeNull()
    expect(label?.getAttribute('for')).toBe(input?.id)
    expect(input?.id).toBeTruthy()
  })
})
