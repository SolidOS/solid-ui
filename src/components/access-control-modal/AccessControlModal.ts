import { customElement, DialogComponent } from '@/lib/components'
import { html } from 'lit'
import type { PropertyValues } from 'lit'
import { property, state } from 'lit/decorators.js'
import { label } from '@/utils/label'
import * as debug from '@/lib/debug'
import { Authenticated, DEFAULT_DIRECTORY_SOURCES, PUBLIC_ACCESS_ROLES, Public, solidLogicSingleton, type AccessControlSubjectKind, type AccessMode, type AccessRole, type AccessSubject, type Authorization, type DirectoryEntry } from 'solid-logic'
import { defineAsyncComboboxOptionsProvider, type ComboboxOptionData } from '@/components/combobox'
import { sym } from 'rdflib'

import '~icons/lucide/circle-x'
import '@/components/dialog'
import '@/components/dialog-content'
import '@/components/dialog-footer'
import '@/components/button'
import '@/components/combobox'
import '@/components/combobox-option'
import { directoryEntryOptionTemplate } from './AccessControlAddAccess'
import './AccessControlSharedAccess'
import './AccessControlGeneralAccess'
import './AccessControlErrors'

import styles from './AccessControlModal.styles.css'
import type { AccessChange, AccessControlError, AccessGrantRoleChangedEvent, AccessGrantViewModel, AccessSaveError, AuthorizationSubjectSet, ChangedAccessGrant, PendingAccessGrant, PendingGrantRemovedEvent, RoleChangedEvent, TargetInputEvent, TargetSelectedEvent } from './types'
import { dedupeByKey, dedupeComboboxOptions, isAbsoluteHttpUri, isOriginUrl, normalizeOriginInput, type StringComboboxOptionData } from './helpers'

function isDefined<T> (value: T | undefined | null): value is T {
  return value !== undefined && value !== null
}

type PendingAccessGrantCreationResult =
  | { grant: PendingAccessGrant }
  | { error: AccessControlError }

