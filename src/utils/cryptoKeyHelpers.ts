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
  /* const url = new URL(webId)
  url.hash = '' */
  /* debug.warn('Alain publicKeyExists')
  debug.warn(webId)
  debug.warn(url.href) */
  const publicKeyUrl = pubKeyUrl(webId)
  try {
    await store.fetcher.load(publicKeyUrl) // url.href)
    const publicKey = store.any(store.sym(webId), store.sym(CERT + 'PublicKey'))
    debug.log('publicKeyExists ' + webId)
    debug.log(publicKey?.value)
    return publicKey?.value // as NamedNode
  } catch (err) {
    if (err?.response?.status === 404) {
      try {
        // create privateKey resource
        const data = ''
        const contentType = 'text/ttl'
        const response = await store.fetcher.webOperation('PUT', publicKeyUrl, {
          data,
          contentType
        })
        // create ACL resource
      } catch (err) {
        debug.log('createIfNotExists doc FAILED: ' + publicKeyUrl + ': ' + err)
        throw err
      }
      delete store.fetcher.requested[publicKeyUrl] // delete cached 404 error
      return undefined
    }
    debug.log('createIfNotExists doc FAILED: ' + publicKeyUrl + ': ' + err)
    throw err
  }
}

export const privKeyUrl = (webId: string) => {
  const url = new URL(webId)
  const privateKeyUrl = url.origin + '/profile/keys/privateKey.ttl'
  return privateKeyUrl
}

export async function privateKeyExists (webId: string) {
  /* const url = new URL(webId)
  const privateKeyUrl = url.protocol + '//' + url.host + '/profile/privateKey.ttl' */
  const privateKeyUrl = privKeyUrl(webId)
  /* debug.warn('Alain privateKeyExists')
  debug.warn(webId)
  debug.warn(privateKeyUrl) */
  try {
    await store.fetcher.load(privateKeyUrl)
    const privateKey = store.any(store.sym(webId), store.sym(CERT + 'PrivateKey'))
    return privateKey?.value // as NamedNode
  } catch (err) {
    if (err?.response?.status === 404) {
      try {
        // create privateKey resource
        const data = ''
        const contentType = 'text/ttl'
        const response = await store.fetcher.webOperation('PUT', privateKeyUrl, {
          data,
          contentType
        })
        // create ACL resource
      } catch (err) {
        debug.log('createIfNotExists doc FAILED: ' + privateKeyUrl + ': ' + err)
        throw err
      }
      delete store.fetcher.requested[privateKeyUrl] // delete cached 404 error
      return undefined
    }
    debug.log('createIfNotExists doc FAILED: ' + privateKeyUrl + ': ' + err)
    throw err
  }
}
