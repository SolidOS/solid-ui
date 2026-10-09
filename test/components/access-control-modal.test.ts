// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest'

const planGrant = vi.fn()
const planRevoke = vi.fn()
const planPublicRead = vi.fn()
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
        planPublicRead,
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
    planPublicRead.mockReset()
    applyPlan.mockReset()
    classifyAccessControlSubject.mockReset()
    classifyAccessControlSubject.mockImplementation(async (principle: string) => ({
      kind: 'agent' as const,
      subjectValue: principle
    }))
    planGrant.mockResolvedValue({ target: 'https://example.com/resource.ttl.acl', deletes: [], inserts: [] })
    planPublicRead.mockResolvedValue({ target: 'https://example.com/resource.ttl.acl', deletes: [], inserts: [] })
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

  it.each([
    { role: 'Owner', modes: ['Read', 'Write', 'Control'] },
    { role: 'Editor', modes: ['Read', 'Write'] },
    { role: 'Viewer', modes: ['Read'] },
    { role: 'Poster', modes: ['Append', 'Read'] },
    { role: 'Submitter', modes: ['Append'] }
  ])('saves $role using the modes supplied by solid-logic', async ({ role, modes }) => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.principalInputValue = 'https://alice.example.com/profile/card.ttl#me'
    element.addAccessRoleValue = role

    await element.onSaveClick()

    expect(planGrant).toHaveBeenCalledWith(
      element.subjectUri,
      { type: 'agent', iri: 'https://alice.example.com/profile/card.ttl#me' },
      modes
    )
    expect(applyPlan).toHaveBeenCalledTimes(1)
    expect(element.failed).toBe(false)
  })

  it('revokes a queued no-access grant instead of granting empty modes', async () => {
    planRevoke.mockResolvedValue({ target: 'https://example.com/resource.ttl.acl', deletes: [], inserts: [] })
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.pendingAccessGrants = [{
      subjectType: 'agent',
      subjectValue: 'https://alice.example.com/profile/card.ttl#me',
      role: 'No Access',
      label: 'Alice'
    }]

    await element.onSaveClick()

    expect(planGrant).not.toHaveBeenCalled()
    expect(planRevoke).toHaveBeenCalledWith(
      element.subjectUri,
      { type: 'agent', iri: 'https://alice.example.com/profile/card.ttl#me' }
    )
    expect(applyPlan).toHaveBeenCalledTimes(1)
    expect(element.pendingAccessGrants).toEqual([])
  })

  it('persists authenticated and public access changes on save', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.accessGrants = []
    element.authenticatedAccessRoleValue = 'Editor'
    element.publicAccessRoleValue = 'Viewer'

    await element.onSaveClick()

    expect(planGrant).toHaveBeenNthCalledWith(
      1,
      'https://example.com/resource.ttl',
      { type: 'agentClass', iri: 'http://www.w3.org/ns/auth/acl#AuthenticatedAgent' },
      ['Read', 'Write']
    )
    expect(planGrant).toHaveBeenNthCalledWith(
      2,
      'https://example.com/resource.ttl',
      { type: 'agentClass', iri: 'http://xmlns.com/foaf/0.1/Agent' },
      ['Read']
    )
    expect(applyPlan).toHaveBeenCalledTimes(2)
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
    expect(element.authenticatedAccessRoleValue).toBe('No Access')
    expect(element.publicAccessRoleValue).toBe('No Access')

    document.body.removeChild(element)
  })

  it('keeps the general access selector independent from the top selector', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.principalInputValue = 'https://alice.example.com/profile/card.ttl#me'
    element.addAccessRoleValue = 'Viewer'
    element.authenticatedAccessRoleValue = 'No Access'
    element.publicAccessRoleValue = 'No Access'

    await element.onSubmit(new Event('submit'))

    document.body.appendChild(element)
    await element.updateComplete

    const sharedRoleSelect = element.shadowRoot.querySelector('solid-ui-combobox.access-role-select--authenticated')
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
    expect(element.authenticatedAccessRoleValue).toBe('Editor')
    expect(element.publicAccessRoleValue).toBe('No Access')
    expect(element.pendingAccessGrants).toEqual([
      expect.objectContaining({
        role: 'Viewer'
      })
    ])

    document.body.removeChild(element)
  })

  it('enables save when a shared access grant is changed', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.accessGrants = [{
      agent: ['https://alice.example.com/profile/card.ttl#me'],
      agentGroup: [],
      agentClass: [],
      mode: ['Read']
    }]

    document.body.appendChild(element)
    await element.updateComplete

    const saveButton = [...element.shadowRoot.querySelectorAll('solid-ui-button')]
      .find((button: Element) => button.textContent?.includes('Save Changes')) as HTMLElement
    expect(saveButton.hasAttribute('disabled')).toBe(true)

    const grantRoleSelect = element.shadowRoot.querySelector('solid-ui-combobox.access-grants-role--editable')
    grantRoleSelect.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { option: { value: 'Editor', label: 'Editor' } }
    }))

    await element.updateComplete
    expect(saveButton.hasAttribute('disabled')).toBe(false)

    document.body.removeChild(element)
  })

  it('uses the default share title when no subject uri is present', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any

    expect(element.getDialogTitle()).toBe('Share this resource')
  })

  it('hides no access in the add selector, keeps it in the authenticated selector, and exposes dokieli public roles', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    document.body.appendChild(element)
    await element.updateComplete

    const addRoleSelect = element.shadowRoot.querySelector('solid-ui-combobox.access-role-select--top')
    const authenticatedRoleSelect = element.shadowRoot.querySelector('solid-ui-combobox.access-role-select--authenticated')
    const publicRoleSelect = element.shadowRoot.querySelector('solid-ui-combobox.access-role-select--public')

    const addOptions = [...addRoleSelect.querySelectorAll('solid-ui-combobox-option')].map((option: Element) => option.textContent?.trim())
    const authenticatedOptions = [...authenticatedRoleSelect.querySelectorAll('solid-ui-combobox-option')].map((option: Element) => option.textContent?.trim())
    const publicOptions = [...publicRoleSelect.querySelectorAll('solid-ui-combobox-option')].map((option: Element) => option.textContent?.trim())

    expect(addOptions).not.toContain('No Access')
    expect(addOptions).toContain('Viewer')
    expect(authenticatedOptions).toContain('No Access')
    expect(authenticatedOptions).toContain('Editor')
    expect(publicOptions).toEqual(['No Access', 'Viewer'])

    document.body.removeChild(element)
  })

  it('shows remove for no access in grant rows', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.accessGrants = [{
      agent: ['https://alice.example.com/profile/card.ttl#me'],
      agentGroup: [],
      agentClass: [],
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

  it('keeps authenticated and public grants out of the shared-with list', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.accessGrants = [
      {
        agent: ['https://alice.example.com/profile/card.ttl#me'],
        agentGroup: [],
        agentClass: [],
        mode: ['Read']
      },
      {
        agent: [],
        agentGroup: [],
        agentClass: ['http://www.w3.org/ns/auth/acl#AuthenticatedAgent'],
        mode: ['Read', 'Write']
      },
      {
        agent: [],
        agentGroup: [],
        agentClass: ['http://xmlns.com/foaf/0.1/Agent'],
        mode: ['Read']
      }
    ]

    document.body.appendChild(element)
    await element.updateComplete

    const sharedWithLabels = [...element.shadowRoot.querySelectorAll('.access-grants-list h3')].map((label: Element) => label.textContent?.trim())
    expect(sharedWithLabels).toEqual(['card.ttl'])

    const searchOptions = [...element.shadowRoot.querySelectorAll('solid-ui-combobox.access-grants-search-input solid-ui-combobox-option')]
      .map((option: Element) => option.textContent?.trim())
    expect(searchOptions).toEqual(['card.ttl'])

    document.body.removeChild(element)
  })

  it.each([
    'http://www.w3.org/ns/auth/acl#AuthenticatedAgent',
    'http://xmlns.com/foaf/0.1/Agent'
  ])('retains non-general subjects from an authorization containing %s', async (generalClass) => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    const agent = 'https://alice.example.com/profile/card.ttl#me'
    const group = 'https://example.com/group'
    const agentClass = 'https://example.com/team'
    element.subjectUri = 'https://example.com/resource.ttl'
    element.accessGrants = [{
      agent: [agent],
      agentGroup: [group],
      agentClass: [generalClass, agentClass],
      mode: ['Read']
    }]

    document.body.appendChild(element)
    await element.updateComplete
    await element.refreshAccessGrantLabels()
    await element.updateComplete

    const expectedLabel = element.getAuthorizationSubjectLabel({
      agent: [agent],
      agentGroup: [group],
      agentClass: [agentClass],
      mode: ['Read']
    })
    const entries = element.getSharedAccessGrantEntries()
    expect(entries).toHaveLength(1)
    expect(entries[0].authorization.agentClass).toEqual([agentClass])
    expect(entries[0].subjectLabel).toBe(expectedLabel)
    expect(element.accessGrants[0].agentClass).toEqual([generalClass, agentClass])
    expect(element.shadowRoot.querySelector('.access-grants-list h3').textContent.trim()).toBe(expectedLabel)
    const searchOptions = [...element.shadowRoot.querySelectorAll('solid-ui-combobox.access-grants-search-input solid-ui-combobox-option')]
      .map((option: Element) => option.textContent?.trim())
    expect(searchOptions).toEqual([expectedLabel])

    element.searchValue = 'card.ttl'
    await element.updateComplete
    expect(element.shadowRoot.querySelector('.access-grants-list h3').textContent.trim()).toBe(expectedLabel)

    const roleSelect = element.shadowRoot.querySelector('.access-grants-list solid-ui-combobox')
    roleSelect.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { option: { value: 'Editor', label: 'Editor' } }
    }))
    await element.updateComplete
    await element.onSaveClick()

    expect(planGrant.mock.calls.map(([, subject]) => subject)).toEqual([
      { type: 'agent', iri: agent },
      { type: 'agentGroup', iri: group },
      { type: 'agentClass', iri: agentClass }
    ])
    document.body.removeChild(element)
  })

  it('persists a changed shared access grant on save', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.accessGrants = [{
      agent: ['https://alice.example.com/profile/card.ttl#me'],
      agentGroup: [],
      agentClass: [],
      mode: ['Read']
    }]

    document.body.appendChild(element)
    await element.updateComplete

    const grantRoleSelect = element.shadowRoot.querySelector('solid-ui-combobox.access-grants-role--editable')
    grantRoleSelect.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { option: { value: 'Editor', label: 'Editor' } }
    }))

    await element.onSaveClick()

    expect(planGrant).toHaveBeenCalledWith(
      element.subjectUri,
      { type: 'agent', iri: 'https://alice.example.com/profile/card.ttl#me' },
      ['Read', 'Write']
    )

    document.body.removeChild(element)
  })

  it('aborts saving when principal lookup fails', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.principalInputValue = 'not-a-principal'
    element.publicAccessRoleValue = 'Viewer'

    document.body.appendChild(element)
    await element.updateComplete

    await element.onSaveClick()

    expect(planGrant).not.toHaveBeenCalled()
    expect(planRevoke).not.toHaveBeenCalled()
    expect(applyPlan).not.toHaveBeenCalled()
    expect(element.principalInputValue).toBe('not-a-principal')
    expect(element.failed).toBe(true)

    document.body.removeChild(element)
  })

  it('applies a shared row change to every subject represented by the authorization', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.accessGrants = [{
      agent: ['https://alice.example.com/profile/card.ttl#me'],
      agentGroup: ['https://example.com/group'],
      agentClass: [],
      mode: ['Read']
    }]

    document.body.appendChild(element)
    await element.updateComplete

    const grantRoleSelect = element.shadowRoot.querySelector('solid-ui-combobox.access-grants-role--editable')
    grantRoleSelect.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { option: { value: 'Editor', label: 'Editor' } }
    }))

    await element.onSaveClick()

    expect(planGrant).toHaveBeenNthCalledWith(
      1,
      element.subjectUri,
      { type: 'agent', iri: 'https://alice.example.com/profile/card.ttl#me' },
      ['Read', 'Write']
    )
    expect(planGrant).toHaveBeenNthCalledWith(
      2,
      element.subjectUri,
      { type: 'agentGroup', iri: 'https://example.com/group' },
      ['Read', 'Write']
    )
    expect(planRevoke).not.toHaveBeenCalled()
    expect(applyPlan).toHaveBeenCalledTimes(2)

    document.body.removeChild(element)
  })
})
