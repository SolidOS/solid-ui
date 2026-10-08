import type { AccessControlSubjectKind, AccessRole } from 'solid-logic'

export type AccessControlBadgeKind = 'agent' | 'group' | 'agentClass' | 'unknown'
export type PendingAccessSubjectKind = Exclude<AccessControlSubjectKind, 'origin'>

export type PendingAccessGrant = {
  id?: string
  subjectType: PendingAccessSubjectKind
  subjectValue: string
  role: AccessRole
  label: string
}
