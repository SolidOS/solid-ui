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

  it('renders an icon when the icon property is set', async () => {
    const signupButton = new SignupButton()
    signupButton.icon = 'https://example.com/icon.svg'
    document.body.appendChild(signupButton)
    await signupButton.updateComplete

    const icon = signupButton.shadowRoot?.querySelector('img.signup-button-icon') as HTMLImageElement
    expect(icon).not.toBeNull()
    expect(icon.src).toContain('https://example.com/icon.svg')
  })

  it('applies mobile layout styles by removing the border on mobile', async () => {
    const signupButton = new SignupButton()
    signupButton.layout = 'mobile'
    document.body.appendChild(signupButton)
    await signupButton.updateComplete

    const style = signupButton.shadowRoot?.querySelector('style')?.textContent
    expect(style).toContain(':host([layout=\'mobile\']) .signup-button')
    expect(style).toContain('border: none;')
    expect(signupButton.getAttribute('layout')).toBe('mobile')
  })
})
