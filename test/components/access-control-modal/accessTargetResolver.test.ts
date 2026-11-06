import { describe, expect, it, vi } from 'vitest'
import {
  accessPrincipalOptionsProvider,
  resolveAccessTarget
} from '../../../src/components/access-control-modal/accessTargetResolver'
import { solidLogicSingleton } from 'solid-logic'
import { sym } from 'rdflib'
import ns from '../../../src/lib/ns'

describe('access-control target resolver', () => {
  it('normalizes a bare origin without requiring directory lookup', async () => {
    await expect(resolveAccessTarget('example.test')).resolves.toEqual({
      subjectType: 'origin',
      subjectValue: 'https://example.test',
      label: 'https://example.test',
      targetKind: 'origin'
    })
  })

  it('resolves a selected absolute origin without classifying it as an agent', async () => {
    await expect(resolveAccessTarget('https://example.test/')).resolves.toEqual({
      subjectType: 'origin',
      subjectValue: 'https://example.test',
      label: 'https://example.test',
      targetKind: 'origin'
    })
  })

  it('returns a non-selectable prompt for a short query', async () => {
    await expect(accessPrincipalOptionsProvider('x')).resolves.toEqual([{
      label: 'Type at least 2 characters to search',
      value: '',
      selectable: false
    }])
  })

  it('suggests only the current user’s trusted-app origins from the profile RDF', async () => {
    const store = solidLogicSingleton.store
    const me = sym('https://trusted-app-options.example/profile/card#me')
    const profile = me.doc()
    const trustedApp = sym('https://trusted-app-options.example/apps/trusted')
    const invalidApp = sym('https://trusted-app-options.example/apps/invalid')
    const otherUser = sym('https://other-user.example/profile/card#me')
    const otherProfile = otherUser.doc()
    const unrelatedApp = sym('https://other-user.example/apps/unrelated')

    store.add(me, ns.acl('trustedApp'), trustedApp, profile)
    store.add(trustedApp, ns.acl('origin'), sym('https://trusted.example.test/'), profile)
    store.add(me, ns.acl('trustedApp'), invalidApp, profile)
    store.add(invalidApp, ns.acl('origin'), sym('https://invalid.example.test/app'), profile)
    store.add(otherUser, ns.acl('trustedApp'), unrelatedApp, otherProfile)
    store.add(unrelatedApp, ns.acl('origin'), sym('https://unrelated.example.test/'), otherProfile)

    const currentUserSpy = vi.spyOn(solidLogicSingleton.authn, 'currentUser').mockReturnValue(me)
    const loadProfileSpy = vi.spyOn(solidLogicSingleton.profile, 'loadProfile').mockResolvedValue(profile)
    const directorySearchSpy = vi.spyOn(solidLogicSingleton.directory, 'search')
      .mockRejectedValue(new Error('directory unavailable'))

    try {
      const options = await accessPrincipalOptionsProvider('trusted')

      expect(loadProfileSpy).toHaveBeenCalledWith(me)
      expect(directorySearchSpy).toHaveBeenCalled()
      expect(options).toHaveLength(1)
      expect(options[0]).toEqual(expect.objectContaining({
        label: 'Trusted app: https://trusted.example.test',
        value: 'https://trusted.example.test',
        targetKind: 'trustedApp'
      }))
    } finally {
      currentUserSpy.mockRestore()
      loadProfileSpy.mockRestore()
      directorySearchSpy.mockRestore()
      store.removeMatches(null, null, null, profile)
      store.removeMatches(null, null, null, otherProfile)
    }
  })

  it('preserves related document lookup failures for direct resolution', async () => {
    const classifySpy = vi.spyOn(solidLogicSingleton.acl, 'classifyAccessControlSubject')
      .mockResolvedValueOnce({
        kind: 'agent',
        subjectValue: 'https://example.test/profile#me'
      })
    const loadSpy = vi.spyOn(solidLogicSingleton.store.fetcher, 'load')
      .mockRejectedValueOnce(new Error('related document failed'))

    await expect(resolveAccessTarget('https://example.test/profile#me'))
      .rejects.toThrow('related document failed')

    classifySpy.mockRestore()
    loadSpy.mockRestore()
  })
})
