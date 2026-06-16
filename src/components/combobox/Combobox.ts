import { html } from 'lit'
import { property, query, state } from 'lit/decorators.js'
import { generateId, WebComponent, customElement } from '@/lib/components'
import ComboboxOption from '@/components/combobox-option/ComboboxOption'

import '~icons/lucide/chevron-down'

import styles from './Combobox.styles.css'

@customElement('solid-ui-combobox')
export default class Combobox extends WebComponent {
  static styles = styles
  static formAssociated = true

  @property({ type: String, reflect: true })
  accessor label = ''

  @property({ type: String })
  accessor value = ''

  @query('[popover]')
  private accessor popoverElement: HTMLDivElement | null = null

  @query('input')
  private accessor inputElement: HTMLInputElement | null = null

  @state()
  private accessor filter = ''

  private inputId = `combobox-${generateId()}`

  protected render () {
    const options = this.getOptions().filter(option => option.toLowerCase().includes(this.filter))

    return html`
        ${this.label ? html`<label for="${this.inputId}">${this.label}</label>` : ''}
        <div class="input-wrapper">
            <input
                id="${this.inputId}"
                .value=${this.value}
                type="text"
                @keydown=${this.onInputKeyDown}
                @click=${this.onInputClick}
                @input=${this.onInputChange}
            />
            <icon-lucide-chevron-down></icon-lucide-chevron-down>
        </div>
        <div role="listbox" aria-labelledby="${this.inputId}" popover>
          ${options.map(option => html`<div role="option" aria-selected="false" @click=${() => this.onOptionClick(option)}>${option}</div>`)}
        </div>
    `
  }

  private getOptions (): string[] {
    const options = this.querySelectorAll<ComboboxOption>('solid-ui-combobox-option')

    return Array.from(options).map(option => option.value)
  }

  private setValue (value: string) {
    this.filter = value.toLowerCase()
    this.value = value

    this.getInternals().setFormValue(value)
    this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }))
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

          this.getInternals().form?.requestSubmit()
        }
        break
    }
  }

  private onInputClick (e: MouseEvent) {
    e.preventDefault()

    this.popoverElement?.showPopover()
  }

  private onInputChange () {
    this.setValue(this.inputElement?.value ?? '')
  }

  private onOptionClick (option: string) {
    this.setValue(option)

    this.popoverElement?.hidePopover()
  }
}
