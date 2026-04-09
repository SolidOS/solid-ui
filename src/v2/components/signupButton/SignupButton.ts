import { LitElement, html, css } from 'lit'
import { Signup } from '../../../signup/signup.js'

const DEFAULT_SIGNUP_URL = 'https://solidproject.org/get_a_pod'

export class SignupButton extends LitElement {
  static properties = {
    label: { type: String, reflect: true },
    signupUrl: { type: String, attribute: 'signup-url', reflect: true },
    _loading: { state: true }
  }

  static styles = css`
    :host {
      display: inline-block;
    }

    .signup-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      min-height: 2.25rem;
      padding: 0.5rem 0.875rem;
      border: 1px solid var(--signup-button-border, var(--header-border, #efecf3));
      border-radius: 999px;
      background: var(--signup-button-bg, color-mix(in srgb, var(--header-menu-bg, #f6f5f9) 78%, var(--header-link-selected, #cbb9ff) 22%));
      color: var(--signup-button-text, var(--header-button-text, #0f172a));
      cursor: pointer;
      font: inherit;
      line-height: 1;
      text-decoration: none;
      box-sizing: border-box;
      transition: border-color 0.2s ease, transform 0.2s ease;
    }

    .signup-button:hover {
      border-color: var(--signup-button-border-hover, var(--header-link-hover, #e6dcff));
    }

    .signup-button:active {
      transform: translateY(1px);
    }

    .signup-button:disabled {
      opacity: 0.6;
      cursor: default;
    }
  `

  declare label: string
  declare signupUrl: string
  declare _loading: boolean

  constructor () {
    super()
    this.label = 'Sign Up'
    this.signupUrl = DEFAULT_SIGNUP_URL
    this._loading = false
  }

  private async _handleClick () {
    if (this._loading) return
    this._loading = true

    try {
      const signupMgr = new Signup({ signupEndpoint: this.signupUrl })
      const webId = await signupMgr.signup()
      this.dispatchEvent(new CustomEvent('signup-success', {
        detail: { webId },
        bubbles: true,
        composed: true
      }))
    } catch (err: any) {
      this.dispatchEvent(new CustomEvent('signup-error', {
        detail: { message: err?.message || String(err) },
        bubbles: true,
        composed: true
      }))
    } finally {
      this._loading = false
    }
  }

  render () {
    return html`
      <button
        class="signup-button"
        type="button"
        part="signup-button"
        ?disabled="${this._loading}"
        @click="${() => this._handleClick()}"
      >
        <slot>${this._loading ? 'Signing up…' : this.label}</slot>
      </button>
    `
  }
}
