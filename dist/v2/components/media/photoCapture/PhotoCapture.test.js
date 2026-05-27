import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { PhotoCapture } from './PhotoCapture';
import './index';
describe('SolidUIPhotoCapture', () => {
    const stopTrack = jest.fn();
    const getUserMedia = jest.fn();
    beforeEach(() => {
        document.body.innerHTML = '';
        stopTrack.mockReset();
        getUserMedia.mockReset();
        getUserMedia.mockResolvedValue({
            getTracks: () => [{ stop: stopTrack }],
            getVideoTracks: () => [{ stop: stopTrack }]
        });
        Object.defineProperty(navigator, 'mediaDevices', {
            configurable: true,
            value: { getUserMedia }
        });
        Object.defineProperty(HTMLMediaElement.prototype, 'srcObject', {
            configurable: true,
            get() {
                var _a;
                return (_a = this.__srcObject) !== null && _a !== void 0 ? _a : null;
            },
            set(value) {
                ;
                this.__srcObject = value;
            }
        });
        Object.defineProperty(HTMLMediaElement.prototype, 'play', {
            configurable: true,
            value: jest.fn(() => Promise.resolve(undefined))
        });
        Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
            configurable: true,
            value: jest.fn()
        });
        Object.defineProperty(HTMLDialogElement.prototype, 'close', {
            configurable: true,
            value: jest.fn()
        });
        Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
            configurable: true,
            value: jest.fn(() => ({ drawImage: jest.fn() }))
        });
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
            configurable: true,
            value: jest.fn((callback, type) => {
                callback(new Blob(['photo'], { type: type || 'image/png' }));
            })
        });
        Object.defineProperty(URL, 'createObjectURL', {
            configurable: true,
            value: jest.fn(() => 'blob:test-photo')
        });
        Object.defineProperty(URL, 'revokeObjectURL', {
            configurable: true,
            value: jest.fn()
        });
    });
    it('is defined as a custom element', () => {
        expect(customElements.get('solid-ui-photo-capture')).toBe(PhotoCapture);
    });
    it('is closed by default and only starts the inline preview when opened', async () => {
        const photoCapture = new PhotoCapture();
        document.body.appendChild(photoCapture);
        await photoCapture.updateComplete;
        expect(photoCapture.open).toBe(false);
        expect(getUserMedia).not.toHaveBeenCalled();
        photoCapture.open = true;
        await photoCapture.updateComplete;
        await Promise.resolve();
        await photoCapture.updateComplete;
        expect(getUserMedia).toHaveBeenCalledWith({
            video: {
                facingMode: { ideal: 'user' }
            }
        });
    });
    it('accepts dialog presentation and custom constraints JSON', async () => {
        var _a;
        const photoCapture = new PhotoCapture();
        photoCapture.presentation = 'dialog';
        photoCapture.constraints = JSON.stringify({ video: true, audio: false });
        document.body.appendChild(photoCapture);
        await photoCapture.updateComplete;
        expect(photoCapture.open).toBe(false);
        expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
        const trigger = (_a = photoCapture.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('button.trigger-button');
        trigger.click();
        await photoCapture.updateComplete;
        await Promise.resolve();
        await photoCapture.updateComplete;
        expect(photoCapture.open).toBe(true);
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
        expect(getUserMedia).toHaveBeenCalledWith({ video: true, audio: false });
    });
    it('dispatches a photo-captured event with the confirmed blob', async () => {
        var _a, _b;
        const photoCapture = new PhotoCapture();
        const captured = jest.fn();
        const changed = jest.fn();
        photoCapture.open = true;
        photoCapture.addEventListener('photo-captured', (event) => {
            captured(event.detail);
        });
        photoCapture.addEventListener('change', (event) => {
            changed(event.detail);
        });
        document.body.appendChild(photoCapture);
        await photoCapture.updateComplete;
        await Promise.resolve();
        await photoCapture.updateComplete;
        const video = (_a = photoCapture.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('video.capture-preview');
        Object.defineProperty(video, 'videoWidth', { configurable: true, value: 320 });
        Object.defineProperty(video, 'videoHeight', { configurable: true, value: 240 });
        await photoCapture._captureSnapshot();
        await photoCapture.updateComplete;
        const confirmButton = (_b = photoCapture.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('[part="confirm-button"]');
        confirmButton.click();
        expect(captured).toHaveBeenCalledWith({
            file: expect.any(File),
            blob: expect.any(Blob),
            objectUrl: 'blob:test-photo',
            contentType: 'image/png'
        });
        expect(photoCapture.value).toBeInstanceOf(File);
        expect(changed).toHaveBeenCalledWith({ value: photoCapture.value });
    });
    it('can participate in a form-like submission while still exposing a value property', async () => {
        var _a;
        const form = document.createElement('form');
        const photoCapture = new PhotoCapture();
        photoCapture.open = true;
        photoCapture.name = 'avatar';
        form.appendChild(photoCapture);
        document.body.appendChild(form);
        await photoCapture.updateComplete;
        await Promise.resolve();
        await photoCapture.updateComplete;
        const video = (_a = photoCapture.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('video.capture-preview');
        Object.defineProperty(video, 'videoWidth', { configurable: true, value: 320 });
        Object.defineProperty(video, 'videoHeight', { configurable: true, value: 240 });
        await photoCapture._captureSnapshot();
        await photoCapture.updateComplete;
        photoCapture._confirmPhoto();
        expect(photoCapture.value).toBeInstanceOf(File);
        const formData = new FormData();
        const formDataEvent = new Event('formdata');
        formDataEvent.formData = formData;
        form.dispatchEvent(formDataEvent);
        const submitted = formData.get('avatar');
        expect(submitted).toBeInstanceOf(File);
        expect(submitted.name).toContain('avatar-');
    });
});
//# sourceMappingURL=PhotoCapture.test.js.map