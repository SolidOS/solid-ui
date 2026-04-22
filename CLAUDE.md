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

## Related packages

This repo depends on two sibling packages, both cloned next to this directory:

| Package | Repo | Local path |
|---------|------|------------|
| `solid-ui-core` | `github.com/solidos/solid-ui-core` | `../solid-ui-core/` |
| `ui-forms` | `github.com/solidos/ui-forms` | `../ui-forms/` |

**`solid-ui-core`** holds pure utility modules: namespaces (`ns`), style constants, debug/log, icons, buttons, error, dragAndDrop, multiSelect, widgetHelpers, and utils/keyHelpers.

**`ui-forms`** holds the W3C UI vocabulary form renderer: fieldParams, fieldFunction, formStyle, basic, comment, and autocomplete components.

**Local development:** Neither package is published to npm yet — they are npm-linked. After editing either sibling, run `npm run build-lib` there before running tests here. Links are set up as symlinks in `node_modules/`.

**Critical:** `solid-logic` and `rdflib` must not exist inside `node_modules/solid-ui-core/node_modules/` or `node_modules/ui-forms/node_modules/` — npm 7 auto-installs peer deps there, creating duplicate store instances. Delete them if they appear.

**Jest mocking:** When mocking sub-path imports in tests, use the package alias form:
```ts
jest.mock('solid-ui-core/utils/keyHelpers/otherHelpers', () => { ... })
```
Not the raw `node_modules/.../src/...ts` path — that never intercepts the compiled `require()` calls.

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
