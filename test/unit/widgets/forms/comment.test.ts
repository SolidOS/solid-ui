import { silenceDebugMessages } from '../../../helpers/setup'
import { namedNode } from 'rdflib'
import ns from '../../../../src/ns'
import { solidLogicSingleton, store } from 'solid-logic'

/*
import {
  commentField
} from '../../../../src/widgets/forms/comment'
*/
import { clearStore } from '../../helpers/clearStore'

import { field } from '../../../../src/widgets/forms'
// const commentField = {} // @@@@@@

silenceDebugMessages()
afterEach(clearStore)

const commentField = field[ns.ui('Comment').uri] // importing directly leads to chaos

describe('Comment', () => {
  it('index exists', () => {
    expect(field).toBeInstanceOf(Object)
  })
  it('exists', () => {
    expect(field[ns.ui('Comment').uri]).toBeInstanceOf(Function)
  })

  it('objects to no contents', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const dataDoc = namedNode('http://example.com/#store')
    store.add(form, ns.ui('property'), ns.vcard('fn'), form.doc())
    const callbackFunction = jest.fn() // TODO: https://github.com/solidos/solid-ui/issues/263
    expect(
      field[ns.ui('Comment').uri](
        document,
        container,
        already,
        subject,
        form,
        dataDoc,
        callbackFunction
      ).innerHTML
    ).toContain('No contents in comment field')
  })

  it('Makes a field', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const dataDoc = namedNode('http://example.com/#store')
    store.add(form, ns.ui('property'), ns.vcard('fn'), form.doc())
    store.add(form, ns.ui('contents'), 'Hello World!', form.doc())
    const callbackFunction = jest.fn() // TODO: https://github.com/solidos/solid-ui/issues/263
    expect(
      field[ns.ui('Comment').uri](
        document,
        container,
        already,
        subject,
        form,
        dataDoc,
        callbackFunction
      ).innerHTML
    ).toContain('Hello World')
  })

  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
    const callbackFunction = jest.fn() // TODO: https://github.com/solidos/solid-ui/issues/263
    solidLogicSingleton.store.add(form, ns.rdf('type'), ns.ui('Comment'), namedNode('http://example.com/'))
    solidLogicSingleton.store.add(form, ns.ui('contents'), namedNode('http://example.com/#bla'), namedNode('http://example.com/'))
    expect(
      commentField(
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
  it('deals with missing content', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
    const callbackFunction = jest.fn() // TODO: https://github.com/solidos/solid-ui/issues/263
    solidLogicSingleton.store.add(form, ns.rdf('type'), ns.ui('Comment'), namedNode('http://example.com/'))
    expect(
      commentField(
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
  it('deals with missing field params in non-bottom field type', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
    const callbackFunction = jest.fn() // TODO: https://github.com/solidos/solid-ui/issues/263
    solidLogicSingleton.store.add(form, ns.rdf('type'), namedNode('http://example.com/#custom2'), namedNode('http://example.com/'))
    solidLogicSingleton.store.add(namedNode('http://example.com/#custom2'), ns.rdfs('subClassOf'), namedNode('http://example.com/#custom1'), namedNode('http://example.com/'))
    solidLogicSingleton.store.add(form, ns.ui('contents'), namedNode('http://example.com/#bla'), namedNode('http://example.com/'))

    expect(
      commentField(
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
  it('deals with missing container', () => {
    const already = {}
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
    const callbackFunction = jest.fn() // TODO: https://github.com/solidos/solid-ui/issues/263
    solidLogicSingleton.store.add(form, ns.rdf('type'), ns.ui('Comment'), namedNode('http://example.com/'))
    solidLogicSingleton.store.add(form, ns.ui('contents'), namedNode('http://example.com/#bla'), namedNode('http://example.com/'))
    expect(
      commentField(
        document,
        undefined,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchSnapshot()
  })
  it('deals with custom style', () => {
    const already = {}
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
    const callbackFunction = jest.fn() // TODO: https://github.com/solidos/solid-ui/issues/263
    solidLogicSingleton.store.add(form, ns.rdf('type'), ns.ui('Comment'), namedNode('http://example.com/'))
    solidLogicSingleton.store.add(form, ns.ui('style'), 'custom: true;', namedNode('http://example.com/'))
    solidLogicSingleton.store.add(form, ns.ui('contents'), namedNode('http://example.com/#bla'), namedNode('http://example.com/'))
    expect(
      commentField(
        document,
        undefined,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchSnapshot()
  })
})
