import type { AccessControlSubjectKind, AccessRole } from 'solid-logic'

export type AccessControlBadgeKind = 'agent' | 'group' | 'agentClass' | 'origin' | 'unknown'

export type PendingAccessGrant = {
  id?: string
  subjectType: AccessControlSubjectKind
  subjectValue: string
  role: AccessRole
  label: string
}
