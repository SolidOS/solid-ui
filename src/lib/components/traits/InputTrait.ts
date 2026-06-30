import { WebComponent } from '@/lib/components'
import { html, nothing } from 'lit'

import { generateId } from '@/lib/components'

import type { WebComponentTrait } from './WebComponentTrait'

export type InputTraitTarget = WebComponent & {
  name: string;
  label: string;
  required: boolean;
  value: string;
}

export interface InputTraitConfig {
  getInputElement(): HTMLInputElement | HTMLSelectElement | null
  getInternals(): ElementInternals
  onValueChanged?: (value: string) => void
}

export default class InputTrait implements WebComponentTrait {
  public inputId: string
  public labelId: string
  public target: InputTraitTarget
  private config: InputTraitConfig

  constructor (target: InputTraitTarget, config: InputTraitConfig) {
    this.config = config
    this.inputId = `input-${generateId()}`
    this.labelId = `label-${this.inputId}`
    this.target = target
  }

  firstUpdated () {
    this.config.getInternals().setFormValue(this.target.value)
    this.updateValidity()
  }

  updated (changedProperties: Map<PropertyKey, unknown>) {
    if (changedProperties.has('value') || changedProperties.has('required')) {
      this.updateValidity()
    }
  }

  formResetCallback () {
    this.target.value = ''
    this.config.getInternals().setFormValue('')
    this.updateValidity()
    this.config.onValueChanged?.('')
  }

  renderLabel () {
    return this.target.label
      ? html`<label id="${this.labelId}" for="${this.inputId}">${this.target.label}</label>`
      : nothing
  }

  onInput () {
    this.setValue(this.config.getInputElement()?.value ?? '')
  }

  onSubmit () {
    this.config.getInternals().form?.requestSubmit()
  }

  setValue (value: string) {
    this.target.value = value

    this.config.getInternals().setFormValue(this.target.value)
    this.target.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }))
    this.config.onValueChanged?.(this.target.value)
  }

  private updateValidity () {
    const internals = this.config.getInternals()

    if (this.target.required && this.target.value === '') {
      internals.setValidity(
        { valueMissing: true },
        'Please fill out this field.',
        this.config.getInputElement() ?? undefined
      )
    } else {
      internals.setValidity({})
    }
  }
}
