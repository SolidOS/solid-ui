import { store } from 'solid-logic'
import { setAcl, keyAclBody } from '../../../../src/utils/keyHelpers/acl'

store.fetcher.load = jest.fn().mockImplementation(() => {})
store.any = jest.fn()

describe('ACL Helpers', () => {
  describe('setAcl', () => {
    it('throws an error if an ACL document is NOT found', async () => {
      /* @ts-ignore */
      store.any.mockReturnValue('')
      const keyDoc = 'https://alice.solidcommunity.net/profile/keys/publicKey.ttl'
      await expect(setAcl(keyDoc, keyAclBody(keyDoc, ''))).rejects.toThrowError('Key ACL doc not found!')
    })
    it.skip('want to find out why we delete and then re-add', () => {

    })
  })
})
