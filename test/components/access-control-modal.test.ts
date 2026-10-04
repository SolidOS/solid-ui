// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest'

const planGrant = vi.fn()
const planRevoke = vi.fn()
const applyPlan = vi.fn()
const classifyAccessControlSubject = vi.fn()

vi.mock('@/components/combobox', () => ({
  defineAsyncComboboxOptionsProvider: <T>(provider: T) => provider
}))

vi.mock('@/components/combobox-option', () => ({}))

vi.mock('solid-logic', async (importOriginal) => {
  const actual = await importOriginal<typeof import('solid-logic')>()

  return {
    ...actual,
    solidLogicSingleton: {
      ...actual.solidLogicSingleton,
      acl: {
        ...actual.solidLogicSingleton.acl,
        classifyAccessControlSubject,
        planGrant,
        planRevoke,
        applyPlan
      },
      store: {
        ...actual.solidLogicSingleton.store,
        fetcher: {
          ...actual.solidLogicSingleton.store.fetcher,
          load: vi.fn().mockResolvedValue(undefined)
        }
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
    classifyAccessControlSubject.mockReset()
    classifyAccessControlSubject.mockImplementation(async (principle: string) => ({
      kind: 'agent' as const,
      subjectValue: principle
    }))
    planGrant.mockResolvedValue({ target: 'https://example.com/resource.ttl.acl', deletes: [], inserts: [] })
    applyPlan.mockResolvedValue(new Response('ok', { status: 200 }))
    await import('../../src/components/access-control-modal/AccessControlModal')
  })

  it('queues a grant on submit without saving it', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.principalInputValue = 'https://alice.example.com/profile/card.ttl#me'
    element.addAccessRoleValue = 'Editor'

    await element.onSubmit(new Event('submit'))

    expect(planGrant).not.toHaveBeenCalled()
    expect(applyPlan).not.toHaveBeenCalled()
    expect(element.pendingAccessGrants).toHaveLength(1)
    expect(element.principalInputValue).toBe('')
  })

  it('keeps newer input when an async lookup resolves later', async () => {
    let resolveClassification!: (value: { kind: 'agent', subjectValue: string }) => void
    classifyAccessControlSubject.mockImplementationOnce(() => new Promise(resolve => {
      resolveClassification = resolve
    }))

    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.principalInputValue = 'https://alice.example.com/profile/card.ttl#me'
    element.addAccessRoleValue = 'Editor'

    const submitPromise = element.onSubmit(new Event('submit'))
    element.principalInputValue = 'https://bob.example.com/profile/card.ttl#me'
    resolveClassification({ kind: 'agent', subjectValue: 'https://alice.example.com/profile/card.ttl#me' })
    await submitPromise

    expect(element.principalInputValue).toBe('https://bob.example.com/profile/card.ttl#me')
    expect(element.pendingAccessGrants).toHaveLength(1)
  })

  it('keeps the selected role for a queued grant even if the mode changes later', async () => {
    let resolveClassification!: (value: { kind: 'agent', subjectValue: string }) => void
    classifyAccessControlSubject.mockImplementationOnce(() => new Promise(resolve => {
      resolveClassification = resolve
    }))

    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.principalInputValue = 'https://alice.example.com/profile/card.ttl#me'
    element.addAccessRoleValue = 'Editor'

    const submitPromise = element.onSubmit(new Event('submit'))
    element.addAccessRoleValue = 'Viewer'
    resolveClassification({ kind: 'agent', subjectValue: 'https://alice.example.com/profile/card.ttl#me' })
    await submitPromise

    expect(element.pendingAccessGrants).toEqual([
      expect.objectContaining({
        role: 'Editor'
      })
    ])
  })

  it('applies a grant plan and clears the loading state after save', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.principalInputValue = 'https://alice.example.com/profile/card.ttl#me'
    element.addAccessRoleValue = 'Editor'

    await element.onSaveClick()

    expect(planGrant).toHaveBeenCalledTimes(1)
    expect(planGrant).toHaveBeenCalledWith(
      'https://example.com/resource.ttl',
      {
        type: 'agent',
        iri: 'https://alice.example.com/profile/card.ttl#me'
      },
      ['Read', 'Write']
    )
    expect(applyPlan).toHaveBeenCalledTimes(1)
    expect(element.submitting).toBe(false)
    expect(element.pendingAccessGrants).toEqual([])
  })

  it('reads the selected role from the rendered combobox change event', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    document.body.appendChild(element)
    await element.updateComplete

    const roleSelect = element.shadowRoot.querySelector('solid-ui-combobox.access-role-select--top')
    roleSelect.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        option: {
          value: 'Editor',
          label: 'Editor'
        }
      }
    }))

    expect(element.addAccessRoleValue).toBe('Editor')
    expect(element.sharedAccessRoleValue).toBe('No Access')

    document.body.removeChild(element)
  })

  it('keeps the general access selector independent from the top selector', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.principalInputValue = 'https://alice.example.com/profile/card.ttl#me'
    element.addAccessRoleValue = 'Viewer'
    element.sharedAccessRoleValue = 'No Access'

    await element.onSubmit(new Event('submit'))

    document.body.appendChild(element)
    await element.updateComplete

    const sharedRoleSelect = element.shadowRoot.querySelector('solid-ui-combobox.access-role-select--compact')
    sharedRoleSelect.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        option: {
          value: 'Editor',
          label: 'Editor'
        }
      }
    }))

    expect(element.addAccessRoleValue).toBe('Viewer')
    expect(element.sharedAccessRoleValue).toBe('Editor')
    expect(element.pendingAccessGrants).toEqual([
      expect.objectContaining({
        role: 'Viewer'
      })
    ])

    document.body.removeChild(element)
  })

  it('uses the default share title when no subject uri is present', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any

    expect(element.getDialogTitle()).toBe('Share this resource')
  })

  it('hides no access in the add selector and keeps no access in the general selector', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    document.body.appendChild(element)
    await element.updateComplete

    const addRoleSelect = element.shadowRoot.querySelector('solid-ui-combobox.access-role-select--top')
    const generalRoleSelect = element.shadowRoot.querySelector('solid-ui-combobox.access-role-select--compact')

    const addOptions = [...addRoleSelect.querySelectorAll('solid-ui-combobox-option')].map((option: Element) => option.textContent?.trim())
    const generalOptions = [...generalRoleSelect.querySelectorAll('solid-ui-combobox-option')].map((option: Element) => option.textContent?.trim())

    expect(addOptions).not.toContain('No Access')
    expect(addOptions).toContain('Viewer')
    expect(generalOptions).toContain('No Access')

    document.body.removeChild(element)
  })

  it('shows remove for no access in grant rows', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.accessGrants = [{
      agent: ['https://alice.example.com/profile/card.ttl#me'],
      agentGroup: [],
      agentClass: [],
      origin: [],
      mode: ['Read']
    }]

    document.body.appendChild(element)
    await element.updateComplete

    const grantRoleSelect = element.shadowRoot.querySelector('solid-ui-combobox.access-grants-role--editable')
    const grantOptions = [...grantRoleSelect.querySelectorAll('solid-ui-combobox-option')].map((option: Element) => option.textContent?.trim())

    expect(grantOptions).toContain('Remove')
    expect(grantOptions).not.toContain('No Access')

    document.body.removeChild(element)
  })
})