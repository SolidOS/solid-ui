// @@ TODO: Remove currently untyped methods as they are added

// Use require() to load the actual rdflib module, bypassing Jest mock interception
// eslint-disable-next-line @typescript-eslint/no-require-imports
const rdflib = require('rdflib')

export const IndexedFormula = rdflib.IndexedFormula
export const BlankNode = rdflib.BlankNode
export const Collection = rdflib.Collection
export const convert = rdflib.convert
export const DataFactory = rdflib.DataFactory
export const Empty = rdflib.Empty
export const Formula = rdflib.Formula
export const Literal = rdflib.Literal
export const log = rdflib.log
export const NamedNode = rdflib.NamedNode
export const Namespace = rdflib.Namespace
export const Node = rdflib.Node
export const parse = rdflib.parse
export const Query = rdflib.Query
export const Statement = rdflib.Statement
export const term = rdflib.term
export const uri = rdflib.uri
export const Util = rdflib.Util
export const Variable = rdflib.Variable
export const NextId = rdflib.NextId
export const fromNT = rdflib.fromNT
export const graph = rdflib.graph
export const lit = rdflib.lit
export const st = rdflib.st
export const sym = rdflib.namedNode
export const blankNode = rdflib.blankNode
export const defaultGraph = rdflib.defaultGraph
export const literal = rdflib.literal
export const namedNode = rdflib.namedNode
export const quad = rdflib.quad
export const triple = rdflib.triple
export const variable = rdflib.variable

export function fetcher (store: any) {
  const fetcher = new Fetcher()
  store.fetcher = fetcher
  return fetcher
}

export class Fetcher {
  requested: any
  nonexistent = {}

  constructor () {
    this.requested = {}
  }

  load () {
    return Promise.resolve()
  }

  nowOrWhenFetched () {
    return Promise.resolve()
  }
}

export class UpdateManager {
  // mock as needed
  updated: boolean = false
  reportSuccess: boolean = true

  editable (uri: string) {
    if (uri === 'http://not.editable/') {
      return false
    }
    return true
  }

  put () {
    return Promise.resolve()
  }

  update (_deletes, _inserts, onDone: (uri: string, ok: boolean, body: string) => void) {
    this.updated = true
    onDone('uri', this.reportSuccess, 'body')
    return Promise.resolve()
  }

  addDownstreamChangeListener () {
  }
}
