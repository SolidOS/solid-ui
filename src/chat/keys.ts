/* global $rdf */
import { schnorr } from '@noble/curves/secp256k1'
import { bytesToHex } from '@noble/hashes/utils'
import { CERT } from './signature'
import { store } from 'solid-logic'

export function generatePrivateKey (): string {
  return bytesToHex(schnorr.utils.randomPrivateKey())
}

export function generatePublicKey (privateKey: string): string {
  return bytesToHex(schnorr.getPublicKey(privateKey))
}

export function getPublicKey (webId) {
  // find publickey
  /* const url = new URL(webId)
  url.hash = ''
  store.fetcher.load(url.href)
  let publicKey = store.any(store.sym(webId), store.sym(CERT +'publicKey')) */
  const publicKey = publicKeyExists(webId)
  return publicKey?.uri
}

function publicKeyExists (webId) {
  // find publickey
  const url = new URL(webId)
  url.hash = ''
  store.fetcher.load(url.href)
  const publicKey = store.any(store.sym(webId), store.sym(CERT + 'publicKey'))
  return publicKey
}

function privateKeyExists (webId) {
  const url = new URL(webId)
  const privateKeyUrl = url.hostname + '/profile/privateKey.ttl'
  store.fetcher.load(privateKeyUrl)
  const privateKey = store.any(store.sym(webId), store.sym(CERT + 'privateKey'))
  return privateKey
}

export function getPrivateKey (webId) {
  const url = new URL(webId)
  const privateKeyUrl = url.hostname + '/profile/privateKey.ttl'
  // find publickey
  let publicKey = publicKeyExists(webId)
  // find privateKey
  let privateKey = privateKeyExists(webId)
  // create key pair
  if (!privateKey || !publicKey) {
    const del = []
    const add = []
    if (privateKey) del.push($rdf.sym(webId), $rdf.sym(CERT + 'privateKey'), null, $rdf.sym(privateKeyUrl))
    if (publicKey) del.push($rdf.sym(webId), $rdf.sym(CERT + 'publicKey'), null, $rdf.sym(url.href))

    privateKey = store.sym(generatePrivateKey())
    publicKey = store.sym(generatePublicKey(privateKey.uri))

    add.push($rdf.sym(webId), $rdf.sym(CERT + 'privateKey'), store.literal(privateKey.uri), $rdf.sym(privateKeyUrl))
    add.push($rdf.sym(webId), $rdf.sym(CERT + 'publicKey'), store.literal(publicKey.uri), $rdf.sym(url.href))
    await store.updater.updateMany(del, add)
  }
  return privateKey.uri
}
