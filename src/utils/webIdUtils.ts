/*
* Utility functions to help load the profile
* especially when I am not logged in
*/

import { IndexedFormula, NamedNode, sym } from 'rdflib'
import ns from '@/lib/ns'
import { authn, store } from 'solid-logic'

const DEFAULT_PROFILE_PATH = 'profile/card#me'

export function isOwnWebIdProfile (subject: NamedNode): boolean {
  const viewer = authn.currentUser()
  return Boolean(viewer && (viewer.sameTerm(subject) || viewer.doc().sameTerm(subject)))
}

export async function loadProfileFromURI (
  uri: NamedNode
): Promise<NamedNode> {
  try {
    const pod = uri.site().uri
    // TODO: This is a hack - we cannot assume that the profile is at this document, but we will live with it for now
    const webId = sym(`${pod}${DEFAULT_PROFILE_PATH}`)
    try {
      await store.fetcher.load(webId)
      return webId
    } catch (err) {
      // ignore any failure and continue fallback lookup
    }

    // we try a prefixed pod structure
    try {
      const uriUrl = new URL(uri.uri)
      const pathSegments = uriUrl.pathname.split('/').filter(Boolean)
      if (pathSegments.length > 0) {
        const derivedPod = `${uriUrl.origin}/${pathSegments[0]}/`
        const derivedWebId = sym(`${derivedPod}${DEFAULT_PROFILE_PATH}`)
        await store.fetcher.load(derivedWebId)
        return derivedWebId
      }
    } catch (err) {
      // ignore any failure and continue fallback lookup
    }

    try {
      await store.fetcher.load(uri)
    } catch (err) {
      return uri
    }

    const primaryTopic = store.any(uri, ns.foaf('primaryTopic'), null, uri.doc())
    if (primaryTopic && primaryTopic.termType === 'NamedNode') {
      try {
        await store.fetcher.load(primaryTopic as NamedNode)
        return primaryTopic as NamedNode
      } catch (err) {
        return uri
      }
    }

    return uri
  } catch (err) {
    return uri
  }
}

export function isWebIdUri (uri: NamedNode): boolean {
  try {
    const parsedURL = new URL(uri.uri)
    return parsedURL.hash === '#me'
  } catch (err) {
    return false
  }
}

export async function getNameOfPodOwner (
  pod: NamedNode
): Promise<string> {
  // TODO: This is a hack - we cannot assume that the profile is at this document, but we will live with it for now
  const webId = sym(`${pod.uri}${DEFAULT_PROFILE_PATH}`)
  try {
    await store.fetcher.load(webId)
    return getName(store, webId)
  } catch (err) {
    if (!isFetchErrorStatus(err, 403)) {
      console.error('getNameOfPodOwner failed on default profile:', err)
    }
  }

  // we try a prefixed pod structure
  try {
    const uriUrl = new URL(pod.uri)
    const pathSegments = uriUrl.pathname.split('/').filter(Boolean)
    if (pathSegments.length > 0) {
      const derivedPod = `${uriUrl.origin}/${pathSegments[0]}/`
      const derivedWebId = sym(`${derivedPod}${DEFAULT_PROFILE_PATH}`)
      await store.fetcher.load(derivedWebId)
      return getName(store, derivedWebId)
    }
  } catch (err) {
    if (!isFetchErrorStatus(err, 403)) {
      console.error('getNameOfPodOwner failed on derived profile:', err)
    }
  }

  return ''
}

export function getName (store: IndexedFormula, ownersProfile: NamedNode): string {
  return (
    store.anyValue(ownersProfile, ns.vcard('fn'), null, ownersProfile.doc()) ||
    store.anyValue(ownersProfile, ns.foaf('name'), null, ownersProfile.doc()) ||
    new URL(ownersProfile.uri).host.split('.')[0]
  )
}

function isFetchErrorStatus (err: unknown, status: number): boolean {
  if (!err || typeof err !== 'object') return false
  const statusCode = (err as any)?.response?.status ?? (err as any)?.status
  const parsedStatus = Number(statusCode)
  return Number.isFinite(parsedStatus) && parsedStatus === status
}
