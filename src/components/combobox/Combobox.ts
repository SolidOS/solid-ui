import { customElement, WebComponent } from '@/lib/components'
import { html, nothing } from 'lit'
import { property, query, state } from 'lit/decorators.js'
import InputTrait from '@/lib/components/traits/InputTrait'
import type ComboboxOption from '@/components/combobox-option/ComboboxOption'

import '~icons/lucide/chevron-down'
import '@awesome.me/webawesome/dist/components/popup/popup.js'

import styles from './Combobox.styles.css'

type ComboboxOptionData = { value: string; label: string }

@customElement('solid-ui-combobox')
export default class Combobox extends WebComponent {
  static styles = styles
  static formAssociated = true

  @property({ type: String, reflect: true })
  accessor label = ''

  @property({ type: String, reflect: true })
  accessor name = ''

  @property({ type: String })
  accessor value = ''

  @property({ type: String, reflect: true })
  accessor placeholder = ''

  @property({ type: Boolean, reflect: true })
  accessor required = false

  @query('input')
  private accessor inputElement: HTMLInputElement | null = null

  @property({ type: Boolean, reflect: true })
  accessor readonly = false

  @state()
  private accessor filter = ''

  @state()
  private accessor open = false

  @state()
  private accessor activeIndex = -1

  private inputTrait: InputTrait
  private openListenersAttached = false
  private readonly listboxId: string

  constructor () {
    super()

    this.inputTrait = this.addTrait(
      new InputTrait(this, {
        getInputElement: () => this.inputElement,
        getInternals: () => this.getInternals(),
        onValueChanged: (value) => {
          this.filter = value.toLowerCase()

          const options = this.getFilteredOptions()

          if (options.length === 0) {
            this.hide()
            return
          }

          if (this.open) {
            this.activeIndex = this.getInitialActiveIndex(options)
          }
        },
      })
    )

    this.listboxId = `listbox-${this.inputTrait.inputId}`
  }

  disconnectedCallback () {
    super.disconnectedCallback()

    this.removeOpenListeners()
  }

  protected render () {
    const options = this.getFilteredOptions()
    const activeOption =
      this.open && this.activeIndex >= 0 ? options[this.activeIndex] : undefined
    const activeDescendant =
      activeOption !== undefined ? this.getOptionId(this.activeIndex) : undefined
    const accessibleName = this.placeholder || 'Combobox'

    return html`
      ${this.inputTrait.renderLabel()}
      <wa-popup
        placement="bottom"
        flip
        shift
        sync="width"
        auto-size="vertical"
        auto-size-padding="10"
        ?active=${this.open}
      >
        <div class="input-wrapper" slot="anchor" @mousedown=${this.onAnchorMouseDown}>
          <input
            id="${this.inputTrait.inputId}"
            type="text"
            name=${this.name}
            placeholder=${this.placeholder}
            role="combobox"
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-expanded=${this.open ? 'true' : 'false'}
            aria-controls=${this.listboxId}
            aria-activedescendant=${activeDescendant ?? nothing}
            aria-labelledby=${this.label ? this.inputTrait.labelId : nothing}
            aria-label=${this.label ? nothing : accessibleName}
            aria-required=${this.required ? 'true' : nothing}
            autocomplete="off"
            spellcheck="false"
            ?required=${this.required}
            ?readonly=${this.readonly}
            .value=${this.value}
            @keydown=${this.onInputKeyDown}
            @focus=${this.onInputFocus}
            @input=${() => this.inputTrait.onInput()}
          />
          <icon-lucide-chevron-down></icon-lucide-chevron-down>
        </div>
        <div
          id=${this.listboxId}
          class="listbox"
          role="listbox"
          aria-orientation="vertical"
          aria-labelledby=${this.label ? this.inputTrait.labelId : nothing}
          aria-label=${this.label ? nothing : accessibleName}
          ?hidden=${!this.open}
          @mouseup=${this.onListboxMouseUp}
        >
          ${options.map(
            (option, index) =>
              html`<div
                id=${this.getOptionId(index)}
                role="option"
                aria-selected=${this.open && index === this.activeIndex
                  ? 'true'
                  : 'false'}
                data-active=${index === this.activeIndex || nothing}
                @mousemove=${() => this.setActiveIndex(index)}
              >
                ${option.label}
              </div>`
          )}
        </div>
      </wa-popup>
    `
  }

  private getFilteredOptions (): ComboboxOptionData[] {
    return this.getOptions().filter((option) =>
      option.label.toLowerCase().includes(this.filter)
    )
  }

  private getOptions (): ComboboxOptionData[] {
    const options = this.querySelectorAll<ComboboxOption>(
      'solid-ui-combobox-option'
    )

    return Array.from(options).map((option) => ({
      value: option.value,
      label: option.textContent ?? '',
    }))
  }

