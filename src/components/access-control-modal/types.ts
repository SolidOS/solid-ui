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
  id: string
  role: AccessRole
}

export type AccessGrantRoleChangedEvent = CustomEvent<AccessGrantRoleChangedDetail>

export type PendingAccessGrant = {
  subjectType: AccessControlSubjectKind
  subjectValue: string
  role: AccessRole
  label: string
}

export type AccessGrantEntry = {
  id: string
  authorization: Authorization
  role: AccessRole
  subjectLabel: string
}

export type AccessGrantViewModel = AccessGrantEntry & {
  initialRole: AccessRole
  subjects: AccessSubject[]
}

export type AccessGrantDraft = AccessGrantViewModel

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

export type InputAccessControlError = {
  action: 'input'
  targetUri: string
  label: string
  message: string
}

export type AccessSaveError = {
  action: 'grant' | 'revoke'
  targetUri: string
  label: string
  role: AccessRole
  message: string
} | {
  action: 'save'
  targetUri: string
  label: string
  message: string
}

export type AccessControlError = InputAccessControlError | AccessSaveError
