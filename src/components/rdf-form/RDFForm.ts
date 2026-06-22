import { property, state } from 'lit/decorators.js'
import { html } from 'lit/html.js'
import { customElement, WebComponent } from '@/lib/components'
import ns from '../../lib/ns'
import { loadDocument, sortBySequence } from '../../lib/forms/rdfFormsHelper'
import { sym, Namespace } from 'rdflib'
import { store } from 'solid-logic'
import '@/components/rdf-input'

@customElement('solid-ui-rdf-form')
export default class RDFForm extends WebComponent {
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

    private defaultContexts = `
      @prefix foaf:  <http://xmlns.com/foaf/0.1/>.
      @prefix sched: <http://www.w3.org/ns/pim/schedule#>.
      @prefix cal:   <http://www.w3.org/2002/12/cal/ical#>.
      @prefix dc:    <http://purl.org/dc/elements/1.1/>.
      @prefix rdfs:  <http://www.w3.org/2000/01/rdf-schema#>.
      @prefix ui:    <http://www.w3.org/ns/ui#>.
      @prefix trip:  <http://www.w3.org/ns/pim/trip#>.
      @prefix vcard: <http://www.w3.org/2006/vcard/ns#>.
      @prefix xsd:   <http://www.w3.org/2001/XMLSchema#>.
    `
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
      // TODO: detect format
      loadDocument(store, this.rdfTurtleFormatSource + this.defaultContexts, this.rdfName, this.rdfURI) // load form
      loadDocument(store, this.subjectTurtleFormatSource + this.defaultContexts, this.subjectName, this.subjectURI) // load data
      const document = sym(this.rdfURI)                         // rdflib NamedNode for the document
      const exactForm = this.whichForm                          // If there are more 'a ui:Form' elements in a form file
      const formThis = Namespace(this.rdfURI + '#')(exactForm)  // NamedNode for #this in the form
      console.log('formThis:', formThis.value)

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
        return hashIndex >= 0 ? value.slice(hashIndex + 1) : value
      })
      console.log('parts:', parts)
      console.log('partsBySequence:', partsBySequence)
      console.log('partItems:', partItems)
      console.log('document:', document)
      console.log('exactForm:', exactForm)
      console.log('uiFields:', uiFields)

      return html`
      ${uiFields.map(part => {
        switch (part) {
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
            case 'NamedNodeURIField':
                return html` <solid-ui-rdf-input .store=${store} formSubject=${part} .inputSubject=${this.subjectURI}></solid-ui-rdf-input> `
            case 'MultiLineTextField':
                return html`<input rdf=${part}></input>`
            case 'BooleanField':
                return html`<input rdf=${part}></input>`
            case 'TristateField':
                return html`<input rdf=${part}></input>`
            case 'Classifier':
                return html`<input rdf=${part}></input>`
            case 'Choice':
                return html`<input rdf=${part}></input>`
            case 'Multiple':
                return html`<input rdf=${part}></input>`
            case 'Options':
                return html`<input rdf=${part}></input>`
            case 'AutocompleteField':
                return html`<input rdf=${part}></input>`
            case 'Comment':
            case 'Heading':
                return html`<input rdf=${part}></input>`
            default:
                return html`<div>Unknown part type: ${part}</div>`
        }
      })}
    `
    }
}
