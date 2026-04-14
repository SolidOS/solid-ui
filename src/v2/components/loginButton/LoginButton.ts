import { LitElement, html, css } from 'lit'
import { authSession, authn, getSuggestedIssuers, offlineTestID, solidLogicSingleton } from 'solid-logic'

export class LoginButton extends LitElement {
  static properties = {
    label: { type: String, reflect: true },
    theme: { type: String, reflect: true },
    issuerUrl: { type: String, attribute: 'issuer-url', reflect: true },
    _popupOpen: { state: true },
    _issuerInputValue: { state: true }
  }

  static styles = css`
    :host { // default theme
      display: inline-block;
      --login-button-background: var(--lavender-900, #7c4cff);
      --login-button-text: var(--color-header-text, #ffffff);
      --popup-background: var(--color-background, #F8F9FB);
      --popup-text: var(--color-text, #1A1A1A);
      --popup-border: var(--color-border, #E5E7EB);
      --popup-shadow: var(--box-shadow-sm, 0 1px 4px rgba(124,77,255,0.12));
      --popup-overlay-background: rgba(0, 0, 0, 0.2);
      --issuer-input-background: var(--color-background, #F8F9FB);
      --issuer-input-text: var(--color-text, #1A1A1A);
      --issuer-input-border: var(--color-border, #E5E7EB);
      --issuer-button-background: var(--color-background, #F8F9FB);
      --issuer-button-text: var(--color-text, #1A1A1A);
      --issuer-button-border: var(--color-border, #E5E7EB);
      --issuer-button-hover-background: var(--lavender-900, #7c4cff);
      --issuer-label-color: var(--grey-purple-700, #5e546d);
      --issuer-placeholder-color: var(--grey-purple-700, #5e546d);;
      --error-text-color: var(--color-error, #B00020);
    }

    :host([theme='dark']) {
      display: inline-block;
      --login-button-background: var(--lavender-900, #7c4cff);
      --login-button-text: var(--color-header-text, #ffffff);
      --popup-background: var(--color-background, #F8F9FB);
      --popup-text: var(--color-text, #1A1A1A);
      --popup-border: var(--color-border, #E5E7EB);
      --popup-shadow: var(--box-shadow-sm, 0 1px 4px rgba(124,77,255,0.12));
      --popup-overlay-background: rgba(0, 0, 0, 0.2);
      --issuer-input-background: var(--color-background, #F8F9FB);
      --issuer-input-text: var(--color-text, #1A1A1A);
      --issuer-input-border: var(--color-border, #E5E7EB);
      --issuer-button-background: var(--color-background, #F8F9FB);
      --issuer-button-text: var(--color-text, #1A1A1A);
      --issuer-button-border: var(--color-border, #E5E7EB);
      --issuer-button-hover-background: var(--lavender-900, #7c4cff);
      --issuer-label-color: var(--grey-purple-700, #5e546d);
      --issuer-placeholder-color: var(--grey-purple-700, #5e546d);;
      --error-text-color: var(--color-error, #B00020);
    }

    .login-button {
      display: flex;
      height: 35px;
      padding: var(--spacing-xxs, 0.3125rem) var(--spacing-xs, 0.75rem);
      align-items: center;
      gap: var(--spacing-xxs, 0.3125rem);
      border-radius: var(--border-radius-base, 0.3125rem);
      background: var(--login-button-background);
      border: none;
      color: var(--login-button-text);
      cursor: pointer;
      font: inherit;
      line-height: 1;
      white-space: nowrap;
      text-decoration: none;
      box-sizing: border-box;
      transition: transform 0.2s ease;
    }

    .login-button:active {
      transform: translateY(1px);
    }

    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      background: var(--popup-overlay-background);
    }

    .popup-box {
      background: var(--popup-background);
      color: var(--popup-text);
      box-shadow: var(--popup-shadow);
      border: 1px solid var(--popup-border);
      border-radius: var(--border-radius-sm, 0.2rem);
      min-width: 400px;
      padding: 10px;
      z-index: 1001;
    }

    .popup-top-menu {
      border-bottom: 1px solid #DDD;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 8px;
      margin-bottom: 8px;
    }

    .popup-title {
      font-weight: 800;
    }

    .popup-close {
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 1.25rem;
      line-height: 1;
      padding: 0 0.25rem;
    }

    .issuer-text-section {
      border-bottom: 1px solid #DDD;
      display: flex;
      flex-direction: column;
      padding-top: 10px;
      padding-bottom: 10px;
    }

    .issuer-text-label {
      color: var(--issuer-label-color);
      margin-bottom: 6px;
    }

    .issuer-text-row {
      display: flex;
      flex-direction: row;
      gap: 6px;
    }

    .issuer-text-input {
      flex: 1;
      padding: 0.375rem 0.5rem;
      border: 1px solid var(--issuer-input-border);
      border-radius: var(--border-radius-sm, 0.2rem);
      background: var(--issuer-input-background);
      color: var(--issuer-input-text);
      font: inherit;
    }

    .issuer-text-input::placeholder {
      color: var(--issuer-placeholder-color);
    }

    .issuer-go-button {
      padding: 0.375rem 0.75rem;
      border: 1px solid var(--issuer-button-border);
      border-radius: var(--border-radius-sm, 0.2rem);
      background: var(--issuer-button-background);
      color: var(--issuer-button-text);
      cursor: pointer;
      font: inherit;
    }

    .issuer-go-button:hover {
      background: var(--issuer-button-hover-background);
    }

    .issuer-button-section {
      display: flex;
      flex-direction: column;
      padding-top: 10px;
      gap: 8px;
    }

    .issuer-button-label {
      color: var(--issuer-label-color);
    }

    .issuer-button {
      height: 38px;
      border: 1px solid var(--issuer-button-border);
      border-radius: var(--border-radius-sm, 0.2rem);
      background: var(--issuer-button-background);
      color: var(--issuer-button-text);
      cursor: pointer;
      font: inherit;
    }

    .issuer-button:hover {
      background: var(--issuer-button-hover-background);
    }

    .error-msg {
      color: var(--error-text-color);
      font-size: 0.875rem;
      margin-top: 8px;
    }
  `

