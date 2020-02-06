export const Util =  {
  mediaTypeClass: sym
}

export function sym () {
  return {
    dir: sym,
    uri: 'uri',
    value: '',
    doc: () => {
      equals: () => {}
    },
    sameTerm: () => false
  }  
}  

export const uri = {
  join: () => {}
}
export function st() {

}
export function graph() {
  return {
    any: () => {
      return sym()
    },
    each: () => {
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
}
