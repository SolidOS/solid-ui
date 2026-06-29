import { property, state } from 'lit/decorators.js'
import { html } from 'lit/html.js'
import { consume } from '@lit/context'
import { customElement, WebComponent } from '@/lib/components'
import ns from '../../lib/ns'
import { loadDocument, sortBySequence } from '../../lib/forms/rdfFormsHelper'
import { sym, Namespace, LiveStore } from 'rdflib'
import '@/components/rdf-input'
import { DEFAULT_STORE, storeContext, StoreContext } from '@/lib/forms/store/StoreContext'

@customElement('solid-ui-rdf-form')
export default class RDFForm extends WebComponent {
    @consume({ context: storeContext, subscribe: true })
    private accessor storeContext: StoreContext = DEFAULT_STORE

    @property({ attribute: false })
    accessor passedInStore: LiveStore | null = null

    private get currentStoreContext (): StoreContext | null {
      if (this.passedInStore) {
        return { store: this.passedInStore }
      }

      return this.storeContext !== DEFAULT_STORE ? this.storeContext : null
    }

    @state()
    private accessor failed: boolean = false

    @state()
    private accessor submitting: boolean = false

     @state()
    private accessor entireDataIsReadonly: boolean = true

    @state()
    private accessor _parsedUrl: URL | null = null

    @state()
    private accessor _parsedUrl2: URL | null = null

    @property({ type: String })
    accessor whichForm = 'this'

    @property({ type: String })
    accessor rdfTurtleFormatSource = ''

    @property({ type: String })
    accessor rdfName = ''

    @property({ type: String })
    set rdfURI (value: string) {
      try {
        this._parsedUrl = new URL(value)
      } catch {
        this._parsedUrl = null // Handle invalid URL
      }
    }

    get rdfURI (): string {
      return this._parsedUrl ? this._parsedUrl.href : ''
    }

    @property({ type: String })
    accessor whichSubject = 'me'

    @property({ type: String })
    accessor subjectTurtleFormatSource = ''

    @property({ type: String })
    accessor subjectName = ''

    @property({ type: String })
    set subjectURI (value: string) {
      try {
        this._parsedUrl2 = new URL(value)
      } catch {
        this._parsedUrl2 = null // Handle invalid URL
      }
    }

    get subjectURI (): string {
      return this._parsedUrl2 ? this._parsedUrl2.href : ''
    }

    render () {
      const currentStoreContext = this.currentStoreContext

      if (!currentStoreContext) {
        console.warn('RDFForm: store context not available yet')
        return html``
      }

      const store = currentStoreContext.store

      if (!store.updater?.editable(this.subjectURI)) {
        this.entireDataIsReadonly = true
      }

      // TODO: detect format
      loadDocument(store, this.rdfTurtleFormatSource, this.rdfName, this.rdfURI) // load form
      loadDocument(store, this.subjectTurtleFormatSource, this.subjectName, this.subjectURI) // load data
      const document = sym(this.rdfURI)                         // rdflib NamedNode for the document
      const exactForm = this.whichForm                          // If there are more 'a ui:Form' elements in a form file
      const formThis = Namespace(this.rdfURI + '#')(exactForm)  // NamedNode for #this in the form

      const parts = store.each(formThis, ns.ui('parts'), null, document)
      const partsBySequence = sortBySequence(store, parts)
      const partItems = (partsBySequence || []).flatMap(item => {
        if (item && typeof item === 'object' && 'elements' in item && Array.isArray((item as any).elements)) {
          return (item as any).elements
        }
        return [item]
      })
      const uiFields = partItems.map(item => {
        const types = store.each(item as any, ns.rdf('type'), null, document)
        const typeNode = types[0]
        const value = typeNode ? ((typeNode as any).value || String(typeNode)) : ((item as any).value || String(item))
        const hashIndex = value.lastIndexOf('#')
        return {
          value: item,
          fieldValue: hashIndex >= 0 ? value.slice(hashIndex + 1) : value
        }
      })
      const me = Namespace(this.subjectURI + '#')(this.whichSubject)

      return html`
      <form @submit=${this.onSubmit}>
        ${uiFields.map(part => {
          switch (part.fieldValue) {
              case 'PhoneField':
              case 'EmailField':
              case 'ColorField':
              case 'DateField':
              case 'DateTimeField':
              case 'TimeField':
              case 'NumericField':
              case 'IntegerField':
              case 'DecimalField':
              case 'FloatField':
              case 'TextField':
              case 'SingleLineTextField':
              case 'NamedNodeURIField': {
                return html` <solid-ui-rdf-input 
                  .formSubject=${sym(part.value)} 
                  .dataSubject=${me}
                  readonly=${this.entireDataIsReadonly}
                ></solid-ui-rdf-input>
                <br>`
              }
              case 'MultiLineTextField':
                  return html`<input .rdf=${part}></input>`
              case 'BooleanField':
                  return html`<input .rdf=${part}></input>`
              case 'TristateField':
                  return html`<input .rdf=${part}></input>`
              case 'Classifier':
                  return html`<input .rdf=${part}></input>`
              case 'Choice':
                  return html`<input .rdf=${part}></input>`
              case 'Multiple':
                  return html`<input .rdf=${part}></input>`
              case 'Options':
                  return html`<input .rdf=${part}></input>`
              case 'AutocompleteField':
                  return html`<input .rdf=${part}></input>`
              case 'Comment':
              case 'Heading':
                  return html`<input .rdf=${part}></input>`
              default:
                  return html`<div>Unknown part type: ${part}</div>`
          }
        })}
        <solid-ui-button
            ?disabled=${!store.updater?.editable(this.subjectURI) || this.submitting}
            ?loading=${this.submitting}
            type="submit"
        >
            Save
        </solid-ui-button>
      </form>
    `
    }

    private async onSubmit (e: Event) {
      e.preventDefault()

      this.failed = false

      this.submitting = true

      try {
        const currentStoreContext = this.currentStoreContext
        if (currentStoreContext?.store.updater?.editable(this.subjectURI)) {
          // this.saveStatements()
        }
      } catch (error) {
        console.error(error)

        this.failed = true
      } finally {
        this.submitting = false
      }
    }
}
