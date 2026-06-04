import { describe, expect, it, vi } from 'vitest'
import { silenceDebugMessages } from '../helpers/debugger'
import {
  elementForImageURI,
  creatorAndDate,
  creatorAndDateHorizontal,
  renderMessageRow
} from '../../../src/chat/message'
import { store } from 'solid-logic'

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

store.any = vi.fn()
store.the = vi.fn()

vi.mock('../../../src/widgets', async (importOriginal) => {
  const originalModule = await importOriginal<typeof import('../../../src/widgets')>()
  return {
    ...originalModule,
    setImage: () => '',
    shortDate: () => ''
  }
})

vi.mock('../../../src/chat/chatLogic', () => {
  return {
    mostRecentVersion: vi.fn(() => ''),
    originalVersion: vi.fn(() => bindings)
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
