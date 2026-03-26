/**
 *
 * People Search Widget
 *
 * This widget offers a mechanism for selecting a set of individuals to take some action on. 
 * It discovers people from the user's FOAF profile (predicate: foaf:knows (friends)) and 
 * linked profiles, as well as from their address books, and allows searching through them by name.
 * It currently traverses the FOAF graph up to 3 degrees of separation (friends of friends of friends) 
 * to find people, and also loads contacts from any linked address books. The search is performed 
 * client-side on the discovered set of people, allowing for fast filtering as the user types.
 * Below the name of each person, a label indicates whether they are a direct friend, a contact 
 * from an address book, or just a person discovered through the FOAF graph. Contacts take precedence 
 * over friends, and friends take precedence over people when determining the label.
 * Configurable options include a click handler for when a person is selected; otherwise, it
 * opens their profile in a new tab or window.
 *
 * Assumptions
 *   - Assumes that the user has a type index entry for vcard:AddressBook. If this assumption is not met, no address book contacts will be discovered.
 *
 */
import { NamedNode, graph, parse, type LiveStore } from 'rdflib'
import ContactsModuleRdfLib, { type AddressBook } from '@solid-data-modules/contacts-rdflib'
import * as debug from '../debug'
import { ns } from '..'

const PEOPLE_SEARCH_CONCURRENCY = 6
const CONTACT_CARD_CONCURRENCY = 8
const MAX_FOAF_DISTANCE = 3
const CATALOG_URL = 'https://raw.githubusercontent.com/solid/catalog/refs/heads/main/catalog-data.ttl'
const CATALOG_VOCAB = 'http://example.org#'
let peopleSearchInstanceCounter = 0
const addressBookListCache = new Map<string, Promise<string[]>>()
const addressBookCache = new Map<string, Promise<AddressBook>>()
const contactWebIdCache = new Map<string, Promise<string | null>>()

type PersonEntry = {
  name: string,
  webId: string,
  relationshipLabel: 'Friend' | 'People' | 'Contact'
}

const catalogTerm = function (localName: string): NamedNode {
  return new NamedNode(`${CATALOG_VOCAB}${localName}`)
}

const fetchCatalogPeople = async function (): Promise<PersonEntry[]> {
  if (typeof fetch !== 'function') {
    return []
  }

  try {
    const response = await fetch(CATALOG_URL, {
      headers: {
        accept: 'text/turtle'
      }
    })

    if (!response.ok) {
      debug.warn(`[Catalog] Failed to fetch ${CATALOG_URL}: ${response.status}`)
      return []
    }

    const turtle = await response.text()
    const store = graph()
    parse(turtle, store, CATALOG_URL, 'text/turtle')

    const personType = catalogTerm('Person')
    const webIdPredicate = catalogTerm('webid')
    const namePredicate = catalogTerm('name')
    const catalogPeople = new Map<string, PersonEntry>()

    const personStatements = store.statementsMatching(undefined, ns.rdf('type'), personType)
    for (const statement of personStatements) {
      const subject = statement.subject
      const webIdNode = store.any(subject, webIdPredicate)
      if (!webIdNode || webIdNode.termType !== 'NamedNode') {
        continue
      }

      const webId = webIdNode.value
      if (!webId) {
        continue
      }

      const name = store.anyValue(subject, namePredicate)
      if (!name) {
        continue
      }

      catalogPeople.set(webId, {
        name,
        webId,
        relationshipLabel: 'People'
      })
    }

    return Array.from(catalogPeople.values())
  } catch (error) {
    debug.warn('[Catalog] Error fetching people from catalog:', error)
    return []
  }
}

