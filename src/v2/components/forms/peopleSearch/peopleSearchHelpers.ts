import ContactsModuleRdfLib, { type AddressBook } from '@solid-data-modules/contacts-rdflib'
import { NamedNode, graph, parse, type LiveStore } from 'rdflib'
import * as debug from '../../../../debug'
import ns from '../../../../ns'

const PEOPLE_SEARCH_CONCURRENCY = 6
const CONTACT_CARD_CONCURRENCY = 8
const MAX_FOAF_DISTANCE = 3
const CATALOG_VOCAB = 'http://example.org#'

const addressBookListCache = new Map<string, Promise<string[]>>()
const addressBookCache = new Map<string, Promise<AddressBook>>()
const contactWebIdCache = new Map<string, Promise<string | null>>()

export const DEFAULT_CATALOG_URL = 'https://raw.githubusercontent.com/solid/catalog/refs/heads/main/catalog-data.ttl'

export type PeopleSearchRelationshipLabel = 'Friend' | 'People' | 'Contact'

export interface PeopleSearchPerson {
  name: string
  webId: string
  relationshipLabel: PeopleSearchRelationshipLabel
}

type DiscoverPeopleSearchEntriesArgs = {
  store: LiveStore
  me: NamedNode
  catalogUrl: string
  onPerson: (person: PeopleSearchPerson) => void | Promise<void>
}

const catalogTerm = function (localName: string): NamedNode {
  return new NamedNode(`${CATALOG_VOCAB}${localName}`)
}

export function tokenizePeopleSearchQuery (query: string): string[] {
  return query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean)
}

export function matchesPeopleSearchNameWords (name: string, query: string): boolean {
  const q = tokenizePeopleSearchQuery(query)
  if (q.length === 0) return true
  const nameWords = tokenizePeopleSearchQuery(name)
  return q.every((word) => nameWords.some((nameWord) => nameWord.includes(word)))
}

export function sortPeopleSearchPeople (people: Iterable<PeopleSearchPerson>): PeopleSearchPerson[] {
  return Array.from(people)
    .sort((left, right) => left.name.localeCompare(right.name, undefined, { sensitivity: 'base' }))
}

export function mergePeopleSearchPerson (
  discoveredPeople: Map<string, PeopleSearchPerson>,
  person: PeopleSearchPerson
): PeopleSearchPerson {
  const existing = discoveredPeople.get(person.webId)
  if (existing) {
    const merged = {
      ...existing,
      name: existing.name || person.name,
      relationshipLabel: bestLabel(existing.relationshipLabel, person.relationshipLabel)
    }
    discoveredPeople.set(person.webId, merged)
    return merged
  }

  discoveredPeople.set(person.webId, person)
  return person
}

export async function discoverPeopleSearchEntries (args: DiscoverPeopleSearchEntriesArgs): Promise<void> {
  const { store, me, catalogUrl, onPerson } = args

  const contactsPromise = discoverAddressBookContacts(store, me, onPerson)
  const peoplePromise = discoverFoafPeople(store, me, onPerson)
  const catalogPromise = discoverCatalogPeople(catalogUrl, onPerson)

  const results = await Promise.allSettled([contactsPromise, peoplePromise, catalogPromise])
  if (results.every((result) => result.status === 'rejected')) {
    throw new Error('Unable to load contacts.')
  }
}

function bestLabel (
  current: PeopleSearchRelationshipLabel | undefined,
  incoming: PeopleSearchRelationshipLabel
): PeopleSearchRelationshipLabel {
  if (current === 'Contact' || incoming === 'Contact') return 'Contact'
  if (current === 'Friend' || incoming === 'Friend') return 'Friend'
  return 'People'
}

function nameFor (store: LiveStore, person: NamedNode): string | null {
  const nameNode: { value: string } | null | undefined =
    store.any(person, ns.foaf('name')) || store.any(person, ns.vcard('fn'))
  return nameNode?.value || null
}

