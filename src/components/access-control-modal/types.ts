import type { SubjectType } from 'solid-logic'

export const ACCESS_ROLES = ['Owner', 'Editor', 'Viewer', 'Poster', 'Submitter', 'Remove'] as const

export type AccessRole = typeof ACCESS_ROLES[number]

export type AccessControlBadgeKind = 'agent' | 'group' | 'agentClass' | 'origin' | 'unknown'

export type DraftGrant = {
  id?: string
  subjectType: SubjectType
  subjectValue: string
  role: AccessRole
  removed?: boolean
}
