import { PUBLIC_ACCESS_ROLES, Public, solidLogicSingleton } from 'solid-logic'
import type { AccessChange, AccessSaveError } from './types'

export async function applyAccessChanges (
  subjectUri: string,
  accessChanges: AccessChange[]
): Promise<AccessSaveError[]> {
  const errors: AccessSaveError[] = []

  for (const { subject, label, role } of accessChanges) {
    try {
      const plan = role === 'No Access'
        ? await solidLogicSingleton.acl.planRevoke(subjectUri, subject)
        : await solidLogicSingleton.acl.planGrant(subjectUri, subject, subject.type === 'agentClass' && subject.iri === Public.iri
          ? solidLogicSingleton.acl.modesFromPublicRole(role as (typeof PUBLIC_ACCESS_ROLES)[number])
          : solidLogicSingleton.acl.modesFromRole(role))

      await solidLogicSingleton.acl.applyPlan(plan)
    } catch (error) {
      errors.push({
        action: role === 'No Access' ? 'revoke' : 'grant',
        targetUri: subject.iri,
        label,
        role,
        message: error instanceof Error
          ? error.message
          : 'Unable to apply access change.'
      })
    }
  }

  return errors
}
