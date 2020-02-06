jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'

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
  it.only('exists', () => {
    expect(addStyleSheet).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const dom = {
      querySelectorAll: () => [],
      createElement: () => {
        return {
          setAttribute: () => {}
        }
      },
      getElementsByTagName: () => [
        {
          appendChild: () => {}
        }
      ]
    }
    const href = ''
    expect(addStyleSheet(dom, href)).toEqual(undefined)
  })
})

describe('allClassURIs', () => {
  it('exists', () => {
    expect(allClassURIs).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(allClassURIs()).toEqual({})
  })

})

describe('askName', () => {
  it('exists', () => {
    expect(askName).toBeInstanceOf(Function)
  })
  it.skip('runs', async () => {
    const element = {
      appendChild: () => {
        return element
      },
      setAttribute: () => {},
      select: () => {},
      focus: () => {},
      addEventListener: () => {}
    }
    const dom = {
      createElement: () => element
    }
    const kb = {}
    const container = element
    const predicate = {}
    const klass = {}
    const noun = {}
    expect(await askName(dom, kb, container, predicate, klass, noun)).toEqual({})
  })
})

describe('attachmentList', () => {
  it('exists', () => {
    expect(attachmentList).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(attachmentList()).toEqual({})
  })
})

describe('button', () => {
  it('exists', () => {
    expect(button).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(button()).toEqual({})
  })
})

describe('cancelButton', () => {
  it('exists', () => {
    expect(cancelButton).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(cancelButton()).toEqual({})
  })
})

describe('clearElement', () => {
  it('exists', () => {
    expect(clearElement).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(clearElement()).toEqual({})
  })
})

describe('complain', () => {
  it('exists', () => {
    expect(complain).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(complain()).toEqual({})
  })
})

describe('continueButton', () => {
  it('exists', () => {
    expect(continueButton).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(continueButton()).toEqual({})
  })
})

describe('defaultAnnotationStore', () => {
  it('exists', () => {
    expect(defaultAnnotationStore).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(defaultAnnotationStore()).toEqual({})
  })
})

describe('deleteButtonWithCheck', () => {
  it('exists', () => {
    expect(deleteButtonWithCheck).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(deleteButtonWithCheck()).toEqual({})
  })
})

describe('extractLogURI', () => {
  it('exists', () => {
    expect(extractLogURI).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(extractLogURI()).toEqual({})
  })
})

describe('findImage', () => {
  it('exists', () => {
    expect(findImage).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(findImage()).toEqual({})
  })
})

describe('findImageFromURI', () => {
  it('exists', () => {
    expect(findImageFromURI).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(findImageFromURI()).toEqual({})
  })
})

describe('fileUploadButtonDiv', () => {
  it('exists', () => {
    expect(fileUploadButtonDiv).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(fileUploadButtonDiv({}, {})).toEqual({})
  })
})

describe('formatDateTime', () => {
  it('exists', () => {
    expect(formatDateTime).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(formatDateTime()).toEqual({})
  })
})

describe('imagesOf', () => {
  it('exists', () => {
    expect(imagesOf).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(imagesOf()).toEqual({})
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
    expect(linkButton()).toEqual({})
  })
})

describe('linkIcon', () => {
  it('exists', () => {
    expect(linkIcon).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(linkIcon()).toEqual({})
  })
})

describe('openHrefInOutlineMode', () => {
  it('exists', () => {
    expect(openHrefInOutlineMode).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(openHrefInOutlineMode()).toEqual({})
  })
})

describe('personTR', () => {
  it('exists', () => {
    expect(personTR).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(personTR()).toEqual({})
  })
})

describe('propertyTriage', () => {
  it('exists', () => {
    expect(propertyTriage).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(propertyTriage({})).toEqual({})
  })
})

describe('refreshTree', () => {
  it('exists', () => {
    expect(refreshTree).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(refreshTree()).toEqual({})
  })
})

describe('removeButton', () => {
  it('exists', () => {
    expect(removeButton).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(removeButton()).toEqual({})
  })
})

describe('selectorPanel', () => {
  it('exists', () => {
    expect(selectorPanel).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(selectorPanel()).toEqual({})
  })
})

describe('selectorPanelRefresh', () => {
  it('exists', () => {
    expect(selectorPanelRefresh).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(selectorPanelRefresh()).toEqual({})
  })
})

describe('setImage', () => {
  it('exists', () => {
    expect(setImage).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(setImage()).toEqual({})
  })
})

describe('setName', () => {
  it('exists', () => {
    expect(setName).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(setName()).toEqual({})
  })
})

describe('shortDate', () => {
  it('exists', () => {
    expect(shortDate).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(shortDate()).toEqual({})
  })
})

describe('shortTime', () => {
  it('exists', () => {
    expect(shortTime).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(shortTime()).toEqual({})
  })
})

describe('timestamp', () => {
  it('exists', () => {
    expect(timestamp).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(timestamp()).toEqual({})
  })
})

