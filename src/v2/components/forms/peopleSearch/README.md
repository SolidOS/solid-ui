# solid-ui-people-search component

A Lit-based custom element for searching people connected to the authenticated Solid user. It wraps `solid-ui-combobox` for the input experience, uses `solid-logic` auth/session state by default, and discovers people from the user's FOAF graph, linked address books, and the Solid catalog.

This README preserves the behavioral notes from the legacy widget comment so they live with the component documentation rather than inside the TypeScript implementation.

## Installation

```bash
npm install solid-ui
```

## Usage in a bundled project (webpack, Vite, Rollup, etc.)

```typescript
import { PeopleSearch } from 'solid-ui/components/forms/people-search'
```

The flat import `solid-ui/components/people-search` also works.

```html
<solid-ui-people-search id="people-search"></solid-ui-people-search>

<script type="module">
  const peopleSearch = document.querySelector('#people-search')

  peopleSearch.addEventListener('person-select', (event) => {
    console.log('Selected person:', event.detail.person)
    event.preventDefault()
    // open a custom profile panel instead of the default new-tab behavior
  })
</script>
```

## What It Searches

The component offers a mechanism for selecting a set of individuals to take some action on.

- It discovers people from the authenticated user's FOAF profile via `foaf:knows`.
- It follows the FOAF graph up to 3 degrees of separation.
- It loads contacts from linked address books.
- It also loads people listed in the Solid catalog.
- It performs client-side filtering on the discovered set for fast search-as-you-type behavior.
- It labels each result as `Friend`, `Contact`, or `People`.
- `Contact` takes precedence over `Friend`, and `Friend` takes precedence over `People` when a person is discovered from multiple sources.

## Assumptions

- The authenticated user is available through `solid-logic` (`authn.currentUser()`).
- If no `store` property is supplied, the component falls back to `solidLogicSingleton.store`.
- Address book discovery assumes the user has an appropriate type index entry for `vcard:AddressBook`. If not, no address book contacts will be discovered.

## API

### Properties / attributes

| Property | Attribute | Type | Default | Description |
|----------|-----------|------|---------|-------------|
| `label` | `label` | `string` | `Search for people` | Visible label above the combobox. |
| `placeholder` | `placeholder` | `string` | `Search for people...` | Placeholder shown in the combobox input. |
| `theme` | `theme` | `'light' \| 'dark'` | `'light'` | Forwarded to the nested combobox. |
| `layout` | `layout` | `'desktop' \| 'mobile'` | `'desktop'` | Reserved for responsive integration. |
| `catalogUrl` | `catalog-url` | `string` | Solid catalog URL | Override the catalog source for additional people. |
| `openProfilesOnSelect` | `open-profiles-on-select` | `boolean` | `true` | When `true`, selecting a person opens their WebID in a new tab unless the `person-select` event is cancelled. |
| `store` | none | `LiveStore \| null` | `solidLogicSingleton.store` | RDF store used for FOAF traversal and address book lookups. Set as a JS property, not an HTML attribute. |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `person-select` | `{ person: { name, webId, relationshipLabel } }` | Fired when a person is selected from the combobox. Cancel the event to prevent the default new-tab navigation. |

### Styling

The component forwards most search-field styling through the nested combobox. Useful CSS custom properties include:

| Variable | Description |
|----------|-------------|
| `--people-search-width` | Max width of the component host. |
| `--people-search-status-color` | Status text colour below the search input. |
| `--people-search-status-font-size` | Status text size. |
| `--people-search-input-background` | Search input background. |
| `--people-search-input-border` | Search input border. |
| `--people-search-input-text` | Search input text colour. |
| `--people-search-popup-background` | Popup list background. |
| `--people-search-popup-border` | Popup border colour. |
| `--people-search-popup-shadow` | Popup shadow. |
| `--people-search-description-text` | Secondary result-label text colour (`Friend`, `Contact`, `People`). |

## Authentication Behavior

- The component subscribes to `authSession.events` for `login` and `logout`, following the same event-listener pattern used by other v2 components.
- On login, it refreshes the authenticated user and restarts discovery.
- On logout, it clears discovered results and shows the sign-in prompt.

## Build

```bash
npm run build
```

Webpack emits bundles to `dist/components/peopleSearch/index.*`.