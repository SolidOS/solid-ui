import { LitElement, html, css } from 'lit'

const DEFAULT_SIGNUP_URL = 'https://solidproject.org/get_a_pod'

export class SignupButton extends LitElement {
  static properties = {
    label: { type: String, reflect: true },
    theme: { type: String, reflect: true },
    signupUrl: { type: String, attribute: 'signup-url', reflect: true }
  }

  static styles = css`
    :host {
      display: inline-block;
      --signup-button-background: transparent;
      --signup-button-border: var(--color-border, #E5E7EB);
      --signup-button-text: var(--color-header-text, #ffffff);
    }

    :host([theme='dark']) {
      --signup-button-background: transparent;
      --signup-button-border: var(--color-border, #E5E7EB);
      --signup-button-text: var(--color-header-text, #ffffff);
    }

    .signup-button {
      display: flex;
      height: 35px;
      padding: var(--spacing-xxs, 0.3125rem) var(--spacing-xs, 0.75rem);
      align-items: center;
      gap: var(--spacing-xxs, 0.3125rem);
      border-radius: var(--border-radius-base, 0.3125rem);
      background: var(--signup-button-background);
      border: 1px solid var(--signup-button-border);
      color: var(--signup-button-text);
      cursor: pointer;
      font: inherit;
      line-height: 1;
      white-space: nowrap;
      text-decoration: none;
      box-sizing: border-box;
      transition: transform 0.2s ease;
    }

    .signup-button:active {
      transform: translateY(1px);
    }
  `

  declare label: string
  declare theme: 'light' | 'dark'
  declare signupUrl: string

  constructor () {
    super()
    this.label = 'Sign Up'
    this.signupUrl = DEFAULT_SIGNUP_URL
    this.theme = 'light'
  }

  private _handleClick () {
    window.open(this.signupUrl, '_blank', 'noopener,noreferrer')
  }

  render () {
    return html`
      <button
        class="signup-button"
        type="button"
        part="signup-button"
        @click="${() => this._handleClick()}"
      >
        <slot>${this.label}</slot>
      </button>
    `
  }
}
