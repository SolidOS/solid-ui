import { LitElement, html, css, nothing } from 'lit'
import { render as renderPortal } from 'lit/html.js'
import { downArrowIcon } from '../shared/downArrow'
import { listboxStyles } from '../shared/listboxStyles'
import { findOptionIndexByValue, getFirstEnabledIndex, getLastEnabledIndex, getListboxActionFromKey, getNextEnabledIndex } from '../shared/keyboard'
import { ComboboxSuggestion } from './comboboxTypes'
import { renderListbox } from '../shared/listboxTemplate'

export class Combobox extends LitElement {
  private static _nextId = 0
  private _popupPortalHost: HTMLDivElement | null = null
  private _popupPortalRoot: ShadowRoot | null = null
  private _popupPortalContainer: Element | null = null
  private readonly _handleDocumentPointerDown = (event: Event) => {
    const eventTarget = event.target

    if (!this._popupOpen || !(eventTarget instanceof Node)) {
      return
    }

    const eventPath =
      'composedPath' in event
        ? (event as Event & { composedPath: () => EventTarget[] }).composedPath()
        : []

    if (eventPath.includes(this)) {
      return
    }

    if (
      (this._popupPortalHost && eventPath.includes(this._popupPortalHost)) ||
      (this._popupPortalRoot && eventPath.includes(this._popupPortalRoot))
    ) {
      return
    }

    if (!this.contains(eventTarget)) {
      this._closePopup()
    }
  }

  private readonly _handleViewportChange = () => {
    if (!this._popupOpen) return
    this._updatePopupPosition()
  }

  suggestionProvider?: (query: string) => Promise<ComboboxSuggestion[]>

  static properties = {
    label: { type: String, reflect: true },
    placeholder: { type: String, reflect: true },
    theme: { type: String, reflect: true },
    layout: { type: String, reflect: true },
    value: { type: String, reflect: true },
    inputValue: { type: String },
    options: { type: Array, attribute: false },
    _popupOpen: { state: true },
    _activeIndex: { state: true }
  }

