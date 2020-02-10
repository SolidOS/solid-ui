jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'
import { dom } from '../helpers/dom'

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