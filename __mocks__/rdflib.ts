export const Util =  {
  mediaTypeClass: sym
}

export function sym () {
  return {
    dir: sym,
    uri: 'uri',
    value: '',
    elements: [],
    doc: () => {
      return {
        equals: () => {},
        value: ''
      }
    },
    sameTerm: () => false
  }  
}  

export const uri = {
  join: () => {}
}
export function st() {
}

export function literal() {
}
export class Query {
  vars: any
  pat: any
  constructor () {
    this.vars = []
    this.pat = {
      add() {}
    }
  }
}

export function variable () {
}

export function graph() {
  return new Graph()
}
class Graph {
  mockStatements
  fetcher
  constructor() {
    this.mockStatements = []
    this.fetcher = new Fetcher()
  }
  any () {
    return sym()
  }
  // see https://linkeddata.github.io/rdflib.js/doc/classes/indexedformula.html#each
  each (s, p, o, g) {
    console.log('each', s, p, o, g, this.mockStatements)
    if (s === undefined) {
      console.log('getting subjects')
      return this.mockStatements
        .filter(statement => p.uri === statement.p.uri)
        .filter(statement => o.uri === statement.o.uri)
        .filter(statement => g.uri === statement.g.uri)
        .map(statement => statement.s)
    }
    if (p === undefined) {
      return this.mockStatements
        .filter(statement => s.uri === statement.s.uri)
        .filter(statement => o.uri === statement.o.uri)
        .filter(statement => g.uri === statement.g.uri)
        .map(statement => statement.p)
    }
    if (o === undefined) {
      return this.mockStatements
        .filter(statement => s.uri === statement.s.uri)
        .filter(statement => p.uri === statement.p.uri)
        .filter(statement => g.uri === statement.g.uri)
        .map(statement => statement.o)
    }
    if (g === undefined) {
      return this.mockStatements
        .filter(statement => s.uri === statement.s.uri)
        .filter(statement => p.uri === statement.p.uri)
        .filter(statement => o.uri === statement.o.uri)
        .map(statement => statement.g)
    }
  }
  match () {
    return []
  }
  query () {
    return []
  }
  findTypeURIs () {
    return []
  }
  findSuperClassesNT () {
    return []
  }
  bottomTypeURIs () {
    return []
  }
  statementsMatching () {
    return []
  }
  sym () {
    return sym()
  }
}

export function fetcher() {
  return new Fetcher()
}
export class Fetcher {
  requested: any
  constructor() {
    this.requested = {}
  }
  load () {
  }
  nowOrWhenFetched () {
    return Promise.resolve()
  }
}
export function namedNode(str: string) {
  return {
    uri: str
  }
}
export function NamedNode() {
}
export function Namespace() {
  return () => {}
}
export class UpdateManager {
  editable() {}
  update() {}
}
