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
  // find publickey
  /* const url = new URL(webId)
  url.hash = ''
  store.fetcher.load(url.href)
  let publicKey = store.any(store.sym(webId), store.sym(CERT +'publicKey')) */
  const publicKey = publicKeyExists(webId)
  return publicKey?.uri as any
}

function publicKeyExists (webId: string): NamedNode {
  // find publickey
  const url = new URL(webId)
  url.hash = ''
  store.fetcher.load(url.href)
  const publicKey = store.any(store.sym(webId), store.sym(CERT + 'publicKey'))
  return publicKey as NamedNode
}

function privateKeyExists (webId: string): NamedNode {
  const url = new URL(webId)
  const privateKeyUrl = url.hostname + '/profile/privateKey.ttl'
  store.fetcher.load(privateKeyUrl)
  const privateKey = store.any(store.sym(webId), store.sym(CERT + 'privateKey'))
  return privateKey as NamedNode
}

export async function getPrivateKey (webId) {
  const url = new URL(webId)
  const privateKeyUrl = url.hostname + '/profile/privateKey.ttl'
  // find publickey
  let publicKey = publicKeyExists(webId)
  // find privateKey
  let privateKey = privateKeyExists(webId)
  // create key pair
  if (!privateKey || !publicKey) {
    const del: any[] = []
    const add: any[] = []
    if (privateKey) del.push($rdf.st($rdf.sym(webId), $rdf.sym(CERT + 'privateKey'), privateKey, $rdf.sym(privateKeyUrl)))
    if (publicKey) del.push($rdf.st($rdf.sym(webId), $rdf.sym(CERT + 'publicKey'), publicKey, $rdf.sym(url.href)))

    privateKey = store.sym(generatePrivateKey())
    publicKey = store.sym(generatePublicKey(privateKey.uri))

    add.push($rdf.st($rdf.sym(webId), $rdf.sym(CERT + 'privateKey'), $rdf.literal(privateKey.uri), $rdf.sym(privateKeyUrl)))
    add.push($rdf.st($rdf.sym(webId), $rdf.sym(CERT + 'publicKey'), $rdf.literal(publicKey.uri), $rdf.sym(url.href)))
    await store.updater.updateMany(del, add)
  }
  return privateKey.uri as any
}
