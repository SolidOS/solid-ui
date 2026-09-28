import { customElement, FormControlComponent, FormControlValue } from '@/lib/components'
import { Task } from '@lit/task'
import { html, nothing, TemplateResult, type PropertyValues } from 'lit'
import { property, query, state } from 'lit/decorators.js'
import { debounce } from '@/lib/timing'
import type ComboboxOption from '@/components/combobox-option/ComboboxOption'

import '~icons/lucide/chevron-down'
import '~icons/svg-spinners/3-dots-fade'
import '@awesome.me/webawesome/dist/components/popup/popup.js'

import styles from './Combobox.styles.css'

class AsyncOptionsInfo extends Error {}

export type ComboboxOptionData = {
  value: FormControlValue;
  label: string;
  template?: TemplateResult;
  selectable?: boolean;
}

export type ComboboxChangeEvent = CustomEvent<{ option: ComboboxOptionData }>

export type AsyncComboboxOptionsProvider = (query: string) => Promise<ComboboxOptionData[]>

export function defineAsyncComboboxOptionsProvider<T extends AsyncComboboxOptionsProvider> (provider: T): T {
  return provider
}

@customElement('solid-ui-combobox')
export default class Combobox extends FormControlComponent {
  static styles = styles

  @property({ type: Boolean, reflect: true, attribute: 'select-only' })
  accessor selectOnly = false

  @property({ type: String, attribute: 'async-options-url' })
  accessor asyncOptionsUrl = ''

  @property({ type: String, attribute: 'async-options-results-field' })
  accessor asyncOptionsResultsField = ''

  @property({ type: String, attribute: 'async-options-label-field' })
  accessor asyncOptionsLabelField = ''

  @property({ type: String, attribute: 'async-options-value-field' })
  accessor asyncOptionsValueField = ''

  @property({ type: Function })
  accessor asyncOptionsProvider: AsyncComboboxOptionsProvider | null = null

  @property({ type: Array })
  accessor optionsFallback: ComboboxOptionData[] | null = null

  @query('input')
  protected accessor controlElement: HTMLInputElement | null = null

  @property({ type: Boolean, reflect: true })
  accessor readonly = false

  @state()
  private accessor filter = ''

  @state()
  private accessor displayValue = ''

  @state()
  private accessor open = false

  @state()
  private accessor activeIndex = -1

  private openListenersAttached = false
  private updateDebouncedFilter = debounce(300, (value) => (this.filter = value))
  private asyncOptionsTask?: Task<readonly [string], ComboboxOptionData[]>
  private _selectedOption: ComboboxOptionData | undefined
  private readonly listboxId: string

  constructor () {
    super()

    this.listboxId = `listbox-${this.controlTrait.controlId}`
  }

  get selectedOption (): ComboboxOptionData | undefined {
    return this._selectedOption
  }

  disconnectedCallback () {
    super.disconnectedCallback()

    this.removeOpenListeners()
  }

  protected willUpdate (changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties)

    if (changedProperties.has('asyncOptionsUrl') || changedProperties.has('asyncOptionsProvider')) {
      this.updateAsyncOptionsTask()
    }

