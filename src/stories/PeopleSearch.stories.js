import '../v2/components/forms/peopleSearch/index'
import ContactsModuleRdfLib from '@solid-data-modules/contacts-rdflib'

const CATALOG_URL =
  'https://raw.githubusercontent.com/solid/catalog/refs/heads/main/catalog-data.ttl'

function makeMockKb () {
  const meWebId = 'https://demo.example/profile/card#me'
  const friendWebId = 'https://friend.example/profile/card#me'
  const personFromKnowsWebId = 'https://person.example/profile/card#me'
  const contactCardUri = 'https://demo.example/contacts/alice#this'

  const namesByWebId = {
    [friendWebId]: 'Frank Friend',
    [personFromKnowsWebId]: 'Pat Person'
  }

  return {
    fetcher: {
      load: async function () {
        return undefined
      }
    },
    updater: {},
    any: function (subject, predicate) {
      const subjectValue = subject && subject.value
      const predicateValue = predicate && predicate.value

      if (!subjectValue || !predicateValue) {
        return null
      }

      if (
        predicateValue.includes('foaf/0.1/name') ||
        predicateValue.endsWith('#name') ||
        predicateValue.includes('/2006/vcard/ns#fn')
      ) {
        const personName = namesByWebId[subjectValue]
        return personName ? { value: personName } : null
      }

      if (
        predicateValue.includes('/2006/vcard/ns#url') &&
        subjectValue === contactCardUri
      ) {
        return $rdf.namedNode(`${contactCardUri}-url`)
      }

      return null
    },
    anyValue: function (subject, predicate) {
      const subjectValue = subject && subject.value
      const predicateValue = predicate && predicate.value

      if (!subjectValue || !predicateValue) {
        return null
      }

      if (
        predicateValue.includes('/2006/vcard/ns#value') &&
        subjectValue === `${contactCardUri}-url`
      ) {
        return 'https://alice.example/profile/card#me'
      }

      return null
    },
    each: function (subject, predicate) {
      const subjectValue = subject && subject.value
      const predicateValue = predicate && predicate.value

      if (!subjectValue || !predicateValue) {
        return []
      }

      if (!predicateValue.includes('foaf/0.1/knows')) {
        return []
      }

      if (subjectValue === meWebId) {
        return [
          $rdf.namedNode(friendWebId),
          $rdf.namedNode(personFromKnowsWebId)
        ]
      }

      return []
    }
  }
}

function installPeopleSearchMocks () {
  const originalListAddressBooks =
    ContactsModuleRdfLib.prototype.listAddressBooks
  const originalReadAddressBook =
    ContactsModuleRdfLib.prototype.readAddressBook
  const originalFetch = globalThis.fetch

  ContactsModuleRdfLib.prototype.listAddressBooks = async function () {
    return {
      publicUris: ['https://demo.example/address-book#this'],
      privateUris: []
    }
  }

  ContactsModuleRdfLib.prototype.readAddressBook = async function () {
    return {
      contacts: [
        {
          uri: 'https://demo.example/contacts/alice#this',
          name: 'Alice Contact'
        }
      ]
    }
  }

  globalThis.fetch = async function (input, init) {
    const url = typeof input === 'string' ? input : input && input.url

    if (url === CATALOG_URL) {
      return {
        ok: true,
        status: 200,
        text: async function () {
          return `
            @prefix ex: <http://example.org#> .

            <https://catalog-person.example/profile/card#me> a ex:Person ;
              ex:name "Catalog Person" ;
              ex:webid <https://catalog-person.example/profile/card#me> .
          `
        }
      }
    }

    if (typeof originalFetch === 'function') {
      return originalFetch(input, init)
    }

    return {
      ok: false,
      status: 404,
      text: async function () {
        return ''
      }
    }
  }

  return function restoreMocks () {
    ContactsModuleRdfLib.prototype.listAddressBooks = originalListAddressBooks
    ContactsModuleRdfLib.prototype.readAddressBook = originalReadAddressBook
    globalThis.fetch = originalFetch
  }
}

export default {
  title: 'Forms/PeopleSearch'
}

export const SignedOut = {
  render: () => {
    const element = document.createElement('solid-ui-people-search')
    element.store = makeMockKb()
    return element
  },
  name: 'signed out'
}

export const WithMockData = {
  render: () => {
    const restoreMocks = installPeopleSearchMocks()

    const wrapper = document.createElement('div')
    const info = document.createElement('p')
    info.textContent =
      'Mocked sources: address book, foaf:knows, and Solid catalog. Type to filter.'
    wrapper.appendChild(info)

    const originalCurrentUser = window.SolidLogic?.authn?.currentUser
    const me = $rdf.namedNode('https://demo.example/profile/card#me')
    if (window.SolidLogic?.authn) {
      window.SolidLogic.authn.currentUser = () => me
    }
    const picker = document.createElement('solid-ui-people-search')
    picker.store = makeMockKb()
    picker.openProfilesOnSelect = false
    wrapper.appendChild(picker)

    const cleanup = function () {
      restoreMocks()
      if (window.SolidLogic?.authn) {
        window.SolidLogic.authn.currentUser = originalCurrentUser
      }
      wrapper.removeEventListener('DOMNodeRemovedFromDocument', cleanup)
    }
    wrapper.addEventListener('DOMNodeRemovedFromDocument', cleanup)

    return wrapper
  },
  name: 'with mock data'
}
