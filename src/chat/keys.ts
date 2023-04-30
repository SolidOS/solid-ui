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
  await store.fetcher.load(webId)
  const publicKeyDoc = pubKeyUrl(webId)
  try {
    await store.fetcher.load(publicKeyDoc) // url.href)
    const key = store.any(store.sym(webId), store.sym(CERT + 'PublicKey'))
    return key?.value // as NamedNode
  } catch (err) {
    return undefined
  }
  // this is called in display message and should not try to create a publicKeyDoc
  // const publicKey = await publicKeyExists(webId)
  // return publicKey
}

export async function getPrivateKey (webId: string) {
  await store.fetcher.load(webId)
  // find keys url's
  const publicKeyDoc = pubKeyUrl(webId)
  const privateKeyDoc = privKeyUrl(webId)

  // find key pair
  const publicKey = await publicKeyExists(webId)
  let privateKey = await privateKeyExists(webId)

  // is publicKey valid ?
  let validPublicKey = true
  if (privateKey && (publicKey !== generatePublicKey(privateKey as string))) {
    if (confirm('This is strange the publicKey is not valid for\n' + webId +
     '\'shall we repair keeping the private key ?')) validPublicKey = false
  }

  // create key pair or repair publicKey
  if (!privateKey || !publicKey || !validPublicKey) {
    let del: any[] = []
    let add: any[] = []
    // if (privateKey) del.push($rdf.st($rdf.sym(webId), $rdf.sym(CERT + 'PrivateKey'), $rdf.lit(privateKey), $rdf.sym(privateKeyDoc)))

    if (!privateKey) {
      // add = []
      privateKey = generatePrivateKey()
      add = [$rdf.st($rdf.sym(webId), $rdf.sym(CERT + 'PrivateKey'), $rdf.literal(privateKey), $rdf.sym(privateKeyDoc))]
      await saveKey(privateKeyDoc, [], add, webId)
    }
    if (!publicKey || !validPublicKey) {
      del = []
      // delete invalid public key
      if (publicKey) {
        del = [$rdf.st($rdf.sym(webId), $rdf.sym(CERT + 'PublicKey'), $rdf.lit(publicKey), $rdf.sym(publicKeyDoc))]
        debug.log(del)
      }
      // update new valid key
      const newPublicKey = generatePublicKey(privateKey)
      add = [$rdf.st($rdf.sym(webId), $rdf.sym(CERT + 'PublicKey'), $rdf.literal(newPublicKey), $rdf.sym(publicKeyDoc))]
      await saveKey(publicKeyDoc, del, add)
    }
    const keyContainer = privateKeyDoc.substring(0, privateKeyDoc.lastIndexOf('/') + 1)
    await setAcl(keyContainer, keyContainerAclBody(webId))
    /* debug.log('new key pair ' + webId)
    debug.log('newPrivateKey-1 ' + privateKey)
    debug.log('newPublicKey-1 ' + publicKey) */
    /* debug.log('del')
    debug.log(del)
    debug.log('add')
    debug.log(add) */
    // await store.updater.updateMany(del, add)
    // TODO create READ ACL's
    // await setAcl() // depends on which key has been updated
  }
  return privateKey as string
}

const keyContainerAclBody = (me: string) => {
  const aclBody = `
@prefix : <#>.
@prefix acl: <http://www.w3.org/ns/auth/acl#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix key: <./>.

:ReadWrite
    a acl:Authorization;
    acl:accessTo key:;
    acl:agent <${me}>;
    acl:mode acl:Read, acl:Write.
:Read
    a acl:Authorization;
    acl:accessTo key:;
    acl:default key:;
    acl:agentClass foaf:Agent;
    acl:mode acl:Read.
`
  return aclBody
}

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
    acl:mode acl:Read, acl:Control. # NSS issue: missing acl link header with READ only
`
  return aclBody
}

async function setAcl (keyDoc, aclBody) {
  // Some servers don't present a Link http response header
  // if the container doesn't exist yet, so refetch the container
  // now that it has been created:
  await store.fetcher.load(keyDoc)

  // FIXME: check the Why value on this quad:
  const keyAclDoc = store.any($rdf.sym(keyDoc), $rdf.sym('http://www.iana.org/assignments/link-relations/acl'))
  if (!keyAclDoc) {
    throw new Error('Key ACL doc not found!')
  }

  /* let keyAgent = `acl:agent <${me}>;\n` // privateKey
  if (!me?.length) keyAgent = `acl:agent <${me}>;\n` + '    acl:agentClass foaf:Agent' // publicKey NSS issue
  const aclBody = `
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix acl: <http://www.w3.org/ns/auth/acl#>.
<#Read>
    a acl:Authorization;
    acl:agent <${me}>;
    ${keyAgent};
    acl:accessTo <${keyDoc.split('/').pop()}>;
    acl:mode acl:Read, acl:Control. # NSS issue: missing acl link header with READ only
` */
  const aclResponse = await store.fetcher.webOperation('PUT', keyAclDoc.value, {
    data: aclBody,
    contentType: 'text/turtle'
  })
}

async function saveKey (keyDoc, del, add, me = '') {
  // save key
  await store.updater.updateMany(del, add) // or a promise store.updater.update ?
  await store.fetcher.load(keyDoc)

  try {
    // get keyAcldoc
    const keyAclDoc = store.any($rdf.sym(keyDoc), $rdf.sym('http://www.iana.org/assignments/link-relations/acl'))
    if (!keyAclDoc) {
      throw new Error(`${keyDoc} ACL doc not found!`)
    }
    // delete READ only keyAclDoc. This is possible if the webId is an owner
    try {
      const response = await store.fetcher.webOperation('DELETE', keyAclDoc.value) // this may fail if webId is not an owner
      debug.log('delete ' + keyAclDoc.value + ' ' + response.status) // should test 404 and 2xx
    } catch (err) {
      if (err.response.status !== 404) { throw new Error(err) }
      debug.log('delete ' + keyAclDoc.value + ' ' + err.response.status) // should test 404 and 2xx
    }

    // create READ only ACL
    const aclBody = keyAclBody(keyDoc, me)
    await setAcl(keyDoc, aclBody)
  } catch (err) { throw new Error(err) }
}
