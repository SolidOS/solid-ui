import { silenceDebugMessages } from '../../helpers/setup'
import {
  initHeader,
  createLoginSignUpButtons,
  createUserMenuButton,
  createUserMenuLink,
  createUserMenuItem,
  rebuildHeader,
  getProfileImg,
  createBanner,
  createUserMenu,
  createHelpMenu
} from '../../../src/header'
import { NamedNode } from 'rdflib'
// @ts-ignore
import widgets from '../../../src/widgets/index'
import { solidLogicSingleton } from '../../../src/logic'

const store = solidLogicSingleton.store

silenceDebugMessages()

describe('header', () => {
  const options = { helpMenuList: [{ label: 'Testing', url: 'https://reflectechblog.wordpress.com/' }] }
  it('is exposed on public API', async () => {
    const menu = [{ label: 'Testing', onclick: () => 'https://reflectechblog.wordpress.com/' }]
    expect(await initHeader(store, menu, options)).toMatchSnapshot()
  })
})
describe('createLoginSignUpButtons', () => {
  it('creates div', () => {
    expect(createLoginSignUpButtons()).toMatchSnapshot()
  })
  it('assigns class header-banner__login', () => {
    const signUpDiv = createLoginSignUpButtons()
    expect(signUpDiv.className).toContain('header-banner__login')
  })
})
describe('createUserMenuButton', () => {
  it('creates a button', () => {
    const label = 'testing button'
    const onclick = () => { window.alert('test') }
    expect(createUserMenuButton(label, onclick)).toMatchSnapshot()
  })
  it('checks to see if the class is header-user-menu__button', () => {
    const label = 'testing button'
    const onclick = () => { window.alert('test') }
    const button = createUserMenuButton(label, onclick)
    expect(button.className).toContain('header-user-menu__button')
  })
})

describe('createUserMenuLink', () => {
  it('creates a link', () => {
    const label = 'testing link'
    const url = 'http://www.test.com'
    expect(createUserMenuLink(label, url)).toMatchSnapshot()
  })
  it('assigns link class header-user-menu__link', () => {
    const label = 'testing link'
    const url = 'http://www.test.com'
    const menuLink = createUserMenuLink(label, url)
    expect(menuLink.className).toContain('header-user-menu__link')
  })
})
describe('createUserMenuItem', () => {
  it('creates a link', () => {
    const ulElement = document.createElement('ul')
    expect(createUserMenuItem(ulElement)).toMatchSnapshot()
  })
  it('assigns list item class header-user-menu__list-item', () => {
    const ulElement = document.createElement('ul')
    const listItem = createUserMenuItem(ulElement)
    expect(listItem.className).toContain('header-user-menu__list-item')
  })
})
describe('createUserMenu', () => {
  it('creates a menu....', () => {
    const pod = new NamedNode('https://sharonstrats.inrupt.net/profile/card#me')
    const menuList = [{ label: 'Testing', url: 'https://reflectechblog.wordpress.com/' }]
    expect(createUserMenu(store, pod, menuList)).toMatchSnapshot()
  })
  it('assigns list item class header-banner__user-menu and header-user-menu', async () => {
    const pod = new NamedNode('https://sharonstrats.inrupt.net/profile/card#me')
    const menuList = [{ label: 'Testing', url: 'https://reflectechblog.wordpress.com/' }]
    const userMenu = await createUserMenu(store, pod, menuList)
    expect(userMenu.className).toContain('header-banner__user-menu')
  })
})

describe('createHelpMenu', () => {
  it('creates a menu....', () => {
    expect(createHelpMenu()).toMatchSnapshot()
  })
  it('assigns list item class header-banner__user-menu and header-user-menu', () => {
    const options = { helpMenuList: [{ label: 'Testing', url: 'https://reflectechblog.wordpress.com/' }] }
    const helpMenu = createHelpMenu(options, options.helpMenuList)
    expect(helpMenu.className).toContain('header-banner__user-menu')
  })
})
describe('rebuildHeader', () => {
  it('creates a link', () => {
    const header = document.createElement('nav')
    const pod = new NamedNode('https://test.com')
    const menuList = [{ label: 'Testing', url: 'https://reflectechblog.wordpress.com/' }]
    const options = { helpMenuList: [{ label: 'Testing', url: 'https://reflectechblog.wordpress.com/' }] }
    expect(rebuildHeader(header, store, pod, menuList, options)).toMatchSnapshot()
  })
})
describe('createBanner', () => {
  it('creates a link', async () => {
    const pod = new NamedNode('https://test.com')
    const user = new NamedNode('https://sharonstrats.inrupt.net/profile/card#me')
    const menuList = [{ label: 'Testing', url: 'https://reflectechblog.wordpress.com/' }]
    const options = { helpMenuList: [{ label: 'Testing', url: 'https://reflectechblog.wordpress.com/' }] }
    expect(await createBanner(store, pod, user, menuList, options)).toMatchSnapshot()
  })
  it('assigns list item class header-banner', async () => {
    const pod = new NamedNode('https://test.com')
    const user = new NamedNode('https://sharonstrats.inrupt.net/profile/card#me')
    const menuList = [{ label: 'Testing', url: 'https://reflectechblog.wordpress.com/' }]
    const options = { helpMenuList: [{ label: 'Testing', url: 'https://reflectechblog.wordpress.com/' }] }
    const banner = await createBanner(store, pod, user, menuList, options)
    expect(banner.className).toContain('header-banner')
  })
  it('check customized logo...', async () => {
    const pod = new NamedNode('https://test.com')
    const user = new NamedNode('https://sharonstrats.inrupt.net/profile/card#me')
    const menuList = [{ label: 'Testing', url: 'https://reflectechblog.wordpress.com/' }]
    const options = { logo: 'https://solidproject.org/assets/img/solid-emblem.svg', helpMenuList: [{ label: 'Testing', url: 'https://reflectechblog.wordpress.com/' }] }
    expect(await createBanner(store, pod, user, menuList, options)).toMatchSnapshot()
    // check something else re logo expect(banner.className).toContain('header-banner')
  })
})

// getProfileImg, need to mock widgets.findImage(user)
describe('getProfileImg', () => {
  it.skip('returns an empty image', () => {
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line no-undef
    const findImageSpy = jest.spyOn(widgets, 'findImage').mockImplementation(() => { return 'test' })
    const user = new NamedNode('http://test.com')
    expect(getProfileImg(store, user)).toMatchSnapshot()
    expect(findImageSpy).toBeCalled()
  })
})
