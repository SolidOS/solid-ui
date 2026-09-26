import { customElement, WebComponent } from '@/lib/components'
import { html, nothing } from 'lit'
import type { PropertyValues } from 'lit'
import { property, query, state } from 'lit/decorators.js'
import { label } from '@/utils/label'
import { findImage } from '@/widgets'
import type Dialog from '@/components/dialog'
import { solidLogicSingleton } from 'solid-logic'
import type { AccessMode, Authorization, SubjectType } from 'solid-logic'
import type { AccessControlBadgeKind, AccessRole, DraftGrant } from './types'
import { sym } from 'rdflib'

import '~icons/lucide/chevron-down'
import '~icons/lucide/link'
import '~icons/lucide/search'
import '~icons/lucide/globe'
import '@/components/dialog'
import '@/components/dialog-content'
import '@/components/dialog-footer'
import '@/components/button'
import '@/components/input'
import '@/components/combobox'
import '@/components/combobox-option'


import styles from './AccessControlModal.styles.css'


const ACCESS_ROLE_RULES = [
  { modes: ['Control'], label: 'Owner' },
  { modes: ['Write'], label: 'Editor' },
  { modes: ['Append', 'Read'], label: 'Poster' },
  { modes: ['Append'], label: 'Submitter' },
  { modes: ['Read'], label: 'Viewer' }
] as const

@customElement('solid-ui-access-control-modal')
export default class AccessControlModal extends WebComponent {
  static styles = styles

  @property({ attribute: false })
  accessor subjectUri: string | undefined = undefined

  @property({ attribute: false })
  accessor accessGrants: Authorization[] | undefined = undefined

  @state()
  private accessor principleInputValue: string = ''

  @state()
  private accessor roleValue: string = 'Viewer'

  @state()
  private accessor searchValue: string = ''

  @state()
  private accessor failed: boolean = false

  @state()
  private accessor submitting: boolean = false

  @state()
  private accessor accessGrantRoles: AccessRole[] = []

  @query('solid-ui-dialog')
  private accessor dialog: Dialog | null = null

  connectedCallback () {
    super.connectedCallback()
  }

  protected willUpdate (changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties)

