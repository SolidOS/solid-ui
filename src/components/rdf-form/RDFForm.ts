import { property, state } from 'lit/decorators.js'
import { html } from 'lit/html.js'
import { consume } from '@lit/context'
import { customElement, WebComponent } from '@/lib/components'
import ns from '../../lib/ns'
import { loadDocument, sortBySequence } from '../../lib/forms/rdfFormsHelper'
import { sym, Namespace, LiveStore } from 'rdflib'
import '@/components/rdf-input'
import { DEFAULT_STORE, storeContext, StoreContext } from '@/lib/forms/store/StoreContext'

const urlConverter = {
  fromAttribute (value: string | null): URL | null {
    if (!value) return null

    try {
      return new URL(value)
    } catch {
      return null
    }
  },
  toAttribute (value: URL | null) {
    if (!value) return null
    return value
  }
}

const hrefFromUrlValue = (value: URL | null): string =>
  value?.href ?? ''

@customElement('solid-ui-rdf-form')
export default class RDFForm extends WebComponent {
    @consume({ context: storeContext, subscribe: true })
    private accessor storeContext: StoreContext = DEFAULT_STORE

    @property({ attribute: false })
    accessor passedInStore: LiveStore | null = null

    private get currentStoreContext (): StoreContext {
      if (this.passedInStore) {
        this.storeContext.store = this.passedInStore
      }

      return this.storeContext
    }

    @state()
    private accessor entireDataIsReadonly: boolean = false

    @state()
    private accessor _loadVersion = 0

    @state()
    private accessor _documentsLoaded = false

    @property({ type: String })
    accessor whichForm = 'this'

    @property({ type: String })
    accessor rdfTurtleFormatSource = ''

    @property({ type: String })
    accessor rdfName = ''

    @property({ converter: urlConverter })
    accessor rdfURI: URL | null = null

    @property({ type: String })
    accessor whichSubject = 'me'

    @property({ type: String })
    accessor subjectTurtleFormatSource = ''

    @property({ type: String })
    accessor subjectName = ''

    @property({ converter: urlConverter })
    accessor subjectURI: URL | null = null

    render () {
      console.log('subjectURI ', this.subjectURI)
      console.log('rdfURI ', this.rdfURI)
      if (!this._documentsLoaded) {
        return html``
      }

      const store = this.currentStoreContext.store
      const subjectURI = hrefFromUrlValue(this.subjectURI)

      if (subjectURI && store.updater?.editable(subjectURI) === false) {
        this.entireDataIsReadonly = true
      }

      const document = sym(hrefFromUrlValue(this.rdfURI))                         // rdflib NamedNode for the document
      const exactForm = this.whichForm                          // If there are more 'a ui:Form' elements in a form file
      const formThis = Namespace(`${hrefFromUrlValue(this.rdfURI)}#`)(exactForm)  // NamedNode for #this in the form

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
      const me = Namespace(`${hrefFromUrlValue(this.subjectURI)}#`)(this.whichSubject)

      return html`
      <form>
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
                  .storeVersion=${this._loadVersion}
                  .readonly=${this.entireDataIsReadonly}
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
      </form>
    `
    }

    protected updated (changedProperties: Map<PropertyKey, unknown>) {
      super.updated(changedProperties)
      if (
        changedProperties.has('rdfTurtleFormatSource') ||
        changedProperties.has('rdfName') ||
        changedProperties.has('rdfURI') ||
        changedProperties.has('subjectTurtleFormatSource') ||
        changedProperties.has('subjectName') ||
        changedProperties.has('subjectURI') ||
        changedProperties.has('passedInStore')
      ) {
        this.loadDocumentsIfNeeded()
      }
    }

    private async loadDocumentsIfNeeded () {
      const store = this.currentStoreContext.store
      const rdfURI = hrefFromUrlValue(this.rdfURI)
      const subjectURI = hrefFromUrlValue(this.subjectURI)

      if (!rdfURI || !subjectURI) return

      try {
        await loadDocument(store, this.rdfTurtleFormatSource, this.rdfName, rdfURI, false)
        await loadDocument(store, this.subjectTurtleFormatSource, this.subjectName, subjectURI, true)
        this._loadVersion += 1
        this._documentsLoaded = true
      } catch (error) {
        console.error('Failed to load RDF documents', error)
      }
    }
}
