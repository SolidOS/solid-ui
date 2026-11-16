import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { silenceDebugMessages } from '../helpers/debugger'
import { JSDOM, DOMWindow } from 'jsdom'
import { getByRole } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import {
  addStyleSheet,
  allClassURIs,
  askName,
  attachmentList,
  button,
  cancelButton,
  clearElement,
  createLinkDiv,
  createNameDiv,
  complain,
  continueButton,
  defaultAnnotationStore,
  deleteButtonWithCheck,
  extractLogURI,
  findImage,
  findImageFromURI,
  fileUploadButtonDiv,
  formatDateTime,
  imagesOf,
  index,
  isAudio,
  isImage,
  isVideo,
  linkButton,
  openHrefInOutlineMode,
  personTR,
  propertyTriage,
  refreshTree,
  removeButton,
  renderAsDiv,
  RenderAsDivOptions,
  selectorPanel,
  selectorPanelRefresh,
  setImage,
  setName,
  shortDate,
  shortTime,
  timestamp
} from '../../../src/widgets/buttons'
import { graph, namedNode, NamedNode, sym } from 'rdflib'
// @ts-ignore
import ns from '../../../src/lib/ns'
// @ts-ignore
import { icons } from '../../../src/lib/iconBase'
import { clearStore } from '../helpers/clearStore'
import { domWithHead } from '../../helpers/dom-with-head'
import { solidLogicSingleton } from 'solid-logic'
import { style } from '../../../src/lib/style'
const { iconBase } = icons
const store = solidLogicSingleton.store

silenceDebugMessages()
let window: DOMWindow
let dom: HTMLDocument
let element: HTMLDivElement
let image: HTMLImageElement
let obj: NamedNode
let event: Event
let clickEvent: Event

beforeEach(() => {
  window = new JSDOM('<!DOCTYPE html><head></head><body><p>Hello world</p></body>').window
  dom = window.document
  element = dom.createElement('div')
  event = new window.Event('test')
  image = dom.createElement('img')
  obj = new NamedNode('https://test.test#')
  clickEvent = new window.Event('click')
  dom.dispatchEvent(event)
})
describe('addStyleSheet', () => {
  it('exists', () => {
    expect(addStyleSheet).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const href = ''
    expect(addStyleSheet(dom, href)).toEqual(undefined)
  })
})

describe('allClassURIs', () => {
  it('exists', () => {
    expect(allClassURIs).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(allClassURIs()).toBeTruthy()
  })
})

describe('askName', () => {
  it('exists', () => {
    expect(askName).toBeInstanceOf(Function)
  })
  it.skip('runs', async () => {
    const kb = graph()
    const container = element
    const predicate = {} as NamedNode
    const theClass = {} as NamedNode
    const noun = ''
    expect(await askName(dom, kb, container, predicate, theClass, noun)).toBeTruthy()
  })
})

