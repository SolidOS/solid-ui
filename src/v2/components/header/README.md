# solid-ui-header component

A Lit-based custom element that renders the Solid application header, including branding, auth actions, account management, and a help menu.

## Installation

```bash
npm install solid-ui
```

## Usage in a bundled project (webpack, Vite, Rollup, etc.)

Import once to register the custom element and get access to the types:

```javascript
import { Header } from 'solid-ui/components/header'
```

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

## API

Properties/attributes:

- `logo`: URL string for the brand image (default: Solid emblem URL).
- `helpIcon`: URL string for the help icon, default from icons asset.
- `brandLink`: URL string for the brand link (default: `#`).
- `layout`: `desktop` or `mobile`.
- `theme`: `light` or `dark`.
- `authState`: `logged-out` or `logged-in`.
- `loginAction`: object for the logged-out Log in action.
- `signUpAction`: object for the logged-out Sign Up action.
- `accountLabel`: label for the logged-in dropdown trigger (default: `Accounts`).
- `accountAvatar`: avatar URL used as the logged-in dropdown icon.
- `accountMenu`: array of account entries for the logged-in dropdown.
- `logoutAction`: object for the final logged-in dropdown action (default: `Log out`). Set to `null` to hide it.

Slots:

- `title` (default content is `Solid`).
- `login-action` to override the logged-out Log in action.
- `sign-up-action` to override the logged-out Sign Up action.
- `account-trigger` to override the logged-in Accounts trigger.
- `account-menu` for custom logged-in account entries.
- `help-menu` for help related actions rendered inside the help icon dropdown.

The `helpMenuList` property also renders inside the same help icon dropdown menu.

## Auth Modes

Use `auth-state="logged-out"` to render Log in and Sign Up actions:

```html
<solid-ui-header></solid-ui-header>
<script type="module">
  const header = document.querySelector('solid-ui-header')
  header.authState = 'logged-out'
  header.loginAction = { label: 'Log in', url: '/login' }
  header.signUpAction = { label: 'Sign Up', url: '/sign-up' }
</script>
```

Use `auth-state="logged-in"` to render a single Accounts dropdown with the profile avatar in the trigger:

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

The component dispatches `auth-action-select` for logged-out actions and `account-menu-select` for logged-in account choices.
When `authState` is `logged-in`, the dropdown always renders the configured `logoutAction` as the last item.

## Styles

Customization is supported through CSS variables:
- `--header-bg`, `--header-text`, `--header-border`, etc.

The brand logo link is only rendered when the incoming `layout` is `desktop`.

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
