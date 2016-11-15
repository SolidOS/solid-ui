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
  constructor (element, groupGraph, groupNode) {
    this.element = element
    this.groupGraph = groupGraph
    this.groupNode = groupNode
  }

  refresh () {
    // TODO: implement
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
      uris.map(uri => {
        this.add(uri)
          .then()
          .catch(err => {
            errorMessageBlock(document, 'Could not load the given WebId')
          })
      })
    })

    kb.match(this.groupNode, ns.vcard('hasMember'))
      .forEach(statement => {
        const webIdNode = statement.object
        const personDiv = document.createElement('div')
        new Person(personDiv, webIdNode, this.handleRemove(webIdNode)).render()
        dropContainer.appendChild(personDiv)
      })

    this.element.innerHTML = ''
    this.element.appendChild(dropContainer)
    return this
  }

  add (webId) {
    return new Promise((resolve, reject) => {
      kb.fetcher.nowOrWhenFetched(webId, (ok, err) => {
        if (!ok) {
          reject(err)
        } else {
          // make sure it's a valid person, group, or entity (for now just handle
          // webId)
          const webIdNode = rdf.namedNode(webId)
          const rdfClass = kb.any(webIdNode, ns.rdf('type'))
          if (!rdfClass.equals(ns.foaf('Person'))) {
            reject(new Error('Only people supported right now'))
          }
          // TODO: sync this back to the server
          const statement = [this.groupNode, ns.vcard('hasMember'), webIdNode, this.groupGraph]
          if (kb.match(...statement).length < 1) {
            kb.add(...statement)
          }
          this.render()
          resolve(webIdNode)
        }
      })
    })
  }

  handleRemove (webIdNode) {
    return event => {
      kb.remove(rdf.st(this.groupNode, ns.vcard('hasMember'), webIdNode, this.groupGraph))
      this.render()
      return true
    }
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
