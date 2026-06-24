import { customElement, WebComponent } from '@/lib/components'
import { html } from 'lit'
import { property, query } from 'lit/decorators.js'
import InputTrait from '@/lib/components/traits/InputTrait'
import type SelectOption from '@/components/select-option/SelectOption'

import '~icons/lucide/chevron-down'

import styles from './Select.styles.css'

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

  @query('select')
  accessor inputElement: HTMLSelectElement | null = null;

  private inputTrait: InputTrait

  constructor () {
    super()

    this.inputTrait = this.addTrait(new InputTrait(this, {
      getInputElement: () => this.inputElement,
      getInternals: () => this.getInternals(),
    }))
  }

  protected render () {
    return html`
      ${this.inputTrait.renderLabel()}

      <div class="input-wrapper">
        <select
          id="${this.inputTrait.inputId}"
          name=${this.name}
          ?required=${this.required}
          @change=${() => this.inputTrait.onInput()}
        >
          ${this.getOptions().map(
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

  private getOptions (): { value: string; label: string }[] {
    const options = this.querySelectorAll<SelectOption>(
      'solid-ui-select-option'
    )

    return Array.from(options).map((option) => ({
      value: option.value,
      label: option.textContent,
    }))
  }
}
