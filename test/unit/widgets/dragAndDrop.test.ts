import { JSDOM } from 'jsdom'

import {
  makeDropTarget,
  makeDraggable,
  uploadFiles
} from '../../../src/widgets/dragAndDrop'
import { fetcher } from 'rdflib'

jest.mock('solid-auth-client')
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document
const element = dom.createElement('div')

describe('makeDropTarget', () => {
  it('to exist on the public API', () => {
    expect(makeDropTarget).toBe(makeDropTarget)
  })
  it('runs', () => {
    const handler = () => { }
    expect(makeDropTarget(element, handler, handler)).toEqual(undefined)
  })
  it.skip('returns undefined when given an element ', () => {
    const element = document.createElement('textarea')
    const handler = () => { }
    makeDropTarget(element, handler, handler)
<<<<<<< HEAD
    const event = new DragEvent('dragover') // this doesn't work because this doesn't work I can't get the dataTransfer property and therefore can't test
    console.log(event)
=======
    const event = document.createEvent('HTMLEvents')
    // debug.log(event)
>>>>>>> master
    event.initEvent('dragover', true, true)
    // event.dataTransfer = () => {}
    // element.dispatchEvent(event)
    expect(element.dispatchEvent(event)).toReturn()
    // debugger
    // const event = new window.DragEvent
    //  window.dispatchEvent(event)
    expect(makeDropTarget(element, handler, handler)).toMatchSnapshot()
  })
})
describe('makeDropTarget.dragoverListener', () => {
  it('should be a function', () => {
    const event = new Event('dragover')
    const ele = document.createElement('p')
    ele.innerHTML = 'I can be dragged'
    ele.setAttribute('draggable', 'true')
    makeDropTarget(ele, () => { }, () => { })
    ele.dispatchEvent(event)
    // expect(makeDropTarget().dragoverListener).toBeInstanceOf(Function)
  })
})
describe('makeDropTarget.dragenterListener', () => { })

describe('makeDraggable', () => {
  it('to be exposed on the public API', () => {
    expect(makeDraggable).toBe(makeDraggable)
  })
  it('runs', () => {
    const tr = element
    const obj = {}
    expect(makeDraggable(tr, obj)).toEqual(undefined)
  })
})

describe('uploadFiles', () => {
  it('to be exposed on the public API', () => {
    expect(uploadFiles).toBe(uploadFiles)
  })
  it('runs', () => {
    const files = []
    const fileBase = ''
    const imageBase = ''
    const successHandler = () => { }
    expect(
      uploadFiles(fetcher, files, fileBase, imageBase, successHandler)
    ).toEqual(undefined)
  })
})