type ResolvedAccessTarget = {
  subjectType: AccessControlSubjectKind
  subjectValue: string
  label: string
}

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
  private accessor accessGrantRoles: AccessRole[] = []

  @state()
  private accessor accessGrantLabels: string[] = []

  @state()
  private accessor errors: AccessControlError[] = []

  disconnectedCallback (): void {
    this.errors = []
    super.disconnectedCallback()
  }

  private get inputError (): string {
    return this.errors.find(error => error.action === 'input')?.message ?? ''
  }

  private get saveErrors (): AccessSaveError[] {
    return this.errors.filter((error): error is AccessSaveError => error.action !== 'input')
  }

  protected willUpdate (changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties)

    if (changedProperties.has('accessGrants')) {
      this.accessGrantRoles = this.accessGrants?.map(item => this.getAuthorizationRole(item)) ?? []
      this.authenticatedAccessRoleValue = this.getAuthenticatedAccessRole()
      this.publicAccessRoleValue = this.getPublicAccessRole()
    }
  }

  protected updated (changedProperties: PropertyValues<this>) {
    super.updated(changedProperties)

    if (changedProperties.has('accessGrants')) {
      void this.refreshAccessGrantLabels()
    }
  }

  private async refreshAccessGrantLabels () {
    const grants = this.accessGrants ?? []
    if (!grants.length) {
      this.accessGrantLabels = []
      return
    }

    const labels = await Promise.all(grants.map(async authorization => {
      const groupUri = authorization.agentGroup[0]
      if (groupUri) {
        try {
          await solidLogicSingleton.store.fetcher.load(sym(groupUri).doc())
        } catch {
          // Keep the fallback label if the group document cannot be loaded.
        }
      }

      return this.getAuthorizationSubjectLabel(this.getSharedAuthorization(authorization))
    }))

    if (this.accessGrants === grants) {
      this.accessGrantLabels = labels
    }
  }

  private getAccessGrantViewModels (): AccessGrantViewModel[] {
    return (this.accessGrants ?? [])
      .map((authorization, index) => {
        const sharedAuthorization = this.getSharedAuthorization(authorization)
        const role = this.accessGrantRoles[index] ?? this.getAuthorizationRole(sharedAuthorization)
        const subjectLabel = this.accessGrantLabels[index] ?? this.getAuthorizationSubjectLabel(sharedAuthorization)

        return {
          authorization: sharedAuthorization,
          index,
          role,
          initialRole: this.getAuthorizationRole(authorization),
          subjectLabel,
          subjects: this.getAuthorizationSubjectEntries(sharedAuthorization)
        }
      })
      .sort((left, right) => {
        const leftIsOwner = left.role === 'Owner'
        const rightIsOwner = right.role === 'Owner'

        if (leftIsOwner && !rightIsOwner) return -1
        if (!leftIsOwner && rightIsOwner) return 1
        return left.index - right.index
      })
  }

  private getAuthorizationSubjectIris (authorization: Authorization) {
    return [
      ...authorization.agent,
      ...authorization.agentGroup,
      ...authorization.agentClass,
      ...authorization.origin,
    ]
  }

  private getAuthorizationSubjectLabel (authorization: Authorization): string {
    const subjects = this.getAuthorizationSubjectIris(authorization)
    return subjects.length ? subjects.map(subject => label(sym(subject))).join(', ') : 'Unknown access holder'
  }

  private getAuthorizationRole (authorization: Authorization): AccessRole {
    return solidLogicSingleton.acl.roleFromModes(authorization.mode)
  }

  private getSharedAuthorization (authorization: Authorization): Authorization {
    return {
      ...authorization,
      agentClass: authorization.agentClass.filter(iri => iri !== Authenticated.iri && iri !== Public.iri)
    }
  }

  private getAuthenticatedAccessRole (): AccessRole {
    const authorization = (this.accessGrants ?? []).find(item =>
      item.agentClass.includes(Authenticated.iri)
    )

    return authorization ? this.getAuthorizationRole(authorization) : 'No Access'
  }

  private getPublicAccessRole (): AccessRole {
    const authorization = (this.accessGrants ?? []).find(item =>
      item.agentClass.includes(Public.iri)
    )

    if (!authorization) {
      return 'No Access'
    }

    return solidLogicSingleton.acl.publicRoleFromModes(authorization.mode)
  }

  private getRoleModes (role: AccessRole): AccessMode[] {
    return solidLogicSingleton.acl.modesFromRole(role)
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
              .asyncOptionsProvider=${this.accessPrincipleOptionsProvider}
              @target-input=${this.onPrincipalInput}
              @target-selected=${this.onPrincipalSelect}
              @role-changed=${this.onAddAccessRoleInput}
              @pending-grant-removed=${this.onPendingGrantRemoved}
            ></solid-ui-access-control-add-access>
            <solid-ui-access-control-shared-access
              .accessGrantViewModels=${this.getAccessGrantViewModels()}
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

    await this.commitPrinciplesFromInputSafely()
  }

  private async onSaveClick () {
    if (this.submitting) {
      return
    }

    if (this.principalInputValue.trim()) {
      const committed = await this.commitPrinciplesFromInputSafely()

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

    const changedAccessGrants = this.getChangedAccessGrants()
    const generalAccessChanges = this.getGeneralAccessChanges()

    if (!this.pendingAccessGrants.length && !changedAccessGrants.length && !generalAccessChanges.length) {
      return
    }

    if (!this.subjectUri) {
      return
    }

    this.submitting = true
    this.errors = this.errors.filter(error => error.action === 'input')

    try {
      const accessChanges: AccessChange[] = [
        ...this.pendingAccessGrants.map(grant => ({
          subject: this.createAccessSubject(grant.subjectType, grant.subjectValue),
          role: grant.role,
          label: grant.label
        })),
        ...generalAccessChanges,
        ...changedAccessGrants.flatMap(({ subjects, role }) =>
          subjects.map(subject => ({
            subject,
            role,
            label: this.getAccessSubjectLabel(subject)
          }))
        )
      ]

      const appliedChanges: AccessChange[] = []

      for (const { subject, label, role } of accessChanges) {
        try {
          const plan = role === 'No Access'
            ? await solidLogicSingleton.acl.planRevoke(this.subjectUri, subject)
            : await solidLogicSingleton.acl.planGrant(this.subjectUri, subject, subject.type === 'agentClass' && subject.iri === Public.iri
              ? solidLogicSingleton.acl.modesFromPublicRole(role as (typeof PUBLIC_ACCESS_ROLES)[number])
              : this.getRoleModes(role))

          await solidLogicSingleton.acl.applyPlan(plan)
          appliedChanges.push({ subject, role, label })
        } catch (error) {
          this.errors = [
            ...this.errors,
            {
              action: role === 'No Access' ? 'revoke' : 'grant',
              targetUri: subject.iri,
              label,
              role,
              message: error instanceof Error
                ? error.message
                : 'Unable to apply access change.'
            }
          ]
        }
      }

      if (this.saveErrors.length) {
        debug.error('Failed to save some access changes', this.saveErrors)
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
    this.errors = this.errors.filter(error => error.action !== 'input')
  }

  private onPrincipalSelect (event: TargetSelectedEvent) {
    this.queuePendingPrinciple(event.detail.value, this.addAccessRoleValue, event.detail.label)
  }

  private getGeneralAccessChanges (): AccessChange[] {
    if (!this.subjectUri) {
      return []
    }

    const currentAuthenticatedRole = this.getAuthenticatedAccessRole()
    const currentPublicRole = this.getPublicAccessRole()

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
    this.accessGrantRoles = this.accessGrantRoles.map((role, roleIndex) => {
      return roleIndex === event.detail.index ? event.detail.role : role
    })
  }

  private onPendingGrantRemoved (event: PendingGrantRemovedEvent) {
    this.pendingAccessGrants = this.pendingAccessGrants.filter((_, pendingIndex) => pendingIndex !== event.detail.index)
  }

  private hasUnsavedChanges (): boolean {
    return Boolean(
      this.pendingAccessGrants.length ||
      this.principalInputValue.trim() ||
      this.getChangedAccessGrants().length ||
      this.getGeneralAccessChanges().length
    )
  }

  private getChangedAccessGrants (): ChangedAccessGrant[] {
    return this.getAccessGrantViewModels()
      .filter(({ role, initialRole, subjects }) => {
        if (role === initialRole) {
          return false
        }

        return subjects.length > 0
      })
      .map(({ authorization, subjects, role }) => ({ authorization, subjects, role }))
  }

  private getAuthorizationSubjectEntries (authorization: Authorization): AccessSubject[] {
    const subjectSets: AuthorizationSubjectSet[] = [
      { type: 'agent', iris: authorization.agent },
      { type: 'agentGroup', iris: authorization.agentGroup },
      { type: 'agentClass', iris: authorization.agentClass },
      { type: 'origin', iris: authorization.origin }
    ]

    return subjectSets.flatMap(({ type, iris }) => iris.map(iri => ({ type, iri })))
  }

  private createAccessSubject (type: AccessSubject['type'], iri: string): AccessSubject {
    return { type, iri }
  }

  private getAccessSubjectLabel (subject: AccessSubject): string {
    if (subject.iri === Authenticated.iri) {
      return 'Authenticated users'
    }

    if (subject.iri === Public.iri) {
      return 'Public'
    }

    return label(sym(subject.iri)).trim() || subject.iri
  }

  private async commitPrinciplesFromInput (): Promise<boolean> {
    const rawValue = this.principalInputValue.trim()
    if (!rawValue) {
      return false
    }

    return this.queuePendingPrinciple(rawValue, this.addAccessRoleValue, undefined, rawValue)
  }

  private async commitPrinciplesFromInputSafely (): Promise<boolean> {
    try {
      return await this.commitPrinciplesFromInput()
    } catch (error) {
      this.errors = [
        ...this.errors.filter(item => item.action !== 'input'),
        {
          action: 'input',
          label: 'Access target',
          targetUri: this.principalInputValue.trim(),
          message: 'We could not verify this access target. Check the value and try again.'
        }
      ]
      debug.error('Failed to commit pending access grants', error)
      return false
    }
  }

  private async queuePendingPrinciple (
    principle: string,
    role: AccessRole = this.addAccessRoleValue,
    preferredLabel?: string,
    inputSnapshot?: string
  ): Promise<boolean> {
    const snapshot = inputSnapshot ?? this.principalInputValue.trim()
    const result = await this.createPendingAccessGrant(principle, role, preferredLabel)

    if ('error' in result) {
      this.errors = [
        ...this.errors.filter(item => item.action !== 'input'),
        result.error
      ]
      debug.error('Failed to add access grant:', result.error.message)
      return false
    }

    const merged = [...this.pendingAccessGrants, result.grant]
    this.pendingAccessGrants = this.dedupePendingAccessGrants(merged)
    this.errors = this.errors.filter(error => error.action !== 'input')

    if (this.principalInputValue.trim() === snapshot) {
      this.principalInputValue = ''
    }

    return true
  }

  private async createPendingAccessGrant (
    principle: string,
    role: AccessRole = this.addAccessRoleValue,
    preferredLabel?: string
  ): Promise<PendingAccessGrantCreationResult> {
    try {
      const normalizedPrinciple = principle.trim()
      const resolvedTarget = await this.resolveAccessTarget(normalizedPrinciple, preferredLabel)
      if (!resolvedTarget) {
        return {
          error: {
            action: 'input',
            label: 'Access target',
            targetUri: normalizedPrinciple,
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
          targetUri: principle,
          message: error instanceof Error ? error.message : 'Could not verify this access target'
        }
      }
    }
  }

  private async classifyAccessTarget (principle: string) {
    const normalizedOrigin = normalizeOriginInput(principle)
    return normalizedOrigin
      ? { kind: 'origin' as const, subjectValue: normalizedOrigin }
      : await solidLogicSingleton.acl.classifyAccessControlSubject(principle)
  }

  private async resolveAccessTargetLabel (
    resolvedPrinciple: Awaited<ReturnType<typeof this.classifyAccessTarget>>,
    preferredLabel?: string
  ): Promise<string | undefined> {
    if (!resolvedPrinciple || resolvedPrinciple.kind === 'origin') {
      return resolvedPrinciple?.subjectValue
    }

    try {
      const subject = sym(resolvedPrinciple.subjectValue)
      await solidLogicSingleton.store.fetcher.load(subject.doc())
      const resolvedLabel = preferredLabel?.trim() || label(subject).trim()
      if (!resolvedLabel || resolvedLabel === resolvedPrinciple.subjectValue) {
        return undefined
      }

      return resolvedLabel
    } catch {
      return undefined
    }
  }

  private async resolveAccessTarget (principle: string, preferredLabel?: string): Promise<ResolvedAccessTarget | undefined> {
    const resolvedPrinciple = await this.classifyAccessTarget(principle)
    if (!resolvedPrinciple) {
      return undefined
    }

    const resolvedLabel = await this.resolveAccessTargetLabel(resolvedPrinciple, preferredLabel)
    if (!resolvedLabel) {
      return undefined
    }

    return {
      subjectType: resolvedPrinciple.kind,
      subjectValue: resolvedPrinciple.subjectValue,
      label: resolvedLabel
    }
  }

  private dedupePendingAccessGrants (draftGrants: PendingAccessGrant[]): PendingAccessGrant[] {
    return dedupeByKey(draftGrants, draftGrant => `${draftGrant.subjectType}:${draftGrant.subjectValue}`)
  }

  private readonly accessPrincipleOptionsProvider = defineAsyncComboboxOptionsProvider(async (filter: string) => {
    const query = filter.trim()
    const preferredOptions = await this.getPreferredAccessPrincipleOptions(query)

    if (query.length < 2) {
      return this.getShortQueryOptions(preferredOptions)
    }

    let entries: DirectoryEntry[] = []

    try {
      entries = await solidLogicSingleton.directory.search({
        query,
        sources: DEFAULT_DIRECTORY_SOURCES
      })
    } catch (error) {
      if (!preferredOptions.length) {
        throw error
      }
    }

    const verifiedEntries = await Promise.all(entries.map(async entry => {
      const resolved = await this.resolveAccessTarget(entry.uri, entry.label)
      return resolved ? { entry, label: resolved.label } : undefined
    }))
    const options = verifiedEntries
      .filter(isDefined)
      .map(({ entry, label: entryLabel }) => this.directoryEntryToOption({ ...entry, label: entryLabel }))
    return [...preferredOptions, ...options]
  })

  private getShortQueryOptions (preferredOptions: ComboboxOptionData[]): ComboboxOptionData[] {
    if (preferredOptions.length) {
      return preferredOptions
    }

    return [{
      label: 'Type at least 2 characters to search',
      value: '',
      selectable: false
    }]
  }

  private async getPreferredAccessPrincipleOptions (query: string): Promise<ComboboxOptionData[]> {
    const normalizedOrigin = normalizeOriginInput(query)
    if (normalizedOrigin) {
      return [{
        label: `Use origin ${normalizedOrigin}`,
        value: normalizedOrigin
      }]
    }

    if (!isAbsoluteHttpUri(query)) {
      return []
    }

    if (isOriginUrl(query)) {
      return [{
        label: `Use origin ${new URL(query).origin}`,
        value: new URL(query).origin
      }]
    }

    const urlOption = await this.createUrlOption(query)
    return dedupeComboboxOptions(urlOption ? [urlOption] : [])
  }

  private async createUrlOption (uri: string): Promise<StringComboboxOptionData | undefined> {
    const resolved = await this.resolveAccessTarget(uri)
    if (!resolved) {
      return undefined
    }

    return {
      label: resolved.label,
      value: uri
    }
  }

  private directoryEntryToOption (entry: DirectoryEntry): ComboboxOptionData {
    return {
      label: entry.label,
      value: entry.uri,
      template: directoryEntryOptionTemplate(entry)
    }
  }

}