  static styles = [
    listboxStyles,
    css`
    :host {
      /* default theme */
      display: block;
      width: 100%;
      min-width: 0;
      max-width: 100%;
      position: relative;
      box-sizing: border-box;
      --popup-background: var(--color-background, #F8F9FB);
      --popup-text: var(--color-text, #1A1A1A);
      --popup-border: var(--color-border, #E5E7EB);
      --popup-shadow: var(--box-shadow-sm, 0 1px 4px rgba(124,77,255,0.12));
      --input-background: var(--color-background, #F8F9FB);
      --input-text: var(--color-text, #1A1A1A);
      --input-border: var(--color-text, #1A1A1A);
      --label-color: var(--grey-purple-700, #1A1A1A);
      --placeholder-color: var(--grey-purple-700, #5e546d);
      --combobox-input-height: var(--select-trigger-height, var(--min-touch-target, 44px));
      --combobox-input-inline-padding: var(--select-trigger-inline-padding, var(--spacing-2xs, 0.625rem));
      --combobox-input-block-padding: var(--spacing-xxs, 0.3125rem);
    }

    :host([theme='dark']) {
      display: block;
      width: 100%;
      min-width: 0;
      max-width: 100%;
      position: relative;
      box-sizing: border-box;
      --popup-background: var(--color-background, #F8F9FB);
      --popup-text: var(--color-text, #1A1A1A);
      --popup-border: var(--color-border, #E5E7EB);
      --popup-shadow: var(--box-shadow-sm, 0 1px 4px rgba(124,77,255,0.12));
      --input-background: var(--color-background, #F8F9FB);
      --input-text: var(--color-text, #1A1A1A);
      --input-border: var(--color-text, #1A1A1A);
      --label-color: var(--grey-purple-700, #1A1A1A);
      --placeholder-color: var(--grey-purple-700, #5e546d);
      --combobox-input-height: var(--select-trigger-height, var(--min-touch-target, 44px));
      --combobox-input-inline-padding: var(--select-trigger-inline-padding, var(--spacing-2xs, 0.625rem));
      --combobox-input-block-padding: var(--spacing-xxs, 0.3125rem);
    }

    .popup-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: var(--popup-background);
      color: var(--popup-text);
      box-shadow: var(--popup-shadow);
      border: 1px solid var(--popup-border);
      border-radius: var(--border-radius-md, 0.5rem);
      min-width: 100%;
      overflow: hidden;
      box-sizing: border-box;
      isolation: isolate;
    }

    .select-options-section {
      position: relative;
      background: var(--popup-background);
      border-radius: inherit;
      isolation: isolate;
    }

    .combobox-root {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .text-label {
      color: var(--label-color);
      margin-bottom: 6px;
    }

    .input-field-row {
      display: flex;
      flex-direction: row;
      position: relative;
      width: 100%;
      min-width: 0;
    }

    .text-input {
      display: block;
      flex: 1;
      width: 100%;
      min-width: 0;
      min-height: var(--combobox-input-height);
      height: var(--combobox-input-height);
      padding: var(--combobox-input-block-padding) calc(26px + (var(--combobox-input-inline-padding) * 2) + 6px) var(--combobox-input-block-padding) var(--combobox-input-inline-padding);
      border: 1px solid var(--input-border);
      border-radius: var(--border-radius-base, 0.3125rem);
      background: var(--input-background);
      color: var(--input-text);
      font: inherit;
      font-size: var(--font-size-sm, 0.875rem);
      font-weight: var(--font-weight-md, 500);
      line-height: normal;
      appearance: none;
      -webkit-appearance: none;
      box-sizing: border-box;
    }

    .text-input::placeholder {
      color: var(--placeholder-color);
    }

    .text-input:focus-visible {
      outline: 2px solid var(--color-focus-ring, var(--color-primary, #7C4DFF));
      outline-offset: 2px;
    }

    .dropdown-toggle {
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

    .dropdown-toggle:hover {
      background: var(--color-header-menu-item-hover, #e6dcff);
    }

    .input-field-row:focus-within .dropdown-toggle {
      background: var(--color-header-menu-item-hover, #e6dcff);
    }

    .dropdown-toggle:focus-visible {
      outline: 2px solid var(--color-focus-ring, var(--color-primary, #7C4DFF));
      outline-offset: 2px;
      background: var(--color-header-menu-item-hover, #e6dcff);
    }

    .dropdown-toggle svg {
      width: 14px;
      height: 14px;
      display: block;
    }
  }
  `
  ]

  declare label: string
  declare placeholder: string
  declare theme: 'light' | 'dark'
  declare options: Array<ComboboxSuggestion>
  declare layout: 'desktop' | 'mobile'
  declare value: string
  declare inputValue: string
  declare _popupOpen: boolean
  declare _activeIndex: number

  private readonly _inputId = `solid-ui-combobox-input-${Combobox._nextId++}`
  private readonly _listboxId = `solid-ui-combobox-listbox-${Combobox._nextId++}`
  private _suggestionRequestId = 0

  constructor () {
    super()
    this.label = 'Select an option'
    this.placeholder = 'Type to search'
    this.theme = 'light'
    this.layout = 'desktop'
    this.options = []
    this.value = ''
    this.inputValue = ''
    this._popupOpen = false
    this._activeIndex = -1
  }

  connectedCallback () {
    super.connectedCallback()
    document.addEventListener('pointerdown', this._handleDocumentPointerDown)
    window.addEventListener('resize', this._handleViewportChange)
    window.addEventListener('scroll', this._handleViewportChange, true)
  }

  disconnectedCallback () {
    this._detachPopupPortal()
    document.removeEventListener('pointerdown', this._handleDocumentPointerDown)
    window.removeEventListener('resize', this._handleViewportChange)
    window.removeEventListener('scroll', this._handleViewportChange, true)
    super.disconnectedCallback()
  }

  private _getPopupPortalContainer () {
    return this.closest('dialog[open]') || document.body
  }

