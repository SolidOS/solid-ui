import { SignupButton } from './SignupButton'

export { SignupButton }

const SIGNUP_BUTTON_TAG_NAME = 'solid-ui-signup-button'

if (!customElements.get(SIGNUP_BUTTON_TAG_NAME)) {
  customElements.define(SIGNUP_BUTTON_TAG_NAME, SignupButton)
}
