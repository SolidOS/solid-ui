import { customElement, DialogComponent } from '@/lib/components'
import { html } from 'lit'
import type { PropertyValues } from 'lit'
import { property, state } from 'lit/decorators.js'
import { label } from '@/utils/label'
import * as debug from '@/lib/debug'
import { Authenticated, Public, solidLogicSingleton, type AccessRole, type Authorization } from 'solid-logic'
import { sym } from 'rdflib'

import '~icons/lucide/circle-x'
import '@/components/dialog'
import '@/components/dialog-content'
import '@/components/dialog-footer'
import '@/components/button'
import '@/components/combobox'
import '@/components/combobox-option'
import './AccessControlSharedAccess'
import './AccessControlGeneralAccess'
import './AccessControlErrors'

import styles from './AccessControlModal.styles.css'
import type { AccessChange, AccessControlError, AccessGrantDraft, AccessGrantRoleChangedEvent, AccessSaveError, InputAccessControlError, PendingAccessGrant, PendingGrantRemovedEvent, RoleChangedEvent, TargetInputEvent, TargetSelectedEvent } from './types'
import { dedupeByKey } from './helpers'
import { createAccessGrantDraft, getAccessGrantId, getAccessGrantViewModels, getAuthenticatedAccessRole, getAuthorizationSubjectLabel, getChangedAccessGrants, getPublicAccessRole, getSharedAuthorization } from './accessGrantDrafts'
import { accessPrincipalOptionsProvider, resolveAccessTarget } from './accessTargetResolver'
import { applyAccessChanges } from './applyAccessChanges'
import { buildAccessChanges } from './buildAccessChanges'

function isDefined<T> (value: T | undefined | null): value is T {
  return value !== undefined && value !== null
}

type PendingAccessGrantCreationResult =
  | { grant: PendingAccessGrant }
  | { error: InputAccessControlError }

@customElement('solid-ui-access-control-modal')
export default class AccessControlModal extends DialogComponent<void> {
  static styles = styles

  @property({ attribute: false })
  accessor subjectUri: string | undefined = undefined

  @property({ attribute: false })
  accessor accessGrants: Authorization[] | undefined = undefined

  @state()
  private accessor principalInputValue: string = ''

  @state()
  private accessor addAccessRoleValue: AccessRole = 'Viewer'

  @state()
  private accessor authenticatedAccessRoleValue: AccessRole = 'No Access'

  @state()
  private accessor publicAccessRoleValue: AccessRole = 'No Access'

  @state()
  private accessor submitting: boolean = false

  @state()
  private accessor pendingAccessGrants: PendingAccessGrant[] = []

  @state()
  private accessor accessGrantDrafts: AccessGrantDraft[] = []

  @state()
  private accessor errors: AccessControlError[] = []

  @state()
  private accessor successfulChangesRefreshed = true

  private accessGrantLabelRequestVersion = 0

  disconnectedCallback (): void {
    this.accessGrantLabelRequestVersion++
    this.errors = []
    super.disconnectedCallback()
  }

  private get inputError (): string {
    return this.errors.find(error => error.action === 'input')?.message ?? ''
  }

  private get saveErrors (): AccessSaveError[] {
    return this.errors.filter((error): error is AccessSaveError => error.action !== 'input')
  }

  private setInputError (error: InputAccessControlError) {
    this.errors = [
      ...this.errors.filter(item => item.action !== 'input'),
      error
    ]
  }

  private clearInputError () {
    this.errors = this.errors.filter(error => error.action !== 'input')
  }

  protected willUpdate (changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties)

