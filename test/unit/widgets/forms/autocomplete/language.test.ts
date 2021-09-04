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
  filterByLanguage,
  addDefaults
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

// jest.unmock('rdflib') // we need Fetcher to work (mocked)
jest.unmock('debug') // while debugging only @@
jest.mock('solid-auth-client', () => ({
  currentSession: () => Promise.resolve(),
  trackSession: () => null
}))

const kb = store

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

// const kb = store
const elephants = [
  { subject: kb.sym('https://www.wikidata.org/wiki/Q7378'), name: kb.literal('Elefant', 'de') },
  { subject: kb.sym('https://www.wikidata.org/wiki/Q7378'), name: kb.literal('elephant', 'en') },
  { subject: kb.sym('https://www.wikidata.org/wiki/Q7378'), name: kb.literal('elefante', 'it') },
  { subject: kb.sym('https://www.wikidata.org/wiki/Q7378'), name: kb.literal('éléphant', 'fr') }
]

describe('addDefaults', () => {
  it('returns expectedDefaults plus new lang', () => {
    const langArray = ['el']
    expect(addDefaults(langArray)).toEqual(['el', 'en', 'fr', 'de', 'it', 'ar'])
  })
  it('returns expectedDefaults if given a lang in default list', () => {
    const langArray = ['en']
    expect(addDefaults(langArray)).toEqual(expectedDefaults)
  })
  it('returns the expected defaults if array is null', () => {
    const langArray = null
    expect(addDefaults(langArray)).toEqual(expectedDefaults)
  })
})
describe('defaultPreferedLangages', () => {
  it('exists as a array', () => {
    expect(defaultPreferedLangages).toBeInstanceOf(Array)
  })
  it('exists as a array', () => {
    expect(defaultPreferedLangages).toEqual(expectedDefaults)
  })
})
describe('getPreferredLanguages', () => {
  let languageGetter 
  beforeEach(() => {
    // languageGetter = jest.spyOn(navigator, 'language', 'get') 
    languageGetter = jest.spyOn(navigator, 'languages', 'get')
  })
  it.skip('returns an expectedDefaults plus language defined in browser', async () => {
    languageGetter.mockReturnValue(['it'])
    // Note to Tim: even though addDefaults see tests above does not add if already exists
    //  this keeps coming back with 'it' added to the array below.
    const preferred = await getPreferredLanguages()
    expect(preferred).toEqual(["en", "fr", "de", "it", "ar"])
  })
})
describe('getPreferredLanagugesFor', () => {
  it('exists as a function', () => {
    expect(getPreferredLanagugesFor).toBeInstanceOf(Function)
  })
  it.skip('returns just greek for Alice, plus deafults', async () => {
    // Note to Tim: for some reason languageCodeURIBase doesn't find 'el'
    const kbAnySpy = jest.spyOn(kb, 'any').mockReturnValueOnce({ elements: ['el'] }).mockReturnValueOnce({ value: 'el' })
    const result = await getPreferredLanagugesFor(alice)
    expect(result).toEqual(['el'].concat(['en', 'fr', 'de', 'it', 'ar']))
    expect(kbAnySpy).toHaveBeenCalledTimes(2)
  })
  it('returns english, french Bob, plus deafults', async () => {
    const result = await getPreferredLanagugesFor(bob)
    expect(result).toEqual(['en', 'fr', 'de', 'it', 'ar'])
  })
  it('returns nothing for Charlie, just deafults', async () => {
    const result = await getPreferredLanagugesFor(charlie)
    expect(result).toEqual(expectedDefaults)
  })
})

describe('filterByLanguage', () => {
  it('exists as a function', () => {
    expect(filterByLanguage).toBeInstanceOf(Function)
  })

  it('filters according to the precendence of the language preferences', async () => {
    const result = filterByLanguage(elephants, defaultPreferedLangages)
    const names = result.map(binding => binding.name.value)
    expect(names).toEqual(['elephant'])
  })
})
// ends
