import { Button } from './Button'

export { Button }

const BUTTON_TAG_NAME = 'solid-ui-button'

declare global {
  interface HTMLElementTagNameMap {
    'solid-ui-button': Button
  }
}

if (!customElements.get(BUTTON_TAG_NAME)) {
  customElements.define(BUTTON_TAG_NAME, Button)
}
