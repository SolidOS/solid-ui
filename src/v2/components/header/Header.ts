import { LitElement, html, css } from 'lit'
import { icons } from '../../../iconBase'
import { authSession } from 'solid-logic'
import '../loginButton/index'
import '../signupButton/index'
import { ifDefined } from 'lit/directives/if-defined.js'

const DEFAULT_HELP_MENU_ICON = icons.iconBase + 'noun_help.svg'
const DEFAULT_SOLID_ICON_URL = 'https://solidproject.org/assets/img/solid-emblem.svg'
const DEFAULT_SIGNUP_URL = 'https://solidproject.org/get_a_pod'
const DEFAULT_LOGGEDIN_MENU_BUTTON_AVATAR_LABEL = 'Accounts'

export type HeaderAuthState = 'logged-out' | 'logged-in'

export type HeaderMenuItem = {
  label: string
  url?: string
  target?: string
  action?: string
}

export type HeaderAccountMenuItem = HeaderMenuItem & {
  avatar?: string
  webid?: string
}

export class Header extends LitElement {
  static properties = {
    logo: { type: String, reflect: true },
    helpIcon: { type: String, attribute: 'help-icon', reflect: true },
    layout: { type: String, reflect: true },
    theme: { type: String, reflect: true },
    brandLink: { type: String, attribute: 'brand-link', reflect: true },
    authState: { type: String, attribute: 'auth-state', reflect: true },
    loginAction: { type: Object, attribute: false },
    signUpAction: { type: Object, attribute: false },
    accountMenu: { type: Array, attribute: false },
    logoutLabel: { type: String, attribute: 'logout-label', reflect: true },
    accountLabel: { type: String, attribute: 'account-label', reflect: true },
    accountAvatar: { type: String, attribute: 'account-avatar', reflect: true },
    helpMenuList: { type: Array },
    accountMenuOpen: { state: true },
    helpMenuOpen: { state: true },
    hasSlottedAccountMenu: { state: true },
    hasSlottedHelpMenu: { state: true }
  }

