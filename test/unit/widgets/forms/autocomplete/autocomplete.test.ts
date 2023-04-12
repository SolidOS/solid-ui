/* Test the autocomplete field in the form system
*/

import { getFileContent } from '../../../helpers/getFileContent'
// Note different helpers directory:
// import { silenceDebugMessages } from '../../../../helpers/setup'
import { parse } from 'rdflib'
import {
  autocompleteField
} from '../../../../../src/widgets/forms/autocomplete/autocompleteField'
import ns from '../../../../../src/ns'
import { store } from 'solid-logic'
// import { textInputStyle } from '../../../../../src/style'
import {
//  findByAltText,
  findByTestId,
  //  getByAltText,
  // queryByAltText,
  waitFor
} from '@testing-library/dom'
import nock from 'nock'
import 'isomorphic-fetch'

jest.unmock('rdflib') // we need Fetcher to work (mocked)
jest.unmock('debug') // while debugging only @@

const turtleResponseHeaders = {
  Vary: 'Accept, Authorization, Origin',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Expose-Headers': 'Authorization, User, Location, Link, Vary, Last-Modified, ETag, Accept-Patch, Accept-Post, Updates-Via, Allow, WAC-Allow, Content-Length, WWW-Authenticate, MS-Author-Via',
  Allow: 'OPTIONS, HEAD, GET, PATCH, POST, PUT, DELETE',
  // Link: <one.ttl.acl>; rel="acl", <one.ttl.meta>; rel="describedBy", <http://www.w3.org/ns/ldp#Resource>; rel="type"
  'WAC-Allow': 'user="read write",public="read',
  'MS-Author-Via': 'SPARQL',
  // Updates-Via: wss://timbl.com
  'Content-Type': 'text/turtle; charset=utf-8'
}

const prefixes = `@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix owl: <http://www.w3.org/2002/07/owl#>.
@prefix solid: <http://www.w3.org/ns/solid/terms#>.
@prefix ui: <http://www.w3.org/ns/ui#>.
@prefix schema: <http://schema.org/>.
@prefix vcard: <http://www.w3.org/2006/vcard/ns#>.

@prefix org: <http://www.w3.org/ns/org#>.
@prefix esco: <http://data.europa.eu/esco/model#>.
@prefix wd: <http://www.wikidata.org/entity/>.
@prefix wdt: <http://www.wikidata.org/prop/direct/>.

@prefix : <#>.
`
const formText = prefixes + `

      :CorporationAutocomplete a ui:AutocompleteField;
      a ui:AutocompleteField; ui:label "Corporation in wikidata";
           ui:size 60;
           ui:targetClass  <http://www.wikidata.org/entity/Q6881511>; # Enterprise
           ui:property solid:publicId; ui:dataSource :WikidataInstancesByName.

      :WikidataInstancesByName a ui:DataSource ;
        schema:name "Wikidata instances by name";
        ui:endpoint "https://query.wikidata.org/sparql" ;
        ui:searchByNameQuery """SELECT ?subject ?name
        WHERE {
          ?klass wdt:P279* $(targetClass) .
          ?subject wdt:P31 ?klass .
          ?subject rdfs:label ?name.
          FILTER regex(?name, "$(name)", "i")
        } LIMIT $(limit) """.
  `

const initialDataText = prefixes + `
<#Alice> solid:publicId  wd:Q12345 .
wd:Q12345 schema:name "test institution" .

`

const kb = store

const form = kb.sym('https://example.org/forms.ttl#CorporationAutocomplete')
const subject = kb.sym('https://example.org/data.ttl#Alice')
const predicate = ns.solid('publicId')

parse(formText, store, form.doc().uri)
parse(initialDataText, store, subject.doc().uri)

// silenceDebugMessages()
// afterEach(clearStore)

