import { PeopleSearch } from './PeopleSearch'

export { PeopleSearch }
export type {
  PeopleSearchPerson,
  PeopleSearchRelationshipLabel,
  PeopleSearchSelectDetail,
  PeopleSearchSuggestion
} from './PeopleSearch'
export {
  DEFAULT_CATALOG_URL,
  discoverPeopleSearchEntries,
  matchesPeopleSearchNameWords,
  mergePeopleSearchPerson,
  sortPeopleSearchPeople,
  tokenizePeopleSearchQuery
} from './peopleSearchHelpers'

const PEOPLE_SEARCH_TAG_NAME = 'solid-ui-people-search'

if (!customElements.get(PEOPLE_SEARCH_TAG_NAME)) {
  customElements.define(PEOPLE_SEARCH_TAG_NAME, PeopleSearch)
}
