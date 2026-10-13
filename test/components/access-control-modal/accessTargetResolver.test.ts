import { describe, expect, it } from 'vitest'
import {
  createAccessPrincipalOptionsProvider,
  resolveAccessTarget
} from '../../../src/components/access-control-modal/accessTargetResolver'

describe('access-control target resolver', () => {
  it('normalizes a bare origin without requiring directory lookup', async () => {
    await expect(resolveAccessTarget('example.test')).resolves.toEqual({
      subjectType: 'origin',
      subjectValue: 'https://example.test',
      label: 'https://example.test'
    })
  })

  it('returns a non-selectable prompt for a short query', async () => {
    const provider = createAccessPrincipalOptionsProvider()

    await expect(provider('x')).resolves.toEqual([{
      label: 'Type at least 2 characters to search',
      value: '',
      selectable: false
    }])
  })
})
