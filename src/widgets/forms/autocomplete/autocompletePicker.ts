/* Create and edit data using public data
**
** organization conveys many distinct types of thing.
**
*/
import * as debug from '../../../debug'
import style from '../../../style'
import { store } from '../../../logic'
import widgets from '../../../widgets'

import { NamedNode } from 'rdflib'
import {
  queryPublicDataByName, filterByLanguage,
  AUTOCOMPLETE_LIMIT, QueryParameters, getPreferredLanguages
} from './publicData'

const kb = store

const AUTOCOMPLETE_THRESHOLD = 4 // don't check until this many characters typed
const AUTOCOMPLETE_ROWS = 20 // 20?
const AUTOCOMPLETE_ROWS_STRETCH = 40
const AUTOCOMPLETE_DEBOUNCE_MS = 300

// const autocompleteRowStyle = 'border: 0.2em solid straw;' // @@ white

/*
Autocomplete happens in 6 phases:
  1. The search string is too small to bother
  2. The search string is big enough, and we have not loaded the array
  3. The search string is big enough, and we have loaded array up to the limit
       Display them and wait for more user input
  4. The search string is big enough, and we have loaded array NOT to the limit
     but including all matches.   No more fetches.
     If user gets more precise, wait for them to select one - or reduce to a single
  5. Single one selected. Optionally waiting for accept button to be pressed, or can change string and go to 5 or 2
  6. Locked with a value. Press 'edit' button to return to 5
*/

export type AutocompleteDecoration = {
  acceptButton?: HTMLElement,
  cancelButton?: HTMLElement,
  editButton?: HTMLElement
}
export type AutocompleteOptions = {
     targetClass: NamedNode,
     currentObject?: NamedNode,
     currentName?: string,
     queryParams: QueryParameters
}

interface Callback1 {
  (subject: NamedNode, name: string): void;
}

function assertString (x):string {
  if (typeof x !== 'string') {
    throw new Error('Expected this to be a string: ' + x)
  }
  return x
}
function assertNN (x):NamedNode {
  if (!(x instanceof NamedNode)) {
    throw new Error('Expected this to be a string: ' + x)
  }
  return x
}

