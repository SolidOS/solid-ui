import { pubKeyUrl, publicKeyExists, privKeyUrl, privateKeyExists } from '../../../src/utils/cryptoKeyHelpers'

describe.skip('cryptoKeyHelpers', () => {
  describe('pubKeyUrl', () => {
    it('returns the url for the public key', () => {
      const result = pubKeyUrl('https://alice.solid.example/profile/card#me')
      expect(result).toEqual('https://alice.solid.example/profile/keys/publicKey.ttl')
    })
  })

  describe('publicKeyExists', () => {
    it('returns...', () => {

    })
  })

  describe('privKeyUrl', () => {
    it('returns...', () => {
      const result = privKeyUrl('https://alice.solid.example/profile/card#me')
      expect(result).toEqual('https://alice.solid.example/profile/keys/privateKey.ttl')
    })
  })

  describe('privateKeyExists', () => {
    it('returns...', () => {

    })
  })
})
