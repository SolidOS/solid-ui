import { customElement, WebComponent } from '@/lib/components'
import { html, nothing } from 'lit'
import type { PropertyValues } from 'lit'
import { property, query, state } from 'lit/decorators.js'
import { label } from '@/utils/label'
import { findImage } from '@/widgets'
import type Dialog from '@/components/dialog'
import { ACCESS_ROLES, Authenticated, DEFAULT_DIRECTORY_SOURCES, PUBLIC_ACCESS_ROLES, Public, solidLogicSingleton, type AccessMode, type AccessRole, type AccessSubject, type Authorization, type DirectoryEntry } from 'solid-logic'
import { defineAsyncComboboxOptionsProvider, type ComboboxOptionData } from '@/components/combobox'
import { sym } from 'rdflib'

import '~icons/lucide/chevron-down'
import '~icons/lucide/link'
import '~icons/lucide/globe'
import '~icons/lucide/book-user'
import '~icons/lucide/user-round'
import '~icons/lucide/users'
import '~icons/lucide/circle-x'
import '@/components/dialog'
import '@/components/dialog-content'
import '@/components/dialog-footer'
import '@/components/button'
import '@/components/combobox'
import '@/components/combobox-option'

import styles from './AccessControlModal.styles.css'
import type { ComboboxChangeEvent } from '@/components/combobox'
import type { AccessChange, AccessControlBadge, AccessGrantEntry, AuthorizationSubjectSet, ChangedAccessGrant, PendingAccessGrant } from './types'
import { dedupeByKey, dedupeComboboxOptions, isHttpUri, type StringComboboxOptionData } from './helpers'

function isDefined<T> (value: T | undefined | null): value is T {
  return value !== undefined && value !== null
}

type PendingAccessGrantCreationResult =
  | { grant: PendingAccessGrant; principle: string }
  | { error: string; principle: string }

@customElement('solid-ui-access-control-modal')
export default class AccessControlModal extends WebComponent {
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
  private accessor searchValue: string = ''

  @state()
  private accessor failed: boolean = false

  @state()
  private accessor submitting: boolean = false

  @state()
  private accessor pendingAccessGrants: PendingAccessGrant[] = []

  @state()
  private accessor accessGrantRoles: AccessRole[] = []

  @state()
  private accessor accessGrantLabels: string[] = []

  @query('solid-ui-dialog')
  private accessor dialog: Dialog | null = null

  protected willUpdate (changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties)

