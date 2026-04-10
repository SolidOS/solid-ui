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
    }

    .signup-button {
      display: flex;
      height: 35px;
      padding: 5px 12px;
      align-items: center;
      gap: 5px;
      border-radius: 5px;
      background: transparent;
      border: 1px solid var(--white, #FFF);
      color: var(--signup-button-text, var(--header-button-text, #0f172a));
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

    :host([theme='dark']) .signup-button {
      color: #ffffff;
      border-color: #ffffff;
    }
  `

  declare label: string
  declare theme: 'light' | 'dark'
  declare signupUrl: string

  constructor () {
    super()
    this.label = 'Sign Up'
    this.signupUrl = DEFAULT_SIGNUP_URL
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
