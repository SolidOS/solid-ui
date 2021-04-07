// The Control with decorations

// import { ns, widgets, store } from 'solid-ui'

import { ns, widgets, store, icons } from '../../../index'
import { renderAutoComplete, AutocompleteOptions, AutocompleteDecoration } from './autocompletePicker' // dbpediaParameters

import { NamedNode } from 'rdflib'
import { wikidataParameters } from './publicData'

const WEBID_NOUN = 'Solid ID'

const kb = store

const GREEN_PLUS = icons.iconBase + 'noun_34653_green.svg'
const SEARCH_ICON = icons.iconBase + 'noun_Search_875351.svg'

export async function renderAutocompleteControl (dom:HTMLDocument,
  person:NamedNode,
  barOptions,
  acOptions,
  addOneIdAndRefresh): Promise<HTMLElement> {
  async function autoCompleteDone (object, _name) {
    const webid = object.uri
    removeDecorated()
    return addOneIdAndRefresh(person, webid)
  }

  async function greenButtonHandler (_event) {
    const webid = await widgets.askName(dom, store, creationArea, ns.vcard('url'), undefined, WEBID_NOUN)
    if (!webid) {
      return // cancelled by user
    }
    return addOneIdAndRefresh(person, webid)
  }
  function removeDecorated () {
    if (decoratedAutocomplete) {
      creationArea.removeChild(decoratedAutocomplete)
      decoratedAutocomplete = undefined
    }
  }
  async function searchButtonHandler (_event) {
    if (decoratedAutocomplete) {
      creationArea.removeChild(decoratedAutocomplete)
      decoratedAutocomplete = undefined
    } else {
      decoratedAutocomplete = dom.createElement('div') as HTMLElement
      decoratedAutocomplete.setAttribute('style', 'display: flex; flex-flow: wrap;')
      decoratedAutocomplete.appendChild(await renderAutoComplete(dom, acOptions, decoration, autoCompleteDone))
      decoratedAutocomplete.appendChild(acceptButton)
      decoratedAutocomplete.appendChild(cancelButton)
      creationArea.appendChild(decoratedAutocomplete)
    }
  }

  async function droppedURIHandler (uris) {
    for (const webid of uris) { // normally one but can be more than one
      await addOneIdAndRefresh(person, webid)
    }
  }

  // const queryParams = barOptions.queryParameters || wikidataParameters
  const acceptButton = widgets.continueButton(dom)
  const cancelButton = widgets.cancelButton(dom, removeDecorated) // @@ not in edit case only in temporary case
  if (barOptions.permanent) {
    var editButton = widgets.button(dom, icons.iconBase + 'noun_253504.svg', 'Edit')
  }

  const decoration:AutocompleteDecoration = {
    acceptButton, cancelButton, editButton
  }

  var decoratedAutocomplete = undefined as HTMLElement | undefined
  // const { dom } = dataBrowserContext
  // barOptions = barOptions || {}

  const creationArea = dom.createElement('div')
  creationArea.setAttribute('style', 'display: flex; flex-flow: wrap;')

  if (barOptions.editable) {
    // creationArea.appendChild(await renderAutoComplete(dom, barOptions, autoCompleteDone)) wait for searchButton
    creationArea.style.width = '100%'
    const plus = creationArea.appendChild(widgets.button(dom, GREEN_PLUS, barOptions.idNoun, greenButtonHandler))
    widgets.makeDropTarget(plus, droppedURIHandler, undefined)
    if (barOptions.dbLookup) {
      creationArea.appendChild(widgets.button(dom, SEARCH_ICON, barOptions.idNoun, searchButtonHandler))
    }
  }
  return creationArea
} // renderAutocompleteControl

// ends
