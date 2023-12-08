import * as debug from '../../debug'
import { store } from 'solid-logic'
import * as ns from '../../ns'
import { NamedNode } from 'rdflib'

async fetchStoragesFromDoc(doc) => {
  await store.fetcher.load(doc.uri)
  return store.each(webId, ns.space('storage'), null, doc.doc())
}

/* export const getPodRoot = async (webId: NamedNode) => {
  const webIdURL = new URL(webId.uri)
  // find storages in webId document
  let storages = await fetchStoragesFromDoc(webId)
  const settingsDocs = store.each(webId, ns.space('settings'), null, webId.doc())
  for (let i=0; i < settingsDocs.length; i++) {
    storages = storages.concat(await fetchStoragesFromDoc(settingsDocs[i]));
  }

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

  return podRoot as NamedNode
} */

export const pubKeyUrl = async (webId: NamedNode) => {
  let parentSettings = store.any(webId, ns.space('preferencesFile'), null, webId.doc())?.value
  parentSettings = parentSettings?.split('/').slice(0, -2).join('/')
  if (!parentSettings) throw new Error(`prefererencesFile is expected to exist in ${webId.doc}`)
  return `${parentSettings}/profile/keys/publicKey.ttl`
  /* try {
    return (await getPodRoot(webId)).value + 'profile/keys/publicKey.ttl'
  } catch (err) { throw new Error(err) } */
}

export async function getExistingPublicKey (webId: NamedNode, publicKeyUrl: string) {
  // find publickey
  return await getKeyIfExists(webId, publicKeyUrl, 'publicKey')
}

export const privKeyUrl = async (webId: NamedNode) => {
  let settings = store.any(webId, ns.space('preferencesFile'), null, webId.doc())?.value
  settings = settings?.split('/').slice(0, -1).join('/')
  if (!settings) throw new Error(`prefererencesFile is expected to exist in ${webId.doc}`)
  return `${settings}/keys/privateKey.ttl`
  /* try {
    const podRoot = await getPodRoot(webId)
    if (!settings?.startsWith(podRoot.value)) throw new Error(`/settings/ is expected to be in ${podRoot.value}`)
    return `${settings}/keys/privateKey.ttl`
  } catch (err) { throw new Error(err) } */
}

export async function getExistingPrivateKey (webId: NamedNode, privateKeyUrl: string) {
  // find privateKey
  return await getKeyIfExists(webId, privateKeyUrl, 'privateKey')
}

type KeyType = 'publicKey' | 'privateKey'

export async function getKeyIfExists (webId: NamedNode, keyUrl: string, keyType: KeyType) {
  try {
    await store.fetcher.load(keyUrl)
    const key = store.any(webId, ns.solid(keyType)) // store.sym(CERT + keyType))
    return key?.value // as NamedNode
  } catch (err) {
    if (err.response.status === 404) {
      debug.log(
        'createIfNotExists: doc does NOT exist, will create... ' + keyUrl
      )
      try {
        await store.fetcher.webOperation('PUT', keyUrl, {
          data: '',
          contentType: 'text/turtle'
        })
      } catch (err) {
        debug.log('createIfNotExists doc FAILED: ' + keyUrl + ': ' + err)
        throw err
      }
      delete store.fetcher.requested[keyUrl] // delete cached 404 error
      // debug.log('createIfNotExists doc created ok ' + doc)
      return undefined // response
    } else {
      debug.log('createIfNotExists doc FAILED: ' + keyUrl + ': ' + err)
      throw err
    }
  }
}
