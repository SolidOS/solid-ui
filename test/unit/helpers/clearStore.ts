import store from '../../../src/store'

export function clearStore () {
  store.statements.forEach(statement => store.remove(statement))
}
