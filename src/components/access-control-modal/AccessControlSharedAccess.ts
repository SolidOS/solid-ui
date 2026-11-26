import { customElement, WebComponent } from '@/lib/components'
import { html, nothing } from 'lit'
import { property, state } from 'lit/decorators.js'
import { ACCESS_ROLES, type AccessRole, type ContainerAccessScope } from 'solid-logic'
import { findImage } from '@/widgets'
import type { ComboboxChangeEvent } from '@/components/combobox'
import { sym } from 'rdflib'

import '@/components/combobox'
import '@/components/combobox-option'
import '~icons/lucide/globe'

import styles from './AccessControlSharedAccess.styles.css'
import type { AccessGrantRoleChangedDetail, AccessGrantScopeChangedDetail, AccessGrantViewModel } from './types'

@customElement('solid-ui-access-control-shared-access')
export default class AccessControlSharedAccess extends WebComponent {
  static styles = styles

  @property({ attribute: false })
  accessor accessGrantViewModels: AccessGrantViewModel[] = []

  @property({ type: Boolean })
  accessor disabled = false

  @property({ type: Boolean })
  accessor showContainerScope = false

  @property({ type: Boolean })
  accessor advancedSharingOpen = false

  @state()
  private accessor searchValue = ''

  private onSearchInput (event: Event) {
    const target = event.currentTarget as { value?: string | null } | null
    this.searchValue = typeof target?.value === 'string' ? target.value : ''
  }

  private onSearchSelect (event: ComboboxChangeEvent) {
    const option = event.detail.option
    if (typeof option.label !== 'string') {
      return
    }

    const selectedLabel = option.label.trim()
    this.searchValue = selectedLabel
  }

  private onAccessGrantRoleChange (id: string, event: ComboboxChangeEvent) {
    const value = event.detail.option.value
    const accessRole = typeof value === 'string'
      ? ACCESS_ROLES.find(candidate => candidate === value)
      : undefined
    if (!accessRole) {
      return
    }

    const detail: AccessGrantRoleChangedDetail = {
      id,
      role: accessRole
    }

    this.dispatchEvent(new CustomEvent<AccessGrantRoleChangedDetail>('access-grant-role-changed', {
      detail,
      bubbles: true,
      composed: true
    }))
  }

  private onAccessGrantScopeChange (id: string, event: ComboboxChangeEvent) {
    const value = event.detail.option.value
    if (value !== 'folder+contents' && value !== 'folder' && value !== 'contents') {
      return
    }

    this.dispatchEvent(new CustomEvent<AccessGrantScopeChangedDetail>('access-grant-scope-changed', {
      detail: { id, scope: value as ContainerAccessScope },
      bubbles: true,
      composed: true
    }))
  }

  private getFilteredAccessGrants () {
    const query = this.searchValue.trim().toLowerCase()

    return this.accessGrantViewModels.filter(({ subjectLabel, subjects }) => {
      if (!subjects.length) {
        return false
      }

      return !query || subjectLabel.toLowerCase().includes(query)
    })
  }

  private renderAccessGrant (entry: AccessGrantViewModel) {
    return html`
      <li>
        ${this.renderAuthorizationBadge(entry.authorization, entry.subjectLabel)}
        <h3>${entry.subjectLabel}</h3>
        ${this.showContainerScope && (this.advancedSharingOpen || entry.scope !== 'folder+contents')
          ? html`
            <solid-ui-combobox
              class="access-scope-select access-scope-select--compact"
              label="Applies To"
              .srOnlyLabel=${true}
              .disabled=${this.disabled}
              .value=${entry.scope ?? 'folder+contents'}
              @change=${(event: ComboboxChangeEvent) => this.onAccessGrantScopeChange(entry.id, event)}
            >
              <solid-ui-combobox-option value="folder+contents">Folder And Contents</solid-ui-combobox-option>
              <solid-ui-combobox-option value="folder">Folder Only</solid-ui-combobox-option>
              <solid-ui-combobox-option value="contents">Container Only</solid-ui-combobox-option>
            </solid-ui-combobox>
          `
          : nothing}
        ${this.renderAuthorizationRole(entry.role, entry.id, entry.subjectLabel)}
      </li>
    `
  }

