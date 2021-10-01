/* global EventListenerOrEventListenerObject */
/*
    This file was copied from mashlib/src/global/header.ts file. It is modified to
    work in solid-ui by adjusting where imported functions are found.
 */
import { IndexedFormula, NamedNode } from 'rdflib'
import { icons } from '..'
import { loginStatusBox, authSession, currentUser } from '../authn/authn'
import * as widgets from '../widgets'
import { emptyProfile } from './empty-profile'
import { addStyleClassToElement, getPod, throttle } from './headerHelpers'

export type MenuItemLink = {
  label: string,
  url: string
}

export type MenuItemButton = {
  label: string,
  onclick: () => {}
}

export type MenuItems = MenuItemLink | MenuItemButton

/*
HeaderOptions allow for customizing the logo and menu list.  If a logo is not provided the default
    is solid. Menulist will always show a link to logout and to the users profile.
  */
export type HeaderOptions = {
  logo?: string,
  menuList?: MenuItems[]
}

/**
 * Initialize header component, the header object returned depends on whether the user is authenticated.
 * @param store the data store
 * @param options allow the header to be customized with a personalized logo and a menu list of links or buttons.
 * @returns a header for an authenticated user with menu items given or a login screen
 */
export async function initHeader (store: IndexedFormula, options?: HeaderOptions) {
  const header = document.getElementById('PageHeader')
  if (!header) {
    return
  }

  const pod = getPod()
  rebuildHeader(header, store, pod, options)()
  authSession.onLogout(rebuildHeader(header, store, pod, options))
  authSession.onLogin(rebuildHeader(header, store, pod, options))
}
/**
 * @ignore exporting this only for the unit test
 */
export function rebuildHeader (header: HTMLElement, store: IndexedFormula, pod: NamedNode, options?: HeaderOptions) {
  return async () => {
    const user = currentUser()
    header.innerHTML = ''
    header.appendChild(await createBanner(store, pod, user, options))
  }
}
/**
 * @ignore exporting this only for the unit test
 */
export async function createBanner (store: IndexedFormula, pod: NamedNode, user: NamedNode | null, options?: HeaderOptions): Promise<HTMLElement> {
  const podLink = document.createElement('a')
  podLink.href = pod.uri
  addStyleClassToElement(podLink, ['header-banner__link'])
  const image = document.createElement('img')
  if (options) {
    image.src = options.logo ? options.logo : 'https://solidproject.org/assets/img/solid-emblem.svg'
  }
  addStyleClassToElement(image, ['header-banner__icon'])
  podLink.appendChild(image)

  const userMenu = user
    ? await createUserMenu(store, user, options)
    : createLoginSignUpButtons()

  const helpMenu = createHelpMenu()

  const banner = document.createElement('div')
  addStyleClassToElement(banner, ['header-banner'])
  banner.appendChild(podLink)

  const leftSideOfHeader = document.createElement('div')
  addStyleClassToElement(leftSideOfHeader, ['header-banner__right-menu'])
  leftSideOfHeader.appendChild(userMenu)
  leftSideOfHeader.appendChild(helpMenu)

  banner.appendChild(leftSideOfHeader)

  return banner
}
/**
 * @ignore exporting this only for the unit test
 */
export function createHelpMenu () {
  const helpMenuList = document.createElement('ul')
  addStyleClassToElement(helpMenuList, ['header-user-menu__list'])
  helpMenuList.appendChild(createUserMenuItem(createUserMenuLink('User guide', 'https://github.com/solid/userguide')))
  helpMenuList.appendChild(createUserMenuItem(createUserMenuLink('Report a problem', 'https://github.com/solid/solidos/issues')))

  const helpMenu = document.createElement('nav')

  addStyleClassToElement(helpMenu, ['header-user-menu__navigation-menu'])
  helpMenu.setAttribute('aria-hidden', 'true')
  helpMenu.appendChild(helpMenuList)

  const helpIcon = icons.iconBase + 'noun_144.svg'

  const helpMenuContainer = document.createElement('div')
  addStyleClassToElement(helpMenuContainer, ['header-banner__user-menu'])
  addStyleClassToElement(helpMenuContainer, ['header-user-menu'])
  helpMenuContainer.appendChild(helpMenu)

  const helpMenuTrigger = document.createElement('button')
  addStyleClassToElement(helpMenuTrigger, ['header-user-menu__trigger'])
  helpMenuTrigger.type = 'button'

  const helpMenuIcon = document.createElement('img')
  helpMenuIcon.src = helpIcon
  addStyleClassToElement(helpMenuIcon, ['header-banner__help-icon'])
  helpMenuContainer.appendChild(helpMenuTrigger)
  helpMenuTrigger.appendChild(helpMenuIcon)

  const throttledMenuToggle = throttle((event: Event) => toggleMenu(event, helpMenuTrigger, helpMenu), 50)
  helpMenuTrigger.addEventListener('click', throttledMenuToggle)
  let timer = setTimeout(() => null, 0)
  helpMenuContainer.addEventListener('mouseover', event => {
    clearTimeout(timer)
    throttledMenuToggle(event)
  })
  helpMenuContainer.addEventListener('mouseout', event => {
    timer = setTimeout(() => throttledMenuToggle(event), 200)
  })

  return helpMenuContainer
}
/**
 * @ignore exporting this only for the unit test
 */
