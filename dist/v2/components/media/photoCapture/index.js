import { PhotoCapture } from './PhotoCapture';
export { PhotoCapture };
const PHOTO_CAPTURE_TAG_NAME = 'solid-ui-photo-capture';
if (!customElements.get(PHOTO_CAPTURE_TAG_NAME)) {
    customElements.define(PHOTO_CAPTURE_TAG_NAME, PhotoCapture);
}
//# sourceMappingURL=index.js.map