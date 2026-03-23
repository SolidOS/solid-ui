import { NamedNode } from 'rdflib'
import { silenceDebugMessages } from '../helpers/debugger'
import { createPeopleSearch } from '../../../src/widgets/peopleSearch'

const mockListAddressBooks = jest.fn()
const mockReadAddressBook = jest.fn()

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

const makeKb = function () {
  return {
    fetcher: {
      load: jest.fn().mockResolvedValue(undefined)
    },
    updater: {},
    any: jest.fn((subject, predicate) => {
      if (
        subject?.value?.includes('/contacts/1#this') &&
        predicate?.value?.includes('url')
      ) {
        return new NamedNode('https://pod.example/contacts/1#url')
      }
      return null
    }),
    anyValue: jest.fn((subject, predicate) => {
      if (
        subject?.value?.includes('/contacts/1#url') &&
        predicate?.value?.includes('value')
      ) {
        return 'https://alice.example/profile/card#me'
      }
      return null
    }),
    each: jest.fn().mockReturnValue([])
  }
}

describe('createPeopleSearch', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    jest.clearAllMocks()

    mockListAddressBooks.mockResolvedValue({
      publicUris: ['https://pod.example/address-book-1.ttl'],
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

    await flushAsyncWork()

    const input = form.querySelector('input') as HTMLInputElement
    const dropdown = form.querySelector('.people-search-dropdown') as HTMLDivElement

    input.dispatchEvent(new Event('focus'))
    await flushAsyncWork()

    const personRow = form.querySelector('div[title="https://alice.example/profile/card#me"]') as HTMLDivElement
    expect(personRow).not.toBeNull()

    personRow.dispatchEvent(new Event('click'))

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

    await flushAsyncWork()

    const input = form.querySelector('input') as HTMLInputElement
    const dropdown = form.querySelector('.people-search-dropdown') as HTMLDivElement

    input.dispatchEvent(new Event('focus'))
    await flushAsyncWork()

    const personRow = form.querySelector('div[title="https://alice.example/profile/card#me"]') as HTMLDivElement
    expect(personRow).not.toBeNull()

    personRow.dispatchEvent(new Event('click'))

    expect(openSpy).toHaveBeenCalledTimes(1)
    expect(openSpy).toHaveBeenCalledWith('https://alice.example/profile/card#me', '_blank')
    expect(dropdown.style.display).toBe('none')

    openSpy.mockRestore()
  })

  it('shows sign-in message when me is null', async () => {
    const kb = makeKb()

    const form = createPeopleSearch(document, kb as any, null)
    document.body.appendChild(form)

    const input = form.querySelector('input') as HTMLInputElement
    const dropdown = form.querySelector('.people-search-dropdown') as HTMLDivElement

    input.dispatchEvent(new Event('focus'))
    await flushAsyncWork()

    expect(dropdown.style.display).toBe('block')
    expect(dropdown.textContent).toContain('Sign in to search contacts.')
  })
})
