jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'

import * as DragAndDrop from '../../../src/widgets/dragAndDrop'
import * as Error from '../../../src/widgets/error'
import * as Buttons from '../../../src/widgets/buttons'
import * as Forms from '../../../src/widgets/forms'
import * as PeoplePicker from '../../../src/widgets/peoplePicker'
import * as Index from '../../../src/widgets/index'

describe('index', () => {
  it('contains all exports from DragAndDrop', () => {
    for (let k in DragAndDrop) {
      if (k !== 'default') {
        expect(Index[k]).toEqual(DragAndDrop[k])
      }
    }
  })
  it('contains all exports from Error', () => {
    for (let k in Error) {
      if (k !== 'default') {
        expect(Index[k]).toEqual(Error[k])
      }
    }
  })
  it('contains all exports from Buttons', () => {
    for (let k in Buttons) {
      if (k !== 'default') {
        expect(Index[k]).toEqual(Buttons[k])
      }
    }
  })
  it('contains all exports from Forms', () => {
    for (let k in Forms) {
      if (k !== 'default') {
        expect(Index[k]).toEqual(Forms[k])
      }
    }
  })
  it('contains all exports from PeoplePicker', () => {
    for (let k in PeoplePicker) {
      if (k !== 'default') {
        expect(Index[k]).toEqual(PeoplePicker[k])
      }
    }
  })
})