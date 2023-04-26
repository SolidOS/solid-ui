import * as debug from '../debug'
import { schnorr } from '@noble/curves/secp256k1'
import { bytesToHex } from '@noble/hashes/utils'
import { CERT } from './signature'
import { store } from 'solid-logic'
import * as $rdf from 'rdflib'
import { publicKeyExists, pubKeyUrl, privKeyUrl, privateKeyExists } from '../utils/cryptoKeyHelpers'

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
