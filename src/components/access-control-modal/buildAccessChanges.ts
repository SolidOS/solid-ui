import { getAccessSubjectLabel } from './accessGrantDrafts'
import type { AccessChange, ChangedAccessGrant, PendingAccessGrant } from './types'

export type AccessChangeDrafts = {
  pendingAccessGrants: PendingAccessGrant[]
  generalAccessChanges: AccessChange[]
  changedAccessGrants: ChangedAccessGrant[]
}

export function buildAccessChanges ({
  pendingAccessGrants,
  generalAccessChanges,
  changedAccessGrants
}: AccessChangeDrafts): AccessChange[] {
  return [
    ...pendingAccessGrants.map(grant => ({
      subject: { type: grant.subjectType, iri: grant.subjectValue },
      role: grant.role,
      label: grant.label,
      scope: grant.scope
    })),
    ...generalAccessChanges,
    ...changedAccessGrants.flatMap(({ subjects, role, scope, initialScope }) =>
      subjects.map(subject => ({
        subject,
        role,
        label: getAccessSubjectLabel(subject),
        scope,
        previousScope: initialScope !== scope ? initialScope : undefined
      }))
    )
  ]
}
