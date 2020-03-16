import store from '../../../src/store'

export function clearStore () {
  // FIXME: https://github.com/solid/solid-ui/issues/265

  while (store.statements.length) {
    console.log('Clearing store...')
    store.statements.forEach(store.remove.bind(store))
  }
}
