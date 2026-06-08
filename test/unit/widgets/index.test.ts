import { silenceDebugMessages } from '../helpers/debugger'
import * as DragAndDrop from '../../../src/widgets/dragAndDrop'
import * as Error from '../../../src/widgets/error'
import * as Buttons from '../../../src/widgets/buttons'
import * as PeoplePicker from '../../../src/widgets/peoplePicker'
import * as Index from '../../../src/widgets/index'
import { newThing } from '../../../src/widgets/index'
import { namedNode } from 'rdflib'

silenceDebugMessages()

describe('index', () => {
  it('contains all exports from DragAndDrop', () => {
    for (const k in DragAndDrop) {
      if (k !== 'default') {
        expect(Index[k]).toEqual(DragAndDrop[k])
      }
    }
  })
  it('contains all exports from Error', () => {
    for (const k in Error) {
      if (k !== 'default') {
        expect(Index[k]).toEqual(Error[k])
      }
    }
  })
  it('contains all exports from Buttons', () => {
    for (const k in Buttons) {
      if (k !== 'default') {
        expect(Index[k]).toEqual(Buttons[k])
      }
    }
  })
  it('contains all exports from PeoplePicker', () => {
    for (const k in PeoplePicker) {
      if (k !== 'default') {
        expect(Index[k]).toEqual(PeoplePicker[k])
      }
    }
  })
})

describe('newThing', () => {
  it('exists', () => {
    expect(newThing).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(newThing(namedNode('http://example.com/#this'))).toBeInstanceOf(Object)
  })
  it.skip('returns the correct .', () => {
    const Date = jest.fn()
    Date.mockReturnValueOnce('Thu Feb 06 2020 19:42:59 GMT+1100')
    expect(newThing(namedNode('doc'))).toBe('')
  })
})
