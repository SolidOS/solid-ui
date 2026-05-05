import { LitElement, css, html } from 'lit'
import { authSession, authn, solidLogicSingleton } from 'solid-logic'
import { NamedNode, type LiveStore } from 'rdflib'
import type { Combobox } from '../combobox/Combobox'
import type { ComboboxSuggestion } from '../combobox/comboboxTypes'
import '../combobox/index'
import {
  DEFAULT_CATALOG_URL,
  discoverPeopleSearchEntries,
  matchesPeopleSearchNameWords,
  mergePeopleSearchPerson,
  sortPeopleSearchPeople,
  type PeopleSearchPerson
} from './peopleSearchHelpers'

export interface PeopleSearchSelectDetail {
  person: PeopleSearchPerson
}

export interface PeopleSearchSuggestion extends ComboboxSuggestion {
  description?: string
  meta?: {
    person: PeopleSearchPerson
  }
}

export class PeopleSearch extends LitElement {
  static properties = {
    label: { type: String, reflect: true },
    placeholder: { type: String, reflect: true },
    theme: { type: String, reflect: true },
    layout: { type: String, reflect: true },
    catalogUrl: { type: String, attribute: 'catalog-url', reflect: true },
    openProfilesOnSelect: {
      type: Boolean,
      attribute: 'open-profiles-on-select',
      reflect: true
    },
    store: { type: Object, attribute: false },
    _user: { state: true },
    _statusMessage: { state: true },
    _warmingUp: { state: true }
  }

  static styles = css`
    :host {
      display: inline-flex;
      flex-direction: column;
      gap: 0.375rem;
      width: min(100%, var(--people-search-width, 22rem));
      --people-search-status-color: var(--color-text-subtle, #667085);
      --people-search-status-font-size: 0.85rem;
      box-sizing: border-box;
    }

    :host([theme='dark']) {
      --people-search-status-color: var(--color-text-subtle, #c7ced8);
    }

    solid-ui-combobox {
      width: 100%;
      --input-background: var(--people-search-input-background, var(--color-background, #F8F9FB));
      --input-border: var(--people-search-input-border, var(--color-text, #1A1A1A));
      --input-text: var(--people-search-input-text, var(--color-text, #1A1A1A));
      --popup-background: var(--people-search-popup-background, var(--color-background, #F8F9FB));
      --popup-border: var(--people-search-popup-border, var(--color-border, #E5E7EB));
      --popup-shadow: var(--people-search-popup-shadow, var(--box-shadow-sm, 0 1px 4px rgba(124,77,255,0.12)));
      --item-description-text: var(--people-search-description-text, var(--color-text-subtle, #667085));
    }

    .status {
      min-height: 1.25rem;
      color: var(--people-search-status-color);
      font-size: var(--people-search-status-font-size);
      line-height: 1.4;
    }

    .status[hidden] {
      display: none;
    }
  `

  declare label: string
  declare placeholder: string
  declare theme: 'light' | 'dark'
  declare layout: 'desktop' | 'mobile'
  declare catalogUrl: string
  declare openProfilesOnSelect: boolean
  declare store: LiveStore | null
  declare _user: NamedNode | null
  declare _statusMessage: string
  declare _warmingUp: boolean

  private readonly _handleAuthChange = () => {
    this._user = authn.currentUser()
    this._resetDiscoveryState()
    if (this._user) {
      this._ensureDiscovery()
    }
  }

  private readonly _provideSuggestions = async (query: string): Promise<PeopleSearchSuggestion[]> => {
    this._query = query

    if (!this._user) {
      this._updateStatus(query, 0)
      return []
    }

    if (!this._discoveryPromise) {
      this._ensureDiscovery()
    }

    const suggestions = this._buildSuggestions(query)
    this._updateStatus(query, suggestions.length)
    return suggestions
  }

  private _discoveryPromise: Promise<void> | null = null
  private _query = ''
  private readonly _discoveredPeople = new Map<string, PeopleSearchPerson>()

  constructor () {
    super()
    this.label = 'Search for people'
    this.placeholder = 'Search for people...'
    this.theme = 'light'
    this.layout = 'desktop'
    this.catalogUrl = DEFAULT_CATALOG_URL
    this.openProfilesOnSelect = true
    this.store = null
    this._user = null
    this._statusMessage = 'Sign in to search contacts.'
    this._warmingUp = false
  }

  connectedCallback () {
    super.connectedCallback()
    authSession.events.on('login', this._handleAuthChange)
    authSession.events.on('logout', this._handleAuthChange)
    this._handleAuthChange()
  }

  disconnectedCallback () {
    if (typeof authSession.events.off === 'function') {
      authSession.events.off('login', this._handleAuthChange)
      authSession.events.off('logout', this._handleAuthChange)
    } else if (typeof authSession.events.removeListener === 'function') {
      authSession.events.removeListener('login', this._handleAuthChange)
      authSession.events.removeListener('logout', this._handleAuthChange)
    }
    super.disconnectedCallback()
  }