// The core of the autocomplete UI
export async function renderAutoComplete (dom: HTMLDocument,
  options:AutocompleteOptions,
  decoration: AutocompleteDecoration,
  callback: Callback1) {
  function complain (message) {
    const errorRow = table.appendChild(dom.createElement('tr'))
    debug.log(message)
    const err = new Error(message)
    errorRow.appendChild(widgets.errorMessageBlock(dom, err, 'pink'))
    // errorMessageBlock will log the stack to the console
    style.setStyle(errorRow, 'autocompleteRowStyle')
    errorRow.style.padding = '1em'
  }
  function remove (ele?: HTMLElement) {
    if (ele && ele.parentNode) {
      ele.parentNode.removeChild(ele)
    }
  }
  function finish (object, name) {
    debug.log('Auto complete: finish! ' + object)
    // remove(decoration.cancelButton)
    // remove(decoration.acceptButton)
    // remove(div)
    clearList()
    callback(object, name)
  }
  async function gotIt (object:NamedNode, name:string) {
    if (decoration.acceptButton) {
      (decoration.acceptButton as any).disabled = false
      searchInput.value = name // complete it
      foundName = name
      foundObject = object
      debug.log('Auto complete: name: ' + name)
      debug.log('Auto complete: waiting for accept ' + object)
      return
    }
    finish(object, name)
  }

  async function acceptButtonHandler (_event) {
    if (searchInput.value === foundName) { // still
      finish(foundObject, foundName)
    } else {
      (decoration.acceptButton as any).disabled = true
    }
  }

  async function cancelButtonHandler (_event) {
    debug.log('Auto complete: Canceled by user! ')
    div.innerHTML = '' // Clear out the table
  }

  function nameMatch (filter:string, candidate: string):boolean {
    const parts = filter.split(' ') // Each name part must be somewhere
    for (let j = 0; j < parts.length; j++) {
      const word = parts[j]
      if (candidate.toLowerCase().indexOf(word) < 0) return false
    }
    return true
  }

  function cancelText (_event) {
    searchInput.value = ''
    if (decoration.acceptButton) {
      (decoration.acceptButton as any).disabled = true // start again
    }
    candidatesLoaded = false
  }

  function thinOut (filter) {
    let hits = 0
    let pick = undefined as NamedNode | undefined
    let pickedName = ''
    for (let j = table.children.length - 1; j > 0; j--) { // backwards as we are removing rows
      const row = table.children[j]
      if (nameMatch(filter, row.textContent || '')) {
        hits += 1
        pick = kb.sym(assertString(row.getAttribute('subject')))
        pickedName = row.textContent as string
        ;(row as any).style.display = ''
        ;(row as any).style.color = 'blue' // @@ chose color
      } else {
        ;(row as any).style.display = 'none'
      }
    }
    if (hits === 1) { // Maybe require green confirmation button be clicked?
      debug.log(`  auto complete elimination:  "${filter}" -> "${pickedName}"`)
      gotIt(assertNN(pick), assertString(pickedName)) // uri, name
    }
  }

  function clearList () {
    while (table.children.length > 1) {
      table.removeChild(table.lastChild as Node)
    }
  }

  async function inputEventHHandler (_event) {
    if (runningTimeout) {
      clearTimeout(runningTimeout)
    }
    setTimeout(refreshList, AUTOCOMPLETE_DEBOUNCE_MS)
  }

  async function refreshList () {
    if (inputEventHandlerLock) {
      debug.log(`Ignoring "${searchInput.value}" because of lock `)
      return
    }
    inputEventHandlerLock = true
    const languagePrefs = await getPreferredLanguages()
    const language = languagePrefs[0] // if have to pick one
    const filter = searchInput.value.trim().toLowerCase()
    if (filter.length < AUTOCOMPLETE_THRESHOLD) { // too small
      clearList()
      candidatesLoaded = false
      numberOfRows = AUTOCOMPLETE_ROWS
    } else {
      if (allDisplayed && lastFilter && filter.startsWith(lastFilter)) {
        thinOut(filter) // reversible?
        inputEventHandlerLock = false
        return
      }
      let bindings
      try {
        bindings = await queryPublicDataByName(filter, OrgClass, languagePrefs, options.queryParams)
        // bindings = await queryDbpedia(sparql)
      } catch (err) {
        complain('Error querying db of organizations: ' + err)
        inputEventHandlerLock = false
        return
      }
      candidatesLoaded = true
      const loadedEnough = bindings.length < AUTOCOMPLETE_LIMIT
      if (loadedEnough) {
        lastFilter = filter
      } else {
        lastFilter = undefined
      }
      clearList()
      const slimmed = filterByLanguage(bindings, languagePrefs)
      if (loadedEnough && slimmed.length <= AUTOCOMPLETE_ROWS_STRETCH) {
        numberOfRows = slimmed.length // stretch if it means we get all items
      }
      allDisplayed = loadedEnough && slimmed.length <= numberOfRows
      debug.log(` Filter:"${filter}" bindings: ${bindings.length}, slimmed to ${slimmed.length}; rows: ${numberOfRows}, Enough? ${loadedEnough}, All displayed? ${allDisplayed}`)
      slimmed.slice(0, numberOfRows).forEach(binding => {
        const row = table.appendChild(dom.createElement('tr'))
        style.setStyle(row, 'autocompleteRowStyle')
        if (!binding.subject || !binding.name) {
          return
        }
        const uri = binding.subject.value
        const name = binding.name.value
        row.setAttribute('style', 'padding: 0.3em;')
        row.setAttribute('subject', uri)
        row.style.color = allDisplayed ? '#080' : '#000' // green means 'you should find it here'
        row.textContent = name
        row.addEventListener('click', async _event => {
          debug.log('       click row textContent: ' + row.textContent)
          debug.log('       click name: ' + name)
          gotIt(kb.sym(uri), name)
        })
      })
    }
    inputEventHandlerLock = false
  } // refreshList

  const queryParams: QueryParameters = options.queryParams
  const OrgClass = options.targetClass // kb.sym('http://umbel.org/umbel/rc/EducationalOrganization') // @@@ other
  if (decoration.acceptButton) {
    decoration.acceptButton.addEventListener('click', acceptButtonHandler, false)
  }
  if (decoration.cancelButton) {
    // decoration.cancelButton.addEventListener('click', cancelButtonHandler, false)
  }

  var candidatesLoaded = false
  const runningTimeout = undefined as any
  let inputEventHandlerLock = false
  let allDisplayed = false
  let lastFilter = undefined as (string | undefined)
  let numberOfRows = AUTOCOMPLETE_ROWS // this gets slimmed down
  const div = dom.createElement('div')
  let foundName = undefined as (string | undefined)// once found accepted string must match this
  let foundObject = undefined as (NamedNode | undefined)
  const table = div.appendChild(dom.createElement('table'))
  table.setAttribute('style', 'max-width: 30em; margin: 0.5em;')
  const head = table.appendChild(dom.createElement('tr'))
  style.setStyle(head, 'autocompleteRowStyle')
  const cell = head.appendChild(dom.createElement('td'))
  const searchInput = cell.appendChild(dom.createElement('input'))
  searchInput.setAttribute('type', 'text')
  if (options.currentObject) { // If have existing value then jump into the endgame of the autocomplete
    searchInput.value = options.currentName || ''
    foundName = options.currentName
    lastFilter = options.currentName
    foundObject = options.currentObject
  }
  const searchInputStyle = style.searchInputStyle ||
    'border: 0.1em solid #444; border-radius: 0.5em; width: 100%; font-size: 100%; padding: 0.1em 0.6em' // @
  searchInput.setAttribute('style', searchInputStyle)
  searchInput.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      acceptButtonHandler(event)
    }
  }, false)

  searchInput.addEventListener('input', inputEventHHandler)
  return div
} // renderAutoComplete

// ENDS
