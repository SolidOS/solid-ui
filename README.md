# solid-ui

[![NPM Package](https://img.shields.io/npm/v/solid-ui.svg)](https://www.npmjs.com/package/solid-ui)

User Interface widgets and utilities for Solid (solid-ui)

These are HTML5 widgets which connect to a solid store. Building blocks for solid-based apps.
Vanilla JS.  Includes large widgets like chat, table, matrix, form fields, and small widgets.

See [Solid-Ui Storybook](http://solidos.github.io/solid-ui/examples/storybook/) for SolidUI widgets.
See [Solid-UI API](https://solidos.github.io/solid-ui/Documentation/api/) for SolidUI functions.
See [Forms introduction](./Documentation/FormsReadme.md) for UI vocabulary implementation.

Table of content:
- Getting started(#getting-started)
- Further documentation(#further-ocumentation)


## Getting started

Contributions of bug fixes and new functionality, documentation, and tests are
always appreciated.

### In npm-based projects
When including solid-ui in an npm-based project, you can use it with:

```js
  import { ns, rdf,  acl, aclControl, create, dom, icons, log, matrix, media,
  messageArea, infiniteMessageArea, pad, preferences, style, table, tabs, utils, widgets, versionInfo
} from 'solid-ui'

```
### Directly in a webpage
Clone this repo, and in the repo root run:

* `npm install`
* `npm run build`

This will generate a `dist/` folder containing, among other artifacts, `dist/main.js`.
Now run `npx serve` and go to http://localhost:3000/Documentation/ with your browser to see some examples.

While viewing one of those examples, you can open the web console in your browser and for instance
try how you can create a button:
```js
const solidLogo = 'https://solidproject.org/assets/img/solid-emblem.svg'
const myButton = UI.widgets.button(document, solidLogo, 'test', () => window.alert('clicked!'))
UI.widgets.clearElement(document.body)
document.body.appendChild(myButton)
```

Or a chat widget:
```js
const chatChannel = 'https://example-user.inrupt.net/public/example-chat/index.ttl#this'
const chat = UI.infiniteMessageArea(document, store, UI.rdf.namedNode(chatChannel))
document.body.appendChild(chat)
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
