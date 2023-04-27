import * as debug from '../debug'
import { CERT } from '../chat/signature'
import { store } from 'solid-logic'

export const pubKeyUrl = (webId: string) => {
  const url = new URL(webId)
  const publicKeyUrl = url.origin + '/profile/keys/publicKey.ttl'
  return publicKeyUrl
}

export const getExistingPublicKey = async (webId: string) => {
  const publicKeyUrl = pubKeyUrl(webId)
  try {
    await store.fetcher.load(publicKeyUrl) // url.href)
    const publicKey = store.any(store.sym(webId), store.sym(CERT + 'PublicKey'))
    return publicKey?.value // as NamedNode
  } catch (err) {
    throw Error(err)
  }
}

export async function getOrCreatePublicKey (webId: string) {
  // find publickey
  /* const url = new URL(webId)
  url.hash = '' */
  /* debug.warn('Alain publicKeyExists')
  debug.warn(webId)
  debug.warn(url.href) */
  const publicKeyUrl = pubKeyUrl(webId)
  debug.log(publicKeyUrl)
  try {
    const publicKey = await getExistingPublicKey(webId)
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
    debug.log('getExistingPublicKey failed non 404 Error: ' + publicKeyUrl + ': ' + err)
    throw err
  }
}

export const privKeyUrl = (webId: string) => {
  const url = new URL(webId)
  const privateKeyUrl = url.origin + '/profile/keys/privateKey.ttl'
  return privateKeyUrl
}

export const getExistingPrivateKey = async (webId: string) => {
  const privateKeyUrl = privKeyUrl(webId)
  try {
    await store.fetcher.load(privateKeyUrl)
    const privateKey = store.any(store.sym(webId), store.sym(CERT + 'PrivateKey'))
    return privateKey?.value // as NamedNode
  } catch (err) {
    throw Error(err)
  }
}

export async function getOrCreatePrivateKey (webId: string) {
  /* const url = new URL(webId)
  const privateKeyUrl = url.protocol + '//' + url.host + '/profile/privateKey.ttl' */
  const privateKeyUrl = privKeyUrl(webId)
  /* debug.warn('Alain privateKeyExists')
  debug.warn(webId)
  debug.warn(privateKeyUrl) */
  try {
    return await getExistingPrivateKey(webId)
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
    debug.log('getExistingPrivateKey failed non 404 Error: ' + privateKeyUrl + ': ' + err)
    throw err
  }
}
