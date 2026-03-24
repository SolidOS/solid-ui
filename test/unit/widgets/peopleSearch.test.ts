import { NamedNode } from 'rdflib'
import { silenceDebugMessages } from '../helpers/debugger'
import { createPeopleSearch } from '../../../src/widgets/peopleSearch'

const mockListAddressBooks = jest.fn()
const mockReadAddressBook = jest.fn()
let bookCounter = 0

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
})
