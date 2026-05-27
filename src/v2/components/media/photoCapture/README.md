# solid-ui-photo-capture component

A Lit-based camera capture web component that can render inline on a page or inside a modal dialog. It opens the device camera, lets the user take a photo, review it, retake it, and then exposes the confirmed image both as a form-like `value` and as browser events.

## Installation

```bash
npm install solid-ui
```

## Usage

```javascript
import { PhotoCapture } from 'solid-ui/components/media/photo-capture'
```

The legacy flat import path `solid-ui/components/photo-capture` still works, but the grouped `media/photo-capture` path is the preferred long-term entrypoint.

```html
<solid-ui-photo-capture
	heading="Profile photo"
	confirm-label="Use profile photo"
	show-trigger
	presentation="dialog"
></solid-ui-photo-capture>

<script type="module">
	document.querySelector('solid-ui-photo-capture').addEventListener('photo-captured', ({ detail }) => {
		console.log(detail.blob)
	})
</script>
```

## API

### Properties / attributes

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `label` | `label` | `string` | `Take Photo` | Trigger button label. Ignored when `show-trigger` is false and `presentation="inline"`. |
| `heading` | `heading` | `string` | `Take a photo` | Panel heading. |
| `presentation` | `presentation` | `'inline' \| 'dialog'` | `'inline'` | Controls whether the capture UI sits in-page or inside a native dialog. |
| `open` | `open` | `boolean` | `false` | Controls whether the capture panel is visible. |
| `name` | `name` | `string` | `''` | Form field name used when the component participates in form submission. |
| `required` | `required` | `boolean` | `false` | Marks the control as required for form validation. |
| `value` | none | `File \| null` | `null` | The current captured file. Settable from JavaScript. |
| `showTrigger` | `show-trigger` | `boolean` | `false` | Shows a trigger button that opens the capture UI. |
| `showCancelButton` | `show-cancel-button` | `boolean` | `true` | Shows the cancel and close controls. |
| `facingMode` | `facing-mode` | `string` | `environment` | Convenience control for camera selection when custom constraints are not provided. |
| `constraints` | `constraints` | `string` | `''` | JSON string for full `MediaStreamConstraints`, for example `{ "video": true }`. |
| `mediaConstraints` | none | `MediaStreamConstraints` | `undefined` | JS-only property for passing constraints directly. Overrides `constraints`. |
| `captureFormat` | `capture-format` | `string` | `image/png` | Output MIME type used for `canvas.toBlob()`. |
| `captureQuality` | `capture-quality` | `number` | `undefined` | Optional quality value for formats that support it, such as JPEG or WebP. |
| `fileNamePrefix` | `file-name-prefix` | `string` | `''` | Prefix used when the component generates a `File` name for the captured image. If omitted, the component falls back to `name` and then `photo`. |
| `autoCloseOnCapture` | `auto-close-on-capture` | `boolean` | `false` | Closes the component after the user confirms a photo. |

### Events

| Event | Detail | Description |
|---|---|---|
| `input` | `{ value: File \| null }` | Fired when the component updates its current file value. |
| `change` | `{ value: File \| null }` | Fired when the user confirms or clears the current file value. |
| `photo-captured` | `{ file, blob, objectUrl, contentType }` | Fired when the user confirms the captured photo. |
| `open-change` | `{ open }` | Fired whenever the component opens or closes itself. |
| `cancel` | none | Fired when the user cancels the capture flow. |
| `error` | `{ error, message }` | Fired when camera access or capture fails. |

### Slots

| Slot | Description |
|---|---|
| default | Replaces the trigger button label. |
| `heading` | Replaces the panel heading. |

## Notes

- Inline mode is the default presentation, and the panel starts closed until `open` is set or the trigger button is used.
- Dialog mode uses the native `<dialog>` element and is useful when the capture flow should float above the current page.
- The component does not upload the photo itself. Consumers can persist it by reading `value`, listening for `change`, or handling `photo-captured`.
- When form-associated custom elements are supported, the component uses `ElementInternals`. Otherwise it still supports form-style submission via the form's `formdata` event.
