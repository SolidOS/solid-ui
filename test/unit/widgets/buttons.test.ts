import { silenceDebugMessages } from '../../helpers/setup'
import { JSDOM, DOMWindow } from 'jsdom'
import {
  addStyleSheet,
  allClassURIs,
  askName,
  attachmentList,
  button,
  cancelButton,
  clearElement,
  complain,
  continueButton,
  createLinkDiv,
  createNameDiv,
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
import {
  linkDivStyle
} from '../../../src/style'
import { graph, namedNode, NamedNode, sym } from 'rdflib'
// @ts-ignore
import { foaf, rdf, sioc, vcard } from '../../../src/ns'
// @ts-ignore
import { icons } from '../../../src/iconBase'
import { clearStore } from '../helpers/clearStore'
import { domWithHead } from '../../helpers/dom-with-head'
import { solidLogicSingleton } from '../../../src/logic'

const { iconBase } = icons
const store = solidLogicSingleton.store

silenceDebugMessages()
jest.mock('solid-auth-client', () => ({
  currentSession: () => Promise.resolve(),
  trackSession: () => null
}))
let window: DOMWindow
let dom: HTMLDocument
let element: HTMLDivElement
let linkDiv: HTMLDivElement
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
  linkDiv = dom.createElement('div')
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
  it('exists', () => {
    expect(attachmentList).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const subject = sym('https://test.test#')
    const div = element
    const options = {}
    expect(attachmentList(dom, subject, div, options)).toBeTruthy()
  })
})

describe('button', () => {
  it('exists', () => {
    expect(button).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const iconURI = ''
    const text = 'txt'
    const handler = () => {
    }
    expect(button(domWithHead(), iconURI, text, handler)).toBeTruthy()
  })
  it('has the style class from JSS', () => {
    const iconURI = ''
    const text = 'txt'
    const handler = () => {
    }
    const buttonElt = button(domWithHead(), iconURI, text, handler)
    expect(buttonElt.classList[0]).toEqual(expect.stringMatching(/^textButton-\d-\d-\d$/))
  })
  it('calls the callback when you click it', (done) => {
    const iconURI = ''
    const text = 'txt'
    const handler = () => {
      done()
    }
    const buttonElt = button(domWithHead(), iconURI, text, handler)
    buttonElt.dispatchEvent(clickEvent)
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
    const handler = () => {
    }
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
    const handler = () => {
    }
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
    createLinkDiv(dom, element, obj, options)
    expect(element.children[0].getAttribute('style')).toEqual(linkDivStyle)
  })
  it('adds the deleteFunction of .... deleteButton with Check', () => {
    const options = {
      deleteFunction: () => {}
    }
    createLinkDiv(dom, element, obj, options)
  })
  it('adds the link icon and link for the uri if link option is true', () => {
    const options = {
      link: true
    }
    createLinkDiv(dom, element, obj, options)
    expect(element.children[0].children[0].nodeName).toEqual('A')
  })
})

describe('createNameDiv', () => {
  const obj = namedNode('https://test.com/#name')

  it('adds a div to the element with textContent equal to Name', () => {
    createNameDiv(dom, element, 'Name', obj)
    expect(element.children.length).toBeGreaterThan(0)
    expect(element.children[0].textContent).toEqual('Name')
  })

  it.skip('uses the name from the obj if no title is given', () => {
    // this is more complicated to test for now leaving it
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
    const deleteFunction = () => {
    }
    expect(deleteButtonWithCheck(dom, container, noun, deleteFunction)).toBeTruthy()
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
  it('handles foaf(Agent)', () => expect(findImage(foaf('Agent'))).toEqual(iconBase + 'noun_98053.svg'))
  it('handles rdf(Resource)', () => expect(findImage(rdf('Resource'))).toEqual(iconBase + 'noun_98053.svg'))
  it('handles sioc(avatar)', () => {
    store.add(subject, sioc('avatar'), imageObject, subject.doc())
    expect(findImage(subject)).toEqual(imageObject.uri)
  })
  it('handles sioc(avatar)', () => {
    store.add(subject, foaf('img'), imageObject, subject.doc())
    expect(findImage(subject)).toEqual(imageObject.uri)
  })
  it('handles vcard(logo)', () => {
    store.add(subject, vcard('logo'), imageObject, subject.doc())
    expect(findImage(subject)).toEqual(imageObject.uri)
  })
  it('handles vcard(hasPhoto)', () => {
    store.add(subject, vcard('hasPhoto'), imageObject, subject.doc())
    expect(findImage(subject)).toEqual(imageObject.uri)
  })
  it('handles vcard(photo)', () => {
    store.add(subject, vcard('photo'), imageObject, subject.doc())
    expect(findImage(subject)).toEqual(imageObject.uri)
  })
  it('handles foaf(depiction)', () => {
    store.add(subject, foaf('depiction'), imageObject, subject.doc())
    expect(findImage(subject)).toEqual(imageObject.uri)
  })
  it('returns null when nothing is found', () => expect(findImage(subject)).toBeNull())
})

describe('findImageFromURI', () => {
  it('exists', () => {
    expect(findImageFromURI).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(findImageFromURI('')).toEqual('https://solid.github.io/solid-ui/src/icons/noun_10636_grey.svg')
  })
})

describe('fileUploadButtonDiv', () => {
  it('exists', () => {
    expect(fileUploadButtonDiv).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const handler = () => {
    }
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
    expect(index.twoLine['http://www.w3.org/2000/10/swap/pim/qif#Transaction']).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(index.twoLine['http://www.w3.org/2000/10/swap/pim/qif#Transaction'](dom, sym('https://domain.tld/#test'))).toBeTruthy()
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
    const options = { image: image }
    const element = renderAsDiv(dom, obj, options)
    expect(element.children[0].children[0].getAttribute('alt')).toEqual('test')
  })
  it.skip('the div is clickable if given true for the clickable option', () => {
    const options = {
      clickable: true,
      onClickFunction: () => {}
    }
    const element = renderAsDiv(dom, obj, options)
    // expect(element.).toBeTruthy()
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
    const callbackFunction = () => {
    }
    const linkCallback = () => {
    }
    expect(selectorPanel(
      dom,
      kb,
      type,
      predicate,
      inverse,
      possible,
      options,
      callbackFunction,
      linkCallback)).toBeTruthy()
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
    expect(selectorPanelRefresh(
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
    )).toBeTruthy()
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
