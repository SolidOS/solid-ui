import { Header } from './Header'

export { Header }
export type {
  HeaderAccountMenuItem,
  HeaderAuthState,
  HeaderMenuItem
} from './Header'

const HEADER_TAG_NAME = 'solid-ui-header'

if (!customElements.get(HEADER_TAG_NAME)) {
  customElements.define(HEADER_TAG_NAME, Header)
}