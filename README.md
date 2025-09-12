# solid-ui

[![NPM Package](https://img.shields.io/npm/v/solid-ui.svg)](https://www.npmjs.com/package/solid-ui)

User Interface widgets and utilities for Solid (solid-ui)

These are HTML5 widgets which connect to a solid store. Building blocks for solid-based apps.
Vanilla JS.  Includes large widgets like chat, table, matrix, form fields, and small widgets.

See [Solid-Ui Storybook](http://solidos.github.io/solid-ui/examples/storybook/) for SolidUI widgets.
See [Solid-UI API](https://solidos.github.io/solid-ui/docs/api/) for SolidUI functions.
See [Forms introduction](./docs/FormsReadme.md) for UI vocabulary implementation.

Table of content:
- Getting started(#getting-started)
- Further documentation(#further-ocumentation)


## Getting started

Contributions of bug fixes and new functionality, documentation, and tests are
always appreciated.

## Install via npm

```sh
npm install solid-ui
```

```js
   import * as UI from 'solid-ui'
```

## Use directly in a browser

There are a few differences to mention:
* the UMD bundles come in 2 flavours, with rdflib bundled together and without;
* the ESM bundles do not contain rdflib, so it must be imported separately.

## Files
- For browser UMD, bundled with rdflib: `dist/solid-ui.js` (global `window.UI`)
- For browser UMD, without rdflib: `dist/solid-ui.external.js` (global `window.UI`)
- For browser ESM, without rdflib: `dist/solid-ui.esm.external.js` (import as module)
- UMD bundles come in chunked files
- both version also containe minified versions.


### UMD bundle (global variable)

```html
<!-- Load dependencies first -->
<script src="https://unpkg.com/rdflib/dist/rdflib.min.js"></script>
<!-- or -->
<!-- script src="https://cdn.jsdelivr.net/npm/rdflib/dist/rdflib.min.js"></script -->
<!-- Load solid-ui UMD bundle -->
<script src="https://unpkg.com/solid-ui/dist/solid-ui.external.min.js"></script>
<!-- or -->
<!-- script src="https://cdn.jsdelivr.net/npm/solid-ui/dist/solid-ui.external.min.js"></script -->
<!-- or -->
<!-- script src="dist/solid-ui.js"></script -->
<script>
	// Access via global variable
	const UI = window.UI;
	// Create a button
	const solidLogo = 'https://solidproject.org/assets/img/solid-emblem.svg'
  const myButton = UI.widgets.button(document, solidLogo, 'test', () => window.alert('clicked!'))
  UI.widgets.clearElement(document.body)
  document.body.appendChild(myButton)
</script>
```


### ESM bundle (import as module)

```html
<script type="module">
	import * as $rdf from 'https://esm.sh/rdflib'
	import { someFunction } from 'https://esm.sh/solid-ui'

	// Example usage
	// someFunction(...)
</script>
```

or 

### ESM bundle with import map (bare specifiers)

```html
<script type="importmap">
{
	"imports": {
		"rdflib": "https://esm.sh/rdflib",
		"solid-ui": "https://esm.sh/solid-ui"
	}
}
</script>
<script type="module">
    import * as $rdf from 'rdflib'
	import { someFunction } from 'solid-ui'

	// Example usage
	// someFunction(...)
</script>
```

### Development new components

When developing a component in solid-ui you can test it in isolation using storybook

```
npm run build
npm run storybook
```

If there is no story for the component yet, add a new one to `./src/stories`.

When you want to test the component within a solid-pane, you can use the [development mode of solid-panes](https://github.com/solidos/solid-panes#development).

## Adding Tests

The following document gives guidance on how to add and perform testing in solid-ui.
[Testing in solid-ui](https://github.com/SolidOS/solid-ui/blob/18070a02fa8159a2b83d9503ee400f8e046bf1f6/test/unit/README.md)

## Girhub Pages

* The github pages should contain the storybook and further documentation. In order to make sure it is deployed there is a step in the CI (gh-pages). This depends on the previous `build` step. It MUST contain `build-storybook` otherwise the storybook is not being published.

## Further documentation

- [Some code know-how](https://github.com/SolidOS/solidos/wiki/2.-Solid-UI-know-how)
