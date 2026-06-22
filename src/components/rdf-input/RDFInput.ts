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
  @property({ type: NamedNode })
  accessor formSubject

  @property({ type: NamedNode })
  accessor inputSubject

  render () {
    const formSubject = typeof this.formSubject === 'string'
      ? this.store.sym(this.formSubject)
      : this.formSubject
    const inputSubject = typeof this.inputSubject === 'string'
      ? this.store.sym(this.inputSubject)
      : this.inputSubject

    const formGraph = formSubject.doc ? formSubject.doc() : undefined

    // HTML input part
    const uiPropertyTerm = this.store.any(formSubject, ns.ui('property'), null, formGraph) as NamedNode | undefined
    const uiProperty = uiPropertyTerm ? label(uiPropertyTerm, true) : ''
    const uiLabel = this.store.any(formSubject, ns.ui('label'), null, formGraph)
    const inputLabel = uiLabel ? uiLabel.value : uiProperty

    let readonly = false
    // TODO: I am not finding suppressEmptyUneditable in ui ontology
    const suppressEmptyUneditable = this.store.anyJS(formSubject, ns.ui('suppressEmptyUneditable'), null, formGraph)
    if (suppressEmptyUneditable) {
      readonly = true
    }

    const uri = mostSpecificClassURI(this.store, formSubject)
    const params = fieldParams[uri] ?? {}
    const inputType: InputType = params.type ?? 'text'

    // input values
    const defaultInputValueFromStore = this.store.any(formSubject, ns.ui('default'))
    const inputValueFromStore = uiPropertyTerm
      ? this.store.any(inputSubject, uiPropertyTerm)
      : undefined

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
