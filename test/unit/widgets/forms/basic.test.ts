import { namedNode } from 'rdflib'
import {
  fieldLabel,
  fieldStore,
  basicField
} from '../../../../src/widgets/forms/basic'

describe('fieldLabel', () => {
  it('exists', () => {
    expect(fieldLabel).toBeInstanceOf(Object)
  })
  it('runs', () => {
    // expect(fieldLabel(document, namedNode('http://example.com/#this'), null)).toBeInstanceOf(
    //   HTMLAnchorElement
    // )
  })
  it.skip(' ...', () => {
    // expect(fieldLabel('document', undefined, 'form').toBe())
  })
})

describe('fieldStore', () => {
  it('exists', () => {
    expect(fieldStore).toBeInstanceOf(Object)
  })
  it.skip('runs', () => {
    // expect(fieldStore(null, null, null)).toEqual({
    //   termType: 'NamedNode',
    //   value: 'http://example.com/'
    // })
  })
  it.skip('returns def when there is no matching statement', () => {
    // const statementMatching = jest.fn()
    // statementMatching.mockReturnValueOnce(null)
    // expect(fieldStore('subject', 'predicate', 'def')).toBe('def')
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
