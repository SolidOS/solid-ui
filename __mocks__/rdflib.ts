function sym () {
  return {
    dir: sym
  }
}
export function graph() {
  return {
    any: () => {
      return []
    },
    each: () => {
      return []
    },
    fetcher: {
      load: () => {}
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