export const createPeopleSearch = function (
  dom: HTMLDocument,
  kb: LiveStore,
  me: NamedNode | null,
  onClickHandler?: (person: PersonEntry) => void
): HTMLFormElement {
  peopleSearchInstanceCounter += 1
  const instanceId = `people-search-${peopleSearchInstanceCounter}`
  const inputId = `${instanceId}-input`
  const labelId = `${instanceId}-label`
  const listboxId = `${instanceId}-listbox`

  const contactsModule = new ContactsModuleRdfLib({
    store: kb,
    fetcher: kb.fetcher,
    updater: kb.updater
  })

  // Add responsive styles for people search
  const styleId = 'people-search-styles'
  if (!dom.getElementById(styleId)) {
    const style = dom.createElement('style')
    style.id = styleId
    style.textContent = `
      .people-search-input {
        padding: 10px;
        font-size: 16px;
        box-sizing: border-box;
        width: max(28%, 280px);
        max-width: 80%;
      }
      .people-search-dropdown {
        width: max(28%, 280px);
        max-width: 80%;
      }
      .people-search-sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
      @media (max-width: 600px) {
        .people-search-input,
        .people-search-dropdown {
          width: 80%;
        }
      }
    `
    const styleContainer = dom.head || dom.documentElement || dom.body
    styleContainer?.appendChild(style)
  }

  const searchForm = dom.createElement('form')
  const searchLabel = searchForm.appendChild(dom.createElement('label'))
  searchLabel.id = labelId
  searchLabel.htmlFor = inputId
  searchLabel.className = 'people-search-sr-only'
  searchLabel.textContent = 'Search for people'

  const searchInput = searchForm.appendChild(dom.createElement('input'))
  searchInput.id = inputId
  searchInput.type = 'text'
  searchInput.placeholder = 'Search for people...'
  searchInput.className = 'people-search-input'
  searchInput.setAttribute('role', 'combobox')
  searchInput.setAttribute('aria-autocomplete', 'list')
  searchInput.setAttribute('aria-haspopup', 'listbox')
  searchInput.setAttribute('aria-expanded', 'false')
  searchInput.setAttribute('aria-labelledby', labelId)
  searchInput.setAttribute('aria-controls', listboxId)

  const searchDiv = searchForm.appendChild(dom.createElement('div'))
  searchDiv.id = listboxId
  searchDiv.className = 'people-search-dropdown'
  searchDiv.setAttribute('role', 'listbox')
  searchDiv.setAttribute('aria-label', 'People search results')
  searchDiv.style.display = 'none'
  searchDiv.style.border = '1px solid #ccc'
  searchDiv.style.marginTop = '5px'
  searchDiv.style.padding = '5px'
  searchDiv.style.boxSizing = 'border-box'
  searchDiv.style.maxHeight = '15em'
  searchDiv.style.overflowY = 'auto'

  const warmupHint = searchForm.appendChild(dom.createElement('div'))
  warmupHint.style.display = 'none'
  warmupHint.style.marginTop = '5px'
  warmupHint.style.fontSize = '0.85em'
  warmupHint.style.color = '#666'
  warmupHint.textContent = 'Warming up contacts…'

  const liveStatus = searchForm.appendChild(dom.createElement('div'))
  liveStatus.className = 'people-search-sr-only'
  liveStatus.setAttribute('role', 'status')
  liveStatus.setAttribute('aria-live', 'polite')

    const discoveredPeople = new Map<string, PersonEntry>()
    const personRows = new Map<string, HTMLDivElement>()
    const status = searchDiv.appendChild(dom.createElement('p'))
    status.style.margin = '5px 0'
    status.style.color = '#666'

  const setStatusText = function (text: string) {
    status.textContent = text
    liveStatus.textContent = text
  }

    let activeRow: HTMLDivElement | null = null

    const setDropdownOpen = function (isOpen: boolean) {
      searchDiv.style.display = isOpen ? 'block' : 'none'
      searchInput.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
    }

    const getVisibleRows = function (): HTMLDivElement[] {
      return Array.from(personRows.values()).filter(row => row.style.display !== 'none')
    }

    const setActiveRow = function (row: HTMLDivElement | null) {
      if (activeRow) {
        activeRow.style.backgroundColor = 'white'
        activeRow.setAttribute('aria-selected', 'false')
      }

      activeRow = row

      if (activeRow) {
        activeRow.style.backgroundColor = '#f0f0f0'
        activeRow.setAttribute('aria-selected', 'true')
        if (typeof activeRow.scrollIntoView === 'function') {
          activeRow.scrollIntoView({ block: 'nearest' })
        }
        if (activeRow.id) {
          searchInput.setAttribute('aria-activedescendant', activeRow.id)
        }
      } else {
        searchInput.removeAttribute('aria-activedescendant')
      }
    }

    const ensureActiveRowIsVisible = function () {
      if (!activeRow) return
      if (activeRow.style.display === 'none') {
        setActiveRow(null)
      }
    }

    const selectPerson = function (person: PersonEntry) {
      if (onClickHandler) {
        onClickHandler(person)
      } else {
        const newWindow = window.open(person.webId, '_blank', 'noopener,noreferrer')
        if (newWindow) {
          newWindow.opener = null
        }
      }
      setActiveRow(null)
      setDropdownOpen(false)
    }

    const addPersonRow = function (person: PersonEntry) {
      const existingRow = personRows.get(person.webId)
      if (existingRow) {
        const nameElement = existingRow.firstChild as HTMLDivElement | null
        const labelElement = existingRow.lastChild as HTMLDivElement | null
        if (nameElement) {
          nameElement.textContent = person.name
        }
        if (labelElement) {
          labelElement.textContent = person.relationshipLabel
        }
        existingRow.title = person.webId
        return existingRow
      }

      const personElement = dom.createElement('div')
      const optionIdSafeWebId = person.webId.replace(/[^a-zA-Z0-9_-]/g, '_')
      const nameElement = personElement.appendChild(dom.createElement('div'))
      const labelElement = personElement.appendChild(dom.createElement('div'))

      nameElement.textContent = person.name
      labelElement.textContent = person.relationshipLabel

      personElement.title = person.webId
      personElement.id = `${instanceId}-option-${optionIdSafeWebId}`
      personElement.setAttribute('role', 'option')
      personElement.setAttribute('aria-selected', 'false')
      personElement.style.cursor = 'pointer'
      personElement.style.margin = '5px 0'
      personElement.style.padding = '2px 4px'
      labelElement.style.fontSize = '0.75em'
      labelElement.style.color = '#666'

      personElement.addEventListener('click', function () {
        selectPerson(person)
      })
      personElement.addEventListener('mouseover', function () {
        setActiveRow(personElement)
      })
      personElement.addEventListener('mouseout', function () {
        if (activeRow !== personElement) {
          personElement.style.backgroundColor = 'white'
        }
      })
      searchDiv.appendChild(personElement)
      personRows.set(person.webId, personElement)
      return personElement
  }

  const sortVisibleRows = function () {
    const visiblePeople = Array.from(discoveredPeople.values())
      .filter(person => {
        const row = personRows.get(person.webId)
        return row && row.style.display !== 'none'
      })
      .sort((left, right) => left.name.localeCompare(right.name, undefined, { sensitivity: 'base' }))

    visiblePeople.forEach(person => {
      const row = personRows.get(person.webId)
      if (row) {
        searchDiv.appendChild(row)
      }
    })
  }

  let sortQueued = false
  const scheduleSortVisibleRows = function () {
    if (sortQueued) return
    sortQueued = true

    const flushSort = function () {
      sortQueued = false
      sortVisibleRows()
    }

    if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(flushSort)
      return
    }

    setTimeout(flushSort, 0)
  }

  const updateVisibleRows = function (query: string): number {
    let visibleCount = 0
    for (const [webId, person] of discoveredPeople.entries()) {
      const row = personRows.get(webId) || addPersonRow(person)
      const isVisible = matchesNameWords(person.name, query)
      row.style.display = isVisible ? 'block' : 'none'
      if (isVisible) {
        visibleCount += 1
      }
    }
    scheduleSortVisibleRows()
    ensureActiveRowIsVisible()
    return visibleCount
  }

  const updateRowVisibility = function (person: PersonEntry, query: string): boolean {
    const row = personRows.get(person.webId) || addPersonRow(person)
    const isVisible = matchesNameWords(person.name, query)
    row.style.display = isVisible ? 'block' : 'none'
    scheduleSortVisibleRows()
    ensureActiveRowIsVisible()
    return isVisible
  }

  const tokenize = function (query: string): string[] {
    return query
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean)
  }

  const matchesNameWords = function (name: string, query: string): boolean {
    const q = tokenize(query)
    if (q.length === 0) return true
    const nameWords = tokenize(name)
    return q.every(word => nameWords.some(nameWord => nameWord.includes(word)))
  }

  const nameFor = function (person: NamedNode): string | null {
    const nameNode: { value: string } | null | undefined =
      kb.any(person, ns.foaf('name')) || kb.any(person, ns.vcard('fn'))
    return nameNode?.value || null
  }

  const bestLabel = function (
    current: PersonEntry['relationshipLabel'] | undefined,
    incoming: PersonEntry['relationshipLabel']
  ): PersonEntry['relationshipLabel'] {
    if (current === 'Contact' || incoming === 'Contact') return 'Contact'
    if (current === 'Friend' || incoming === 'Friend') return 'Friend'
    return 'People'
  }

  const mergePerson = function (person: PersonEntry) {
    const existing = discoveredPeople.get(person.webId)
    if (existing) {
      discoveredPeople.set(person.webId, {
        ...existing,
        name: existing.name || person.name,
        relationshipLabel: bestLabel(existing.relationshipLabel, person.relationshipLabel)
      })
      return discoveredPeople.get(person.webId)!
    }
    discoveredPeople.set(person.webId, person)
    return person
  }

  const discoverPeople = async function (onPerson: (person: PersonEntry) => void | Promise<void>) {
    if (!me || !kb) return

    const visited = new Set<string>()
    const emitted = new Set<string>()
    const loadedDocs = new Set<string>()
    let queue: Array<{ person: NamedNode, depth: number }> = [{ person: me, depth: 0 }]
    visited.add(me.value)

    const processPerson = async function (
      currentEntry: { person: NamedNode, depth: number }
    ): Promise<Array<{ person: NamedNode, depth: number }>> {
      const { person: current, depth } = currentEntry
      const currentDoc = current.doc().value
      if (!loadedDocs.has(currentDoc)) {
        loadedDocs.add(currentDoc)
        try {
          await kb.fetcher.load(current.doc())
        } catch (_e) { /* skip inaccessible profiles */ }
      }

      if (current.value !== me.value) {
        const personName = nameFor(current)
        if (personName && !emitted.has(current.value)) {
          emitted.add(current.value)
          const person: PersonEntry = {
            name: personName,
            webId: current.value,
            relationshipLabel: depth === 1 ? 'Friend' : 'People'
          }
          await onPerson(person)
        }
      }

      const nextContacts: Array<{ person: NamedNode, depth: number }> = []
      if (depth >= MAX_FOAF_DISTANCE) {
        return nextContacts
      }

      const contacts = kb.each(current, ns.foaf('knows'))
      for (const contact of contacts) {
        if (contact.termType !== 'NamedNode') {
          continue
        }
        const namedContact = contact as NamedNode
        const contactName = nameFor(namedContact)
        if (namedContact.value !== me.value && contactName && !emitted.has(namedContact.value)) {
          emitted.add(namedContact.value)
          await onPerson({
            name: contactName,
            webId: namedContact.value,
            relationshipLabel: depth === 0 ? 'Friend' : 'People'
          })
        }

        if (!visited.has(namedContact.value)) {
          visited.add(namedContact.value)
          nextContacts.push({ person: namedContact, depth: depth + 1 })
        }
      }

      return nextContacts
    }

    while (queue.length > 0) {
      const nextQueue: Array<{ person: NamedNode, depth: number }> = []

      for (let index = 0; index < queue.length; index += PEOPLE_SEARCH_CONCURRENCY) {
        const batch = queue.slice(index, index + PEOPLE_SEARCH_CONCURRENCY)
        const batchContacts = await Promise.all(batch.map(processPerson))
        for (const contacts of batchContacts) {
          nextQueue.push(...contacts)
        }
      }

      queue = nextQueue
    }
  }

  const loadAddressBooks = async function (): Promise<string[]> {
    if (!me || !kb) return []

    const cachedAddressBooks = addressBookListCache.get(me.value)
    if (cachedAddressBooks) {
      return cachedAddressBooks
    }

    const addressBooksPromise = contactsModule.listAddressBooks(me.value)
      .then(addressBooks => [...addressBooks.publicUris, ...addressBooks.privateUris])
      .catch(error => {
        addressBookListCache.delete(me.value)
        throw error
      })

    addressBookListCache.set(me.value, addressBooksPromise)
    return addressBooksPromise
  }

  const webIdForAddressBookContact = async function (contactUri: string): Promise<string | null> {
    const cachedWebId = contactWebIdCache.get(contactUri)
    if (cachedWebId) {
      return cachedWebId
    }

    const contactNode = new NamedNode(contactUri)
    const webIdPromise = kb.fetcher.load(contactNode.doc())
      .then(function () {
        const webIdNode = kb.any(contactNode, ns.vcard('url'), undefined, contactNode.doc()) as NamedNode | null
        if (!webIdNode) return null

        return kb.anyValue(webIdNode, ns.vcard('value'), undefined, contactNode.doc()) || null
      })
      .catch(function () {
        return null
      })

    contactWebIdCache.set(contactUri, webIdPromise)
    return webIdPromise
  }

  const readAddressBookCached = async function (addressBookUri: string): Promise<AddressBook> {
    const cachedAddressBook = addressBookCache.get(addressBookUri)
    if (cachedAddressBook) {
      return cachedAddressBook
    }

    const addressBookPromise = contactsModule.readAddressBook(addressBookUri)
      .catch(error => {
        addressBookCache.delete(addressBookUri)
        throw error
      })

    addressBookCache.set(addressBookUri, addressBookPromise)
    return addressBookPromise
  }

  const discoverAddressBookContacts = async function (
    onPerson: (person: PersonEntry) => void | Promise<void>
  ) {
    if (!me || !kb) return

    const addressBooks = await loadAddressBooks()
    
    for (const book of addressBooks) {
      let addressBook: AddressBook

      try {
        addressBook = await readAddressBookCached(book)
      } catch (_e) {
        continue
      }

      for (let index = 0; index < addressBook.contacts.length; index += CONTACT_CARD_CONCURRENCY) {
        const batch = addressBook.contacts.slice(index, index + CONTACT_CARD_CONCURRENCY)
        const people = await Promise.all(batch.map(async function (contact) {
          const contactWebId = await webIdForAddressBookContact(contact.uri)
          if (!contactWebId) {
            return null
          }

          return {
            name: contact.name,
            webId: contactWebId,
            relationshipLabel: 'Contact' as const
          }
        }))

        for (const person of people) {
          if (!person) continue
          await onPerson(person)
        }
      }
    }
  }

  const discoverCatalogPeople = async function (
    onPerson: (person: PersonEntry) => void | Promise<void>
  ) {
    const catalogPeople = await fetchCatalogPeople()
    for (const person of catalogPeople) {
      await onPerson(person)
    }
  }

  let activeSearchId = 0
  let discoveryStarted = false
  let discoveryPromise: Promise<void> | null = null

  const ensureDiscovery = function () {
    if (discoveryPromise) {
      return discoveryPromise
    }

    discoveryStarted = true
    searchDiv.setAttribute('aria-busy', 'true')
    setStatusText('Searching...')
    warmupHint.style.display = 'block'

    discoveryPromise = (async function () {
      const renderPerson = function (person: PersonEntry) {
        try {
          const merged = mergePerson(person)
          addPersonRow(merged)
          updateRowVisibility(merged, searchInput.value.trim())
        } catch (error) {
          debug.error('[FOAF] Error rendering person:', error, person)
        }
      }

      const contactsPromise = discoverAddressBookContacts(function (person) {
        try {
          renderPerson(person)
        } catch (error) {
          debug.error('[Discovery] Error in contacts callback:', error)
        }
      })

      const peoplePromise = discoverPeople(function (person) {
        try {
          renderPerson(person)
        } catch (error) {
          debug.error('[Discovery] Error in people callback:', error)
        }
      })

      const catalogPromise = discoverCatalogPeople(function (person) {
        try {
          renderPerson(person)
        } catch (error) {
          debug.error('[Discovery] Error in catalog callback:', error)
        }
      })

      const results = await Promise.allSettled([contactsPromise, peoplePromise, catalogPromise])
      if (results.every(result => result.status === 'rejected')) {
        throw new Error('Unable to load contacts.')
      }
    })()
      .catch(() => {
        setStatusText('Unable to load contacts.')
      })
      .finally(() => {
        discoveryStarted = false
        searchDiv.setAttribute('aria-busy', 'false')
        warmupHint.style.display = 'none'
        if (discoveredPeople.size === 0) {
          setStatusText(me ? 'No contacts found.' : 'Sign in to search contacts.')
        } else {
          setStatusText('')
        }
      })

    return discoveryPromise
  }

  const runSearch = async function (query: string) {
    const searchId = ++activeSearchId
    setDropdownOpen(true)

    const visibleCount = updateVisibleRows(query.trim())
    if (!me) {
      setStatusText('Sign in to search contacts.')
      return
    }

    if (!discoveryPromise) {
      void ensureDiscovery()
    }

    if (searchId !== activeSearchId) return

    if (visibleCount > 0) {
      setStatusText(discoveryStarted ? 'Searching...' : '')
      return
    }

    setStatusText(discoveryStarted
      ? 'Searching...'
      : 'No contacts match that name.')
  }

  let inputSearchQueued = false
  const onInputHandler = function () {
    if (inputSearchQueued) {
      return
    }
    inputSearchQueued = true

    const flushInputSearch = function () {
      inputSearchQueued = false
      void runSearch(searchInput.value)
    }
    setTimeout(flushInputSearch, 0)
  }

  const onFocusHandler = function () {
    void runSearch(searchInput.value)
  }

  const onBlurHandler = function () {
    setTimeout(() => {
      setActiveRow(null)
      setDropdownOpen(false)
    }, 200)
  }

  const onKeyDownHandler = function (event: KeyboardEvent) {
    const visibleRows = getVisibleRows()

    if (event.key === 'Tab') {
      setActiveRow(null)
      setDropdownOpen(false)
      return
    }

    if (event.key === 'Escape') {
      setActiveRow(null)
      setDropdownOpen(false)
      return
    }

    if (event.key === 'Home' || event.key === 'End') {
      if (visibleRows.length === 0) {
        return
      }
      event.preventDefault()
      if (searchDiv.style.display === 'none') {
        setDropdownOpen(true)
      }
      const targetIndex = event.key === 'Home' ? 0 : visibleRows.length - 1
      setActiveRow(visibleRows[targetIndex])
      return
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (searchDiv.style.display === 'none') {
        setDropdownOpen(true)
      }
      if (visibleRows.length === 0) {
        return
      }
      const currentIndex = activeRow ? visibleRows.indexOf(activeRow) : -1
      const nextIndex = event.key === 'ArrowDown'
        ? Math.min(currentIndex + 1, visibleRows.length - 1)
        : (currentIndex <= 0 ? visibleRows.length - 1 : currentIndex - 1)
      setActiveRow(visibleRows[nextIndex])
      return
    }

    if (event.key === 'Enter' && activeRow) {
      event.preventDefault()
      const selectedPerson = discoveredPeople.get(activeRow.title)
      if (selectedPerson) {
        selectPerson(selectedPerson)
      }
    }
  }

  searchInput.addEventListener('input', onInputHandler)
  searchInput.addEventListener('focus', onFocusHandler)
  searchInput.addEventListener('blur', onBlurHandler)
  searchInput.addEventListener('keydown', onKeyDownHandler)

  searchForm.addEventListener('submit', function (event) {
    event.preventDefault()
    void runSearch(searchInput.value)
  })

  if (me) {
    void ensureDiscovery()
  }

  return searchForm
}