    if (changedProperties.has('accessGrants')) {
      const accessGrants = this.accessGrants ?? []
      this.accessGrantDrafts = accessGrants.map(createAccessGrantDraft)
      this.authenticatedAccessRoleValue = getAuthenticatedAccessRole(accessGrants)
      this.publicAccessRoleValue = getPublicAccessRole(accessGrants)
    }
  }

  protected updated (changedProperties: PropertyValues<this>) {
    super.updated(changedProperties)

    if (changedProperties.has('accessGrants')) {
      this.refreshAccessGrantLabels().catch((error: unknown) => {
        debug.error('Failed to refresh access grant labels', error)
      })
    }
  }

  private async refreshAccessGrantLabels () {
    const requestVersion = ++this.accessGrantLabelRequestVersion
    const grants = this.accessGrants ?? []
    if (!grants.length) {
      this.accessGrantDrafts = []
      return
    }

    const labels = await Promise.all(grants.map(async authorization => {
      await Promise.all(authorization.agentGroup.map(async groupUri => {
        try {
          await solidLogicSingleton.store.fetcher.load(sym(groupUri).doc())
        } catch {
          // Keep the fallback label if the group document cannot be loaded.
        }
      }))

      return getAuthorizationSubjectLabel(getSharedAuthorization(authorization))
    }))

    if (requestVersion === this.accessGrantLabelRequestVersion && this.accessGrants === grants) {
      const labelsById = new Map(
        grants.map((authorization, index) => [
          getAccessGrantId(getSharedAuthorization(authorization)),
          labels[index]
        ])
      )
      this.accessGrantDrafts = this.accessGrantDrafts.map(draft => ({
        ...draft,
        subjectLabel: labelsById.get(draft.id) ?? draft.subjectLabel
      }))
    }
  }

  private getDialogTitle (): string {
    const subject = this.subjectUri ? sym(this.subjectUri) : undefined
    const subjectLabel = subject ? label(subject).trim() : ''

    if (!subjectLabel || subjectLabel === 'this resource') {
      return 'Share this resource'
    }

    return `Share "${subjectLabel}"`
  }

  protected render () {
    const dialogTitle = this.getDialogTitle()

    return html`
      <solid-ui-dialog title=${dialogTitle}>
        <form @submit=${this.onSubmit}>
          <solid-ui-dialog-content>
            <solid-ui-access-control-add-access
              .principalInputValue=${this.principalInputValue}
              .addAccessRoleValue=${this.addAccessRoleValue}
              .pendingAccessGrants=${this.pendingAccessGrants}
              .inputError=${this.inputError}
              .asyncOptionsProvider=${accessPrincipalOptionsProvider}
              @target-input=${this.onPrincipalInput}
              @target-selected=${this.onPrincipalSelect}
              @role-changed=${this.onAddAccessRoleInput}
              @pending-grant-removed=${this.onPendingGrantRemoved}
            ></solid-ui-access-control-add-access>
            <solid-ui-access-control-shared-access
              .accessGrantViewModels=${getAccessGrantViewModels(this.accessGrantDrafts)}
              @access-grant-role-changed=${this.onAccessGrantRoleInput}
            ></solid-ui-access-control-shared-access>
            <solid-ui-access-control-general-access
              .subjectUri=${this.subjectUri}
              .authenticatedAccessRoleValue=${this.authenticatedAccessRoleValue}
              .publicAccessRoleValue=${this.publicAccessRoleValue}
              @authenticated-role-changed=${this.onAuthenticatedAccessRoleInput}
              @public-role-changed=${this.onPublicAccessRoleInput}
            ></solid-ui-access-control-general-access>
            <solid-ui-access-control-errors
              .errors=${this.saveErrors}
              .successfulChangesRefreshed=${this.successfulChangesRefreshed}
              @close=${this.onCancelClick}
            ></solid-ui-access-control-errors>
          </solid-ui-dialog-content>

          <solid-ui-dialog-footer>
            <div class="access-control-footer-actions">
              <solid-ui-button
                variant="secondary"
                @click=${this.onCancelClick}
              >
                Cancel
              </solid-ui-button>
              <solid-ui-button
                ?disabled=${!this.hasUnsavedChanges() || this.submitting || this.saveErrors.length > 0}
                ?loading=${this.submitting}
                type="button"
                @click=${this.onSaveClick}
              >
                Save Changes
              </solid-ui-button>
            </div>
          </solid-ui-dialog-footer>
        </form>
      </solid-ui-dialog>
    `
  }

  private async onSubmit (e: Event) {
    e.preventDefault()

    if (this.submitting) {
      return
    }

    await this.commitPrincipalFromInputSafely()
  }

  private async onSaveClick () {
    if (this.submitting) {
      return
    }

    if (this.principalInputValue.trim()) {
      const committed = await this.commitPrincipalFromInputSafely()

      if (!committed) {
        return
      }
    }

    await this.saveAccessChanges()
  }

  private onCancelClick () {
    this.close()
  }

  private async saveAccessChanges () {
    if (this.submitting) {
      return
    }

    const changedAccessGrants = getChangedAccessGrants(this.accessGrantDrafts)
    const generalAccessChanges = this.getGeneralAccessChanges()

    if (!this.pendingAccessGrants.length && !changedAccessGrants.length && !generalAccessChanges.length) {
      return
    }

    if (!this.subjectUri) {
      return
    }

    this.submitting = true
    this.errors = this.errors.filter(error => error.action === 'input')
    this.successfulChangesRefreshed = true

    try {
      const accessChanges = buildAccessChanges({
        pendingAccessGrants: this.pendingAccessGrants,
        generalAccessChanges,
        changedAccessGrants
      })

      const saveErrors = await applyAccessChanges(this.subjectUri, accessChanges)
      if (saveErrors.length) {
        this.errors = [...this.errors, ...saveErrors]
        this.principalInputValue = ''
        this.pendingAccessGrants = []

        if (saveErrors.length < accessChanges.length) {
          try {
            this.accessGrants = await solidLogicSingleton.acl.findAccessGrants(this.subjectUri)
          } catch (error) {
            this.successfulChangesRefreshed = false
            this.errors = [
              ...this.errors,
              {
                action: 'save',
                targetUri: this.subjectUri,
                label: 'Shared with list',
                message: error instanceof Error
                  ? error.message
                  : 'Unable to refresh the access list.'
              }
            ]
            debug.error('Failed to refresh access grants after a partial save', error)
          }
        }

        debug.error('Failed to save some access changes', saveErrors)
        return
      }

      this.principalInputValue = ''
      this.pendingAccessGrants = []
      this.close()
    } catch (error) {
      this.errors = [
        ...this.errors,
        {
          action: 'save',
          targetUri: this.subjectUri ?? '',
          label: 'Access changes',
          message: error instanceof Error
            ? error.message
            : 'Unexpected error while saving access changes.'
        }
      ]
    } finally {
      this.submitting = false
    }
  }

  private onPrincipalInput (event: TargetInputEvent) {
    this.principalInputValue = event.detail.value
    this.clearInputError()
  }

  private onPrincipalSelect (event: TargetSelectedEvent) {
    this.queuePendingPrincipal(event.detail.value, this.addAccessRoleValue, event.detail.label)
  }

  private getGeneralAccessChanges (): AccessChange[] {
    if (!this.subjectUri) {
      return []
    }

    const accessGrants = this.accessGrants ?? []
    const currentAuthenticatedRole = getAuthenticatedAccessRole(accessGrants)
    const currentPublicRole = getPublicAccessRole(accessGrants)

    const authenticatedChange = this.authenticatedAccessRoleValue === currentAuthenticatedRole
      ? undefined
      : {
          subject: Authenticated,
          role: this.authenticatedAccessRoleValue,
          label: 'Authenticated users'
        }

    const publicChange = this.publicAccessRoleValue === currentPublicRole
      ? undefined
      : {
          subject: Public,
          role: this.publicAccessRoleValue,
          label: 'Public'
        }

    return [authenticatedChange, publicChange].filter(isDefined)
  }

  private onAddAccessRoleInput (event: RoleChangedEvent) {
    this.addAccessRoleValue = event.detail.role
    this.pendingAccessGrants = this.pendingAccessGrants.map(grant => ({
      ...grant,
      role: event.detail.role
    }))
  }

  private onAuthenticatedAccessRoleInput (event: RoleChangedEvent) {
    this.authenticatedAccessRoleValue = event.detail.role
  }

  private onPublicAccessRoleInput (event: RoleChangedEvent) {
    this.publicAccessRoleValue = event.detail.role
  }

  private onAccessGrantRoleInput (event: AccessGrantRoleChangedEvent) {
    this.accessGrantDrafts = this.accessGrantDrafts.map(draft =>
      draft.id === event.detail.id
        ? { ...draft, role: event.detail.role }
        : draft
    )
  }

  private onPendingGrantRemoved (event: PendingGrantRemovedEvent) {
    this.pendingAccessGrants = this.pendingAccessGrants.filter((_, pendingIndex) => pendingIndex !== event.detail.index)
  }

  private hasUnsavedChanges (): boolean {
    return Boolean(
      this.pendingAccessGrants.length ||
      this.principalInputValue.trim() ||
      getChangedAccessGrants(this.accessGrantDrafts).length ||
      this.getGeneralAccessChanges().length
    )
  }

  private async commitPrincipalFromInput (): Promise<boolean> {
    const rawValue = this.principalInputValue.trim()
    if (!rawValue) {
      return false
    }

    return this.queuePendingPrincipal(rawValue, this.addAccessRoleValue, undefined, rawValue)
  }

  private async commitPrincipalFromInputSafely (): Promise<boolean> {
    try {
      return await this.commitPrincipalFromInput()
    } catch (error) {
      this.setInputError({
        action: 'input',
        label: 'Access target',
        targetUri: this.principalInputValue.trim(),
        message: 'We could not verify this access target. Check the value and try again.'
      })
      debug.error('Failed to commit pending access grants', error)
      return false
    }
  }

  private async queuePendingPrincipal (
    principal: string,
    role: AccessRole = this.addAccessRoleValue,
    preferredLabel?: string,
    inputSnapshot?: string
  ): Promise<boolean> {
    const snapshot = inputSnapshot ?? this.principalInputValue.trim()
    const result = await this.createPendingAccessGrant(principal, role, preferredLabel)

    if ('error' in result) {
      this.setInputError(result.error)
      debug.error('Failed to add access grant:', result.error.message)
      return false
    }

    const merged = [...this.pendingAccessGrants, result.grant]
    this.pendingAccessGrants = this.dedupePendingAccessGrants(merged)
    this.clearInputError()

    if (this.principalInputValue.trim() === snapshot) {
      this.principalInputValue = ''
    }

    return true
  }

  private async createPendingAccessGrant (
    principal: string,
    role: AccessRole = this.addAccessRoleValue,
    preferredLabel?: string
  ): Promise<PendingAccessGrantCreationResult> {
    try {
      const normalizedPrincipal = principal.trim()
      const resolvedTarget = await resolveAccessTarget(normalizedPrincipal, preferredLabel)
      if (!resolvedTarget) {
        return {
          error: {
            action: 'input',
            label: 'Access target',
            targetUri: normalizedPrincipal,
            message: 'Could not verify this access target'
          }
        }
      }

      return {
        grant: {
          subjectType: resolvedTarget.subjectType,
          subjectValue: resolvedTarget.subjectValue,
          role,
          label: resolvedTarget.label
        }
      }
    } catch (error) {
      return {
        error: {
          action: 'input',
          label: 'Access target',
          targetUri: principal,
          message: error instanceof Error ? error.message : 'Could not verify this access target'
        }
      }
    }
  }

  private dedupePendingAccessGrants (draftGrants: PendingAccessGrant[]): PendingAccessGrant[] {
    return dedupeByKey(draftGrants, draftGrant => `${draftGrant.subjectType}:${draftGrant.subjectValue}`)
  }
}
