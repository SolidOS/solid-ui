import { html } from 'lit'
import { defineStoryRender } from '../../../storybook'
import './RDFForm'

const meta = {
  title: 'Design System/RDF Form',
  args: {
    rdfTurtleFormatSource: `
      @prefix : <https://solidos.solidcommunity.net/public/2021/solidUiFormTestData/dummyFormTestFile.ttl#>.
@prefix dc: <http://purl.org/dc/elements/1.1/>.
@prefix ui: <http://www.w3.org/ns/ui#>.
@prefix vcard: <http://www.w3.org/2006/vcard/ns#>.

# A Form with 2 fields and a nested subgroup

      :form a ui:Form;
        ui:parts (:nameField :emailField :addresses) .

            :nameField a ui:SingleLineTextField ;
            ui:property vcard:fn;
            ui:label "name" .

            :emailField a ui:EmailField ;
            ui:property vcard:hasEmail; # @@ check
            ui:label "email" .

            :addresses
                a ui:Multiple ;  # -- Allows zero or one or more
                ui:part :oneAddress ;
                ui:property vcard:hasAddress .

                :oneAddress
                    a ui:Group ;  # A subgroup of the main form
                    ui:parts ( :street :locality :postcode :region :country ).

                    :street
                        a ui:SingleLineTextField ;
                        ui:maxLength "128" ;
                        ui:property vcard:street-address ;
                        ui:size "40" .

                    :locality
                        a ui:SingleLineTextField ;
                        ui:maxLength "128" ;
                        ui:property vcard:locality ;
                        ui:size "40" .

                    :postcode
                        a ui:SingleLineTextField ;
                        ui:maxLength "25" ;
                        ui:property vcard:postal-code ;
                        ui:size "25" .

            :region
                a ui:SingleLineTextField ;
                ui:maxLength "128" ;
                ui:property vcard:region ;
                ui:size "40" .

            :country
                a ui:SingleLineTextField ;
                ui:maxLength "128" ;
                ui:property vcard:country-name ;
                ui:size "40" .
`,
    rdfURI: 'https://solidos.solidcommunity.net/public/2021/solidUiFormTestData/dummyFormTestFile.ttl',
    whichForm: 'form',
    rdfName: 'dummyFormTestFile.ttl'
  },

  argTypes: {
    rdfTurtleFormatSource: { control: 'text' },
    rdfURI: { control: 'text' },
    whichForm: { control: 'text' },
    rdfName: { control: 'text' }
  },
} as const

const render = defineStoryRender<typeof meta.argTypes>(({ rdfTurtleFormatSource, rdfURI, whichForm, rdfName }) => {
  return html`
        <solid-ui-rdf-form 
          rdfTurtleFormatSource=${rdfTurtleFormatSource}
          rdfURI=${rdfURI}
          whichForm=${whichForm}
          rdfName=${rdfName}>
        </solid-ui-rdf-form>
    `
})

export default meta

export const Primary = { render }
