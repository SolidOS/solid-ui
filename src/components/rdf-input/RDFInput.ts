import { property } from 'lit/decorators.js'
import { html } from 'lit/html.js'
import ns from '../../lib/ns'
import { customElement, WebComponent } from '@/lib/components'
import { store } from 'solid-logic'
import { NamedNode, Namespace, sym } from 'rdflib'
import { label } from '../../utils'
import { loadDocument } from '../../lib/forms/rdfFormsHelper'

// import '../input'

@customElement('solid-ui-rdf-input')
export default class RDFInput extends WebComponent {
  // example RDF Turtle format source:   
  // :nameField a ui:SingleLineTextField ;
  //   ui:property vcard:fn;
  //   ui:label "name" .

  // form here is the subject :nameField 
    @property({ type: String })
    accessor rdf = ''

    render () {
      const exactForm = this.whichForm // nameField
      const formThis = Namespace(this.rdfURI + '#')(exactForm)  // NamedNode for #this in the form
      const document = sym(this.rdfURI) 

      const uiProperty = label(store.any(formThis, ns.ui('property')), true) as NamedNode | undefined
      const uiLabel = store.any(formThis, ns.ui('label'))
      const inputLabel = uiLabel ? uiLabel.value : uiProperty ? uiProperty.value.split('#').pop() : 'Input'

      // TODO: I am not finding suppressEmptyUneditable in ui ontology
      const suppressEmptyUneditable = store.anyJS(formThis, ns.ui('suppressEmptyUneditable'), null, document)

      const uri = mostSpecificClassURI(form)
      let params = fieldParams[uri]
      
      return html`
      <input name=${name} label=${inputLabel} ?required=${isRequired}></input>
    `
}
