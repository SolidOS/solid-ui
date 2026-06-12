import { LitElement, html, css } from 'lit'
import type { LiveStore, NamedNode } from 'rdflib'
import { authSession, authn } from 'solid-logic'
import { getName } from '../../../../utils/headerFooterHelpers'

export class Footer extends LitElement {
  static properties = {
    theme: { type: String, reflect: true },
    layout: { type: String, reflect: true },
    position: { type: String, reflect: true },
    top: { type: String, reflect: true },
    right: { type: String, reflect: true },
    bottom: { type: String, reflect: true },
    left: { type: String, reflect: true },
    store: { type: Object, attribute: false },
    _user: { state: true }
  }

  static styles = css`
    :host {
      display: block;
      position: var(--footer-position, static);
      top: var(--footer-top, auto);
      right: var(--footer-right, auto);
      bottom: var(--footer-bottom, auto);
      left: var(--footer-left, auto);
      width: auto;
      max-width: var(--footer-max-width, none);
      margin: var(--footer-margin, 0);
      box-sizing: border-box;
      color: var(--footer-text, #4f4f4f);
      background: transparent;
      border: 1px solid var(--footer-border, rgba(0, 0, 0, 0.12));
      border-radius: var(--footer-border-radius, 1rem);
      box-shadow: var(--footer-box-shadow, 0 1px 6px rgba(0, 0, 0, 0.08));
      font-family: var(--font-family-base, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif);
    }

    .footer {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 0.25rem;
      font-size: 0.75rem;
      line-height: 1.5;
      text-align: left;
    }

    .footer a {
      color: var(--footer-link, #4b32a8);
      text-decoration: none;
      font-weight: 600;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    .footer span {
      color: inherit;
    }

    .footer div > strong {
      display: block;
      margin-bottom: 0.5rem;
    }

    :host([layout='mobile']) {
      border: none;
      box-shadow: none;
      border-radius: 0;
    }
  `

  declare theme: 'light' | 'dark'
  declare layout: 'desktop' | 'mobile'
  declare position: 'static' | 'absolute' | 'relative' | 'fixed' | 'sticky'
  declare top: string
  declare right: string
  declare bottom: string
  declare left: string
  declare store: LiveStore | null
  declare _user: NamedNode | null

  constructor () {
    super()
    this.theme = 'light'
    this.layout = 'desktop'
    this.position = 'static'
    this.top = 'auto'
    this.right = 'auto'
    this.bottom = 'auto'
    this.left = 'auto'
    this.store = null
    this._user = null
    this._updateFooter = this._updateFooter.bind(this)
  }

  connectedCallback () {
    super.connectedCallback()
    authSession.events.on('login', this._updateFooter)
    authSession.events.on('logout', this._updateFooter)
    this._updateFooter()
  }

  disconnectedCallback () {
    if (typeof authSession.events.off === 'function') {
      authSession.events.off('login', this._updateFooter)
      authSession.events.off('logout', this._updateFooter)
    }
    super.disconnectedCallback()
  }

  updated (changedProperties: Map<string, unknown>) {
    if (
      changedProperties.has('position') ||
      changedProperties.has('top') ||
      changedProperties.has('right') ||
      changedProperties.has('bottom') ||
      changedProperties.has('left')
    ) {
      this._updatePositionStyles()
    }
  }

  private _updatePositionStyles () {
    this.style.setProperty('--footer-position', this.position)
    this.style.setProperty('--footer-top', this.top)
    this.style.setProperty('--footer-right', this.right)
    this.style.setProperty('--footer-bottom', this.bottom)
    this.style.setProperty('--footer-left', this.left)
  }

  private _updateFooter () {
    this._user = authn.currentUser()
  }

  render () {
    return html`
      <footer class="footer">
        ${this._renderFooterContent()}
      </footer>
    `
  }

  private _renderFooterContent () {
    if (!this._user) {
      return html`
        <div>
          <strong>Public View</strong>
          <div>You are viewing this profile as a guest.</div>
        </div>
      `
    }

    const userName = this.store ? getName(this.store, this._user) : this._user.uri

    return html`
      <div>
        <strong>Logged in View</strong>
        <div>
          You are logged in as
          <a href=${this._user.uri} target="_blank" rel="noopener noreferrer">${userName}</a>.
        </div>
      </div>
    `
  }
}
