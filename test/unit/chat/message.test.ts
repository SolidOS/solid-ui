import { silenceDebugMessages } from '../helpers/debugger'
import {
  elementForImageURI,
  creatorAndDate,
  creatorAndDateHorizontal,
  renderMessageRow
} from '../../../src/chat/message'
import { store } from 'solid-logic'
// import { originalVersion } from '../../../src/chat/chatLogic'
import * as widgets from '../../../src/widgets'

const bindings = {
  '?creator': {
    value: {
      termType: ''
    }
  },
  '?date': {
    value: ''
  },
  doc: () => '',
  '?content': {
    value: ''
  },
  sameTerm: () => ''
}

store.any = jest.fn()
store.the = jest.fn()

jest.mock('../../../src/widgets', () => {
  const originalModule = jest.requireActual('../../../src/widgets')
  return {
    __esModule: true,
    ...originalModule,
    setImage: () => '',
    shortDate: () => ''
  }
})

jest.mock('../../../src/chat/chatLogic', () => {
  return {
    mostRecentVersion: jest.fn(() => ''),
    originalVersion: jest.fn(() => bindings)
  }
})

silenceDebugMessages()

describe('elementForImageURI', () => {
  it('exists', () => {
    expect(elementForImageURI).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const imageUri = ''
    const options = {
      inlineImageHeightEms: 10
    }
    ;(window as any).$rdf = {
      sym: () => {}
    }
    expect(elementForImageURI(imageUri, options)).toBeInstanceOf(HTMLAnchorElement)
  })
})

describe('creatorAndDate', () => {
  it('exists', () => {
    expect(creatorAndDate).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const td1 = {
      appendChild: () => {}
    }
    const creator = {}
    const date = {}
    const message = ''
    expect(creatorAndDate(td1, creator, date, message)).toEqual(undefined)
  })
})

describe('creatorAndDateHorizontal', () => {
  it('exists', () => {
    expect(creatorAndDateHorizontal).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const td1 = {
      appendChild: () => {
        return {
          style: {}
        }
      }
    }
    const creator = {}
    const date = {}
    const message = ''
    expect(creatorAndDateHorizontal(td1, creator, date, message)).toEqual(undefined)
  })
})

describe('renderMessageRow', () => {
  it('exists', async () => {
    expect(await renderMessageRow).toBeInstanceOf(Function)
  })
  it.skip('runs', async () => {
    // first store.any should return creator
    // the second should return a date
    // third shoudl return latestVersionCreator
    // content
    // signature
    // created
    //
    /* @ts-ignore */
    store.any.mockReturnValueOnce('creator')
      .mockReturnValueOnce('date')
      .mockReturnValueOnce('latestVersion')
      .mockReturnValueOnce({ value: 'content' })
      .mockReturnValueOnce('signature')
      .mockReturnValueOnce('created')
      /* @ts-ignore */
    store.the.mockReturnValue('test')
    const messageTable = {
      appendChild: () => {}
    }

    const fresh = {}
    const options = {}
    const userContext = {}
    expect(await renderMessageRow(messageTable, bindings, fresh, options, userContext)).toBeInstanceOf(HTMLTableRowElement)
  })
})
