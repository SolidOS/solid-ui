import { customElement, WebComponent } from '@/lib/components'
import { html } from 'lit'
import { property, query } from 'lit/decorators.js'
import FormControlTrait from '@/lib/components/traits/FormControlTrait'

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

  private controlTrait: FormControlTrait

  constructor () {
    super()

    this.controlTrait = this.addTrait(new FormControlTrait(this, {
      getControlElement: () => this.inputElement,
      getInternals: () => this.getInternals(),
    }))
  }

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
