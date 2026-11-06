import { PUBLIC_ACCESS_ROLES, Public, solidLogicSingleton } from 'solid-logic'
import type { AccessChange, AccessSaveError, AccessSaveScope } from './types'

export async function applyAccessChanges (
  subjectUri: string,
  accessChanges: AccessChange[],
  options: { containerScope?: AccessSaveScope } = {}
): Promise<AccessSaveError[]> {
  const errors: AccessSaveError[] = []
  const scope = options.containerScope ?? 'file'

  for (const { subject, label, role } of accessChanges) {
    try {
      const grantPlanner = scope === 'folder+contents'
        ? solidLogicSingleton.acl.planGrantContainerAndContents
        : scope === 'container'
          ? solidLogicSingleton.acl.planGrantContainer
          : scope === 'contents'
            ? solidLogicSingleton.acl.planGrantContainerContents
            : solidLogicSingleton.acl.planGrant
      const plan = role === 'No Access'
        ? await (scope === 'contents'
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
        scope,
        message: error instanceof Error
          ? error.message
          : 'Unable to apply access change.'
      })
    }
  }

  return errors
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
