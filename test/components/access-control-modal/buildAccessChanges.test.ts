import { describe, expect, it } from 'vitest'
import { buildAccessChanges } from '../../../src/components/access-control-modal/buildAccessChanges'

describe('buildAccessChanges', () => {
  it('orders pending, general, and changed shared access changes', () => {
    const pendingAccessGrant = {
      subjectType: 'agent' as const,
      subjectValue: 'https://alice.example/profile#me',
      role: 'Editor' as const,
      label: 'Alice'
    }
    const generalAccessChange = {
      subject: { type: 'agentClass' as const, iri: 'http://www.w3.org/ns/auth/acl#AuthenticatedAgent' },
      role: 'Viewer' as const,
      label: 'Authenticated users'
    }
    const changedAccessGrant = {
      authorization: {
        agent: [],
        agentGroup: [],
        agentClass: [],
        origin: ['https://example.test'],
        mode: ['Read']
      },
      subjects: [{ type: 'origin' as const, iri: 'https://example.test' }],
      role: 'No Access' as const
    }

    expect(buildAccessChanges({
      pendingAccessGrants: [pendingAccessGrant],
      generalAccessChanges: [generalAccessChange],
      changedAccessGrants: [changedAccessGrant]
    })).toEqual([
      {
        subject: { type: 'agent', iri: 'https://alice.example/profile#me' },
        role: 'Editor',
        label: 'Alice'
      },
      generalAccessChange,
      {
        subject: { type: 'origin', iri: 'https://example.test' },
        role: 'No Access',
        label: 'example.test'
      }
    ])
  })
})
