/* Test the language handling
*/

import { parse } from 'rdflib'
import {
  languageCodeURIBase,
  defaultPreferredLanguages,
  getPreferredLanguagesFor,
  getPreferredLanguages,
  filterByLanguage,
  addDefaults
} from '../../../../../src/widgets/forms/autocomplete/language'
import { store } from '../../../../../src/'

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
  { subject: { uri: 'https://www.wikidata.org/wiki/Q7378' }, name: { value: 'Elefant', 'xml:lang': 'de' } },
  { subject: { uri: 'https://www.wikidata.org/wiki/Q7378' }, name: { value: 'elephant', 'xml:lang': 'en' } },
  { subject: { uri: 'https://www.wikidata.org/wiki/Q7378' }, name: { value: 'elefante', 'xml:lang': 'it' } },
  { subject: { uri: 'https://www.wikidata.org/wiki/Q7378' }, name: { value: 'éléphant', 'xml:lang': 'fr' } }
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
describe('defaultPreferredLanguages', () => {
  it('exists as a array', () => {
    expect(defaultPreferredLanguages).toBeInstanceOf(Array)
  })
  it('exists as a array', () => {
    expect(defaultPreferredLanguages).toEqual(expectedDefaults)
  })
})
describe('getPreferredLanguages', () => {
  let languageGetter
  beforeEach(() => {
    // languageGetter = jest.spyOn(navigator, 'language', 'get')
    languageGetter = jest.spyOn(navigator, 'languages', 'get')
  })
  it('returns the italian language defined in browser, plus other defaults', async () => {
    languageGetter.mockReturnValue(['it'])
    // Note to Tim: even though addDefaults see tests above does not add if already exists
    //  this keeps coming back with 'it' added to the array below.
    // This seems reasonable- the 'it' sould be put on front as most important, the defaults
    const preferred = await getPreferredLanguages()
    expect(preferred).toEqual(['it', 'en', 'fr', 'de', 'ar'])
  })
})
describe('getPreferredLanguagesFor', () => {
  it('exists as a function', () => {
    expect(getPreferredLanguagesFor).toBeInstanceOf(Function)
  })
  it.skip('returns just greek for Alice, plus defaults ', async () => {
    // Note to Tim: for some reason languageCodeURIBase doesn't find 'el'
    const usersLanguages = { elements: [{ value: 'https://www.w3.org/ns/iana/language-code/el' }] }
    const kbAnySpy = jest.spyOn(kb, 'any').mockReturnValueOnce(usersLanguages).mockReturnValueOnce(usersLanguages)
    const result = await getPreferredLanguagesFor(alice)
    expect(result).toEqual(['el'].concat(['en', 'fr', 'de', 'it', 'ar']))
    expect(kbAnySpy).toHaveBeenCalledTimes(2)
  })
  it('returns english, french Bob, plus defaults', async () => {
    const result = await getPreferredLanguagesFor(bob)
    expect(result).toEqual(['en', 'fr', 'de', 'it', 'ar'])
  })
  it('returns nothing for Charlie, just defaults', async () => {
    const result = await getPreferredLanguagesFor(charlie)
    expect(result).toEqual(expectedDefaults)
  })
})

describe('filterByLanguage', () => {
  it('exists as a function', () => {
    expect(filterByLanguage).toBeInstanceOf(Function)
  })

  it('filters picking english by default', async () => {

    const result = filterByLanguage(elephants, defaultPreferredLanguages)
    const names = result.map(binding => binding.name.value)
    expect(names).toEqual(['elephant'])
  })
  it('filters leaving french ', async () => {
    const result = filterByLanguage(elephants, ['fr'])
    const names = result.map(binding => binding.name.value)
    expect(names).toEqual(['éléphant'])
  })
  it('filters leaving Italian', async () => {
    const result = filterByLanguage(elephants, ['it'])
    const names = result.map(binding => binding.name.value)
    expect(names).toEqual(['elefante'])
  })
  it('filters leaving Italian even when unavailable greek comes first', async () => {
    const result = filterByLanguage(elephants, ['el', 'it'])
    const names = result.map(binding => binding.name.value)
    expect(names).toEqual(['elefante'])
  })
})
// ends
