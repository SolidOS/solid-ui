import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { namedNode } from 'rdflib'
import { authSession, authn } from 'solid-logic'
import { PeopleSearch } from './PeopleSearch'
import './index'
import ns from '../../../../ns'

jest.mock('@solid-data-modules/contacts-rdflib', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    listAddressBooks: jest.fn(async () => ({ publicUris: [], privateUris: [] })),
    readAddressBook: jest.fn(async () => ({ contacts: [] }))
  }))
}))

jest.mock('solid-logic', () => ({
  authSession: {
    events: {
      on: jest.fn(),
      off: jest.fn()
    }
  },
  authn: {
    currentUser: jest.fn()
  },
  solidLogicSingleton: {
    store: null
  }
}))

const mockCurrentUser = authn.currentUser as jest.Mock
const mockOn = authSession.events.on as jest.Mock
const mockOff = authSession.events.off as jest.Mock

function getPortalRoot () {
  const portalHost = document.querySelector('[data-solid-ui-combobox-portal]') as HTMLDivElement | null
  return portalHost?.shadowRoot ?? null
}

async function flushUpdates () {
  await Promise.resolve()
  await Promise.resolve()
  await Promise.resolve()
}

describe('SolidUIPeopleSearch', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    mockCurrentUser.mockReset()
    mockOn.mockReset()
    mockOff.mockReset()
    ;(globalThis as typeof globalThis & { fetch?: typeof fetch }).fetch = undefined
  })

  it('is defined as a custom element', () => {
    expect(customElements.get('solid-ui-people-search')).toBe(PeopleSearch)
  })

  it('shows a sign-in message when no user is authenticated', async () => {
    mockCurrentUser.mockReturnValue(null)

    const peopleSearch = new PeopleSearch()
    document.body.appendChild(peopleSearch)
    await peopleSearch.updateComplete

    const status = peopleSearch.shadowRoot?.querySelector('.status') as HTMLElement
    const combobox = peopleSearch.shadowRoot?.querySelector('solid-ui-combobox') as HTMLElement

    expect(combobox).not.toBeNull()
    expect(status.textContent).toContain('Sign in to search contacts.')
    expect(mockOn).toHaveBeenCalledWith('login', expect.any(Function))
    expect(mockOn).toHaveBeenCalledWith('logout', expect.any(Function))
  })

  it('loads FOAF suggestions and emits person-select with relationship details', async () => {
    const me = namedNode('https://example.com/profile/card#me')
    const friend = namedNode('https://alice.example/profile/card#me')

    mockCurrentUser.mockReturnValue(me)

    const store = {
      fetcher: {
        load: jest.fn(async () => undefined)
      },
      updater: {},
      each: jest.fn((subject: NamedNode, predicate: NamedNode) => {
        if (subject.value === me.value && predicate.value === ns.foaf('knows').value) {
          return [friend]
        }
        return []
      }),
      any: jest.fn((subject: NamedNode, predicate: NamedNode) => {
        if (subject.value === friend.value && predicate.value === ns.foaf('name').value) {
          return { value: 'Alice Example' }
        }
        return null
      }),
      anyValue: jest.fn(() => null)
    } as any

    const openSpy = jest.spyOn(window, 'open').mockReturnValue(null)
    const selected = jest.fn()

    const peopleSearch = new PeopleSearch()
    peopleSearch.store = store
    peopleSearch.openProfilesOnSelect = false
    peopleSearch.addEventListener('person-select', (event: Event) => {
      selected((event as CustomEvent).detail)
    })

    document.body.appendChild(peopleSearch)
    await peopleSearch.updateComplete
    await flushUpdates()
    await peopleSearch.updateComplete

    const combobox = peopleSearch.shadowRoot?.querySelector('solid-ui-combobox') as any
    const input = combobox.shadowRoot?.querySelector('input.text-input') as HTMLInputElement

    input.value = 'Alice'
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }))
    await flushUpdates()
    await combobox.updateComplete

    const portalRoot = getPortalRoot()
    const options = portalRoot?.querySelectorAll('[role="option"]') as NodeListOf<HTMLElement>

    expect(options).toHaveLength(1)
    expect(options[0].textContent).toContain('Alice Example')
    expect(options[0].textContent).toContain('Friend')

    options[0].click()
    await flushUpdates()

    expect(selected).toHaveBeenCalledWith({
      person: {
        name: 'Alice Example',
        webId: 'https://alice.example/profile/card#me',
        relationshipLabel: 'Friend'
      }
    })
    expect(openSpy).not.toHaveBeenCalled()

    openSpy.mockRestore()
  })
})