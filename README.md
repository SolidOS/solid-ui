# solid-ui

[![NPM Package](https://img.shields.io/npm/v/solid-ui.svg)](https://www.npmjs.com/package/solid-ui)

User Interface widgets and utilities for Solid

These are HTML5 widgets which connect to a solid store. Building blocks for solid-based apps.

Use:

```
  import { ns, rdf,  acl, aclControl, authn, create, dom, icons, log, matrix, media,
  messageArea, infiniteMessageArea, pad, preferences, store, style, table, tabs, utils, widgets, versionInfo
} from 'solid-ui'

```

This has been a place to put any functionality from solid views which has been generalized to be usable in other views.

- Authentication UI: manage the user's logged in/out state.
- Discovery: finding the users stuff, and leaving records of new things
- Preferences: UI fo rmanaging a user's preefrences with two axes of defaults
- An Access Control List widget for Solid ACL system
- Acess Control Logic
- Create a new object from modules/extensions which have registered their ability to create things

- A [form system](https://solid.github.io/solid-ui/Documentation/forms-intro.html): Forms are defined in RDF, and create/edit RDF data, including form definitions
- A collection of shortcut namespace objects for a selection of relevant RDF vocabularies.
- Small atomic widgets (buttons etc) of which the others are constructed.
- An error message panel

Some of the larger controls include:

- A chat widget: add discussion to any object. Infinte scroll, embedded images, social reactions, etc etc
- A people picker widget for choosing a set of people or an existing group
- A general purpose table display with built-in facetted browsing
- A two-dimentional matrix of editable live data extends in both domension.
- A notepad of shared notes for real-time collaboration.
- Drag and drop code for linking things and uploading files
- A set of tabs for holding other widgets and arbitrary UI elements

The typical style of the widgets is to know what data it has been derived from,
allow users to edit it, and to automatically sync with data as it changes in the future.
To see how these are used, see the panes which use them within the data browser.

The level of support for this varies.

See also: [A short intoduction to the Form system](https://solid.github.io/solid-ui/Documentation/forms-intro.html)

Contributions of bug fixes and new functionality, documentation, and tests are
always appreciated.
