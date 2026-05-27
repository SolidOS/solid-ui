# solid-ui-select component

A Lit-based custom element that renders a styled select control with a custom popup listbox. It supports keyboard navigation, emits a `change` event when the selected value changes, and keeps the currently selected option at the top of the popup when opened.

## Installation

```bash
npm install solid-ui
```

## Usage in a bundled project (webpack, Vite, Rollup, etc.)

```javascript
import { Select } from 'solid-ui/components/forms/select'
```

The legacy flat import path `solid-ui/components/select` still works, but the grouped `forms/select` path is the preferred long-term entrypoint.

```html
<solid-ui-select id="language-select" label="Language"></solid-ui-select>

<script type="module">
	const select = document.querySelector('#language-select')
	select.options = [
		{ label: 'English', value: 'en' },
		{ label: 'French', value: 'fr' },
		{ label: 'Spanish', value: 'es' }
	]

	select.addEventListener('change', ({ detail }) => {
		console.log('Selected value:', detail.value)
	})
</script>
```

## Usage in a plain HTML page (CDN / script tag)

```html
<script src="node_modules/solid-ui/dist/components/select/index.js"></script>

<solid-ui-select id="language-select"></solid-ui-select>

<script>
	const select = document.getElementById('language-select')
	select.options = [
		{ label: 'English', value: 'en' },
		{ label: 'French', value: 'fr' }
	]
	select.value = 'fr'
</script>
```

## TypeScript

```typescript
import { Select } from 'solid-ui/components/forms/select'

const select = document.querySelector('solid-ui-select') as Select
select.options = [
	{ label: 'English', value: 'en' },
	{ label: 'French', value: 'fr', disabled: false }
]

select.addEventListener('change', (e: CustomEvent<{ value: string }>) => {
	console.log(e.detail.value)
})
```

`options` expects an array of:

```typescript
type SelectOption = {
	label: string
	value: string
	disabled?: boolean
}
```

## API

### Properties / attributes

| Property | Attribute | Type | Default | Description |
|----------|-----------|------|---------|-------------|
| `label` | `label` | `string` | `Select an option` | Fallback label shown when there is no selected value and no options are available. |
| `theme` | `theme` | `'light' \| 'dark'` | `'light'` | Sets the colour theme. |
| `options` | none | `SelectOption[]` | `[]` | Array of selectable options. This is a JavaScript-only property and is not available as an HTML attribute. |
| `layout` | `layout` | `'desktop' \| 'mobile'` | `'desktop'` | Layout mode reserved for integration with other responsive components. |
| `value` | `value` | `string` | `''` | The currently selected option value. If it matches an option, that option is shown in the trigger and moved to the top of the popup when opened. |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ value: string }` | Fired when the user selects an option from the popup or confirms a keyboard selection. |

### CSS custom properties

These can be set on `solid-ui-select`, on a container element, or on `:root`.

| Variable | Fallback | Description |
|----------|----------|-------------|
| `--select-z-index` | `400` / `900` in dark theme | Base host stacking level before the popup opens. |
| `--select-open-z-index` | `1000` | Host stacking level while the popup is open. |
| `--select-popup-z-index` | `1001` | Popup stacking level inside the open host. |
| `--select-popup-extra-width` | `2px` | Extra popup width beyond the trigger width. |
| `--select-popup-width` | `100%` | Base popup width before extra width is applied. |
| `--select-popup-background` | `--color-background` | Popup surface background. |
| `--select-trigger-background` | `--color-background` | Trigger background. |
| `--select-trigger-border` | `1px solid var(--gray-400, #99A1AF)` | Trigger border. |
| `--select-trigger-text` | `--color-text-subheading` | Trigger text colour. |
| `--select-trigger-height` | `--min-touch-target` / `44px` | Height of the trigger and option rows. |
| `--popup-border` | `--color-border` / `#E5E7EB` | Popup border colour. |
| `--popup-text` | `--color-text` | Popup text colour. |
| `--popup-shadow` | `--box-shadow-sm` / `0 1px 4px ...` | Popup shadow. |
| `--input-background` | `--color-background` | Listbox and option row background. |
| `--item-text` | `--color-text` | Option text colour. |
| `--item-selected-text` | `--color-primary` / `#7c4dff` | Active option text colour. |
| `--item-hover-background` | `--lavender-300` / `#e6dcff` | Hover background for option rows. |
| `--item-selected-background` | `--lavender-400` / `#cbb9ff` | Active option background. |

The component also inherits common design-system tokens such as `--border-radius-base`, `--border-radius-sm`, `--spacing-xxs`, `--spacing-xs`, `--font-size-sm`, `--font-weight-md`, `--font-weight-bold`, `--gray-400`, `--color-background`, `--color-text`, `--color-text-subheading`, `--color-border`, `--color-primary`, `--lavender-300`, `--lavender-400`, `--box-shadow-sm`, and `--min-touch-target`.

### CSS shadow parts

These parts can be styled from a consuming repo using `::part(...)`.

| Part | Description |
|------|-------------|
| `select-trigger` | The trigger button. |
| `trigger-label` | The text label inside the trigger. |
| `trigger-icon` | The down-arrow icon wrapper inside the trigger. |
| `popup-box` | The popup container that wraps the listbox. |
| `listbox` | The `<ul>` element that contains the options. |
| `option` | Every option row. |
| `selected-option` | Added to the currently selected option row. |
| `active-option` | Added to the currently keyboard-active option row. |
| `disabled-option` | Added to disabled option rows. |

## Theming

Set `theme="dark"` when placing the select on a dark background.

```html
<solid-ui-select theme="dark"></solid-ui-select>
```

In dark theme, the component switches its background and text fallbacks to dark-surface values while keeping the same public styling hooks.

## Popup behaviour

- Opens a popup listbox directly under the trigger.
- Keeps the currently selected option at the top of the popup when opened.
- Supports keyboard navigation with `ArrowUp`, `ArrowDown`, `Home`, `End`, `Enter`, `Space`, and `Escape`.
- Emits a `change` event with the selected value when the user picks an option.
- Closes when clicking outside the component.
- Skips disabled options during selection and keyboard navigation.

## Styling from a consuming repo

Use CSS custom properties on the host element for most theming:

```css
solid-ui-select {
	width: 100%;
	--select-trigger-height: 48px;
	--select-trigger-background: #ffffff;
	--select-trigger-border: 1px solid #c7ced8;
	--select-trigger-text: #101828;
	--select-popup-background: #ffffff;
	--select-popup-extra-width: 0px;
	--item-hover-background: #eee7ff;
	--item-selected-background: #d9c8ff;
	--border-radius-sm: 0.2rem;
}
```

Use `::part(...)` when you need to target exposed internal elements directly:

```css
solid-ui-select::part(select-trigger) {
	box-shadow: none;
}

solid-ui-select::part(popup-box) {
	box-shadow: 0 8px 24px rgba(16, 24, 40, 0.12);
}

solid-ui-select::part(option) {
	letter-spacing: 0.01em;
}

solid-ui-select::part(selected-option) {
	font-weight: 700;
}
```

## Build

```bash
npm run build
```

Webpack emits bundles to `dist/components/select/index.*`.
