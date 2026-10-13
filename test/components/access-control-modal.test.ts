// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { isAbsoluteHttpUri, isOriginUrl } from '../../src/components/access-control-modal/helpers'

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
    classifyAccessControlSubject.mockImplementation(async (principal: string) => ({
      kind: 'agent' as const,
      subjectValue: principal
    }))
    planGrant.mockResolvedValue({ target: 'https://example.com/resource.ttl.acl', deletes: [], inserts: [] })
    planPublicRead.mockResolvedValue({ target: 'https://example.com/resource.ttl.acl', deletes: [], inserts: [] })
    applyPlan.mockResolvedValue(new Response('ok', { status: 200 }))
    await import('../../src/components/access-control-modal/AccessControlModal')
  })

  describe('access-control URL predicates', () => {
    it.each([
      'http://example.com',
      'https://example.com/path',
      'https://example.com:8443/resource'
    ])('accepts an absolute HTTP URI: %s', value => {
      expect(isAbsoluteHttpUri(value)).toBe(true)
    })

    it.each([
      'example.com',
      '/relative/path',
      'mailto:alice@example.com',
      'not a URL'
    ])('rejects a non-absolute HTTP URI: %s', value => {
      expect(isAbsoluteHttpUri(value)).toBe(false)
    })

    it.each([
      'http://example.com',
      'https://example.com/',
      'https://example.com:8443'
    ])('recognizes an origin URL: %s', value => {
      expect(isOriginUrl(value)).toBe(true)
    })

    it.each([
      'https://example.com/path',
      'https://example.com?query=value',
      'https://user:password@example.com'
    ])('rejects a URL with non-origin components: %s', value => {
      expect(isOriginUrl(value)).toBe(false)
    })
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

  it('rejects an HTTP URL that cannot be classified', async () => {
    classifyAccessControlSubject.mockResolvedValueOnce(undefined)

    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.principalInputValue = 'https://unknown.example/resource'

    await element.onSubmit(new Event('submit'))

    expect(element.pendingAccessGrants).toEqual([])
    expect(element.inputError).toContain('Could not verify this access target')
  })

  it.each([
    ['app.example', 'https://app.example'],
    ['www.sharonstratsianis.com', 'https://www.sharonstratsianis.com']
  ])('queues a bare origin as %s', async (input, origin) => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.principalInputValue = input

    await element.onSubmit(new Event('submit'))

    expect(classifyAccessControlSubject).not.toHaveBeenCalled()
    expect(element.pendingAccessGrants).toEqual([
      expect.objectContaining({
        subjectType: 'origin',
        subjectValue: origin
      })
    ])
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

  it('passes a queued origin grant to planGrant on save', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.principalInputValue = 'www.sharonstratsianis.com'
    element.addAccessRoleValue = 'Editor'

    await element.onSaveClick()

    expect(planGrant).toHaveBeenCalledWith(
      'https://example.com/resource.ttl',
      {
        type: 'origin',
        iri: 'https://www.sharonstratsianis.com'
      },
      ['Read', 'Write']
    )
    expect(applyPlan).toHaveBeenCalledTimes(1)
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
    expect(element.saveErrors).toEqual([])
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

  it('attempts every queued change and reports only the failed changes', async () => {
    const failedDuringPlanning = new Set([2, 7])
    const failedDuringApply = new Set([4, 10])
    const grants = Array.from({ length: 12 }, (_, index) => ({
      subjectType: 'agent',
      subjectValue: `https://example.com/agent-${index}`,
      role: 'Editor',
      label: `Agent ${index}`
    }))

    planGrant.mockImplementation(async (subjectUri: string, subject: { iri: string }) => {
      const index = Number(subject.iri.match(/agent-(\d+)$/)?.[1])
      if (failedDuringPlanning.has(index)) {
        throw new Error(`planning failed for ${index}`)
      }

      return { target: `${subject.iri}.acl`, deletes: [], inserts: [] }
    })
    applyPlan.mockImplementation(async (plan: { target: string }) => {
      const index = Number(plan.target.match(/agent-(\d+)\.acl$/)?.[1])
      if (failedDuringApply.has(index)) {
        throw new Error(`apply failed for ${index}`)
      }

      return new Response('ok', { status: 200 })
    })

    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.pendingAccessGrants = grants
    document.body.appendChild(element)
    await element.updateComplete

    await element.onSaveClick()
    await element.updateComplete

    expect(planGrant).toHaveBeenCalledTimes(grants.length)
    expect(applyPlan).toHaveBeenCalledTimes(grants.length - failedDuringPlanning.size)

    const errors = element.shadowRoot.querySelector('solid-ui-access-control-errors')
    await errors.updateComplete
    const saveErrorState = errors.shadowRoot.querySelector('solid-ui-error-state')
    expect(saveErrorState).not.toBeNull()
    const errorItems = [...saveErrorState.querySelectorAll('li')].map((item: Element) => item.textContent)
    const errorLabels = [...saveErrorState.querySelectorAll('li .access-control-save-error-label')].map((label: Element) => label.textContent)
    const errorText = errorItems.join(' ')
    expect(errorLabels).toEqual(['Agent 2', 'Agent 4', 'Agent 7', 'Agent 10'])
    expect(errorText.match(/Could not grant Editor/g)).toHaveLength(4)

    const saveButton = [...element.shadowRoot.querySelectorAll('solid-ui-button')]
      .find((button: Element) => button.textContent?.includes('Save Changes')) as HTMLElement
    expect(saveButton.hasAttribute('disabled')).toBe(true)

    document.body.removeChild(element)
  })

  it('keeps the dialog open with partial failures and shows the successful ACL change', async () => {
    const successfulGrant = {
      subjectType: 'agent',
      subjectValue: 'https://example.com/successful-agent',
      role: 'Editor',
      label: 'Successful agent'
    }
    const failedGrant = {
      subjectType: 'agent',
      subjectValue: 'https://example.com/failed-agent',
      role: 'Editor',
      label: 'Failed agent'
    }
    planGrant.mockImplementation(async (_subjectUri: string, subject: { iri: string }) => {
      if (subject.iri === failedGrant.subjectValue) {
        throw new Error('grant failed')
      }
      return { target: `${subject.iri}.acl`, deletes: [], inserts: [] }
    })

    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.pendingAccessGrants = [successfulGrant, failedGrant]
    document.body.appendChild(element)
    await element.updateComplete
    const close = vi.fn()
    window.addEventListener('solid-ui:close-dialog', close)

    await element.onSaveClick()
    await element.updateComplete

    // Partial saves do not reconcile accessGrants; the successful applyPlan call
    // is the strongest observable ACL success while the dialog remains open.
    expect(planGrant).toHaveBeenCalledTimes(2)
    expect(applyPlan).toHaveBeenCalledTimes(1)
    expect(applyPlan).toHaveBeenCalledWith(expect.objectContaining({
      target: `${successfulGrant.subjectValue}.acl`
    }))
    expect(close).not.toHaveBeenCalled()
    const errors = element.shadowRoot.querySelector('solid-ui-access-control-errors')
    await errors.updateComplete
    expect(errors.shadowRoot.querySelector('solid-ui-error-state')).not.toBeNull()
    expect([...errors.shadowRoot.querySelectorAll('solid-ui-error-state li .access-control-save-error-label')].map((label: Element) => label.textContent))
      .toEqual(['Failed agent'])
    const saveButton = [...element.shadowRoot.querySelectorAll('solid-ui-button')]
      .find((button: Element) => button.textContent?.includes('Save Changes')) as HTMLElement
    expect(saveButton.hasAttribute('disabled')).toBe(true)

    document.body.removeChild(element)
  })

  it('keeps the dialog open and reports every failure when all changes fail', async () => {
    const grants = [0, 1, 2].map(index => ({
      subjectType: 'agent',
      subjectValue: `https://example.com/failed-agent-${index}`,
      role: 'Editor',
      label: `Failed agent ${index}`
    }))
    planGrant.mockRejectedValue(new Error('all changes failed'))

    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.pendingAccessGrants = grants
    document.body.appendChild(element)
    await element.updateComplete
    const close = vi.fn()
    window.addEventListener('solid-ui:close-dialog', close)

    await element.onSaveClick()
    await element.updateComplete

    expect(planGrant).toHaveBeenCalledTimes(grants.length)
    expect(applyPlan).not.toHaveBeenCalled()
    expect(close).not.toHaveBeenCalled()
    const errors = element.shadowRoot.querySelector('solid-ui-access-control-errors')
    await errors.updateComplete
    expect([...errors.shadowRoot.querySelectorAll('solid-ui-error-state li .access-control-save-error-label')].map((label: Element) => label.textContent))
      .toEqual(['Failed agent 0', 'Failed agent 1', 'Failed agent 2'])

    document.body.removeChild(element)
  })

  it('closes the dialog when all changes succeed', async () => {
    const grants = [0, 1].map(index => ({
      subjectType: 'agent',
      subjectValue: `https://example.com/successful-agent-${index}`,
      role: 'Editor',
      label: `Successful agent ${index}`
    }))

    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.pendingAccessGrants = grants
    document.body.appendChild(element)
    await element.updateComplete
    const close = vi.fn()
    window.addEventListener('solid-ui:close-dialog', close)

    await element.onSaveClick()

    expect(applyPlan).toHaveBeenCalledTimes(grants.length)
    expect(close).toHaveBeenCalledTimes(1)
    expect(element.pendingAccessGrants).toEqual([])

    document.body.removeChild(element)
  })

  it('reports an unexpected outer save failure as a general error', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.pendingAccessGrants = [{
      subjectType: 'agent',
      subjectValue: 'https://example.com/agent',
      role: 'Editor',
      label: 'Agent'
    }]
    document.body.appendChild(element)
    await element.updateComplete
    const close = vi.fn()
    window.addEventListener('solid-ui:close-dialog', close)
    element.createAccessSubject = () => {
      throw new Error('unexpected save failure')
    }

    await element.onSaveClick()
    await element.updateComplete

    expect(close).not.toHaveBeenCalled()
    const errors = element.shadowRoot.querySelector('solid-ui-access-control-errors')
    await errors.updateComplete
    const errorState = errors.shadowRoot.querySelector('solid-ui-error-state')
    expect(errorState).not.toBeNull()
    expect(errorState.textContent).toContain('Could not save access changes')
    expect([...errorState.querySelectorAll('li .access-control-save-error-label')].map((label: Element) => label.textContent))
      .toEqual(['Access changes'])

    document.body.removeChild(element)
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

    const addAccess = element.shadowRoot.querySelector('solid-ui-access-control-add-access')
    await addAccess.updateComplete
    addAccess.dispatchEvent(new CustomEvent('role-changed', {
      bubbles: true,
      composed: true,
      detail: {
        role: 'Editor'
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

    const generalAccess = element.shadowRoot.querySelector('solid-ui-access-control-general-access')
    await generalAccess.updateComplete
    const sharedRoleSelect = generalAccess.shadowRoot.querySelector('solid-ui-combobox.access-role-select--authenticated')
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
      origin: [],
      mode: ['Read']
    }]

    document.body.appendChild(element)
    await element.updateComplete

    const saveButton = [...element.shadowRoot.querySelectorAll('solid-ui-button')]
      .find((button: Element) => button.textContent?.includes('Save Changes')) as HTMLElement
    expect(saveButton.hasAttribute('disabled')).toBe(true)

    const sharedAccess = element.shadowRoot.querySelector('solid-ui-access-control-shared-access')
    await sharedAccess.updateComplete
    const grantRoleSelect = sharedAccess.shadowRoot.querySelector('solid-ui-combobox.access-grants-role--editable')
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

    const addAccess = element.shadowRoot.querySelector('solid-ui-access-control-add-access')
    const generalAccess = element.shadowRoot.querySelector('solid-ui-access-control-general-access')
    await generalAccess.updateComplete
    const authenticatedRoleSelect = generalAccess.shadowRoot.querySelector('solid-ui-combobox.access-role-select--authenticated')
    const publicRoleSelect = generalAccess.shadowRoot.querySelector('solid-ui-combobox.access-role-select--public')
    await addAccess.updateComplete
    const addRoleSelect = addAccess.shadowRoot.querySelector('solid-ui-combobox.access-role-select--top')

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
      origin: [],
      mode: ['Read']
    }]

    document.body.appendChild(element)
    await element.updateComplete

    const sharedAccess = element.shadowRoot.querySelector('solid-ui-access-control-shared-access')
    await sharedAccess.updateComplete
    const grantRoleSelect = sharedAccess.shadowRoot.querySelector('solid-ui-combobox.access-grants-role--editable')
    const grantOptions = [...grantRoleSelect.querySelectorAll('solid-ui-combobox-option')].map((option: Element) => option.textContent?.trim())

    expect(grantOptions).toContain('Remove')
    expect(grantOptions).not.toContain('No Access')

    document.body.removeChild(element)
  })

  it('keeps authenticated and public grants out of the shared-access list', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.accessGrants = [
      {
        agent: ['https://alice.example.com/profile/card.ttl#me'],
        agentGroup: [],
        agentClass: [],
        origin: [],
        mode: ['Read']
      },
      {
        agent: [],
        agentGroup: [],
        agentClass: ['http://www.w3.org/ns/auth/acl#AuthenticatedAgent'],
        origin: [],
        mode: ['Read', 'Write']
      },
      {
        agent: [],
        agentGroup: [],
        agentClass: ['http://xmlns.com/foaf/0.1/Agent'],
        origin: [],
        mode: ['Read']
      }
    ]

    document.body.appendChild(element)
    await element.updateComplete

    const sharedAccess = element.shadowRoot.querySelector('solid-ui-access-control-shared-access')
    await sharedAccess.updateComplete
    const sharedAccessLabels = [...sharedAccess.shadowRoot.querySelectorAll('.access-grants-list h3')].map((label: Element) => label.textContent?.trim())
    expect(sharedAccessLabels).toEqual(['card.ttl'])

    const searchOptions = [...sharedAccess.shadowRoot.querySelectorAll('solid-ui-combobox.access-grants-search-input solid-ui-combobox-option')]
      .map((option: Element) => option.textContent?.trim())
    expect(searchOptions).toEqual(['card.ttl'])

    document.body.removeChild(element)
  })

  it.each([
    'http://www.w3.org/ns/auth/acl#AuthenticatedAgent',
    'http://xmlns.com/foaf/0.1/Agent'
  ])('retains non-general subjects from an authorization containing %s', async (generalClass) => {
    const { getAccessGrantViewModels, getAuthorizationSubjectLabel } = await import('../../src/components/access-control-modal/accessGrantDrafts')
    const element = document.createElement('solid-ui-access-control-modal') as any
    const agent = 'https://alice.example.com/profile/card.ttl#me'
    const group = 'https://example.com/group'
    const agentClass = 'https://example.com/team'
    element.subjectUri = 'https://example.com/resource.ttl'
    element.accessGrants = [{
      agent: [agent],
      agentGroup: [group],
      agentClass: [generalClass, agentClass],
      origin: [],
      mode: ['Read']
    }]

    document.body.appendChild(element)
    await element.updateComplete
    await element.refreshAccessGrantLabels()
    await element.updateComplete

    const expectedLabel = getAuthorizationSubjectLabel({
      agent: [agent],
      agentGroup: [group],
      agentClass: [agentClass],
      origin: [],
      mode: ['Read']
    })
    const entries = getAccessGrantViewModels(element.accessGrantDrafts).filter(({ subjects }) => subjects.length > 0)
    expect(entries).toHaveLength(1)
    expect(entries[0].authorization.agentClass).toEqual([agentClass])
    expect(entries[0].subjectLabel).toBe(expectedLabel)
    expect(element.accessGrants[0].agentClass).toEqual([generalClass, agentClass])
    const sharedAccess = element.shadowRoot.querySelector('solid-ui-access-control-shared-access')
    await sharedAccess.updateComplete
    expect(sharedAccess.shadowRoot.querySelector('.access-grants-list h3').textContent.trim()).toBe(expectedLabel)
    const searchOptions = [...sharedAccess.shadowRoot.querySelectorAll('solid-ui-combobox.access-grants-search-input solid-ui-combobox-option')]
      .map((option: Element) => option.textContent?.trim())
    expect(searchOptions).toEqual([expectedLabel])

    sharedAccess.searchValue = 'card.ttl'
    await sharedAccess.updateComplete
    expect(sharedAccess.shadowRoot.querySelector('.access-grants-list h3').textContent.trim()).toBe(expectedLabel)

    const roleSelect = sharedAccess.shadowRoot.querySelector('.access-grants-list solid-ui-combobox')
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
      origin: [],
      mode: ['Read']
    }]

    document.body.appendChild(element)
    await element.updateComplete

    const sharedAccess = element.shadowRoot.querySelector('solid-ui-access-control-shared-access')
    await sharedAccess.updateComplete
    const grantRoleSelect = sharedAccess.shadowRoot.querySelector('solid-ui-combobox.access-grants-role--editable')
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
    classifyAccessControlSubject.mockResolvedValueOnce(undefined)
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
    expect(element.inputError).toBe('Could not verify this access target')

    document.body.removeChild(element)
  })

  it('applies a shared row change to every subject represented by the authorization', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.accessGrants = [{
      agent: ['https://alice.example.com/profile/card.ttl#me'],
      agentGroup: ['https://example.com/group'],
      agentClass: [],
      origin: [],
      mode: ['Read']
    }]

    document.body.appendChild(element)
    await element.updateComplete

    const sharedAccess = element.shadowRoot.querySelector('solid-ui-access-control-shared-access')
    await sharedAccess.updateComplete
    const grantRoleSelect = sharedAccess.shadowRoot.querySelector('solid-ui-combobox.access-grants-role--editable')
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
