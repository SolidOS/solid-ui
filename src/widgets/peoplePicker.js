/* global $rdf */

/**
 *
 * People Picker Pane
 *
 * This pane offers a mechanism for selecting a set of individuals, groups, or
 * organizations to take some action on.
 *
 */
import escape from 'escape-html'

import { iconBase } from '../iconBase'
import ns from '../ns'
import kb from '../store'

// Note: it's the established pattern to stick all semantic data in the global store.
// This probably means that I'm going to:
//  1) stick all new webIds in the global store
//  2) fetch and store metadata about those webIds in the global store
//  3) keep local track (an ordered set of webIds, for example) of which of those global
//     webIds belong to the people picker.

export default class PeoplePicker {
  constructor (element, handleDonePicking) {
    this.element = element
    this.handleDonePicking = handleDonePicking
    this.pickedWebIds = new Set()
  }

  render () {
    // This could be more efficient and readable using a view library
    const dropContainer = document.createElement('div')
    dropContainer.style.maxWidth = '75%'
    dropContainer.style.minHeight = '200px'
    dropContainer.style.outline = '1px solid black'

    dropContainer.addEventListener('dragOver', event => {
      // This is required to allow a drop; the 'default' handling of a drop is
      // to prevent it
      event.preventDefault()
      // One thing to do is to check the type of the thing being dragged
      // and only prevent default if it's the type of thing we want to allow
      // being dropped
      console.log('drag over!')
      console.log(event)
    })

    dropContainer.addEventListener('dragEnter', event => {
      event.preventDefault()
      console.log('drag enter!')
      console.log(event)
    })

    dropContainer.addEventListener('drop', event => {
      console.log('dropped!')
      console.log(event)
    })

    const peopleUl = document.createElement('ul')
    this.pickedWebIds
      .forEach(webId => {
        const personLi = document.createElement('li')
        new Person(personLi, webId, () => { console.log('not yet handling remove') }).render()
        peopleUl.appendChild(personLi)
      })

    dropContainer.appendChild(peopleUl)

    this.element.innerHTML = ''
    this.element.appendChild(dropContainer)
    return this
  }

  // TODO: make this handle URIs
  // TODO: validate the webIds
  //  - check the solid spec; pretty sure must at least be a foaf:person?
  add (webId) {
    return new Promise((resolve, reject) => {
      kb.fetcher.nowOrWhenFetched(webId, (ok, err) => {
        if (!ok) {
          // TODO: render an error widget with the 'err' message
          reject(err)
        } else {
          this.pickedWebIds.add(webId)
          this.render()
          resolve(webId)
        }
      })
    })
  }
}

class Person {
  constructor (element, webId, handleRemove) {
    this.webId = webId
    this.element = element
    this.handleRemove = handleRemove
  }

  render () {
    const personDiv = document.createElement('div')

    // TODO: take a look at UI.widgets.setName
    const imgSrc = this.getWithDefault(ns.foaf('img'), iconBase + 'noun_15059.svg')
    const profileImg = document.createElement('img')
    profileImg.src = escape(imgSrc)

    // TODO: take a look at UI.widgets.setImage
    const name = this.getWithDefault(ns.foaf('name'), `[${this.webId}]`)
    const nameSpan = document.createElement('span')
    nameSpan.innerHTML = escape(name)

    const removeButton = document.createElement('button')
    removeButton.addEventListener('click', event => this.handleRemove())

    personDiv.appendChild(profileImg)
    personDiv.appendChild(nameSpan)
    personDiv.appendChild(removeButton)

    this.element.innerHTML = ''
    this.element.appendChild(personDiv)
    return this
  }

  getWithDefault (predicate, defaultValue) {
    return kb.anyValue($rdf.namedNode(this.webId), predicate) || defaultValue
  }
}