  private renderAuthorizationBadge (authorization: AccessGrantViewModel['authorization'], subjectLabel: string) {
    const badge = this.getAuthorizationBadge(authorization, subjectLabel)

    return html`
      <div class="access-grants-image access-grants-image--${badge.kind}">
        ${badge.image
          ? html`<img src=${badge.image} alt="" aria-hidden="true" />`
          : badge.kind === 'origin'
            ? html`<icon-lucide-globe aria-hidden="true"></icon-lucide-globe>`
          : html`<span aria-hidden="true">${badge.text}</span>`}
      </div>
    `
  }

  private getAuthorizationBadge (
    authorization: AccessGrantViewModel['authorization'],
    subjectLabel: string
  ) {
    const agent = authorization.agent[0]
    if (agent) {
      const image = findImage(sym(agent))
      return {
        kind: 'agent' as const,
        image,
        text: image ? '' : this.getInitials(subjectLabel, 2)
      }
    }

    const agentGroup = authorization.agentGroup[0]
    if (agentGroup) {
      return {
        kind: 'agentGroup' as const,
        text: this.getInitials(subjectLabel, 1)
      }
    }

    const agentClass = authorization.agentClass[0]
    if (agentClass) {
      const image = findImage(sym(agentClass))
      return {
        kind: 'agentClass' as const,
        image,
        text: image ? '' : this.getInitials(subjectLabel, 2)
      }
    }

    if (authorization.origin[0]) {
      return {
        kind: 'origin' as const,
        text: 'O',
        image: ''
      }
    }

    return {
      kind: 'unknown' as const,
      text: '?'
    }
  }

  private getInitials (value: string, maxWords = 2): string {
    const parts = value.split(/\s+/).filter(Boolean).slice(0, maxWords)
    const initials = parts.map(part => part[0]).join('')
    return (initials || value.slice(0, maxWords)).toUpperCase()
  }

  private renderAuthorizationRole (role: AccessRole, id: string, subjectLabel: string) {
    return html`
      <solid-ui-combobox
        class="access-role-select access-role-select--compact access-grants-role access-grants-role--editable ${role === 'Owner' ? 'access-grants-role--owner' : ''}"
        label="Access role for ${subjectLabel}"
        .srOnlyLabel=${true}
        .disabled=${this.disabled}
        .value=${role}
        @change=${(event: ComboboxChangeEvent) => this.onAccessGrantRoleChange(id, event)}
      >
        ${this.renderGrantRoleOptions()}
      </solid-ui-combobox>
    `
  }

  private renderGrantRoleOptions () {
    return ACCESS_ROLES.map(role => html`
      <solid-ui-combobox-option value=${role}>${role === 'No Access' ? 'Remove' : role}</solid-ui-combobox-option>
    `)
  }

  protected render () {
    const accessGrants = this.getFilteredAccessGrants()

    return html`
      <section aria-labelledby="access-grants-heading">
        <div class="access-grants-header">
          <h2 id="access-grants-heading">Shared with</h2>
          <solid-ui-combobox
            class="access-grants-search-input"
            label="Search access grants"
            .srOnlyLabel=${true}
            .value=${this.searchValue}
            placeholder="Search"
            @input=${this.onSearchInput}
            @change=${this.onSearchSelect}
          >
            ${this.accessGrantViewModels
              .filter(({ subjects }) => subjects.length > 0)
              .map(({ subjectLabel }) => html`
                <solid-ui-combobox-option .value=${subjectLabel}>
                  ${subjectLabel}
                </solid-ui-combobox-option>
              `)}
          </solid-ui-combobox>
        </div>
        <div class="access-grants-list">
          <ul>
            ${accessGrants.length > 0
              ? accessGrants.map(entry => this.renderAccessGrant(entry))
              : html`<li>No access grants</li>`}
          </ul>
        </div>
      </section>
    `
  }
}
