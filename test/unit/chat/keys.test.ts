import { error, log, trace, warn } from '../../src/debug'
import { generatePrivateKey, generatePublicKey, getPublicKey } from '../../../src/chat/keys'
import Fetcher from 'rdflib/lib/fetcher'
import { store } from 'solid-logic'
const PRIV_KEY = 'a11bc5d2eee6cdb3b37f5473a712cad905ccfb13fb2ccdbf1be0a1ac4fdc7d2a'
const PUB_KEY = '023a9da707bee1302f66083c9d95673ff969b41607a66f52686fa774d64ceb87'

// @ts-ignore
store.fetcher.load = jest.fn().mockImplementation(() => {}) as unknown as Fetcher

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
  it('should do something', async () => {
    expect(async () => await getPublicKey('https://noids.solidcommunity.net/profile/card#me')).toThrowError()
  })
})