  private getOptionId (index: number): string {
    return `${this.listboxId}-option-${index}`
  }

  private getInitialActiveIndex (options: ComboboxOptionData[]): number {
    const selectedIndex = options.findIndex((option) => option.value === this.value)

    if (selectedIndex >= 0) {
      return selectedIndex
    }

    return options.length > 0 ? 0 : -1
  }

  private getNextIndex (
    currentIndex: number,
    options: ComboboxOptionData[],
    direction: 1 | -1
  ): number {
    if (options.length === 0) {
      return -1
    }

    return (currentIndex + direction + options.length) % options.length
  }

  private setActiveIndex (index: number) {
    this.activeIndex = index
  }

  private show (options?: { focusLast?: boolean }) {
    if (this.open) {
      return
    }

    const filteredOptions = this.getFilteredOptions()

    if (filteredOptions.length === 0) {
      return
    }

    this.open = true
    this.activeIndex = options?.focusLast
      ? filteredOptions.length - 1
      : this.getInitialActiveIndex(filteredOptions)
    this.addOpenListeners()

    requestAnimationFrame(() => this.scrollActiveOptionIntoView())
  }

  private hide () {
    if (!this.open) {
      return
    }

    this.open = false
    this.activeIndex = -1
    this.removeOpenListeners()
  }

  private selectOption (value: string) {
    this.inputTrait.setValue(value)
    this.hide()
    this.inputElement?.focus({ preventScroll: true })
  }

  private scrollActiveOptionIntoView () {
    if (this.activeIndex < 0) {
      return
    }

    this.shadowRoot
      ?.querySelector(`#${this.getOptionId(this.activeIndex)}`)
      ?.scrollIntoView({ block: 'nearest' })
  }

  private addOpenListeners () {
    if (this.openListenersAttached) {
      return
    }

    document.addEventListener('focusin', this.handleDocumentFocusIn)
    document.addEventListener('mousedown', this.handleDocumentMouseDown)

    const root = this.getRootNode()

    if (root !== document) {
      root.addEventListener('focusin', this.handleDocumentFocusIn)
    }

    this.openListenersAttached = true
  }

  private removeOpenListeners () {
    if (!this.openListenersAttached) {
      return
    }

    document.removeEventListener('focusin', this.handleDocumentFocusIn)
    document.removeEventListener('mousedown', this.handleDocumentMouseDown)

    const root = this.getRootNode()

    if (root !== document) {
      root.removeEventListener('focusin', this.handleDocumentFocusIn)
    }

    this.openListenersAttached = false
  }

  private handleDocumentFocusIn = (event: Event) => {
    const path = event.composedPath()

    if (!path.includes(this)) {
      this.hide()
    }
  }

  private handleDocumentMouseDown = (event: MouseEvent) => {
    const path = event.composedPath()

    if (!path.includes(this)) {
      this.hide()
    }
  }

  private onAnchorMouseDown (event: MouseEvent) {
    event.preventDefault()
    this.inputElement?.focus({ preventScroll: true })
  }

  private onInputFocus () {
    this.show()
  }

  private openPopupFromKey (focusLast: boolean) {
    if (!this.open) {
      this.show({ focusLast })
    }
  }

  private onInputKeyDown (event: KeyboardEvent) {
    const options = this.getFilteredOptions()

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()

        if (!this.open) {
          this.openPopupFromKey(false)
        } else {
          this.activeIndex = this.getNextIndex(this.activeIndex, options, 1)
          this.scrollActiveOptionIntoView()
        }
        break
      case 'ArrowUp':
        event.preventDefault()

        if (!this.open) {
          this.openPopupFromKey(true)
        } else {
          this.activeIndex = this.getNextIndex(this.activeIndex, options, -1)
          this.scrollActiveOptionIntoView()
        }
        break
      case 'Enter':
        if (this.open && this.activeIndex >= 0 && options[this.activeIndex]) {
          event.preventDefault()
          this.selectOption(options[this.activeIndex].value)
        } else if (!this.open) {
          event.preventDefault()
          this.inputTrait.onSubmit()
        }
        break
      case 'Escape':
        if (this.open) {
          event.preventDefault()
          event.stopPropagation()
          this.hide()
          this.inputElement?.focus({ preventScroll: true })
        }
        break
      case 'Tab':
        this.hide()
        break
    }
  }

  private onListboxMouseUp (event: MouseEvent) {
    if (!(event.target instanceof HTMLElement)) {
      return
    }

    const optionElement = event.target.closest('[role="option"]')

    if (!optionElement) {
      return
    }

    const optionId = optionElement.id
    const index = Number.parseInt(optionId.replace(`${this.listboxId}-option-`, ''), 10)
    const option = this.getFilteredOptions()[index]

    if (option) {
      this.selectOption(option.value)
    }
  }
}
