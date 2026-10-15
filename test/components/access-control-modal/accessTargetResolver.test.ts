import { describe, expect, it, vi } from 'vitest'
import {
  accessPrincipalOptionsProvider,
  resolveAccessTarget
} from '../../../src/components/access-control-modal/accessTargetResolver'
import { solidLogicSingleton } from 'solid-logic'

describe('access-control target resolver', () => {
  it('normalizes a bare origin without requiring directory lookup', async () => {
    await expect(resolveAccessTarget('example.test')).resolves.toEqual({
      subjectType: 'origin',
      subjectValue: 'https://example.test',
      label: 'https://example.test'
    })
  })

  it('returns a non-selectable prompt for a short query', async () => {
    await expect(accessPrincipalOptionsProvider('x')).resolves.toEqual([{
      label: 'Type at least 2 characters to search',
      value: '',
      selectable: false
    }])
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
