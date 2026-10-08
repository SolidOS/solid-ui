import { customElement, WebComponent } from '@/lib/components'
import { html, nothing } from 'lit'
import type { PropertyValues } from 'lit'
import { property, query, state } from 'lit/decorators.js'
import { label } from '@/utils/label'
import { findImage } from '@/widgets'
import type Dialog from '@/components/dialog'
import { ACCESS_ROLES, DEFAULT_DIRECTORY_SOURCES, solidLogicSingleton, type AccessMode, type AccessRole, type Authorization, type DirectoryEntry } from 'solid-logic'
import { defineAsyncComboboxOptionsProvider, type ComboboxChangeEvent, type ComboboxOptionData } from '@/components/combobox'
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
import type { AccessControlBadgeKind, PendingAccessGrant } from './types'

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
  private accessor sharedAccessRoleValue: AccessRole = 'No Access'

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

      return this.getAuthorizationSubjectLabel(authorization)
    }))

    if (this.accessGrants === grants) {
      this.accessGrantLabels = labels
    }
  }

  private getAccessGrantEntries () {
    return (this.accessGrants ?? [])
      .map((authorization, index) => ({
        authorization,
        index,
        role: this.accessGrantRoles[index] ?? this.getAuthorizationRole(authorization),
        subjectLabel: this.accessGrantLabels[index] ?? this.getAuthorizationSubjectLabel(authorization)
      }))
      .sort((left, right) => {
        const leftIsOwner = left.role === 'Owner'
        const rightIsOwner = right.role === 'Owner'

        if (leftIsOwner && !rightIsOwner) return -1
        if (!leftIsOwner && rightIsOwner) return 1
        return left.index - right.index
      })
  }

  private renderAccessGrants() {
    const query = this.searchValue.trim().toLowerCase()
    const accessGrants = this.getAccessGrantEntries().filter(({ subjectLabel }) => {
      if (!query) {
        return true
      }

      return subjectLabel.toLowerCase().includes(query)
    })

    return html`
      <ul>
        ${accessGrants.length > 0
          ? accessGrants.map(({ authorization, index }) => this.renderAccessGrant(authorization, index))
          : html`<li>No access grants</li>`}
      </ul>
    `
  }

  private renderAccessGrant (authorization: Authorization, index: number) {
    const badge = this.getAuthorizationBadge(authorization)
    const role = this.accessGrantRoles[index] ?? this.getAuthorizationRole(authorization)
    const subjectLabel = this.accessGrantLabels[index] ?? this.getAuthorizationSubjectLabel(authorization)

    return html`
      <li>
        ${this.renderAuthorizationBadge(badge)}
        <h3>${subjectLabel}</h3>
        ${this.renderAuthorizationRole(role, index)}  
      </li>
    `
  }

  private getAuthorizationBadge (authorization: Authorization) {
    const agent = authorization.agent[0]
    if (agent) {
      const image = findImage(sym(agent))
      return {
        kind: 'agent' as const,
        image,
        text: image ? '' : this.getInitials(this.getAuthorizationSubjectLabel(authorization), 2)
      }
    }

    const agentGroup = authorization.agentGroup[0]
    if (agentGroup) {
      return {
        kind: 'group' as const,
        text: this.getInitials(this.getAuthorizationSubjectLabel(authorization), 1)
      }
    }

    const agentClass = authorization.agentClass[0]
    if (agentClass) {
      const image = findImage(sym(agentClass))
      return {
        kind: 'agentClass' as const,
        image,
        text: image ? '' : this.getInitials(this.getAuthorizationSubjectLabel(authorization), 2)
      }
    }

    return {
      kind: 'unknown' as const,
      text: '?'
    }
  }

  private renderAuthorizationBadge (badge: { kind: AccessControlBadgeKind, image?: string, text: string }) {
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

  private getAuthorizationSubjects (authorization: Authorization) {
    return [
      ...authorization.agent,
      ...authorization.agentGroup,
      ...authorization.agentClass,
    ]
  }

  private getAuthorizationSubjectLabel (authorization: Authorization): string {
    const subjects = this.getAuthorizationSubjects(authorization)
    return subjects.length ? subjects.map(subject => label(sym(subject))).join(', ') : 'Unknown access holder'
  }

  private getAuthorizationRole (authorization: Authorization): AccessRole {
    return solidLogicSingleton.acl.roleFromModes(authorization.mode)
  }

  private getRoleValueFromEvent (event: Event, fallback: AccessRole = 'Viewer'): AccessRole {
    const customEvent = event as ComboboxChangeEvent
    const selectedValue = customEvent.detail?.option?.value

    if (typeof selectedValue === 'string') {
      return selectedValue as AccessRole
    }

    const target = event.currentTarget as { value?: string | null } | null

    return typeof target?.value === 'string' ? target.value as AccessRole : fallback
  }

  private renderAuthorizationRole (role: AccessRole, index: number) {
    if (role === 'Owner') {
      return html`<span class="access-grants-role access-grants-role--owner">${role}</span>`
    }

    return html`
      <solid-ui-combobox
        class="access-role-select access-role-select--compact access-grants-role access-grants-role--editable"
        .value=${role}
        @change=${(event: Event) => this.onAccessGrantRoleInput(index, event)}
      >
        ${this.renderGrantRoleOptions()}
      </solid-ui-combobox>
    `
  }

  private renderModeSelector (variant: 'add' | 'general' = 'add') {
    const className = variant === 'add'
      ? 'access-role-select access-role-select--top'
      : 'access-role-select access-role-select--compact'
    const value = variant === 'add' ? this.addAccessRoleValue : this.sharedAccessRoleValue

    return html`
      <solid-ui-combobox
        class=${className}
        .value=${value}
        @change=${variant === 'add' ? this.onAddAccessRoleInput : this.onSharedAccessRoleInput}
      >
        ${variant === 'add' ? this.renderAddRoleOptions() : this.renderGeneralRoleOptions()}
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

  private renderGeneralRoleOptions () {
    return ACCESS_ROLES.map(role => html`
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
              @click=${() => this.removePendingAccessGrant(index)}
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
    const accessGrantOptions = this.getAccessGrantSearchOptions()

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
          ${accessGrantOptions.map(option => html`
            <solid-ui-combobox-option .value=${option.value}>
              ${option.label}
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
            Copy Link
          </solid-ui-button>
        </div>
        <div class="access-grants-general-share">
          <div class="access-grants-general-share-content">
            ${this.renderGeneralAccessIcon()}
            <div class="access-grants-general-share-text">
              <p class="access-grants-general-share-text-title">Share with Anyone Signed In</p>
              <p class="access-grants-general-share-text-description">Users must sign in to SolidOS to access this shared item using the link.</p>
            </div>
          </div>
          ${this.renderModeSelector('general')}
        </div>
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
                    ?disabled=${(!this.pendingAccessGrants.length && !this.principalInputValue.trim()) || this.submitting}
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

    await this.commitPrinciplesFromInput()
  }

  private async onSaveClick () {
    if (this.submitting) {
      return
    }

    if (this.principalInputValue.trim()) {
      await this.commitPrinciplesFromInput()
    }

    await this.savePendingAccessGrants()
  }

  private onCancelClick () {
    this.dialog?.close()
  }

  private async savePendingAccessGrants () {
    if (this.submitting) {
      return
    }

    if (!this.pendingAccessGrants.length) {
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
      for (const draftGrant of this.pendingAccessGrants) {
        const subject = { type: draftGrant.subjectType, iri: draftGrant.subjectValue }

        const plan = draftGrant.role === 'No Access'
          ? await solidLogicSingleton.acl.planRevoke(this.subjectUri, subject)
          : await solidLogicSingleton.acl.planGrant(this.subjectUri, subject, this.getRoleModes(draftGrant.role))

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
    const target = event.currentTarget as { value?: string } | null
    this.principalInputValue = target?.value ?? ''
  }

  private onPrincipalSelect (event: Event) {
    const customEvent = event as ComboboxChangeEvent
    const option = customEvent.detail?.option

    if (!option) {
      return
    }

    if (typeof option.value !== 'string' || !option.value) {
      return
    }

    void this.queuePendingPrinciples([option.value], this.addAccessRoleValue, option.label)
  }

  private onSearchInput (event: Event) {
    const target = event.currentTarget as { value?: string } | null
    this.searchValue = target?.value ?? ''
  }

  private onSearchSelect (event: Event) {
    const customEvent = event as ComboboxChangeEvent
    const option = customEvent.detail?.option

    if (option && typeof option.label === 'string') {
      this.searchValue = option.label
    }
  }

  private onAddAccessRoleInput (event: Event) {
    const nextRole = this.getRoleValueFromEvent(event)
    this.addAccessRoleValue = nextRole
    this.pendingAccessGrants = this.pendingAccessGrants.map(grant => ({
      ...grant,
      role: nextRole
    }))
  }

  private onSharedAccessRoleInput (event: Event) {
    const nextRole = this.getRoleValueFromEvent(event)
    this.sharedAccessRoleValue = nextRole
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

  private async commitPrinciplesFromInput (): Promise<boolean> {
    const rawValue = this.principalInputValue.trim()
    if (!rawValue) {
      return false
    }

    await this.queuePendingPrinciples([rawValue], this.addAccessRoleValue, undefined, rawValue)
    return true
  }

  private async queuePendingPrinciples (
    principles: string[],
    role: AccessRole = this.addAccessRoleValue,
    preferredLabel?: string,
    inputSnapshot?: string
  ) {
    const snapshot = inputSnapshot ?? this.principalInputValue.trim()
    const pendingGrants = await Promise.all(principles.map(async principle => this.createPendingAccessGrant(principle, role, preferredLabel)))
    const newGrants = pendingGrants.filter((grant): grant is PendingAccessGrant => Boolean(grant))

    if (!newGrants.length) {
      return
    }

    const merged = [...this.pendingAccessGrants, ...newGrants]
    this.pendingAccessGrants = this.dedupePendingAccessGrants(merged)

    if (this.principalInputValue.trim() === snapshot) {
      this.principalInputValue = ''
    }
  }

  private async createPendingAccessGrant (
    principle: string,
    role: AccessRole = this.addAccessRoleValue,
    preferredLabel?: string
  ): Promise<PendingAccessGrant | undefined> {
    const normalizedPrinciple = this.normalizeAccessPrincipleInput(principle)
    const resolvedPrinciple = await solidLogicSingleton.acl.classifyAccessControlSubject(normalizedPrinciple)
    const fallbackKind = this.isHttpUri(principle) ? 'agent' : undefined
    const subjectType = resolvedPrinciple?.kind ?? fallbackKind
    const subjectValue = resolvedPrinciple?.subjectValue ?? normalizedPrinciple

    if (!subjectType) {
      console.error(`Could not classify access target: ${principle}`)
      return undefined
    }

    if (subjectType === 'origin') {
      console.error(`Origin access grants are not supported yet: ${principle}`)
      return undefined
    }

    const label = preferredLabel ?? await this.resolvePendingAccessGrantLabel(subjectValue, principle)

    return {
      subjectType,
      subjectValue,
      role,
      label
    }
  }

  private async resolvePendingAccessGrantLabel (subjectValue: string, fallbackLabel: string): Promise<string> {
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
    const seen = new Set<string>()

    return draftGrants.filter(draftGrant => {
      const key = `${draftGrant.subjectType}:${draftGrant.subjectValue}`
      if (seen.has(key)) {
        return false
      }

      seen.add(key)
      return true
    })
  }

  private readonly accessPrincipleOptionsProvider = defineAsyncComboboxOptionsProvider(async (filter: string) => {
    const query = this.getPrincipleSearchTerm(filter)
    const urlOption = this.isHttpUri(query) ? await this.createUrlOption(query) : undefined
    const preferredOptions = this.dedupeComboboxOptions([urlOption].filter((option): option is ComboboxOptionData => Boolean(option)))

    if (query.length < 2) {
      return preferredOptions.length ? preferredOptions : [{
        label: 'Type at least 2 characters to search',
        value: '',
        selectable: false
      }]
    }

    let entries: DirectoryEntry[] = []

    try {
      entries = await solidLogicSingleton.directory.search({
        query,
        sources: DEFAULT_DIRECTORY_SOURCES
      })
    } catch (error) {
      if (!urlOption) {
        throw error
      }
    }

    const options = entries.map((entry: DirectoryEntry) => this.directoryEntryToOption(entry))
    return [...preferredOptions, ...options]
  })

  private async createUrlOption (uri: string): Promise<ComboboxOptionData | undefined> {
    try {
      await solidLogicSingleton.store.fetcher.load(sym(uri).doc())
    } catch {
      return undefined
    }

    const labelText = await this.resolvePendingAccessGrantLabel(uri, uri)

    return {
      label: labelText === uri ? `Use ${uri}` : labelText,
      value: uri
    }
  }

  private dedupeComboboxOptions (options: ComboboxOptionData[]): ComboboxOptionData[] {
    const seen = new Set<string>()

    return options.filter(option => {
      if (typeof option.value !== 'string' || !option.value) {
        return false
      }

      if (seen.has(option.value)) {
        return false
      }

      seen.add(option.value)
      return true
    })
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
      <span style="display: inline-flex; align-items: center; gap: 8px; line-height: 1;">
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

  private getAccessGrantSearchOptions (): ComboboxOptionData[] {
    return this.getAccessGrantEntries().map(({ subjectLabel }) => ({
      label: subjectLabel,
      value: subjectLabel
    }))
  }

  private getPrincipleSearchTerm (value: string): string {
    const lastCommaIndex = value.lastIndexOf(',')
    if (lastCommaIndex < 0) {
      return value.trim()
    }

    return value.slice(lastCommaIndex + 1).trim()
  }

  private isHttpUri (value: string): boolean {
    return value.startsWith('http://') || value.startsWith('https://')
  }

  private normalizeAccessPrincipleInput (value: string): string {
    return value.trim()
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
