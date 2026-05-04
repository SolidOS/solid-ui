# solid-ui-combobox component

A Lit-based custom element that renders a styled combobox with a text input and a custom popup listbox. It supports async suggestion loading through a consumer-provided `suggestionProvider`, keyboard navigation, `input` and `change` events, and keeps the currently selected option at the top of the popup when opened.

## Installation

```bash
npm install solid-ui
```

## Usage in a bundled project (webpack, Vite, Rollup, etc.)

```javascript
import { Combobox } from 'solid-ui/components/forms/combobox'
```

The legacy flat import path `solid-ui/components/combobox` still works, but the grouped `forms/combobox` path is the preferred long-term entrypoint.

```html
<solid-ui-combobox id="person-combobox" label="Person"></solid-ui-combobox>

<script type="module">
	const combobox = document.querySelector('#person-combobox')
	combobox.suggestionProvider = async (query) => {
		if (!query.trim()) return []

		const response = await fetch(`/api/people?q=${encodeURIComponent(query)}`)
		const results = await response.json()

		return results.map((person) => ({
			label: person.name,
			value: person.id,
			publicId: person.webId,
			meta: { email: person.email }
		}))
	}

	combobox.addEventListener('input', ({ detail }) => {
		console.log('Typed query:', detail.value)
	})

	combobox.addEventListener('change', ({ detail }) => {
		console.log('Selected value:', detail.value)
		console.log('Selected label:', detail.label)
		console.log('Selected option:', detail.option)
	})
	</script>
```

## Usage in a plain HTML page (CDN / script tag)

```html
<script src="node_modules/solid-ui/dist/components/combobox/index.js"></script>

<solid-ui-combobox id="city-combobox" placeholder="Search cities"></solid-ui-combobox>

<script>
	const combobox = document.getElementById('city-combobox')
	combobox.options = [
		{ label: 'Boston', value: 'bos' },
		{ label: 'Chicago', value: 'chi' },
		{ label: 'New York', value: 'nyc' }
	]

	combobox.addEventListener('change', (event) => {
		console.log(event.detail)
	})
</script>
```

## TypeScript

```typescript
import { Combobox } from 'solid-ui/components/forms/combobox'

const combobox = document.querySelector('solid-ui-combobox') as Combobox

combobox.suggestionProvider = async (query) => {
	return [
		{ label: `Result for ${query}`, value: query.toLowerCase() }
	]
}

combobox.addEventListener(
	'change',
	(e: CustomEvent<{ value: string; label: string; option?: { label: string; value: string } }>) => {
		console.log(e.detail.value)
	}
)
```

The component works with suggestion objects shaped like:

```typescript
type ComboboxSuggestion = {
	label: string
	value: string
	description?: string
	disabled?: boolean
	publicId?: string
	meta?: Record<string, unknown>
}
```

## API

### Properties / attributes

| Property | Attribute | Type | Default | Description |
|----------|-----------|------|---------|-------------|
| `label` | `label` | `string` | `Select an option` | Visible label rendered above the input. If omitted, provide an `aria-label` for accessibility. |
| `placeholder` | `placeholder` | `string` | `Type to search` | Placeholder text shown inside the input when it is empty. |
| `theme` | `theme` | `'light' \| 'dark'` | `'light'` | Sets the colour theme. |
| `options` | `options` | `ComboboxSuggestion[]` | `[]` | Current list of suggestions shown in the popup. In practice this should be set as a property from JavaScript rather than as an HTML attribute. |
| `layout` | `layout` | `'desktop' \| 'mobile'` | `'desktop'` | Layout mode reserved for integration with other responsive components. |
| `value` | `value` | `string` | `''` | The currently selected suggestion value. If it matches a suggestion, that suggestion is shown in the input and moved to the top of the popup when opened. |
| `inputValue` | none | `string` | `''` | Current raw text shown in the input field. This updates as the user types. |
| `suggestionProvider` | none | `(query: string) => Promise<ComboboxSuggestion[]>` | `undefined` | Optional async function supplied by the consumer. It receives the current input text and returns normalized suggestions for the popup. |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `input` | `{ value: string }` | Fired when the user types in the input. Useful when the consumer wants to observe free text in addition to providing a `suggestionProvider`. |
| `change` | `{ value: string; label: string; option?: ComboboxSuggestion }` | Fired when the user selects a suggestion from the popup or confirms a keyboard selection. |

