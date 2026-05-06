# solid-ui

[![NPM Package](https://img.shields.io/npm/v/solid-ui.svg)](https://www.npmjs.com/package/solid-ui)

User Interface widgets and utilities for Solid (solid-ui)

These are HTML5 widgets which connect to a solid store. Building blocks for solid-based apps.
Vanilla JS. Includes large widgets like chat, table, matrix, form fields, and small widgets.

See [Solid-Ui Storybook](http://solidos.github.io/solid-ui/examples/storybook/) for UI widgets.
See [Solid-UI API](https://solidos.github.io/solid-ui/docs/api/) for UI functions.
See [Forms introduction](./docs/FormsReadme.md) for UI vocabulary implementation.

## Table of Contents
- [Getting Started](#getting-started)
- [Install via npm](#install-via-npm)
- [Use Directly in Browser](#use-directly-in-a-browser)
  - [UMD Bundle](#umd-bundle-global-variable)
  - [ESM Bundle](#esm-bundle-import-as-module)
- [Web Components](#web-components)
  - [solid-ui-header](#solid-ui-header)
- [Development](#development)
- [Testing](#adding-tests)
- [Further Documentation](#further-documentation)
- [Generative AI usage](#generative-ai-usage)


## Getting started

Contributions of bug fixes and new functionality, documentation, and tests are
always appreciated.

## Install via npm

```sh
npm install solid-ui rdflib solid-logic
```

Then import in your JavaScript/TypeScript code:

```js
import * as UI from 'solid-ui'
import * as $rdf from 'rdflib'
import * as SolidLogic from 'solid-logic'

// Example: Create a button
const button = UI.widgets.button(
  document,
  'https://solidproject.org/assets/img/solid-emblem.svg',
  'Click me',
  () => alert('Button clicked!')
)
document.body.appendChild(button)
```

## Use Directly in a Browser

Solid-UI provides both **UMD** and **ESM** bundles for direct browser usage. Both bundles externalize `rdflib` and `solid-logic`, which must be loaded separately.

### Available Files

- **UMD (Universal Module Definition)**:
  - Development: `dist/solid-ui.js` (exposes global `window.UI`)
  - Production: `dist/solid-ui.min.js` (minified)
  
- **ESM (ES Modules)**:
  - Development: `dist/solid-ui.esm.js`
  - Production: `dist/solid-ui.esm.min.js` (minified)

### UMD Bundle (Global Variable)

If you use the legacy UMD bundle (`solid-ui.js` / `solid-ui.min.js`), `rdflib` must define `window.$rdf` before `solid-ui` loads. If `rdflib` is missing, `solid-ui` will throw `ReferenceError: $rdf is not defined`.

Load via `<script>` tags and access through global variables `window.$rdf`, `window.SolidLogic`, and `window.UI`.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Solid-UI UMD Example</title>
</head>
<body>
  <div id="app"></div>

  <!-- Load dependencies first -->
  <script src="https://cdn.jsdelivr.net/npm/rdflib/dist/rdflib.min.js"></script>
  <script src="https://unpkg.com/solid-logic/dist/solid-logic.min.js"></script>
  
  <!-- Load solid-ui UMD bundle -->
  <script src="https://unpkg.com/solid-ui/dist/solid-ui.min.js"></script>

  <script>
    // Access via global variables
    const { store, authn } = window.SolidLogic
    const { widgets } = window.UI

    // Get the logged-in user
    const webId = authn.currentUser()
    
    if (webId) {
      // User is logged in - create button with their WebID
      const userButton = widgets.button(
        document,
        'https://solidproject.org/assets/img/solid-emblem.svg',
        `Logged in as: ${webId.value}`,
        () => alert(`Your WebID: ${webId.value}`)
      )
      document.getElementById('app').appendChild(userButton)
    } else {
      // User not logged in - create login button
      const loginButton = widgets.button(
        document,
        'https://solidproject.org/assets/img/solid-emblem.svg',
        'Login to Solid',
        () => authn.checkUser().then(() => location.reload())
      )
      document.getElementById('app').appendChild(loginButton)
    }
  </script>
</body>
</html>
```

### ESM Bundle (Import as Module)

Use modern JavaScript modules with `import` statements.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Solid-UI ESM Example</title>
</head>
<body>
  <div id="app"></div>

  <script type="module">
    // Import from CDN (esm.sh, unpkg, or jsdelivr)
    import * as $rdf from 'https://esm.sh/rdflib'
    import * as SolidLogic from 'https://esm.sh/solid-logic@4.0.1'
    import * as UI from 'https://esm.sh/solid-ui@3.0.1'

    // Get the logged-in user
    const webId = SolidLogic.authn.currentUser()
    
    if (webId) {
      // User is logged in - create personalized button
      const userName = await getUserName(webId)
      const userButton = UI.widgets.button(
        document,
        'https://solidproject.org/assets/img/solid-emblem.svg',
        userName || 'My Profile',
        () => window.open(webId.value, '_blank')
      )
      document.getElementById('app').appendChild(userButton)
    } else {
      // User not logged in
      const loginButton = UI.widgets.button(
        document,
        'https://solidproject.org/assets/img/solid-emblem.svg',
        'Login to Solid',
        async () => {
          await SolidLogic.authn.checkUser()
          location.reload()
        }
      )
      document.getElementById('app').appendChild(loginButton)
    }

    // Helper function to fetch user's name from their profile
    async function getUserName(webId) {
      try {
        await SolidLogic.store.fetcher.load(webId.doc())
        const name = SolidLogic.store.any(webId, $rdf.sym('http://xmlns.com/foaf/0.1/name'))
        return name ? name.value : null
      } catch (error) {
        console.error('Error fetching user name:', error)
        return null
      }
    }
  </script>
</body>
</html>
```

### ESM Bundle with Import Maps

Use import maps for cleaner module specifiers:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Solid-UI ESM with Import Maps</title>
</head>
<body>
  <div id="app"></div>

  <!-- Define import map for bare specifiers -->
  <script type="importmap">
  {
    "imports": {
      "rdflib": "https://esm.sh/rdflib",
      "solid-logic": "https://esm.sh/solid-logic@4.0.1",
      "solid-ui": "https://esm.sh/solid-ui@3.0.1"
    }
  }
  </script>

  <script type="module">
    // Use clean bare specifiers
    import * as $rdf from 'rdflib'
    import * as SolidLogic from 'solid-logic'
    import * as UI from 'solid-ui'

    const app = document.getElementById('app')
    
    // Create a profile button for logged-in user
    async function createUserButton() {
      const webId = SolidLogic.authn.currentUser()
      
      if (!webId) {
        const loginBtn = UI.widgets.button(
          document,
          'https://solidproject.org/assets/img/solid-emblem.svg',
          'Login',
          () => SolidLogic.authn.checkUser()
        )
        app.appendChild(loginBtn)
        return
      }

      // Fetch user profile
      try {
        await SolidLogic.store.fetcher.load(webId.doc())
        const name = SolidLogic.store.any(
          webId,
          $rdf.sym('http://xmlns.com/foaf/0.1/name')
        )
        
        const profileBtn = UI.widgets.button(
          document,
          'https://solidproject.org/assets/img/solid-emblem.svg',
          name ? name.value : 'My Profile',
          () => {
            alert(`WebID: ${webId.value}\nName: ${name ? name.value : 'Not set'}`)
          }
        )
        app.appendChild(profileBtn)
      } catch (error) {
        console.error('Error loading profile:', error)
      }
    }

    createUserButton()
  </script>
</body>
</html>
```

## Web Components

solid-ui ships self-contained Lit-based custom elements as subpath exports. Each component is independently importable, registers its custom element on import, and ships its own styles encapsulated in a Shadow DOM.

> Component UMD bundles do not export a shared global like `window.UI`. They only register the custom element on import, while the legacy main bundle still provides the `UI` global.

### solid-ui-header

A header bar with branding, auth state (logged-out / logged-in), an account dropdown, an optional logout icon, and a desktop-only help menu.

**Subpath export:** `solid-ui/components/header`

```typescript
import { Header } from 'solid-ui/components/header'
import type { HeaderMenuItem, HeaderAccountMenuItem, HeaderAuthState } from 'solid-ui/components/header'
```

```html
<solid-ui-header theme="dark" layout="desktop" brand-link="/">
  <a slot="help-menu" href="/help">Help</a>
</solid-ui-header>
```

Importing this module automatically registers `<solid-ui-header>` as a custom element.

### solid-ui-login-button

A standalone login button that encapsulates the Solid OIDC login flow and emits `login-success` when authentication succeeds.

**Subpath export:** `solid-ui/components/login-button`

```typescript
import { LoginButton } from 'solid-ui/components/login-button'
```

```html
<solid-ui-login-button label="Log in" issuer-url="https://solidcommunity.net" icon="https://example.com/login-icon.svg"></solid-ui-login-button>
```

```typescript
const loginButton = document.querySelector('solid-ui-login-button') as LoginButton
loginButton.addEventListener('login-success', (event: CustomEvent) => {
  console.log('Logged in as', event.detail.webId)
})
```

### solid-ui-signup-button

A standalone sign-up button that opens a signup URL in a new browser tab.

**Subpath export:** `solid-ui/components/signup-button`

```typescript
import { SignupButton } from 'solid-ui/components/signup-button'
```

```html
<solid-ui-signup-button label="Get a Pod" signup-url="https://solidproject.org/get_a_pod" icon="https://example.com/icon.svg"></solid-ui-signup-button>
```

### Component build pipeline

Web components use a two-stage build to produce a clean public runtime layout while keeping internal TypeScript artifacts separate:

1. **`scripts/component-manifest.mjs`** is the source of truth for v2 web components. It defines the component entrypoints used by webpack and the public subpath names exposed from the package.
2. **webpack** (`npm run build-dist`) bundles each component entrypoint from the manifest and emits the runtime files to `dist/components/<name>/index.js` and `dist/components/<name>/index.esm.js`.
3. **tsc** (`npm run build-js`) emits internal declaration and JS artifacts mirroring the source tree under `dist/v2/components/<name>/`.
4. **`scripts/build-component-dts.mjs`** (runs automatically after tsc as part of `postbuild-js`) writes thin public declaration wrappers at `dist/components/<name>/index.d.ts`, re-exporting from the internal `dist/v2/components/<name>/` output.
5. **`scripts/sync-component-exports.mjs`** keeps the `package.json` `exports` map aligned with the manifest. It runs automatically as part of `npm run build` and `npm version` workflows.

The legacy main bundle remains a special case. In [webpack.config.mjs](webpack.config.mjs) only the `main` entry keeps the UMD `UI` global export; component entries are generated from the manifest and built as standalone scripts so they do not clobber one another when loaded directly.

This keeps the `package.json` subpath export fully aligned while exposing only the public `dist/components/...` layout:

```json
"./components/header": {
  "types":   "./dist/components/header/index.d.ts",
  "import":  "./dist/components/header/index.esm.js",
  "require": "./dist/components/header/index.js"
}
```

Consumers never import from `dist/v2/components/...`; that path is an internal build artifact only.

### Adding a new web component

When adding a new v2 component:

1. Create the component folder under `src/v2/components/<ComponentName>/` with its `index.ts` entrypoint.
2. Add one record to `scripts/component-manifest.mjs`.
3. Run `npm run sync-component-exports` if you want to update `package.json` immediately, or just run `npm run build` and let the build do it automatically.

You should not need to hand-edit the webpack component entry list or the `package.json` component export map anymore.

## Development

When developing a component in solid-ui you can test it in isolation using storybook

```
npm run build
npm run storybook
```

If there is no story for the component yet, add a new one to `./src/stories`.

When you want to test the component within a solid-pane, you can use the [development mode of solid-panes](https://github.com/solidos/solid-panes#development).

## Adding Tests

One can run extisting tests with:
```
npm run test
```
or with coverage
```
npm run test-coverage
```
The following document gives guidance on how to add and perform testing in solid-ui.
[Testing in solid-ui](https://github.com/SolidOS/solid-ui/blob/18070a02fa8159a2b83d9503ee400f8e046bf1f6/test/unit/README.md)

## GitHub Pages

* The github pages should contain the storybook and further documentation. In order to make sure it is deployed there is a step in the CI (gh-pages). This depends on the previous `build` step. It MUST contain `build-storybook` otherwise the storybook is not being published.

## Further documentation

- [Some code know-how](https://github.com/SolidOS/solidos/wiki/2.-Solid-UI-know-how)

## Generative AI usage
The SolidOS team is using GitHub Copilot integrated in Visual Studio Code. 
We have added comments in the code to make it explicit which parts are 100% written by AI. 

### Prompt usage history:

* Raptor mini: If I want to make the header a web component with a self contained CSS which only consumes CSS variables from a theme, how would I do this? 

* Raptor mini: Go ahead and create a header web component, for backward compatibility keep the current code too.
In the new header component I need to be flexible and receive from consumer - the layout (mobile or desktop) and the theme (light or dark) and its according CSS variables for light to dark.

* Raptor mini: Propose code. how about webpack config for distribution?

* Raptor mini: pls add a readme in the component documenting it usage and test and all

* Raptor mini: the helpMenuList should be menu items inside the help icon drop down menu

* Raptor mini: When I am not logged in I want the header to display: Log in button and Sign Up button.
When the user is logged in, there is only one button, a drop down button called Accounts. The icon of the button is the avatar of the profile and it displays a list of available accounts of the user.
I want this all to be presented flexible in the component.

* Claude Sonnet 4.6: create a LitElement also for the signupButton in the SignupButton.ts based on the signup.js code and wire it into the header like you did the loginButton.

* Raptor mini: when we are on layout mobile we do not want to display the help menu at all.

* Raptor mini: Create for me a footer Lit Component in tsy style of the components I have and under v2. Take the code from this index.ts to start with.

* Raptor mini: Good. Now, I want the footer to be a rectangular with round corners, grey background and it should have an adjustable position.

* Raptor mini: The content of the footer should be different upon loggedin or not.
If not logged in, it should say:
Title Public View
You are viewving this profile as a guest,
And if logged in:
Title: Logged in View
You are logged in as nameOfLoggedIn user.

* Raptor mini: add a readme to the Footer component with example.

* Claude Sonnet 4.6: Make the drop down as a list under the input field and enlarge the pop up, make it higher, adjustable to fit the drop down. And make the drop down arrow area larger

* GPT-5.4 Model: can you wire up the keyboard interactions and aria attributes for Select?

* GPT-5.4 Model: Take the code from /Users/sharon/2025Dev/solid-ui/src/media/media-capture.ts and make it a web component. Make it work in forms as well as not. Make it configurable and follow LoginButton.
