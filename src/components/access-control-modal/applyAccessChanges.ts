import { PUBLIC_ACCESS_ROLES, Public, solidLogicSingleton, type ContainerAccessScope } from 'solid-logic'
import type { AccessChange, AccessSaveError, AccessSaveScope } from './types'

export async function applyAccessChanges (
  subjectUri: string,
  accessChanges: AccessChange[],
  options: { containerScope?: AccessSaveScope } = {}
): Promise<AccessSaveError[]> {
  const errors: AccessSaveError[] = []
  const scope = options.containerScope ?? 'file'
  const isContainer = subjectUri.endsWith('/')

  for (const { subject, label, role, scope: changeScope, previousScope } of accessChanges) {
    const selectedScope = isContainer ? (changeScope ?? scope) : 'file'
    const saveScope = toAccessSaveScope(selectedScope)
    const previousSaveScope = isContainer && previousScope
      ? toAccessSaveScope(previousScope)
      : 'file'
    try {
      if (previousScope && previousSaveScope !== saveScope) {
        const previousPlan = previousSaveScope === 'contents' || (
          previousSaveScope === 'folder+contents' && saveScope === 'container'
        )
          ? await solidLogicSingleton.acl.planRevokeContainerContents(subjectUri, subject)
          : await solidLogicSingleton.acl.planRevoke(subjectUri, subject)
        await solidLogicSingleton.acl.applyPlan(previousPlan)
      }
      const grantPlanner = saveScope === 'folder+contents'
        ? solidLogicSingleton.acl.planGrantContainerAndContents
        : saveScope === 'container'
          ? solidLogicSingleton.acl.planGrantContainer
          : saveScope === 'contents'
            ? solidLogicSingleton.acl.planGrantContainerContents
            : solidLogicSingleton.acl.planGrant
      const plan = role === 'No Access'
        ? await (saveScope === 'contents'
          ? solidLogicSingleton.acl.planRevokeContainerContents(subjectUri, subject)
          : solidLogicSingleton.acl.planRevoke(subjectUri, subject))
        : await grantPlanner(subjectUri, subject, getModes(subject, role))

      await solidLogicSingleton.acl.applyPlan(plan)
    } catch (error) {
      errors.push({
        action: role === 'No Access' ? 'revoke' : 'grant',
        targetUri: subject.iri,
        label,
        role,
        scope: saveScope,
        message: error instanceof Error
          ? error.message
          : 'Unable to apply access change.'
      })
    }
  }

  return errors
}

function toAccessSaveScope (scope: ContainerAccessScope | AccessSaveScope): AccessSaveScope {
  return scope === 'folder' ? 'container' : scope
}

function getModes (subject: AccessChange['subject'], role: AccessChange['role']) {
  if (subject.type === 'agentClass' && subject.iri === Public.iri) {
    const publicRole = PUBLIC_ACCESS_ROLES.find(candidate => candidate === role)
    if (!publicRole) {
      throw new Error(`Public access does not support the ${role} role.`)
    }
    return solidLogicSingleton.acl.modesFromPublicRole(publicRole)
  }

  return solidLogicSingleton.acl.modesFromRole(role)
}
