import * as debug from '../../debug'
import { CERT } from '../../chat/signature'
import { store } from 'solid-logic'
import * as ns from '../../ns'
import { NamedNode } from 'rdflib'

export const getPodRoot = async (webId: NamedNode) => {
  const webIdURL = new URL(webId.uri)
  // find storages in webId document
  await store.fetcher.load(webId.uri)
  const storages = store.each(webId, ns.space('storage'), null, webId.doc())
  var podRoot: NamedNode | undefined
  if (!storages?.length) {
    // find storage recursively in webId URL
    let path = webIdURL.pathname
    while (path.length) {
      path = path.substring(0, path.lastIndexOf('/'))
      podRoot = store.sym(webIdURL.origin + path + '/')
      const res = await store.fetcher.webOperation('HEAD', podRoot.uri)
      if (res.headers.get('link')?.includes(ns.space('Storage').value)) break
      if (!path) debug.warn(`Current user storage not found for\n${webId}`)
    }
  } else {
    // give preference to storage in webId root
    podRoot = storages.find((storage) => webIdURL.origin === new URL(storage.value).origin) as NamedNode
    if (!podRoot) podRoot = storages[0] as NamedNode
  }
  return podRoot?.value
}

export const pubKeyUrl = async (webId: NamedNode) => {
  try {
    return await getPodRoot(webId) + 'profile/keys/publicKey.ttl'
  } catch (err) { throw new Error(err) }
}

export async function getExistingPublicKey (webId: NamedNode, publicKeyUrl: string) {
  // find publickey
  return await getKeyIfExists(webId, publicKeyUrl, 'PublicKey')
}

export const privKeyUrl = async (webId: NamedNode) => {
  try {
    return await getPodRoot(webId) + 'profile/keys/privateKey.ttl'
  } catch (err) { throw new Error(err) }
}

export async function getExistingPrivateKey (webId: NamedNode, privateKeyUrl: string) {
  // find privateKey
  return await getKeyIfExists(webId, privateKeyUrl, 'PrivateKey')
}

type KeyType = 'PublicKey' | 'PrivateKey'

export async function getKeyIfExists (webId: NamedNode, keyUrl: string, keyType: KeyType) {
  try {
    await store.fetcher.load(keyUrl)
    const key = store.any(webId, store.sym(CERT + keyType))
    return key?.value // as NamedNode
  } catch (err) {
    debug.log('createIfNotExists doc FAILED: ' + keyUrl + ': ' + err)
    throw err
  }
}
