import { silenceDebugMessages } from '../../helpers/setup'
import { JSDOM, DOMWindow } from 'jsdom'
import {
  wrapDivInATR,
  addClickListenerToElement,
  createLinkForURI
} from '../../../src/widgets/widgetHelpers'
import { NamedNode } from 'rdflib'
// @ts-ignore
import { iconBase } from '../../../src/iconBase'
import { clearStore } from '../helpers/clearStore'
import { domWithHead } from '../../helpers/dom-with-head'
import { solidLogicSingleton } from '../../../src/logic'

silenceDebugMessages()
jest.mock('solid-auth-client') // not sure if I need this
let window: DOMWindow
let dom: HTMLDocument
let element: HTMLDivElement
let event: Event
let clickEvent: Event
// before Each and afterAll need to go in a high level describe
beforeEach(() => {
  window = new JSDOM('<!DOCTYPE html><head></head><body><p>Hello world</p></body>').window
  dom = window.document
  element = dom.createElement('div')
  event = new window.Event('test')
  clickEvent = new window.Event('click')
  dom.dispatchEvent(event)
})
afterAll(clearStore)
describe('wrapDivInATR', () => {
  const subject = new NamedNode('https://subject#')
  it('is NOT exposed on public API', () => {
    // expect(wrapDivInATR).toBeFalsy
  })
  it('returns a tr', () => {
    wrapDivInATR(dom, element, subject)
  })
})

describe('addClickListenerToElement', () => {
  // create a click event
  it('is NOT exposed on public API', () => {
  // expect(addClickListenerToElement).toBeFalsy
  })
  // return a div with a click event
  // addClickListenerToElement(element, clickEvent)
})

describe('createLinkForURI', () => {
  // create a linkIcon
  it('is NOT exposed on public API', () => {
  // expect(createLinkForURI).toBeFalsy
  })
  // createLinkForURI(dom, element, linkIcon)
  /*   {
  const anchor = linkDiv.appendChild(linkIcon)
  anchor.classList.add('HoverControlHide')
  linkDiv.appendChild(dom.createElement('br'))
} */
})
