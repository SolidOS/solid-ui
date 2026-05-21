import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from './Button.styles.css'

export const BUTTON_VARIANTS = ['primary', 'secondary', 'tertiary'] as const
export type ButtonVariant = typeof BUTTON_VARIANTS[number]

@customElement('solid-ui-button')
export default class Button extends LitElement {
  static styles = styles

  @property({ type: String, reflect: true })
  public variant: ButtonVariant = 'primary'

  render () {
    return html`
        <button type="button">
            <slot name="left-icon"></slot>
            <slot></slot>
            <slot name="right-icon"></slot>
        </button>
    `
  }
}
