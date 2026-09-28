import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LoginButton } from './LoginButton'
import './index'

vi.mock('solid-logic', () => ({
  authSession: { login: vi.fn() },
  authn: { saveUser: vi.fn() },
  getSuggestedIssuers: vi.fn(() => []),
  offlineTestID: vi.fn(() => false),
  solidLogicSingleton: { store: { updater: { flagAuthorizationMetadata: vi.fn() } } }
}))

describe('SolidUILoginButton', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    Object.defineProperty(window, 'open', {
      configurable: true,
      writable: true,
      value: vi.fn()
    })
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()
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

  it('renders an icon when the icon property is set', async () => {
    const loginButton = new LoginButton()
    loginButton.icon = 'https://example.com/login-icon.svg'
    document.body.appendChild(loginButton)
    await loginButton.updateComplete

    const icon = loginButton.shadowRoot?.querySelector('img.login-button-icon') as HTMLImageElement
    expect(icon).not.toBeNull()
    expect(icon.src).toContain('https://example.com/login-icon.svg')
  })
})
