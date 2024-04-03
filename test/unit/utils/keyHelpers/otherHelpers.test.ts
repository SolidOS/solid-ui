import { store } from 'solid-logic'
import { getRootIfPreferencesExist } from '../../../../src/utils/keyHelpers/otherHelpers'
import { NamedNode } from 'rdflib'

store.any = jest.fn()

describe('accessData', () => {
  const webId = new NamedNode('https://alice.solid.example.net/profile/card#me')
  describe('getRootFromPreferences', () => {
    /* @ts-ignore */
    store.any.mockReturnValueOnce(undefined)
      .mockReturnValueOnce({ value: 'https://alice.example.net/settings/prefs.ttl' })
    it('Throws an error if preferences do not exist', () => {
      expect(() => getRootIfPreferencesExist(webId)).toThrow('prefererencesFile is expected to exist in <https://alice.solid.example.net/profile/card#me>')
    })
    it('Returns the root if preferences exist', () => {
      const result = getRootIfPreferencesExist(webId)
      expect(result).toEqual('https://alice.example.net')
    })
  })
})
