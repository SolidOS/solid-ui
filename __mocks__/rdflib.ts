// @@ TODO: Remove currently untyped methods as they are added

import { IndexedFormula } from 'rdflib'

export {
  BlankNode,
  Collection,
  convert,
  DataFactory,
  Empty,
  Formula,
  // Store, // Not currently supported in @types/rdflib
  // jsonParser, // Not currently supported in @types/rdflib
  Literal,
  log,
  // N3Parser, // Not currently supported in @types/rdflib
  NamedNode,
  Namespace,
  Node,
  parse,
  Query,
  // queryToSPARQL, // Not currently supported in @types/rdflib
  // RDFaProcessor, // Not currently supported in @types/rdflib
  // RDFParser, // Not currently supported in @types/rdflib
  // serialize, // Not currently supported in @types/rdflib
  // Serializer, // Not currently supported in @types/rdflib
  // SPARQLToQuery, // Not currently supported in @types/rdflib
  // sparqlUpdateParser, // Not currently supported in @types/rdflib
  Statement,
  term,
  // UpdatesSocket, // Not currently supported in @types/rdflib
  // UpdatesVia, // Not currently supported in @types/rdflib
  uri,
  Util,
  Variable,
  NextId,
  fromNT,
  graph,
  lit,
  st,
  namedNode as sym,
  blankNode,
  defaultGraph,
  literal,
  namedNode,
  quad,
  triple,
  variable
} from 'rdflib'

export function fetcher (store: any) {
  const fetcher = new Fetcher()
  store.fetcher = fetcher
  return fetcher
}

export class Fetcher {
  requested: any

  constructor () {
    this.requested = {}
  }

  load () {
  }

  nowOrWhenFetched () {
    return Promise.resolve()
  }
}

export class UpdateManager {
  // mock as needed

  editable () {
    return Promise.resolve()
  }

  put () {
    return Promise.resolve()
  }

  update () {
    return Promise.resolve()
  }
}
