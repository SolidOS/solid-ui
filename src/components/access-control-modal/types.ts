import type { AccessControlSubjectKind, AccessMode, AccessRole, AccessSubject, Authorization } from 'solid-logic'

export type AccessAuthorization = Omit<
  Pick<Authorization, 'agent' | 'agentGroup' | 'agentClass' | 'origin' | 'mode'>,
  'mode'
> & {
  id?: string
  mode: readonly AccessMode[]
}

export type TargetInputDetail = {
  value: string
}

export type TargetSelectedDetail = {
  value: string
  label: string
  targetKind?: 'origin' | 'trustedApp'
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
  targetKind?: 'origin' | 'trustedApp'
}

export type AccessGrantEntry = {
  id: string
  authorization: AccessAuthorization
  role: AccessRole
  subjectLabel: string
}

export type AccessGrantViewModel = AccessGrantEntry & {
  initialRole: AccessRole
  subjects: AccessSubject[]
}

export type AccessGrantDraft = AccessGrantViewModel

export type ChangedAccessGrant = {
  authorization: AccessAuthorization
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

export type AccessSaveScope = 'folder+contents' | 'container' | 'contents' | 'file'

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
  scope: AccessSaveScope
  message: string
} | {
  action: 'save' | 'reset'
  targetUri: string
  label: string
  message: string
}

export type AccessControlError = InputAccessControlError | AccessSaveError
