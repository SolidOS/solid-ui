import { LiveStore } from 'rdflib'

const throwNoopStoreError = () => {
  throw new Error('Cannot use RDF forms without a store')
}

const NoopStore = new Proxy({} as LiveStore, {
  get: throwNoopStoreError,
  set: throwNoopStoreError,
  has: throwNoopStoreError,
  ownKeys: throwNoopStoreError,
  getOwnPropertyDescriptor: throwNoopStoreError,
  defineProperty: throwNoopStoreError,
  deleteProperty: throwNoopStoreError,
  apply: throwNoopStoreError,
  construct: throwNoopStoreError
}) as LiveStore

export default NoopStore