    if (changedProperties.has('accessGrants')) {
      this.accessGrantRoles = this.accessGrants?.map(item => this.getAuthorizationRole(item)) ?? []
      this.authenticatedAccessRoleValue = this.getAuthenticatedAccessRole()
      this.publicAccessRoleValue = this.getPublicAccessRole()
      this.refreshAccessGrantLabels()
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

  private getAccessGrantEntries () {
    return (this.accessGrants ?? [])
      .map((authorization, index) => {
        authorization = this.getSharedAuthorization(authorization)
        const subjectLabel = this.getAccessGrantSubjectLabel(authorization, index)

        return {
          authorization,
          index,
          role: this.accessGrantRoles[index] ?? this.getAuthorizationRole(authorization),
          subjectLabel,
          badge: this.getAuthorizationBadge(authorization, subjectLabel)
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

  private getSharedAccessGrantEntries () {
    return this.getAccessGrantEntries().filter(({ authorization }) => this.getAuthorizationSubjectIris(authorization).length > 0)
  }

  private renderAccessGrants () {
    const query = this.searchValue.trim().toLowerCase()
    const accessGrants = this.getSharedAccessGrantEntries().filter(({ subjectLabel }) => {
      if (!query) {
        return true
      }

      return subjectLabel.toLowerCase().includes(query)
    })

    return html`
      <ul>
        ${accessGrants.length > 0
          ? accessGrants.map(entry => this.renderAccessGrant(entry))
          : html`<li>No access grants</li>`}
      </ul>
    `
  }

  private renderAccessGrant (entry: AccessGrantEntry) {
    return html`
      <li>
        ${this.renderAuthorizationBadge(entry.badge)}
        <h3>${entry.subjectLabel}</h3>
        ${this.renderAuthorizationRole(entry.role, entry.index)}  
      </li>
    `
  }

  private getAuthorizationBadge (authorization: Authorization, subjectLabel?: string) {
    const resolvedSubjectLabel = subjectLabel ?? this.getAuthorizationSubjectLabel(authorization)

    const agent = authorization.agent[0]
    if (agent) {
      const image = findImage(sym(agent))
      return {
        kind: 'agent' as const,
        image,
        text: image ? '' : this.getInitials(resolvedSubjectLabel, 2)
      }
    }

    const agentGroup = authorization.agentGroup[0]
    if (agentGroup) {
      return {
        kind: 'group' as const,
        text: this.getInitials(resolvedSubjectLabel, 1)
      }
    }

    const agentClass = authorization.agentClass[0]
    if (agentClass) {
      const image = findImage(sym(agentClass))
      return {
        kind: 'agentClass' as const,
        image,
        text: image ? '' : this.getInitials(resolvedSubjectLabel, 2)
      }
    }

    return {
      kind: 'unknown' as const,
      text: '?'
    }
  }

  private renderAuthorizationBadge (badge: AccessControlBadge) {
    return html`
      <div class="access-grants-image access-grants-image--${badge.kind}">
        ${badge.image ? html`<img src=${badge.image} alt="" aria-hidden="true" />` : html`<span aria-hidden="true">${badge.text}</span>`}
      </div>
    `
  }

  private getInitials (label: string, maxWords = 2): string {
    const parts = label.split(/\s+/).filter(Boolean).slice(0, maxWords)
    const initials = parts.map(part => part[0]).join('')
    return (initials || label.slice(0, maxWords)).toUpperCase()
  }

  private getAuthorizationSubjectIris (authorization: Authorization) {
    return [
      ...authorization.agent,
      ...authorization.agentGroup,
      ...authorization.agentClass,
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

  private getRoleValueFromEvent (event: Event, fallback: AccessRole = 'Viewer'): AccessRole {
    const selectedValue = this.getSelectedComboboxOptionValue(event)

    if (typeof selectedValue === 'string') {
      return selectedValue as AccessRole
    }

    const target = event.currentTarget as { value?: string | null } | null

    return typeof target?.value === 'string' ? target.value as AccessRole : fallback
  }

  private renderAuthorizationRole (role: AccessRole, index: number) {
    return html`
      <solid-ui-combobox
        class="access-role-select access-role-select--compact access-grants-role access-grants-role--editable ${role === 'Owner' ? 'access-grants-role--owner' : ''}"
        .value=${role}
        @change=${(event: Event) => this.onAccessGrantRoleInput(index, event)}
      >
        ${this.renderGrantRoleOptions()}
      </solid-ui-combobox>
    `
  }

  private renderModeSelector (variant: 'add' | 'authenticated' | 'public' = 'add') {
    const className = variant === 'add'
      ? 'access-role-select access-role-select--top'
      : variant === 'authenticated'
        ? 'access-role-select access-role-select--compact access-role-select--general access-grants-role access-grants-role--editable access-role-select--authenticated'
        : 'access-role-select access-role-select--compact access-role-select--general access-grants-role access-grants-role--editable access-role-select--public'
    const value = variant === 'add'
      ? this.addAccessRoleValue
      : variant === 'authenticated'
        ? this.authenticatedAccessRoleValue
        : this.publicAccessRoleValue
    const onChange = variant === 'add'
      ? this.onAddAccessRoleInput
      : variant === 'authenticated'
        ? this.onAuthenticatedAccessRoleInput
        : this.onPublicAccessRoleInput

    return html`
      <solid-ui-combobox
        class=${className}
        .value=${value}
        @change=${onChange}
      >
        ${variant === 'add'
          ? this.renderAddRoleOptions()
          : variant === 'authenticated'
            ? this.renderAuthenticatedRoleOptions()
            : this.renderPublicRoleOptions()}
      </solid-ui-combobox>
    `
  }

  private renderAddRoleOptions () {
    return ACCESS_ROLES
      .filter(role => role !== 'No Access')
      .map(role => html`
        <solid-ui-combobox-option value=${role}>${role}</solid-ui-combobox-option>
      `)
  }

  private renderAuthenticatedRoleOptions () {
    return ACCESS_ROLES.map(role => html`
      <solid-ui-combobox-option value=${role}>${role}</solid-ui-combobox-option>
    `)
  }

  private renderPublicRoleOptions () {
    return PUBLIC_ACCESS_ROLES.map(role => html`
      <solid-ui-combobox-option value=${role}>${role}</solid-ui-combobox-option>
    `)
  }

  private renderGrantRoleOptions () {
    return ACCESS_ROLES.map(role => html`
      <solid-ui-combobox-option value=${role}>${role === 'No Access' ? 'Remove' : role}</solid-ui-combobox-option>
    `)
  }

  private renderAddAccessForm () {
    return html`
      <div class="access-grants-form">
        <p>Add person, group or software agent URL.</p>
        <div class="access-grants-form-main">
          <div class="access-grants-input">
            <solid-ui-combobox
              class="access-principal-combobox"
              label="Add person, group or software agent URL."
              .srOnlyLabel=${true}
              .value=${this.principalInputValue}
              placeholder="Paste a link or enter a name"
              .asyncOptionsProvider=${this.accessPrincipleOptionsProvider}
              @input=${this.onPrincipalInput}
              @change=${this.onPrincipalSelect}
            ></solid-ui-combobox>
            ${this.renderPendingAccessGrants()}
          </div>
          ${this.renderModeSelector('add')}
        </div> 
      </div>
    `
  }

  private renderPendingAccessGrants () {
    if (!this.pendingAccessGrants.length) {
      return nothing
    }

    return html`
      <div class="access-grants-pending">
        ${this.pendingAccessGrants.map((grant, index) => html`
          <div class="access-grants-pending-item">
            <span class="access-grants-pending-item-label">${grant.label}</span>
            <solid-ui-button
              type="button"
              variant="ghost"
              class="access-grants-pending-item-remove"
              data-pending-grant-index=${index}
              @click=${this.onRemovePendingAccessGrantClick}
            >
              <span class="sr-only">Remove ${grant.label}</span>
              <icon-lucide-circle-x slot="icon"></icon-lucide-circle-x>
            </solid-ui-button>
          </div>
        `)}
      </div>
    `
  }

  private renderAccessGrantsSection () {
    return html`
      <div class="access-grants-header">
        <h2>Share with</h2>
        <solid-ui-combobox
          class="access-grants-search-input"
          label="Search access grants"
          .srOnlyLabel=${true}
          .value=${this.searchValue}
          placeholder="Search"
          @input=${this.onSearchInput}
          @change=${this.onSearchSelect}
        >
          ${this.getSharedAccessGrantEntries().map(({ subjectLabel }) => html`
            <solid-ui-combobox-option 
              .value=${subjectLabel}>
              ${subjectLabel}
            </solid-ui-combobox-option>
          `)}
        </solid-ui-combobox>
      </div>
      <div class="access-grants-list">
        ${this.renderAccessGrants()}
      </div>
    `
  }

  private renderGeneralAccessSection () {
    return html`
      <div class="access-grants-general">
        <div class="access-grants-general-header">
          <h2>General Access</h2>
          <solid-ui-button
            class="access-grants-copy-link-button"
            variant="tertiary"
            @click=${this.onCopyLinkClick}
          >
            <icon-lucide-link slot="left-icon"></icon-lucide-link>
            <span class="access-grants-copy-link-button-label">Copy Link</span>
          </solid-ui-button>
        </div>
        ${this.renderGeneralShareRow({
          title: 'Share with Anyone Signed In',
          description: 'Users must sign in to SolidOS to access this shared item using the link.',
          variant: 'authenticated'
        })}
        ${this.renderGeneralShareRow({
          title: 'Anyone with the Link',
          description: 'Anyone on the internet with the link can view.',
          variant: 'public'
        })}
      </div>
    `
  }

  private renderGeneralShareRow (options: {
    title: string
    description: string
    variant: 'authenticated' | 'public'
  }) {
    return html`
      <div class="access-grants-general-share">
        <div class="access-grants-general-share-content">
          ${this.renderGeneralAccessIcon()}
          <div class="access-grants-general-share-text">
            <p class="access-grants-general-share-text-title">${options.title}</p>
            <p class="access-grants-general-share-text-description">${options.description}</p>
          </div>
        </div>
        ${this.renderModeSelector(options.variant)}
      </div>
    `
  }

  private renderGeneralAccessIcon () {
    return html`
      <div class="access-grants-general-share-icon">
        <div class="access-grants-general-share-icon-inner">
          <icon-lucide-globe class="access-grants-general-share-icon-image"></icon-lucide-globe>
        </div>
      </div>
    `
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
            ${this.renderAddAccessForm()}
            ${this.renderAccessGrantsSection()}
            ${this.renderGeneralAccessSection()}
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
                ?disabled=${!this.hasUnsavedChanges() || this.submitting}
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
    this.dialog?.close()
  }

  private async saveAccessChanges () {
    if (this.submitting) {
      return
    }

    const changedAccessGrants = this.getChangedAccessGrants()
    const generalAccessChanges = this.getGeneralAccessChanges()

    if (!this.pendingAccessGrants.length && !changedAccessGrants.length && !generalAccessChanges.length) {
      this.failed = true
      return
    }

    if (!this.subjectUri) {
      this.failed = true
      return
    }

    this.submitting = true
    this.failed = false

    try {
      const accessChanges: AccessChange[] = [
        ...this.pendingAccessGrants.map(grant => ({
          subject: this.createAccessSubject(grant.subjectType, grant.subjectValue),
          role: grant.role
        })),
        ...generalAccessChanges,
        ...changedAccessGrants.flatMap(({ subjects, role }) =>
          subjects.map(subject => ({ subject, role }))
        )
      ]

      for (const { subject, role } of accessChanges) {
        const plan = role === 'No Access'
          ? await solidLogicSingleton.acl.planRevoke(this.subjectUri, subject)
          : await solidLogicSingleton.acl.planGrant(this.subjectUri, subject, subject.type === 'agentClass' && subject.iri === Public.iri
            ? solidLogicSingleton.acl.modesFromPublicRole(role as (typeof PUBLIC_ACCESS_ROLES)[number])
            : this.getRoleModes(role))

        await solidLogicSingleton.acl.applyPlan(plan)
      }

      this.principalInputValue = ''
      this.pendingAccessGrants = []
      this.dialog?.close()
    } catch (error) {
      this.failed = true
      console.error('Failed to save access changes', error)
    } finally {
      this.submitting = false
    }
  }

  private onPrincipalInput (event: Event) {
    this.principalInputValue = this.getEventValue(event)
  }

  private onPrincipalSelect (event: Event) {
    const option = this.getSelectedStringComboboxOption(event)

    if (!option) {
      return
    }

    this.queuePendingPrinciples([option.value], this.addAccessRoleValue, option.label)
  }

  private onSearchInput (event: Event) {
    this.searchValue = this.getEventValue(event)
  }

  private onSearchSelect (event: Event) {
    const option = this.getSelectedComboboxOption(event)

    if (option) {
      this.searchValue = option.label
    }
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
          role: this.authenticatedAccessRoleValue
        }

    const publicChange = this.publicAccessRoleValue === currentPublicRole
      ? undefined
      : {
          subject: Public,
          role: this.publicAccessRoleValue
        }

    return [authenticatedChange, publicChange].filter(isDefined)
  }

  private onAddAccessRoleInput (event: Event) {
    const nextRole = this.getRoleValueFromEvent(event)
    this.addAccessRoleValue = nextRole
    this.pendingAccessGrants = this.pendingAccessGrants.map(grant => ({
      ...grant,
      role: nextRole
    }))
  }

  private onAuthenticatedAccessRoleInput (event: Event) {
    const nextRole = this.getRoleValueFromEvent(event)
    this.authenticatedAccessRoleValue = nextRole
  }

  private onPublicAccessRoleInput (event: Event) {
    const nextRole = this.getRoleValueFromEvent(event, 'No Access')
    this.publicAccessRoleValue = nextRole
  }

  private onAccessGrantRoleInput (index: number, event: Event) {
    const value = this.getRoleValueFromEvent(event)

    this.accessGrantRoles = this.accessGrantRoles.map((role, roleIndex) => {
      return roleIndex === index ? value : role
    })
  }

  private removePendingAccessGrant (index: number) {
    this.pendingAccessGrants = this.pendingAccessGrants.filter((_, pendingIndex) => pendingIndex !== index)
  }

  private onRemovePendingAccessGrantClick (event: Event) {
    const target = event.currentTarget as HTMLElement | null
    const index = target?.dataset.pendingGrantIndex

    if (index === undefined) {
      return
    }

    this.removePendingAccessGrant(Number.parseInt(index, 10))
  }

  private hasUnsavedChanges (): boolean {
    return Boolean(
      this.pendingAccessGrants.length ||
      this.principalInputValue.trim() ||
      this.getChangedAccessGrants().length ||
      this.getGeneralAccessChanges().length
    )
  }

  private getAccessGrantSubjectLabel (authorization: Authorization, index: number): string {
    return this.accessGrantLabels[index] ?? this.getAuthorizationSubjectLabel(authorization)
  }

  private getChangedAccessGrants (): ChangedAccessGrant[] {
    const initialAccessGrantRoles = this.getInitialAccessGrantRoles()

    return (this.accessGrants ?? [])
      .map((authorization, index) => {
        const currentRole = this.accessGrantRoles[index] ?? this.getAuthorizationRole(authorization)
        const initialRole = initialAccessGrantRoles[index] ?? this.getAuthorizationRole(authorization)

        if (currentRole === initialRole) {
          return undefined
        }

        const subjects = this.getAuthorizationSubjectEntries(this.getSharedAuthorization(authorization))
        if (!subjects.length) {
          return undefined
        }

        return { authorization, subjects, role: currentRole }
      })
      .filter(isDefined)
  }

  private getInitialAccessGrantRoles (): AccessRole[] {
    return this.accessGrants?.map(item => this.getAuthorizationRole(item)) ?? []
  }

  private getAuthorizationSubjectEntries (authorization: Authorization): AccessSubject[] {
    const subjectSets: AuthorizationSubjectSet[] = [
      { type: 'agent', iris: authorization.agent },
      { type: 'agentGroup', iris: authorization.agentGroup },
      { type: 'agentClass', iris: authorization.agentClass }
    ]

    return subjectSets.flatMap(({ type, iris }) => iris.map(iri => ({ type, iri })))
  }

  private createAccessSubject (type: AccessSubject['type'], iri: string): AccessSubject {
    return { type, iri }
  }

  private getEventValue (event: Event, fallback = ''): string {
    const target = event.currentTarget as { value?: string | null } | null
    return typeof target?.value === 'string' ? target.value : fallback
  }

  private getSelectedComboboxOption (event: Event): ComboboxChangeEvent['detail']['option'] | undefined {
    return (event as ComboboxChangeEvent).detail?.option
  }

  private getSelectedStringComboboxOption (event: Event): StringComboboxOptionData | undefined {
    const option = this.getSelectedComboboxOption(event)
    return this.isStringComboboxOptionData(option) ? option : undefined
  }

  private getSelectedComboboxOptionValue (event: Event): unknown {
    return this.getSelectedComboboxOption(event)?.value
  }

  private isStringComboboxOptionData (option: ComboboxOptionData | undefined): option is StringComboboxOptionData {
    return typeof option?.value === 'string'
  }

  private async commitPrinciplesFromInput (): Promise<boolean> {
    const rawValue = this.principalInputValue.trim()
    if (!rawValue) {
      return false
    }

    return this.queuePendingPrinciples([rawValue], this.addAccessRoleValue, undefined, rawValue)
  }

  private async commitPrinciplesFromInputSafely (): Promise<boolean> {
    try {
      return await this.commitPrinciplesFromInput()
    } catch (error) {
      this.failed = true
      console.error('Failed to commit pending access grants', error)
      return false
    }
  }

  private async queuePendingPrinciples (
    principles: string[],
    role: AccessRole = this.addAccessRoleValue,
    preferredLabel?: string,
    inputSnapshot?: string
  ): Promise<boolean> {
    const snapshot = inputSnapshot ?? this.principalInputValue.trim()
    const pendingGrantResults = await Promise.all(principles.map(async principle => this.createPendingAccessGrant(principle, role, preferredLabel)))
    const newGrants = pendingGrantResults.flatMap(result => ('grant' in result ? [result.grant] : []))
    const failedGrants = pendingGrantResults
      .filter((result): result is { error: string; principle: string } => 'error' in result)
      .map(result => `${result.principle} (${result.error})`)

    if (!newGrants.length) {
      if (failedGrants.length) {
        this.failed = true
      }
      this.logPendingGrantFailures(failedGrants, false)
      return false
    }

    const merged = [...this.pendingAccessGrants, ...newGrants]
    this.pendingAccessGrants = this.dedupePendingAccessGrants(merged)
    if (failedGrants.length) {
      this.failed = true
    }
    this.logPendingGrantFailures(failedGrants, true)

    if (!failedGrants.length && this.principalInputValue.trim() === snapshot) {
      this.principalInputValue = ''
    }

    return failedGrants.length === 0
  }

  private async createPendingAccessGrant (
    principle: string,
    role: AccessRole = this.addAccessRoleValue,
    preferredLabel?: string
  ): Promise<PendingAccessGrantCreationResult> {
    try {
      const normalizedPrinciple = principle.trim()
      const resolvedPrinciple = await solidLogicSingleton.acl.classifyAccessControlSubject(normalizedPrinciple)
      const fallbackKind = this.isHttpUri(principle) ? 'agent' : undefined
      const subjectType = resolvedPrinciple?.kind ?? fallbackKind
      const subjectValue = resolvedPrinciple?.subjectValue ?? normalizedPrinciple

      if (!subjectType) {
        return {
          principle,
          error: 'Could not classify access target'
        }
      }

      if (subjectType === 'origin') {
        return {
          principle,
          error: 'Origin access grants are not supported yet'
        }
      }

      const label = preferredLabel ?? await this.resolvePendingAccessGrantLabel(subjectValue, principle)

      return {
        principle,
        grant: {
          subjectType,
          subjectValue,
          role,
          label
        }
      }
    } catch (error) {
      return {
        principle,
        error: String(error)
      }
    }
  }

  private logPendingGrantFailures (failedGrants: string[], partial: boolean) {
    if (!failedGrants.length) {
      return
    }

    console.error(partial ? 'Failed to add some access grants:' : 'Failed to add access grants:', failedGrants)
  }

  private async resolvePendingAccessGrantLabel (subjectValue: string, fallbackLabel: string = subjectValue): Promise<string> {
    try {
      const subject = sym(subjectValue)
      await solidLogicSingleton.store.fetcher.load(subject.doc())
      const resolved = label(subject).trim()
      return resolved || fallbackLabel
    } catch {
      return label(sym(subjectValue)) || fallbackLabel
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

    const options = entries.map((entry: DirectoryEntry) => this.directoryEntryToOption(entry))
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
    if (!isHttpUri(query)) {
      return []
    }

    const urlOption = await this.createUrlOption(query)
    return dedupeComboboxOptions(urlOption ? [urlOption] : [])
  }

  private async createUrlOption (uri: string): Promise<StringComboboxOptionData | undefined> {
    try {
      await solidLogicSingleton.store.fetcher.load(sym(uri).doc())
    } catch {
      return undefined
    }

    const labelText = await this.resolvePendingAccessGrantLabel(uri)

    return {
      label: labelText === uri ? `Use ${uri}` : labelText,
      value: uri
    }
  }

  private directoryEntryToOption (entry: DirectoryEntry): ComboboxOptionData {
    return {
      label: entry.label,
      value: entry.uri,
      template: this.directoryEntryToOptionTemplate(entry)
    }
  }

  private directoryEntryToOptionTemplate (entry: DirectoryEntry) {
    return html`
      <span class="access-grants-directory-entry">
        <!-- This renders inside the combobox shadow DOM, so the modal stylesheet cannot reach these icons.
             If combobox supports a dedicated option icon hook, we can move this sizing there instead. -->
        ${this.renderDirectoryEntryIcon(entry)}
        <span>${entry.label}</span>
      </span>
    `
  }

  private renderDirectoryEntryIcon (entry: DirectoryEntry) {
    if (entry.sources.includes('contacts') || entry.sources.includes('groups')) {
      return html`<icon-lucide-book-user style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-book-user>`
    }

    if (entry.sources.includes('friends')) {
      return html`<icon-lucide-users style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-users>`
    }

    if (entry.sources.includes('catalog')) {
      return html`<icon-lucide-user-round style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-user-round>`
    }

    return nothing
  }

  private isHttpUri (value: string): boolean {
    return value.startsWith('http://') || value.startsWith('https://')
  }

  private async onCopyLinkClick (event: Event) {
    event.preventDefault()

    if (!this.subjectUri) {
      return
    }

    try {
      await navigator.clipboard.writeText(this.subjectUri)
    } catch (error) {
      console.error('Failed to copy resource link', error)
    }
  }
}