    if (changedProperties.has('value')) {
      const options = this.getFilteredOptions()
      const option = options.find((option) => option.selectable !== false && option.value === this.value) ??
        this.optionsFallback?.find((option) => option.value === this.value)
      const optionLabel = option?.selectable !== false && option?.label

      this.updateDisplayValue(optionLabel || this.value)

      if (this.open) {
        this.activeIndex = this.getInitialActiveIndex(options)
      }

      if (this._selectedOption && this._selectedOption.value !== this.value) {
        this._selectedOption = undefined
      }
    }
  }

  protected render () {
    const options = this.getFilteredOptions()
    const activeOption =
      this.open && this.activeIndex >= 0 ? options[this.activeIndex] : undefined
    const activeDescendant =
      activeOption !== undefined ? this.getOptionId(this.activeIndex) : undefined
    const accessibleName = this.placeholder || 'Combobox'

    return html`
      ${this.controlTrait.renderLabel()}
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
            id="${this.controlTrait.controlId}"
            type="text"
            name=${this.name}
            placeholder=${this.placeholder}
            role="combobox"
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-expanded=${this.open ? 'true' : 'false'}
            aria-controls=${this.listboxId}
            aria-activedescendant=${activeDescendant ?? nothing}
            aria-labelledby=${this.label ? this.controlTrait.labelId : nothing}
            aria-label=${this.label ? nothing : accessibleName}
            aria-required=${this.required ? 'true' : nothing}
            autocomplete="off"
            spellcheck="false"
            ?required=${this.required}
            .value=${this.displayValue}
            @keydown=${this.onInputKeyDown}
            @focus=${this.onInputFocus}
            @input=${() => this.selectOnly ? this.updateDisplayValue(this.controlElement?.value ?? '') : this.controlTrait.onInput()}
          />
          <icon-lucide-chevron-down></icon-lucide-chevron-down>
        </div>
        <div
          id=${this.listboxId}
          class="listbox"
          role="listbox"
          aria-orientation="vertical"
          aria-labelledby=${this.label ? this.controlTrait.labelId : nothing}
          aria-label=${this.label ? nothing : accessibleName}
          ?hidden=${!this.open}
          @mousedown=${this.onListboxMouseDown}
        >
          ${options.map((option, index) => {
            return option.selectable !== false
              ? html`<div
                  id=${this.getOptionId(index)}
                  role="option"
                  aria-selected=${option.value === this.value ? 'true' : 'false'}
                  data-active=${index === this.activeIndex || nothing}
                  @mousemove=${() => this.setActiveIndex(index)}
                >
                  ${option.template ?? option.label}
                </div>`
              : html`<div class="non-selectable-option">${option.template ?? option.label}</div>`
          })}
        </div>
      </wa-popup>
    `
  }

  private getFilteredOptions (): ComboboxOptionData[] {
    if (this.asyncOptionsTask) {
      return this.asyncOptionsTask.render({
        initial: () => this.optionsFallback ?? [],
        complete: (options) => options,
        pending: () => [
          {
            value: '',
            label: 'Loading...',
            template: html`<icon-svg-spinners-3-dots-fade></icon-svg-spinners-3-dots-fade>`,
            selectable: false
          } as const,
        ],
        error: (error) => {
          const isError = !(error instanceof AsyncOptionsInfo)
          const message = Object(error).message ?? 'Something went wrong'

          return [
            {
              value: '',
              label: message,
              template: html`<span class="message message--${isError ? 'error' : 'info'}">${message}</span>`,
              selectable: false
            } as const,
          ]
        },
      })
    }

    return this.getOptionsFromDOM().filter((option) =>
      String(option.label).toLowerCase().includes(this.filter)
    )
  }

  private getOptionsFromDOM (): ComboboxOptionData[] {
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

  private updateDisplayValue (value: unknown) {
    this.displayValue = value ? String(value) : ''

    if (this.open) {
      const filter = this.displayValue.toLowerCase()

      if (this.asyncOptionsTask) {
        this.updateDebouncedFilter(filter)
      } else {
        this.filter = filter
      }
    }
  }

  private updateAsyncOptionsTask () {
    if (!this.asyncOptionsUrl && !this.asyncOptionsProvider) {
      this.asyncOptionsTask = undefined

      return
    }

    this.asyncOptionsTask ??= new Task(
      this,
      async ([filter]) => {
        if (this.asyncOptionsProvider) {
          const results = await this.asyncOptionsProvider(filter)

          if (results.length === 0) {
            throw new AsyncOptionsInfo('No results found')
          }

          return results
        }

        const response = await fetch(
          this.asyncOptionsUrl.replace('%search%', encodeURIComponent(filter))
        )
        const data = await response.json()
        const results = Array.from(
          this.asyncOptionsResultsField
            ? data[this.asyncOptionsResultsField]
            : data
        )

        if (results.length === 0) {
          throw new AsyncOptionsInfo('No results found')
        }

        const labelField = this.asyncOptionsLabelField || 'label'
        const valueField = this.asyncOptionsValueField || 'value'

        return results.map((result) => ({
          label: String(Object(result)[labelField]),
          value: Object(result)[valueField],
        }))
      },
      () => [this.filter]
    )
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

    this.filter = ''
    this.open = false
    this.activeIndex = -1
    this.removeOpenListeners()
    this.updateDebouncedFilter.cancel()
  }

  private selectOption (option: ComboboxOptionData) {
    const previousValue = this.value

    this._selectedOption = option

    this.hide()
    this.controlTrait.setValue(option.value)
    this.controlElement?.focus({ preventScroll: true })
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, detail: { option } }))

    if (previousValue === this.value) {
      this.updateDisplayValue(option.label)
    }
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
    if (event.target === this.controlElement) {
      return
    }

    event.preventDefault()
    this.controlElement?.focus({ preventScroll: true })
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
          this.selectOption(options[this.activeIndex])
        } else if (!this.open) {
          event.preventDefault()
          this.controlTrait.onSubmit()
        }
        break
      case 'Escape':
        if (this.open) {
          event.preventDefault()
          event.stopPropagation()
          this.hide()
          this.controlElement?.focus({ preventScroll: true })
        }
        break
      case 'Tab':
        this.hide()
        break
      default:
        if (!this.open) {
          this.show()
        }
    }
  }

  private onListboxMouseDown (event: MouseEvent) {
    event.preventDefault()

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
      this.selectOption(option)
    }
  }
}
