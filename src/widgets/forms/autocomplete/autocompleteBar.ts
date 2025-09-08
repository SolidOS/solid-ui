/* The Autocomplete Control with decorations

This control has the buttons which control the state between editing, viewing, searching, accepting
and so on.  See the state diagram in the documentation.  The AUtocomplete Picker does the main work.

*/
import ns from '../../../ns'
import { icons } from '../../../iconBase'
import { store } from 'solid-logic'
import * as widgets from '../../../widgets'
import * as utils from '../../../utils'

import { renderAutoComplete, AutocompleteDecoration, setVisible } from './autocompletePicker' // dbpediaParameters

import { NamedNode } from 'rdflib'

const WEBID_NOUN = 'Solid ID'

const GREEN_PLUS = icons.iconBase + 'noun_34653_green.svg'
const SEARCH_ICON = icons.iconBase + 'noun_Search_875351.svg'
const EDIT_ICON = icons.iconBase + 'noun_253504.svg'
// const DELETE_ICON = icons.iconBase + 'noun_2188_red.svg'

export async function renderAutocompleteControl (dom:HTMLDocument,
  person:NamedNode,
  barOptions,
  acOptions,
  addOneIdAndRefresh,
  deleteOne): Promise<HTMLElement> {
  async function autoCompleteDone (object, name) {
    if (acOptions.permanent) { // remember to set this in publicid panel
      setVisible(editButton, true)
      setVisible(acceptButton, false)
      setVisible(cancelButton, false)
    } else {
      // console.log('temporary - removed decoratiion')
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
    // console.log('@@ acceptButton', acceptButton)
    decoratedAutocomplete.appendChild(acceptButton)
    // console.log('@@ cancelButton', cancelButton)

    decoratedAutocomplete.appendChild(cancelButton)
    // console.log('@@ editButton', editButton)

    decoratedAutocomplete.appendChild(editButton)
    // console.log('@@ deleteButtonContainer', deleteButtonContainer)

    decoratedAutocomplete.appendChild(deleteButtonContainer)
    creationArea.appendChild(decoratedAutocomplete)
  }

  async function searchButtonHandler (_event) {
    if (decoratedAutocomplete) {
      creationArea.removeChild(decoratedAutocomplete)
      decoratedAutocomplete = undefined
    } else {
      await displayAutocomplete()
    }
  }

  async function droppedURIHandler (uris) {
    for (const webid of uris) { // normally one but can be more than one
      await addOneIdAndRefresh(person, webid)
    }
  }

  const acceptButton = widgets.continueButton(dom)
  acceptButton.setAttribute('data-testid', 'accept-button')

  const cancelButton = widgets.cancelButton(dom)
  cancelButton.setAttribute('data-testid', 'cancel-button')
  const deleteButtonContainer = dom.createElement('div')
  const noun = acOptions.targetClass ? utils.label(acOptions.targetClass) : 'item'
  const deleteButton = widgets.deleteButtonWithCheck(dom, deleteButtonContainer, noun, deleteOne) // need to knock out this UI or caller does that
  deleteButton.setAttribute('data-testid', 'delete-button')
  const editButton = widgets.button(dom, EDIT_ICON, 'Edit', _event => {
    editing = !editing
    syncEditingStatus()
  })
  editButton.setAttribute('data-testid', 'edit-button')
  let editing = true

  function syncEditingStatus () {
    if (editing) {
      setVisible(editButton, false)
      setVisible(acceptButton, false) // not till got it
      setVisible(cancelButton, false)
    } else {
      setVisible(editButton, true)
      setVisible(acceptButton, false)
      setVisible(cancelButton, false)
    }
  }

  const decoration:AutocompleteDecoration = {
    acceptButton, cancelButton, editButton, deleteButton
  }

  let decoratedAutocomplete = undefined as HTMLElement | undefined

  const creationArea = dom.createElement('div')
  creationArea.style.display = 'flex'
  creationArea.style.flexDirection = 'row'

  if (acOptions.permanent || acOptions.currentObject) {
    await displayAutocomplete()
  }
  if (barOptions.editable) {
    // creationArea.appendChild(await renderAutoComplete(dom, barOptions, autoCompleteDone)) wait for searchButton
    creationArea.style.width = '100%'
    if (barOptions.manualURIEntry) {
      const plus = creationArea.appendChild(widgets.button(dom, GREEN_PLUS, barOptions.idNoun, greenButtonHandler))
      widgets.makeDropTarget(plus, droppedURIHandler, undefined)
    }
    if (barOptions.dbLookup && !acOptions.currentObject && !acOptions.permanent) {
      creationArea.appendChild(widgets.button(dom, SEARCH_ICON, barOptions.idNoun, searchButtonHandler))
    }
  }
  syncEditingStatus()
  return creationArea
} // renderAutocompleteControl

// ends
