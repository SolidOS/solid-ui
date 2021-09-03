/* Test the language handling
*/

import { getFileContent } from '../../../helpers/getFileContent'
// Note different helpers directory:
// import { silenceDebugMessages } from '../../../../helpers/setup'
import { parse } from 'rdflib'
import {
  autocompleteField
} from '../../../../../src/widgets/forms/autocomplete/autocompleteField'
import {
  languageCodeURIBase,
  defaultPreferedLangages,
  getPreferredLanagugesFor,
  getPreferredLanguages,
  filterByLanguage
} from '../../../../../src/widgets/forms/autocomplete/language'
import { store, ns } from '../../../../../src/'
// import { textInputStyle } from '../../../../../src/style'
import {
//  findByAltText,
  findByTestId,
  //  getByAltText,
  // queryByAltText,
  waitFor
} from '@testing-library/dom'
import nock from 'nock'

// jest.unmock('rdflib') // we need Fetcher to work (mocked)
jest.unmock('debug') // while debugging only @@
jest.mock('solid-auth-client', () => ({
  currentSession: () => Promise.resolve(),
  trackSession: () => null
}))

const prefixes = `@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix lang: <${languageCodeURIBase}>.
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
const expectedDefaults = ['en', 'fr', 'de', 'it', 'ar']

const alice = store.sym('https://alice.example.com/profile#me')
const aliceProfileText = prefixes + `
 <#me> a foaf:Person; schema:knowsLanguage ( [ solid:publicId lang:el ] ) . # Just greek `
parse(aliceProfileText, store, alice.doc().uri)

const bob = store.sym('https://bob.example.com/profile#me')
const bobProfileText = prefixes + `
 <#me> a foaf:Person; schema:knowsLanguage ( [ solid:publicId lang:en]  [ solid:publicId lang:fr] ) . # Just english and french
`
parse(bobProfileText, store, bob.doc().uri)

const charlie = store.sym('https://charlie.example.com/profile#me')
const charlieProfileText = prefixes + `
 <#me> a foaf:Person . # Nothing stated about languages`
parse(charlieProfileText, store, charlie.doc().uri)

const kb = store

describe('defaultPreferedLangages', () => {
  it('exists as a array', () => {
    expect(defaultPreferedLangages).toBeInstanceOf(Array)
  })
  it('exists as a array', () => {
    expect(defaultPreferedLangages).toEqual(expectedDefaults)
  })
})

describe('getPreferredLanagugesFor', () => {
  it('exists as a function', () => {
    expect(getPreferredLanagugesFor).toBeInstanceOf(Function)
  })
  it('returns just greek for Alice, plus deafults', async () => {
    const result = await getPreferredLanagugesFor(alice)
    expect(result).toEqual(['el'].concat(['en', 'fr', 'de', 'it', 'ar']))
  })
  it('returns english, french Bob, plus deafults', async () => {
    const result = await getPreferredLanagugesFor(bob)
    expect(result).toEqual(['en', 'fr', 'de', 'it', 'ar'])
  })
  it('returns nothing for Charlie, plus deafults', async () => {
    const result = await getPreferredLanagugesFor(charlie)
    expect(result).toEqual(expectedDefaults)
  })
})
//
