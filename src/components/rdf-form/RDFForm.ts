import { property, state } from 'lit/decorators.js'
import { html } from 'lit/html.js'
import { consume } from '@lit/context'
import { customElement, WebComponent } from '@/lib/components'
import ns from '../../lib/ns'
import { fetchData, findForm, sortBySequence } from '../../lib/forms/rdfFormsHelper'
import { sym, LiveStore } from 'rdflib'
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
    private accessor entireDataIsReadonly: boolean = true // to protect data, we default to not editable

    @state()
    private accessor _loadVersion = 0

    @state()
    private accessor _documentsLoaded = false

    @property({ converter: urlConverter })
    accessor formUrl: URL | null = null

    @property({ converter: urlConverter })
    accessor subjectUrl: URL | null = null

    render () {
      if (!this._documentsLoaded) {
        return html``
      }

      const store = this.currentStoreContext.store

      const subjectUrl = hrefFromUrlValue(this.subjectUrl)
      if (subjectUrl && store.updater?.editable(subjectUrl) !== undefined && store.updater?.editable(subjectUrl) !== false) {
        this.entireDataIsReadonly = false
      }
      console.log(store.updater?.editable(subjectUrl), this.entireDataIsReadonly)

      const formRoot = findForm(this.currentStoreContext.store, hrefFromUrlValue(this.formUrl))                          // If there are more 'a ui:Form' elements in a form file
      if (!formRoot) throw new Error('No ui:Form found in ' + hrefFromUrlValue(this.formUrl))

      const formDocument = sym(hrefFromUrlValue(this.formUrl))                         // rdflib NamedNode for the document
      const parts = store.each(formRoot, ns.ui('parts'), null, formDocument)
      const partsBySequence = sortBySequence(store, parts)
      const partItems = (partsBySequence || []).flatMap(item => {
        if (item && typeof item === 'object' && 'elements' in item && Array.isArray((item as any).elements)) {
          return (item as any).elements
        }
        return [item]
      })
      const uiFields = partItems.map(item => {
        const types = store.each(item as any, ns.rdf('type'), null, formDocument)
        const typeNode = types[0]
        const value = typeNode ? ((typeNode as any).value || String(typeNode)) : ((item as any).value || String(item))
        const hashIndex = value.lastIndexOf('#')
        return {
          value: item,
          fieldValue: hashIndex >= 0 ? value.slice(hashIndex + 1) : value
        }
      })

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
                  .dataSubject=${sym(subjectUrl)}
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
      if (changedProperties.has('formUrl') ||
        changedProperties.has('subjectUrl') ||
        changedProperties.has('passedInStore')
      ) {
        this.loadDocumentsIfNeeded()
      }
    }

    private async loadDocumentsIfNeeded () {
      const store = this.currentStoreContext.store
      const formUrl = hrefFromUrlValue(this.formUrl)
      const subjectUrl = hrefFromUrlValue(this.subjectUrl)

      if (!formUrl || !subjectUrl) return

      try {
        await fetchData(store, formUrl)
        await fetchData(store, subjectUrl)
        this._loadVersion += 1
        this._documentsLoaded = true
      } catch (error) {
        console.error('Failed to load RDF documents', error)
      }
    }
}
