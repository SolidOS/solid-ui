import { cameraCaptureControl, cameraButton } from '../../src/media-capture'
jest.mock('rdflib')
jest.mock('solid-auth-client')

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
