import { customElement, WebComponent } from '@/lib/components'
import { html } from 'lit'
import { property, query } from 'lit/decorators.js'
import InputTrait from '@/lib/components/traits/InputTrait'

import styles from './Input.styles.css'

@customElement('solid-ui-input')
export default class Input extends WebComponent {
  static styles = styles
  static formAssociated = true

  @property({ type: String, reflect: true })
  accessor label = '';

  @property({ type: String, reflect: true })
  accessor name = '';

  @property({ type: String })
  accessor value = '';

  @property({ type: String, reflect: true })
  accessor type = 'text';

  @property({ type: String, reflect: true })
  accessor placeholder = '';

  @property({ type: Boolean, reflect: true })
  accessor required = false;

  @query('input')
  private accessor inputElement: HTMLInputElement | null = null;

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
        <input
          id=${this.inputTrait.inputId}
          type=${this.type}
          name=${this.name}
          placeholder=${this.placeholder}
          ?required=${this.required}
          .value=${this.value}
          @input=${() => this.inputTrait.onInput()}
          @keydown=${this.onKeyDown}
        />
      </div>
    `
  }

  private onKeyDown (e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()

      this.inputTrait.onSubmit()
    }
  }
}