describe('attachmentList', () => {
  afterEach(() => {
    clearStore()
    vi.restoreAllMocks()
  })

  it('exists', () => {
    expect(attachmentList).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const subject = sym('https://test.test#')
    const div = element
    const options = {}
    expect(attachmentList(dom, subject, div, options)).toBeTruthy()
  })

  it('keeps delete confirmations inside the row by default', () => {
    const subject = sym('https://subject.example/profile/card#me')
    const target = sym('https://friend.example/profile/card#me')
    store.add(subject, ns.foaf('knows'), target, subject.doc())
    const list = attachmentList(dom, subject, element, { predicate: ns.foaf('knows') })
    const remove = list.querySelector<HTMLImageElement>('[title="Remove this attachment"]')!
    remove.click()

    const reference = remove.previousElementSibling as HTMLElement
    expect(reference.parentElement).toBe(remove.parentElement)
    expect(reference.style.position).toBe('relative')
    expect((reference.firstElementChild as HTMLElement).style.position).toBe('absolute')
    expect(getByRole(reference, 'button', { name: 'Remove this attachment' })).toBeTruthy()
  })

  it('places confirmations in the optional container, including after a refresh', () => {
    dom.body.appendChild(element)
    const subject = sym('https://subject.example/profile/card#me')
    const target = sym('https://friend.example/profile/card#me')
    const host = dom.body.appendChild(dom.createElement('div'))
    const sentinel = host.appendChild(dom.createElement('p'))
    store.add(subject, ns.foaf('knows'), target, subject.doc())
    const list = attachmentList(dom, subject, element, {
      predicate: ns.foaf('knows'),
      noun: 'friend',
      confirmationContainer: host,
      renderSupportingInfo: () => null,
      refreshOnDocumentLoad: false
    })
    const open = () => list.querySelector<HTMLImageElement>('[title="Remove this friend"]')!.click()
    open()
    open()

    expect(host.querySelectorAll('[role="dialog"]')).toHaveLength(1)
    const dialog = host.querySelector<HTMLElement>('[role="dialog"]')!
    expect(dialog.parentElement).toBe(host)
    expect(host.contains(sentinel)).toBe(true)
    expect(list.contains(dialog)).toBe(false)
    expect((dialog.firstElementChild as HTMLElement).style.position).toBe('static')
    const cancel = Array.from(dialog.querySelectorAll('button'))
      .find(button => button.textContent === 'Cancel')!
    expect(dom.activeElement).toBe(cancel)
    cancel.click()
    expect(host.querySelector('[role="dialog"]')).toBeNull()
    expect(store.holds(subject, ns.foaf('knows'), target)).toBe(true)
    expect(dom.activeElement).toBe(list.querySelector('[title="Remove this friend"]'))

    refreshTree(list)
    open()
    expect(host.querySelectorAll('[role="dialog"]')).toHaveLength(1)
  })

  it('restores focus after asynchronous deletion and when the list becomes empty', async () => {
    dom.body.appendChild(element)
    const host = dom.body.appendChild(dom.createElement('div'))
    const subject = sym('https://subject.example/profile/card#me')
    const targets = [
      sym('https://first.example/profile/card#me'),
      sym('https://second.example/profile/card#me')
    ]
    const predicate = ns.foaf('knows')
    targets.forEach(target => store.add(subject, predicate, target, subject.doc()))
    const update = vi.spyOn(store.updater!, 'update').mockImplementation(() => Promise.resolve())
    const list = attachmentList(dom, subject, element, {
      predicate,
      confirmationContainer: host,
      renderSupportingInfo: () => null,
      refreshOnDocumentLoad: false
    })

    for (const target of targets) {
      const remove = list.querySelector<HTMLElement>('[data-testid="deleteButtonWithCheck"]')!
      remove.click()
      getByRole(host, 'button', { name: 'Remove this attachment' }).click()
      expect(host.querySelector('[role="dialog"]')).toBeNull()
      expect(dom.activeElement).toBe(remove)

      const callback = update.mock.calls[update.mock.calls.length - 1][2]!
      store.removeMatches(subject, predicate, target)
      callback(subject.doc().uri, true, '')
      await Promise.resolve()

      const remainingRemove = list.querySelector('[data-testid="deleteButtonWithCheck"]')
      expect(dom.activeElement).toBe(remainingRemove || list.querySelector('button'))
      expect(dom.activeElement?.isConnected).toBe(true)
    }
  })

  it('refreshes rows after pending profile fetches by default', () => {
    const subject = sym('https://subject.example/profile/card#me')
    const predicate = ns.foaf('knows')
    const target = sym('https://friend.example/profile/card#me')
    const div = element
    const fetcher = store.fetcher as any

    store.add(subject, predicate, target, subject.doc())
    fetcher.requested = {
      ...fetcher.requested,
      [target.doc().uri]: 'requested'
    }

    const nowOrWhenFetched = vi
      .spyOn(fetcher, 'nowOrWhenFetched')
      .mockImplementation(() => undefined as any)

    attachmentList(dom, subject, div, {
      predicate,
      renderSupportingInfo: () => null
    })

    expect(nowOrWhenFetched).toHaveBeenCalledWith(
      target.doc(),
      undefined,
      expect.any(Function)
    )
  })

  it('adds one extra document-load refresh hook only when enabled', () => {
    const subject = sym('https://subject.example/profile/card#me')
    const predicate = ns.foaf('knows')
    const target = sym('https://friend.example/profile/card#me')
    const div = element
    const fetcher = store.fetcher as any

    store.add(subject, predicate, target, subject.doc())
    fetcher.requested = {
      ...fetcher.requested,
      [target.doc().uri]: 'requested'
    }

    const nowOrWhenFetched = vi
      .spyOn(fetcher, 'nowOrWhenFetched')
      .mockImplementation(() => undefined as any)

    attachmentList(dom, subject, div, {
      predicate,
      refreshOnDocumentLoad: false,
      renderSupportingInfo: () => null
    })
    const disabledCallCount = nowOrWhenFetched.mock.calls.length

    nowOrWhenFetched.mockClear()
    div.innerHTML = ''

    attachmentList(dom, subject, div, {
      predicate,
      renderSupportingInfo: () => null
    })

    expect(nowOrWhenFetched.mock.calls.length).toBe(disabledCallCount + 1)
  })
})

