import { NamedNode } from 'rdflib'
import { silenceDebugMessages } from '../helpers/debugger'
import { createPeopleSearch } from '../../../src/widgets/peopleSearch'

const mockListAddressBooks = jest.fn()
const mockReadAddressBook = jest.fn()
let bookCounter = 0
let fetchMock: jest.Mock

jest.mock('@solid-data-modules/contacts-rdflib', () => ({
  __esModule: true,
  default: class ContactsModuleRdfLib {
    listAddressBooks = mockListAddressBooks
    readAddressBook = mockReadAddressBook
  }
}))

silenceDebugMessages()

const flushAsyncWork = async function () {
  await Promise.resolve()
  await new Promise(resolve => setTimeout(resolve, 0))
  await Promise.resolve()
}

const flushDiscovery = async function () {
  await flushAsyncWork()
  await flushAsyncWork()
  await flushAsyncWork()
}

type KbOptions = {
  namesByWebId?: Record<string, string>
  contactWebIdsByCardUri?: Record<string, string | null>
  knowsByWebId?: Record<string, Array<unknown>>
}

const makeKb = function (options: KbOptions = {}) {
  const namesByWebId = options.namesByWebId || {}
  const contactWebIdsByCardUri = options.contactWebIdsByCardUri || {
    'https://pod.example/contacts/1#this': 'https://alice.example/profile/card#me'
  }
  const knowsByWebId = options.knowsByWebId || {}

  return {
    fetcher: {
      load: jest.fn().mockResolvedValue(undefined)
    },
    updater: {},
    any: jest.fn((subject, predicate) => {
      const subjectValue = subject?.value
      const predicateValue = predicate?.value || ''

      if (!subjectValue) {
        return null
      }

      if (predicateValue.includes('foaf/0.1/name') || predicateValue.endsWith('#name')) {
        const personName = namesByWebId[subjectValue]
        return personName ? { value: personName } : null
      }

      if (predicateValue.includes('/2006/vcard/ns#fn')) {
        const personName = namesByWebId[subjectValue]
        return personName ? { value: personName } : null
      }

      if (predicateValue.includes('/2006/vcard/ns#url') && subjectValue in contactWebIdsByCardUri) {
        return new NamedNode(subjectValue + '-url')
      }

      return null
    }),
    anyValue: jest.fn((subject, predicate) => {
      const subjectValue = subject?.value
      const predicateValue = predicate?.value || ''

      if (!subjectValue || !predicateValue.includes('/2006/vcard/ns#value')) {
        return null
      }

      if (!subjectValue.endsWith('-url')) {
        return null
      }

      const cardUri = subjectValue.slice(0, -4)
      return contactWebIdsByCardUri[cardUri] || null
    }),
    each: jest.fn((subject, predicate) => {
      const subjectValue = subject?.value
      const predicateValue = predicate?.value || ''

      if (!subjectValue || !predicateValue.includes('foaf/0.1/knows')) {
        return []
      }

      return knowsByWebId[subjectValue] || []
    })
  }
}

const openDropdown = async function (form: HTMLFormElement) {
  const input = form.querySelector('input') as HTMLInputElement
  input.dispatchEvent(new Event('focus'))
  await flushDiscovery()
}

const setSearchQuery = async function (form: HTMLFormElement, query: string) {
  const input = form.querySelector('input') as HTMLInputElement
  input.value = query
  input.dispatchEvent(new Event('input'))
  await flushDiscovery()
}

const keyDown = function (element: HTMLElement, key: string) {
  element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))
}

const rowFor = function (form: HTMLFormElement, webId: string) {
  return form.querySelector(`div[title="${webId}"]`) as HTMLDivElement | null
}

const rowLabel = function (row: HTMLDivElement | null) {
  if (!row) return null
  return (row.lastElementChild as HTMLDivElement | null)?.textContent || null
}

