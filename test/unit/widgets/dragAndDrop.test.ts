jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'

import { makeDropTarget, makeDraggable, uploadFiles } from '../../../src/widgets/dragAndDrop'

describe('makeDropTarget', () => {
  it('exists', () => {
    expect(makeDropTarget).toBeInstanceOf(Function)
  })
})

describe('makeDraggable', () => {
  it('exists', () => {
    expect(makeDraggable).toBeInstanceOf(Function)
  })
})


describe('updloadFiles', () => {
  it('exists', () => {
    expect(uploadFiles).toBeInstanceOf(Function)
  })
})
