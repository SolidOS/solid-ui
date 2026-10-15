import { describe, expect, it } from 'vitest'
import { Authenticated, Public, type AccessMode } from 'solid-logic'
import type { AccessAuthorization } from '../../../src/components/access-control-modal/types'
import {
  getAccessGrantId,
  getAccessGrantIds,
  getChangedAccessGrants,
  getSharedAuthorization
} from '../../../src/components/access-control-modal/accessGrantDrafts'

describe('access-control grant drafts', () => {
  it('removes general access classes without mutating the authorization', () => {
    const authorization: AccessAuthorization = {
      agent: ['https://alice.example/profile#me'],
      agentGroup: [],
      agentClass: [Authenticated.iri, 'https://example/team', Public.iri],
      origin: [],
      mode: ['Read'] as const
    }

    expect(getSharedAuthorization(authorization)).toEqual({
      ...authorization,
      agentClass: ['https://example/team']
    })
    expect(authorization.agentClass).toEqual([Authenticated.iri, 'https://example/team', Public.iri])
  })

  it('creates the same stable grant id regardless of subject ordering', () => {
    const first: AccessAuthorization = {
      agent: ['https://alice.example/profile#me', 'https://bob.example/profile#me'],
      agentGroup: ['https://example/group', 'https://example/other-group'],
      agentClass: [],
      origin: ['https://example.test', 'https://other.example.test'],
      mode: ['Read'] as AccessMode[]
    }
    const second = {
      ...first,
      agent: [...first.agent].reverse(),
      agentGroup: [...first.agentGroup].reverse(),
      origin: [...first.origin].reverse()
    }

    expect(getAccessGrantId(first)).toBe(getAccessGrantId(second))
  })

  it('gives duplicate shared authorizations distinct ids', () => {
    const authorization: AccessAuthorization = {
      agent: ['https://alice.example/profile#me'],
      agentGroup: [],
      agentClass: [Authenticated.iri, Public.iri],
      origin: [],
      mode: ['Read'] as AccessMode[]
    }

    expect(getAccessGrantIds([authorization, { ...authorization, mode: ['Write'] }])).toEqual([
      'agent:https://alice.example/profile#me',
      'agent:https://alice.example/profile#me#1'
    ])
  })

  it('returns only changed drafts with real shared subjects', () => {
    const changed = {
      id: 'agent:https://alice.example/profile#me',
      authorization: {
        agent: ['https://alice.example/profile#me'],
        agentGroup: [],
        agentClass: [],
        origin: [],
        mode: ['Read'] as AccessMode[]
      },
      role: 'Editor' as const,
      initialRole: 'Viewer' as const,
      subjectLabel: 'Alice',
      subjects: [{ type: 'agent' as const, iri: 'https://alice.example/profile#me' }]
    }
    const unchanged = { ...changed, id: 'unchanged', role: 'Viewer' as const }
    const generalOnly = { ...changed, id: 'general', subjects: [], role: 'Owner' as const }

    expect(getChangedAccessGrants([unchanged, generalOnly, changed])).toEqual([{
      authorization: changed.authorization,
      subjects: changed.subjects,
      role: 'Editor'
    }])
  })
})
