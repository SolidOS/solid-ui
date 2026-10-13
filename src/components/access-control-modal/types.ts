import type { AccessControlSubjectKind, AccessRole, AccessSubject, Authorization } from 'solid-logic'

export type TargetInputDetail = {
  value: string
}

export type TargetSelectedDetail = {
  value: string
  label: string
}

export type RoleChangedDetail = {
  role: AccessRole
}

export type PendingGrantRemovedDetail = {
  index: number
}

export type TargetInputEvent = CustomEvent<TargetInputDetail>
export type TargetSelectedEvent = CustomEvent<TargetSelectedDetail>
export type RoleChangedEvent = CustomEvent<RoleChangedDetail>
export type PendingGrantRemovedEvent = CustomEvent<PendingGrantRemovedDetail>

export type AccessGrantRoleChangedDetail = {
  index: number
  role: AccessRole
}

export type AccessGrantRoleChangedEvent = CustomEvent<AccessGrantRoleChangedDetail>

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
}

export type AccessGrantViewModel = AccessGrantEntry & {
  initialRole: AccessRole
  subjects: AccessSubject[]
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

export type AccessControlError = {
  action: 'input' | 'grant' | 'revoke' | 'save'
  targetUri?: string
  label: string
  role?: AccessRole
  message: string
}

export type AccessSaveError = Exclude<AccessControlError, { action: 'input' }>
