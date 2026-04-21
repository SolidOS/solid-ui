# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`solid-ui` is a UI library for building Solid (decentralized web) applications. It provides HTML5 widgets that connect to Solid pods via RDF/LDP protocols. The library exposes a global `window.UI` object in the browser with modules for forms, chat, ACL management, and general widgets.

## Commands

```bash
npm run build          # Full build: clean → version → lib → types → dev → dist → storybook
npm run build-lib      # Babel transpile src/ → lib/
npm run build-types    # Generate TypeScript declarations
npm run watch          # Watch mode (Babel only)

npm run lint           # ESLint src/**/*.{js,ts} and test/**/*.ts
npm run lint-fix       # ESLint with auto-fix

npm test               # build-version + lint + jest (also runs pre-push hook)
npm run jest           # Jest only, no lint
npm test test/unit/chat/infinite.test.ts  # Single test file
npm run coverage       # Jest with coverage → coverage/lcov-report/index.html

npm run storybook      # Storybook dev server on port 6006
npm run doc            # TypeDoc API docs → Documentation/api/
```

Git hooks (Husky): pre-commit runs lint-staged; pre-push runs `npm test`.

## Architecture

**Entry point:** `src/index.ts` — exports the main `UI` object bundled for UMD (browser + CommonJS).

**Key modules:**

| Path | Role |
|------|------|
| `src/widgets/` | Core UI components: buttons, forms, `peoplePicker`, `multiSelect`, drag-and-drop |
| `src/forms/` | Form rendering engine for the W3C UI vocabulary (`http://www.w3.org/ns/ui`) |
| `src/chat/` | Chat UI: infinite message area, message tools, encryption |
| `src/acl/` | ACL management: reading/writing WebACL resources, permission UI |
| `src/login/` | Authentication flow (delegates to `solid-logic`) |
| `src/utils/` | Helpers including `keyHelpers` (crypto/ACL utilities) |
| `src/matrix/` | Matrix/spreadsheet views |
| `src/table.js` | Table pane rendering |
| `src/pad.ts` | Collaborative pad widget |
| `src/icons/` | ~130 SVG icons |
| `src/stories/` | Storybook stories |

**Data layer:** The library relies on `solid-logic` for the RDF store (`store`) and authentication (`authn`). RDF namespaces come from `solid-namespace`. Widgets read/write RDF data through `rdflib` quad-store APIs — no REST calls are made directly; all persistence goes through the store.

## solid-ui-core

Pure utility modules (namespaces, style, debug, logging, icons, key helpers) live in a separate package at `../solid-ui-core/` (repo: `github.com/solidos/solid-ui-core`). They are imported here as `solid-ui-core`.

**Local development:** After editing solid-ui-core, run `npm run build-lib` there, then tests here will pick up the changes via the npm link. The link is set up with `npm link solid-ui-core` from this directory.

**Critical:** `solid-logic` and `rdflib` must not exist inside `node_modules/solid-ui-core/node_modules/` — npm 7 sometimes auto-installs peer deps there, which creates duplicate store instances. Delete them if they appear.

**Jest mocking:** When mocking solid-ui-core modules in tests, use the package alias form:
```ts
jest.mock('solid-ui-core/utils/keyHelpers/otherHelpers', () => { ... })
```
Not the raw `node_modules/solid-ui-core/src/...ts` path — that never intercepts the compiled `require()` calls.

**Build outputs:**
- `lib/` — Babel-transpiled CommonJS modules (npm consumers)
- `dist/solid-ui.js` / `solid-ui.min.js` — UMD bundles (browser `<script>` tag)
- Type declarations alongside `lib/`

## Testing

Tests live in `test/unit/`. Jest runs in a custom jsdom environment (`jest-environment-jsdom.js`) that patches `cuid2` compatibility. Setup file: `test/helpers/setup.ts`. Custom matchers: `test/custom-matchers/`.

TypeScript is transpiled by `ts-jest`. HTTP is mocked with `nock`. DOM testing uses Testing Library.

## Forms subsystem

The forms subsystem (`src/forms/`) implements the W3C UI vocabulary and deserves special attention — see `Documentation/FormsReadme.md` for its data model and field types. Form fields are defined by RDF triples; the renderer walks the graph to produce HTML.

## Version

Version is auto-generated into `src/versionInfo.ts` by `timestamp.sh` as part of the build. Do not edit that file manually.
