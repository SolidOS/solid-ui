import { LitElement, html, css } from 'lit'
import { authSession, authn, getSuggestedIssuers, offlineTestID, solidLogicSingleton } from 'solid-logic'
import { phoneIcon as downArrowIcon } from './downArrow'

export class LoginButton extends LitElement {
  static properties = {
    label: { type: String, reflect: true },
    theme: { type: String, reflect: true },
    issuerUrl: { type: String, attribute: 'issuer-url', reflect: true },
    icon: { type: String, reflect: true },
    layout: { type: String, reflect: true },
    _popupOpen: { state: true },
    _issuerInputValue: { state: true },
    _dropdownOpen: { state: true }
  }

  static styles = css`
    :host { // default theme
      display: inline-block;
      position: relative;
      z-index: 400;
      --login-button-background: var(--lavender-900, #7c4cff);
      --login-button-text: var(--color-header-text, #ffffff);
      --popup-background: var(--color-background, #F8F9FB);
      --popup-text: var(--color-text, #1A1A1A);
      --popup-border: var(--color-border, #E5E7EB);
      --popup-shadow: var(--box-shadow-sm, 0 1px 4px rgba(124,77,255,0.12));
      --popup-overlay-background: rgba(0, 0, 0, 0.6);
      --issuer-input-background: var(--color-background, #F8F9FB);
      --issuer-input-text: var(--color-text, #1A1A1A);
      --issuer-input-border: var(--color-text, #1A1A1A);
      --issuer-button-background: var(--color-background, #F8F9FB);
      --issuer-button-text: var(--color-text, #1A1A1A);
      --issuer-button-border: var(--color-border, #E5E7EB);
      --issuer-button-hover-background: var(--lavender-900, #7c4cff);
      --issuer-label-color: var(--grey-purple-700, #1A1A1A);
      --issuer-placeholder-color: var(--grey-purple-700, #5e546d);;
      --error-text-color: var(--color-error, #B00020);
    }

    :host([theme='dark']) {
      display: inline-block;
      position: relative;
      z-index: 900;
      --login-button-background: var(--lavender-900, #7c4cff);
      --login-button-text: var(--color-header-text, #ffffff);
      --popup-background: var(--color-background, #F8F9FB);
      --popup-text: var(--color-text, #1A1A1A);
      --popup-border: var(--color-border, #E5E7EB);
      --popup-shadow: var(--box-shadow-sm, 0 1px 4px rgba(124,77,255,0.12));
      --popup-overlay-background: rgba(0, 0, 0, 0.6);
      --issuer-input-background: var(--color-background, #F8F9FB);
      --issuer-input-text: var(--color-text, #1A1A1A);
      --issuer-input-border: var(--color-text, #1A1A1A);
      --issuer-button-background: var(--color-background, #F8F9FB);
      --issuer-button-text: var(--color-text, #1A1A1A);
      --issuer-button-border: var(--color-text, #1A1A1A);
      --issuer-button-hover-background: var(--lavender-900, #7c4cff);
      --issuer-label-color: var(--grey-purple-700, #1A1A1A);
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

    .login-button-icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      object-fit: contain;
    }

    .login-button:active {
      transform: translateY(1px);
    }

    .popup-dialog {
      border: none;
      padding: 0;
      background: transparent;
      outline: none;
      overflow: visible;
      max-height: none;
      max-width: none;
    }

    .popup-dialog::backdrop {
      background: var(--popup-overlay-background, rgba(0, 0, 0, 0.6));
    }

    .popup-box {
      background: var(--popup-background);
      color: var(--popup-text);
      box-shadow: var(--popup-shadow);
      border: 1px solid var(--popup-border);
      border-radius: var(--border-radius-md, 0.5rem);
      min-width: 480px;
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
      padding: 1rem;
      background: var(--gray-200, #E5E7EB);
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
      display: flex;
      flex-direction: column;
      padding: 1rem 1rem 1.75rem;
    }

    .issuer-text-label {
      color: var(--issuer-label-color);
      margin-bottom: 6px;
    }

    .issuer-text-row {
      display: flex;
      flex-direction: row;
      gap: 6px;
      align-items: flex-start;
    }

    .issuer-input-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      position: relative;
    }

    .issuer-input-field-row {
      display: flex;
      flex-direction: row;
      position: relative;
    }

    .issuer-text-input {
      flex: 1;
      padding: 0.375rem 2.75rem 0.375rem 0.5rem;
      border: 1px solid var(--issuer-input-border);
      border-radius: var(--border-radius-base, 0.3125rem);
      background: var(--issuer-input-background);
      color: var(--issuer-input-text);
      font: inherit;
      min-width: 0;
    }

    .issuer-text-input::placeholder {
      color: var(--issuer-placeholder-color);
    }

    .issuer-dropdown-toggle {
      position: absolute;
      right: 6px;
      top: 50%;
      transform: translateY(-50%);
      width: 26px;
      height: 26px;
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border-radius: var(--border-radius-base, 0.3125rem);
    }

    .issuer-dropdown-toggle:hover {
      background: var(--color-header-menu-item-hover, #e6dcff);
    }

    .issuer-dropdown-toggle svg {
      width: 14px;
      height: 14px;
      display: block;
    }

    .issuer-dropdown-list {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      right: 0;
      border: 1px solid var(--color-border, #E5E7EB);
      border-top: none;
      border-radius: 0 0 var(--border-radius-base, 0.3125rem) var(--border-radius-base, 0.3125rem);
      background: var(--issuer-input-background);
      overflow: visible;
      z-index: 10;
      box-shadow: 0 4px 12px rgba(124, 77, 255, 0.12);
    }

    .issuer-dropdown-item {
      display: block;
      width: 100%;
      padding: 0.625rem 0.75rem;
      border: none;
      border-bottom: 1px solid var(--color-border, #E5E7EB);
      background: transparent;
      color: var(--issuer-button-text);
      cursor: pointer;
      font: inherit;
      text-align: left;
      box-sizing: border-box;
    }

    .issuer-dropdown-item:last-child {
      border-bottom: none;
    }

    .issuer-dropdown-item:hover {
      background: var(--color-header-menu-item-hover, #e6dcff);
      border-radius: var(--border-radius-base-md, 0.5rem);
    }

    .popup-footer {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 8px;
      padding: 0.75rem 1rem 1rem;
    }

    .popup-footer-hr {
      margin: 0;
      border: none;
      border-top: 1px solid var(--popup-border, #E5E7EB);
    }

    .popup-cancel-button {
      padding: 0.5rem 1.25rem;
      border: 1px solid #C0BFC7;
      border-radius: var(--border-radius-base, 0.3125rem);
      background: var(--popup-background);
      color: #314158;
      cursor: pointer;
      font: inherit;
    }

    .popup-cancel-button:hover {
      background: #D1D5DB;
    }

    .popup-login-button {
      padding: 0.5rem 1.25rem;
      border: none;
      border-radius: var(--border-radius-base, 0.3125rem);
      background: var(--lavender-900, #7c4cff);
      color: #ffffff;
      cursor: pointer;
      font: inherit;
    }

    .popup-login-button:hover {
      background: #6a3de8;
    }

    .popup-login-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
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
  declare icon: string
  declare layout: 'desktop' | 'mobile'
  declare _popupOpen: boolean
  declare _issuerInputValue: string
  declare _dropdownOpen: boolean

  private _issuerInputId = `issuer-url-input-${Math.random().toString(36).slice(2, 10)}`
  private _errorMsg = ''

  constructor () {
    super()
    this.label = 'Log In'
    this.theme = 'light'
    this.issuerUrl = ''
    this.icon = ''
    this.layout = 'desktop'
    this._popupOpen = false
    this._issuerInputValue = ''
    this._dropdownOpen = false
  }

  connectedCallback () {
    super.connectedCallback()
  }

  disconnectedCallback () {
    super.disconnectedCallback()
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

  updated () {
    const dialog = this.shadowRoot?.querySelector('dialog') as HTMLDialogElement | null
    if (!dialog) return
    if (this._popupOpen && !dialog.open) {
      dialog.showModal()
    } else if (!this._popupOpen && dialog.open) {
      dialog.close()
    }
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
    this._dropdownOpen = false
    this._loginToIssuer(this._issuerInputValue)
  }

  private _toggleDropdown () {
    this._dropdownOpen = !this._dropdownOpen
  }

  private _selectIssuerFromDropdown (uri: string) {
    this._issuerInputValue = uri
    this._dropdownOpen = false
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
      <div class="popup-box">
          <div class="popup-top-menu">
            <span class="popup-title">Select an identity provider</span>
            <button class="popup-close" type="button" aria-label="Close" @click="${() => this._closePopup()}">&#x2715;</button>
          </div>

          <div class="issuer-text-section">
            <label class="issuer-text-label" for="${this._issuerInputId}">Solid Identity Provider</label>
            <div class="issuer-text-row">
              <div class="issuer-input-wrapper">
                <div class="issuer-input-field-row">
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
                  ${suggestedIssuers.length
? html`
                    <button
                      class="issuer-dropdown-toggle"
                      type="button"
                      aria-label="Show identity provider suggestions"
                      aria-expanded="${this._dropdownOpen}"
                      @click="${() => this._toggleDropdown()}"
                    >${downArrowIcon}</button>
                  `
: ''}
                </div>
                ${this._dropdownOpen && suggestedIssuers.length
? html`
                  <div class="issuer-dropdown-list" role="listbox">
                    ${suggestedIssuers.map(issuerInfo => html`
                      <button
                        class="issuer-dropdown-item"
                        type="button"
                        role="option"
                        @click="${() => this._selectIssuerFromDropdown(issuerInfo.uri)}"
                      >${issuerInfo.name}</button>
                    `)}
                  </div>
                `
: ''}
              </div>
            </div>
            ${this._errorMsg ? html`<div class="error-msg">${this._errorMsg}</div>` : ''}
          </div>
          <hr class="popup-footer-hr" />
          <div class="popup-footer">
            <button class="popup-cancel-button" type="button" @click="${() => this._closePopup()}">Cancel</button>
            <button
              class="popup-login-button"
              type="button"
              ?disabled="${!this._issuerInputValue}"
              @click="${() => this._handleGoClick()}"
            >Log In</button>
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
        ${this.icon ? html`<img class="login-button-icon" src="${this.icon}" alt="" aria-hidden="true" part="login-button-icon" />` : ''}
        <slot>${this.label}</slot>
      </button>

      <dialog
        class="popup-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Select an identity provider"
        @cancel="${(e: Event) => { e.preventDefault(); this._closePopup() }}"
        @click="${(e: MouseEvent) => { if (e.target === e.currentTarget) this._closePopup() }}"
      >
        ${this._popupOpen ? this._renderPopup() : ''}
      </dialog>
    `
  }
}
