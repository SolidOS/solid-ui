# solid-ui

[![NPM Package](https://img.shields.io/npm/v/solid-ui.svg)](https://www.npmjs.com/package/solid-ui)

User Interface widgets and utilities for Solid

These are HTML5 widgets which connect to a solid store. Building blocks for solid-based apps.

## Getting started
### In npm-based projects
When including solid-ui in an npm-based project, you can use it with:

```js
  import { ns, rdf,  acl, aclControl, authn, create, dom, icons, log, matrix, media,
  messageArea, infiniteMessageArea, pad, preferences, store, style, table, tabs, utils, widgets, versionInfo
} from 'solid-ui'

```
### Directly in a webpage
Clone this repo, and in the repo root run:

* `npm install`
* `npm run build`

This will generate a `lib/` folder containing, among other artifacts, `lib/webpack-bundle.js`.
Now run `npx serve` and go to http://localhost:5000/examples/ with your browser to see some examples.
See the ['examples' folder](https://github.com/solid/solid-ui/tree/examples/examples) for the
source code of those examples.

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
const chat = UI.infiniteMessageArea(document, UI.store, UI.rdf.namedNode(chatChannel))
document.body.appendChild(chat)
```

Or a full ACL Control Box:
```js
const exampleFolder = 'https://example-user.inrupt.net/public/public-control/'
const aclControlBox = UI.aclControl.ACLControlBox5(UI.rdf.namedNode(exampleFolder), { dom: document }, '', UI.store)
document.body.appendChild(aclControlBox)
```


## Documentation

### API

See https://solid.github.io/solid-ui/Documentation/api/ for the API documentation.

### Components

The UI components are presented in a [storybook](http://solid.github.io/solid-ui/examples/storybook/).

## Overview
This has been a place to put any functionality from solid views which has been generalized to be usable in other views.

- Authentication UI: manage the user's logged in/out state.
- Discovery: finding the user's stuff, and leaving records of new things
- Preferences: UI for managing a user's preferences with two axes of defaults
- An Access Control List widget for Solid ACL system
- Acess Control Logic
- Create a new object from modules/extensions which have registered their ability to create things

- A [form system](https://solid.github.io/solid-ui/Documentation/forms-intro.html): Forms are defined in RDF, and create/edit RDF data, including form definitions
- A collection of shortcut namespace objects for a selection of relevant RDF vocabularies.
- Small atomic widgets (buttons etc) of which the others are constructed.
- An error message panel

Some of the larger controls include:

- A chat widget: add discussion to any object. Infinite scroll, embedded images, social reactions, etc etc
- A people picker widget for choosing a set of people or an existing group
- A general purpose table display with built-in faceted browsing
- A two-dimentional matrix of editable live data that extends in both dimensions.
- A notepad of shared notes for real-time collaboration
- Drag and drop code for linking things and uploading files
- A set of tabs for holding other widgets and arbitrary UI elements

The typical style of the widgets is to know what data it has been derived from,
allow users to edit it, and to automatically sync with data as it changes in the future.
To see how these are used, see the panes which use them within the data browser.

The level of support for this varies.

See also: [A short introduction to the Form system](https://solid.github.io/solid-ui/Documentation/forms-intro.html)

Contributions of bug fixes and new functionality, documentation, and tests are
always appreciated.
