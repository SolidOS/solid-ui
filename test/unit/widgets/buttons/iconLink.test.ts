import { beforeEach, describe, expect, it } from 'vitest'
import { silenceDebugMessages } from '../../helpers/debugger'
import { JSDOM, DOMWindow } from 'jsdom'
import { NamedNode } from 'rdflib'
import {
  linkIcon,
  createLinkForURI
} from '../../../../src/widgets/buttons/iconLinks'

silenceDebugMessages()
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

  it('renders the shared Lucide component with a neutral color and accessible link name', () => {
    const anchor = linkIcon(dom, obj)
    const icon = anchor.querySelector<HTMLElement>('icon-lucide-square-arrow-out-up-right')!
    expect(icon).not.toBeNull()
    expect(icon.getAttribute('aria-hidden')).toBe('true')
    expect(icon.style.width).toBe('1em')
    expect(icon.style.height).toBe('1em')
    expect(icon.style.margin).toBe('0.2em')
    expect(icon.style.color).toBe('var(--color-text-secondary, #4A5565)')
    expect(anchor.getAttribute('href')).toBe(obj.value)
    expect(anchor.getAttribute('target')).toBe('_blank')
    expect(anchor.getAttribute('aria-label')).toBe('Open resource')
    expect(anchor.querySelector('img')).toBeNull()
  })

  it('preserves explicitly supplied image icons and non-HTTP link behavior', () => {
    const anchor = linkIcon(dom, new NamedNode('mailto:friend@example.com'), 'https://example.com/custom.svg')
    expect(anchor.querySelector('img')?.getAttribute('src')).toBe('https://example.com/custom.svg')
    expect(anchor.querySelector('img')?.style.margin).toBe('0.3em')
    expect(anchor.querySelector('icon-lucide-square-arrow-out-up-right')).toBeNull()
    expect(anchor.hasAttribute('target')).toBe(false)
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
