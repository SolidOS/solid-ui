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
  return {
    any: () => {
      return sym()
    },
    each: () => {
      return []
    },
    match: () => {
      return []
    },
    query: () => {
      return []
    },
    fetcher: {
      load: () => {},
      nowOrWhenFetched: () => Promise.resolve()
    },
    findTypeURIs: () => {
      return []
    },
    findSuperClassesNT: () => {
      return []
    },
    bottomTypeURIs: () => {
      return []
    },
    statementsMatching: () => {
      return []
    },
    sym
  }
}
export function fetcher() {
  return {}
}
export class Fetcher {
  requested: any
  constructor() {
    this.requested = {}
  }
  load () {
  }
}
export function namedNode() {
  return {}
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