### CSS custom properties

These can be set on `solid-ui-combobox`, on a container element, or on `:root`.

| Variable | Fallback | Description |
|----------|----------|-------------|
| `--popup-background` | `--color-background` | Popup surface background. |
| `--popup-text` | `--color-text` | Popup text colour. |
| `--popup-border` | `--color-border` / `#E5E7EB` | Popup border colour. |
| `--popup-shadow` | `--box-shadow-sm` / `0 1px 4px ...` | Popup shadow. |
| `--input-background` | `--color-background` | Input and popup background. |
| `--input-text` | `--color-text` | Input text colour. |
| `--input-border` | `--color-text` | Input border colour. |
| `--label-color` | `--grey-purple-700` | Label text colour. |
| `--placeholder-color` | `--grey-purple-700` | Placeholder text colour. |
| `--item-text` | `--color-text` | Option text colour. |
| `--item-selected-text` | `--color-primary` / `#7c4dff` | Active option text colour. |
| `--item-hover-background` | `--lavender-300` / `#e6dcff` | Hover background for option rows. |
| `--item-selected-background` | `--lavender-400` / `#cbb9ff` | Active option background. |

The component also inherits common design-system tokens such as `--border-radius-base`, `--border-radius-md`, `--color-background`, `--color-border`, `--color-text`, `--color-primary`, `--box-shadow-sm`, `--lavender-300`, and `--lavender-400`.

### CSS shadow parts

These parts can be styled from a consuming repo using `::part(...)`.

| Part | Description |
|------|-------------|
| `listbox` | The `<ul>` element that contains the suggestions. |
| `option` | Every suggestion row. |
| `selected-option` | Added to the currently selected suggestion row. |
| `active-option` | Added to the currently keyboard-active suggestion row. |
| `disabled-option` | Added to disabled suggestion rows. |

## Theming

Set `theme="dark"` when placing the combobox on a dark background.

```html
<solid-ui-combobox theme="dark" label="Person"></solid-ui-combobox>
```

In dark theme, the component switches its background and text fallbacks to dark-surface values while keeping the same public styling hooks.

## Popup behaviour

- Opens a popup listbox under the combobox input.
- Keeps the currently selected option at the top of the popup when opened.
- Supports keyboard navigation with `ArrowUp`, `ArrowDown`, `Home`, `End`, `Enter`, `Space`, and `Escape`.
- Emits an `input` event as the user types and a `change` event when the user selects a suggestion.
- Closes when clicking outside the component or the popup.
- Skips disabled suggestions during selection and keyboard navigation.
- Renders the popup through a portal so it can escape clipping and stacking issues from surrounding form layouts.

## Styling from a consuming repo

Use CSS custom properties on the host element for most theming:

```css
solid-ui-combobox {
	width: 100%;
	--input-background: #ffffff;
	--input-border: #c7ced8;
	--input-text: #101828;
	--popup-background: #ffffff;
	--popup-shadow: 0 8px 24px rgba(16, 24, 40, 0.12);
	--item-hover-background: #eee7ff;
	--item-selected-background: #d9c8ff;
	--border-radius-md: 0.5rem;
}
```

Use `::part(...)` when you need to target exposed listbox elements directly:

```css
solid-ui-combobox::part(listbox) {
	max-height: 16rem;
}

solid-ui-combobox::part(option) {
	letter-spacing: 0.01em;
}

solid-ui-combobox::part(selected-option) {
	font-weight: 700;
}
```

## Build

```bash
npm run build
```

Webpack emits bundles to `dist/components/combobox/index.*`.