describe('button', () => {
  it('exists', () => {
    expect(button).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const iconURI = ''
    const text = 'txt'
    const handler = () => {}
    expect(button(domWithHead(), iconURI, text, handler)).toBeTruthy()
  })
  it('calls the callback when you click it', () => {
    let called = false
    const iconURI = ''
    const text = 'txt'
    const handler = () => {
      called = true
    }
    const buttonElt = button(domWithHead(), iconURI, text, handler)
    buttonElt.dispatchEvent(clickEvent)
    expect(called).toBe(true)
  })

  it('text button with upper-cased caption', () => {
    const buttonElt = button(domWithHead(), undefined, 'Click me', () => {})
    expect(buttonElt.innerHTML).toBe('CLICK ME')
  })
})

describe('cancelButton', () => {
  it('exists', () => {
    expect(cancelButton).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const handler = () => {}
    expect(cancelButton(dom, handler)).toBeTruthy()
  })
})

describe('clearElement', () => {
  it('exists', () => {
    expect(clearElement).toBeInstanceOf(Function)
  })
  it.skip('runs', () => {
    expect(clearElement(element)).toBeTruthy()
  })
})

describe('complain', () => {
  it('exists', () => {
    expect(complain).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(complain()).toEqual(undefined)
  })
})

describe('continueButton', () => {
  it('exists', () => {
    expect(continueButton).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const handler = () => {}
    expect(continueButton(dom, handler)).toBeTruthy()
  })
})
describe('createLinkDiv', () => {
  const obj = namedNode('https://test.com/#name')
  const options: RenderAsDivOptions = {
    deleteFunction: () => {},
    link: true
  }

  it('adds a div to the element provided', () => {
    createLinkDiv(dom, element, obj, options)
    expect(element.children.length).toBeGreaterThan(0)
  })
  it('makes the element draggable', () => {
    createLinkDiv(dom, element, obj, options)
    expect(element.getAttribute('draggable')).toEqual('true')
  })
  it('adds the style....', () => {
    const options = {}
    createLinkDiv(dom, element, obj, options)
    expect(element.children[0].getAttribute('style')).toEqual(style.linkDivStyle)
  })

  it.skip('adds the deleteFunction of .... deleteButton with Check', () => {
    createLinkDiv(dom, element, obj, options)
    const deleteImg = getByRole(element, 'button')
    expect(deleteImg.nodeName).toEqual('IMG')
    expect(deleteImg.getAttribute('title')).toEqual('Remove this one')
  })

  it('adds the link icon and link for the uri if link option is true', () => {
    const options = {
      link: true
    }
    // testing-library dom need to check solid-panes
    createLinkDiv(dom, element, obj, options)
    expect(element.children[0].children[0].nodeName).toEqual('A')
  })
})

describe('createNameDiv', () => {
  const obj = namedNode('https://test.com/#name')

  it('adds a div to the element with textContent equal to Something', () => {
    createNameDiv(dom, element, 'Something', obj)
    expect(element.children.length).toBeGreaterThan(0)
    expect(element.children[0].textContent).toEqual('Something')
  })

  it('uses the name from the obj if no title is given', () => {
    createNameDiv(dom, element, undefined, obj)
    expect(element.children[0].textContent).toEqual('name')
  })
})
describe('defaultAnnotationStore', () => {
  it('exists', () => {
    expect(defaultAnnotationStore).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(defaultAnnotationStore(sym('https://test.test#'))).toEqual(undefined)
  })
})

