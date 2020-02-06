jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'
import { dom } from '../../helpers/dom'

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
  linkIcon,
  openHrefInOutlineMode,
  personTR,
  propertyTriage,
  refreshTree,
  removeButton,
  selectorPanel,
  selectorPanelRefresh,
  setImage,
  setName,
  shortDate,
  shortTime,  
  timestamp,
} from '../../../src/widgets/buttons'

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
  it('runs', async () => {
    const element = {
      appendChild: () => {
        return element
      },
      setAttribute: () => {},
      select: () => {},
      focus: () => {},
      addEventListener: () => {}
    }
    const kb = RdfLib.graph()
    const container = element
    const predicate = {}
    const klass = {}
    const noun = {}
    expect(await askName(dom, kb, container, predicate, klass, noun)).toBeTruthy()
  })
})

describe('attachmentList', () => {
  it('exists', () => {
    expect(attachmentList).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(attachmentList()).toBeTruthy()
  })
})

describe('button', () => {
  it('exists', () => {
    expect(button).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(button()).toBeTruthy()
  })
})

describe('cancelButton', () => {
  it('exists', () => {
    expect(cancelButton).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(cancelButton()).toBeTruthy()
  })
})

describe('clearElement', () => {
  it('exists', () => {
    expect(clearElement).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(clearElement()).toBeTruthy()
  })
})

describe('complain', () => {
  it('exists', () => {
    expect(complain).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(complain()).toBeTruthy()
  })
})

describe('continueButton', () => {
  it('exists', () => {
    expect(continueButton).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(continueButton()).toBeTruthy()
  })
})

describe('defaultAnnotationStore', () => {
  it('exists', () => {
    expect(defaultAnnotationStore).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(defaultAnnotationStore()).toBeTruthy()
  })
})

describe('deleteButtonWithCheck', () => {
  it('exists', () => {
    expect(deleteButtonWithCheck).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(deleteButtonWithCheck()).toBeTruthy()
  })
})

describe('extractLogURI', () => {
  it('exists', () => {
    expect(extractLogURI).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(extractLogURI()).toBeTruthy()
  })
})

describe('findImage', () => {
  it('exists', () => {
    expect(findImage).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(findImage()).toBeTruthy()
  })
})

describe('findImageFromURI', () => {
  it('exists', () => {
    expect(findImageFromURI).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(findImageFromURI()).toBeTruthy()
  })
})

describe('fileUploadButtonDiv', () => {
  it('exists', () => {
    expect(fileUploadButtonDiv).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(fileUploadButtonDiv({}, {})).toBeTruthy()
  })
})

describe('formatDateTime', () => {
  it('exists', () => {
    expect(formatDateTime).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(formatDateTime()).toBeTruthy()
  })
})

describe('imagesOf', () => {
  it('exists', () => {
    expect(imagesOf).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(imagesOf()).toBeTruthy()
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
    expect(index.twoLine['']).toBeInstanceOf(Object)
  })
})
describe('index.twoLine[\'http://www.w3.org/2000/10/swap/pim/qif#Transaction\']', () => {
  it('exists', () => {
    expect(index.twoLine['http://www.w3.org/2000/10/swap/pim/qif#Transaction']).toBeInstanceOf(Object)
  })
})
describe('index.twoLine[\'http://www.w3.org/ns/pim/trip#Trip\']', () => {
  it('exists', () => {
    expect(index.twoLine['http://www.w3.org/ns/pim/trip#Trip']).toBeInstanceOf(Object)
  })
})
describe('index.twoLine.widgetForClass', () => {
  it('exists', () => {
    expect(index.twoLine.widgetForClass).toBeInstanceOf(Object)
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
    expect(linkButton()).toBeTruthy()
  })
})

describe('linkIcon', () => {
  it('exists', () => {
    expect(linkIcon).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(linkIcon()).toBeTruthy()
  })
})

describe('openHrefInOutlineMode', () => {
  it('exists', () => {
    expect(openHrefInOutlineMode).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(openHrefInOutlineMode()).toBeTruthy()
  })
})

describe('personTR', () => {
  it('exists', () => {
    expect(personTR).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(personTR()).toBeTruthy()
  })
})

describe('propertyTriage', () => {
  it('exists', () => {
    expect(propertyTriage).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(propertyTriage({})).toBeTruthy()
  })
})

describe('refreshTree', () => {
  it('exists', () => {
    expect(refreshTree).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(refreshTree()).toBeTruthy()
  })
})

describe('removeButton', () => {
  it('exists', () => {
    expect(removeButton).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(removeButton()).toBeTruthy()
  })
})

describe('selectorPanel', () => {
  it('exists', () => {
    expect(selectorPanel).toBeInstanceOf(Function)
  })
  it.only('runs', () => {
    const kb = RdfLib.graph()
    const type = ''
    const predicate = ''
    const inverse = false
    const possible = true
    const options = {}
    const callbackFunction = () => {}
    const linkCallback = () => {}
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
    expect(selectorPanelRefresh()).toBeTruthy()
  })
})

describe('setImage', () => {
  it('exists', () => {
    expect(setImage).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(setImage()).toBeTruthy()
  })
})

describe('setName', () => {
  it('exists', () => {
    expect(setName).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(setName()).toBeTruthy()
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