  declare label: string
  declare theme: 'light' | 'dark'
  declare issuerUrl: string
  declare _popupOpen: boolean
  declare _issuerInputValue: string

  private _issuerInputId = `issuer-url-input-${Math.random().toString(36).slice(2, 10)}`
  private _errorMsg = ''

  constructor () {
    super()
    this.label = 'Log In'
    this.theme = 'light'
    this.issuerUrl = ''
    this._popupOpen = false
    this._issuerInputValue = ''
  }

  connectedCallback () {
    super.connectedCallback()
    document.addEventListener('click', this._handleDocumentClick)
    document.addEventListener('keydown', this._handleDocumentKeydown)
  }

  disconnectedCallback () {
    document.removeEventListener('click', this._handleDocumentClick)
    document.removeEventListener('keydown', this._handleDocumentKeydown)
    super.disconnectedCallback()
  }

  private readonly _handleDocumentClick = (event: MouseEvent) => {
    if (this._popupOpen && !event.composedPath().includes(this)) {
      this._popupOpen = false
    }
  }

  private readonly _handleDocumentKeydown = (event: KeyboardEvent) => {
    if (this._popupOpen && event.key === 'Escape') {
      this._closePopup()
    }
  }

  private _openPopup () {
    const offline = offlineTestID()
    if (offline) {
      this._loginComplete(offline.uri)
      return
    }
    this._issuerInputValue = (typeof localStorage !== 'undefined' && localStorage.getItem('loginIssuer')) || this.issuerUrl || ''
    this._errorMsg = ''
    this._popupOpen = true
  }

  private _closePopup () {
    this._popupOpen = false
  }

  private async _loginToIssuer (issuerUri: string) {
    if (!issuerUri) return
    try {
      // clear authorization metadata from store
      ;(solidLogicSingleton.store.updater as any).flagAuthorizationMetadata()

      const preLoginRedirectHash = new URL(window.location.href).hash
      if (preLoginRedirectHash) {
        window.localStorage.setItem('preLoginRedirectHash', preLoginRedirectHash)
      }
      window.localStorage.setItem('loginIssuer', issuerUri)

      const locationUrl = new URL(window.location.href)
      locationUrl.hash = ''
      await authSession.login({
        redirectUrl: locationUrl.href,
        oidcIssuer: issuerUri
      })
    } catch (err: any) {
      this._errorMsg = err.message || String(err)
      this.requestUpdate()
    }
  }

  private _loginComplete (webIdUri: string) {
    authn.saveUser(webIdUri)
    this.dispatchEvent(new CustomEvent('login-success', {
      detail: { webId: webIdUri },
      bubbles: true,
      composed: true
    }))
  }

  private _handleGoClick () {
    this._loginToIssuer(this._issuerInputValue)
  }

  private _handleInputChange (e: Event) {
    this._issuerInputValue = (e.target as HTMLInputElement).value
  }

  private _handleInputKeydown (e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this._loginToIssuer(this._issuerInputValue)
    }
    if (e.key === 'Escape') {
      this._closePopup()
    }
  }

  private _renderPopup () {
    const suggestedIssuers = getSuggestedIssuers()
    return html`
      <div class="popup-overlay" @click="${(e: MouseEvent) => { if (e.target === e.currentTarget) this._closePopup() }}">
        <div class="popup-box" role="dialog" aria-modal="true" aria-label="Select an identity provider">
          <div class="popup-top-menu">
            <span class="popup-title">Select an identity provider</span>
            <button class="popup-close" type="button" aria-label="Close" @click="${() => this._closePopup()}">&#x2715;</button>
          </div>

          <div class="issuer-text-section">
            <label class="issuer-text-label" for="${this._issuerInputId}">Enter the URL of your identity provider:</label>
            <div class="issuer-text-row">
              <input
                id="${this._issuerInputId}"
                class="issuer-text-input"
                type="text"
                placeholder="https://example.com"
                .value="${this._issuerInputValue}"
                @input="${this._handleInputChange}"
                @keydown="${this._handleInputKeydown}"
                autocomplete="url"
              />
              <button class="issuer-go-button" type="button" @click="${() => this._handleGoClick()}">Go</button>
            </div>
            ${this._errorMsg ? html`<div class="error-msg">${this._errorMsg}</div>` : ''}
          </div>

          ${suggestedIssuers.length
? html`
            <div class="issuer-button-section">
              <span class="issuer-button-label">Or pick an identity provider from the list below:</span>
              ${suggestedIssuers.map(issuerInfo => html`
                <button
                  class="issuer-button"
                  type="button"
                  @click="${() => this._loginToIssuer(issuerInfo.uri)}"
                >
                  ${issuerInfo.name}
                </button>
              `)}
            </div>
          `
: ''}
        </div>
      </div>
    `
  }

  render () {
    return html`
      <button
        class="login-button"
        type="button"
        part="login-button"
        @click="${() => this._openPopup()}"
      >
        <slot>${this.label}</slot>
      </button>

      ${this._popupOpen ? this._renderPopup() : ''}
    `
  }
}
