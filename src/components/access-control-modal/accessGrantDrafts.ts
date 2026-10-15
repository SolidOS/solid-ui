import { label } from '@/utils/label'
import { Authenticated, Public, solidLogicSingleton, type AccessRole, type AccessSubject } from 'solid-logic'
import { sym } from 'rdflib'
import type { AccessAuthorization, AccessGrantDraft, AccessGrantViewModel, AuthorizationSubjectSet, ChangedAccessGrant } from './types'

export function getSharedAuthorization (authorization: AccessAuthorization): AccessAuthorization {
  return {
    ...authorization,
    agentClass: authorization.agentClass.filter(iri => iri !== Authenticated.iri && iri !== Public.iri)
  }
}

export function getAuthorizationSubjectEntries (authorization: AccessAuthorization): AccessSubject[] {
  const subjectSets: AuthorizationSubjectSet[] = [
    { type: 'agent', iris: authorization.agent },
    { type: 'agentGroup', iris: authorization.agentGroup },
    { type: 'agentClass', iris: authorization.agentClass },
    { type: 'origin', iris: authorization.origin }
  ]

  return subjectSets.flatMap(({ type, iris }) => iris.map(iri => ({ type, iri })))
}

export function getAccessGrantId (authorization: AccessAuthorization): string {
  return getAuthorizationSubjectEntries(authorization)
    .map(subject => `${subject.type}:${subject.iri}`)
    .sort()
    .join('|')
}

export function getAccessGrantIds (authorizations: AccessAuthorization[]): string[] {
  const occurrences = new Map<string, number>()

  return authorizations.map(authorization => {
    const sharedAuthorization = getSharedAuthorization(authorization)
    const baseId = getAccessGrantId(sharedAuthorization)
    const occurrence = occurrences.get(baseId) ?? 0
    occurrences.set(baseId, occurrence + 1)
    return occurrence === 0 ? baseId : `${baseId}#${occurrence}`
  })
}

export function getAuthorizationSubjectLabel (authorization: AccessAuthorization): string {
  const subjects = [
    ...authorization.agent,
    ...authorization.agentGroup,
    ...authorization.agentClass,
    ...authorization.origin
  ]
  return subjects.length ? subjects.map(subject => label(sym(subject))).join(', ') : 'Unknown access holder'
}

export function getAuthorizationRole (authorization: AccessAuthorization): AccessRole {
  return solidLogicSingleton.acl.roleFromModes(authorization.mode)
}

export function createAccessGrantDraft (authorization: AccessAuthorization): AccessGrantDraft {
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

export function createAccessGrantDrafts (authorizations: AccessAuthorization[]): AccessGrantDraft[] {
  const ids = getAccessGrantIds(authorizations)
  return authorizations.map((authorization, index) => ({
    ...createAccessGrantDraft(authorization),
    id: ids[index]
  }))
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

export function getAuthenticatedAccessRole (accessGrants: AccessAuthorization[]): AccessRole {
  const authorization = accessGrants.find(item => item.agentClass.includes(Authenticated.iri))
  return authorization ? getAuthorizationRole(authorization) : 'No Access'
}

export function getPublicAccessRole (accessGrants: AccessAuthorization[]): AccessRole {
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
