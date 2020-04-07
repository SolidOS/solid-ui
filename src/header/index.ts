/*
    This file was copied from mashlib/src/global/header.ts file. It is modified to
    work in solid-ui by adjusting where imported functions are found.
 */
import { IndexedFormula, NamedNode, sym } from 'rdflib'
import { loginStatusBox, solidAuthClient } from '../authn/authn'
import { widgets } from '../widgets'
import { icon } from './icon'
import { emptyProfile } from './empty-profile'
import { throttle, getPod } from './headerHelpers'
import { log } from '../debug'

// SolidAuthorization, SolidClam, and SolidSession was copied from mashlib/typings/solid-auth-client
// access_token, client_id, id_token, at_hash had to be converted to camelcase for typescript compatibility
interface SolidAuthorization {
    accessToken: string;
    clientId: string;
    idToken: string;
}

interface SolidClaim {
    atHash: string;
    aud: string;
    azp: string;
    cnf: {
        jwk: string;
    };
    exp: number;
    iat: number;
    iss: string;
    jti: string;
    nonce: string;
    sub: string;
}
export interface SolidSession {
    authorization: SolidAuthorization;
    credentialType: string;
    idClaims: SolidClaim;
    idp: string;
    issuer: string;
    sessionKey: string;
    webId: string;
}

export async function initHeader (store: IndexedFormula) {
  const header = document.getElementById('PageHeader')
  if (!header) {
    return
  }

  const pod = getPod()
  solidAuthClient.trackSession(rebuildHeader(header, store, pod))
}

function rebuildHeader (header: HTMLElement, store: IndexedFormula, pod: NamedNode) {
  return async (session: SolidSession | null) => {
    const user = session ? sym(session.webId) : null
    log(user)
    header.innerHTML = ''
    header.appendChild(await createBanner(store, pod, user))
  }
}

async function createBanner (store: IndexedFormula, pod: NamedNode, user: NamedNode | null): Promise<HTMLElement> {
  const podLink = document.createElement('a')
  podLink.href = pod.uri
  podLink.classList.add('header-banner__link')
  podLink.innerHTML = icon

  const menu = user
    ? await createUserMenu(store, user)
    : createLoginSignUpButtons()

  const banner = document.createElement('div')
  banner.classList.add('header-banner')
  banner.appendChild(podLink)
  banner.appendChild(menu)

  return banner
}

function createLoginSignUpButtons () {
  const profileLoginButtonPre = document.createElement('div')
  profileLoginButtonPre.classList.add('header-banner__login')
  profileLoginButtonPre.appendChild(loginStatusBox(document, null, {}))
  return profileLoginButtonPre
}

function createUserMenuButton (label: string, onClick: EventListenerOrEventListenerObject): HTMLElement {
  const button = document.createElement('button')
  button.classList.add('header-user-menu__button')
  button.addEventListener('click', onClick)
  button.innerText = label
  return button
}

function createUserMenuLink (label: string, href: string): HTMLElement {
  const link = document.createElement('a')
  link.classList.add('header-user-menu__link')
  link.href = href
  link.innerText = label
  return link
}

async function createUserMenu (store: IndexedFormula, user: NamedNode): Promise<HTMLElement> {
  const fetcher = (<any>store).fetcher
  if (fetcher) {
    // Making sure that Profile is loaded before building menu
    await fetcher.load(user)
  }
  const loggedInMenuList = document.createElement('ul')
  loggedInMenuList.classList.add('header-user-menu__list')
  loggedInMenuList.appendChild(createUserMenuItem(createUserMenuLink('Show your profile', user.uri)))

  loggedInMenuList.appendChild(createUserMenuItem(createUserMenuButton('Log out', () => solidAuthClient.logout())))

  const loggedInMenu = document.createElement('nav')
  loggedInMenu.classList.add('header-user-menu__navigation-menu')
  loggedInMenu.setAttribute('aria-hidden', 'true')
  loggedInMenu.appendChild(loggedInMenuList)

  const loggedInMenuTrigger = document.createElement('button')
  loggedInMenuTrigger.classList.add('header-user-menu__trigger')
  loggedInMenuTrigger.type = 'button'
  const profileImg = getProfileImg(store, user)
  if (typeof profileImg === 'string') {
    loggedInMenuTrigger.innerHTML = profileImg
  } else {
    loggedInMenuTrigger.appendChild(profileImg)
  }

  const loggedInMenuContainer = document.createElement('div')
  loggedInMenuContainer.classList.add('header-banner__user-menu', 'header-user-menu')
  loggedInMenuContainer.appendChild(loggedInMenuTrigger)
  loggedInMenuContainer.appendChild(loggedInMenu)

  const throttledMenuToggle = throttle((event: Event) => toggleMenu(event, loggedInMenuTrigger, loggedInMenu), 50)
  loggedInMenuTrigger.addEventListener('click', throttledMenuToggle)
  let timer = setTimeout(() => null, 0)
  loggedInMenuContainer.addEventListener('mouseover', event => {
    clearTimeout(timer)
    throttledMenuToggle(event)
  })
  loggedInMenuContainer.addEventListener('mouseout', event => {
    timer = setTimeout(() => throttledMenuToggle(event), 200)
  })

  return loggedInMenuContainer
}

function createUserMenuItem (child: HTMLElement): HTMLElement {
  const menuProfileItem = document.createElement('li')
  menuProfileItem.classList.add('header-user-menu__list-item')
  menuProfileItem.appendChild(child)
  return menuProfileItem
}

async function getMenuItems (outliner: any): Promise<Array<{
    paneName: string;
    tabName?: string;
    label: string;
    icon: string;
}>> {
  return outliner.getDashboardItems()
}

function getProfileImg (store: IndexedFormula, user: NamedNode): string | HTMLElement {
  const profileUrl = widgets.findImage(user)
  if (!profileUrl) {
    return emptyProfile
  }
  const profileImage = document.createElement('div')
  profileImage.classList.add('header-user-menu__photo')
  profileImage.style.backgroundImage = `url("${profileUrl}")`
  return profileImage
}

function toggleMenu (event: Event, trigger: HTMLButtonElement, menu: HTMLElement): void {
  const isExpanded = trigger.getAttribute('aria-expanded') === 'true'
  const expand = event.type === 'mouseover'
  const close = event.type === 'mouseout'
  if ((isExpanded && expand) || (!isExpanded && close)) {
    return
  }
  trigger.setAttribute('aria-expanded', (!isExpanded).toString())
  menu.setAttribute('aria-hidden', isExpanded.toString())
}
