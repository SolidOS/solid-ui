import { customElement, FormControlComponent } from '@/lib/components'
import { html } from 'lit'
import { property, query } from 'lit/decorators.js'

import styles from './Input.styles.css'

@customElement('solid-ui-input')
export default class Input extends FormControlComponent {
  static styles = styles

  @property({ type: String, reflect: true })
  accessor type = 'text';

  @property({ type: String, reflect: true })
  accessor placeholder = '';

  @property({ type: Boolean, reflect: true })
  accessor required = false;

  @property({ type: Boolean, reflect: true })
  accessor readonly = false;

  @query('input')
  protected accessor controlElement: HTMLInputElement | null = null;

  protected render () {
    return html`
      ${this.controlTrait.renderLabel()}

      <div class="input-wrapper">
        <input
          id=${this.controlTrait.controlId}
          type=${this.type}
          name=${this.name}
          placeholder=${this.placeholder}
          ?required=${this.required}
          .value=${this.value}
          ?readonly=${this.readonly}
          @input=${() => this.controlTrait.onInput()}
          @keydown=${this.onKeyDown}
        />
      </div>
    `
  }

  private onKeyDown (e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()

      this.controlTrait.onSubmit()
    }
  }
}
