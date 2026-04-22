# solid-ui-login-button component

A Lit-based custom element that encapsulates the full Solid OIDC login flow. It renders a styled button that opens an identity provider (IDP) selection popup, handles the OIDC redirect, and emits a `login-success` event when the user is authenticated.

Used automatically by `<solid-ui-header>` when `auth-state="logged-out"` — see the [Header README](../header/README.md).

## Installation

```bash
npm install solid-ui
```

## Usage in a bundled project (webpack, Vite, Rollup, etc.)

```javascript
import { LoginButton } from 'solid-ui/components/login-button'
```

```html
<solid-ui-login-button label="Log in" issuer-url="https://solidcommunity.net" icon="https://example.com/login-icon.svg"></solid-ui-login-button>

<script type="module">
  document.querySelector('solid-ui-login-button').addEventListener('login-success', ({ detail }) => {
    console.log('Logged in as', detail.webId)
  })
</script>
```

## Usage in a plain HTML page (CDN / script tag)

```html
<script src="node_modules/solid-ui/dist/components/loginButton/index.js"></script>

<solid-ui-login-button></solid-ui-login-button>
```

## TypeScript

```typescript
import { LoginButton } from 'solid-ui/components/login-button'

const btn = document.querySelector('solid-ui-login-button') as LoginButton
btn.label = 'Sign in to Solid'
btn.addEventListener('login-success', (e: CustomEvent) => {
  const { webId } = e.detail
})
```

## API

### Properties / attributes

| Property    | Attribute     | Type               | Default  | Description |
|-------------|---------------|--------------------|----------|-------------|
| `label`     | `label`       | `string`           | `Log In` | Button text. Overridable via the default slot. |
| `issuerUrl` | `issuer-url`  | `string`           | `''`     | Pre-fills the IDP URL input in the popup. If `localStorage.loginIssuer` is set it takes precedence. |
| `icon`      | `icon`        | `string`           | `''`     | URL of a decorative icon displayed on the left side of the button text. When used inside `<solid-ui-header layout="mobile">`, the header suppresses the icon. |
| `theme`     | `theme`       | `'light' \| 'dark'` | `'light'` | Sets the colour theme. Use `'dark'` when placing the button on a dark background. |

### Events

| Event           | Detail                  | Description |
|-----------------|-------------------------|-------------|
| `login-success` | `{ webId: string }`     | Fired after a successful OIDC login. `webId` is the authenticated user's WebID URI. |

### Slots

| Slot      | Description |
|-----------|-------------|
| (default) | Replaces the button label text. |

### CSS custom properties

The component inherits Header CSS variables automatically when used inside `<solid-ui-header>`. When used standalone, these can be set on a parent or on `:root`:

| Variable                          | Fallback                            | Description |
|-----------------------------------|-------------------------------------|-------------|
| `--login-button-background`       | `--lavender-900` / `#7c4cff`        | Login button background colour |
| `--login-button-text`             | `--color-header-text` / `#ffffff`   | Login button text colour |
| `--popup-background`              | `--color-background` / `#F8F9FB`    | Popup background colour |
| `--popup-text`                    | `--color-text` / `#1A1A1A`          | Popup text colour |
| `--popup-border`                  | `--color-border` / `#E5E7EB`        | Popup border colour |
| `--popup-shadow`                  | `--box-shadow-sm` / `0 1px 4px …`   | Popup box shadow |
| `--popup-overlay-background`      | `rgba(0, 0, 0, 0.6)`               | Modal backdrop colour |
| `--issuer-input-background`       | `--color-background` / `#F8F9FB`    | IDP input background |
| `--issuer-input-text`             | `--color-text` / `#1A1A1A`          | IDP input text colour |
| `--issuer-input-border`           | `--color-text` / `#1A1A1A`          | IDP input border colour |
| `--issuer-button-hover-background`| `--lavender-900` / `#7c4cff`        | Dropdown item hover background |
| `--issuer-label-color`            | `--grey-purple-700` / `#1A1A1A`     | IDP label text colour |
| `--issuer-placeholder-color`      | `--grey-purple-700` / `#5e546d`     | IDP input placeholder colour |
| `--error-text-color`              | `--color-error` / `#B00020`         | Validation error text colour |

### Theming

Set `theme="dark"` for dark backgrounds. The button background (`--primary-royal-lavender`) stays the same; the text colour switches to white.

```html
<solid-ui-login-button theme="dark"></solid-ui-login-button>
```

When used inside `<solid-ui-header>`, the theme attribute is forwarded automatically. When the header is in `mobile` layout, its built-in login button suppresses the `icon`.

## Popup behaviour

- Opens a native `<dialog>` via `showModal()`, placing it in the browser's **top layer** so it always renders above all other page content regardless of z-index stacking contexts.
- The backdrop is styled via `::backdrop`.
- Contains a text input pre-filled from `localStorage.loginIssuer` or the `issuer-url` attribute.
- If `solid-logic`'s `getSuggestedIssuers()` returns entries, a **▼ arrow button** inside the input reveals a dropdown list of suggested identity providers below the field. Selecting one fills the input.
- Footer row with **Cancel** (closes the popup) and **Login** (initiates the OIDC redirect) buttons centered at the bottom. The Login button is disabled while the input is empty.
- Closes on **Escape**, clicking the **Cancel** button, clicking the ✕ button, or clicking the backdrop.
- Saves the chosen issuer to `localStorage.loginIssuer` for future visits.
- Uses `offlineTestID()` from `solid-logic` for offline test environments — the popup is bypassed and `login-success` fires immediately.

## Build

```bash
npm run build
```

Webpack emits bundles to `dist/components/loginButton/index.*`.
