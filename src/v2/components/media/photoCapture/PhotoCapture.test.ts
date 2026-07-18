import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PhotoCapture } from './PhotoCapture'
import './index'

describe('SolidUIPhotoCapture', () => {
  const stopTrack = vi.fn()
  const getUserMedia: any = vi.fn()

  beforeEach(() => {
    document.body.innerHTML = ''
    stopTrack.mockReset()
    getUserMedia.mockReset()
    getUserMedia.mockResolvedValue({
      getTracks: () => [{ stop: stopTrack }],
      getVideoTracks: () => [{ stop: stopTrack }]
    })

    Object.defineProperty(navigator, 'mediaDevices', {
      configurable: true,
      value: { getUserMedia }
    })

    Object.defineProperty(HTMLMediaElement.prototype, 'srcObject', {
      configurable: true,
      get () {
        return (this as HTMLMediaElement & { __srcObject?: MediaStream | null }).__srcObject ?? null
      },
      set (value) {
        ;(this as HTMLMediaElement & { __srcObject?: MediaStream | null }).__srcObject = value as MediaStream | null
      }
    })

    Object.defineProperty(HTMLMediaElement.prototype, 'play', {
      configurable: true,
      value: vi.fn(() => Promise.resolve(undefined))
    })

    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
      configurable: true,
      value: vi.fn()
    })

    Object.defineProperty(HTMLDialogElement.prototype, 'close', {
      configurable: true,
      value: vi.fn()
    })

    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      configurable: true,
      value: vi.fn(() => ({ drawImage: vi.fn() }))
    })

    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
      configurable: true,
      value: vi.fn((callback: BlobCallback, type?: string) => {
        callback(new Blob(['photo'], { type: type || 'image/png' }))
      })
    })

    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: vi.fn(() => 'blob:test-photo')
    })

    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: vi.fn()
    })
  })

  it('is defined as a custom element', () => {
    expect(customElements.get('solid-ui-photo-capture')).toBe(PhotoCapture)
  })

  it('is closed by default and only starts the inline preview when opened', async () => {
    const photoCapture = new PhotoCapture()

    document.body.appendChild(photoCapture)
    await photoCapture.updateComplete

    expect(photoCapture.open).toBe(false)
    expect(getUserMedia).not.toHaveBeenCalled()

    photoCapture.open = true
    await photoCapture.updateComplete
    await Promise.resolve()
    await photoCapture.updateComplete

    expect(getUserMedia).toHaveBeenCalledWith({
      video: {
        facingMode: { ideal: 'user' }
      }
    })
  })

  it('accepts dialog presentation and custom constraints JSON', async () => {
    const photoCapture = new PhotoCapture()
    photoCapture.presentation = 'dialog'
    photoCapture.constraints = JSON.stringify({ video: true, audio: false })

    document.body.appendChild(photoCapture)
    await photoCapture.updateComplete

    expect(photoCapture.open).toBe(false)
    expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled()

    const trigger = photoCapture.shadowRoot?.querySelector('button.trigger-button') as HTMLButtonElement
    trigger.click()
    await photoCapture.updateComplete
    await Promise.resolve()
    await photoCapture.updateComplete

    expect(photoCapture.open).toBe(true)
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled()
    expect(getUserMedia).toHaveBeenCalledWith({ video: true, audio: false })
  })

  it('dispatches a photo-captured event with the confirmed blob', async () => {
    const photoCapture = new PhotoCapture()
    const captured = vi.fn()
    const changed = vi.fn()
    photoCapture.open = true

    photoCapture.addEventListener('photo-captured', (event: Event) => {
      captured((event as CustomEvent).detail)
    })
    photoCapture.addEventListener('change', (event: Event) => {
      changed((event as CustomEvent).detail)
    })

    document.body.appendChild(photoCapture)
    await photoCapture.updateComplete
    await Promise.resolve()
    await photoCapture.updateComplete

    const video = photoCapture.shadowRoot?.querySelector('video.capture-preview') as HTMLVideoElement
    Object.defineProperty(video, 'videoWidth', { configurable: true, value: 320 })
    Object.defineProperty(video, 'videoHeight', { configurable: true, value: 240 })

    await (photoCapture as any)._captureSnapshot()
    await photoCapture.updateComplete

    const confirmButton = photoCapture.shadowRoot?.querySelector('[part="confirm-button"]') as HTMLButtonElement
    confirmButton.click()

    expect(captured).toHaveBeenCalledWith({
      file: expect.any(File),
      blob: expect.any(Blob),
      objectUrl: 'blob:test-photo',
      contentType: 'image/png'
    })
    expect(photoCapture.value).toBeInstanceOf(File)
    expect(changed).toHaveBeenCalledWith({ value: photoCapture.value })
  })

  it('can participate in a form-like submission while still exposing a value property', async () => {
    const form = document.createElement('form')
    const photoCapture = new PhotoCapture()
    photoCapture.open = true
    photoCapture.name = 'avatar'
    form.appendChild(photoCapture)
    document.body.appendChild(form)

    await photoCapture.updateComplete
    await Promise.resolve()
    await photoCapture.updateComplete

    const video = photoCapture.shadowRoot?.querySelector('video.capture-preview') as HTMLVideoElement
    Object.defineProperty(video, 'videoWidth', { configurable: true, value: 320 })
    Object.defineProperty(video, 'videoHeight', { configurable: true, value: 240 })

    await (photoCapture as any)._captureSnapshot()
    await photoCapture.updateComplete
    ;(photoCapture as any)._confirmPhoto()

    expect(photoCapture.value).toBeInstanceOf(File)

    const formData = new FormData()
    const formDataEvent = new Event('formdata') as Event & { formData: FormData }
    formDataEvent.formData = formData
    form.dispatchEvent(formDataEvent)

    const submitted = formData.get('avatar')
    expect(submitted).toBeInstanceOf(File)
    expect((submitted as File).name).toContain('avatar-')
  })
})