describe('deleteButtonWithCheck', () => {
  it('exists', () => {
    expect(deleteButtonWithCheck).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const container = element
    const noun = ''
    const deleteFunction = () => {}
    expect(deleteButtonWithCheck(dom, container, noun, deleteFunction)).toBeTruthy()
  })

  it.each([false, true])('preserves cancel and confirm handlers with an external container: %s', external => {
    const host = external ? dom.createElement('div') : undefined
    const deleteFunction = vi.fn()
    const remove = deleteButtonWithCheck(dom, element, 'friend', deleteFunction, host)
    const popupContainer = host || element
    remove.click()
    const cancel = Array.from(popupContainer.querySelectorAll('button'))
      .find(button => button.textContent === 'Cancel')!
    cancel.click()
    expect(popupContainer.querySelector('button')).toBeNull()
    expect(deleteFunction).not.toHaveBeenCalled()

    remove.click()
    const popup = external ? host! : remove.previousElementSibling as HTMLElement
    getByRole(popup, 'button', { name: 'Remove this friend' }).click()
    expect(deleteFunction).toHaveBeenCalledTimes(1)
    expect(popupContainer.querySelector('button')).toBeNull()
  })

  it.each(['text', 'icon'])('restores focus to the originating control after %s cancellation', control => {
    dom.body.appendChild(element)
    const host = dom.body.appendChild(dom.createElement('div'))
    const deleteFunction = vi.fn()
    const remove = deleteButtonWithCheck(dom, element, 'friend', deleteFunction, host)
    remove.focus()
    expect(dom.activeElement).toBe(remove)
    expect(getByRole(element, 'button', { name: 'Remove this friend' })).toBe(remove)

    remove.click()
    const cancel = Array.from(host.querySelectorAll('button'))
      .find(button => button.textContent === 'Cancel')!
    expect(dom.activeElement).toBe(cancel)
    if (control === 'text') {
      cancel.click()
    } else {
      host.querySelector('button')!.click()
    }

    expect(host.querySelector('[role="dialog"]')).toBeNull()
    expect(dom.activeElement).toBe(remove)
    expect(deleteFunction).not.toHaveBeenCalled()
  })

  it.each(['Enter', ' '])('opens confirmation with the %s key', key => {
    dom.body.appendChild(element)
    const host = dom.body.appendChild(dom.createElement('div'))
    const remove = deleteButtonWithCheck(dom, element, 'friend', vi.fn(), host)
    remove.focus()
    remove.dispatchEvent(new window.KeyboardEvent('keydown', { key, bubbles: true }))

    const cancel = Array.from(host.querySelectorAll('button'))
      .find(button => button.textContent === 'Cancel')!
    expect(dom.activeElement).toBe(cancel)
  })

  it.each(['first', 'last'])('focuses a surviving control after deleting the %s row', position => {
    dom.body.appendChild(element)
    const host = dom.body.appendChild(dom.createElement('div'))
    const firstRow = element.appendChild(dom.createElement('div'))
    const lastRow = element.appendChild(dom.createElement('div'))
    const firstRemove = deleteButtonWithCheck(dom, firstRow, 'friend', () => firstRow.remove(), host)
    const lastRemove = deleteButtonWithCheck(dom, lastRow, 'friend', () => lastRow.remove(), host)
    const remove = position === 'first' ? firstRemove : lastRemove
    const survivor = position === 'first' ? lastRemove : firstRemove

    remove.click()
    if (position === 'first') {
      getByRole(host, 'button', { name: 'Remove this friend' }).click()
    } else {
      host.querySelector<HTMLElement>('img[title="Delete it"]')!.parentElement!.click()
    }

    expect(host.querySelector('[role="dialog"]')).toBeNull()
    expect(remove.isConnected).toBe(false)
    expect(dom.activeElement).toBe(survivor)
  })
})

describe('extractLogURI', () => {
  it('exists', () => {
    expect(extractLogURI).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const fullURI = ''
    expect(extractLogURI(fullURI)).toEqual('')
  })
})

