import { property } from 'lit/decorators.js'
import { html } from 'lit/html.js'
import ns from '../../lib/ns'
import { customElement, WebComponent } from '@/lib/components'
import { NamedNode } from 'rdflib'
import { label } from '../../utils'
import { mostSpecificClassURI } from '../../lib/forms/rdfFormsHelper'
import { fieldParams as fieldTypeParams, InputType } from '../../lib/forms/fieldParams'
import { ifDefined } from 'lit/directives/if-defined.js'
import { DEFAULT_STORE, formsContext, FormsContext } from '@/lib/forms/FormsContext'
import { consume } from '@lit/context'

@customElement('solid-ui-rdf-input')
export default class RDFInput extends WebComponent {
  // example RDF Turtle format source:
  // :nameField a ui:SingleLineTextField ;
  //   ui:property vcard:fn;
  //   ui:label "name" .

  // formSubject describes the field metadata
  // dataSubject points to the data resource containing the value

  @consume({ context: formsContext, subscribe: true })
  private accessor formsContext: FormsContext = {
    store: DEFAULT_STORE,
  }

  @property({ attribute: false, type: Object })
  accessor formSubject!: NamedNode

  @property({ attribute: false, type: Object })
  accessor dataSubject!: NamedNode

  render () {
    const formGraph = this.getFormGraph(this.formSubject)

    // for building the HTML input element
    const uiPropertyTerm = this.getFormProperty(this.formSubject, ns.ui('property'), formGraph)
    const inputLabel = this.getInputLabel(this.formSubject, uiPropertyTerm, formGraph)
    const readonly = this.getReadOnly(this.formSubject, formGraph)

    const fieldType = this.formSubject ? mostSpecificClassURI(this.formsContext.store, this.formSubject) : undefined
    const params = fieldType ? fieldTypeParams[fieldType] ?? {} : {}
    const inputType: InputType = params.type ?? 'text'

    // for populating the HTML input element
    const selectedTerm = this.getSelectedTerm(this.dataSubject, uiPropertyTerm, this.formSubject, params)
    const inputValue = this.termToInputValue(selectedTerm, params)

    return html`
      ${inputLabel ? html`<label>${inputLabel}</label>` : ''}
      <input type=${inputType} value=${ifDefined(inputValue)} ?readonly=${readonly}>
    `
  }

  private getFormGraph (subject?: NamedNode) {
    return subject?.doc ? subject.doc() : undefined
  }

  private getFormProperty (subject: NamedNode | undefined, property: NamedNode, graph?: any): NamedNode | undefined {
    if (!subject) return undefined
    return this.formsContext.store.any(subject, property, null, graph) as NamedNode | undefined
  }

  private getInputLabel (formFieldSubject: NamedNode | undefined, uiPropertyTerm?: NamedNode, graph?: any): string {
    if (!formFieldSubject) return ''
    const uiLabel = this.formsContext.store.any(formFieldSubject, ns.ui('label'), null, graph)
    const propertyLabel = uiPropertyTerm ? label(uiPropertyTerm, true) : ''
    return uiLabel ? uiLabel.value : propertyLabel
  }

  private getReadOnly (formFieldSubject?: NamedNode, graph?: any): boolean {
    if (!formFieldSubject) return false
    return !!this.formsContext.store.anyJS(formFieldSubject, ns.ui('suppressEmptyUneditable'), null, graph)
  }

  private getSelectedTerm (
    dataSubject?: NamedNode,
    uiPropertyTerm?: NamedNode,
    formFieldSubject?: NamedNode,
    params?: { defaultInputValue?: string }
  ) {
    const defaultTerm = formFieldSubject
      ? this.formsContext.store.any(formFieldSubject, ns.ui('default'))
      : undefined

    if (!uiPropertyTerm || !dataSubject) {
      return defaultTerm
    }

    const inputTerm = this.formsContext.store.any(dataSubject, uiPropertyTerm)
    return inputTerm || defaultTerm
  }

  private termToInputValue (term: any, params: { defaultInputValue?: string } = {}) {
    if (!term || !('value' in term) || !term.value) return undefined

    const decoded = decodeURIComponent(term.value)
    if (!params.defaultInputValue) return decoded

    const stripped = decoded.replace(params.defaultInputValue, '')
    return stripped.replace(/ /g, '')
  }
}