// TODO: timeout causes Jest did not exit one second after the test run has completed. -> fix.
async function wait (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

describe('autocompleteField', () => {
  let result
  beforeEach(() => {
    // fetch.resetMocks();
  })

  it('exists as a function', () => {
    expect(autocompleteField).toBeInstanceOf(Function)
  })
  it('creates a autocomplete field', async () => {
    const container = undefined
    const already = {}
    const callbackFunction = () => {} // was jest.fn() // TODO: https://github.com/solidos/solid-ui/issues/263

    result = autocompleteField(
      document,
      container as HTMLElement | undefined,
      already,
      subject,
      form,
      subject.doc(),
      callbackFunction
    )

    const inputElement = await findByTestId(result, 'autocomplete-input')
    expect(inputElement.tagName).toEqual('INPUT')
    expect(result).toMatchSnapshot()
  })

  it('adds the autocomplete field to the container, if provided', () => {
    const container = document.createElement('div')
    const already = {}
    const callbackFunction = () => {} // was jest.fn() // TODO: https://github.com/solidos/solid-ui/issues/263

    result = autocompleteField(
      document,
      container as HTMLElement | undefined,
      already,
      subject,
      form,
      subject.doc(),
      callbackFunction
    )
    expect(container).toMatchSnapshot()
  })

  it('has an accept button which is hidden', async () => {
    const container = document.createElement('div')
    const already = {}
    const callbackFunction = () => {} // was jest.fn() // TODO: https://github.com/solidos/solid-ui/issues/263

    result = autocompleteField(
      document,
      container as HTMLElement | undefined,
      already,
      subject,
      form,
      subject.doc(),
      callbackFunction
    )
    const acceptButton = await findByTestId(result, 'accept-button')
    expect(acceptButton.style.display).toEqual('none')
    const cancelButton = await findByTestId(result, 'cancel-button')
    expect(cancelButton.style.display).toEqual('none')
    const editButton = await findByTestId(result, 'edit-button')
    expect(editButton.style.display).toEqual('none')
    // const deleteButton = await findByTestId(result, "delete-button");  @@
    // expect(deleteButton.style.display).toEqual('none')
  })

  it('has an input element which has the initial value', async () => {
    const container = document.createElement('div')
    const already = {}
    const callbackFunction = () => {} // was jest.fn() // TODO: https://github.com/solidos/solid-ui/issues/263

    result = autocompleteField(
      document,
      container as HTMLElement | undefined,
      already,
      subject,
      form,
      subject.doc(),
      callbackFunction
    )

    const inputElement = await findByTestId(result, 'autocomplete-input')
    expect(inputElement.value).toEqual('test institution')
  })

  it('makes Cancel button appear when user inputs something', async () => {
    const container = document.createElement('div')
    const already = {}
    const callbackFunction = () => {} // was jest.fn() // TODO: https://github.com/solidos/solid-ui/issues/263

    result = autocompleteField(
      document,
      container,
      already,
      subject,
      form,
      subject.doc(),
      callbackFunction
    )
    const inputElement = await findByTestId(result, 'autocomplete-input') as HTMLInputElement
    // const fakeResponse = await getFileContent('test/unit/widgets/forms/autocomplete/broken-sparql-response-small.txt')

    inputElement.value = 'mass'

    const event1 = new Event('input')
    inputElement.dispatchEvent(event1)

    const cancelButton = await findByTestId(result, 'cancel-button')
    expect(cancelButton.style.display).toEqual('') // Visibile again
  })

  it('makes Cancel button work when user inputs something', async () => {
    const container = document.createElement('div')
    const already = {}
    const callbackFunction = () => {} // was jest.fn() // TODO: https://github.com/solidos/solid-ui/issues/263

    result = autocompleteField(
      document,
      container,
      already,
      subject,
      form,
      subject.doc(),
      callbackFunction
    )
    const inputElement = await findByTestId(result, 'autocomplete-input') as HTMLInputElement
    //   const fakeResponse = await getFileContent('test/unit/widgets/forms/autocomplete/broken-sparql-response-small.txt')

    inputElement.value = 'mass'

    const event1 = new Event('input')
    inputElement.dispatchEvent(event1)

    const cancelButton = await findByTestId(result, 'cancel-button')
    expect(cancelButton.style.display).toEqual('') // Visibile again

    const event2 = new Event('click')
    cancelButton.dispatchEvent(event2)
    await wait(300)
    expect(inputElement.value).toEqual('test institution') // restored
    expect(cancelButton.style.display).toEqual('none') // invisibile again
  })

  it('on inpt fetches data (fixing wikidata timeout issue) making green table', async () => {
    const container = document.createElement('div')
    const already = {}
    const callbackFunction = () => {} // was jest.fn() // TODO: https://github.com/solidos/solid-ui/issues/263

    result = autocompleteField(
      document,
      container,
      already,
      subject,
      form,
      subject.doc(),
      callbackFunction
    )
    const inputElement = await findByTestId(result, 'autocomplete-input') as HTMLInputElement
    const fakeResponse = await getFileContent('test/unit/widgets/forms/autocomplete/broken-sparql-response-small.txt')

    nock('https://query.wikidata.org')
      .get(/^\/sparql/)
      .reply(200, fakeResponse) // replyWithFile?

    inputElement.value = 'mass'

    const event1 = new Event('input')
    inputElement.dispatchEvent(event1)

    const table = await findByTestId(result, 'autocomplete-table')
    await waitFor(() => expect(table.children.length).toEqual(4))
    expect(table.children.length).toBeGreaterThan(1)
    expect(table).toMatchSnapshot()
    expect(table.children[1].style.color).toEqual('rgb(0, 136, 0)') // green as all loaded
  })

  it('typing more search term till unique selects the whole name and sets the accecpt button active', async () => {
    const container = document.createElement('div')
    const already = {}
    const callbackFunction = () => {} // was jest.fn() // TODO: https://github.com/solidos/solid-ui/issues/263
    const CHOSEN_NAME = 'abbazia di San Massimino'
    result = autocompleteField(
      document,
      container,
      already,
      subject,
      form,
      subject.doc(),
      callbackFunction
    )
    const inputElement = await findByTestId(result, 'autocomplete-input') as HTMLInputElement
    const fakeResponse = await getFileContent('test/unit/widgets/forms/autocomplete/broken-sparql-response-small.txt')

    nock('https://query.wikidata.org')
      .get(/^\/sparql/)
      .reply(200, fakeResponse) // replyWithFile?

    inputElement.value = 'mass'

    const event1 = new Event('input')
    inputElement.dispatchEvent(event1)

    const table = await findByTestId(result, 'autocomplete-table')
    await waitFor(() => expect(table.children.length).toEqual(4))
    // expect(table.children.length).toBeGreaterThan(1)

    inputElement.value = 'massim' // add extra 2 characters to make it unique

    inputElement.dispatchEvent(new Event('input'))

    await wait(1000)

    expect(table.children.length).toEqual(1)
    await findByTestId(result, 'autocomplete-input')

    expect(inputElement.value).toEqual(CHOSEN_NAME)
    expect(result).toMatchSnapshot()
    // await waitFor(() => expect(inputElement2.textContent).toEqual(CHOSEN_NAME)) @@ re enable

    const acceptButton = await findByTestId(result, 'accept-button')
    expect(acceptButton.style.display).toEqual('') // should be visible
  })

  it('clicking on row of greenn table then accecpt button saves data', async () => {
    const container = document.createElement('div')
    const already = {}
    const callbackFunction = () => {} // was jest.fn() // TODO: https://github.com/solidos/solid-ui/issues/263
    const CHOSEN_NAME = 'abbazia di San Massimino'
    result = autocompleteField(
      document,
      container,
      already,
      subject,
      form,
      subject.doc(),
      callbackFunction
    )
    const inputElement = await findByTestId(result, 'autocomplete-input') as HTMLInputElement
    const fakeResponse = await getFileContent('test/unit/widgets/forms/autocomplete/broken-sparql-response-small.txt')

    nock('https://query.wikidata.org')
      .get(/^\/sparql/)
      .reply(200, fakeResponse) // replyWithFile?

    inputElement.value = 'mass'

    const event1 = new Event('input')
    inputElement.dispatchEvent(event1)

    const table = await findByTestId(result, 'autocomplete-table')
    await waitFor(() => expect(table.children.length).toEqual(4))
    // expect(table.children.length).toBeGreaterThan(1)
    let row
    for (let i = 0; i < table.children.length; i++) {
      if (table.children[i].textContent.includes(CHOSEN_NAME)) {
        row = table.children[i]
      }
    }
    expect(row).not.toEqual(undefined)
    const clickEvent = new Event('click')
    row.dispatchEvent(clickEvent)

    // console.log(`waiting ... for accept effect: ${inputElement.textContent}`)
    await wait(1000)

    expect(table.children.length).toEqual(1)
    await findByTestId(result, 'autocomplete-input')

    expect(result).toMatchSnapshot()
    // await waitFor(() => expect(inputElement2.textContent).toEqual(CHOSEN_NAME)) @@ re enable

    const acceptButton = await findByTestId(result, 'accept-button')
    expect(acceptButton.style.display).toEqual('') // should be visible

    // console.log('nocking get subject' , subject.site().uri)
    nock(subject.site().uri)
      .defaultReplyHeaders(turtleResponseHeaders)
      .get('/data.ttl')
      .reply(200, initialDataText) // replyWithFile?

    await kb.fetcher.load(subject)

    // console.log('nocking patch ' , subject.site().uri)
    nock(subject.site().uri)
      .intercept('/data.ttl', 'PATCH')
      .reply(200, 'ok')

    const clickEvent2 = new Event('click')
    acceptButton.dispatchEvent(clickEvent2)

    // console.log('waiting .. after accept button click')
    await wait(500)
    // Check the data is right in local quadstore
    const obj = kb.any(subject, predicate, null, subject.doc())
    expect(obj.termType).toEqual('NamedNode')
    const name = kb.any(obj, ns.schema('name'), null, subject.doc())
    expect(name.termType).toEqual('Literal')
    expect(name.value).toEqual(CHOSEN_NAME)
  })
})
