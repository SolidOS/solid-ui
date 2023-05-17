import { store } from 'solid-logic'
import { setAcl, keyAclBody } from '../../../../src/utils/keyHelpers/acl'

store.fetcher.load = jest.fn().mockImplementation(() => {})
store.any = jest.fn()
store.fetcher.webOperation = jest.fn()

const keyDoc = 'https://alice.solidcommunity.net/profile/keys/publicKey.ttl'
const keyAclDoc = 'https://alice.solidcommunity.net/profile/keys/publicKey.ttl'
const error404 = {
  response: {
    status: 404
  }
}

describe('ACL Helpers', () => {
  describe('setAcl', () => {
    it('throws an error if an ACL document is NOT found', async () => {
      /* @ts-ignore */
      store.any.mockReturnValueOnce('')
      await expect(setAcl(keyDoc, keyAclBody(keyDoc, ''))).rejects.toThrowError('Key ACL doc not found!')
    })
    it('throws error if acl can not be written', async () => {
      /* @ts-ignore */
      store.any.mockReturnValueOnce(keyAclDoc)
      /* @ts-ignore */
      store.fetcher.webOperation.mockRejectedValueOnce()
      await expect(setAcl(keyDoc, keyAclBody(keyDoc, ''))).rejects.toThrowError('')
    })
    it('continues if error is because acl doc can not be found.', async () => {
      /* @ts-ignore */
      store.any.mockReturnValueOnce(keyAclDoc)
      /* @ts-ignore */
      store.fetcher.webOperation.mockRejectedValueOnce(error404)
      await expect(setAcl(keyDoc, keyAclBody(keyDoc, ''))).resolves.toBeUndefined
    })
  })
})
