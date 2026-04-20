# solid-ui-footer component

A Lit-based custom element that renders a footer panel for Solid applications. It supports a rounded rectangle layout, grey background, and adjustable positioning via attributes.

## Installation

```bash
npm install solid-ui
```

## Usage in a bundled project (webpack, Vite, Rollup, etc.)

Import once to register the custom element and get access to the type:

```javascript
import { Footer } from 'solid-ui/components/footer'
```

Then use the element in HTML or in your framework templates:

```html
<solid-ui-footer
  position="fixed"
  bottom="1rem"
  left="1rem"
  right="1rem">
</solid-ui-footer>
```

If you need the footer to be relative to a container, use `position="relative"` or `position="absolute"` along with `top`, `left`, `right`, and `bottom` as needed.

## Usage in a plain HTML page (CDN / script tag)

Load `rdflib` and `solid-logic` first, then import the footer bundle:

```html
<script src="https://cdn.jsdelivr.net/npm/rdflib/dist/rdflib.min.js"></script>
<script src="https://unpkg.com/solid-logic/dist/solid-logic.min.js"></script>
<script type="module">
  import 'https://cdn.skypack.dev/solid-ui/components/footer'
</script>

<solid-ui-footer position="fixed" bottom="1rem" right="1rem"></solid-ui-footer>
```

## TypeScript

Types are included. Import the exported element class:

```typescript
import { Footer } from 'solid-ui/components/footer'

const footer = document.querySelector('solid-ui-footer') as Footer
footer.position = 'fixed'
footer.bottom = '1rem'
```

## API

Properties / attributes:

- `position`: `static`, `absolute`, `relative`, `fixed`, or `sticky`.
- `top`: CSS offset for the top edge when `position` is not `static`.
- `right`: CSS offset for the right edge when `position` is not `static`.
- `bottom`: CSS offset for the bottom edge when `position` is not `static`.
- `left`: CSS offset for the left edge when `position` is not `static`.
- `store`: an `rdflib` store instance used to resolve the logged-in user name from the current Solid session.

## Display behavior

- When no user is logged in, the footer displays a public-view message.
- When a user is logged in, the footer displays a logged-in message and links the current profile name to the user profile URI.

## Styling

Customize the footer using CSS variables:

- `--footer-bg` — background color (default: `#e6e6e6`).
- `--footer-text` — text color (default: `#4f4f4f`).
- `--footer-border-radius` — corner radius (default: `1rem`).
- `--footer-box-shadow` — box shadow.
- `--footer-link` — link color.

## Example

```html
<solid-ui-footer position="fixed" bottom="1rem" left="1rem" right="1rem"></solid-ui-footer>
```

```typescript
import { Footer } from 'solid-ui/components/footer'
import type { LiveStore } from 'rdflib'

const footer = document.querySelector('solid-ui-footer') as Footer
footer.position = 'fixed'
footer.bottom = '1rem'
footer.left = '1rem'
footer.right = '1rem'
footer.store = myRdflibStore as LiveStore
```

## Testing

The component is covered by unit tests under `src/v2/components/footer/Footer.test.ts`.
