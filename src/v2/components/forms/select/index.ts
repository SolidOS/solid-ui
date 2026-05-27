import { Select } from './Select'

export { Select }

const SELECT_TAG_NAME = 'solid-ui-select'

if (!customElements.get(SELECT_TAG_NAME)) {
  customElements.define(SELECT_TAG_NAME, Select)
}
