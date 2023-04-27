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

export async function getPublicKey (webId) {
  const publicKeyUrl = pubKeyUrl(webId)
  try {
    await store.fetcher.load(publicKeyUrl) // url.href)
    const key = store.any(store.sym(webId), store.sym(CERT + 'PublicKey'))
    return key?.value // as NamedNode
  } catch (err) {
    return undefined
  }
  // this is called in display message and should not try to create a publicKeyUrl
  // const publicKey = await publicKeyExists(webId)
  // return publicKey
}

export async function getPrivateKey (webId: string) {
  // find key url's
  const publicKeyUrl = pubKeyUrl(webId)
  const privateKeyUrl = privKeyUrl(webId)

  // find key pair
  let publicKey = await publicKeyExists(webId)
  let privateKey = await privateKeyExists(webId)

  // is publicKey valid ?
  let validPublicKey = true
  if (privateKey && (publicKey !== generatePublicKey(privateKey as string))) {
    if (confirm('This is strange the publicKey is not valid for\n' + webId +
     '\'shall we repair keeping the private key ?')) validPublicKey = false
  }

  // create key pair or repair publicKey
  if (!privateKey || !publicKey || !validPublicKey) {
    const del: any[] = []
    const add: any[] = []
    // if (privateKey) del.push($rdf.st($rdf.sym(webId), $rdf.sym(CERT + 'PrivateKey'), $rdf.lit(privateKey), $rdf.sym(privateKeyUrl)))

    if (!privateKey) {
      privateKey = generatePrivateKey()
      add.push($rdf.st($rdf.sym(webId), $rdf.sym(CERT + 'PrivateKey'), $rdf.literal(privateKey), $rdf.sym(privateKeyUrl)))
      // TODO delete privateKeyUrl.acl, it may exist !!!
    }
    if (!publicKey || !validPublicKey) {
      // delete invalid public key
      if (publicKey) {
        del.push($rdf.st($rdf.sym(webId), $rdf.sym(CERT + 'PublicKey'), $rdf.lit(publicKey), $rdf.sym(publicKeyUrl)))
      }
      // insert new valid key
      publicKey = generatePublicKey(privateKey)
      add.push($rdf.st($rdf.sym(webId), $rdf.sym(CERT + 'PublicKey'), $rdf.literal(publicKey), $rdf.sym(publicKeyUrl)))
      // TODO delete privateKeyUrl.acl, it may exist !!!
    }
    /* debug.log('new key pair ' + webId)
    debug.log('newPrivateKey-1 ' + privateKey)
    debug.log('newPublicKey-1 ' + publicKey) */
    /* debug.log('del')
    debug.log(del)
    debug.log('add')
    debug.log(add) */
    await store.updater.updateMany(del, add)
    // TODO create READ ACL's
  }
  return privateKey as string
}
