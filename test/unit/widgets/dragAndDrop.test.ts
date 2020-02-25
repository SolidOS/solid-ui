import * as RdfLib from 'rdflib'
import { JSDOM } from 'jsdom'

import {
  makeDropTarget,
  makeDraggable,
  uploadFiles
} from '../../../src/widgets/dragAndDrop'
jest.mock('rdflib')
jest.mock('solid-auth-client')
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document
const element = dom.createElement('div')

describe('makeDropTarget', () => {
  it('exists', () => {
    expect(makeDropTarget).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const handler = () => {}
    expect(makeDropTarget(element, handler, handler)).toEqual(undefined)
  })
  it.skip('returns undefined when given an element ', () => {
    const element = document.createElement('textarea')
    const handler = () => {}
    makeDropTarget(element, handler, handler)
    const event = document.createEvent('HTMLEvents')
    console.log(event)
    event.initEvent('dragover', true, true)
    // event.dataTransfer = () => {}
    // element.dispatchEvent(event)
    expect(element.dispatchEvent(event)).toReturn()
    // debugger
    // const event = new window.DragEvent
    //  window.dispatchEvent(event)
    expect(makeDropTarget(element, handler, handler)).toMatchInlineSnapshot(
      `undefined`
    )
  })
})
describe('makeDropTarget.dragoverListener', () => {
  it('should be a function', () => {
    const event = new Event('dragover')
    const ele = document.createElement('p')
    ele.innerHTML = 'I can be dragged'
    ele.setAttribute('draggable', 'true')
    console.dir(ele)
    debugger
    makeDropTarget(ele)
    ele.dispatchEvent(event)
    // expect(makeDropTarget().dragoverListener).toBeInstanceOf(Function)
  })
})
describe('makeDropTarget.dragenterListener', () => {})

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
    expect(
      uploadFiles(RdfLib.fetcher, files, fileBase, imageBase, successHandler)
    ).toEqual(undefined)
  })
})
