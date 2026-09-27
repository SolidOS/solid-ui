// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest'

const planGrant = vi.fn()
const planRevoke = vi.fn()
const applyPlan = vi.fn()

vi.mock('solid-logic', async (importOriginal) => {
  const actual = await importOriginal<typeof import('solid-logic')>()

  return {
    ...actual,
    solidLogicSingleton: {
      ...actual.solidLogicSingleton,
      acl: {
        ...actual.solidLogicSingleton.acl,
        planGrant,
        planRevoke,
        applyPlan
      },
      resource: {
        ...actual.solidLogicSingleton.resource,
        isWebId: vi.fn(() => true)
      }
    }
  }
})

describe('AccessControlModal submit', () => {
  beforeEach(async () => {
    planGrant.mockReset()
    planRevoke.mockReset()
    applyPlan.mockReset()
    planGrant.mockResolvedValue({ target: 'https://example.com/resource.ttl.acl', deletes: [], inserts: [] })
    applyPlan.mockResolvedValue(new Response('ok', { status: 200 }))
    await import('../../src/components/access-control-modal/AccessControlModal')
  })

  it('applies a grant plan and clears the loading state after save', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.principleInputValue = 'https://alice.example.com/profile/card.ttl#me'
    element.roleValue = 'Editor'

    await element.onSubmit(new Event('submit'))

    expect(planGrant).toHaveBeenCalledTimes(1)
    expect(applyPlan).toHaveBeenCalledTimes(1)
    expect(element.submitting).toBe(false)
    expect(element.principleInputValue).toBe('')
  })

  it('uses the default share title when no subject uri is present', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any

    expect(element.getDialogTitle()).toBe('Share this resource')
  })
})