  protected updated (changedProperties: Map<string, unknown>) {
    const combobox = this._getCombobox()
    if (combobox && combobox.suggestionProvider !== this._provideSuggestions) {
      combobox.suggestionProvider = this._provideSuggestions
    }

    if (changedProperties.has('store') && !changedProperties.has('_user')) {
      this._resetDiscoveryState()
      if (this._user) {
        this._ensureDiscovery()
      }
    }
  }

  private _getStore (): LiveStore | null {
    return this.store || (solidLogicSingleton.store as LiveStore | null) || null
  }

  private _getCombobox () {
    return this.shadowRoot?.querySelector('solid-ui-combobox') as Combobox | null
  }

  private _resetDiscoveryState () {
    this._discoveredPeople.clear()
    this._discoveryPromise = null
    this._query = ''
    this._warmingUp = false
    this._updateStatus('', 0)
    this._refreshComboboxOptions('')
  }

  private _refreshComboboxOptions (query: string) {
    const combobox = this._getCombobox()
    if (!combobox) {
      return
    }

    combobox.options = this._buildSuggestions(query)
  }

  private _updateStatus (query: string, visibleCount: number) {
    if (!this._user) {
      this._statusMessage = 'Sign in to search contacts.'
      return
    }

    if (this._warmingUp) {
      this._statusMessage = 'Searching...'
      return
    }

    if (this._discoveredPeople.size === 0) {
      this._statusMessage = 'No contacts found.'
      return
    }

    if (query.trim() && visibleCount === 0) {
      this._statusMessage = 'No contacts match that name.'
      return
    }

    this._statusMessage = ''
  }

  private _buildSuggestions (query: string): PeopleSearchSuggestion[] {
    return sortPeopleSearchPeople(this._discoveredPeople.values())
      .filter((person) => matchesPeopleSearchNameWords(person.name, query))
      .map((person) => ({
        label: person.name,
        value: person.webId,
        publicId: person.webId,
        description: person.relationshipLabel,
        meta: { person }
      }))
  }

  private _mergePerson (person: PeopleSearchPerson) {
    return mergePeopleSearchPerson(this._discoveredPeople, person)
  }

  private async _ensureDiscovery () {
    if (this._discoveryPromise) {
      return this._discoveryPromise
    }

    const store = this._getStore()
    if (!this._user || !store) {
      this._updateStatus(this._query, 0)
      return Promise.resolve()
    }

    this._warmingUp = true
    this._updateStatus(this._query, 0)

    this._discoveryPromise = (async () => {
      const renderPerson = async (person: PeopleSearchPerson): Promise<void> => {
        this._mergePerson(person)
        this._refreshComboboxOptions(this._query)
        this._updateStatus(this._query, this._buildSuggestions(this._query).length)
      }

      await discoverPeopleSearchEntries({
        store,
        me: this._user as NamedNode,
        catalogUrl: this.catalogUrl,
        onPerson: renderPerson
      })
    })()
      .catch(() => {
        this._statusMessage = 'Unable to load contacts.'
      })
      .finally(() => {
        this._warmingUp = false
        this._refreshComboboxOptions(this._query)
        this._updateStatus(this._query, this._buildSuggestions(this._query).length)
      })

    return this._discoveryPromise
  }

  private _handleComboboxInput (event: Event) {
    const customEvent = event as CustomEvent<{ value?: string }>
    const inputTarget = event.target as HTMLInputElement | null
    this._query = customEvent.detail?.value ?? inputTarget?.value ?? ''
    this._updateStatus(this._query, this._buildSuggestions(this._query).length)
  }

  private _handleComboboxFocusIn () {
    if (!this._discoveryPromise && this._user) {
      this._ensureDiscovery()
    }
    this._refreshComboboxOptions(this._query)
    this._updateStatus(this._query, this._buildSuggestions(this._query).length)
  }

  private _handleComboboxChange (event: Event) {
    const detail = (event as CustomEvent<{ value: string, option?: PeopleSearchSuggestion }>).detail
    const selectedPerson = detail.option?.meta?.person || this._discoveredPeople.get(detail.value)

    if (!selectedPerson) {
      return
    }

    const personSelected = new CustomEvent<PeopleSearchSelectDetail>('person-select', {
      detail: { person: selectedPerson },
      bubbles: true,
      composed: true,
      cancelable: true
    })

    const shouldContinue = this.dispatchEvent(personSelected)
    if (!shouldContinue || !this.openProfilesOnSelect) {
      return
    }

    const newWindow = window.open(selectedPerson.webId, '_blank', 'noopener,noreferrer')
    if (newWindow) {
      newWindow.opener = null
    }
  }

  render () {
    return html`
      <solid-ui-combobox
        label="${this.label}"
        placeholder="${this.placeholder}"
        theme="${this.theme}"
        layout="${this.layout}"
        @input="${this._handleComboboxInput}"
        @change="${this._handleComboboxChange}"
        @focusin="${this._handleComboboxFocusIn}"
      ></solid-ui-combobox>

      <div class="status" ?hidden="${!this._statusMessage}" aria-live="polite" role="status">
        ${this._statusMessage}
      </div>
    `
  }
}
