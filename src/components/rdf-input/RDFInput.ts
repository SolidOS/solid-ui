import { property } from 'lit/decorators.js'
import { html } from 'lit/html.js'
import ns from '../../lib/ns'
import { customElement, WebComponent } from '@/lib/components'
import { LiveStore, NamedNode } from 'rdflib'
import { label } from '../../utils'
import { mostSpecificClassURI } from '../../lib/forms/rdfFormsHelper'
import { fieldParams, InputType } from '../../lib/forms/fieldParams'
import { ifDefined } from 'lit/directives/if-defined.js'

@customElement('solid-ui-rdf-input')
export default class RDFInput extends WebComponent {
  // example RDF Turtle format source:
  // :nameField a ui:SingleLineTextField ;
  //   ui:property vcard:fn;
  //   ui:label "name" .

  // store needs to contain the form and also the data it applies to
  @property({ type: LiveStore })
  accessor store

  // form here is the subject :nameField
  @property({ type: String })
  accessor formSubject

  @property({ type: String })
  accessor inputSubject

  render () {
    // HTML input part
    const uiPropertyTerm = this.store.any(this.formSubject, ns.ui('property')) as NamedNode | undefined
    const uiProperty = uiPropertyTerm ? label(uiPropertyTerm, true) : ''
    const uiLabel = this.store.any(this.formSubject, ns.ui('label'))
    const inputLabel = uiLabel ? uiLabel.value : uiProperty
    // readonly
    let readonly = false
    // TODO: I am not finding suppressEmptyUneditable in ui ontology
    const suppressEmptyUneditable = this.store.anyJS(this.formSubject, ns.ui('suppressEmptyUneditable'))
    if (suppressEmptyUneditable) {
      readonly = true
    }

    const uri = mostSpecificClassURI(this.store, this.formSubject)
    const params = fieldParams[uri] ?? {}
    const inputType: InputType = params.type ?? 'text'

    // input values
    const defaultInputValueFromStore = this.store.any(this.formSubject, ns.ui('default'))
    const inputValueFromStore = this.store.any(this.inputSubject, ns.ui('property'))

    let inputTerm: string | undefined

    const term = inputValueFromStore || defaultInputValueFromStore
    if (term && 'value' in term && term.value) {
      const decoded = decodeURIComponent(term.value)
      inputTerm = params.defaultInputValue
        ? decoded.replace(params.defaultInputValue, '').replace(/ /g, '')
        : decoded
    }

    if (inputLabel) {
      return html`
        <label>${inputLabel}</label>
        <input type=${inputType} value=${ifDefined(inputTerm)} ?readonly=${readonly}>
      `
    } else {
      return html`
        <input type=${inputType} value=${ifDefined(inputTerm)} ?readonly=${readonly}>
      `
    }
  }
}
