# solid-ui-button component

A Lit-based base button component for shared actions across panes and apps. It stays semantic by rendering a native `<button>`, supports both normal click listeners and a property callback, and handles either slotted inline SVG icons or URL/data-URL image icons.

## Installation

```bash
npm install solid-ui
```

## Usage in a bundled project

```typescript
import { Button } from 'solid-ui/components/actions/button'
```

The legacy flat import path `solid-ui/components/button` still works, but the grouped `actions/button` path is the preferred long-term entrypoint.

```html
<solid-ui-button label="Upload"></solid-ui-button>
<solid-ui-button variant="primary" label="Save"></solid-ui-button>
<solid-ui-button icon="data:image/svg+xml,..." label="Camera"></solid-ui-button>
```

```html
<solid-ui-button label="Take Photo">
  <svg slot="icon" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="8"></circle>
  </svg>
</solid-ui-button>
```

## API

### Properties / attributes

| Property       | Attribute       | Type                                 | Default       | Description                                                                                                                                                                  |
| -------------- | --------------- | ------------------------------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`        | `label`         | `string`                             | `''`          | Button text. Overridable through the default slot.                                                                                                                           |
| `type`         | `type`          | `'button' \| 'submit' \| 'reset'`    | `'button'`    | Native button type.                                                                                                                                                          |
| `disabled`     | `disabled`      | `boolean`                            | `false`       | Disables the inner button.                                                                                                                                                   |
| `selected`     | `selected`      | `boolean`                            | `false`       | Applies the active/current visual state for things like selected group or address buttons. This is visual state only; it does not automatically add toggle or tab semantics. |
| `ariaLabel`    | `aria-label`    | `string`                             | `''`          | Accessible label for icon-only or custom-label buttons.                                                                                                                      |
| `name`         | `name`          | `string`                             | `''`          | Passed through to the inner native button.                                                                                                                                   |
| `value`        | `value`         | `string`                             | `''`          | Passed through to the inner native button.                                                                                                                                   |
| `variant`      | `variant`       | `'primary' \| 'secondary' \| 'icon'` | `'secondary'` | Visual treatment for the button.                                                                                                                                             |
| `size`         | `size`          | `'sm' \| 'md' \| 'lg'`               | `'md'`        | Button size.                                                                                                                                                                 |
| `theme`        | `theme`         | `'light' \| 'dark'`                  | `'light'`     | Light or dark token mapping.                                                                                                                                                 |
| `fullWidth`    | `full-width`    | `boolean`                            | `false`       | Expands the host and inner button to the available width. Useful for stacked mobile actions, form footers, or full-row menu buttons.                                         |
| `icon`         | `icon`          | `string`                             | `''`          | URL or data URL for a fallback `<img>` icon.                                                                                                                                 |
| `iconPosition` | `icon-position` | `'start' \| 'end'`                   | `'start'`     | Places the icon before or after the label.                                                                                                                                   |
| `handleClick`  | n/a             | `(event: MouseEvent) => void`        | `undefined`   | Property-only callback invoked on click. Native `click` events still bubble normally.                                                                                        |

### Slots

| Slot      | Description                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------ |
| `icon`    | Preferred icon path for inline SVG or custom markup. When present it overrides the `icon` property fallback. |
| (default) | Replaces the button label text.                                                                              |

### CSS custom properties

| Variable                        | Fallback                                            | Description                                                   |
| ------------------------------- | --------------------------------------------------- | ------------------------------------------------------------- |
| `--button-background`           | `--color-background`                                | Button background colour                                      |
| `--button-text`                 | `--color-text-subheading`                           | Button text colour                                            |
| `--button-border`               | `--color-border-button`                             | Button border colour                                          |
| `--button-hover-background`     | `--color-surface-subtle`                            | Hover background colour                                       |
| `--button-hover-border`         | `--color-border-button-hover`                       | Hover border colour                                           |
| `--button-hover-text`           | `--button-text`                                     | Hover text colour                                             |
| `--button-selected-background`  | `--color-surface-selected`                          | Selected/current-state background colour                      |
| `--button-selected-text`        | `--color-text-selected`                             | Selected/current-state text colour                            |
| `--button-selected-border`      | `--color-border-selected`                           | Selected/current-state border colour                          |
| `--button-icon-color`           | `currentColor`                                      | Icon colour for slotted SVG content                           |
| `--button-focus-ring`           | `--color-focus-ring`                                | Focus outline colour                                          |
| `--button-height-sm`            | `1.875rem`                                          | Compact button height used for the `sm` size                  |
| `--button-height-md`            | `var(--min-touch-target, 44px)`                     | Standard action button height used for the `md` size          |
| `--button-height-lg`            | `calc(var(--min-touch-target, 44px) + 0.5rem)`      | Larger mobile or stacked action height used for the `lg` size |
| `--button-padding-sm`           | `0 var(--button-padding-x-sm)`                      | Full padding shorthand used when `size="sm"`                  |
| `--button-padding-md`           | `0 var(--button-padding-x-md)`                      | Full padding shorthand used when `size="md"`                  |
| `--button-padding-lg`           | `0 var(--button-padding-x-lg)`                      | Full padding shorthand used when `size="lg"`                  |
| `--button-border-width`         | `1px`                                               | Border width applied to the inner native button                |
| `--button-padding-x-sm`         | `var(--spacing-xs, 0.75rem)`                        | Horizontal padding used when `size="sm"`                      |
| `--button-padding-x-md`         | `var(--spacing-sm, 0.9375rem)`                      | Horizontal padding used when `size="md"`                      |
| `--button-padding-x-lg`         | `var(--spacing-md, 1.25rem)`                        | Horizontal padding used when `size="lg"`                      |
| `--button-border-radius`        | `var(--border-radius-base, 0.3125rem)`              | Border radius applied to the inner native button              |
| `--button-font-weight`          | `var(--font-weight-bold, 600)`                      | Font weight applied to the button label                       |
| `--button-line-height`          | `1`                                                 | Line height applied to the inner native button                |
| `--button-justify-content`      | `center`                                            | Horizontal alignment of the button content                    |
| `--button-box-shadow`           | `none`                                              | Base box shadow for the button                                |
| `--button-hover-box-shadow`     | `var(--button-box-shadow)`                          | Hover-state box shadow                                        |
| `--button-active-box-shadow`    | `var(--button-hover-box-shadow)`                    | Active-state box shadow                                       |
| `--button-active-transform`     | `translateY(1px)`                                   | Transform applied while the button is active                  |
| `--button-focus-outline`        | `2px solid var(--button-focus-ring)`                | Focus-visible outline shorthand                               |
| `--button-focus-outline-offset` | `2px`                                               | Focus-visible outline offset                                  |
| `--button-focus-box-shadow`     | `none`                                              | Additional focus-visible box shadow                           |
| `--button-transition`           | `transform/background/color/border-color 0.2s ease` | Transition shorthand for the inner native button              |
| `--button-icon-size-sm`         | `var(--icon-xxxs, 0.75rem)`                         | Icon size used when `size="sm"`                               |
| `--button-icon-size-md`         | `var(--icon-xxs, 1rem)`                             | Icon size used when `size="md"`                               |
| `--button-icon-size-lg`         | `var(--icon-xxs, 1rem)`                             | Icon size used when `size="lg"`                               |
| `--button-font-size-sm`         | `0.875rem`                                          | Text size used when `size="sm"`                               |
| `--button-font-size-md`         | `1rem`                                              | Text size used when `size="md"`                               |
| `--button-font-size-lg`         | `1.125rem`                                          | Text size used when `size="lg"`                               |

These hooks are intended to cover most app-level button theming without requiring `::part(button)` overrides. Use the host custom properties first, and fall back to `::part(button)` only when a consuming app needs behavior that still cannot be expressed through the token surface.

## Layout and sizing

By default, `solid-ui-button` is content-sized. It grows just enough to fit its label and optional icon, which matches most of the existing button usage in `profile-pane`, `contacts-pane`, and `solid-panes`.

Set `full-width` when you want the button to fill the available row instead. That is mainly useful for:

- stacked mobile actions
- form footer actions
- menu or sidebar buttons that should use the full hit area

```html
<solid-ui-button
  full-width
  variant="primary"
  label="Save changes"
