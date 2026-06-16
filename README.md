# solid-ui

[![NPM Package](https://img.shields.io/npm/v/solid-ui.svg)](https://www.npmjs.com/package/solid-ui)

User Interface widgets and utilities for Solid (solid-ui)

These are HTML5 widgets which connect to a solid store. Building blocks for solid-based apps.
Vanilla JS. Includes large widgets like chat, table, matrix, form fields, and small widgets.

- See [Solid-UI Storybook](http://solidos.github.io/solid-ui/examples/storybook/) for UI widgets.
- See [Solid-UI API](https://solidos.github.io/solid-ui/docs/api/) for UI functions.
- See [Forms introduction](./docs/FormsReadme.md) for UI vocabulary implementation.

## Table of Contents
- [Getting Started](#getting-started)
- [Install via npm](#install-via-npm)
- [Use directly in a browser](#use-directly-in-a-browser)
- [Development](#development)
- [Testing](#testing)
- [Build Config](#build-config)
- [GitHub Pages](#github-pages)
- [Further Documentation](#further-documentation)
- [Generative AI usage](#generative-ai-usage)

## Getting started

Contributions of bug fixes and new functionality, documentation, and tests are
always appreciated.


## Install via npm

```sh
npm install solid-ui rdflib solid-logic
```

In order to use components, choose whether to import specific ones or all of them:

```js
// Import individual components...
import 'solid-ui/components/button'
import 'solid-ui/components/combobox'

// Or all of them.
import 'solid-ui/components'
```

Then, you can use them in your HTML like you would use any element (all of them are prefixed by `solid-ui`):

```html
<solid-ui-button>Click me!</solid-ui-button>
```

And don't forget to also include the CSS, either with a link tag or inside a CSS file:

```css
@import "solid-ui"
```

```html
  <link rel="stylesheet" href="https://unpkg.com/solid-ui@^4.0.0/dist/theme.css">
```

You can also use some of the helpers exported from the default entry:

```js
import { log } from 'solid-ui'

log.msg('Hello there!')
```

## Use directly in a browser

Solid-UI provides **ESM** bundles for direct browser usage. You'll also need to include the CSS styles:

```html
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/solid-ui@^4.0.0/dist/theme.css">
</head>
<body>
  <div id="app"></div>

  <!-- Import individual components... -->
  <script type="module" src="https://unpkg.com/solid-ui@^4.0.0/dist/components/button.js"></script>
  <script type="module" src="https://unpkg.com/solid-ui@^4.0.0/dist/components/combobox.js"></script>

  <!-- Or all of them. -->
  <script type="module" src="https://unpkg.com/solid-ui@^4.0.0/dist/components.js"></script>

  <solid-ui-button>Click me!</solid-ui-button>
</body>
</html>
```

You can also use [import maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap) to import components and helpers:

```html
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/solid-ui@^4.0.0/dist/theme.css">
</head>
<body>
  <div id="app"></div>

  <script type="importmap">
  {
    "imports": {
      "solid-ui/": "https://unpkg.com/solid-ui@^4.0.0/dist/"
    }
  }
  </script>

  <script type="module">
    // Import individual components...
    import 'solid-ui/components/button.js'
    import 'solid-ui/components/combobox.js'

    // Or all of them.
    import 'solid-ui/components.js'

    // Import helpers.
    import { log } from 'solid-ui/index.js'

    log.msg('Hello there!')
  </script>

  <solid-ui-button>Click me!</solid-ui-button>
</body>
</html>
```

## Development

When developing a component in solid-ui you can test it in isolation using Storybook:

```
npm run storybook
```

If there is no story for the component yet, add a new one with the same name as the component with the `.stories.ts` suffix.

When you want to test the component within a solid-pane, you can use the [development mode of solid-panes](https://github.com/solidos/solid-panes#development).

## Testing

One can run existing tests with:

```
npm run test
```

or with coverage:

```
npm run test-coverage
```

The following document gives guidance on how to add and perform testing in solid-ui: [Testing in solid-ui](./test/unit/README.md)

## Build Config

The build configuration uses [Vite](https://vite.dev/) and is centralized in the `vite.config.ts` file, with some helpers extracted into the `vite-config/` folder. This configuration is used for building all dist assets, running tests, and running Storybook.

The config can be invoked with 4 different modes:

- Default: This is the one used to generate ESM and CJS files to be consumed through npm (generates `*.cjs.js` and `*.esm.js` files respectively). It's also used to run Vitest tests and the Storybook.
- `styles`: This mode generates the `theme.css` file that includes global styles (CSS variables for the Design System Tokens).
- `cdn`: This generates the ESM bundle to be consumed through CDNs, which has no external dependencies.
- `cdn-legacy`: This generates the legacy UMD bundle to be consumed by legacy CDNs that externalize `rdflib` and `solid-logic` (no longer recommended).

### Typescript config & Transpilation

The `tsconfig.json` and `tsconfig.test.json` files are only used for type checking and IDE support, the actual transpilation that happens during development or bundling is handled by [Rolldown](https://rolldown.rs/) and [babel](https://babeljs.io/).

The default mode does the minimum amount of transpilation possible whilst keeping modern JavaScript APIs. It does some transpilation to support [Lit decorators](https://lit.dev/docs/components/decorators/#decorators-babel) (using the upcoming standard proposal).

Both CDN modes transpile the output in order to support older browsers.

References:

- [Lit Publishing docs](https://lit.dev/docs/tools/publishing)
- [Web Awesome installation docs](https://webawesome.com/docs)
- [Web Awesome discussion on CDN declarations](https://github.com/shoelace-style/webawesome/discussions/2146)

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
