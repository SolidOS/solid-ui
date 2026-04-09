import { LitElement, html, css } from 'lit'
import { authSession, authn, getSuggestedIssuers, offlineTestID, solidLogicSingleton } from 'solid-logic'

export class LoginButton extends LitElement {
  static properties = {
    label: { type: String, reflect: true },
    issuerUrl: { type: String, attribute: 'issuer-url', reflect: true },
    _popupOpen: { state: true },
    _issuerInputValue: { state: true }
  }

  static styles = css`
    :host {
      display: inline-block;
    }

    .login-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      min-height: 2.25rem;
      padding: 0.5rem 0.875rem;
      border: 1px solid var(--login-button-border, var(--header-border, #efecf3));
      border-radius: 999px;
      background: var(--login-button-bg, var(--header-menu-bg, #f6f5f9));
      color: var(--login-button-text, var(--header-button-text, #0f172a));
      cursor: pointer;
      font: inherit;
      line-height: 1;
      text-decoration: none;
      box-sizing: border-box;
      transition: border-color 0.2s ease, transform 0.2s ease;
    }

    .login-button:hover {
      border-color: var(--login-button-border-hover, var(--header-link-hover, #e6dcff));
    }

    .login-button:active {
      transform: translateY(1px);
    }

    /* Popup overlay */
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
      background: rgba(0, 0, 0, 0.2);
    }

    .popup-box {
      background: #ffffff;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
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
      color: #888;
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
      border: 1px solid #ccc;
      border-radius: 4px;
      font: inherit;
    }

    .issuer-go-button {
      padding: 0.375rem 0.75rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: #f6f5f9;
      cursor: pointer;
      font: inherit;
    }

    .issuer-go-button:hover {
      background: #e6dcff;
    }

    .issuer-button-section {
      display: flex;
      flex-direction: column;
      padding-top: 10px;
      gap: 8px;
    }

    .issuer-button-label {
      color: #888;
    }

    .issuer-button {
      height: 38px;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: #f6f5f9;
      cursor: pointer;
      font: inherit;
    }

    .issuer-button:hover {
      background: #e6dcff;
    }

    .error-msg {
      color: #c00;
      font-size: 0.875rem;
      margin-top: 8px;
    }
  `

  declare label: string
  declare issuerUrl: string
  declare _popupOpen: boolean
  declare _issuerInputValue: string

  private _errorMsg = ''

  constructor () {
    super()
    this.label = 'Log in'
    this.issuerUrl = ''
    this._popupOpen = false
    this._issuerInputValue = ''
  }

  connectedCallback () {
    super.connectedCallback()
    document.addEventListener('click', this._handleDocumentClick)
  }

  disconnectedCallback () {
    document.removeEventListener('click', this._handleDocumentClick)
    super.disconnectedCallback()
  }

  private readonly _handleDocumentClick = (event: MouseEvent) => {
    if (this._popupOpen && !event.composedPath().includes(this)) {
      this._popupOpen = false
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
            <label class="issuer-text-label">Enter the URL of your identity provider:</label>
            <div class="issuer-text-row">
              <input
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

          ${suggestedIssuers.length ? html`
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
          ` : ''}
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
