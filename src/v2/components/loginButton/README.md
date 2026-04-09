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
<solid-ui-login-button label="Log in" issuer-url="https://solidcommunity.net"></solid-ui-login-button>

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

| Property    | Attribute     | Type     | Default  | Description |
|-------------|---------------|----------|----------|-------------|
| `label`     | `label`       | `string` | `Log in` | Button text. Overridable via the default slot. |
| `issuerUrl` | `issuer-url`  | `string` | `''`     | Pre-fills the IDP URL input in the popup. If `localStorage.loginIssuer` is set it takes precedence. |

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

| Variable                      | Fallback                        | Description |
|-------------------------------|---------------------------------|-------------|
| `--login-button-bg`           | `--header-menu-bg` / `#f6f5f9` | Button background |
| `--login-button-text`         | `--header-button-text` / `#0f172a` | Button text colour |
| `--login-button-border`       | `--header-border` / `#efecf3`  | Button border colour |
| `--login-button-border-hover` | `--header-link-hover` / `#e6dcff` | Border colour on hover |

## Popup behaviour

- Opens an IDP URL text input pre-filled from `localStorage.loginIssuer` or the `issuer-url` attribute.
- Lists suggested identity providers from `solid-logic`'s `getSuggestedIssuers()`.
- Closes on **Escape**, clicking the ✕ button, or clicking the backdrop.
- Saves the chosen issuer to `localStorage.loginIssuer` for future visits.
- Uses `offlineTestID()` from `solid-logic` for offline test environments — the popup is bypassed and `login-success` fires immediately.

## Build

```bash
npm run build
```

Webpack emits bundles to `dist/components/loginButton/index.*`.
