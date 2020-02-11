jest.mock('rdflib')
jest.mock('solid-auth-client')
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

import { cameraCaptureControl, cameraButton } from '../../src/media-capture'

describe('cameraCaptureControl', () => {
  it('exists', () => {
    expect(cameraCaptureControl).toBeInstanceOf(Function)
  })
})

describe('cameraButton', () => {
  it('exists', () => {
    expect(cameraButton).toBeInstanceOf(Function)
  })
})