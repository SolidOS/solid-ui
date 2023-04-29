import * as debug from '../debug'
import { CERT } from '../chat/signature'
import { store } from 'solid-logic'

export const pubKeyUrl = (webId: string) => {
  const url = new URL(webId)
  // find storage in webId
  const storage = store.each(store.sym(webId), store.sym('http://www.w3.org/ns/pim/space#storage'))
  const pod = storage.length === 1 ? storage : storage.find(node => url.origin === new URL(node.value).origin)
  const podUrl = Array.isArray(pod) ? pod[0] : pod
  if (!podUrl?.value) throw Error('No space:storage in ' + webId)
  const publicKeyUrl = podUrl.value + 'profile/keys/publicKey.ttl'
  return publicKeyUrl
}

export async function publicKeyExists (webId: string) {
  // find publickey
  const publicKeyUrl = pubKeyUrl(webId)
  return await keyExists(webId, publicKeyUrl, 'PublicKey')
}

export const privKeyUrl = (webId: string) => {
  const url = new URL(webId)
  // find storage in webId
  const storage = store.each(store.sym(webId), store.sym('http://www.w3.org/ns/pim/space#storage'))
  const pod = storage.length === 1 ? storage : storage.find(node => url.origin === new URL(node.value).origin)
  const podUrl = Array.isArray(pod) ? pod[0] : pod
  if (!podUrl?.value) throw Error('Expected space:storage in ' + webId)
  const privateKeyUrl = podUrl?.value + 'profile/keys/privateKey.ttl'
  return privateKeyUrl
}

export async function privateKeyExists (webId: string) {
  // find privateKey
  const privateKeyUrl = privKeyUrl(webId)
  return await keyExists(webId, privateKeyUrl, 'PrivateKey')
}

type KeyType = 'PublicKey' | 'PrivateKey'

async function keyExists (webId, keyUrl, keyType: KeyType) {
  try {
    await store.fetcher.load(keyUrl)
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
