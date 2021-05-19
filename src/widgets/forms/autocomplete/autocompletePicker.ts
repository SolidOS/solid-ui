/* Create and edit data using public data
**
** As the data source is passed as a parameter, all kinds of APIa and query services can be used
**
*/
import * as debug from '../../../debug'
import * as style from '../../../style'
import * as widgets from '../../../widgets'
import { kb } from '../../../logic'
import { NamedNode, Literal } from 'rdflib'
import { queryPublicDataByName, bindingToTerm, AUTOCOMPLETE_LIMIT, QueryParameters } from './publicData'
import { filterByLanguage, getPreferredLanguages, defaultPreferedLangages } from './language'

const AUTOCOMPLETE_THRESHOLD = 4 // don't check until this many characters typed
const AUTOCOMPLETE_ROWS = 20 // 20?
const AUTOCOMPLETE_ROWS_STRETCH = 40
const AUTOCOMPLETE_DEBOUNCE_MS = 300

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
  cancelButton: HTMLElement, // Must have cancel button
  editButton?: HTMLElement,
  deleteButton?: HTMLElement
}
export type AutocompleteOptions = {
     targetClass?: NamedNode,
     currentObject?: NamedNode,
     currentName?: Literal,
     queryParams: QueryParameters,
     size?: number,
     permanent?: boolean
}

interface Callback1 {
  (_subject: NamedNode, _name: Literal): any;
}

/*
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
*/
export function setVisible (element:HTMLElement, visible:boolean) {
  element.style.visibility = visible ? 'visible' : 'collapse'
}