></solid-ui-button>
```

The built-in size scale is now aligned to the profile-pane button patterns and the shared touch-target token already used by other controls in this repo:

- `sm`: `30px` high with `0.75rem` horizontal padding for compact controls and smaller inline actions
- `md`: `var(--min-touch-target, 44px)` high with `0.9375rem` horizontal padding for standard edit-dialog and general action buttons
- `lg`: `calc(var(--min-touch-target, 44px) + 0.5rem)` high with `1.25rem` horizontal padding for larger mobile or stacked actions

The icon scale is intentionally flatter than the button-height scale:

- `sm`: `12px` icon, matching compact inline action icons in `profile-pane`
- `md`: `16px` icon, matching the common menu, header, and button-leading icon size
- `lg`: `16px` icon by default, because the larger profile-pane buttons mostly keep the same leading-icon size rather than scaling the icon up

## Text size and text color

The component inherits the app's font family through `font: inherit`, so typeface decisions stay with the consuming app.

Text size is controlled by the `size` attribute and the matching font-size tokens:

- `size="sm"` uses `--button-font-size-sm`
- `size="md"` uses `--button-font-size-md`
- `size="lg"` uses `--button-font-size-lg`

Text color is driven by semantic tokens rather than raw palette values:

- `secondary` uses `--button-text`, which now defaults to `--color-text-subheading`
- `primary` switches `--button-text` to `--color-text-on-action`
- `icon` keeps the neutral button styling but hides the label and tightens horizontal padding for icon-only actions
- `theme="dark"` remaps the neutral button tokens onto shared semantic names like `--color-background`, `--color-text-subheading`, and `--color-border`, with dark fallbacks for standalone use

That keeps the button reusable across repos while allowing each app to map the same semantic names onto its own palette.

## Selected state and accessibility

Use `selected` when the button represents the current item in a parent-controlled set, for example:

- the active group button
- the current address or filter button
- the selected menu item

`selected` is intentionally visual state only. The base button does not automatically add `aria-pressed`, `aria-selected`, or tab roles because those semantics depend on the larger interaction pattern:

- use `aria-pressed` for true toggle buttons
- use `aria-selected` inside tab or listbox-style widgets
- use `aria-current` when the button represents the current page or location

If you need one of those richer patterns, build that wrapper component on top of `solid-ui-button` rather than pushing all of that behavior into the base button.

## Build

```bash
npm run build
```

Webpack emits bundles to `dist/components/button/index.*`.