  static styles = css`
  :host {
    display: block;
    --header-bg: var(--color-header-row-bg, #332746);
    --header-text: var(--solid-header-text, #ffffff);
    --header-border: var(--solid-header-border, #efecf3);
    --header-line-color: var(--solid-header-line-color, #5e546d);
    --header-link: var(--solid-header-link, #332746);
    --header-link-hover: var(--solid-header-link-hover, #e6dcff);
    --header-link-selected: var(--solid-header-link-selected-dark, #cbb9ff);
    --header-menu-bg: var(--solid-header-menu-bg, #f6f5f9);
    --header-menu-loggedin-bg: var(--solid-header-menu-loggedin-bg, #5e546d);
    --header-menu-text: var(--solid-header-menu-text, #878192);
    --header-border-radius: var(--solid-header-border-radius, 0.3em);
    --header-button-bg: var(--solid-header-button-bg, #ffffff);
    --header-button-text: var(--solid-header-button-text, #0f172a);
    --header-button-detail-text: var(--solid-header-button-detail-text, #878192);
    --header-icon-filter: var(--solid-header-icon-filter, invert(1) brightness(1.3));
    --header-shadow: var(--solid-header-shadow, 2px 6px 10px 0 rgba(0, 0, 0, 0.4), 2px 8px 24px 0 rgba(0, 0, 0, 0.19));
    font-family: var(--solid-header-font, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif);
  }

  :host([theme='dark']) {
    --header-bg: var(--color-header-row-bg-dark, #332746);
    --header-text: var(--solid-header-text-dark, #ffffff);
    --header-border: var(--solid-header-border-dark, #efecf3);
    --header-line-color: var(--solid-header-line-color-dark, #5e546d);
    --header-link: var(--solid-header-link-dark, #332746);
    --header-link-hover: var(--solid-header-link-hover-dark, #e6dcff);
    --header-link-selected: var(--solid-header-link-selected-dark, #cbb9ff);
    --header-menu-bg: var(--solid-header-menu-bg-dark, #f6f5f9);
    --header-menu-loggedin-bg: var(--solid-header-menu-loggedin-bg-dark, #5e546d);
    --header-menu-text: var(--solid-header-menu-text-dark, #878192);
    --header-border-radius: var(--solid-header-border-radius-dark, 0.3em);
    --header-button-bg: var(--solid-header-button-bg-dark, #ffffff);
    --header-button-text: var(--solid-header-button-text-dark, #0f172a);
    --header-button-detail-text: var(--solid-header-button-detail-text-dark, #878192);
    --header-icon-filter: var(--solid-header-icon-filter, invert(1) brightness(1.3));
    --header-shadow: var(--solid-header-shadow-dark, 2px 6px 10px 0 rgba(0, 0, 0, 0.4), 2px 8px 24px 0 rgba(0, 0, 0, 0.19));
    font-family: var(--solid-header-font, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif);
  }

  :host([layout='mobile']) .headerInner {
    flex-wrap: wrap;
    text-align: center;
    gap: 0.5rem;
  }

  .headerInner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--header-bg);
    color: var(--header-text);
    padding: 0 1.5em;
    height: 3.75rem;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: inherit;
  }

  .brand-not-displayed {
    display: none;
  }

  .brand img {
    height: 50px;
    width: 55px;
    object-fit: contain;
  }

  .menu {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    margin-left: auto;
  }

  .auth-actions {
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }

  .auth-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 2.25rem;
    padding: 0.5rem 0.875rem;
    border: 1px solid var(--header-border);
    border-radius: 999px;
    background: var(--header-menu-bg);
    color: var(--header-button-text);
    cursor: pointer;
    font: inherit;
    line-height: 1;
    text-decoration: none;
    box-sizing: border-box;
    transition: border-color 0.2s ease, transform 0.2s ease;
  }

  .auth-button:hover {
    border-color: var(--header-link-hover);
  }

  .auth-button:active {
    transform: translateY(1px);
  }

  .auth-button-sign-up {
    background: color-mix(in srgb, var(--header-menu-bg) 78%, var(--header-link-selected) 22%);
  }

  .header-menu-separator {
    background: var(--header-line-color);
    width: 1px;
    height: 2.3rem;
  }

  .account-menu-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .account-menu-trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
    min-height: 2.5rem;
    border: 1px solid var(--header-menu-loggedin-bg);
    border-radius: 999px;
    background: var(--header-menu-loggedin-bg);
    color: var(--header-button-text);
    cursor: pointer;
    font: inherit;
    line-height: 1;
  }

  :host([layout='mobile']) .account-menu-trigger {
    gap: 0;
    min-height: auto;
    padding: 0;
    border: 1.5px solid var(--header-border);
    background: var(--header-menu-loggedin-bg);
  }

  :host([layout='mobile']) .account-menu-trigger-label {
    display: none;
  }

  .account-menu-trigger:disabled {
    cursor: default;
    opacity: 0.7;
  }

  .account-menu-trigger-label {
    white-space: nowrap;
  }

  .account-avatar,
  .account-menu-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
    background: color-mix(in srgb, var(--header-bg) 18%, #ded8e7 82%);
    color: var(--header-button-text);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .account-avatar {
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 999px;
    border: 1.5px solid var(--header-border);
  }

  .account-avatar-text {
    width: auto;
    min-width: auto;
    height: auto;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    white-space: nowrap;
    border: 1px solid var(--header-border);
  }

  .account-menu-avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
  }

  .account-menu-avatar.account-avatar-text {
    width: 2rem;
    height: 2rem;
    padding: 0.25rem;
    border-radius: 0.5rem;
    white-space: normal;
    line-height: 1;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .account-avatar img,
  .account-menu-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .account-avatar-img {
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 999px;
    object-fit: cover;
  }

  .account-dropdown {
    position: absolute;
    top: calc(100% + 0.9rem);
    right: 0;
    min-width: 15rem;
    padding: 0.5rem;
    background: var(--header-button-bg);
    border: 1px solid var(--header-border);
    border-radius: var(--header-border-radius);
    box-shadow: var(--header-shadow);
    z-index: 10;
  }

  .account-dropdown[hidden] {
    display: none;
  }

  .account-menu-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .account-menu-item-link,
  .account-menu-item-button,
  ::slotted([slot='account-menu']) {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    width: 100%;
    box-sizing: border-box;
    color: var(--header-link);
    text-decoration: none;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 10px;
    padding: 0.5rem;
    cursor: pointer;
    font: inherit;
    text-align: left;
  }

  .account-menu-item-link:hover,
  .account-menu-item-button:hover {
    color: var(--header-link);
    background: var(--header-link-hover);
    border-color: var(--header-link-hover);
  }

  .account-menu-item-link:active,
  .account-menu-item-button:active {
    color: var(--header-link);
    background: var(--header-link-selected);
    border-color: var(--header-link-selected);
    transform: translateY(1px);
  }

  .account-switch {
    display: block;
    width: 100%;
    color: var(--header-menu-text);
    text-align: left;
    text-transform: uppercase;
    font-size: 80%;
  }

  .dropdown-menu-separator {
    display: block;
    width: calc(100% + 1rem);
    margin: 0.5rem -0.5rem;
    border: 0;
    border-top: 1px solid var(--header-border);
  }

  .account-menu-copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .account-menu-label {
    color: var(--header-button-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .account-menu-webid {
    color: var(--header-button-detail-text);
    font-size: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .help-menu-container {
    position: relative;
    display: flex;
    align-items: center;
    background: transparent;
  }

  .help-menu-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  .help-menu-trigger:disabled {
    cursor: default;
  }

  .help-dropdown {
    position: absolute;
    top: calc(100% + 0.9rem);
    right: 0;
    min-width: 12rem;
    padding: 0.5rem;
    background: var(--header-button-bg);
    border: 1px solid var(--header-border);
    border-radius: var(--header-border-radius);
    box-shadow: var(--header-shadow);
    z-index: 10;
  }

  .help-dropdown[hidden] {
    display: none;
  }

  .help-dropdown-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .help-menu-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .help-menu-list a,
  .help-menu-list button,
  ::slotted([slot='help-menu']) {
    display: block;
    width: 100%;
    box-sizing: border-box;
    color: var(--header-link);
    text-decoration: none;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 0.375rem 0.5rem;
    cursor: pointer;
    font: inherit;
    text-align: left;
  }

  .help-menu-list a:hover,
  .help-menu-list button:hover {
    color: var(--header-link);
    background: var(--header-link-hover);
    border-color: var(--header-link-hover);
  }

  .help-menu-list a:active,
  .help-menu-list button:active {
    color: var(--header-link);
    background: var(--header-link-selected);
    border-color: var(--header-link-selected);
    transform: translateY(1px);
  }

  ::slotted(a), ::slotted(button) {
    color: var(--header-link);
    text-decoration: none;
    background: var(--header-button-bg);
    border: 1px solid var(--header-border);
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    font: inherit;
  }

  .help-icon {
    width: 24px;
    height: 24px;
    filter: var(--header-icon-filter);
    cursor: pointer;
  }
  `

