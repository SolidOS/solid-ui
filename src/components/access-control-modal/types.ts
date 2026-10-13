import type { AccessControlSubjectKind, AccessRole, AccessSubject, Authorization } from 'solid-logic'

export type AccessControlBadgeKind = AccessControlSubjectKind | 'unknown'

export type AccessControlBadge = {
  kind: AccessControlBadgeKind
  image?: string
  text: string
}

export type PendingAccessGrant = {
  id?: string
  subjectType: AccessControlSubjectKind
  subjectValue: string
  role: AccessRole
  label: string
}

export type AccessGrantEntry = {
  authorization: Authorization
  index: number
  role: AccessRole
  subjectLabel: string
  badge: AccessControlBadge
}

export type ChangedAccessGrant = {
  authorization: Authorization
  subjects: AccessSubject[]
  role: AccessRole
}

export type AuthorizationSubjectSet = {
  type: AccessControlSubjectKind
  iris: string[]
}

export type AccessChange = {
  subject: AccessSubject
  role: AccessRole
  label: string
}

export type AccessSaveError = {
  action: 'grant' | 'revoke' | 'save'
  targetUri: string
  label: string
  role?: AccessRole
  message: string
}
