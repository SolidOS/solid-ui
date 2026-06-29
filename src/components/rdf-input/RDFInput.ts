import { property } from 'lit/decorators.js'
import { html } from 'lit/html.js'
import ns from '../../lib/ns'
import { customElement, generateId, WebComponent } from '@/lib/components'
import { NamedNode } from 'rdflib'
import { label } from '../../utils'
import { mostSpecificClassURI } from '../../lib/forms/rdfFormsHelper'
import { fieldParams as fieldTypeParams, InputType } from '../../lib/forms/fieldParams'
import { DEFAULT_STORE, storeContext, StoreContext } from '@/lib/forms/store/StoreContext'
import { consume } from '@lit/context'
import '@/components/input'

@customElement('solid-ui-rdf-input')
export default class RDFInput extends WebComponent {
  // example RDF Turtle format source:
  // :nameField a ui:SingleLineTextField ;
  //   ui:property vcard:fn;
  //   ui:label "name" .

  // formSubject describes the field metadata
  // dataSubject points to the data resource containing the value

  @consume({ context: storeContext, subscribe: true })
  private accessor storeContext: StoreContext = DEFAULT_STORE

  @property({ attribute: false, type: Object })
  accessor formSubject!: NamedNode

  @property({ attribute: false, type: Object })
  accessor dataSubject!: NamedNode

  @property({ type: Boolean, reflect: true })
  accessor readonly = true;

  render () {
    const formGraph = this.getFormGraph(this.formSubject)
    const statementCount = this.storeContext.store?.statements?.length ?? 0
    console.log('RDFInput render statement count:', statementCount)

    // for building the HTML input element
    const uiPropertyTerm = this.getFormProperty(this.formSubject, ns.ui('property'), formGraph)
    const inputLabel = this.getInputLabel(this.formSubject, uiPropertyTerm, formGraph)
    const readonly = this.getReadOnly(this.readonly, this.formSubject, formGraph)

    const fieldType = this.formSubject ? mostSpecificClassURI(this.storeContext.store, this.formSubject) : undefined
    const params = fieldType ? fieldTypeParams[fieldType] ?? {} : {}
    const inputType: InputType = params.type ?? 'text'

    // for populating the HTML input element
    const selectedTerm = this.getSelectedTerm(this.dataSubject, uiPropertyTerm, this.formSubject, params)
    const placeholder = readonly ? '' : this.defaultInputValue(params)
    const inputValue = this.termToInputValue(selectedTerm)

    return html`
      <solid-ui-input
        label="${inputLabel}"
        name="input-${inputLabel}"
        .value=${inputValue}
        placeholder="${placeholder}"
        type="${inputType}"
        ?readonly=${readonly}
      ></solid-ui-input>`
  }

  private getFormGraph (subject?: NamedNode) {
    return subject?.doc ? subject.doc() : undefined
  }

  private getFormProperty (subject: NamedNode | undefined, property: NamedNode, graph?: any): NamedNode | undefined {
    if (!subject) return undefined
    return this.storeContext.store.any(subject, property, null, graph) as NamedNode | undefined
  }

  private getInputLabel (formFieldSubject: NamedNode | undefined, uiPropertyTerm?: NamedNode, graph?: any): string {
    if (!formFieldSubject) return ''
    const uiLabel = this.storeContext.store.any(formFieldSubject, ns.ui('label'), null, graph)
    const propertyLabel = uiPropertyTerm ? label(uiPropertyTerm, true) : ''
    return uiLabel ? uiLabel.value : propertyLabel
  }

  private getReadOnly (readonly?: boolean, formFieldSubject?: NamedNode, graph?: any): boolean {
    if (readonly !== undefined) return readonly
    if (!formFieldSubject) return false
    return !!this.storeContext.store.anyJS(formFieldSubject, ns.ui('suppressEmptyUneditable'), null, graph)
  }

  private getSelectedTerm (
    dataSubject?: NamedNode,
    uiPropertyTerm?: NamedNode,
    formFieldSubject?: NamedNode,
    params?: { defaultInputValue?: string }
  ) {
    const defaultTerm = formFieldSubject
      ? this.storeContext.store.any(formFieldSubject, ns.ui('default'))
      : undefined

    if (!uiPropertyTerm || !dataSubject) {
      return defaultTerm
    }

    const inputTerm = this.storeContext.store.any(dataSubject, uiPropertyTerm)
    return inputTerm || defaultTerm
  }

  private termToInputValue (term: any) {
    if (!term || !('value' in term) || !term.value) return ''

    const decoded = decodeURIComponent(term.value)
    return decoded
  }

  private defaultInputValue (params: { defaultInputValue?: string } = {}) {
    const stripped = params.defaultInputValue ?? ''
    return stripped.replace(/ /g, '')
  }
}
