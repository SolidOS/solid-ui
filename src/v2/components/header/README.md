# solid-ui-header component

This package exports a Lit-based custom element: `solid-ui-header`.

## Usage

Import once in your application (from built distribution or source, based on bundler/setup):

```javascript
SolidUIHeaderElement
// or directly from source in monorepo:
// import '../../../src/v2/components/header/Header.ts'
```

Then use in HTML:

```html
<solid-ui-header theme="dark" layout="desktop" brand-link="/">
  <a slot="user-menu" href="/profile">Profile</a>
  <a slot="help-menu" href="/help">Help</a>
</solid-ui-header>
```

## API

Properties/attributes:

- `logo`: URL string for the brand image (default: Solid emblem URL).
- `helpIcon`: URL string for the help icon, default from icons asset.
- `titleLink`: URL string for the brand link (default: `#`).
- `layout`: `desktop` or `mobile`.
- `theme`: `light` or `dark`.

Slots:

- `title` (default content is `Solid`).
- `user-menu` for user-related actions.
- `help-menu` for help related actions rendered inside the help icon dropdown.

The `helpMenuList` property also renders inside the same help icon dropdown menu.

## Styles

Customization is supported through CSS variables:
- `--header-bg`, `--header-text`, `--header-border`, etc.

The brand logo link is only rendered when the incoming `layout` is `desktop`.

## Testing

Unit test file: `src/v2/components/header/header.test.ts`

Run tests:

```bash
npm test -- --runInBand --testPathPatterns=src/v2/components/header/header.test.ts
```

Run full suite:

```bash
npm test
```

## Build

The component is included in build output as `components/solid-ui-header.*` via `webpack.config.mjs`.

```bash
npm run build
```
