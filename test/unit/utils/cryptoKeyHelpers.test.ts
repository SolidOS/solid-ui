import { store } from 'solid-logic'
import Fetcher from 'rdflib/lib/fetcher'
import { getKeyIfExists, pubKeyUrl, privKeyUrl, getPodRoot, getExistingPublicKey, getExistingPrivateKey } from '../../../src/utils/cryptoKeyHelpers'
import { NamedNode } from 'rdflib'

store.fetcher.load = jest.fn().mockImplementation(() => {})
store.fetcher.webOperation = jest.fn()
store.each = jest.fn()
store.any = jest.fn()

describe('cryptoKeyHelpers', () => {
  describe.skip('pubKeyUrl', () => {
    // want to check a success and an error
    it('returns the url for the public key', () => {
      const webId = new NamedNode('https://alice.solid.example/profile/card#me')
      const result = pubKeyUrl(webId)
      expect(result).toEqual('https://alice.solid.example/profile/keys/publicKey.ttl')
    })
  })

  describe('getExistingPrivateKey', () => {
    // want to make sure that getKeyIfExists is called with correct parameters
    it('returns...', () => {

    })
  })
  describe('privateKeyExists', () => {
    // want to make sure that getKeyIfExists is called with correct parameters
    it('returns...', () => {

    })
  })
  describe.skip('privKeyUrl', () => {
    it('returns...', () => {
      const result = privKeyUrl('https://alice.solid.example/profile/card#me')
      expect(result).toEqual('https://alice.solid.example/profile/keys/privateKey.ttl')
    })
  })

  describe('getPodRoot', () => {
    /* @ts-ignore */
    store.fetcher.webOperation.mockImplementationOnce(() => {})
    /* @ts-ignore */
    store.each.mockImplementationOnce(() => [{ value: 'https://alice.solid.example' }])
    it('returns...', async () => {
      const webId = new NamedNode('https://alice.solid.example/profile/card#me')
      const result = await getPodRoot(webId)
      expect(result).toBe('https://alice.solid.example')
    })
  })
  describe('getKeyIfExists', () => {
    /* @ts-ignore */
    store.any.mockReturnValue({ value: 'testing' })
    it('returns a key if it exists', async () => {
      const webId = new NamedNode('https://alice.solid.example/profile/card#me')
      const result = await getKeyIfExists(webId, 'testing', 'PublicKey')
      expect(result).toBe('testing')
    })
    it.skip('does something the key can not be found.. need to ask Alain', async () => {
      const webId = new NamedNode('https://alice.solid.example/profile/card#me')
      const result = await getKeyIfExists(webId, 'testing', 'PublicKey')
      expect(result).toBe('testing')
    })
    it.skip('throws an error if the key can not be stored', async () => {
      const webId = new NamedNode('https://alice.solid.example/profile/card#me')
      const result = await getKeyIfExists(webId, 'testing', 'PublicKey')
      expect(result).toBe('testing')
    })
    it.skip('throws an error if key is not found', async () => {
      const webId = new NamedNode('https://alice.solid.example/profile/card#me')
      const result = await getKeyIfExists(webId, 'testing', 'PublicKey')
      expect(result).toBe('testing')
    })
  })
})
