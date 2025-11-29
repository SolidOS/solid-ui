import { store } from 'solid-logic'
import { pubKeyUrl, privKeyUrl } from '../../../../src/utils/keyHelpers/accessData'
import { NamedNode } from 'rdflib'

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
      expect(result).toEqual('https://alice.example.net/settings/keys/privateKey.ttl')
    })
  })
})
