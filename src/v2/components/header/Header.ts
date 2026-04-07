import { LitElement, html, css } from 'lit'
import { icons } from '../../../iconBase'

const DEFAULT_HELP_MENU_ICON = icons.iconBase + 'noun_help.svg'
const DEFAULT_SOLID_ICON_URL = 'https://solidproject.org/assets/img/solid-emblem.svg'

export type HeaderMenuItem = {
  label: string
  url?: string
  target?: string
  action?: string
  pane?: string
}

export class Header extends LitElement {
  static properties = {
    logo: { type: String, reflect: true },
    helpIcon: { type: String, attribute: 'help-icon', reflect: true },
    layout: { type: String, reflect: true },
    theme: { type: String, reflect: true },
    brandLink: { type: String, attribute: 'brand-link', reflect: true },
    helpMenuList: { type: Array },
    userMenu: { type: Array },
    helpMenuOpen: { state: true },
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
    --header-border-radius: var(--solid-header-border-radius, 0.3em);
    --header-button-bg: var(--solid-header-button-bg, #ffffff);
    --header-button-text: var(--solid-header-button-text, #0f172a);
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
    --header-border-radius: var(--solid-header-border-radius-dark, 0.3em);
    --header-button-bg: var(--solid-header-button-bg-dark, #ffffff);
    --header-button-text: var(--solid-header-button-text-dark, #0f172a);
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
    height: 3.6em;
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

  .menu-separator {
    color: var(--header-line-color);
    width: 17%;
    transform: rotate(90deg);
  }

  .help-menu-container {
    position: relative;
    display: flex;
    align-items: center;
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
  slot[name='help-menu']::slotted(a),
  slot[name='help-menu']::slotted(button) {
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
  .help-menu-list button:hover,
  slot[name='help-menu']::slotted(a:hover),
  slot[name='help-menu']::slotted(button:hover) {
    color: var(--header-link);
    background: var(--header-link-hover);
    border-color: var(--header-link-hover);
  }

  .help-menu-list a:active,
  .help-menu-list button:active,
  slot[name='help-menu']::slotted(a:active),
  slot[name='help-menu']::slotted(button:active) {
    color: var(--header-link);
    background: var(--header-link-selected));
    border-color: var(--header-link-selected));
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

  ::slotted(a:hover), ::slotted(button:hover) {
    color: var(--header-link);
    border-color: var(--header-link-hover);
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
  declare helpMenuList: HeaderMenuItem[]
  declare userMenu: HeaderMenuItem[]
  declare helpMenuOpen: boolean
  declare hasSlottedHelpMenu: boolean

  constructor () {
    super()
    this.logo = DEFAULT_SOLID_ICON_URL
    this.helpIcon = DEFAULT_HELP_MENU_ICON
    this.layout = 'desktop'
    this.theme = 'light'
    this.brandLink = '#'
    this.helpMenuList = []
    this.userMenu = []
    this.helpMenuOpen = false
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

  private handleUserMenuClick (item: HeaderMenuItem, event: MouseEvent) {
    event.preventDefault()
    this.dispatchEvent(new CustomEvent('user-menu-select', {
      detail: item,
      bubbles: true,
      composed: true
    }))
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

  private readonly handleDocumentClick = (event: MouseEvent) => {
    if (!this.helpMenuOpen) return
    if (!event.composedPath().includes(this)) {
      this.helpMenuOpen = false
    }
  }

  private readonly handleWindowKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.helpMenuOpen) {
      this.helpMenuOpen = false
    }
  }

  private handleHelpSlotChange (event: Event) {
    const slot = event.target as HTMLSlotElement
    this.hasSlottedHelpMenu = slot.assignedElements({ flatten: true }).length > 0
  }

  private toggleHelpMenu (event: MouseEvent) {
    event.preventDefault()
    if (!this.hasHelpMenuItems()) return
    this.helpMenuOpen = !this.helpMenuOpen
  }

  private hasHelpMenuItems () {
    return Boolean(this.helpMenuList?.length || this.hasSlottedHelpMenu)
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
          <slot name="user-menu"></slot>
          ${this.userMenu && this.userMenu.length ? this.userMenu.map((item: HeaderMenuItem) => html`
            <button @click="${(e: MouseEvent) => this.handleUserMenuClick(item, e)}" part="user-menu-item">
              ${item.label}
            </button>
          `) : ''}

          <hr class="menu-separator" />

          <div class="help-menu-container" part="help-menu-container">
            <button
              id="helpMenuTrigger"
              class="help-menu-trigger"
              type="button"
              aria-haspopup="menu"
              aria-expanded="${String(this.helpMenuOpen)}"
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
              aria-hidden="${String(!this.helpMenuOpen)}"
              ?hidden="${!this.helpMenuOpen || !this.hasHelpMenuItems()}"
              part="help-dropdown"
            >
              <div class="help-dropdown-content" @click="${() => { this.helpMenuOpen = false }}">
                <slot name="help-menu" @slotchange="${(e: Event) => this.handleHelpSlotChange(e)}"></slot>
                ${this.helpMenuList && this.helpMenuList.length ? html`
                  <ul class="help-menu-list">
                    ${this.helpMenuList.map((item: HeaderMenuItem) => html`
                      <li>
                        ${item.url ? html`
                          <a
                            href="${item.url}"
                            target="${item.target || '_blank'}"
                            @click="${(e: MouseEvent) => this.handleHelpMenuClick(item, e)}"
                            part="help-menu-item"
                            role="menuitem"
                          >
                            ${item.label}
                          </a>
                        ` : html`
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
                ` : ''}
              </div>
            </nav>
          </div>
        </div>
      </div>
    `
  }
}

if (!customElements.get('solid-ui-header')) {
  customElements.define('solid-ui-header', Header)
}

