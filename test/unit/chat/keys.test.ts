import { generatePrivateKey, generatePublicKey, getPublicKey } from '../../../src/chat/keys'
import { store } from 'solid-logic'
import { NamedNode } from 'rdflib'
import * as helpers from '../../../src/utils/keyHelpers/accessData'
const PRIV_KEY = 'a11bc5d2eee6cdb3b37f5473a712cad905ccfb13fb2ccdbf1be0a1ac4fdc7d2a'
const PUB_KEY = '023a9da707bee1302f66083c9d95673ff969b41607a66f52686fa774d64ceb87'

jest.mock('../../../src/utils/keyHelpers/accessData')
store.fetcher.load = jest.fn().mockImplementation(() => {})
store.any = jest.fn()

describe('generate key pair', () => {
  // console.log('alain')
  it('private key exists is length 64', () => {
    const privateKey = generatePrivateKey()
    expect(privateKey.length).toEqual(64)
  })
  it('public key exists is length 64', () => {
    const publicKey = generatePublicKey(PRIV_KEY)
    expect(publicKey).toEqual(PUB_KEY)
    expect(publicKey.length).toEqual(64)
  })
})

describe('getPublicKey', () => {
  const webId = new NamedNode('https://alice.solidcommunity.net/profile/card#me')
  it('should return the key', async () => {
    /* @ts-ignore */
    jest.spyOn(helpers, 'pubKeyUrl').mockResolvedValue('https://alice.solidcommunity.net/profile/keys/publicKey.ttl')
    /* @ts-ignore */
    store.any.mockReturnValue({ value: PUB_KEY })
    const webId = new NamedNode('https://alice.solidcommunity.net/profile/card#me')
    const result = await getPublicKey(webId)
    expect(result).toBe(PUB_KEY)
  })
  it.skip('should return undefined if loading and retrieving key fails', async () => {
    jest.spyOn(helpers, 'pubKeyUrl').mockResolvedValue('https://alice.solidcommunity.net/profile/keys/publicKey.ttl')
    /* @ts-ignore */
    store.any.mockRejectedValue()
    expect(await getPublicKey(webId)).rejects.toThrowError()
  })
})