  declare logo: string
  declare helpIcon: string
  declare layout: 'desktop' | 'mobile'
  declare theme: 'light' | 'dark'
  declare brandLink: string
  declare authState: HeaderAuthState
  declare loginAction: HeaderMenuItem
  declare signUpAction: HeaderMenuItem
  declare accountMenu: HeaderAccountMenuItem[]
  declare logoutLabel: string | null
  declare accountLabel: string
  declare accountAvatar: string
  declare helpMenuList: HeaderMenuItem[]
  declare accountMenuOpen: boolean
  declare helpMenuOpen: boolean
  declare hasSlottedAccountMenu: boolean
  declare hasSlottedHelpMenu: boolean

  constructor () {
    super()
    this.logo = DEFAULT_SOLID_ICON_URL
    this.helpIcon = DEFAULT_HELP_MENU_ICON
    this.layout = 'desktop'
    this.theme = 'light'
    this.brandLink = '#'
    this.authState = 'logged-out'
    this.loginAction = { label: 'Log In', action: 'login' }
    this.signUpAction = { label: 'Sign Up', action: 'sign-up', url: DEFAULT_SIGNUP_URL }
    this.accountMenu = []
    this.logoutLabel = 'Log Out'
    this.accountLabel = 'Accounts'
    this.accountAvatar = ''
    this.helpMenuList = []
    this.accountMenuOpen = false
    this.helpMenuOpen = false
    this.hasSlottedAccountMenu = false
    this.hasSlottedHelpMenu = false
  }

