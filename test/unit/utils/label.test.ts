import { sym } from 'rdflib'
import { label } from '../../../src/utils'
import { silenceDebugMessages } from '../../helpers/setup'
silenceDebugMessages()
jest.mock('solid-auth-client', () => ({
  currentSession: () => Promise.resolve(),
  trackSession: () => null
}))
describe('label', () => {
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
        sym('https://resource.example/profile/card#me')
      )
      expect(result).toEqual('card')
    })
    it('the last part of the path before foaf.rdf is used', () => {
      const result = label(
        sym('https://resource.example/profile/foaf.rdf')
      )
      expect(result).toEqual('profile')
    })

    it('the last part of the path before foaf is used', () => {
      const result = label(
        sym('https://resource.example/profile/foaf')
      )
      expect(result).toEqual('profile')
    })
  })
})
