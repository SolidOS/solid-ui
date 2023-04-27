import * as debug from '../debug'
import { CERT } from '../chat/signature'
import { store } from 'solid-logic'

export const pubKeyUrl = (webId: string) => {
  const url = new URL(webId)
  const publicKeyUrl = url.origin + '/profile/keys/publicKey.ttl'
  return publicKeyUrl
}

export async function publicKeyExists (webId: string) {
  // find publickey
  const publicKeyUrl = pubKeyUrl(webId)
  return await keyExists(webId, publicKeyUrl, 'PublicKey')
}

export const privKeyUrl = (webId: string) => {
  const url = new URL(webId)
  const privateKeyUrl = url.origin + '/profile/keys/privateKey.ttl'
  return privateKeyUrl
}

export async function privateKeyExists (webId: string) {
  // find privateKey
  const privateKeyUrl = privKeyUrl(webId)
  return await keyExists(webId, privateKeyUrl, 'PrivateKey')
}

async function keyExists (webId, keyUrl, keyType) {
  try {
    await store.fetcher.load(keyUrl) // url.href)
    const key = store.any(store.sym(webId), store.sym(CERT + keyType))
    return key?.value // as NamedNode
  } catch (err) {
    if (err?.response?.status === 404) { // If PATCH on some server do not all create intermediate containers
      try {
        // create privateKey resource
        const data = ''
        const contentType = 'text/turtle'
        const response = await store.fetcher.webOperation('PUT', keyUrl, {
          data,
          contentType
        })
      } catch (err) {
        debug.log('createIfNotExists doc FAILED: ' + keyUrl + ': ' + err)
        throw err
      }
      delete store.fetcher.requested[keyUrl] // delete cached 404 error
      return undefined
    }
    debug.log('createIfNotExists doc FAILED: ' + keyUrl + ': ' + err)
    throw err
  }
}