  connectedCallback () {
    super.connectedCallback()
    document.addEventListener('click', this.handleDocumentClick)
    window.addEventListener('keydown', this.handleWindowKeydown)
  }

  disconnectedCallback () {
    document.removeEventListener('click', this.handleDocumentClick)
    window.removeEventListener('keydown', this.handleWindowKeydown)
    super.disconnectedCallback()
  }

  private handleHelpMenuClick (item: HeaderMenuItem, event: MouseEvent) {
    event.preventDefault()
    this.helpMenuOpen = false
    this.dispatchEvent(new CustomEvent('help-menu-select', {
      detail: item,
      bubbles: true,
      composed: true
    }))
    if (item.url) {
      window.open(item.url, item.target || '_blank')
    }
  }

  private handleAccountMenuClick (item: HeaderAccountMenuItem) {
    this.accountMenuOpen = false
    this.dispatchEvent(new CustomEvent('account-menu-select', {
      detail: item,
      bubbles: true,
      composed: true
    }))
  }

  private readonly handleDocumentClick = (event: MouseEvent) => {
    if (!event.composedPath().includes(this)) {
      this.accountMenuOpen = false
      this.helpMenuOpen = false
    }
  }

  private readonly handleWindowKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && (this.accountMenuOpen || this.helpMenuOpen)) {
      this.accountMenuOpen = false
      this.helpMenuOpen = false
    }
  }

  private handleAccountSlotChange (event: Event) {
    const slot = event.target as HTMLSlotElement
    this.hasSlottedAccountMenu = slot.assignedElements({ flatten: true }).length > 0
  }

  private handleHelpSlotChange (event: Event) {
    const slot = event.target as HTMLSlotElement
    this.hasSlottedHelpMenu = slot.assignedElements({ flatten: true }).length > 0
  }

  private toggleAccountMenu (event: MouseEvent) {
    event.preventDefault()
    if (!this.hasAccountMenuItems()) return
    this.helpMenuOpen = false
    this.accountMenuOpen = !this.accountMenuOpen
  }

  private toggleHelpMenu (event: MouseEvent) {
    event.preventDefault()
    if (!this.hasHelpMenuItems()) return
    this.accountMenuOpen = false
    this.helpMenuOpen = !this.helpMenuOpen
  }

  private hasAccountMenuItems () {
    return Boolean(this.accountMenu?.length || this.hasSlottedAccountMenu || this.logoutLabel)
  }

  private hasHelpMenuItems () {
    return Boolean(this.helpMenuList?.length || this.hasSlottedHelpMenu)
  }

  private shouldRenderHelpMenu () {
    return this.layout !== 'mobile' && this.hasHelpMenuItems()
  }

  private renderLoggedInAvatar (avatar?: string) {
    if (this.layout === 'mobile') {
      return avatar ? html`<img class="account-avatar-img" src="${avatar}" alt="" />` : html``
    }

    return html`
       <span class="account-avatar ${avatar ? '' : 'account-avatar-text'}" aria-hidden="true">
        ${avatar
          ? html`<img src="${avatar}" alt="" />`
          : DEFAULT_LOGGEDIN_MENU_BUTTON_AVATAR_LABEL}
      </span>
    `
  }

  private renderAccountsMenuAvatar (avatar?: string) {
    return html`
      <span class="account-menu-avatar ${avatar ? '' : 'account-avatar-text'}" aria-hidden="true">
        ${avatar
          ? html`<img src="${avatar}" alt="" />`
          : DEFAULT_LOGGEDIN_MENU_BUTTON_AVATAR_LABEL}
      </span>
    `
  }

  private renderLoggedOutActions () {
    return html`
      <div class="auth-actions" part="auth-actions">
        <slot name="login-action">
          <solid-ui-login-button
            label="${this.loginAction.label}"
            theme="${this.theme}"
            part="login-action"
            @login-success="${() => this.handleLoginSuccess()}"
          ></solid-ui-login-button>
        </slot>
        <slot name="sign-up-action">
          <solid-ui-signup-button
            label="${this.signUpAction.label}"
            signup-url="${ifDefined(this.signUpAction.url)}"
            theme="${this.theme}"
            part="sign-up-action"
          ></solid-ui-signup-button>
        </slot>
      </div>
    `
  }

  private handleLoginSuccess () {
    this.authState = 'logged-in'
    this.dispatchEvent(new CustomEvent('auth-action-select', {
      detail: { role: 'login' },
      bubbles: true,
      composed: true
    }))
  }

  private async handleLogout () {
    this.accountMenuOpen = false
    try {
      await authSession.logout()
    } catch (_err) {
      // logout errors are non-fatal — proceed to clear state
    }
    this.authState = 'logged-out'
    this.dispatchEvent(new CustomEvent('logout-select', {
      bubbles: true,
      composed: true
    }))
  }

  private renderAccountMenuItem (item: HeaderAccountMenuItem) {
    const content = html`
      ${this.renderAccountsMenuAvatar(item.avatar)}
      <span class="account-menu-copy">
        <span class="account-menu-label">${item.label}</span>
        ${item.webid ? html`<span class="account-menu-webid">${item.webid}</span>` : ''}
      </span>
    `

    if (item.url) {
      return html`
        <a
          class="account-menu-item-link"
          href="${item.url}"
          @click="${() => this.handleAccountMenuClick(item)}"
          part="account-menu-item"
          role="menuitem"
        >
          ${content}
        </a>
      `
    }

    return html`
      <button
        class="account-menu-item-button"
        type="button"
        @click="${() => this.handleAccountMenuClick(item)}"
        part="account-menu-item"
        role="menuitem"
      >
        ${content}
      </button>
    `
  }

  private renderLoggedInActions () {
    return html`
      <div class="account-menu-container" part="account-menu-container">
        <slot name="account-trigger">
          <button
            id="accountMenuTrigger"
            class="account-menu-trigger"
            type="button"
            aria-haspopup="menu"
            aria-expanded="${this.accountMenuOpen ? 'true' : 'false'}"
            ?disabled="${!this.hasAccountMenuItems()}"
            @click="${(e: MouseEvent) => this.toggleAccountMenu(e)}"
            part="account-menu-trigger"
          >
            ${this.renderLoggedInAvatar(this.accountAvatar)}
            ${this.layout !== 'mobile' ? html`<span class="account-menu-trigger-label">${this.accountLabel}</span>` : ''}
          </button>
        </slot>

        <nav
          id="accountMenu"
          class="account-dropdown"
          role="menu"
          aria-hidden="${this.accountMenuOpen ? 'false' : 'true'}"
          ?hidden="${!this.accountMenuOpen || !this.hasAccountMenuItems()}"
          part="account-dropdown"
        >
          <slot name="account-switch" class="account-switch">Switch account</slot>
          <hr class="dropdown-menu-separator" />
          <slot name="account-menu" @slotchange="${(e: Event) => this.handleAccountSlotChange(e)}"></slot>
          ${this.accountMenu && this.accountMenu.length
          ? html`
            <ul class="account-menu-list">
              ${this.accountMenu.map((item: HeaderAccountMenuItem) => html`
                <li>${this.renderAccountMenuItem(item)}</li>
              `)}
            </ul>
          `
          : ''}
          ${this.logoutLabel
          ? html`
            <hr class="dropdown-menu-separator" />
            <button
              class="account-menu-item-button"
              type="button"
              @click="${() => this.handleLogout()}"
              part="logout-action"
              role="menuitem"
            >
              ${this.logoutLabel}
            </button>
          `
          : ''}
        </nav>
      </div>
    `
  }

  private renderUserArea () {
    if (this.authState === 'logged-out') {
      return this.renderLoggedOutActions()
    }

    return this.renderLoggedInActions()
  }

  protected firstUpdated () {
    const brandLink = this.shadowRoot?.getElementById('brandLink')
    if (brandLink) {
      brandLink.classList.toggle('brand-not-displayed', this.layout === 'mobile')
    }
  }

  protected updated (changedProperties: Map<string, unknown>) {
    if (changedProperties.has('layout')) {
      const brandLink = this.shadowRoot?.getElementById('brandLink')
      if (brandLink) {
        brandLink.classList.toggle('brand-not-displayed', this.layout === 'mobile')
      }
    }
  }

  render () {
    return html`
      <div class="headerInner">
        <a
          id="brandLink"
          class="brand"
          href="${this.brandLink}"
          part="brand"
        >
          <img id="brandImg" src="${this.logo}" alt="Logo" part="logo" />
        </a>

        <div class="menu" part="menu">
          ${this.renderUserArea()}

          ${this.shouldRenderHelpMenu()
          ? html`
            <div class="header-menu-separator" />`
          : ''}

          ${this.shouldRenderHelpMenu()
          ? html`
            <div class="help-menu-container" part="help-menu-container">
              <button
                id="helpMenuTrigger"
                class="help-menu-trigger"
                type="button"
                aria-haspopup="menu"
                aria-expanded="${this.helpMenuOpen ? 'true' : 'false'}"
                ?disabled="${!this.hasHelpMenuItems()}"
                @click="${(e: MouseEvent) => this.toggleHelpMenu(e)}"
                part="help-menu-trigger"
              >
                <img id="helpIcon" class="help-icon" src="${this.helpIcon}" alt="Help" part="help-icon" />
              </button>

            <nav
              id="helpMenu"
              class="help-dropdown"
              role="menu"
              aria-hidden="${this.helpMenuOpen ? 'false' : 'true'}"
              ?hidden="${!this.helpMenuOpen || !this.hasHelpMenuItems()}"
              part="help-dropdown"
            >
              <div class="help-dropdown-content" @click="${() => { this.helpMenuOpen = false }}">
                <slot name="help-menu" @slotchange="${(e: Event) => this.handleHelpSlotChange(e)}"></slot>
                ${this.helpMenuList && this.helpMenuList.length
                ? html`
                  <ul class="help-menu-list">
                    ${this.helpMenuList.map((item: HeaderMenuItem) => html`
                      <li>
                        ${item.url
                        ? html`
                          <a
                            href="${item.url}"
                            target="${item.target || '_blank'}"
                            @click="${(e: MouseEvent) => this.handleHelpMenuClick(item, e)}"
                            part="help-menu-item"
                            role="menuitem"
                          >
                            ${item.label}
                          </a>
                        `
                        : html`
                          <button
                            type="button"
                            @click="${(e: MouseEvent) => this.handleHelpMenuClick(item, e)}"
                            part="help-menu-item"
                            role="menuitem"
                          >
                            ${item.label}
                          </button>
                        `}
                      </li>
                    `)}
                  </ul>
                `
                : ''}
              </div>
            </nav>
          </div>`
          : ''}
        </div>
      </div>
    `
  }
}
