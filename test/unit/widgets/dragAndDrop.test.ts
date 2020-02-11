jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document
const element = dom.createElement('div')

import { makeDropTarget, makeDraggable, uploadFiles } from '../../../src/widgets/dragAndDrop'

describe('makeDropTarget', () => {
  it('exists', () => {
    expect(makeDropTarget).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const handler = () => {}
    expect(makeDropTarget(element, handler, handler)).toEqual(undefined)
  })
})

describe('makeDraggable', () => {
  it('exists', () => {
    expect(makeDraggable).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const tr = element
    const obj = {}
    expect(makeDraggable(tr, obj)).toEqual(undefined)
  })
})


describe('uploadFiles', () => {
  it('exists', () => {
    expect(uploadFiles).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const files = []
    const fileBase = ''
    const imageBase = ''
    const successHandler = () => {}
    expect(uploadFiles(RdfLib.fetcher, files, fileBase, imageBase, successHandler)).toEqual(undefined)
  })
})
