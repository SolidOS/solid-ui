import { html, nothing } from 'lit'
import { customElement } from '../../../primitives/lib/customElement'
import { property } from 'lit/decorators.js'
import styles from './Button.styles.css'
import WebComponent from '../../../primitives/lib/WebComponent'

import '~icons/svg-spinners/180-ring'

export const BUTTON_VARIANTS = ['primary', 'secondary', 'tertiary', 'outline', 'ghost'] as const
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
  accessor disabled: boolean | undefined = undefined

  @property({ type: Boolean })
  accessor loading = false

  render () {
    const disabled = this.disabled ?? this.loading

    return html`
        <button type=${this.type} ?disabled=${disabled} @click=${this.onClick}>
            ${this.loading ? html`<icon-svg-spinners-180-ring></icon-svg-spinners-180-ring>` : nothing}
            <slot name="left-icon"></slot>
            <slot name="icon"></slot>
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
