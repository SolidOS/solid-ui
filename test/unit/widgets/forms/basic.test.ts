import { namedNode } from 'rdflib'
import {
  fieldLabel,
  fieldStore,
  basicField
} from '../../../../src/widgets/forms/basic'
import { store, ns } from '../../../../src/'
import { clearStore } from '../../helpers/clearStore'

afterEach(clearStore)

describe('fieldLabel', () => {
  it('exists', () => {
    expect(fieldLabel).toBeInstanceOf(Function)
  })
  const predicates = [
    ns.ui('label'),
    ns.link('message'),
    ns.vcard('fn'),
    ns.foaf('name'),
    ns.dct('title'),
    ns.dc('title'),
    ns.rss('title'),
    ns.contact('fullName'),
    namedNode('http://www.w3.org/2001/04/roadmap/org#name'),
    ns.cal('summary'),
    ns.foaf('nick'),
    ns.rdfs('label')
  ]
  for (let i = 0; i < predicates.length; i++) {
    it(`checks for ${predicates[i]}`, () => {
      for (let j = i; j < predicates.length; j++) {
        store.add(namedNode('http://example.com/#this'), predicates[j], `from ${predicates[j]}`, namedNode('http://example.com/'))
      }
      const anchorElement = fieldLabel(document, namedNode('http://example.com/#this'), namedNode('http://example.com/#this'))
      const firstChar = (i === 0 ? 'f' : 'F')
      const expectedLabel = `${firstChar}rom &lt;${predicates[i].uri}&gt;`
      expect((anchorElement as HTMLElement).innerHTML).toEqual(expectedLabel)
    })
  }
  it('sets the property as the href', () => {
    store.add(namedNode('http://example.com/#this'), predicates[0], `from ${predicates[0]}`, namedNode('http://example.com/'))
    const anchorElement = fieldLabel(document, namedNode('http://example.com/#the-property'), namedNode('http://example.com/#this'))
    const expectedHref = 'http://example.com/#the-property'
    expect((anchorElement as HTMLAnchorElement).href).toEqual(expectedHref)
  })
  it('sets the style', () => {
    store.add(namedNode('http://example.com/#this'), predicates[0], `from ${predicates[0]}`, namedNode('http://example.com/'))
    const anchorElement = fieldLabel(document, namedNode('http://example.com/#the-property'), namedNode('http://example.com/#this'))
    const expectedStyle = 'color: #3B5998; text-decoration: none;'
    expect((anchorElement as HTMLAnchorElement).getAttribute('style')).toEqual(expectedStyle)
  })
  it('shows an error if property is undefined', () => {
    store.add(namedNode('http://example.com/#this'), predicates[0], `from ${predicates[0]}`, namedNode('http://example.com/'))
    const textNode = fieldLabel(document, undefined, namedNode('http://example.com/#this'))
    const expectedText = '@@Internal error: undefined property'
    expect((textNode as Text).wholeText).toEqual(expectedText)
  })
  it.skip(' ...', () => {
    // expect(fieldLabel('document', undefined, 'form').toBe())
  })
})

describe('fieldStore', () => {
  it('exists', () => {
    expect(fieldStore).toBeInstanceOf(Object)
  })
  it('returns the first matching why, if editable', () => {
    store.add(namedNode('http://example.com/#s'), namedNode('http://example.com/#p'), namedNode('http://example.com/#o1'), namedNode('http://why1.com/'))
    store.add(namedNode('http://example.com/#s'), namedNode('http://example.com/#p'), namedNode('http://example.com/#o2'), namedNode('http://why2.com/'))

    expect(fieldStore(namedNode('http://example.com/#s'), namedNode('http://example.com/#p'), namedNode('http://example.com/#def'))).toEqual({
      termType: 'NamedNode',
      value: 'http://why1.com/'
    })
  })
  it('returns def if the first matching why is not editable', () => {
    store.add(namedNode('http://example.com/#s'), namedNode('http://example.com/#p'), namedNode('http://example.com/#o1'), 'some literal 1')
    store.add(namedNode('http://example.com/#s'), namedNode('http://example.com/#p'), namedNode('http://example.com/#o2'), 'some literal 2')

    expect(fieldStore(namedNode('http://example.com/#s'), namedNode('http://example.com/#p'), namedNode('http://def.com/'))).toEqual({
      termType: 'NamedNode',
      value: 'http://def.com/'
    })
  })
  it('returns def when there is no matching statement', () => {
    expect(fieldStore(namedNode('http://example.com/#s'), namedNode('http://example.com/#p'), namedNode('http://def.com/'))).toEqual({
      termType: 'NamedNode',
      value: 'http://def.com/'
    })
  })
})

describe('basicField', () => {
  it('exists', () => {
    expect(fieldStore).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
    const callbackFunction = jest.fn() // TODO: https://github.com/solid/solid-ui/issues/263
    expect(
      basicField(
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchSnapshot()
  })
})
