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
  it('creates a basic field', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const doc = namedNode('http://example.com/#doc')
    const callbackFunction = jest.fn() // TODO: https://github.com/solid/solid-ui/issues/263
    store.add(form, ns.ui('property'), namedNode('http://example.com/#some-property'), namedNode('http://example.com/'))

    const result = basicField(
      document,
      container,
      already,
      subject,
      form,
      doc,
      callbackFunction
    )
    expect(result).toMatchSnapshot()
  })
  it('Can derive the doc if undefined', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const doc = undefined
    const callbackFunction = jest.fn() // TODO: https://github.com/solid/solid-ui/issues/263
    store.add(form, ns.ui('property'), namedNode('http://example.com/#some-property'), namedNode('http://example.com/'))
    // Let it derive the correct doc from this:
    store.add(subject, namedNode('http://example.com/#some-property'), namedNode('http://example.com/#o1'), namedNode('http://why1.com/'))

    const result = basicField(
      document,
      container,
      already,
      subject,
      form,
      doc,
      callbackFunction
    )
    // From the fact that it's picking up the 'http://example.com/#o1' object
    // and that apparently it didn't error on line
    // https://github.com/solid/solid-ui/blob/660ab45/src/widgets/forms/basic.ts#L135
    // we can conclude that it successfully chose namedNode('http://why1.com/')
    // as the value for `doc`.
    expect((result.childNodes[1].childNodes[0] as HTMLInputElement).value).toEqual('http://example.com/#o1')
  })

  it('Sets the current value from rdflib', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const property = namedNode('http://example.com/#some-property')
    const doc = namedNode('http://example.com/')
    const callbackFunction = jest.fn() // TODO: https://github.com/solid/solid-ui/issues/263
    store.add(form, ns.ui('property'), property, doc)
    store.add(subject, property, 'current value', doc)

    const result = basicField(
      document,
      container,
      already,
      subject,
      form,
      doc,
      callbackFunction
    )
    expect((result.childNodes[1].childNodes[0] as HTMLInputElement).value).toEqual('current value')
  })

  it('Can read uriPrefix from fieldParams', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const formType = namedNode('http://www.w3.org/ns/ui#PhoneField')
    const property = namedNode('http://example.com/#some-property')
    const doc = namedNode('http://example.com/')
    const callbackFunction = jest.fn() // TODO: https://github.com/solid/solid-ui/issues/263
    store.add(form, ns.rdf('type'), formType, doc)
    store.add(form, ns.ui('property'), property, doc)
    store.add(subject, property, namedNode('tel:123412341234'), doc)

    const result = basicField(
      document,
      container,
      already,
      subject,
      form,
      doc,
      callbackFunction
    )
    expect((result.childNodes[1].childNodes[0] as HTMLInputElement).value).toEqual('123412341234')
  })

  it('Shows as readOnly if not editable', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const property = namedNode('http://example.com/#some-property')
    const doc = namedNode('http://not.editable/')
    const callbackFunction = jest.fn() // TODO: https://github.com/solid/solid-ui/issues/263
    store.add(form, ns.ui('property'), property, doc)
    store.add(subject, property, 'set in stone', doc)

    const result = basicField(
      document,
      container,
      already,
      subject,
      form,
      doc,
      callbackFunction
    )
    expect((result.childNodes[1].childNodes[0] as HTMLInputElement).readOnly).toEqual(true)
  })

  it('shows error if no property given', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
    const callbackFunction = jest.fn() // TODO: https://github.com/solid/solid-ui/issues/263
    const result = basicField(
      document,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )
    expect(result).toMatchSnapshot()
  })
})