describe('findImage', () => {
  const subject = sym('https://domain.tld/#test')
  const imageObject = sym('https://domain.tld/#image')

  afterEach(clearStore)

  it('exists', () => {
    expect(findImage).toBeInstanceOf(Function)
  })
  it('handles foaf(Agent)', () =>
    expect(findImage(ns.foaf('Agent'))).toEqual(iconBase + 'noun_98053.svg'))
  it('handles rdf(Resource)', () =>
    expect(findImage(ns.rdf('Resource'))).toEqual(iconBase + 'noun_98053.svg'))
  it('handles sioc(avatar)', () => {
    store.add(subject, ns.sioc('avatar'), imageObject, subject.doc())
    expect(findImage(subject)).toEqual(imageObject.uri)
  })
  it('handles sioc(avatar)', () => {
    store.add(subject, ns.foaf('img'), imageObject, subject.doc())
    expect(findImage(subject)).toEqual(imageObject.uri)
  })
  it('handles vcard(logo)', () => {
    store.add(subject, ns.vcard('logo'), imageObject, subject.doc())
    expect(findImage(subject)).toEqual(imageObject.uri)
  })
  it('handles vcard(hasPhoto)', () => {
    store.add(subject, ns.vcard('hasPhoto'), imageObject, subject.doc())
    expect(findImage(subject)).toEqual(imageObject.uri)
  })
  it('handles vcard(photo)', () => {
    store.add(subject, ns.vcard('photo'), imageObject, subject.doc())
    expect(findImage(subject)).toEqual(imageObject.uri)
  })
  it('handles foaf(depiction)', () => {
    store.add(subject, ns.foaf('depiction'), imageObject, subject.doc())
    expect(findImage(subject)).toEqual(imageObject.uri)
  })
  it('returns null when nothing is found', () => expect(findImage(subject)).toBeNull())
})

describe('findImageFromURI', () => {
  it('exists', () => {
    expect(findImageFromURI).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(findImageFromURI('')).toEqual(
      'https://solidos.github.io/solid-ui/src/icons/noun_10636_grey.svg'
    )
  })
})

describe('fileUploadButtonDiv', () => {
  it('exists', () => {
    expect(fileUploadButtonDiv).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const handler = () => {}
    expect(fileUploadButtonDiv(dom, handler)).toBeTruthy()
  })
})

describe('formatDateTime', () => {
  it('exists', () => {
    expect(formatDateTime).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const date = new Date('2020')
    const format = ''
    expect(formatDateTime(date, format)).toEqual('')
  })
})

describe('imagesOf', () => {
  it('exists', () => {
    expect(imagesOf).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(imagesOf(null, graph())).toBeTruthy()
  })
})

describe('index', () => {
  it('exists', () => {
    expect(index).toBeInstanceOf(Object)
  })
})
describe('index.line', () => {
  it('exists', () => {
    expect(index.line).toBeInstanceOf(Object)
  })
})
describe('index.twoLine', () => {
  it('exists', () => {
    expect(index.twoLine).toBeInstanceOf(Object)
  })
})
describe('index.twoLine[\'\']', () => {
  it('exists', () => {
    expect(index.twoLine['']).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(index.twoLine[''](dom, sym('https://domain.tld/#test'))).toBeTruthy()
  })
})
describe('index.twoLine[\'http://www.w3.org/2000/10/swap/pim/qif#Transaction\']', () => {
  it('exists', () => {
    expect(index.twoLine['http://www.w3.org/2000/10/swap/pim/qif#Transaction']).toBeInstanceOf(
      Function
    )
  })
  it('runs', () => {
    expect(
      index.twoLine['http://www.w3.org/2000/10/swap/pim/qif#Transaction'](
        dom,
        sym('https://domain.tld/#test')
      )
    ).toBeTruthy()
  })
})
describe('index.twoLine[\'http://www.w3.org/ns/pim/trip#Trip\']', () => {
  it('exists', () => {
    expect(index.twoLine['http://www.w3.org/ns/pim/trip#Trip']).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(index.twoLine['http://www.w3.org/ns/pim/trip#Trip'](dom, null)).toBeTruthy()
  })
})
describe('index.twoLine.widgetForClass', () => {
  it('exists', () => {
    expect(index.twoLine.widgetForClass).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(index.twoLine.widgetForClass(sym('https://test.test#'))).toBeInstanceOf(Function)
  })
})

describe('isAudio', () => {
  it('exists', () => {
    expect(isAudio).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(isAudio()).toEqual(false)
  })
})

describe('isImage', () => {
  it('exists', () => {
    expect(isImage).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(isImage()).toEqual(false)
  })
})

