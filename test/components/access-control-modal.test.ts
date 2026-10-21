// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { sym } from 'rdflib'
import type { AccessMode } from 'solid-logic'
import { isAbsoluteHttpUri, isOriginUrl } from '../../src/components/access-control-modal/helpers'

const planGrant = vi.fn()
const planGrantContainer = vi.fn()
const planGrantContainerContents = vi.fn()
const planGrantContainerAndContents = vi.fn()
const planRevoke = vi.fn()
const planPublicRead = vi.fn()
const applyPlan = vi.fn()
const classifyAccessControlSubject = vi.fn()
const findAccessGrants = vi.fn()
const findEffectiveAcl = vi.fn()
const resetToDefault = vi.fn()
const isProtectedResource = vi.fn()
const load = vi.fn()

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
        planGrantContainer,
        planGrantContainerContents,
        planGrantContainerAndContents,
        planPublicRead,
        planRevoke,
        applyPlan,
        findAccessGrants,
        findEffectiveAcl,
        resetToDefault,
        isProtectedResource
      },
      store: {
        ...actual.solidLogicSingleton.store,
        fetcher: {
          ...actual.solidLogicSingleton.store.fetcher,
          load
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
    planGrantContainer.mockReset()
    planGrantContainerContents.mockReset()
    planGrantContainerAndContents.mockReset()
    planRevoke.mockReset()
    planPublicRead.mockReset()
    applyPlan.mockReset()
    classifyAccessControlSubject.mockReset()
    findAccessGrants.mockReset()
    findEffectiveAcl.mockReset()
    resetToDefault.mockReset()
    isProtectedResource.mockReset()
    load.mockReset()
    classifyAccessControlSubject.mockImplementation(async (principal: string) => ({
      kind: 'agent' as const,
      subjectValue: principal
    }))
    planGrant.mockResolvedValue({ target: 'https://example.com/resource.ttl.acl', deletes: [], inserts: [] })
    planGrantContainer.mockResolvedValue({ target: 'https://example.com/container/.acl', deletes: [], inserts: [] })
    planGrantContainerContents.mockResolvedValue({ target: 'https://example.com/container/.acl', deletes: [], inserts: [] })
    planGrantContainerAndContents.mockResolvedValue({ target: 'https://example.com/container/.acl', deletes: [], inserts: [] })
    planPublicRead.mockResolvedValue({ target: 'https://example.com/resource.ttl.acl', deletes: [], inserts: [] })
    applyPlan.mockResolvedValue(new Response('ok', { status: 200 }))
    findAccessGrants.mockResolvedValue([])
    findEffectiveAcl.mockResolvedValue({ inherited: true, authorizations: [] })
    resetToDefault.mockResolvedValue(new Response(null, { status: 204 }))
    isProtectedResource.mockReturnValue(false)
    load.mockResolvedValue(undefined)
    await import('../../src/components/access-control-modal/AccessControlModal')
    await import('../../src/components/access-control-modal/AccessControlErrors')
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

  it('forwards the error-state close event only once', async () => {
    const element = document.createElement('solid-ui-access-control-errors') as any
    element.errors = [{
      action: 'grant',
      targetUri: 'https://example.com/alice#me',
      label: 'Alice',
      role: 'Editor',
      message: 'Grant failed'
    }]
    const close = vi.fn()
    element.addEventListener('close', close)
    document.body.appendChild(element)
    await element.updateComplete

    const errorState = element.shadowRoot.querySelector('solid-ui-error-state')
    await errorState.updateComplete
    const closeButton = errorState.shadowRoot.querySelector('solid-ui-button.close-button')
    const innerButton = closeButton.shadowRoot.querySelector('button')
    innerButton.click()

    expect(close).toHaveBeenCalledTimes(1)
    document.body.removeChild(element)
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

  it('does not show a stale validation error after newer input', async () => {
    let resolveClassification!: (value: undefined) => void
    classifyAccessControlSubject.mockImplementationOnce(() => new Promise(resolve => {
      resolveClassification = resolve
    }))

    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.principalInputValue = 'https://old.example.com/profile/card#me'

    const submitPromise = element.onSubmit(new Event('submit'))
    element.principalInputValue = 'https://new.example.com/profile/card#me'
    resolveClassification(undefined)
    await submitPromise

    expect(element.principalInputValue).toBe('https://new.example.com/profile/card#me')
    expect(element.inputError).toBe('')
  })

  it('does not clear a current validation error when an older lookup succeeds', async () => {
    let resolveOldLookup!: (value: { kind: 'agent', subjectValue: string }) => void
    classifyAccessControlSubject
      .mockImplementationOnce(() => new Promise(resolve => {
        resolveOldLookup = resolve
      }))
      .mockResolvedValueOnce(undefined)

    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.principalInputValue = 'https://old.example.com/profile/card#me'
    const oldSubmitPromise = element.onSubmit(new Event('submit'))

    element.principalInputValue = 'not-a-principal'
    await element.onSubmit(new Event('submit'))
    expect(element.inputError).toContain('Could not verify this access target')

    resolveOldLookup({
      kind: 'agent',
      subjectValue: 'https://old.example.com/profile/card#me'
    })
    await oldSubmitPromise

    expect(element.inputError).toContain('Could not verify this access target')
  })

  it('uses the fallback message when a related lookup throws without a message', async () => {
    load.mockRejectedValueOnce(new Error(''))

    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.principalInputValue = 'https://alice.example.com/profile/card.ttl#me'

    await element.onSubmit(new Event('submit'))

    expect(element.inputError).toBe('Could not verify this access target')
  })

  it('shows a related lookup failure when adding an access target directly', async () => {
    load.mockRejectedValueOnce(new Error('related document failed'))

    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.principalInputValue = 'https://alice.example.com/profile/card.ttl#me'

    await element.onSubmit(new Event('submit'))

    expect(element.inputError).toBe('related document failed')
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

  it('does not apply changes while the effective ACL context is loading', async () => {
    let resolveContext!: (context: { inherited: boolean, authorizations: [] }) => void
    findEffectiveAcl.mockImplementationOnce(() => new Promise(resolve => {
      resolveContext = resolve
    }))

    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.pendingAccessGrants = [{
      subjectType: 'agent',
      subjectValue: 'https://alice.example.com/profile/card.ttl#me',
      role: 'Editor',
      label: 'Alice'
    }]
    document.body.appendChild(element)
    await element.updateComplete

    const saveButton = [...element.shadowRoot.querySelectorAll('solid-ui-button')]
      .find((button: Element) => button.textContent?.includes('Save Changes')) as HTMLElement
    expect(saveButton.hasAttribute('disabled')).toBe(true)

    const savePromise = element.onSaveClick()
    await Promise.resolve()
    expect(applyPlan).not.toHaveBeenCalled()

    resolveContext({ inherited: true, authorizations: [] })
    await savePromise

    expect(applyPlan).toHaveBeenCalledTimes(1)
    document.body.removeChild(element)
  })

  it('shows a retry action when the effective ACL context fails to load', async () => {
    findEffectiveAcl.mockRejectedValueOnce(new Error('ACL service unavailable'))

    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.pendingAccessGrants = [{
      subjectType: 'agent',
      subjectValue: 'https://alice.example.com/profile/card.ttl#me',
      role: 'Editor',
      label: 'Alice'
    }]
    document.body.appendChild(element)
    await element.updateComplete
    await vi.waitFor(() => {
      expect(element.accessContextError).toBe('ACL service unavailable')
    })

    const errorState = element.shadowRoot.querySelector('solid-ui-error-state') as any
    expect(errorState.message).toBe('ACL service unavailable')
    const retryButton = [...element.shadowRoot.querySelectorAll('solid-ui-button')]
      .find((button: Element) => button.textContent?.includes('Retry')) as HTMLElement
    expect(retryButton).not.toBeUndefined()
    expect(applyPlan).not.toHaveBeenCalled()

    findEffectiveAcl.mockResolvedValueOnce({ inherited: true, authorizations: [] })
    retryButton.click()
    await vi.waitFor(() => {
      expect(element.accessContext).toBeDefined()
    })

    expect(element.accessContextError).toBe('')
    expect(element.accessContext).toBeDefined()
    document.body.removeChild(element)
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

  it('describes revoke failures as removing access', async () => {
    planRevoke.mockRejectedValue(new Error('revoke failed'))
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.pendingAccessGrants = [{
      subjectType: 'agent',
      subjectValue: 'https://alice.example.com/profile/card.ttl#me',
      role: 'No Access',
      label: 'Alice'
    }]
    document.body.appendChild(element)

    await element.onSaveClick()
    await element.updateComplete

    const errors = element.shadowRoot.querySelector('solid-ui-access-control-errors')
    await errors.updateComplete
    expect(errors.shadowRoot.querySelector('li').textContent).toContain('Could not remove access')
    document.body.removeChild(element)
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
    findAccessGrants.mockResolvedValue([{
      agent: [successfulGrant.subjectValue],
      agentGroup: [],
      agentClass: [],
      origin: [],
      mode: ['Read', 'Write']
    }])

    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.pendingAccessGrants = [successfulGrant, failedGrant]
    document.body.appendChild(element)
    await element.updateComplete
    const close = vi.fn()
    window.addEventListener('solid-ui:close-dialog', close)

    await element.onSaveClick()
    await element.updateComplete

    // The refreshed authorizations replace pending drafts, so successful
    // changes are visible while failed changes cannot be retried in-place.
    expect(planGrant).toHaveBeenCalledTimes(2)
    expect(applyPlan).toHaveBeenCalledTimes(1)
    expect(applyPlan).toHaveBeenCalledWith(expect.objectContaining({
      target: `${successfulGrant.subjectValue}.acl`
    }))
    expect(findAccessGrants).toHaveBeenCalledWith(element.subjectUri)
    expect(element.pendingAccessGrants).toEqual([])
    expect(element.accessGrants).toEqual([{
      agent: [successfulGrant.subjectValue],
      agentGroup: [],
      agentClass: [],
      origin: [],
      mode: ['Read', 'Write']
    }])
    expect(close).not.toHaveBeenCalled()
    const errors = element.shadowRoot.querySelector('solid-ui-access-control-errors')
    await errors.updateComplete
    expect(errors.shadowRoot.querySelector('solid-ui-error-state')).not.toBeNull()
    expect([...errors.shadowRoot.querySelectorAll('solid-ui-error-state li .access-control-save-error-label')].map((label: Element) => label.textContent))
      .toEqual(['Failed agent'])
    expect(errors.shadowRoot.querySelector('solid-ui-error-state').getAttribute('message'))
      .toContain('Close this dialog and reopen it if you want to try again.')
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
    findAccessGrants.mockResolvedValue([{
      agent: ['https://example.com/current-agent'],
      agentGroup: [],
      agentClass: [],
      origin: [],
      mode: ['Read'] as AccessMode[]
    }])

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
    expect(findAccessGrants).toHaveBeenCalledWith(element.subjectUri)
    expect(element.accessGrants).toEqual([{
      agent: ['https://example.com/current-agent'],
      agentGroup: [],
      agentClass: [],
      origin: [],
      mode: ['Read'] as AccessMode[]
    }])
    expect(close).not.toHaveBeenCalled()
    const errors = element.shadowRoot.querySelector('solid-ui-access-control-errors')
    await errors.updateComplete
    expect([...errors.shadowRoot.querySelectorAll('solid-ui-error-state li .access-control-save-error-label')].map((label: Element) => label.textContent))
      .toEqual(['Failed agent 0', 'Failed agent 1', 'Failed agent 2'])

    document.body.removeChild(element)
  })

  it('clears staged changes and explains when partial-save reconciliation fails', async () => {
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
    findAccessGrants.mockRejectedValue(new Error('ACL refresh failed'))

    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'
    element.pendingAccessGrants = [successfulGrant, failedGrant]
    document.body.appendChild(element)
    await element.updateComplete

    await element.onSaveClick()
    await element.updateComplete

    expect(findAccessGrants).toHaveBeenCalledWith(element.subjectUri)
    expect(element.pendingAccessGrants).toEqual([])
    expect(element.successfulChangesRefreshed).toBe(false)
    const errors = element.shadowRoot.querySelector('solid-ui-access-control-errors')
    await errors.updateComplete
    expect(errors.shadowRoot.querySelector('solid-ui-error-state').getAttribute('message'))
      .toContain('Some changes may have been saved, but we could not refresh the Shared with list.')
    const saveButton = [...element.shadowRoot.querySelectorAll('solid-ui-button')]
      .find((button: Element) => button.textContent?.includes('Save Changes')) as HTMLElement
    expect(saveButton.hasAttribute('disabled')).toBe(true)

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
      get subjectType () {
        throw new Error('unexpected save failure')
      },
      subjectValue: 'https://example.com/agent',
      role: 'Editor',
      label: 'Agent'
    }]
    document.body.appendChild(element)
    await element.updateComplete
    const close = vi.fn()
    window.addEventListener('solid-ui:close-dialog', close)
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

    expect(element.getDialogTitle()).toBe('Manage Access of "this resource"')
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

  it('loads every group document before refreshing grant labels', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.accessGrants = [{
      agent: [],
      agentGroup: [
        'https://example.com/groups/first',
        'https://example.com/groups/second#members'
      ],
      agentClass: [],
      origin: [],
      mode: ['Read']
    }]

    document.body.appendChild(element)
    await element.updateComplete
    load.mockClear()

    await element.refreshAccessGrantLabels()

    expect(load).toHaveBeenCalledWith(sym('https://example.com/groups/first').doc())
    expect(load).toHaveBeenCalledWith(sym('https://example.com/groups/second#members').doc())

    document.body.removeChild(element)
  })

  it('refreshes labels for a filtered container grant', async () => {
    const folder = 'https://example.com/folder/'
    const authorization = {
      id: `${folder}.acl#group`,
      agent: [],
      agentGroup: ['https://example.com/groups/team'],
      agentClass: [],
      origin: [],
      mode: ['Read'],
      accessTo: [folder],
      default: [folder]
    }
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = folder
    element.accessContext = { resource: folder, inherited: false, authorizations: [authorization] }
    element.accessGrants = [authorization]
    document.body.appendChild(element)
    await element.updateComplete
    element.accessGrantDrafts = [{
      id: authorization.id,
      authorization,
      role: 'Viewer',
      initialRole: 'Viewer',
      subjectLabel: 'stale label',
      subjects: [{
        type: 'agentGroup',
        iri: authorization.agentGroup[0]
      }]
    }]

    await element.refreshAccessGrantLabels()

    expect(element.accessGrantDrafts[0].subjectLabel).not.toBe('stale label')
    document.body.removeChild(element)
  })

  it('ignores an access context that resolves after the resource changes', async () => {
    let resolveFirst!: (context: any) => void
    let resolveSecond!: (context: any) => void
    findEffectiveAcl
      .mockImplementationOnce(() => new Promise(resolve => { resolveFirst = resolve }))
      .mockImplementationOnce(() => new Promise(resolve => { resolveSecond = resolve }))

    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/first.ttl'
    const firstLoad = element.loadAccessContext()
    element.subjectUri = 'https://example.com/second.ttl'
    const secondLoad = element.loadAccessContext()

    resolveSecond({ resource: 'https://example.com/second.ttl', inherited: true, authorizations: [] })
    await secondLoad
    resolveFirst({ resource: 'https://example.com/first.ttl', inherited: false, authorizations: [] })
    await firstLoad

    expect(element.accessContext.resource).toBe('https://example.com/second.ttl')
  })

  it('replaces a duplicate pending principal with its latest role', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/resource.ttl'

    await element.queuePendingPrincipal('https://alice.example.com/profile/card.ttl#me', 'Viewer')
    await element.queuePendingPrincipal('https://alice.example.com/profile/card.ttl#me', 'Editor')

    expect(element.pendingAccessGrants).toEqual([
      expect.objectContaining({
        subjectValue: 'https://alice.example.com/profile/card.ttl#me',
        role: 'Editor'
      })
    ])
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

  it('saves a file directly without an apply-to-contents prompt', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/file.ttl'
    element.pendingAccessGrants = [{
      subjectType: 'agent',
      subjectValue: 'https://example.com/alice#me',
      role: 'Viewer',
      label: 'Alice'
    }]

    await element.onSaveClick()

    expect(planGrant).toHaveBeenCalledWith(
      element.subjectUri,
      { type: 'agent', iri: 'https://example.com/alice#me' },
      ['Read']
    )
  })

  it('uses the common container-and-contents scope by default', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/folder/'
    element.pendingAccessGrants = [{
      subjectType: 'agent',
      subjectValue: 'https://example.com/alice#me',
      role: 'Viewer',
      label: 'Alice'
    }]

    await element.onSaveClick()

    expect(planGrant).not.toHaveBeenCalled()
    expect(planGrantContainer).not.toHaveBeenCalled()
    expect(planGrantContainerContents).not.toHaveBeenCalled()
    expect(planGrantContainerAndContents).toHaveBeenCalledWith(
      element.subjectUri,
      { type: 'agent', iri: 'https://example.com/alice#me' },
      ['Read']
    )
  })

  it('uses the advanced folder-access scope when selected', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/folder/'
    element.pendingAccessGrants = [{
      subjectType: 'agent',
      subjectValue: 'https://example.com/alice#me',
      role: 'Viewer',
      label: 'Alice'
    }]

    element.advancedSharingOpen = true
    element.containerScope = 'folder'
    await element.onSaveClick()

    expect(planGrantContainer).toHaveBeenCalledWith(
      element.subjectUri,
      { type: 'agent', iri: 'https://example.com/alice#me' },
      ['Read']
    )
    expect(planGrantContainerContents).not.toHaveBeenCalled()
  })

  it('uses the advanced contents-defaults scope when selected', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/folder/'
    element.pendingAccessGrants = [{
      subjectType: 'agent',
      subjectValue: 'https://example.com/alice#me',
      role: 'Viewer',
      label: 'Alice'
    }]

    element.advancedSharingOpen = true
    element.containerScope = 'contents'
    await element.onSaveClick()

    expect(planGrantContainerContents).toHaveBeenCalledWith(
      element.subjectUri,
      { type: 'agent', iri: 'https://example.com/alice#me' },
      ['Read']
    )
    expect(planGrantContainer).not.toHaveBeenCalled()
  })

  it('offers advanced folder-versus-contents sharing for containers', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/folder/'
    element.accessContext = { inherited: true, effectiveContainer: 'https://example.com/' }
    document.body.appendChild(element)
    await element.updateComplete

    element.advancedSharingOpen = true
    await element.updateComplete
    expect(element.shadowRoot.textContent).toContain('different access requirements')
    expect(element.shadowRoot.textContent).toContain('Folder Only')
    expect(element.shadowRoot.textContent).toContain('Contents Only')

    document.body.removeChild(element)
  })

  it('defaults containers to folder-and-contents without a scope summary', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/folder/'
    document.body.appendChild(element)
    await element.updateComplete

    expect(element.containerScope).toBe('folder+contents')
    expect(element.shadowRoot.querySelector('.access-control-scope-summary')).toBeNull()

    document.body.removeChild(element)
  })

  it.each([
    ['folder+contents', ['https://example.com/both#me']],
    ['folder', ['https://example.com/folder#me']],
    ['contents', ['https://example.com/contents#me']]
  ] as const)('shows only %s authorizations in Shared with', async (scope, expectedSubjects) => {
    const folder = 'https://example.com/folder/'
    const grants = [
      { agent: ['https://example.com/folder#me'], agentGroup: [], agentClass: [], origin: [], mode: ['Read'] as AccessMode[], accessTo: [folder], default: [] },
      { agent: ['https://example.com/contents#me'], agentGroup: [], agentClass: [], origin: [], mode: ['Read'] as AccessMode[], accessTo: [], default: [folder] },
      { agent: ['https://example.com/both#me'], agentGroup: [], agentClass: [], origin: [], mode: ['Read'] as AccessMode[], accessTo: [folder], default: [folder] }
    ]
    findEffectiveAcl.mockResolvedValue({
      resource: folder,
      inherited: false,
      effectiveContainer: folder,
      authorizations: grants
    })

    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = folder
    element.accessGrants = grants
    document.body.appendChild(element)
    await element.updateComplete
    await Promise.resolve()
    await element.updateComplete
    element.selectContainerScope(scope)
    await element.updateComplete
    const sharedAccess = element.shadowRoot.querySelector('solid-ui-access-control-shared-access') as any
    await sharedAccess.updateComplete

    expect(sharedAccess.accessGrantViewModels.map((entry: any) => entry.authorization.agent[0]))
      .toEqual(expectedSubjects)

    document.body.removeChild(element)
  })

  it('recomputes Shared with entries immediately when Advanced changes scope', async () => {
    const folder = 'https://example.com/folder/'
    const grants = [
      { agent: ['https://example.com/folder#me'], agentGroup: [], agentClass: [], origin: [], mode: ['Read'] as AccessMode[], accessTo: [folder], default: [] },
      { agent: ['https://example.com/contents#me'], agentGroup: [], agentClass: [], origin: [], mode: ['Read'] as AccessMode[], accessTo: [], default: [folder] },
      { agent: ['https://example.com/both#me'], agentGroup: [], agentClass: [], origin: [], mode: ['Read'] as AccessMode[], accessTo: [folder], default: [folder] }
    ]
    findEffectiveAcl.mockResolvedValue({ resource: folder, inherited: false, effectiveContainer: folder, authorizations: grants })
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = folder
    element.accessGrants = grants
    element.advancedSharingOpen = true
    document.body.appendChild(element)
    await element.updateComplete
    const sharedAccess = () => element.shadowRoot.querySelector('solid-ui-access-control-shared-access') as any
    await sharedAccess().updateComplete
    expect(sharedAccess().accessGrantViewModels).toHaveLength(1)

    const contentsOnly = [...element.shadowRoot.querySelectorAll('solid-ui-button')]
      .find((button: HTMLElement) => button.textContent?.includes('Contents Only')) as HTMLElement
    contentsOnly.click()
    await element.updateComplete
    await sharedAccess().updateComplete
    expect(sharedAccess().accessGrantViewModels).toHaveLength(1)
    expect(sharedAccess().accessGrantViewModels[0].authorization.agent).toEqual(['https://example.com/contents#me'])

    document.body.removeChild(element)
  })

  it('updates the summary and save planner when a scope card is selected', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/folder/'
    element.pendingAccessGrants = [{
      subjectType: 'agent',
      subjectValue: 'https://example.com/alice#me',
      role: 'Viewer',
      label: 'Alice'
    }]
    document.body.appendChild(element)
    await element.updateComplete

    element.advancedSharingOpen = true
    await element.updateComplete
    const folderOnly = [...element.shadowRoot.querySelectorAll('solid-ui-button')]
      .find((button: HTMLElement) => button.textContent?.includes('Folder Only')) as HTMLElement
    folderOnly.click()
    await element.updateComplete

    await element.onSaveClick()
    expect(planGrantContainer).toHaveBeenCalledWith(
      element.subjectUri,
      { type: 'agent', iri: 'https://example.com/alice#me' },
      ['Read']
    )

    document.body.removeChild(element)
  })

  it('supports the same-access toggle in advanced mode', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/folder/'
    document.body.appendChild(element)
    await element.updateComplete

    element.advancedSharingOpen = true
    await element.updateComplete
    const toggle = element.shadowRoot.querySelector('.access-control-same-access-toggle') as HTMLButtonElement
    expect(toggle.getAttribute('aria-checked')).toBe('true')
    toggle.click()
    await element.updateComplete

    expect(element.containerScope).toBe('folder')
    document.body.removeChild(element)
  })

  it('closes advanced sharing with an accessible ghost X button', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/folder/'
    document.body.appendChild(element)
    await element.updateComplete

    element.advancedSharingOpen = true
    await element.updateComplete
    const closeButton = element.shadowRoot.querySelector('.access-control-advanced-sharing-actions solid-ui-button') as HTMLElement
    expect(closeButton?.getAttribute('variant')).toBe('ghost')
    expect(closeButton?.getAttribute('aria-label')).toBe('Close advanced sharing')
    expect(closeButton?.getAttribute('title')).toBe('Close advanced sharing')
    expect(closeButton?.querySelector('icon-lucide-x')).not.toBeNull()
    expect(closeButton?.querySelector('.sr-only')?.textContent).toBe('Close')

    closeButton.click()
    await element.updateComplete
    expect(element.shadowRoot.querySelector('.access-control-advanced-sharing')).toBeNull()

    document.body.removeChild(element)
  })

  it('places sharing details inside Advanced', async () => {
    const inherited = document.createElement('solid-ui-access-control-modal') as any
    inherited.subjectUri = 'https://example.com/inherited-folder/'
    inherited.accessContext = {
      inherited: true,
      effectiveContainer: 'https://example.com/'
    }
    document.body.appendChild(inherited)
    await inherited.updateComplete

    inherited.advancedSharingOpen = true
    await inherited.updateComplete
    expect(inherited.shadowRoot.querySelector('.access-control-advanced-sharing')).not.toBeNull()
    document.body.removeChild(inherited)

    const custom = document.createElement('solid-ui-access-control-modal') as any
    custom.subjectUri = 'https://example.com/custom-folder/'
    custom.accessContext = {
      inherited: false,
      effectiveContainer: 'https://example.com/',
      authorizations: []
    }
    document.body.appendChild(custom)
    await custom.updateComplete

    custom.advancedSharingOpen = true
    await custom.updateComplete
    const advancedActions = custom.shadowRoot.querySelector('.access-control-advanced-sharing-actions')
    expect(advancedActions).not.toBeNull()
    document.body.removeChild(custom)
  })

  it.each([
    { subjectUri: 'https://example.com/file.ttl', inherited: false, protectedTarget: false },
    { subjectUri: 'https://example.com/file.ttl', inherited: true, protectedTarget: false },
    { subjectUri: 'https://example.com/folder/', inherited: false, protectedTarget: false },
    { subjectUri: 'https://example.com/folder/', inherited: true, protectedTarget: false },
    { subjectUri: 'https://example.com/protected/', inherited: false, protectedTarget: true },
    { subjectUri: 'https://example.com/protected/', inherited: true, protectedTarget: true }
  ])('keeps Advanced and reset unreleased for $subjectUri (inherited: $inherited)', async ({
    subjectUri, inherited, protectedTarget
  }) => {
    findEffectiveAcl.mockResolvedValueOnce({
      resource: subjectUri,
      inherited,
      effectiveContainer: 'https://example.com/',
      authorizations: []
    })
    isProtectedResource.mockReturnValue(protectedTarget)

    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = subjectUri
    document.body.appendChild(element)

    try {
      await vi.waitFor(() => {
        expect(element.accessContext?.resource).toBe(subjectUri)
        expect(element.accessContextLoading).toBe(false)
      })
      await element.updateComplete

      expect(element.shadowRoot.querySelector('.access-control-sharing-state')).toBeNull()
      expect(element.shadowRoot.querySelector('.access-control-advanced-sharing')).toBeNull()
      expect(element.shadowRoot.querySelector('.access-control-same-access-toggle')).toBeNull()
      expect(element.shadowRoot.querySelector('[aria-label="Reset custom sharing to default"]')).toBeNull()
      expect(element.shadowRoot.textContent).not.toMatch(/Advanced sharing|Folder Only|Contents Only|Reset to default/)
      expect(resetToDefault).not.toHaveBeenCalled()
    } finally {
      element.remove()
    }
  })

  it('hides Advanced for files and protected containers without offering reset controls', async () => {
    const file = document.createElement('solid-ui-access-control-modal') as any
    file.subjectUri = 'https://example.com/file.ttl'
    file.accessContext = { inherited: true, effectiveContainer: 'https://example.com/' }
    document.body.appendChild(file)
    await file.updateComplete
    expect(file.shadowRoot.querySelector('.access-control-sharing-state')).toBeNull()
    expect(file.shadowRoot.querySelector('solid-ui-button')?.textContent ?? '').not.toContain('Advanced')
    document.body.removeChild(file)

    const protectedContainer = document.createElement('solid-ui-access-control-modal') as any
    protectedContainer.subjectUri = 'https://example.com/protected/'
    protectedContainer.accessContext = { inherited: true, effectiveContainer: 'https://example.com/' }
    document.body.appendChild(protectedContainer)
    await protectedContainer.updateComplete
    protectedContainer.protectedTarget = true
    await protectedContainer.updateComplete
    expect(protectedContainer.shadowRoot.querySelector('.access-control-sharing-state')).toBeNull()
    expect(protectedContainer.shadowRoot.querySelector('solid-ui-button')?.textContent ?? '').not.toContain('Advanced')
    expect(protectedContainer.shadowRoot.querySelector('[aria-label="Reset custom sharing to default"]')).toBeNull()
    document.body.removeChild(protectedContainer)
  })

  it('keeps resource sharing details inside Advanced', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/folder/file.ttl'
    element.accessContext = {
      inherited: false,
      effectiveContainer: 'https://example.com/folder/',
      authorizations: []
    }
    document.body.appendChild(element)
    await element.updateComplete
    element.advancedSharingOpen = true
    await element.updateComplete

    const generalAccess = element.shadowRoot.querySelector('solid-ui-access-control-general-access')
    const customSharing = element.shadowRoot.querySelector('.access-control-sharing-state')
    expect(generalAccess).not.toBeNull()
    expect(customSharing).not.toBeNull()
    expect(generalAccess.compareDocumentPosition(customSharing) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(element.shadowRoot.querySelector('.access-control-advanced-sharing')).not.toBeNull()
    const panel = element.shadowRoot.querySelector('.access-control-sharing-state-panel')
    expect(panel).not.toBeNull()
    expect(panel?.querySelector('p')).not.toBeNull()
    document.body.removeChild(element)
  })

  it('shows inherited sharing details inside Advanced', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/file.ttl'
    element.accessContext = {
      inherited: true,
      effectiveContainer: 'https://example.com/folder/',
      authorizations: []
    }
    document.body.appendChild(element)
    await element.updateComplete
    element.advancedSharingOpen = true
    await element.updateComplete

    const sharingState = element.shadowRoot.querySelector('.access-control-sharing-state')
    expect(sharingState).not.toBeNull()
    expect(sharingState?.querySelector('.access-control-advanced-sharing')).not.toBeNull()
    expect(sharingState?.textContent).not.toContain('Reset to default')
    document.body.removeChild(element)
  })

  it('keeps the sharing state inside Advanced when no inherited container is known', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/file.ttl'
    element.accessContext = {
      inherited: false,
      authorizations: []
    }
    document.body.appendChild(element)
    await element.updateComplete
    element.advancedSharingOpen = true
    await element.updateComplete

    const sharingState = element.shadowRoot.querySelector('.access-control-sharing-state')
    expect(sharingState?.querySelector('.access-control-advanced-sharing')).not.toBeNull()
    document.body.removeChild(element)
  })

  it('explains when an inherited resource has no default container', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/file.ttl'
    element.accessContext = {
      inherited: true,
      authorizations: []
    }
    document.body.appendChild(element)
    await element.updateComplete
    element.advancedSharingOpen = true
    await element.updateComplete

    const sharingState = element.shadowRoot.querySelector('.access-control-sharing-state')
    expect(sharingState?.textContent).toContain('no inherited default is available')
    expect(sharingState?.textContent).not.toContain('sharing from')
    expect(sharingState?.textContent).not.toContain('Reset to default')
    document.body.removeChild(element)
  })

  it('blocks edits and explains mixed container policies until Advanced is released', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/folder/'
    findEffectiveAcl.mockResolvedValueOnce({
      resource: element.subjectUri,
      inherited: false,
      authorizations: [
        {
          agent: ['https://example.com/folder-agent#me'],
          agentGroup: [],
          agentClass: [],
          origin: [],
          accessTo: [element.subjectUri],
          default: [],
          mode: ['Read']
        },
        {
          agent: ['https://example.com/contents-agent#me'],
          agentGroup: [],
          agentClass: [],
          origin: [],
          accessTo: [],
          default: [element.subjectUri],
          mode: ['Read']
        }
      ]
    })
    document.body.appendChild(element)
    await element.updateComplete
    await Promise.resolve()
    await element.updateComplete

    const warning = element.shadowRoot.querySelector('.access-control-mixed-policy-warning')
    expect(warning?.getAttribute('role')).toBe('alert')
    expect(warning?.textContent).toContain('different access settings for the folder and its contents')
    expect(warning?.textContent).toContain('available in the next release')
    expect(element.shadowRoot.querySelector('solid-ui-access-control-add-access')?.disabled).toBe(true)
    expect(element.shadowRoot.querySelector('solid-ui-access-control-shared-access')?.disabled).toBe(true)
    expect(element.shadowRoot.querySelector('solid-ui-access-control-general-access')?.disabled).toBe(true)
    const saveButton = [...element.shadowRoot.querySelectorAll('solid-ui-button')]
      .find((button: Element) => button.textContent?.includes('Save Changes')) as HTMLElement
    expect(saveButton.hasAttribute('disabled')).toBe(true)

    await element.onSaveClick()
    expect(planGrant).not.toHaveBeenCalled()
    document.body.removeChild(element)
  })

  it('resets custom sharing and refreshes context and grants', async () => {
    findEffectiveAcl
      .mockResolvedValueOnce({ inherited: true, authorizations: [{ agent: ['https://example.com/owner#me'], agentGroup: [], agentClass: [], origin: [], mode: ['Read'] }] })
    findAccessGrants.mockResolvedValueOnce([])
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/file.ttl'
    element.accessContext = { inherited: false, effectiveContainer: 'https://example.com/folder/', authorizations: [] }

    await element.onResetToDefault()

    expect(resetToDefault).toHaveBeenCalledWith(element.subjectUri)
    expect(findEffectiveAcl).toHaveBeenCalled()
    expect(findAccessGrants).toHaveBeenCalledWith(element.subjectUri)
    expect(element.accessContext.inherited).toBe(true)
    expect(element.accessGrants[0].agent).toEqual(['https://example.com/owner#me'])
  })

  it('shows inherited effective authorizations when the resource has no direct ACL', async () => {
    const inheritedAuthorization = {
      agent: ['https://example.com/owner#me'],
      agentGroup: [],
      agentClass: [],
      origin: [],
      mode: ['Read']
    }
    findEffectiveAcl.mockResolvedValueOnce({
      inherited: true,
      effectiveContainer: 'https://example.com/folder/',
      authorizations: [inheritedAuthorization]
    })

    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/file.ttl'
    document.body.appendChild(element)
    await element.updateComplete
    await Promise.resolve()
    await element.updateComplete

    expect(element.accessGrants).toEqual([inheritedAuthorization])
    const sharedAccess = element.shadowRoot.querySelector('solid-ui-access-control-shared-access')
    await sharedAccess.updateComplete
    expect(sharedAccess.shadowRoot.querySelectorAll('.access-grants-list h3')).toHaveLength(1)
    document.body.removeChild(element)
  })

  it('reports reset errors without changing the custom state', async () => {
    resetToDefault.mockRejectedValueOnce(new Error('reset failed'))
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/file.ttl'
    element.accessContext = { inherited: false, authorizations: [] }

    await element.onResetToDefault()

    expect(element.accessContext.inherited).toBe(false)
    expect(element.saveErrors[0]).toEqual(expect.objectContaining({ action: 'reset', message: 'reset failed' }))
  })

  it('does not offer reset for an inherited resource', async () => {
    const element = document.createElement('solid-ui-access-control-modal') as any
    element.subjectUri = 'https://example.com/file.ttl'
    element.accessContext = { inherited: true, effectiveContainer: 'https://example.com/folder/', authorizations: [] }
    document.body.appendChild(element)
    await element.updateComplete

    expect(element.shadowRoot.textContent).not.toContain('Reset to default')
    document.body.removeChild(element)
  })
})
