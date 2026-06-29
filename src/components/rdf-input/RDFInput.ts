import { property } from 'lit/decorators.js'
import { html } from 'lit/html.js'
import ns from '../../lib/ns'
import { customElement, WebComponent } from '@/lib/components'
import { Literal, LiveStore, NamedNode, Statement, st } from 'rdflib'
import { label } from '../../utils'
import { mostSpecificClassURI } from '../../lib/forms/rdfFormsHelper'
import { FieldParamsObject, fieldParams as fieldTypeParams, InputType } from '../../lib/forms/fieldParams'
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
    const formGraph = this.getGraph(this.formSubject)

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
        @input=${this.updateData()}
      ></solid-ui-input>`
  }

  private getGraph (subject?: NamedNode) {
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

  private updateData () {
    return (e: CustomEvent) => {
      const newValue = (e.target as HTMLInputElement).value

      const uiPropertyTerm = this.getFormProperty(this.formSubject, ns.ui('property'), this.getGraph(this.formSubject))
      if (!uiPropertyTerm || !this.dataSubject) return

      const currentStoreContext = this.storeContext.store
      if (!currentStoreContext.updater.editable(this.dataSubject)) return

      const toDeleteSt = currentStoreContext.statementsMatching(this.dataSubject, uiPropertyTerm)

      if (newValue) {
        let objectFromNewValue
        const fieldType = this.formSubject ? mostSpecificClassURI(this.storeContext.store, this.formSubject) : undefined
        const params: FieldParamsObject = fieldType ? fieldTypeParams[fieldType] ?? {} : {}
        if (params.namedNode) {
          objectFromNewValue = currentStoreContext.sym(newValue)
        } else if (params.defaultInputValue) {
          objectFromNewValue = encodeURIComponent(newValue.replace(/ /g, ''))
          objectFromNewValue = currentStoreContext.sym(params.defaultInputValue + objectFromNewValue)
        } else {
          if (params.dt) {
            objectFromNewValue = new Literal(
              newValue.trim(),
              undefined,
              ns.xsd(params.dt)
            )
          } else {
            objectFromNewValue = new Literal(newValue)
          }
        }
        let toInsertSt = toDeleteSt.map(statement => st(statement.subject, statement.predicate, objectFromNewValue, statement.why)) // can include >1 doc
        if (toInsertSt.length === 0) {
          toInsertSt = [st(this.formSubject, property as any, objectFromNewValue, this.getGraph(this.dataSubject))]
        }

        this.updateMany(currentStoreContext, toDeleteSt, toInsertSt)
      }
    }
  }

  private updateMany (
    store: LiveStore,
    ds: Statement[],
    is: Statement[]
  ) {
    const getDocUri = (statement: Statement) => {
      const why = statement.why as any
      return why?.uri ?? why?.value
    }

    const docs: string[] = []
    is.forEach(st => {
      const uri = getDocUri(st)
      if (uri && !docs.includes(uri)) docs.push(uri)
    })
    ds.forEach(st => {
      const uri = getDocUri(st)
      if (uri && !docs.includes(uri)) docs.push(uri)
    })
    if (docs.length === 0) {
      throw new Error('No concrete document to update')
    }
    if (!store.updater) {
      throw new Error('Store has no updater')
    }
    if (docs.length === 1) {
      return store.updater.update(ds, is as any)
    }

    const doc = docs.pop()
    const is1 = is.filter(st => getDocUri(st) === doc)
    const is2 = is.filter(st => getDocUri(st) !== doc)
    const ds1 = ds.filter(st => getDocUri(st) === doc)
    const ds2 = ds.filter(st => getDocUri(st) !== doc)
    store.updater.update(ds1, is1 as any, (uri, ok, body) => {
      if (ok) {
        this.updateMany(store, ds2, is2)
      } else {
        throw new Error(`Failed to update data for ${uri}: ${body}`)
      }
    })
  }
}
