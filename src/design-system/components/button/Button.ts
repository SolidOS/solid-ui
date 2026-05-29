import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from './Button.styles.css'
import WebComponent from '../../../primitives/lib/WebComponent'

export const BUTTON_VARIANTS = ['primary', 'secondary', 'tertiary'] as const
export type ButtonVariant = typeof BUTTON_VARIANTS[number]

@customElement('solid-ui-button')
export default class Button extends WebComponent {
  static styles = styles
  static formAssociated = true

  @property({ type: String, reflect: true })
  accessor variant: ButtonVariant = 'primary'

  @property({ type: String, reflect: true })
  accessor type = 'button'

  @property({ type: Boolean })
  accessor disabled = false

  render () {
    return html`
        <button
            type=${this.type}
            ?disabled=${this.disabled}
            @click=${this.onClick}
        >
            <slot name="left-icon"></slot>
            <slot></slot>
            <slot name="right-icon"></slot>
        </button>
    `
  }

  private onClick () {
    switch (this.type) {
      case 'submit':
        this.getInternals().form?.requestSubmit()
        break
      case 'reset':
        this.getInternals().form?.reset()
        break
    }
  }
}