async function fetchCatalogPeople (catalogUrl: string): Promise<PeopleSearchPerson[]> {
  if (typeof fetch !== 'function') {
    return []
  }

  try {
    const response = await fetch(catalogUrl, {
      headers: { accept: 'text/turtle' }
    })

    if (!response.ok) {
      debug.warn(`[Catalog] Failed to fetch ${catalogUrl}: ${response.status}`)
      return []
    }

    const turtle = await response.text()
    const store = graph()
    parse(turtle, store, catalogUrl, 'text/turtle')

    const personType = catalogTerm('Person')
    const webIdPredicate = catalogTerm('webid')
    const namePredicate = catalogTerm('name')
    const catalogPeople = new Map<string, PeopleSearchPerson>()

    const personStatements = store.statementsMatching(undefined, ns.rdf('type'), personType)
    for (const statement of personStatements) {
      const subject = statement.subject
      const webIdNode = store.any(subject, webIdPredicate)
      if (!webIdNode || webIdNode.termType !== 'NamedNode') {
        continue
      }

      const webId = webIdNode.value
      const name = store.anyValue(subject, namePredicate)
      if (!webId || !name) {
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

async function discoverCatalogPeople (
  catalogUrl: string,
  onPerson: (person: PeopleSearchPerson) => void | Promise<void>
) {
  const catalogPeople = await fetchCatalogPeople(catalogUrl)
  for (const person of catalogPeople) {
    await onPerson(person)
  }
}

async function loadAddressBooks (store: LiveStore, me: NamedNode): Promise<string[]> {
  const cachedAddressBooks = addressBookListCache.get(me.value)
  if (cachedAddressBooks) {
    return cachedAddressBooks
  }

  const contactsModule = new ContactsModuleRdfLib({
    store,
    fetcher: store.fetcher,
    updater: store.updater
  })

  const addressBooksPromise = contactsModule.listAddressBooks(me.value)
    .then((addressBooks) => [...addressBooks.publicUris, ...addressBooks.privateUris])
    .catch((error) => {
      addressBookListCache.delete(me.value)
      throw error
    })

  addressBookListCache.set(me.value, addressBooksPromise)
  return addressBooksPromise
}

async function webIdForAddressBookContact (store: LiveStore, contactUri: string): Promise<string | null> {
  const cachedWebId = contactWebIdCache.get(contactUri)
  if (cachedWebId) {
    return cachedWebId
  }

  const contactNode = new NamedNode(contactUri)
  const webIdPromise = store.fetcher.load(contactNode.doc())
    .then(() => {
      const webIdNode = store.any(contactNode, ns.vcard('url'), undefined, contactNode.doc()) as NamedNode | null
      if (!webIdNode) return null

      return store.anyValue(webIdNode, ns.vcard('value'), undefined, contactNode.doc()) || null
    })
    .catch(() => null)

  contactWebIdCache.set(contactUri, webIdPromise)
  return webIdPromise
}

async function readAddressBookCached (store: LiveStore, addressBookUri: string): Promise<AddressBook> {
  const cachedAddressBook = addressBookCache.get(addressBookUri)
  if (cachedAddressBook) {
    return cachedAddressBook
  }

  const contactsModule = new ContactsModuleRdfLib({
    store,
    fetcher: store.fetcher,
    updater: store.updater
  })

  const addressBookPromise = contactsModule.readAddressBook(addressBookUri)
    .catch((error) => {
      addressBookCache.delete(addressBookUri)
      throw error
    })

  addressBookCache.set(addressBookUri, addressBookPromise)
  return addressBookPromise
}

async function discoverAddressBookContacts (
  store: LiveStore,
  me: NamedNode,
  onPerson: (person: PeopleSearchPerson) => void | Promise<void>
) {
  const addressBooks = await loadAddressBooks(store, me)

  for (const book of addressBooks) {
    let addressBook: AddressBook

    try {
      addressBook = await readAddressBookCached(store, book)
    } catch (_error) {
      continue
    }

    for (let index = 0; index < addressBook.contacts.length; index += CONTACT_CARD_CONCURRENCY) {
      const batch = addressBook.contacts.slice(index, index + CONTACT_CARD_CONCURRENCY)
      const people = await Promise.all(batch.map(async (contact) => {
        const contactWebId = await webIdForAddressBookContact(store, contact.uri)
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

async function discoverFoafPeople (
  store: LiveStore,
  me: NamedNode,
  onPerson: (person: PeopleSearchPerson) => void | Promise<void>
) {
  const visited = new Set<string>()
  const emitted = new Set<string>()
  const loadedDocs = new Set<string>()
  let queue: Array<{ person: NamedNode, depth: number }> = [{ person: me, depth: 0 }]
  visited.add(me.value)

  const processPerson = async (
    currentEntry: { person: NamedNode, depth: number }
  ): Promise<Array<{ person: NamedNode, depth: number }>> => {
    const { person: current, depth } = currentEntry
    const currentDoc = current.doc().value
    if (!loadedDocs.has(currentDoc)) {
      loadedDocs.add(currentDoc)
      try {
        await store.fetcher.load(current.doc())
      } catch (_error) {}
    }

    if (current.value !== me.value) {
      const personName = nameFor(store, current)
      if (personName && !emitted.has(current.value)) {
        emitted.add(current.value)
        await onPerson({
          name: personName,
          webId: current.value,
          relationshipLabel: depth === 1 ? 'Friend' : 'People'
        })
      }
    }

    const nextContacts: Array<{ person: NamedNode, depth: number }> = []
    if (depth >= MAX_FOAF_DISTANCE) {
      return nextContacts
    }

    const contacts = store.each(current, ns.foaf('knows'))
    for (const contact of contacts) {
      if (contact.termType !== 'NamedNode') {
        continue
      }
      const namedContact = contact as NamedNode
      const contactName = nameFor(store, namedContact)
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
