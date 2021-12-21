/*
    This file was copied from mashlib/src/global/footer.ts file. It is modified to
    work in solid-ui by adjusting where imported functions are found.
 */
import { IndexedFormula, NamedNode } from 'rdflib'
import { authSession, currentUser } from '../authn/authn'
import { addStyleClassToElement, getName, getPod, getPodOwner } from '../utils/headerFooterHelpers'

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
export async function initFooter (store: IndexedFormula) {
  const footer = document.getElementById('PageFooter')
  if (!footer) {
    return
  }
  const pod = getPod()
  const podOwner = await getPodOwner(pod, store)
  rebuildFooter(footer, store, pod, podOwner)()
  authSession.onLogin(rebuildFooter(footer, store, pod, podOwner))
  authSession.onLogout(rebuildFooter(footer, store, pod, podOwner))
}
/**
 * @ignore exporting this only for the unit test
 */
export function rebuildFooter (footer: HTMLElement, store: IndexedFormula, pod: NamedNode | null, podOwner: NamedNode | null) {
  return async () => {
    const user = currentUser()
    footer.innerHTML = ''
    footer.appendChild(await createControllerInfoBlock(store, user, pod, podOwner))
  }
}
/**
 * @ignore exporting this only for the unit test
 */
export function createControllerInfoBlock (store: IndexedFormula, user: NamedNode | null, pod: NamedNode | null, podOwner: NamedNode | null): HTMLElement {
  const profileLinkContainer = document.createElement('div')
  if (!pod || !podOwner || (user && user.equals(podOwner))) {
    return profileLinkContainer
  }

  addStyleClassToElement(profileLinkContainer, ['footer-pod-info', 'footer'], 'footer')

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
  solidProjectLink.href = DEFAULT_SOLID_PROJECT_URL
  solidProjectLink.innerText = DEFAULT_SOLID_PROJECT_NAME

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
