import { customElement, WebComponent } from '@/lib/components'
import { html, nothing } from 'lit'
import { property } from 'lit/decorators.js'

@customElement('solid-ui-select-option')
export default class SelectOption extends WebComponent {
  @property({ type: String, reflect: true })
  accessor value = ''

  protected render () {
    return html`${nothing}`
  }
}
