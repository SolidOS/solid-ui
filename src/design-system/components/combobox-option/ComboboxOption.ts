import { html, nothing } from 'lit'
import { customElement } from '../../../primitives/lib/customElement'
import { property } from 'lit/decorators.js'
import WebComponent from '../../../primitives/lib/WebComponent'

@customElement('solid-ui-combobox-option')
export default class ComboboxOption extends WebComponent {
  @property({ type: String, reflect: true })
  accessor value = ''

  protected render () {
    return html`${nothing}`
  }
}