export function createLoginSignUpButtons () {
  const profileLoginButtonPre = document.createElement('div')
  addStyleClassToElement(profileLoginButtonPre, ['header-banner__login'])
  profileLoginButtonPre.appendChild(loginStatusBox(document, null, {}))
  return profileLoginButtonPre
}
/**
 * @ignore exporting this only for the unit test
 */
export function createUserMenuButton (label: string, onClick: EventListenerOrEventListenerObject): HTMLElement {
  const button = document.createElement('button')
  addStyleClassToElement(button, ['header-user-menu__button'])
  button.addEventListener('click', onClick)
  button.innerText = label
  return button
}
/**
 * @ignore exporting this only for the unit test
 */
export function createUserMenuLink (label: string, href: string): HTMLElement {
  const link = document.createElement('a')
  addStyleClassToElement(link, ['header-user-menu__link'])
  link.href = href
  link.innerText = label
  return link
}

/**
 * @ignore exporting this only for the unit test
 */
export async function createUserMenu (store: IndexedFormula, user: NamedNode, options?: HeaderOptions): Promise<HTMLElement> {
  const fetcher = (<any>store).fetcher
  if (fetcher) {
    // Making sure that Profile is loaded before building menu
    await fetcher.load(user)
  }
  const loggedInMenuList = document.createElement('ul')
  addStyleClassToElement(loggedInMenuList, ['header-user-menu__list'])
  loggedInMenuList.appendChild(createUserMenuItem(createUserMenuLink('Show your profile', user.uri)))
  if (options) {
    if (options.menuList) {
      options.menuList.forEach(function (menuItem) {
        const menuItemType: string = (menuItem as MenuItemLink).url ? 'url' : 'onclick'
        if (menuItemType === 'url') {
          loggedInMenuList.appendChild(createUserMenuItem(createUserMenuLink(menuItem.label, menuItem[menuItemType])))
        } else {
          loggedInMenuList.appendChild(createUserMenuItem(createUserMenuButton(menuItem.label, menuItem[menuItemType])))
        }
      })
    }
  }

  loggedInMenuList.appendChild(createUserMenuItem(createUserMenuButton('Log out', () => authSession.logout())))

  const loggedInMenu = document.createElement('nav')

  addStyleClassToElement(loggedInMenu, ['header-user-menu__navigation-menu'])
  loggedInMenu.setAttribute('aria-hidden', 'true')
  loggedInMenu.appendChild(loggedInMenuList)

  const loggedInMenuTrigger = document.createElement('button')
  addStyleClassToElement(loggedInMenuTrigger, ['header-user-menu__trigger'])
  loggedInMenuTrigger.type = 'button'
  const profileImg = getProfileImg(store, user)
  if (typeof profileImg === 'string') {
    loggedInMenuTrigger.innerHTML = profileImg
  } else {
    loggedInMenuTrigger.appendChild(profileImg)
  }

  const loggedInMenuContainer = document.createElement('div')
  addStyleClassToElement(loggedInMenuContainer, ['header-banner__user-menu'])
  addStyleClassToElement(loggedInMenuContainer, ['header-user-menu'])
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

/**
 * @ignore exporting this only for the unit test
 */
export function createUserMenuItem (child: HTMLElement): HTMLElement {
  const menuProfileItem = document.createElement('li')
  addStyleClassToElement(menuProfileItem, ['header-user-menu__list-item'])
  menuProfileItem.appendChild(child)
  return menuProfileItem
}
/**
 * @ignore exporting this only for the unit test
 */
export function getProfileImg (store: IndexedFormula, user: NamedNode): string | HTMLElement {
  const profileUrl = null
  try {
    const profileUrl = widgets.findImage(user)
    if (!profileUrl) {
      return emptyProfile
    }
  } catch {
    return emptyProfile
  }

  const profileImage = document.createElement('div')
  addStyleClassToElement(profileImage, ['header-user-menu__photo'])
  profileImage.style.backgroundImage = `url("${profileUrl}")`
  return profileImage
}

/**
 * @internal
 */
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
