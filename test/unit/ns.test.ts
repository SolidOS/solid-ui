import { silenceDebugMessages } from './helpers/debugger'
import ns from '../../src/ns'

silenceDebugMessages()

describe('RDF Namespace', () => {
  it('gives the right URI for rdf:type', () => {
    expect(ns.rdf('type').uri).toEqual('http://www.w3.org/1999/02/22-rdf-syntax-ns#type')
  })
})
