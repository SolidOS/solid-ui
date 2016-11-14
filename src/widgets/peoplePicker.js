/**
 *
 * People Picker Pane
 *
 * This pane offers a mechanism for selecting a set of individuals, groups, or
 * organizations to take some action on.
 *
 */
import escape from 'escape-html'

import { makeDropTarget } from './dragAndDrop'
import { errorMessageBlock } from './error'
import { iconBase } from '../iconBase'
import ns from '../ns'
import rdf from 'rdflib'
import kb from '../store'

export default class PeoplePicker {
  constructor (element, handleDonePicking) {
    this.element = element
    this.handleDonePicking = handleDonePicking
    this.pickedWebIdNodes = new Set()
  }

  render () {
    // This could be more efficient and readable using a view library
    const dropContainer = document.createElement('div')
    dropContainer.style.maxWidth = '350px'
    dropContainer.style.minHeight = '200px'
    dropContainer.style.outline = '1px solid black'
    dropContainer.style.display = 'flex'
    dropContainer.style.flexDirection = 'column'

    makeDropTarget(dropContainer, uris => {
      console.log('uris:', uris)
      uris.map(uri => {
        this.add(uri)
          .then()
          .catch(err => {
            errorMessageBlock(document, 'Could not load the given WebId')
          })
      })
    })

    this.pickedWebIdNodes
      .forEach(webIdNode => {
        const personDiv = document.createElement('div')
        new Person(personDiv, webIdNode, () => { console.log('not yet handling remove') }).render()
        dropContainer.appendChild(personDiv)
      })

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
          // make sure it's a valid person, group, or entity (for now just handle
          // webId)
          const webIdNode = rdf.namedNode(webId)
          const rdfClass = kb.any(webIdNode, ns.rdf('type'))
          if (!rdfClass.equals(ns.foaf('Person'))) {
            reject(new Error('Only people supported right now'))
          }
          this.pickedWebIdNodes.add(webIdNode)
          this.render()
          resolve(webIdNode)
        }
      })
    })
  }
}

class Person {
  constructor (element, webIdNode, handleRemove) {
    this.webIdNode = webIdNode
    this.element = element
    this.handleRemove = handleRemove
  }

  render () {
    const container = document.createElement('div')
    container.style.display = 'flex'

    // TODO: take a look at UI.widgets.setName
    const imgSrc = this.getWithDefault(ns.foaf('img'), iconBase + 'noun_15059.svg')
    const profileImg = document.createElement('img')
    profileImg.src = escape(imgSrc)
    profileImg.width = '50'
    profileImg.height = '50'
    profileImg.style.margin = '5px'

    // TODO: take a look at UI.widgets.setImage
    const name = this.getWithDefault(ns.foaf('name'), `[${this.webIdNode}]`)
    const nameSpan = document.createElement('span')
    nameSpan.innerHTML = escape(name)
    nameSpan.style.flexGrow = '1'
    nameSpan.style.margin = 'auto 0'

    const removeButton = document.createElement('button')
    removeButton.textContent = 'Remove'
    removeButton.addEventListener('click', event => this.handleRemove())
    removeButton.style.margin = '5px'

    container.appendChild(profileImg)
    container.appendChild(nameSpan)
    container.appendChild(removeButton)

    this.element.innerHTML = ''
    this.element.appendChild(container)
    return this
  }

  getWithDefault (predicate, defaultValue) {
    const object = kb.any(this.webIdNode, predicate)
    return object ? object.value : defaultValue
  }
}