describe('isVideo', () => {
  it('exists', () => {
    expect(isVideo).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(isVideo()).toEqual(false)
  })
})

describe('linkButton', () => {
  it('exists', () => {
    expect(linkButton).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const object = sym('https://test.test#')
    expect(linkButton(dom, object)).toBeTruthy()
  })
})

describe('openHrefInOutlineMode', () => {
  it('exists', () => {
    expect(openHrefInOutlineMode).toBeInstanceOf(Function)
  })
  it.skip('runs', () => {
    expect(openHrefInOutlineMode(event)).toEqual(undefined)
  })
})

describe('personTR', () => {
  it('exists', () => {
    expect(personTR).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const pred = sym('https://test.test#')
    const obj = sym('https://test.test#')
    const options = {}
    expect(personTR(dom, pred, obj, options)).toBeTruthy()
  })
})

describe('renderAsDiv ', () => {
  it('is exposed on public API', () => {
    expect(renderAsDiv).toBe(renderAsDiv)
  })

  it('uses the image given', () => {
    image.setAttribute('alt', 'test')
    const options = { image }
    const element = renderAsDiv(dom, obj, options)
    expect(element.children[0].children[0].getAttribute('alt')).toEqual('test')
  })
  it('the div is clickable if given true for the clickable option', () => {
    const mockClickFunction = vi.fn()
    const options = {
      clickable: true,
      onClickFunction: mockClickFunction
    }
    const element = renderAsDiv(dom, obj, options)
    userEvent.click(element)
    expect(mockClickFunction).toHaveBeenCalled()
  })
  it('wraps the div in a TR if wrapInATR option is set to true', () => {
    const options = {
      wrapInATR: true
    }
    const element = renderAsDiv(dom, obj, options)
    expect(element.nodeName).toEqual('TR')
  })
})

describe('propertyTriage', () => {
  it('exists', () => {
    expect(propertyTriage).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(propertyTriage(graph())).toBeTruthy()
  })
})

describe('refreshTree', () => {
  it('exists', () => {
    expect(refreshTree).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(refreshTree({ children: [] })).toEqual(undefined)
  })
})

describe('removeButton', () => {
  it('exists', () => {
    expect(removeButton).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(removeButton(dom, element)).toBeTruthy()
  })
})

describe('selectorPanel', () => {
  it('exists', () => {
    expect(selectorPanel).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const kb = graph()
    const type = namedNode('https://domain.tld/#test')
    const predicate = namedNode('https://domain.tld/#test')
    const inverse = false
    const possible = [namedNode('https://domain.tld/#test')]
    const options = {}
    const callbackFunction = () => {}
    const linkCallback = () => {}
    expect(
      selectorPanel(
        dom,
        kb,
        type,
        predicate,
        inverse,
        possible,
        options,
        callbackFunction,
        linkCallback
      )
    ).toBeTruthy()
  })
})

describe('selectorPanelRefresh', () => {
  it('exists', () => {
    expect(selectorPanelRefresh).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const list = dom.createElement('ul')
    const kb = graph()
    const type = namedNode('https://domain.tld/#test')
    const predicate = namedNode('https://domain.tld/#test')
    const inverse = false
    const possible = [namedNode('https://domain.tld/#test')]
    const options = {}
    const callbackFunction = () => {}
    const linkCallback = () => {}
    expect(
      selectorPanelRefresh(
        list,
        dom,
        kb,
        type,
        predicate,
        inverse,
        possible,
        options,
        callbackFunction,
        linkCallback
      )
    ).toBeTruthy()
  })
})

describe('setImage', () => {
  it('exists', () => {
    expect(setImage).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const thing = sym('https://test.test#')
    expect(setImage(element, thing)).toEqual(undefined)
  })
})

describe('setName', () => {
  it('exists', () => {
    expect(setName).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const thing = sym('https://test.test#')
    expect(setName(element, thing)).toEqual(undefined)
  })
})

describe('shortDate', () => {
  it('exists', () => {
    expect(shortDate).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(shortDate()).toBeTruthy()
  })
})

describe('shortTime', () => {
  it('exists', () => {
    expect(shortTime).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(shortTime()).toBeTruthy()
  })
})

describe('timestamp', () => {
  it('exists', () => {
    expect(timestamp).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(timestamp()).toBeTruthy()
  })
})
