import { customElement, WebComponent } from '@/lib/components'
import { html, nothing } from 'lit'
import { property, query, state } from 'lit/decorators.js'
import { isEmptyValue } from '@/lib/values'
import InputTrait from '@/lib/components/traits/InputTrait'
import type SelectOption from '@/components/select-option/SelectOption'

import '~icons/lucide/chevron-down'

import styles from './Select.styles.css'

export type SelectOptionData = {
  value: unknown;
  label: string;
}

export type SelectChangeEvent = CustomEvent<{ option: SelectOptionData }>

@customElement('solid-ui-select')
export default class Select extends WebComponent {
  static styles = styles
  static formAssociated = true

  @property({ type: String, reflect: true })
  accessor label = '';

  @property({ type: String, reflect: true })
  accessor name = '';

  @property({ type: String })
  accessor value = '';

  @property({ type: Boolean, reflect: true })
  accessor required = false;

  @property({ type: Array })
  set options (value: SelectOptionData[] | null) {
    this._options = value
  }

  get options (): SelectOptionData[] {
    if (this._options) {
      return this._options
    }

    const options = this.querySelectorAll<SelectOption>(
      'solid-ui-select-option'
    )

    return Array.from(options).map((option) => ({
      value: option.value,
      label: option.textContent,
    }))
  }

  @query('select')
  accessor inputElement: HTMLSelectElement | null = null;

  @state()
  private accessor _options: SelectOptionData[] | null = null

  private inputTrait: InputTrait

  constructor () {
    super()

    this.inputTrait = this.addTrait(new InputTrait(this, {
      getInputElement: () => this.inputElement,
      getInternals: () => this.getInternals(),
    }))
  }

  protected render () {
    const defaultOption = this.options.some(option => isEmptyValue(option.value))
      ? nothing
      : html`<option disabled value="" ?selected=${!this.value}>Select an option</option>`

    return html`
      ${this.inputTrait.renderLabel()}

      <div class="input-wrapper">
        <select
          id="${this.inputTrait.inputId}"
          name=${this.name}
          ?required=${this.required}
          @change=${this.onChange}
        >
          ${defaultOption}
          ${this.options.map(
            (option) =>
              html`<option
                .value=${option.value}
                ?selected=${option.value === this.value}
              >
                ${option.label}
              </option>`
          )}
        </select>
        <icon-lucide-chevron-down></icon-lucide-chevron-down>
      </div>
    `
  }

  private onChange () {
    const value = this.inputElement?.value
    const option = this.options.find((option) => option.value === value)

    this.inputTrait.setValue(value)
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, detail: { option } }))
  }
}
