import { silenceDebugMessages } from '../helpers/debugger'
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
import { solidLogicSingleton } from 'solid-logic'
// import { JSDOM } from 'jsdom'

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
})
describe('createUserMenuButton', () => {
  it('creates a button', () => {
    const label = 'testing button'
    const onclick = () => { window.alert('test') }
    expect(createUserMenuButton(label, onclick)).toMatchSnapshot()
  })
})

describe('createUserMenuLink', () => {
  it('creates a link', () => {
    const label = 'testing link'
    const url = 'http://www.test.com'
    expect(createUserMenuLink(label, url)).toMatchSnapshot()
  })
})
describe('createUserMenuItem', () => {
  it('creates a link', () => {
    const ulElement = document.createElement('ul')
    expect(createUserMenuItem(ulElement)).toMatchSnapshot()
  })
})
describe('createUserMenu', () => {
  it('creates a menu....', async () => {
    const pod = new NamedNode('https://sharonstrats.inrupt.net/profile/card#me')
    const menuList = [{ label: 'Testing', url: 'https://reflectechblog.wordpress.com/' }]
    expect(await createUserMenu(store, pod, menuList)).toMatchSnapshot()
  })
})

describe('createHelpMenu', () => {
  it('creates a menu....', () => {
    expect(createHelpMenu({}, [])).toMatchSnapshot()
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
  it('check customized logo...', async () => {
    const pod = new NamedNode('https://test.com')
    const user = new NamedNode('https://sharonstrats.inrupt.net/profile/card#me')
    const menuList = [{ label: 'Testing', url: 'https://reflectechblog.wordpress.com/' }]
    const options = { logo: 'https://solidproject.org/assets/img/solid-emblem.svg', helpMenuList: [{ label: 'Testing', url: 'https://reflectechblog.wordpress.com/' }] }
    expect(await createBanner(store, pod, user, menuList, options)).toMatchSnapshot()
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
