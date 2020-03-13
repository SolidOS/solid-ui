import { namedNode } from 'rdflib'
import ns from '../../../../src/ns'
import uiStore from '../../../../src/store'

import {
  fieldFunction,
  mostSpecificClassURI
} from '../../../../src/widgets/forms/fieldFunction'

describe('mostSpecificClassURI', () => {
  it('exists', () => {
    expect(mostSpecificClassURI).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const form = namedNode('http://example.com/#form')
    uiStore.add(form, ns.rdf('type'), namedNode('http://example.com/#type'), namedNode('http://example.com/'))
    expect(mostSpecificClassURI(form)).toEqual('http://example.com/#type')
  })
})

describe('fieldFunction', () => {
  it('exists', () => {
    expect(fieldFunction).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(fieldFunction(document, namedNode('http://example.com/#this'))).toBeInstanceOf(Function)
  })
})
