import * as debug from '../debug'
import { schnorr } from '@noble/curves/secp256k1'
import { bytesToHex } from '@noble/hashes/utils'
import { CERT } from './signature'
import { store } from 'solid-logic'
import * as $rdf from 'rdflib'
import { NamedNode, literal } from 'rdflib'

export function generatePrivateKey (): string {
  return bytesToHex(schnorr.utils.randomPrivateKey())
}

export function generatePublicKey (privateKey: string): string {
  return bytesToHex(schnorr.getPublicKey(privateKey))
}

export function getPublicKey (webId) {
  const publicKey = publicKeyExists(webId)
  return publicKey
}

const pubKeyUrl = (webId: string) => {
  const url = new URL(webId)
  const publicKeyUrl = url.origin + '/profile/keys/publicKey.ttl'
  return publicKeyUrl
}

async function publicKeyExists (webId: string) {
  // find publickey
  /* const url = new URL(webId)
  url.hash = '' */
  /* debug.warn('Alain publicKeyExists')
  debug.warn(webId)
  debug.warn(url.href) */
  await store.fetcher.load(pubKeyUrl(webId)) // url.href)
  const publicKey = store.any(store.sym(webId), store.sym(CERT + 'PublicKey'))
  return publicKey?.value // as NamedNode
}

const privKeyUrl = (webId: string) => {
  const url = new URL(webId)
  const privateKeyUrl = url.origin + '/profile/keys/privateKey.ttl'
  return privateKeyUrl
}

async function privateKeyExists (webId: string) {
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

export async function getPrivateKey (webId: string) {
  /* const url = new URL(webId)
  url.hash = '' */
  /* const privateKeyUrl = url.protocol + '//' + url.host + '/profile/privateKey.ttl' */
  const publicKeyUrl = pubKeyUrl(webId)
  const privateKeyUrl = privKeyUrl(webId)

  // find publickey
  let publicKey = await publicKeyExists(webId)
  // debug.warn('publicKey ' + publicKey)
  // find privateKey
  let privateKey = await privateKeyExists(webId)
  // debug.warn('privateKey ' + privateKey)
  if (privateKey && (publicKey !== generatePublicKey(privateKey as string))) debug.warn('publicKey is not valid')

  // simulate new key pair
  /* const newPrivateKey = generatePrivateKey()
  const newPublicKey = generatePublicKey(newPrivateKey)
  debug.log('newPrivateKey ' + newPrivateKey)
  debug.log('newPublicKey ' + newPublicKey) */

  // create key pair
  if (!privateKey || !publicKey) {
    const del: any[] = []
    const add: any[] = []
    if (privateKey) del.push($rdf.st($rdf.sym(webId), $rdf.sym(CERT + 'PrivateKey'), $rdf.lit(privateKey), $rdf.sym(privateKeyUrl)))
    if (publicKey) del.push($rdf.st($rdf.sym(webId), $rdf.sym(CERT + 'PublicKey'), $rdf.lit(publicKey), $rdf.sym(publicKeyUrl)))

    privateKey = generatePrivateKey()
    publicKey = generatePublicKey(privateKey)
    /* debug.log('newPrivateKey-1 ' + privateKey)
    debug.log('newPublicKey-1 ' + publicKey) */
    add.push($rdf.st($rdf.sym(webId), $rdf.sym(CERT + 'PrivateKey'), $rdf.literal(privateKey), $rdf.sym(privateKeyUrl)))
    add.push($rdf.st($rdf.sym(webId), $rdf.sym(CERT + 'PublicKey'), $rdf.literal(publicKey), $rdf.sym(publicKeyUrl)))
    await store.updater.updateMany(del, add)
  }
  return privateKey as string
}