describe('createPeopleSearch', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    jest.clearAllMocks()
    fetchMock = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      text: jest.fn().mockResolvedValue('')
    })
    ;(globalThis as any).fetch = fetchMock
    bookCounter += 1
    const defaultBookUri = `https://pod.example/address-book-${bookCounter}.ttl`

    mockListAddressBooks.mockResolvedValue({
      publicUris: [defaultBookUri],
      privateUris: []
    })

    mockReadAddressBook.mockResolvedValue({
      contacts: [
        {
          uri: 'https://pod.example/contacts/1#this',
          name: 'Alice Example'
        }
      ]
    })
  })

  it('renders a search input and hidden dropdown', () => {
    const kb = makeKb()
    const me = new NamedNode('https://user-1.example/profile/card#me')

    const form = createPeopleSearch(document, kb as any, me)
    document.body.appendChild(form)

    const input = form.querySelector('input') as HTMLInputElement | null
    const dropdown = form.querySelector('.people-search-dropdown') as HTMLDivElement | null

    expect(input).not.toBeNull()
    expect(input?.placeholder).toBe('Search for people...')
    expect(dropdown).not.toBeNull()
    expect(dropdown?.style.display).toBe('none')
  })

  it('uses onClickHandler when provided and hides dropdown', async () => {
    const kb = makeKb()
    const me = new NamedNode('https://user-2.example/profile/card#me')
    const onClickHandler = jest.fn()
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null)

    const form = createPeopleSearch(document, kb as any, me, onClickHandler)
    document.body.appendChild(form)

    await flushDiscovery()

    const dropdown = form.querySelector('.people-search-dropdown') as HTMLDivElement

    await openDropdown(form)

    const personRow = rowFor(form, 'https://alice.example/profile/card#me')
    expect(personRow).not.toBeNull()

    personRow?.dispatchEvent(new Event('click'))

    expect(onClickHandler).toHaveBeenCalledTimes(1)
    expect(onClickHandler).toHaveBeenCalledWith({
      name: 'Alice Example',
      webId: 'https://alice.example/profile/card#me',
      relationshipLabel: 'Contact'
    })
    expect(openSpy).not.toHaveBeenCalled()
    expect(dropdown.style.display).toBe('none')

    openSpy.mockRestore()
  })

  it('falls back to opening webId when onClickHandler is not provided', async () => {
    const kb = makeKb()
    const me = new NamedNode('https://user-3.example/profile/card#me')
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null)

    const form = createPeopleSearch(document, kb as any, me)
    document.body.appendChild(form)

    await flushDiscovery()

    const dropdown = form.querySelector('.people-search-dropdown') as HTMLDivElement

    await openDropdown(form)

    const personRow = rowFor(form, 'https://alice.example/profile/card#me')
    expect(personRow).not.toBeNull()

    personRow?.dispatchEvent(new Event('click'))

    expect(openSpy).toHaveBeenCalledTimes(1)
    expect(openSpy).toHaveBeenCalledWith('https://alice.example/profile/card#me', '_blank', 'noopener,noreferrer')
    expect(dropdown.style.display).toBe('none')

    openSpy.mockRestore()
  })

  it('shows sign-in message when me is null', async () => {
    const kb = makeKb()

    const form = createPeopleSearch(document, kb as any, null)
    document.body.appendChild(form)

    const dropdown = form.querySelector('.people-search-dropdown') as HTMLDivElement

    await openDropdown(form)

    expect(dropdown.style.display).toBe('block')
    expect(dropdown.textContent).toContain('Sign in to search contacts.')
  })

  it('applies combobox/listbox accessibility attributes', async () => {
    const kb = makeKb()
    const me = new NamedNode('https://user-8.example/profile/card#me')

    const form = createPeopleSearch(document, kb as any, me)
    document.body.appendChild(form)

    const input = form.querySelector('input') as HTMLInputElement
    const label = form.querySelector('label') as HTMLLabelElement
    const dropdown = form.querySelector('.people-search-dropdown') as HTMLDivElement
    const liveRegion = form.querySelector('div[role="status"]') as HTMLDivElement

    expect(label).not.toBeNull()
    expect(label.textContent).toBe('Search for people')
    expect(input.getAttribute('role')).toBe('combobox')
    expect(input.getAttribute('aria-autocomplete')).toBe('list')
    expect(input.getAttribute('aria-haspopup')).toBe('listbox')
    expect(input.getAttribute('aria-labelledby')).toBe(label.id)
    expect(input.getAttribute('aria-controls')).toBe(dropdown.id)
    expect(input.getAttribute('aria-expanded')).toBe('false')
    expect(liveRegion).not.toBeNull()
    expect(typeof liveRegion.textContent).toBe('string')

    await openDropdown(form)

    const personRow = rowFor(form, 'https://alice.example/profile/card#me')
    expect(dropdown.getAttribute('role')).toBe('listbox')
    expect(dropdown.getAttribute('aria-busy')).toBe('false')
    expect(input.getAttribute('aria-expanded')).toBe('true')
    expect(personRow?.getAttribute('role')).toBe('option')
    expect(personRow?.id).toContain('-option-')
  })

  it('supports keyboard navigation and selection from the input', async () => {
    mockReadAddressBook.mockResolvedValue({
      contacts: [
        {
          uri: 'https://pod.example/contacts/1#this',
          name: 'Alice Example'
        },
        {
          uri: 'https://pod.example/contacts/2#this',
          name: 'Bob Stone'
        }
      ]
    })

    const kb = makeKb({
      contactWebIdsByCardUri: {
        'https://pod.example/contacts/1#this': 'https://alice.example/profile/card#me',
        'https://pod.example/contacts/2#this': 'https://bob.example/profile/card#me'
      }
    })
    const me = new NamedNode('https://user-9.example/profile/card#me')
    const onClickHandler = jest.fn()

    const form = createPeopleSearch(document, kb as any, me, onClickHandler)
    document.body.appendChild(form)

    await openDropdown(form)

    const input = form.querySelector('input') as HTMLInputElement
    const dropdown = form.querySelector('.people-search-dropdown') as HTMLDivElement
    const aliceRow = rowFor(form, 'https://alice.example/profile/card#me') as HTMLDivElement
    const bobRow = rowFor(form, 'https://bob.example/profile/card#me') as HTMLDivElement

    keyDown(input, 'ArrowDown')
    expect(input.getAttribute('aria-activedescendant')).toBe(aliceRow.id)
    expect(aliceRow.getAttribute('aria-selected')).toBe('true')

    keyDown(input, 'ArrowUp')
    expect(input.getAttribute('aria-activedescendant')).toBe(bobRow.id)
    expect(bobRow.getAttribute('aria-selected')).toBe('true')

    keyDown(input, 'Enter')
    expect(onClickHandler).toHaveBeenCalledTimes(1)
    expect(onClickHandler).toHaveBeenCalledWith({
      name: 'Bob Stone',
      webId: 'https://bob.example/profile/card#me',
      relationshipLabel: 'Contact'
    })
    expect(dropdown.style.display).toBe('none')
    expect(input.getAttribute('aria-expanded')).toBe('false')

    await openDropdown(form)
    keyDown(input, 'Escape')
    expect(dropdown.style.display).toBe('none')
    expect(input.getAttribute('aria-expanded')).toBe('false')
  })

  it('supports Home/End navigation and closes on Tab', async () => {
    mockReadAddressBook.mockResolvedValue({
      contacts: [
        {
          uri: 'https://pod.example/contacts/1#this',
          name: 'Alice Example'
        },
        {
          uri: 'https://pod.example/contacts/2#this',
          name: 'Bob Stone'
        }
      ]
    })

    const kb = makeKb({
      contactWebIdsByCardUri: {
        'https://pod.example/contacts/1#this': 'https://alice.example/profile/card#me',
        'https://pod.example/contacts/2#this': 'https://bob.example/profile/card#me'
      }
    })
    const me = new NamedNode('https://user-11.example/profile/card#me')

    const form = createPeopleSearch(document, kb as any, me)
    document.body.appendChild(form)

    await openDropdown(form)

    const input = form.querySelector('input') as HTMLInputElement
    const dropdown = form.querySelector('.people-search-dropdown') as HTMLDivElement
    const aliceRow = rowFor(form, 'https://alice.example/profile/card#me') as HTMLDivElement
    const bobRow = rowFor(form, 'https://bob.example/profile/card#me') as HTMLDivElement

    keyDown(input, 'End')
    expect(input.getAttribute('aria-activedescendant')).toBe(bobRow.id)

    keyDown(input, 'Home')
    expect(input.getAttribute('aria-activedescendant')).toBe(aliceRow.id)

    keyDown(input, 'Tab')
    expect(dropdown.style.display).toBe('none')
    expect(input.getAttribute('aria-expanded')).toBe('false')
    expect(input.getAttribute('aria-activedescendant')).toBeNull()
  })

  it('matches names by tokenized, case-insensitive words', async () => {
    mockReadAddressBook.mockResolvedValue({
      contacts: [
        {
          uri: 'https://pod.example/contacts/1#this',
          name: 'Alice Example'
        },
        {
          uri: 'https://pod.example/contacts/2#this',
          name: 'Bob Stone'
        }
      ]
    })

    const kb = makeKb({
      contactWebIdsByCardUri: {
        'https://pod.example/contacts/1#this': 'https://alice.example/profile/card#me',
        'https://pod.example/contacts/2#this': 'https://bob.example/profile/card#me'
      }
    })
    const me = new NamedNode('https://user-4.example/profile/card#me')
    const form = createPeopleSearch(document, kb as any, me)
    document.body.appendChild(form)

    await openDropdown(form)
    await setSearchQuery(form, 'EXA ali')

    const aliceRow = rowFor(form, 'https://alice.example/profile/card#me')
    const bobRow = rowFor(form, 'https://bob.example/profile/card#me')

    expect(aliceRow).not.toBeNull()
    expect(aliceRow?.style.display).toBe('block')
    expect(bobRow).not.toBeNull()
    expect(bobRow?.style.display).toBe('none')
  })

  it('skips non-NamedNode foaf:knows values during traversal', async () => {
    mockListAddressBooks.mockResolvedValue({ publicUris: [], privateUris: [] })

    const me = new NamedNode('https://user-5.example/profile/card#me')
    const friend = new NamedNode('https://friend.example/profile/card#me')
    const kb = makeKb({
      namesByWebId: {
        [friend.value]: 'Frank Friend'
      },
      knowsByWebId: {
        [me.value]: [{ value: 'https://not-a-named-node.example/#it' }, friend]
      }
    })

    const form = createPeopleSearch(document, kb as any, me)
    document.body.appendChild(form)

    await openDropdown(form)

    const friendRow = rowFor(form, friend.value)
    const bogusRow = rowFor(form, 'https://not-a-named-node.example/#it')

    expect(friendRow).not.toBeNull()
    expect(rowLabel(friendRow)).toBe('Friend')
    expect(bogusRow).toBeNull()
  })

  it('merges duplicate people and prefers Contact label over Friend', async () => {
    const sharedWebId = 'https://alice.example/profile/card#me'
    mockReadAddressBook.mockResolvedValue({
      contacts: [
        {
          uri: 'https://pod.example/contacts/shared#this',
          name: 'Alice Contact'
        }
      ]
    })

    const me = new NamedNode('https://user-6.example/profile/card#me')
    const friend = new NamedNode(sharedWebId)
    const kb = makeKb({
      contactWebIdsByCardUri: {
        'https://pod.example/contacts/shared#this': sharedWebId
      },
      namesByWebId: {
        [sharedWebId]: 'Alice Friend'
      },
      knowsByWebId: {
        [me.value]: [friend]
      }
    })

    const form = createPeopleSearch(document, kb as any, me)
    document.body.appendChild(form)

    await openDropdown(form)

    const mergedRow = rowFor(form, sharedWebId)
    expect(mergedRow).not.toBeNull()
    expect(rowLabel(mergedRow)).toBe('Contact')
  })

  it('shows no-match status after discovery when query has no results', async () => {
    const kb = makeKb()
    const me = new NamedNode('https://user-7.example/profile/card#me')

    const form = createPeopleSearch(document, kb as any, me)
    document.body.appendChild(form)

    const dropdown = form.querySelector('.people-search-dropdown') as HTMLDivElement

    await openDropdown(form)
    await setSearchQuery(form, 'thiswillnotmatch')

    expect(dropdown.textContent).toContain('No contacts match that name.')
  })

  it('updates hidden live status text for no-match state', async () => {
    const kb = makeKb()
    const me = new NamedNode('https://user-10.example/profile/card#me')

    const form = createPeopleSearch(document, kb as any, me)
    document.body.appendChild(form)

    const liveRegion = form.querySelector('div[role="status"]') as HTMLDivElement

    await openDropdown(form)
    await setSearchQuery(form, 'no-person-will-match-this')

    expect(liveRegion.textContent).toContain('No contacts match that name.')
  })

  it('includes people discovered from the Solid catalog', async () => {
    mockListAddressBooks.mockResolvedValue({ publicUris: [], privateUris: [] })
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      text: jest.fn().mockResolvedValue(`
        @prefix ex: <http://example.org#> .
        @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

        <https://catalog-person.example/profile/card#me> a ex:Person ;
          ex:name "Catalog Person" ;
          ex:webid <https://catalog-person.example/profile/card#me> ;
          ex:modified "2025-10-12T16:39:56.789Z"^^xsd:dateTime .
      `)
    })

    const kb = makeKb()
    const me = new NamedNode('https://user-12.example/profile/card#me')

    const form = createPeopleSearch(document, kb as any, me)
    document.body.appendChild(form)

    await openDropdown(form)

    const catalogRow = rowFor(form, 'https://catalog-person.example/profile/card#me')
    expect(catalogRow).not.toBeNull()
    expect(rowLabel(catalogRow)).toBe('People')
  })
})
