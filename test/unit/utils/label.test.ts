import { lit, sym } from 'rdflib'
import { label } from '../../../src/utils'
import { silenceDebugMessages } from '../../helpers/setup'
import { store } from 'solid-logic'

silenceDebugMessages()
describe('label', () => {
  describe('uses well known label predicates', () => {
    const thing = sym('https://resource.example/label-test#it')

    beforeEach(() => {
      store.removeDocument(thing.doc())
    })

    it.each([
      'http://www.w3.org/ns/ui#label',
      'http://www.w3.org/2007/ont/link#message',
      'http://www.w3.org/2006/vcard/ns#fn',
      'http://xmlns.com/foaf/0.1/name',
      'http://purl.org/dc/terms/title',
      'http://purl.org/dc/elements/1.1/title',
      'http://purl.org/rss/1.0/title',
      'http://www.w3.org/2000/10/swap/pim/contact#fullName',
      'http://www.w3.org/2001/04/roadmap/org#name',
      'http://www.w3.org/2002/12/cal/ical#summary',
      'http://xmlns.com/foaf/0.1/nick',
      'http://www.w3.org/2000/01/rdf-schema#label',
      'https://www.w3.org/ns/activitystreams#name',
      'http://schema.org/name'
    ])('renders %s as label', (property) => {
      store.add(thing, sym(property), lit('the label'), thing.doc())
      const result = label(thing)
      expect(result).toEqual('the label')
    })
  })

  describe('when no label predicates are present', () => {
    it('the hostname is used when no path is present', () => {
      const result = label(sym('https://resource.example/'))
      expect(result).toEqual('resource.example')
    })
    it('the last part of the path is used if no fragment is present', () => {
      const result = label(sym('https://resource.example/path/to/folder/'))
      expect(result).toEqual('folder')
    })
    it('the filename is used if no fragment is present', () => {
      const result = label(sym('https://resource.example/path/to/folder/file.ttl'))
      expect(result).toEqual('file.ttl')
    })
    it('the fragment is used', () => {
      const result = label(
        sym('https://resource.example/path/to/folder/file.ttl#fragment')
      )
      expect(result).toEqual('fragment')
    })
    it('the last part of the path is used if fragment is #this', () => {
      const result = label(
        sym('https://resource.example/path/to/folder/#this')
      )
      expect(result).toEqual('folder')
    })
    it('the last part of the path is used if fragment is #me', () => {
      const result = label(
        sym('https://resource.example/path/to/folder/#me')
      )
      expect(result).toEqual('folder')
    })
    it('the hostname is used for common WebID URI pattern', () => {
      const result = label(sym('https://alice.solid.example/profile/card#me'))
      expect(result).toEqual('alice.solid.example')
    })
  })

  describe('cleanup', () => {
    it('replaces dashes a underscores with blanks', () => {
      const result = label(sym('https://resource.example/path/to/some-weired_folder-name'))
      expect(result).toEqual('some weired folder name')
    })

    it('separates camel case parts with blanks', () => {
      const result = label(sym('https://resource.example/path/to/camelCaseFolderName/'))
      expect(result).toEqual('camel Case Folder Name')
    })
  })
})
