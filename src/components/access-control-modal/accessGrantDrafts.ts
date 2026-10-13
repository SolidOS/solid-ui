import { label } from '@/utils/label'
import { Authenticated, Public, solidLogicSingleton, type AccessRole, type AccessSubject, type Authorization } from 'solid-logic'
import { sym } from 'rdflib'
import type { AccessGrantDraft, AccessGrantViewModel, AuthorizationSubjectSet, ChangedAccessGrant } from './types'

export function getSharedAuthorization (authorization: Authorization): Authorization {
  return {
    ...authorization,
    agentClass: authorization.agentClass.filter(iri => iri !== Authenticated.iri && iri !== Public.iri)
  }
}

export function getAuthorizationSubjectEntries (authorization: Authorization): AccessSubject[] {
  const subjectSets: AuthorizationSubjectSet[] = [
    { type: 'agent', iris: authorization.agent },
    { type: 'agentGroup', iris: authorization.agentGroup },
    { type: 'agentClass', iris: authorization.agentClass },
    { type: 'origin', iris: authorization.origin }
  ]

  return subjectSets.flatMap(({ type, iris }) => iris.map(iri => ({ type, iri })))
}

export function getAccessGrantId (authorization: Authorization): string {
  return getAuthorizationSubjectEntries(authorization)
    .map(subject => `${subject.type}:${subject.iri}`)
    .sort()
    .join('|')
}

export function getAuthorizationSubjectLabel (authorization: Authorization): string {
  const subjects = [
    ...authorization.agent,
    ...authorization.agentGroup,
    ...authorization.agentClass,
    ...authorization.origin
  ]
  return subjects.length ? subjects.map(subject => label(sym(subject))).join(', ') : 'Unknown access holder'
}

export function getAuthorizationRole (authorization: Authorization): AccessRole {
  return solidLogicSingleton.acl.roleFromModes(authorization.mode)
}

export function createAccessGrantDraft (authorization: Authorization): AccessGrantDraft {
  const sharedAuthorization = getSharedAuthorization(authorization)
  return {
    id: getAccessGrantId(sharedAuthorization),
    authorization: sharedAuthorization,
    role: getAuthorizationRole(sharedAuthorization),
    initialRole: getAuthorizationRole(authorization),
    subjectLabel: getAuthorizationSubjectLabel(sharedAuthorization),
    subjects: getAuthorizationSubjectEntries(sharedAuthorization)
  }
}

export function getAccessGrantViewModels (drafts: AccessGrantDraft[]): AccessGrantViewModel[] {
  return [...drafts]
    .sort((left, right) => {
      const leftIsOwner = left.role === 'Owner'
      const rightIsOwner = right.role === 'Owner'

      if (leftIsOwner && !rightIsOwner) return -1
      if (!leftIsOwner && rightIsOwner) return 1
      return drafts.indexOf(left) - drafts.indexOf(right)
    })
}

export function getChangedAccessGrants (drafts: AccessGrantDraft[]): ChangedAccessGrant[] {
  return getAccessGrantViewModels(drafts)
    .filter(({ role, initialRole, subjects }) => role !== initialRole && subjects.length > 0)
    .map(({ authorization, subjects, role }) => ({ authorization, subjects, role }))
}

export function getAuthenticatedAccessRole (accessGrants: Authorization[]): AccessRole {
  const authorization = accessGrants.find(item => item.agentClass.includes(Authenticated.iri))
  return authorization ? getAuthorizationRole(authorization) : 'No Access'
}

export function getPublicAccessRole (accessGrants: Authorization[]): AccessRole {
  const authorization = accessGrants.find(item => item.agentClass.includes(Public.iri))
  return authorization ? solidLogicSingleton.acl.publicRoleFromModes(authorization.mode) : 'No Access'
}

export function getAccessSubjectLabel (subject: AccessSubject): string {
  if (subject.iri === Authenticated.iri) {
    return 'Authenticated users'
  }

  if (subject.iri === Public.iri) {
    return 'Public'
  }

  return label(sym(subject.iri)).trim() || subject.iri
}