  private _ensurePopupPortal () {
    const nextContainer = this._getPopupPortalContainer()

    if (
      this._popupPortalHost &&
      this._popupPortalRoot &&
      this._popupPortalContainer === nextContainer
    ) {
      return
    }

    this._detachPopupPortal()

    this._popupPortalHost = document.createElement('div')
    this._popupPortalHost.setAttribute('data-solid-ui-combobox-portal', '')
    this._popupPortalHost.style.position = 'fixed'
    this._popupPortalHost.style.inset = '0 auto auto 0'
    this._popupPortalHost.style.zIndex = '2147483647'
    this._popupPortalHost.style.pointerEvents = 'none'
    this._popupPortalHost.style.boxSizing = 'border-box'

    this._popupPortalRoot = this._popupPortalHost.attachShadow({ mode: 'open' })
    const styleSheets = (Array.isArray(Combobox.styles) ? Combobox.styles : [Combobox.styles])
      .map((style) => style?.styleSheet)
      .filter((styleSheet): styleSheet is CSSStyleSheet => Boolean(styleSheet))

    if (styleSheets.length > 0) {
      this._popupPortalRoot.adoptedStyleSheets = styleSheets
    }

    nextContainer.appendChild(this._popupPortalHost)
    this._popupPortalContainer = nextContainer
  }

  private _detachPopupPortal () {
    if (this._popupPortalRoot) {
      renderPortal(null, this._popupPortalRoot)
    }

    if (this._popupPortalHost?.parentNode) {
      this._popupPortalHost.parentNode.removeChild(this._popupPortalHost)
    }

    this._popupPortalHost = null
    this._popupPortalRoot = null
    this._popupPortalContainer = null
  }

  private _updatePopupPosition () {
    this._ensurePopupPortal()

    const rect = this.getBoundingClientRect()
    const maxHeight = Math.min(288, Math.max(120, window.innerHeight - rect.bottom - 12))

    if (this._popupPortalHost) {
      this._popupPortalHost.style.top = `${Math.round(rect.bottom + 2)}px`
      this._popupPortalHost.style.left = `${Math.round(rect.left)}px`
      this._popupPortalHost.style.width = `${Math.round(rect.width)}px`
      this._popupPortalHost.style.maxHeight = `${Math.round(maxHeight)}px`
      this._popupPortalHost.style.height = '0px'
    }
  }

  private _openPopup () {
    const popupOptions = this._getDisplayedOptions()

    this._popupOpen = true
    this._updatePopupPosition()
    this._activeIndex = findOptionIndexByValue(popupOptions, this.value)

    if (this._activeIndex < 0) {
      this._activeIndex = getFirstEnabledIndex(popupOptions)
    }
  }

  private _closePopup () {
    this._popupOpen = false
    if (this._popupPortalRoot) {
      renderPortal(null, this._popupPortalRoot)
    }
  }

  protected updated (changedProperties: Map<string, unknown>) {
    if (this._popupOpen) {
      this._updatePopupPosition()
      if (this._popupPortalRoot) {
        renderPortal(this._renderPopup(), this._popupPortalRoot)
      }
    } else if (this._popupPortalRoot) {
      renderPortal(null, this._popupPortalRoot)
    }

    if ((changedProperties.has('value') || changedProperties.has('options')) && this.value) {
      const selectedOption = this.options.find((option) => option.value === this.value)
      if (selectedOption && this.inputValue !== selectedOption.label) {
        this.inputValue = selectedOption.label
      }
    }
  }

  private _getSelectedIndex () {
    return findOptionIndexByValue(this.options, this.value)
  }

  private _getSelectedOption () {
    const selectedIndex = this._getSelectedIndex()

    if (selectedIndex >= 0) {
      return this.options[selectedIndex]
    }

    return this.options[0]
  }

  private _getDisplayedOptions () {
    const selectedOption = this._getSelectedOption()

    if (!selectedOption) {
      return this.options
    }

    return [
      selectedOption,
      ...this.options.filter((option) => option.value !== selectedOption.value)
    ]
  }

  private _getActiveOption () {
    const popupOptions = this._getDisplayedOptions()

    if (this._activeIndex < 0) {
      return undefined
    }

    return popupOptions[this._activeIndex]
  }

  private async _loadSuggestions (query: string) {
    if (!this.suggestionProvider) {
      this._openPopup()
      return
    }

    const requestId = ++this._suggestionRequestId
    const suggestions = await this.suggestionProvider(query)

    if (requestId !== this._suggestionRequestId) {
      return
    }

    this.options = suggestions
    this._openPopup()
  }

