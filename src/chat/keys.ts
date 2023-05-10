import * as debug from '../debug'
import { schnorr } from '@noble/curves/secp256k1'
import { bytesToHex } from '@noble/hashes/utils'
import { CERT } from './signature'
import { store } from 'solid-logic'
import { NamedNode } from 'rdflib'
import * as $rdf from 'rdflib'
import { getExistingPublicKey, pubKeyUrl, privKeyUrl, getExistingPrivateKey } from '../utils/cryptoKeyHelpers'

export function generatePrivateKey (): string {
  return bytesToHex(schnorr.utils.randomPrivateKey())
}

export function generatePublicKey (privateKey: string): string {
  return bytesToHex(schnorr.getPublicKey(privateKey))
}

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
  // this is called in display message and should not try to create a publicKeyDoc
  // const publicKey = await publicKeyExists(webId)
  // return publicKey
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
 * key container ACL
 * @param me
 * @returns aclBody
 */
const keyContainerAclBody = (me: string) => {
  const aclBody = `
@prefix : <#>.
@prefix acl: <http://www.w3.org/ns/auth/acl#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix key: <./>.

:ReadWrite
    a acl:Authorization;
    acl:accessTo key:;
    acl:default key:;
    acl:agent <${me}>;
    acl:mode acl:Read, acl:Write.
`
  return aclBody
}

/**
 * Read only ACL
 * @param keyDoc
 * @param me
 * @returns aclBody
 */
const keyAclBody = (keyDoc, me) => {
  let keyAgent = 'acl:agentClass foaf:Agent' // publicKey
  if (me?.length) keyAgent = `acl:agent <${me}>` // privateKey
  const aclBody = `
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix acl: <http://www.w3.org/ns/auth/acl#>.
<#Read>
    a acl:Authorization;
    ${keyAgent};
    acl:accessTo <${keyDoc.split('/').pop()}>;
    acl:mode acl:Read.
`
  return aclBody
}

/**
 * set ACL
 * @param keyDoc
 * @param aclBody
 */
async function setAcl (keyDoc: string, aclBody: string) {
  // Some servers don't present a Link http response header
  // if the container doesn't exist yet, refetch the resource

  await store.fetcher.load(keyDoc)

  // FIXME: check the Why value on this quad:
  debug.log(store.statementsMatching(store.sym(keyDoc), store.sym('http://www.iana.org/assignments/link-relations/acl')))
  const keyAclDoc = store.any(store.sym(keyDoc), store.sym('http://www.iana.org/assignments/link-relations/acl'))
  if (!keyAclDoc) {
    throw new Error('Key ACL doc not found!')
  }

  // delete READ only keyAclDoc. This is possible if the webId is an owner
  try {
    const response = await store.fetcher.webOperation('DELETE', keyAclDoc.value) // this may fail if webId is not an owner
    debug.log('delete ' + keyAclDoc.value + ' ' + response.status) // should test 404 and 2xx
  } catch (err) {
    if (err.response.status !== 404) { throw new Error(err) }
    debug.log('delete ' + keyAclDoc.value + ' ' + err.response.status) // should test 404 and 2xx
  }

  const aclResponse = await store.fetcher.webOperation('PUT', keyAclDoc.value, {
    data: aclBody,
    contentType: 'text/turtle'
  })
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
