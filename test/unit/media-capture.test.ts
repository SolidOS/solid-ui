import { describe, expect, it } from 'vitest'
import { silenceDebugMessages } from './helpers/debugger'
import { JSDOM } from 'jsdom'
import { cameraCaptureControl, cameraButton } from '../../src/media/media-capture'
import { graph, namedNode } from 'rdflib'

silenceDebugMessages()
const window = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window
const dom = window.document

describe('cameraCaptureControl', () => {
  it('exists', () => {
    expect(cameraCaptureControl).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(() => {
      cameraCaptureControl(
        dom,
        graph(),
        () => namedNode('https://example.com/image'),
        () => Promise.resolve()
      )
    }).toThrow('navigator.mediaDevices not available')
  })
})

describe('cameraButton', () => {
  it('exists', () => {
    expect(cameraButton).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(cameraButton(
      dom,
      graph(),
      () => namedNode('https://example.com/image'),
      () => Promise.resolve()
    )).toBeTruthy()
  })
})
