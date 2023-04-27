import * as debug from '../../../src/debug'
import { pubKeyUrl, getExistingPublicKey, privKeyUrl, getExistingPrivateKey } from '../../../src/utils/cryptoKeyHelpers'

// need to mock store.fetcher.load
// and store.any

describe('cryptoKeyHelpers', () => {
  describe('pubKeyUrl', () => {
    it('returns the url for the public key', () => {
      const result = pubKeyUrl('https://alice.solid.example/profile/card#me')
      expect(result).toEqual('https://alice.solid.example/profile/keys/publicKey.ttl')
    })
  })

  describe('publicKeyExists', () => {
    it('returns...', async () => {
      const exists = await getExistingPublicKey('https://sstratsianis.solidcommunity.net/profile/card#me')
      debug.log('atesting: ' + exists)
      expect(exists).toEqual(undefined)
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
