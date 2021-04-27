/* Logic to access public data stores
*
* including filtering resut by natural language etc
* See https://solidos.solidcommunity.net/public/2021/01%20Building%20Solid%20Apps%20which%20use%20Public%20Data.html
*/
/* eslint-disable no-console */
import { authn } from '../authn/index'
import { Collection, NamedNode } from 'rdflib'
import * as debug from '../debug'
import * as ns from '../ns'
import { kb } from '../logic'
import { Binding } from '../widgets/forms/autocomplete/publicData'

export const languageCodeURIBase = 'https://www.w3.org/ns/iana/language-code/' /// @@ unsupported on the web (2021)

export const defaultPreferedLangages = ['en', 'fr', 'de', 'it']

export async function getPreferredLanguages () {
  // In future:  cache in the login session for speed, but get frm profile and private prefs
  const me = await authn.checkUser() as NamedNode
  if (me) { // If logged in
    await kb.fetcher.load(me.doc())
    const list = kb.any(me, ns.schema('knowsLanguage'), null, me.doc()) as Collection | undefined
    if (!list) {
      console.log(`User ${me} has not set their languages in their profile.`)
      return defaultPreferedLangages
    }
    const languageCodeArray = []
    list.elements.forEach(item => {
      const lang = kb.any(item, ns.solid('publicId'), null, item.doc())
      if (!lang) {
        console.warn('getPreferredLanguages: No publiID of language.')
        return
      }
      if (!lang.value.startsWith(languageCodeURIBase)) {
        console.error(`What should be a language code ${lang.value} does not start with ${languageCodeURIBase}`)
        return
      }
      const code = lang.value.slice(languageCodeURIBase.length)
      console.log(`     User knows language with code: "${code}"`)
      languageCodeArray.push(code)
    })
    if (languageCodeArray.length > 0) {
      return languageCodeArray
    }
  }
  return defaultPreferedLangages
}

/* From an array of bindings with a names for each row,
 * remove dupliacte names for the same thing, leaving the user's
 * preferred language version
*/
export function filterByLanguage (bindings, languagePrefs) {
  const uris = {}
  bindings.forEach(binding => { // Organize names by their subject
    const uri = binding.subject.value
    uris[uri] = uris[uri] || []
    uris[uri].push(binding)
  })

  const languagePrefs2 = languagePrefs
  languagePrefs2.reverse() // prefered last

  const slimmed = ([] as Array<Binding>)
  for (const u in uris) { // needs hasOwnProperty ?
    const bindings = uris[u]
    const sortMe = bindings.map(binding => {
      return [languagePrefs2.indexOf(binding.name['xml:lang']), binding]
    })
    sortMe.sort() // best at th ebottom
    sortMe.reverse() // best at the top
    slimmed.push((sortMe[0][1] as any))
  } // map u
  debug.log(` Filter by language: ${bindings.length} -> ${slimmed.length}`)
  return slimmed
}
