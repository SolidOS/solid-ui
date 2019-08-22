# solid-ui

[![NPM Package](https://img.shields.io/npm/v/solid-ui.svg)](https://www.npmjs.com/package/solid-ui)


User Interface widgets and utilities for Solid

These are HTML5 widgets which connect to a solid store.   Building blocks for solid-based apps.

A selection
```
  var UI = require('solid-ui')

  var acl = require('solid-ui').acl
```
The submodules at the moment include log, acl, acl-control, messageArea, etc

- A login widget
- A chat widget: add discussion to any object.
- A people picker widget for choosing a set of people or an existing group
- A [form system](https://solid.github.io/solid-ui/Documentation/forms-intro.html): Forms are defined in RDF, and create/edit RDF data, including form definitions
- A general purpose table display with built-in facetted browsing
- An Access Control List widget for Solid ACL system
- A two-dimentional matrix of editable live data
- A notepad of shared notes for real-time collaboration.
- Drag and drop code for linking things and uploading files
- A set of tabs for holding other widgets and arbitrary UI elements
- A collection of shortcut namespace objects for a selection of relevant RDF vocabularies.

The typical style of the widgets is to know what data it has been derived from,
allow users to edit it, and to automatically sync with data as it changes in the future.
TO see how these are  used, see the panes which use them within the solid-app-set 

The level of support for this varies.

See also: [A short intoduction to the Form system](https://solid.github.io/solid-ui/Documentation/forms-intro.html)

Contributions of bug fixes and new functionality, documentation, and tests are
always appreciated.
