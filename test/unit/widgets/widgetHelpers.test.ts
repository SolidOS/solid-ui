import { silenceDebugMessages } from '../../helpers/setup'
import { JSDOM, DOMWindow } from 'jsdom'
import { namedNode } from 'rdflib'
import {
  wrapDivInATR,
  addClickListenerToElement,
  createLinkForURI,
  createImageDiv
} from '../../../src/widgets/widgetHelpers'
import {
  imageDivStyle
} from '../../../src/style'

silenceDebugMessages()
let window: DOMWindow
let dom: HTMLDocument
let element: HTMLDivElement
let image: HTMLImageElement
let linkIcon: HTMLAnchorElement
let clickEvent: Event

beforeEach(() => {
  window = new JSDOM('<!DOCTYPE html><head></head><body><p>Hello world</p></body>').window
  dom = window.document
  element = dom.createElement('div')
  image = dom.createElement('img')
  linkIcon = dom.createElement('a')
  clickEvent = new window.Event('click')
  dom.dispatchEvent(clickEvent)
})
describe('wrapDivInATR ', () => {
  const obj = namedNode('https://test.com/#name')
  it('wraps a given div in a tr and td', () => {
    wrapDivInATR(dom, element, obj)
    expect(element.parentElement.nodeName).toEqual('TD')
    expect(element.parentElement.parentElement.nodeName).toEqual('TR')
  })
})

describe('addClickListenerToElement', () => {
  const onClickFunction = () => { return true }

  it('adds the click function to the div', () => {
    addClickListenerToElement(element, onClickFunction)
    // simulate doesn't work on a Div Element, not sure if I should try spy/mock...
  })
})

describe('createLinkForURI', () => {
  it('creates a Link for a URI element should return with two children a tag and br tag', () => {
    createLinkForURI(dom, element, linkIcon)
    expect(element.children[0].nodeName).toEqual('A')
    expect(element.children[1].nodeName).toEqual('BR')
  })
  it('adds the classList to the div', () => {
    createLinkForURI(dom, element, linkIcon)
    expect(linkIcon.classList[0]).toEqual('HoverControlHide')
  })
})

describe('createImageDiv', () => {
  it('creates a div for the image and attaches them to the element', () => {
    createImageDiv(dom, element, image)
    expect(image.parentElement.nodeName).toEqual('DIV')
    expect(element.children[0].nodeName).toEqual('DIV')
  })

  it('adds the style to the div', () => {
    createImageDiv(dom, element, image)
    expect(element.children[0].getAttribute('style')).toEqual(imageDivStyle)
  })

  it('changes image to not draggable so that it does not move without the div', () => {
    createImageDiv(dom, element, image)
    expect(image.getAttribute('draggable')).toEqual('false')
  })
})
