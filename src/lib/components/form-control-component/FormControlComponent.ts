import { WebComponent } from '@/lib/components/web-component'
import { property } from 'lit/decorators.js'
import FormControlTrait, { FormControlValue } from '@/lib/components/traits/FormControlTrait'

export default abstract class FormControlComponent<T extends FormControlValue = FormControlValue> extends WebComponent {
  static formAssociated = true

  @property({ type: String, reflect: true })
  accessor label = ''

  @property({ type: String, reflect: true })
  accessor name = ''

  @property()
  accessor value: T | null = null

  @property({ type: String, reflect: true })
  accessor placeholder = ''

  @property({ type: Boolean, reflect: true })
  accessor required = false

  @property({ type: Boolean, reflect: true })
  accessor disabled = false

  protected controlTrait: FormControlTrait

  protected abstract controlElement: HTMLInputElement | HTMLSelectElement | null

  constructor () {
    super()

    this.controlTrait = this.addTrait(
      new FormControlTrait(this, {
        getControlElement: () => this.controlElement,
        getInternals: () => this.getInternals(),
      })
    )
  }
}
