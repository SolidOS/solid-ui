import { silenceDebugMessages } from '../../../helpers/setup'
import { JSDOM, DOMWindow } from 'jsdom'
import { sym, NamedNode } from 'rdflib'
import {
  linkIcon,
  createLinkForURI
} from '../../../../src/widgets/buttons/iconLinks'

silenceDebugMessages()
jest.mock('solid-auth-client')
let window: DOMWindow
let dom: HTMLDocument
let element: HTMLDivElement
let obj: NamedNode

beforeEach(() => {
  window = new JSDOM('<!DOCTYPE html><head></head><body><p>Hello world</p></body>').window
  dom = window.document
  element = dom.createElement('div')
  obj = new NamedNode('https://test.test#')
})
describe('linkIcon', () => {
  it('exists', () => {
    expect(linkIcon).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const subject = new NamedNode('https://test.test#')
    const iconURI = ''
    expect(linkIcon(dom, subject, iconURI)).toBeTruthy()
  })
})

describe('createLinkForURI', () => {
  it('creates a Link for a URI element should return with two children a tag and br tag', () => {
    createLinkForURI(dom, element, obj)
    expect(element.children[0].nodeName).toEqual('A')
    expect(element.children[1].nodeName).toEqual('BR')
  })
  it('adds the classList to the anchor tag in the div', () => {
    createLinkForURI(dom, element, obj)
    expect(element.children[0].classList[0]).toEqual('HoverControlHide')
  })
})
