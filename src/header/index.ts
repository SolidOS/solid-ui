/* global EventListenerOrEventListenerObject */
/*
    This file was copied from mashlib/src/global/header.ts file. It is modified to
    work in solid-ui by adjusting where imported functions are found.
 */
import { IndexedFormula, NamedNode } from 'rdflib'
import { icons } from '../iconBase'
import { loginStatusBox, authSession, currentUser } from '../authn/authn'
import * as widgets from '../widgets'
import { emptyProfile } from './empty-profile'
import { addStyleClassToElement, getPod, throttle } from '../utils/headerFooterHelpers'

/**
 * menu icons
*/
const DEFAULT_HELP_MENU_ICON = icons.iconBase + 'noun_help.svg'
const DEFAUL_SOLID_ICON_URL = 'https://solidproject.org/assets/img/solid-emblem.svg'

export type MenuItemLink = {
  label: string,
  url: string,
  target?: string
}

export type MenuItemButton = {
  label: string,
  onclick: () => void
}

export type MenuItems = MenuItemLink | MenuItemButton

/*
  HeaderOptions allow for customizing the logo and menu list.  If a logo is not provided the default
  is solid. Menulist will always show a link to logout and to the users profile.
  */
export type HeaderOptions = {
  logo?: string,
  helpIcon?: string,
  helpMenuList?: MenuItems[]
}

/**
 * Initialize header component, the header object returned depends on whether the user is authenticated.
 * @param store the data store
 * @param userMenuList a list of menu items when the user is logged in
 * @param options allow the header to be customized with a personalized logo, help icon and a help menu list of links or buttons.
 * @returns a header for an authenticated user with menu items given or a login screen
 */
export async function initHeader (store: IndexedFormula, userMenuList: MenuItems[], options?: HeaderOptions) {
  const header = document.getElementById('PageHeader')
  if (!header) {
    return
  }

  const pod = getPod()
  rebuildHeader(header, store, pod, userMenuList, options)()
  authSession.onLogout(rebuildHeader(header, store, pod, userMenuList, options))
  authSession.onLogin(rebuildHeader(header, store, pod, userMenuList, options))
}
/**
 * @ignore exporting this only for the unit test
 */
export function rebuildHeader (header: HTMLElement, store: IndexedFormula, pod: NamedNode, userMenuList: MenuItems[], options?: HeaderOptions) {
  return async () => {
    const user = currentUser()
    header.innerHTML = ''
    header.appendChild(await createBanner(store, pod, user, userMenuList, options))
  }
}
/**
 * @ignore exporting this only for the unit test
 */
export async function createBanner (store: IndexedFormula, pod: NamedNode, user: NamedNode | null, userMenuList: MenuItems[], options?: HeaderOptions): Promise<HTMLElement> {
  const podLink = document.createElement('a')
  podLink.href = pod.uri
  addStyleClassToElement(podLink, ['header-banner__link'])
  const image = document.createElement('img')
  if (options) {
    image.src = options.logo ? options.logo : DEFAUL_SOLID_ICON_URL
  }
  addStyleClassToElement(image, ['header-banner__icon'])
  podLink.appendChild(image)

  const userMenu = user
    ? await createUserMenu(store, user, userMenuList)
    : createLoginSignUpButtons()

  const banner = document.createElement('div')
  addStyleClassToElement(banner, ['header-banner'])
  banner.appendChild(podLink)

  const leftSideOfHeader = document.createElement('div')
  addStyleClassToElement(leftSideOfHeader, ['header-banner__right-menu'])
  leftSideOfHeader.appendChild(userMenu)

  if (options && options.helpMenuList) {
    const helpMenu = createHelpMenu(options, options.helpMenuList)
    leftSideOfHeader.appendChild(helpMenu as HTMLDivElement)
  }

  banner.appendChild(leftSideOfHeader)

  return banner
}
/**
 * @ignore exporting this only for the unit test
 */
export function createHelpMenu (options: HeaderOptions, helpMenuItems: MenuItems[]) {
  if (!helpMenuItems) return
  const helpMenuList = document.createElement('ul')
  addStyleClassToElement(helpMenuList, ['header-user-menu__list'])
  helpMenuItems.forEach(function (menuItem) {
    const menuItemType: string = (menuItem as MenuItemLink).url ? 'url' : 'onclick'
    if (menuItemType === 'url') {
      helpMenuList.appendChild(createUserMenuItem(createUserMenuLink(menuItem.label, (menuItem as MenuItemLink).url, (menuItem as MenuItemLink).target)))
    } else {
      helpMenuList.appendChild(createUserMenuItem(createUserMenuButton(menuItem.label, (menuItem as MenuItemButton).onclick)))
    }
  })

  const helpMenu = document.createElement('nav')

  addStyleClassToElement(helpMenu, ['header-user-menu__navigation-menu'])
  helpMenu.setAttribute('aria-hidden', 'true')
  helpMenu.appendChild(helpMenuList)

  const helpMenuContainer = document.createElement('div')
  addStyleClassToElement(helpMenuContainer, ['header-banner__user-menu'])
  addStyleClassToElement(helpMenuContainer, ['header-user-menu'])
  helpMenuContainer.appendChild(helpMenu)

  const helpMenuTrigger = document.createElement('button')
  addStyleClassToElement(helpMenuTrigger, ['header-user-menu__trigger'])
  helpMenuTrigger.type = 'button'

  const helpMenuIcon = document.createElement('img')
  helpMenuIcon.src = (options && options.helpIcon) ? options.helpIcon : icons.iconBase + DEFAULT_HELP_MENU_ICON
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
export function createUserMenuLink (label: string, href: string, target?: string): HTMLElement {
  const link = document.createElement('a')
  addStyleClassToElement(link, ['header-user-menu__link'])
  link.href = href
  link.innerText = label
  if (target) link.target = target
  return link
}

/**
 * @ignore exporting this only for the unit test
 */
export async function createUserMenu (store: IndexedFormula, user: NamedNode, userMenuList: MenuItems[]): Promise<HTMLElement> {
  const fetcher = (<any>store).fetcher
  if (fetcher) {
    // Making sure that Profile is loaded before building menu
    await fetcher.load(user)
  }

  const loggedInMenuList = document.createElement('ul')
  addStyleClassToElement(loggedInMenuList, ['header-user-menu__list'])
  if (userMenuList) {
    userMenuList.forEach(function (menuItem) {
      const menuItemType: string = (menuItem as MenuItemLink).url ? 'url' : 'onclick'
      if (menuItemType === 'url') {
        loggedInMenuList.appendChild(createUserMenuItem(createUserMenuLink(menuItem.label, (menuItem as MenuItemLink).url, (menuItem as MenuItemLink).target)))
      } else {
        loggedInMenuList.appendChild(createUserMenuItem(createUserMenuButton(menuItem.label, (menuItem as MenuItemButton).onclick)))
      }
    })
  }
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
  let profileUrl = null
  try {
    profileUrl = widgets.findImage(user)
    if (!profileUrl) {
      return emptyProfile
    }
  } catch {
    return emptyProfile
  }

  const profileImage = document.createElement('div')
  addStyleClassToElement(profileImage, ['header-user-menu__photo'])
  profileImage.style.backgroundImage = `url(${profileUrl})`
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