    if (changedProperties.has('accessGrants')) {
      this.accessGrantRoles = this.accessGrants?.map(item => this.getAuthorizationRole(item)) ?? []
    }
  }

  private renderAccessGrants() {
    return html`
      <ul>
        ${!this.accessGrants || this.accessGrants.length === 0 ? html`<li>No access grants</li>` : nothing}
        ${this.accessGrants?.map((item, index) => this.renderAccessGrant(item, index))}
      </ul>
    `
  }

  private renderAccessGrant (authorization: Authorization, index: number) {
    const badge = this.getAuthorizationBadge(authorization)
    const role = this.accessGrantRoles[index] ?? this.getAuthorizationRole(authorization)

    return html`
      <li>
        ${this.renderAuthorizationBadge(badge)}
        <h3>${this.renderAuthorizationSubjects(authorization)}</h3>
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
        text: image ? '' : this.getInitials(this.renderAuthorizationSubjects(authorization), 2)
      }
    }

    const agentGroup = authorization.agentGroup[0]
    if (agentGroup) {
      return {
        kind: 'group' as const,
        text: this.getInitials(this.renderAuthorizationSubjects(authorization), 1)
      }
    }

    const agentClass = authorization.agentClass[0]
    if (agentClass) {
      const image = findImage(sym(agentClass))
      return {
        kind: 'agentClass' as const,
        image,
        text: image ? '' : this.getInitials(this.renderAuthorizationSubjects(authorization), 2)
      }
    }

    const origin = authorization.origin[0]
    if (origin) {
      return {
        kind: 'origin' as const,
        text: 'O'
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

  private renderAuthorizationSubjects (authorization: Authorization): string {
    const subjects = [
      ...authorization.agent,
      ...authorization.agentGroup,
      ...authorization.agentClass,
      ...authorization.origin
    ]

    return subjects.length ? subjects.map(subject => label(sym(subject))).join(', ') : 'Unknown access holder'
  }

  private getAuthorizationRole (authorization: Authorization): AccessRole {
    const modes = new Set(authorization.mode)
    const matchingRule = ACCESS_ROLE_RULES.find(rule => rule.modes.every(mode => modes.has(mode)))

    return matchingRule?.label ?? 'Viewer'
  }

  private renderAuthorizationRole (role: AccessRole, index: number) {
    if (role === 'Owner') {
      return html`<span class="access-grants-role access-grants-role--owner">${role}</span>`
    }

    return html`
      <solid-ui-combobox
        class="access-grants-role access-grants-role--editable"
        .value=${role}
        @input=${(event: Event) => this.onAccessGrantRoleInput(index, event)}
      >
        <solid-ui-combobox-option value="Editor">Editor</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Viewer">Viewer</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Poster">Poster</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Submitter">Submitter</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Remove">Remove</solid-ui-combobox-option>
      </solid-ui-combobox>
    `
  }

  private renderModeSelector () {

    return html`
      <solid-ui-combobox
        class="access-role-select"
        .value=${this.roleValue}
        @input=${this.onRoleInput}
      >
        <solid-ui-combobox-option value="Owner">Owner</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Editor">Editor</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Viewer">Viewer</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Poster">Poster</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Submitter">Submitter</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Remove">Remove</solid-ui-combobox-option>
      </solid-ui-combobox>
    `
  }

  private renderAddAccessForm () {
    return html`
      <div class="access-grants-form">
        <solid-ui-input
          label="Add person, group or software agent URL."
          .value=${this.principleInputValue}
          placeholder="Paste a link or enter names (use commas to add multiple)"
          @input=${this.onPrincipleInput}
        ></solid-ui-input>
        ${this.renderModeSelector()}
      </div>
    `
  }

  private renderAccessGrantsSection () {
    return html`
      <div class="access-grants-header">
        <h2>Share with</h2>
        <solid-ui-input
          class="access-grants-search-input"
          .value=${this.searchValue}
          placeholder="Search"
          @input=${this.onSearchInput}
        >
          <icon-lucide-search slot="left-icon"></icon-lucide-search>
        </solid-ui-input>
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
          ${this.renderModeSelector()}
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
    return [...(ACCESS_ROLE_RULES.find(rule => rule.label === role)?.modes ?? [])]
  }

  private parsePrincipleInput (): DraftGrant[] | undefined {
    const value = this.principleInputValue.trim()
    if (!value) return undefined

    const principleList = value.split(',').map(item => item.trim()).filter(item => item)
    if (!principleList.length) return undefined

    return principleList.map((principle): DraftGrant => {
      const subjectType: SubjectType = solidLogicSingleton.resource.isWebId(principle) ? 'agent' : 'agentGroup'

      return {
        subjectType,
        subjectValue: principle,
        role: this.roleValue as AccessRole
      }
    })
  }
  
  protected render () {
    const subject = this.subjectUri ? sym(this.subjectUri) : undefined
    const subjectLabel = subject ? label(subject) : ''
    const dialogTitle = `Share ${subjectLabel || 'this resource'}` 
    
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
                    @click="${() => this.dialog?.close()}"
                  >
                    Cancel
                  </solid-ui-button>
                  <solid-ui-button
                    ?disabled=${!this.principleInputValue || this.submitting}
                    ?loading=${this.submitting}
                    type="submit"
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

    this.failed = false

    const draftGrants = this.parsePrincipleInput()
    if (!draftGrants?.length) {
      return
    }

    if (!this.subjectUri) {
      this.failed = true
      return
    }

    this.submitting = true
    // Basic added to address PR feedback has not been tested, currently only structure implemented
    try {
      for (const draftGrant of draftGrants) {
        const subject = { type: draftGrant.subjectType, iri: draftGrant.subjectValue }

        const plan = this.roleValue === 'Remove'
          ? await solidLogicSingleton.acl.planRevoke(this.subjectUri, subject)
          : await solidLogicSingleton.acl.planGrant(this.subjectUri, subject, this.getRoleModes(draftGrant.role))

        await solidLogicSingleton.acl.applyPlan(plan)
      }

      this.principleInputValue = ''
      this.dialog?.close()
    } catch (error) {
      this.failed = true
      console.error('Failed to save access changes', error)
    } finally {
      this.submitting = false
    }

  }

  private onPrincipleInput (event: Event) {
    const target = event.currentTarget as HTMLInputElement | null
    this.principleInputValue = target?.value ?? ''
  }

  private onSearchInput (event: Event) {
    const target = event.currentTarget as HTMLInputElement | null
    this.searchValue = target?.value ?? ''
  }

  private onRoleInput (event: Event) {
    const target = event.currentTarget as { value?: string } | null
    this.roleValue = target?.value ?? 'Viewer'
  }

  private onAccessGrantRoleInput (index: number, event: Event) {
    const target = event.currentTarget as { value?: string } | null
    const value = target?.value

    if (!value) return

    this.accessGrantRoles = this.accessGrantRoles.map((role, roleIndex) => {
      return roleIndex === index ? value as AccessRole : role
    })
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
