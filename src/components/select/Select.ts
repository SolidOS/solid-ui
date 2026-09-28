import { customElement, FormControlComponent } from '@/lib/components'
import { html, nothing } from 'lit'
import { property, query, state } from 'lit/decorators.js'
import { isEmptyValue } from '@/lib/values'
import type SelectOption from '@/components/select-option/SelectOption'

import '~icons/lucide/chevron-down'

import styles from './Select.styles.css'

export type SelectOptionData = {
  value: unknown;
  label: string;
}

export type SelectChangeEvent = CustomEvent<{ option: SelectOptionData }>

@customElement('solid-ui-select')
export default class Select extends FormControlComponent {
  static styles = styles

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
  protected accessor controlElement: HTMLSelectElement | null = null;

  @state()
  private accessor _options: SelectOptionData[] | null = null

  protected render () {
    const defaultOption = this.options.some(option => isEmptyValue(option.value))
      ? nothing
      : html`<option disabled value="" ?selected=${!this.value}>Select an option</option>`

    return html`
      ${this.controlTrait.renderLabel()}

      <div class="input-wrapper">
        <select
          id="${this.controlTrait.controlId}"
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
    const value = this.controlElement?.value ?? null
    const option = this.options.find((option) => option.value === value)

    this.controlTrait.setValue(value)
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, detail: { option } }))
  }
}
