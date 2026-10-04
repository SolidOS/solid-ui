import type { AccessRole, SubjectType } from 'solid-logic'

export type AccessControlBadgeKind = 'agent' | 'group' | 'agentClass' | 'origin' | 'unknown'

export type PendingAccessGrant = {
  id?: string
  subjectType: SubjectType
  subjectValue: string
  role: AccessRole
  label: string
}