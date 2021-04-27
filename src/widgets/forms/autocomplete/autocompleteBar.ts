// The Control with decorations

// import { ns, widgets, store } from 'solid-ui'

// import { ns, widgets, store, icons } from '../../../index'
/* eslint-disable no-console */

import * as ns from '../../../ns'
import { icons } from '../../../iconBase'
import { store } from '../../../logic'
import * as widgets from '../../../widgets'

import { renderAutoComplete, AutocompleteDecoration } from './autocompletePicker' // dbpediaParameters

import { NamedNode } from 'rdflib'
// import { wikidataParameters } from './publicData'

const WEBID_NOUN = 'Solid ID'

const GREEN_PLUS = icons.iconBase + 'noun_34653_green.svg'
const SEARCH_ICON = icons.iconBase + 'noun_Search_875351.svg'
const EDIT_ICON = icons.iconBase + 'noun_253504.svg'

export async function renderAutocompleteControl (dom:HTMLDocument,
  person:NamedNode,
  barOptions,
  acOptions,
  addOneIdAndRefresh): Promise<HTMLElement> {
  async function autoCompleteDone (object, name) {
    if (barOptions.permanent) { // remember to set this in publicid panel
      setVisible(editButton, true)
      setVisible(acceptButton, false)
      setVisible(cancelButton, false)
    } else {
      console.log('temporary - removed decoratiion')
      removeDecorated()
    }
    return addOneIdAndRefresh(object, name)
  }

  async function greenButtonHandler (_event) {
    const webid = await widgets.askName(dom, store, creationArea, ns.vcard('url'), undefined, WEBID_NOUN)
    if (!webid) {
      return // cancelled by user
    }
    return addOneIdAndRefresh(person, webid)
  }

  function cancelButtonHandler (_event) {
    removeDecorated()
    if (barOptions.permanent) {
      displayAutocomplete()
    }
  }
  function removeDecorated () {
    if (decoratedAutocomplete) {
      creationArea.removeChild(decoratedAutocomplete)
      decoratedAutocomplete = undefined
    }
  }

  async function displayAutocomplete () {
    decoratedAutocomplete = dom.createElement('div') as HTMLElement
    decoratedAutocomplete.setAttribute('style', 'display: flex; flex-flow: wrap;')
    decoratedAutocomplete.appendChild(await renderAutoComplete(dom, acOptions, decoration, autoCompleteDone))
    decoratedAutocomplete.appendChild(acceptButton)
    decoratedAutocomplete.appendChild(cancelButton)
    creationArea.appendChild(decoratedAutocomplete)
  }

  async function searchButtonHandler (_event) {
    if (decoratedAutocomplete) {
      creationArea.removeChild(decoratedAutocomplete)
      decoratedAutocomplete = undefined
    } else {
      displayAutocomplete()
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
  let editButton
  let editing = true

  function setVisible (element:HTMLElement, visible:boolean) {
    element.style.visibility = visible ? 'visible' : 'collapse'
  }

  function syncEditingStatus () {
    if (editing) {
      setVisible(editButton, false)
      setVisible(acceptButton, true)
      setVisible(cancelButton, true)
    } else {
      setVisible(editButton, true)
      setVisible(acceptButton, false)
      setVisible(cancelButton, false)
    }
  }

  const decoration:AutocompleteDecoration = {
    acceptButton, cancelButton, editButton
  }

  let decoratedAutocomplete = undefined as HTMLElement | undefined
  // const { dom } = dataBrowserContext
  // barOptions = barOptions || {}

  const creationArea = dom.createElement('div')
  creationArea.setAttribute('style', 'display: flex; flex-flow: wrap;')

  if (barOptions.editable) {
    // creationArea.appendChild(await renderAutoComplete(dom, barOptions, autoCompleteDone)) wait for searchButton
    creationArea.style.width = '100%'
    if (barOptions.manualURIEntry) {
      const plus = creationArea.appendChild(widgets.button(dom, GREEN_PLUS, barOptions.idNoun, greenButtonHandler))
      widgets.makeDropTarget(plus, droppedURIHandler, undefined)
    }
    if (barOptions.dbLookup && !acOptions.currentObject && !barOptions.permanent) {
      creationArea.appendChild(widgets.button(dom, SEARCH_ICON, barOptions.idNoun, searchButtonHandler))
    }
    if (barOptions.permanent && barOptions.editable) {
      editButton = widgets.button(dom, EDIT_ICON, 'Edit', _event => {
        editing = !editing
        syncEditingStatus()
      })
      creationArea.appendChild(editButton)
    }
  }
  if (barOptions.permanent || acOptions.currentObject) {
    displayAutocomplete()
  }
  syncEditingStatus()
  return creationArea
} // renderAutocompleteControl

// ends
