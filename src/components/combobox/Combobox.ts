import { customElement, WebComponent } from '@/lib/components'
import { html } from 'lit'
import { property, query, state } from 'lit/decorators.js'
import InputTrait from '@/lib/components/traits/InputTrait'
import type ComboboxOption from '@/components/combobox-option/ComboboxOption'

import '~icons/lucide/chevron-down'

import styles from './Combobox.styles.css'

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

  @query('[popover]')
  private accessor popoverElement: HTMLDivElement | null = null

  @query('input')
  private accessor inputElement: HTMLInputElement | null = null

  @property({ type: Boolean, reflect: true })
  accessor readonly = false

  @state()
  private accessor filter = ''

  private inputTrait: InputTrait

  constructor () {
    super()

    this.inputTrait = this.addTrait(
      new InputTrait(this, {
        getInputElement: () => this.inputElement,
        getInternals: () => this.getInternals(),
        onValueChanged: (value) => {
          this.filter = value.toLowerCase()
        },
      })
    )
  }

  protected render () {
    const options = this.getOptions().filter((option) =>
      option.label.toLowerCase().includes(this.filter)
    )

    return html`
      ${this.inputTrait.renderLabel()}
      <div class="input-wrapper">
        <input
          id="${this.inputTrait.inputId}"
          type="text"
          name=${this.name}
          ?placeholder=${this.placeholder}
          ?required=${this.required}
          ?readonly=${this.readonly}
          .value=${this.value}
          @keydown=${this.onInputKeyDown}
          @click=${this.onInputClick}
          @input=${() => this.inputTrait.onInput()}
        />
        <icon-lucide-chevron-down></icon-lucide-chevron-down>
      </div>
      <div role="listbox" aria-labelledby="${this.inputTrait.inputId}" popover>
        ${options.map(
          (option) =>
            html`<div
              role="option"
              aria-selected="false"
              @click=${() => this.onOptionClick(option.value)}
            >
              ${option.label}
            </div>`
        )}
      </div>
    `
  }

  private getOptions (): { value: string; label: string }[] {
    const options = this.querySelectorAll<ComboboxOption>(
      'solid-ui-combobox-option'
    )

    return Array.from(options).map((option) => ({
      value: option.value,
      label: option.textContent,
    }))
  }

  private onInputKeyDown (e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        this.popoverElement?.showPopover()
        break
      case 'Enter':
        if (!this.popoverElement?.matches(':popover-open')) {
          e.preventDefault()

          this.inputTrait.onSubmit()
        }
        break
    }
  }

  private onInputClick (e: MouseEvent) {
    e.preventDefault()

    this.popoverElement?.showPopover()
  }

  private onOptionClick (option: string) {
    this.inputTrait.setValue(option)

    this.popoverElement?.hidePopover()
  }
}
