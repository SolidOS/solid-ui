import * as debug from '../debug'
import { schnorr } from '@noble/curves/secp256k1'
import { bytesToHex } from '@noble/hashes/utils'
import { CERT } from './signature'
import { store } from 'solid-logic'
import { NamedNode } from 'rdflib'
import * as $rdf from 'rdflib'
import { getExistingPublicKey, pubKeyUrl, privKeyUrl, getExistingPrivateKey } from '../utils/keyHelpers/accessData'
import { setAcl, keyContainerAclBody, keyAclBody } from '../utils/keyHelpers/acl'

export function generatePrivateKey (): string {
  return bytesToHex(schnorr.utils.randomPrivateKey())
}

export function generatePublicKey (privateKey: string): string {
  return bytesToHex(schnorr.getPublicKey(privateKey))
}

/**
 * getPublicKey
 * used for displaying messages in chat, therefore does not
 * create a new key if not found
 * @param webId
 * @returns string | undefined
 */
export async function getPublicKey (webId: NamedNode) {
  await store.fetcher.load(webId)
  const publicKeyDoc = await pubKeyUrl(webId)
  try {
    await store.fetcher.load(publicKeyDoc) // url.href)
    const key = store.any(webId, store.sym(CERT + 'PublicKey'))
    return key?.value // as NamedNode
  } catch (err) {
    return undefined
  }
}

export async function getPrivateKey (webId: NamedNode) {
  await store.fetcher.load(webId)
  // find keys url's
  const publicKeyDoc = await pubKeyUrl(webId)
  const privateKeyDoc = await privKeyUrl(webId)

  // find key pair
  const publicKey = await getExistingPublicKey(webId, publicKeyDoc)
  let privateKey = await getExistingPrivateKey(webId, privateKeyDoc)

  // is publicKey valid ?
  let validPublicKey = true
  if (privateKey && (publicKey !== generatePublicKey(privateKey as string))) {
    if (confirm('This is strange the publicKey is not valid for\n' + webId?.uri +
     '\'shall we repair keeping the private key ?')) validPublicKey = false
  }

  // create key pair or repair publicKey
  if (!privateKey || !publicKey || !validPublicKey) {
    let del: any[] = []
    let add: any[] = []
    // if (privateKey) del.push($rdf.st(webId, store.sym(CERT + 'PrivateKey'), $rdf.lit(privateKey), store.sym(privateKeyDoc)))

    if (!privateKey) {
      // add = []
      privateKey = generatePrivateKey()
      add = [$rdf.st(webId, store.sym(CERT + 'PrivateKey'), $rdf.literal(privateKey), store.sym(privateKeyDoc))]
      await saveKey(privateKeyDoc, [], add, webId.uri)
    }
    if (!publicKey || !validPublicKey) {
      del = []
      // delete invalid public key
      if (publicKey) {
        del = [$rdf.st(webId, store.sym(CERT + 'PublicKey'), $rdf.lit(publicKey), store.sym(publicKeyDoc))]
        debug.log(del)
      }
      // update new valid key
      const newPublicKey = generatePublicKey(privateKey)
      add = [$rdf.st(webId, store.sym(CERT + 'PublicKey'), $rdf.literal(newPublicKey), store.sym(publicKeyDoc))]
      await saveKey(publicKeyDoc, del, add)
    }
    const keyContainer = privateKeyDoc.substring(0, privateKeyDoc.lastIndexOf('/') + 1)
    await setAcl(keyContainer, keyContainerAclBody(webId.uri)) // includes DELETE and PUT
  }
  return privateKey as string
}

/**
 * delete acl if keydoc exists
 * create/edit keyDoc
 * set keyDoc acl
 */
async function saveKey (keyDoc: string, del, add, me: string = '') {
  await store.fetcher.load(keyDoc)
  // delete keyAclDoc
  try {
    // get keyAcldoc
    const keyAclDoc = store.any(store.sym(keyDoc), store.sym('http://www.iana.org/assignments/link-relations/acl'))
    if (keyAclDoc) {
      // delete READ only keyAclDoc. This is possible if the webId is an owner
      try {
        const response = await store.fetcher.webOperation('DELETE', keyAclDoc.value) // this may fail if webId is not an owner
        debug.log('delete ' + keyAclDoc.value + ' ' + response.status) // should test 404 and 2xx
      } catch (err) {
        if (err.response.status !== 404) { throw new Error(err) }
        debug.log('delete ' + keyAclDoc.value + ' ' + err.response.status) // should test 404 and 2xx
      }
    }

    // save key
    await store.updater.updateMany(del, add) // or a promise store.updater.update ?

    // create READ only ACL
    const aclBody = keyAclBody(keyDoc, me)
    await setAcl(keyDoc, aclBody)
  } catch (err) { throw new Error(err) }
}
