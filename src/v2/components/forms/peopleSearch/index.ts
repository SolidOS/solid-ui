import { PeopleSearch } from './PeopleSearch'

export { PeopleSearch }
export type {
  PeopleSearchSelectDetail,
  PeopleSearchSuggestion
} from './PeopleSearch'
export type {
  PeopleSearchPerson,
  PeopleSearchRelationshipLabel
} from './peopleSearchHelpers'
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
