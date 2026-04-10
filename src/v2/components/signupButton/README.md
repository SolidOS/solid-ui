# solid-ui-signup-button component

A Lit-based custom element that renders a styled button which opens a Solid Pod signup page in a new browser tab.

## Installation

```bash
npm install solid-ui
```

## Usage in a bundled project (webpack, Vite, Rollup, etc.)

```javascript
import { SignupButton } from 'solid-ui/components/signup-button'
```

```html
<solid-ui-signup-button label="Sign Up" signup-url="https://solidproject.org/get_a_pod"></solid-ui-signup-button>
```

## Usage in a plain HTML page (CDN / script tag)

```html
<script src="node_modules/solid-ui/dist/components/signupButton/index.js"></script>

<solid-ui-signup-button></solid-ui-signup-button>
```

## TypeScript

```typescript
import { SignupButton } from 'solid-ui/components/signup-button'

const btn = document.querySelector('solid-ui-signup-button') as SignupButton
btn.label = 'Create a Pod'
btn.signupUrl = 'https://solidproject.org/get_a_pod'
```

## API

### Properties / attributes

| Property    | Attribute    | Type               | Default                              | Description |
|-------------|--------------|---------------------|--------------------------------------|-------------|
| `label`     | `label`      | `string`            | `Sign Up`                            | Button text. Overridable via the default slot. |
| `signupUrl` | `signup-url` | `string`            | `https://solidproject.org/get_a_pod` | URL opened in a new tab when the button is clicked. |
| `theme`     | `theme`      | `'light' \| 'dark'` | `'light'`                            | Sets the colour theme. Use `'dark'` when placing the button on a dark background. |

### Slots

| Slot      | Description |
|-----------|-------------|
| (default) | Replaces the button label text. |

### CSS shadow parts

| Part            | Description |
|-----------------|-------------|
| `signup-button` | The inner `<button>` element. Allows full style override via `::part(signup-button)`. |

### CSS custom properties

| Variable               | Fallback                           | Description |
|------------------------|------------------------------------|-------------|
| `--signup-button-text` | `--header-button-text` / `#0f172a` | Button text colour (light theme) |
| `--white`              | `#FFF`                             | Button border colour (light theme) |

### Theming

Set `theme="dark"` for dark backgrounds. The text and border colour switch to white.

```html
<solid-ui-signup-button theme="dark"></solid-ui-signup-button>
```

When used inside `<solid-ui-header>`, the `theme` attribute is forwarded automatically.

## Behaviour

Clicking the button calls `window.open(signupUrl, '_blank', 'noopener,noreferrer')`, opening the signup page in a new tab.

## Build

```bash
npm run build
```

Webpack emits bundles to `dist/components/signupButton/index.*`.
