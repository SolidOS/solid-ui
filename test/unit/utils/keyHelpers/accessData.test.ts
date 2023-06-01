import { store } from 'solid-logic'
import { getKeyIfExists, pubKeyUrl, privKeyUrl, getExistingPublicKey, getExistingPrivateKey } from '../../../../src/utils/keyHelpers/accessData'
import { NamedNode } from 'rdflib'

/* data */
const PRIV_KEY = 'a11bc5d2eee6cdb3b37f5473a712cad905ccfb13fb2ccdbf1be0a1ac4fdc7d2a'
const PUB_KEY = '023a9da707bee1302f66083c9d95673ff969b41607a66f52686fa774d64ceb87'

/* mocks */
store.fetcher.load = jest.fn().mockImplementation(() => {})
store.fetcher.webOperation = jest.fn()
store.each = jest.fn()
store.any = jest.fn()

jest.mock('../../../../src/utils/keyHelpers/otherHelpers', () => {
  return {
    getRootIfPreferencesExist: jest.fn().mockImplementationOnce(() => {
      throw new Error()
    })
      .mockImplementationOnce(() => 'https://alice.example.net')
      .mockImplementationOnce(() => {
        throw new Error()
      })
      .mockImplementationOnce(() => 'https://alice.example.net')
  }
})

describe('accessData', () => {
  const webId = new NamedNode('https://alice.solid.example.net/profile/card#me')
  describe('pubKeyUrl', () => {
    it('to return undefined if there is not preference file', () => {
      expect(pubKeyUrl(webId)).toEqual(undefined)
    })
    it('returns the url for the public key', () => {
      const result = pubKeyUrl(webId)
      expect(result).toEqual('https://alice.example.net/profile/keys/publicKey.ttl')
    })
  })
  describe('privKeyUrl', () => {
    it('to return undefined if there is not preference file', () => {
      expect(privKeyUrl(webId)).toEqual(undefined)
    })
    it('returns the url for the private key', () => {
      const result = privKeyUrl(webId)
      expect(result).toEqual('https://alice.example.net/keys/privateKey.ttl')
    })
  })
})
