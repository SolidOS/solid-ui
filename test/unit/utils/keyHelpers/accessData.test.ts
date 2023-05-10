import { store } from 'solid-logic'
import Fetcher from 'rdflib/lib/fetcher'
import { getKeyIfExists, pubKeyUrl, privKeyUrl, getPodRoot, getExistingPublicKey, getExistingPrivateKey } from '../../../../src/utils/keyHelpers/accessData'
import { NamedNode } from 'rdflib'

/* data */
const PRIV_KEY = 'a11bc5d2eee6cdb3b37f5473a712cad905ccfb13fb2ccdbf1be0a1ac4fdc7d2a'
const PUB_KEY = '023a9da707bee1302f66083c9d95673ff969b41607a66f52686fa774d64ceb87'

/* mocks */
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
    store.any.mockReturnValue({ value: PUB_KEY })
    it('returns a key if it exists', async () => {
      const webId = new NamedNode('https://alice.solid.example/profile/card#me')
      const result = await getKeyIfExists(webId, PUB_KEY, 'PublicKey')
      expect(result).toBe(PUB_KEY)
    })
    it.skip('does something the key can not be found.. need to ask Alain', async () => {
      const webId = new NamedNode('https://alice.solid.example/profile/card#me')
      const result = await getKeyIfExists(webId, 'testing', 'PublicKey')
      expect(result).toBe('testing')
    })
    it.skip('throws an error if the key can not be stored', async () => {
      const webId = new NamedNode('https://alice.solid.example/profile/card#me')
      const result = await getKeyIfExists(webId, PUB_KEY, 'PublicKey')
      expect(result).toBe(PUB_KEY)
    })
    it.skip('throws an error if key is not found', async () => {
      const webId = new NamedNode('https://alice.solid.example/profile/card#me')
      const result = await getKeyIfExists(webId, 'testing', 'PublicKey')
      expect(result).toBe('testing')
    })
  })
})