// The core of the autocomplete UI
export async function renderAutoComplete (dom: HTMLDocument,
  acOptions:AutocompleteOptions,
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
  /*
  function remove (ele?: HTMLElement) {
    if (ele && ele.parentNode) {
      ele.parentNode.removeChild(ele)
    }
  }
  */
  function finish (object, name) {
    debug.log('Auto complete: finish! ' + object)
    if (object.termType === 'Literal' && acOptions.queryParams.objectURIBase) {
      object = kb.sym(acOptions.queryParams.objectURIBase.value + object.value)
    }
    // remove(decoration.cancelButton)
    // remove(decoration.acceptButton)
    // remove(div)
    clearList()
    callback(object, name)
  }
  async function gotIt (object:NamedNode | Literal, name: Literal) {
    if (decoration.acceptButton) {
      (decoration.acceptButton as any).disbaled = false
      setVisible(decoration.acceptButton, true) // now wait for confirmation
      searchInput.value = name.value // complete it
      foundName = name
      foundObject = object
      debug.log('Auto complete: name: ' + name)
      debug.log('Auto complete: waiting for accept ' + object)
      clearList() // This may be an option - nice and clean but does not allow change of mind
      return
    }
    setVisible(decoration.cancelButton, true)
    finish(object, name)
  }

  async function acceptButtonHandler (_event) {
    if (foundName && searchInput.value === foundName.value) { // still
      finish(foundObject, foundName)
    } else {
      // (decoration.acceptButton as any).disabled = true
    }
  }

  async function cancelButtonHandler (_event) {
    debug.log('Auto complete: Canceled by user! ')
    if (acOptions.permanent) {
      initialize()
    } else {
      if (div.parentNode) {
        div.parentNode.removeChild(div)
      }
    }
  }

  function nameMatch (filter:string, candidate: string):boolean {
    const parts = filter.split(' ') // Each name part must be somewhere
    for (let j = 0; j < parts.length; j++) {
      const word = parts[j]
      if (candidate.toLowerCase().indexOf(word) < 0) return false
    }
    return true
  }

  /*
  function thinOut (filter) {
    let hits = 0
    let pick = undefined as NamedNode | Literal | undefined
    let pickedName = undefined as Literal | undefined
    for (let j = table.children.length - 1; j > 0; j--) { // backwards as we are removing rows
      const row = table.children[j]
      if (nameMatch(filter, row.textContent || '')) {
        hits += 1
        pick = (row as any).solidSubject as NamedNode | Literal
        pickedName = (row as any).solidName as Literal
        // pick = kb.sym(assertString(row.getAttribute('subject')))
        // pickedName = row.textContent as string
        ;(row as any).style.display = ''
        // ;(row as any).style.color = 'blue' // @@ chose color
        ;(row as any).style.color = allDisplayed ? '#080' : '#088' // green means 'you should find it here'
      } else {
        ;(row as any).style.display = 'none'
      }
    }
    if (hits === 1) { // Maybe require green confirmation button be clicked?
      debug.log(`  auto complete elimination:  "${filter}" -> "${pickedName}"`)
      if (pick && pickedName) { // @@ for TS only.
        gotIt(pick, pickedName)
      }
    }
  }
*/
  function clearList () {
    while (table.children.length > 1) {
      table.removeChild(table.lastChild as Node)
    }
  }

  async function inputEventHHandler (_event) {
    setVisible(decoration.cancelButton, true) // only allow cancel when there is something to cancel
    if (runningTimeout) {
      clearTimeout(runningTimeout)
    }
    setTimeout(refreshList, AUTOCOMPLETE_DEBOUNCE_MS)
  }

  async function loadBindingsAndFilterByLanguage (filter, languagePrefs) {
    let bindings
    try {
      bindings = await queryPublicDataByName(filter, targetClass as any,
        languagePrefs || defaultPreferedLangages, acOptions.queryParams)
    } catch (err) {
      complain('Error querying db of organizations: ' + err)
      inputEventHandlerLock = false
      return
    }
    loadedEnough = bindings.length < AUTOCOMPLETE_LIMIT
    if (loadedEnough) {
      lastFilter = filter
    } else {
      lastFilter = undefined
    }
    clearList()
    const slimmed = filterByLanguage(bindings, languagePrefs)
    return slimmed
  }

  function filterByName (filter, bindings) {
    return bindings.filter(binding => nameMatch(filter, binding.name.value))
  }

  async function refreshList () {
    function rowForBinding (binding) {
      const row = dom.createElement('tr')
      style.setStyle(row, 'autocompleteRowStyle')
      row.setAttribute('style', 'padding: 0.3em;')
      row.style.color = allDisplayed ? '#080' : '#088' // green means 'you should find it here'
      row.textContent = binding.name.value
      const object = bindingToTerm(binding.subject)
      const nameTerm = bindingToTerm(binding.name)
      row.addEventListener('click', async _event => {
        debug.log('       click row textContent: ' + row.textContent)
        debug.log('       click name: ' + nameTerm.value)
        if (object && nameTerm) {
          gotIt(object, nameTerm as Literal)
        }
      })
      return row
    } // rowForBinding

    if (inputEventHandlerLock) {
      debug.log(`Ignoring "${searchInput.value}" because of lock `)
      return
    }
    debug.log(`Setting lock at "${searchInput.value}"`)

    inputEventHandlerLock = true
    const languagePrefs = await getPreferredLanguages()
    const filter = searchInput.value.trim().toLowerCase()
    if (filter.length < AUTOCOMPLETE_THRESHOLD) { // too small
      clearList()
      // candidatesLoaded = false
      numberOfRows = AUTOCOMPLETE_ROWS
    } else {
      if (!allDisplayed || !lastFilter || !filter.startsWith(lastFilter)) {
        debug.log(`   Querying database at "${filter}" cf last "${lastFilter}".`)
        lastBindings = await loadBindingsAndFilterByLanguage(filter, languagePrefs) // freesh query
      }
      // Trim table as earach gets tighter:
      const slimmed = filterByName(filter, lastBindings)
      if (loadedEnough && slimmed.length <= AUTOCOMPLETE_ROWS_STRETCH) {
        numberOfRows = slimmed.length // stretch if it means we get all items
      }
      allDisplayed = loadedEnough && slimmed.length <= numberOfRows
      debug.log(` Filter:"${filter}" lastBindings: ${lastBindings.length}, slimmed to ${slimmed.length}; rows: ${numberOfRows}, Enough? ${loadedEnough}, All displayed? ${allDisplayed}`)

      clearList()
      for (const binding of slimmed) {
        table.appendChild(rowForBinding(binding))
      }
      if (slimmed.length === 1) {
        gotIt(bindingToTerm(slimmed[0].subject), bindingToTerm(slimmed[0].name) as Literal)
      }
    } // else
    inputEventHandlerLock = false
  } // refreshList

  function initialize () {
    if (acOptions.currentObject) { // If have existing value then jump into the endgame of the autocomplete
      searchInput.value = acOptions.currentName ? acOptions.currentName.value : '??? wot no name for ' + acOptions.currentObject
      foundName = acOptions.currentName
      lastFilter = acOptions.currentName ? acOptions.currentName.value : undefined
      foundObject = acOptions.currentObject
    } else {
      searchInput.value = ''
      lastFilter = undefined
      foundObject = undefined
    }
    if (decoration.deleteButton) {
      setVisible(decoration.deleteButton, !!acOptions.currentObject)
    }

    if (decoration.acceptButton) {
      setVisible(decoration.acceptButton, false) // hide until input complete
    }
    if (decoration.editButton) {
      setVisible(decoration.editButton, true)
    }
    setVisible(decoration.cancelButton, false) // only allow cancel when there is something to cancel
    inputEventHandlerLock = false
    clearList()
  } // initialiize

  // const queryParams: QueryParameters = acOptions.queryParams
  const targetClass = acOptions.targetClass
  if (!targetClass) throw new Error('renderAutoComplete: missing targetClass')
  // console.log(`renderAutoComplete: targetClass=${targetClass}` )
  if (decoration.acceptButton) {
    decoration.acceptButton.addEventListener('click', acceptButtonHandler, false)
  }
  if (decoration.cancelButton) {
    decoration.cancelButton.addEventListener('click', cancelButtonHandler, false)
  }

  // var candidatesLoaded = false
  let lastBindings
  let loadedEnough = false
  const runningTimeout = undefined as any
  let inputEventHandlerLock = false
  let allDisplayed = false
  let lastFilter = undefined as (string | undefined)
  let numberOfRows = AUTOCOMPLETE_ROWS // this gets slimmed down
  const div = dom.createElement('div')
  let foundName = undefined as (Literal | undefined)// once found accepted string must match this
  let foundObject = undefined as (NamedNode | Literal | undefined)
  const table = div.appendChild(dom.createElement('table'))
  table.setAttribute('style', 'max-width: 30em; margin: 0.5em;')
  const head = table.appendChild(dom.createElement('tr'))
  style.setStyle(head, 'autocompleteRowStyle') // textInputStyle or
  const cell = head.appendChild(dom.createElement('td'))
  const searchInput = cell.appendChild(dom.createElement('input'))
  searchInput.setAttribute('type', 'text')

  initialize()

  const size = acOptions.size || style.textInputSize || 20
  searchInput.setAttribute('size', size)

  const searchInputStyle = style.textInputStyle || // searchInputStyle ?
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
