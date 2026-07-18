import { customElement, WebComponent } from '@/lib/components'
import { html, nothing } from 'lit'
import { property } from 'lit/decorators.js'

@customElement('solid-ui-combobox-option')
export default class ComboboxOption extends WebComponent {
  @property({ type: String, reflect: true })
  accessor value = ''

  protected render () {
    return html`${nothing}`
  }
}
