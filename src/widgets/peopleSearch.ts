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
 * Configurable options include a click handler for when a person is selected, otherwise it
 * opens their profile in the same window.
 *
 * Assumptions
 *   - Assumes that the user has a type index entry for vcard:AddressBook. @@ bad assuption
 *
 */
import { NamedNode } from 'rdflib'
import ContactsModuleRdfLib, { type AddressBook } from '@solid-data-modules/contacts-rdflib'
import * as debug from '../debug'
import { ns } from '..'

const PEOPLE_SEARCH_CONCURRENCY = 6
const CONTACT_CARD_CONCURRENCY = 8
const MAX_FOAF_DISTANCE = 3
const addressBookListCache = new Map<string, Promise<string[]>>()
const addressBookCache = new Map<string, Promise<AddressBook>>()
const contactWebIdCache = new Map<string, Promise<string | null>>()

type PersonEntry = {
  name: string,
  webId: string,
  relationshipLabel: 'Friend' | 'People' | 'Contact'
}

export const createPeopleSearch = function (dom, kb, me: NamedNode | null, onClickHandler?: (person: PersonEntry) => void) {
  const contactsModule = new ContactsModuleRdfLib({
    store: kb,
    fetcher: kb.fetcher,
    updater: kb.updater
  })

  // Add responsive styles for people search
  const styleId = 'people-search-styles'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
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
      @media (max-width: 600px) {
        .people-search-input,
        .people-search-dropdown {
          width: 80%;
        }
      }
    `
    document.head.appendChild(style)
  }

  const searchForm = dom.createElement('form')
  const searchInput = searchForm.appendChild(dom.createElement('input'))
  searchInput.type = 'text'
  searchInput.placeholder = 'Search for people...'
  searchInput.className = 'people-search-input'

  const searchDiv = searchForm.appendChild(dom.createElement('div'))
  searchDiv.className = 'people-search-dropdown'
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

    const discoveredPeople = new Map<string, PersonEntry>()
    const personRows = new Map<string, HTMLDivElement>()
    const status = searchDiv.appendChild(dom.createElement('p'))
    status.style.margin = '5px 0'
    status.style.color = '#666'

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
      const nameElement = personElement.appendChild(dom.createElement('div'))
      const labelElement = personElement.appendChild(dom.createElement('div'))

      nameElement.textContent = person.name
      labelElement.textContent = person.relationshipLabel

      personElement.title = person.webId
      personElement.style.cursor = 'pointer'
      personElement.style.margin = '5px 0'
      personElement.style.padding = '2px 4px'
      labelElement.style.fontSize = '0.75em'
      labelElement.style.color = '#666'

      personElement.addEventListener('click', function () {
        if (onClickHandler) {
          onClickHandler(person)
        } else {
          window.open(person.webId, '_blank')
        }
        searchDiv.style.display = 'none'
      })
      personElement.addEventListener('mouseover', function () {
        personElement.style.backgroundColor = '#f0f0f0'
      })
      personElement.addEventListener('mouseout', function () {
        personElement.style.backgroundColor = 'white'
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
    sortVisibleRows()
    return visibleCount
  }

  const updateRowVisibility = function (person: PersonEntry, query: string): boolean {
    const row = personRows.get(person.webId) || addPersonRow(person)
    const isVisible = matchesNameWords(person.name, query)
    row.style.display = isVisible ? 'block' : 'none'
    scheduleSortVisibleRows()
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

      const contacts = kb.each(current, ns.foaf('knows')) as NamedNode[]
      for (const contact of contacts) {
        const contactName = nameFor(contact)
        if (contact.value !== me.value && contactName && !emitted.has(contact.value)) {
          emitted.add(contact.value)
          await onPerson({
            name: contactName,
            webId: contact.value,
            relationshipLabel: depth === 0 ? 'Friend' : 'People'
          })
        }

        if (contact instanceof NamedNode && !visited.has(contact.value)) {
          visited.add(contact.value)
          nextContacts.push({ person: contact, depth: depth + 1 })
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
        const webIdNode = kb.any(contactNode, ns.vcard('url'), undefined, contactNode.doc())
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

  let activeSearchId = 0
  let discoveryStarted = false
  let discoveryPromise: Promise<void> | null = null

  const ensureDiscovery = function () {
    if (discoveryPromise) {
      return discoveryPromise
    }

    discoveryStarted = true
    status.textContent = 'Searching...'
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

      const results = await Promise.allSettled([contactsPromise, peoplePromise])
      if (results.every(result => result.status === 'rejected')) {
        throw new Error('Unable to load contacts.')
      }
    })()
      .catch(() => {
        status.textContent = 'Unable to load contacts.'
      })
      .finally(() => {
        discoveryStarted = false
        warmupHint.style.display = 'none'
        if (discoveredPeople.size === 0) {
          status.textContent = me ? 'No contacts found.' : 'Sign in to search contacts.'
        } else {
          status.textContent = ''
        }
      })

    return discoveryPromise
  }

  const runSearch = async function (query: string) {
    const searchId = ++activeSearchId
    searchDiv.style.display = 'block'

    const visibleCount = updateVisibleRows(query.trim())
    if (!me) {
      status.textContent = 'Sign in to search contacts.'
      return
    }

    if (!discoveryPromise) {
      void ensureDiscovery()
    }

    if (searchId !== activeSearchId) return

    if (visibleCount > 0) {
      status.textContent = discoveryStarted ? 'Searching...' : ''
      return
    }

    status.textContent = discoveryStarted
      ? 'Searching...'
      : 'No contacts match that name.'
  }

  const onInputHandler = function () {
    void runSearch(searchInput.value)
  }

  const onFocusHandler = function () {
    void runSearch(searchInput.value)
  }

  const onBlurHandler = function () {
    setTimeout(() => {
      searchDiv.style.display = 'none'
    }, 200)
  }

  searchInput.addEventListener('input', onInputHandler)
  searchInput.addEventListener('focus', onFocusHandler)
  searchInput.addEventListener('blur', onBlurHandler)

  searchForm.addEventListener('submit', function (event) {
    event.preventDefault()
    void runSearch(searchInput.value)
  })

  if (me) {
    void ensureDiscovery()
  }

  return searchForm
}

