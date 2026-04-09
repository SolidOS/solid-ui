# solid-ui-signup-button component

A Lit-based custom element that encapsulates the Solid Pod signup flow. It renders a styled button that opens the Solid signup page in a popup window, listens for a `User:` postMessage from the signup provider, and emits a `signup-success` event with the new account's WebID when complete.

Used automatically by `<solid-ui-header>` when `auth-state="logged-out"` — see the [Header README](../header/README.md).

## Installation

```bash
npm install solid-ui
```

## Usage in a bundled project (webpack, Vite, Rollup, etc.)

```javascript
import { SignupButton } from 'solid-ui/components/signup-button'
```

```html
<solid-ui-signup-button label="Sign Up" signup-url="https://solidproject.org/get_a_pod"></solid-ui-signup-button>

<script type="module">
  const btn = document.querySelector('solid-ui-signup-button')

  btn.addEventListener('signup-success', ({ detail }) => {
    console.log('New WebID:', detail.webId)
  })

  btn.addEventListener('signup-error', ({ detail }) => {
    console.error('Signup failed:', detail.message)
  })
</script>
```

## Usage in a plain HTML page (CDN / script tag)

```html
<script src="node_modules/solid-ui/dist/components/signupButton/index.js"></script>

<solid-ui-signup-button></solid-ui-signup-button>
```

## TypeScript

```typescript
import { SignupButton } from 'solid-ui/components/signup-button'

const btn = document.querySelector('solid-ui-signup-button') as SignupButton
btn.label = 'Create a Pod'
btn.signupUrl = 'https://solidproject.org/get_a_pod'

btn.addEventListener('signup-success', (e: CustomEvent) => {
  const { webId } = e.detail
})

btn.addEventListener('signup-error', (e: CustomEvent) => {
  const { message } = e.detail
})
```

## API

### Properties / attributes

| Property    | Attribute      | Type     | Default                                  | Description |
|-------------|----------------|----------|------------------------------------------|-------------|
| `label`     | `label`        | `string` | `Sign Up`                                | Button text. Overridable via the default slot. Changes to `Signing up…` while the popup is open. |
| `signupUrl` | `signup-url`   | `string` | `https://solidproject.org/get_a_pod`     | URL of the Solid signup page opened in the popup window. |

### Events

| Event             | Detail                    | Description |
|-------------------|---------------------------|-------------|
| `signup-success`  | `{ webId: string }`       | Fired when the signup provider posts back a valid WebID via `postMessage`. |
| `signup-error`    | `{ message: string }`     | Fired if the popup is rejected or an error is thrown during the signup flow. |

### Slots

| Slot      | Description |
|-----------|-------------|
| (default) | Replaces the button label text. While loading, the slot content is replaced by `Signing up…`. |

### CSS custom properties

The component inherits Header CSS variables automatically when used inside `<solid-ui-header>`. When used standalone, these can be set on a parent or on `:root`:

| Variable                       | Fallback                                                    | Description |
|--------------------------------|-------------------------------------------------------------|-------------|
| `--signup-button-bg`           | `--header-menu-bg` + `--header-link-selected` mix / `#f6f5f9` | Button background (slightly tinted to distinguish from login) |
| `--signup-button-text`         | `--header-button-text` / `#0f172a`                          | Button text colour |
| `--signup-button-border`       | `--header-border` / `#efecf3`                               | Button border colour |
| `--signup-button-border-hover` | `--header-link-hover` / `#e6dcff`                           | Border colour on hover |

## Popup behaviour

- Opens `signup-url + ?origin=<encoded current origin>` in a centred popup window (1024 × 600 px by default, using dimensions from `solid-logic`'s signup config).
- Listens for a `message` event on `window`. A message starting with `User:` followed by an `http` URI is treated as a successful signup; any other value causes `signup-error` to fire.
- The button is disabled and shows `Signing up…` while waiting for the postMessage response.

## Build

```bash
npm run build
```

Webpack emits bundles to `dist/components/signupButton/index.*`.
