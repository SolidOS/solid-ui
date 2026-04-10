# solid-ui-header component

A Lit-based custom element that renders the Solid application header, including branding, auth actions, account management, and a help menu.

When `layout="mobile"`, the header hides the help menu entirely, even if `helpMenuList` items or `help-menu` slotted content are provided.

When `auth-state="logged-out"`, the header renders a `<solid-ui-login-button>` as the login action. The login button opens a Solid IDP selection popup and handles the full OIDC login flow via `solid-logic`. On success it emits a `login-success` event and the header transitions to `logged-in` state automatically.

## Installation

```bash
npm install solid-ui
```

## Usage in a bundled project (webpack, Vite, Rollup, etc.)

Import once to register the custom element and get access to the types:

```javascript
import { Header } from 'solid-ui/components/header'
```

The header automatically imports and registers `<solid-ui-login-button>` — no separate import is needed.

Then use the element in HTML or in your framework templates:

```html
<solid-ui-header theme="dark" layout="desktop" brand-link="/">
  <a slot="help-menu" href="/help">Help</a>
</solid-ui-header>
```

## Usage in a plain HTML page (CDN / script tag)

```html
<script src="node_modules/solid-ui/dist/components/header/index.js"></script>

<solid-ui-header brand-link="/"></solid-ui-header>
```

Or via a CDN that supports npm packages:

```html
<script type="module">
  import 'https://cdn.skypack.dev/solid-ui/components/header'
</script>

<solid-ui-header brand-link="/"></solid-ui-header>
```

## TypeScript

Types are included. Import the exported interfaces alongside the element class:

```typescript
import { Header } from 'solid-ui/components/header'
import type { HeaderMenuItem, HeaderAccountMenuItem, HeaderAuthState } from 'solid-ui/components/header'

const header = document.querySelector('solid-ui-header') as Header
header.authState = 'logged-in' satisfies HeaderAuthState
```

## solid-ui-login-button

The login button is a self-contained component with its own README: [`src/v2/components/loginButton/README.md`](../loginButton/README.md).

The header automatically imports and registers it — no separate import is needed.

---

## API

Properties/attributes:

- `logo`: URL string for the brand image (default: Solid emblem URL).
- `helpIcon`: URL string for the help icon, default from icons asset.
- `brandLink`: URL string for the brand link (default: `#`).
- `layout`: `desktop` or `mobile`. Mobile layout hides the brand logo link and does not render the help menu.
- `theme`: `light` or `dark`.
- `authState`: `logged-out` or `logged-in`.
- `loginAction`: object with a `label` for the login button. When `authState` is `logged-out` this is rendered as a `<solid-ui-login-button>` which handles the full OIDC flow; supplying a `url` instead opts out of the built-in flow and renders a plain link.
- `signUpAction`: object for the logged-out Sign Up action. The `label` field sets the button text and the `url` field (default: `https://solidproject.org/get_a_pod`) is the destination opened in a new tab when the button is clicked.
- `accountLabel`: label for the logged-in dropdown trigger (default: `Accounts`).
- `accountAvatar`: avatar URL used as the logged-in dropdown icon.
- `accountMenu`: array of account entries for the logged-in dropdown.
- `logoutLabel`: string label for the logout button at the bottom of the logged-in dropdown (default: `Sign out`). Set to `null` to hide it.

Slots:

- `title` (default content is `Solid`).
- `login-action` to override the logged-out Log in action.
- `sign-up-action` to override the logged-out Sign Up action.
- `account-trigger` to override the logged-in Accounts trigger.
- `account-menu` for custom logged-in account entries.
- `help-menu` for help related actions rendered inside the help icon dropdown on desktop layout.

The `helpMenuList` property also renders inside the same help icon dropdown menu on desktop layout.

## Auth Modes

### Logged-out (with built-in login flow)

Use `auth-state="logged-out"` to render the `<solid-ui-login-button>` and a Sign Up action. The login button opens an IDP selection popup and drives the full OIDC login flow without any extra wiring. On a successful login the header automatically sets `auth-state="logged-in"` and emits `auth-action-select`:

```html
<solid-ui-header></solid-ui-header>
<script type="module">
  import { Header } from 'solid-ui/components/header'

  const header = document.querySelector('solid-ui-header')
  header.authState = 'logged-out'
  // Optionally override the login button label:
  header.loginAction = { label: 'Log in' }
  // Optionally override the sign-up destination (opens in a new tab):
  header.signUpAction = { label: 'Sign Up', url: 'https://myprovider.example/signup' }

  header.addEventListener('auth-action-select', ({ detail }) => {
    if (detail.role === 'login') {
      // login completed
      header.authState = 'logged-in'
    }
  })
</script>
```

If you want a fully custom login UI you can override the slot:

```html
<solid-ui-header>
  <a slot="login-action" href="/login">Log in</a>
</solid-ui-header>
```

### Logged-in

```html
<solid-ui-header></solid-ui-header>
<script type="module">
  const header = document.querySelector('solid-ui-header')
  header.authState = 'logged-in'
  header.accountLabel = 'Accounts'
  header.accountAvatar = 'https://example.com/alice.jpg'
  header.accountMenu = [
    {
      label: 'Alice',
      description: 'https://alice.example/profile/card#me',
      action: 'switch-account',
      avatar: 'https://example.com/alice.jpg'
    },
    {
      label: 'Work',
      description: 'https://work.example/profile/card#me',
      url: '/accounts/work'
    }
  ]
</script>
```

The built-in logout button automatically transitions the header from `logged-in` to `logged-out`, and emits a bubbling, composed `logout-select` event with `detail: { role: 'logout' }`.

The component also dispatches `auth-action-select` for logged-out actions and `account-menu-select` for logged-in account choices.
When `authState` is `logged-in`, the dropdown always renders the configured `logoutLabel` as the last item.

## Styles

Customization is supported through CSS variables:
- `--header-bg`, `--header-text`, `--header-border`, etc.

The brand logo link is only rendered when the incoming `layout` is `desktop`.
The help menu trigger and dropdown are only rendered when the incoming `layout` is `desktop`.

## Testing

Unit test file: `src/v2/components/header/header.test.ts`

Run tests:

```bash
npm test -- --runInBand --testPathPatterns=src/v2/components/header/header.test.ts
```

Run full suite:

```bash
npm test
```

## Build

```bash
npm run build
```

Webpack emits the runtime bundles to `dist/components/header/index.*`. A post-build script generates `dist/components/header/index.d.ts` as a thin re-export wrapper so that the public package layout does not expose internal source paths.