  private async _handleInputChange (e: Event) {
    const query = (e.target as HTMLInputElement).value

    this.inputValue = query
    this.value = ''
    this.dispatchEvent(new CustomEvent('input', {
      detail: { value: query },
      bubbles: true,
      composed: true
    }))
    await this._loadSuggestions(query)
  }

  private _handleInputKeydown (e: KeyboardEvent) {
    const popupOptions = this._getDisplayedOptions()
    const action = getListboxActionFromKey(e.key)

    if (action === 'none') {
      return
    }

    e.preventDefault()

    switch (action) {
      case 'close':
        this._closePopup()
        break
      case 'first':
        if (!this._popupOpen) {
          this._openPopup()
        }
        this._activeIndex = getFirstEnabledIndex(popupOptions)
        break
      case 'last':
        if (!this._popupOpen) {
          this._openPopup()
        }
        this._activeIndex = getLastEnabledIndex(popupOptions)
        break
      case 'next':
        if (!this._popupOpen) {
          this._openPopup()
          break
        }
        this._activeIndex = getNextEnabledIndex(this._activeIndex, popupOptions, 1)
        break
      case 'previous':
        if (!this._popupOpen) {
          this._openPopup()
          break
        }
        this._activeIndex = getNextEnabledIndex(this._activeIndex, popupOptions, -1)
        break
      case 'select':
        if (!this._popupOpen) {
          this._openPopup()
          break
        }
        this._selectActiveOption()
        break
      default:
        break
    }
  }

  private _getOptionId (option: ComboboxSuggestion, index: number) {
    return `${this._listboxId}-option-${index}-${option.value}`
  }

  private _selectValueFromDropdown (value: string) {
    const selectedOption = this.options.find(option => option.value === value)

    this.value = value
    this.inputValue = selectedOption?.label ?? value
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        value,
        label: this.inputValue,
        option: selectedOption
      },
      bubbles: true,
      composed: true
    }))
    this._closePopup()
  }

  private _selectActiveOption () {
    const activeOption = this._getActiveOption()

    if (activeOption && !activeOption.disabled) {
      this._selectValueFromDropdown(activeOption.value)
    }
  }

  private _renderPopup () {
    const popupOptions = this._getDisplayedOptions()
    const selectedOption = this._getSelectedOption()
    const activeOption = this._activeIndex >= 0 ? popupOptions[this._activeIndex] : undefined

    return html`
      <div class="popup-box" style="pointer-events: auto; max-height: inherit; overflow: auto;">
        <div class="select-options-section">
          ${renderListbox({
            selectedOption,
            activeOption,
            options: popupOptions,
            listboxId: this._listboxId,
            getOptionId: (option, index) => this._getOptionId(option, index),
            onOptionSelect: (option) =>
              this._selectValueFromDropdown(option.value)
          })}
        </div>
      </div>
    `
  }

  render () {
    const activeOption = this._getActiveOption()
    const activeDescendant = this._popupOpen && activeOption
      ? this._getOptionId(activeOption, this._activeIndex)
      : undefined
    const ariaLabel = this.label ? nothing : (this.getAttribute('aria-label') || this.placeholder || 'Combobox')

    return html`
      <div class="combobox-root">
        ${this.label
          ? html`<label class="text-label" for="${this._inputId}">${this.label}</label>`
          : null}
        <div class="input-field-row">
          <input
            id="${this._inputId}"
            class="text-input"
            part="input"
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-label="${ariaLabel}"
            aria-expanded="${this._popupOpen}"
            aria-controls="${this._listboxId}"
            aria-activedescendant="${activeDescendant ?? ''}"
            placeholder="${this.placeholder}"
            .value="${this.inputValue}"
            @focus="${() => this._openPopup()}"
            @input="${this._handleInputChange}"
            @keydown="${this._handleInputKeydown}"
          />
          <button
            class="dropdown-toggle"
            type="button"
            aria-label="Show options"
            aria-expanded="${this._popupOpen}"
            @click="${() => this._popupOpen ? this._closePopup() : this._openPopup()}"
          >
            ${downArrowIcon}
          </button>
        </div>
      </div>
    `
  }
}
