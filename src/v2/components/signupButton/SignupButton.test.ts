import { SignupButton } from './SignupButton'
import './index'

describe('SolidUISignupButton', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    Object.defineProperty(window, 'open', {
      configurable: true,
      writable: true,
      value: jest.fn()
    })
  })

  it('is defined as a custom element', () => {
    expect(customElements.get('solid-ui-signup-button')).toBe(SignupButton)
  })

  it('renders the signup button and opens the signup URL in a new tab', async () => {
    const signupButton = new SignupButton()
    signupButton.signupUrl = 'https://example.com/register'
    document.body.appendChild(signupButton)
    await signupButton.updateComplete

    const button = signupButton.shadowRoot?.querySelector('button.signup-button') as HTMLButtonElement
    expect(button).not.toBeNull()
    expect(button.textContent?.trim()).toBe('Sign Up')

    button.click()
    expect(window.open).toHaveBeenCalledWith('https://example.com/register', '_blank', 'noopener,noreferrer')
  })
})
