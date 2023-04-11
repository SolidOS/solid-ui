/*
    This file was copied from mashlib/src/global/footer.ts file. It is modified to
    work in solid-ui by adjusting where imported functions are found.
 */
import { LiveStore, NamedNode } from 'rdflib'
import { authn, authSession } from 'solid-logic'
import * as style from '../style'
import { getName, getPod, getPodOwner } from '../utils/headerFooterHelpers'

const DEFAULT_SOLID_PROJECT_URL = 'https://solidproject.org'
const DEFAULT_SOLID_PROJECT_NAME = 'solidproject.org'

/*
  FooterOptions allow for customizing the link and name of the link part of the footer.
  */
export type FooterOptions = {
    solidProjectUrl?: string,
    solidProjectName?: string
  }

/**
 * Initialize footer component, the footer object returned depends on whether the user is authenticated.
 * @param store the data store
 * @returns the footer
 */
export async function initFooter (store: LiveStore, options?: FooterOptions) {
  const footer = document.getElementById('PageFooter')
  if (!footer) {
    return
  }
  const pod = getPod()
  const podOwner = await getPodOwner(pod, store)
  rebuildFooter(footer, store, pod, podOwner, options)()
  authSession.onLogin(rebuildFooter(footer, store, pod, podOwner, options))
  authSession.onLogout(rebuildFooter(footer, store, pod, podOwner, options))
}
/**
 * @ignore exporting this only for the unit test
 */
export function rebuildFooter (footer: HTMLElement, store: LiveStore, pod: NamedNode | null, podOwner: NamedNode | null, options?: FooterOptions) {
  return async () => {
    const user = authn.currentUser()
    footer.innerHTML = ''
    footer.appendChild(await createControllerInfoBlock(store, user, pod, podOwner, options))
  }
}
/**
 * @ignore exporting this only for the unit test
 */
export function createControllerInfoBlock (store: LiveStore, user: NamedNode | null, pod: NamedNode | null, podOwner: NamedNode | null, options?: FooterOptions): HTMLElement {
  const profileLinkContainer = document.createElement('div')
  if (!pod || !podOwner || (user && user.equals(podOwner))) {
    return profileLinkContainer
  }

  profileLinkContainer.setAttribute('style', style.footer)

  const podLinkPre = document.createElement('span')
  podLinkPre.innerText = "You're visiting "

  const podLink = document.createElement('a')
  podLink.href = pod.uri
  podLink.innerText = 'the Pod'

  const profileLinkPre = document.createElement('span')
  profileLinkPre.innerText = ' controlled by '

  const profileLink = document.createElement('a')
  profileLink.href = podOwner.uri
  profileLink.innerText = getName(store, podOwner)

  const solidProjectLinkPre = document.createElement('span')
  solidProjectLinkPre.innerText = '. For more info, check out '

  const solidProjectLink = document.createElement('a')
  solidProjectLink.href = options && options.solidProjectUrl ? options.solidProjectUrl : DEFAULT_SOLID_PROJECT_URL
  solidProjectLink.innerText = options && options.solidProjectName ? options.solidProjectName : DEFAULT_SOLID_PROJECT_NAME

  const solidProjectLinkPost = document.createElement('span')
  solidProjectLinkPost.innerText = '.'

  profileLinkContainer.appendChild(podLinkPre)
  profileLinkContainer.appendChild(podLink)
  profileLinkContainer.appendChild(profileLinkPre)
  profileLinkContainer.appendChild(profileLink)
  profileLinkContainer.appendChild(solidProjectLinkPre)
  profileLinkContainer.appendChild(solidProjectLink)
  profileLinkContainer.appendChild(solidProjectLinkPost)

  return profileLinkContainer
}
