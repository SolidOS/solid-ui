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
- [Development](#development-new-components)
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

### Development new components

## Web Components

solid-ui ships self-contained Lit-based custom elements as subpath exports. Each component is independently importable, registers its custom element on import, and ships its own styles encapsulated in a Shadow DOM.

### solid-ui-header

A header bar with branding, auth state (logged-out / logged-in), an account dropdown, and a help menu.

**Subpath export:** `solid-ui/components/header`

```typescript
import { Header } from 'solid-ui/components/header'
import type { HeaderMenuItem, HeaderAccountMenuItem, HeaderAuthState } from 'solid-ui/components/header'
```

Importing this module automatically registers `<solid-ui-header>` as a custom element. See [src/v2/components/header/README.md](src/v2/components/header/README.md) for the full API reference and usage examples.

### Component build pipeline

Web components use a two-stage build to produce a clean public layout without exposing internal source paths:

1. **webpack** (`npm run build-dist`) bundles each component entrypoint and emits the runtime files to `dist/components/<name>/index.js` and `dist/components/<name>/index.esm.js`.
2. **tsc** (`npm run build-js`) emits declaration files mirroring the source tree, so they land at `dist/v2/components/<name>/index.d.ts`.
3. **`scripts/build-component-dts.mjs`** (runs automatically after tsc as part of `postbuild-js`) writes a thin re-export wrapper at `dist/components/<name>/index.d.ts`, bridging the tsc output to the public package location.

This keeps the `package.json` subpath export fully aligned:

```json
"./components/header": {
  "types":   "./dist/components/header/index.d.ts",
  "import":  "./dist/components/header/index.esm.js",
  "require": "./dist/components/header/index.js"
}
```

Consumers never see the internal `v2` path; it is an implementation detail of the source tree.

### Development new components

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

* Raptor mini: Go ahead and reate a header web component, for backward compatibility keep the current code too.
In the new header component I need to be flexible and receive from consumer - the layout (mobile or desktop) and the theme (light or dark) and its according CSS variables for light ot dark.

* Raptor mini: Propose code. how about webpack config for distribution?

* Raptor mini: pls add a readme in the component documenting it usage and test and all

* Raptor mini: the helpMenuList should be menu items inside the help icon drop down menu

* Raptor mini: When I am not logged in I want the header to display: Log in button and Sign Up button.
When the suer is logged in, there is only one button, a drop down button called Accounts. The icon of the button is the avatar of the profile and it displays a list of availabel accounts of the user.
I want this all to be presented flexible in the component.

* Claude Sonet 4.6: create a LitElement also for the signupButton in the SignupButton.ts based on the signup.js code and wire it into the header like you did the loginButton.