import { customElement, WebComponent } from '@/lib/components'
import { html, nothing, type PropertyValues } from 'lit'
import { property, query } from 'lit/decorators.js'
import { ACCESS_ROLES, type AccessRole, type DirectoryEntry } from 'solid-logic'
import type { AsyncComboboxOptionsProvider, ComboboxChangeEvent, ComboboxOptionData } from '@/components/combobox'

import '~icons/lucide/book-user'
import '~icons/lucide/user-round'
import '~icons/lucide/users'
import '~icons/lucide/circle-x'
import '~icons/lucide/globe'
import '@/components/button'
import '@/components/combobox'
import '@/components/combobox-option'

import styles from './AccessControlAddAccess.styles.css'
import type { AdvancedSharingChangedDetail, PendingAccessGrant, PendingGrantRemovedDetail, RoleChangedDetail, TargetInputDetail, TargetSelectedDetail } from './types'

export function directoryEntryOptionIcon (entry: DirectoryEntry) {
  if (entry.sources.includes('contacts') || entry.sources.includes('groups')) {
    return html`<icon-lucide-book-user></icon-lucide-book-user>`
  }

  if (entry.sources.includes('friends')) {
    return html`<icon-lucide-users></icon-lucide-users>`
  }

  if (entry.sources.includes('catalog')) {
    return html`<icon-lucide-user-round></icon-lucide-user-round>`
  }

  return undefined
}

@customElement('solid-ui-access-control-add-access')
export default class AccessControlAddAccess extends WebComponent {
  static styles = styles

  @property({ attribute: false })
  accessor principalInputValue = ''

  @property({ attribute: false })
  accessor addAccessRoleValue: AccessRole = 'No Access'

  @property({ attribute: false })
  accessor pendingAccessGrants: PendingAccessGrant[] = []

  @property({ attribute: false })
  accessor inputError = ''

  @property({ type: Boolean })
  accessor disabled = false

  @property({ attribute: false })
  accessor asyncOptionsProvider: AsyncComboboxOptionsProvider | null = null

  @property({ type: Boolean })
  accessor showAdvancedToggle = false

  @property({ type: Boolean })
  accessor advancedSharingOpen = false

  @query('.access-role-select--top')
  private accessor roleCombobox: HTMLElement & { value?: string } | null = null

  protected updated (changedProperties: PropertyValues<this>) {
    super.updated(changedProperties)

    const roleCombobox = this.roleCombobox
    if (changedProperties.has('addAccessRoleValue') && roleCombobox && roleCombobox.value !== this.addAccessRoleValue) {
      roleCombobox.value = this.addAccessRoleValue
    }
  }

  private onAdvancedSharingToggle () {
    this.dispatchEvent(new CustomEvent<AdvancedSharingChangedDetail>('advanced-sharing-changed', {
      detail: { open: !this.advancedSharingOpen },
      bubbles: true,
      composed: true
    }))
  }

  private onPrincipalInput (event: Event) {
    const value = this.getEventValue(event)
    this.dispatchEvent(new CustomEvent<TargetInputDetail>('target-input', {
      detail: { value },
      bubbles: true,
      composed: true
    }))
  }

  private onPrincipalSelect (event: ComboboxChangeEvent) {
    const option = event.detail.option as ComboboxOptionData & { targetKind?: 'origin' | 'trustedApp' }
    if (typeof option.value !== 'string') {
      return
    }

    this.dispatchEvent(new CustomEvent<TargetSelectedDetail>('target-selected', {
      detail: {
        value: option.value,
        label: option.label,
        targetKind: option.targetKind
      },
      bubbles: true,
      composed: true
    }))
  }

  private onRoleChange (event: ComboboxChangeEvent) {
    const role = event.detail.option.value
    const accessRole = typeof role === 'string'
      ? ACCESS_ROLES.find(candidate => candidate === role)
      : undefined
    if (!accessRole) {
      return
    }

    this.dispatchEvent(new CustomEvent<RoleChangedDetail>('role-changed', {
      detail: { role: accessRole },
      bubbles: true,
      composed: true
    }))

    if (this.roleCombobox) {
      this.roleCombobox.value = 'No Access'
      const input = this.roleCombobox.shadowRoot?.querySelector<HTMLInputElement>('input')
      if (input) input.value = 'No Access'
    }
  }

  private onPendingGrantRemove (index: number) {
    this.dispatchEvent(new CustomEvent<PendingGrantRemovedDetail>('pending-grant-removed', {
      detail: { index },
      bubbles: true,
      composed: true
    }))
  }

  private getEventValue (event: Event): string {
    const target = event.currentTarget as { value?: string | null } | null
    return typeof target?.value === 'string' ? target.value : ''
  }

  protected render () {
    return html`
      <section class="access-grants-form" aria-label="Add access">
        <div class="access-grants-form-heading">
          <p>Add person, group or software agent URL.</p>
          ${this.showAdvancedToggle
            ? html`
              <button
                type="button"
                class="access-control-advanced-toggle"
                role="switch"
                aria-checked=${this.advancedSharingOpen ? 'true' : 'false'}
                @click=${this.onAdvancedSharingToggle}
              >
                <span class="access-control-switch-track" aria-hidden="true">
                  <span class="access-control-switch-thumb"></span>
                </span>
                <span>Advanced</span>
              </button>
            `
            : nothing}
        </div>
        <div class="access-grants-form-main">
          <div class="access-grants-input">
            <solid-ui-combobox
              class="access-principal-combobox"
              .disabled=${this.disabled}
              label="Add person, group or software agent URL."
              .srOnlyLabel=${true}
              .value=${this.principalInputValue}
              placeholder="Paste a link or enter a name"
              .asyncOptionsProvider=${this.asyncOptionsProvider}
              @input=${this.onPrincipalInput}
              @change=${this.onPrincipalSelect}
            ></solid-ui-combobox>
            ${this.inputError
              ? html`<p class="access-principal-error" role="alert">${this.inputError}</p>`
              : nothing}
            ${this.renderPendingAccessGrants()}
          </div>
          <solid-ui-combobox
            class="access-role-select access-role-select--top"
            label="Access role for added people"
            .srOnlyLabel=${true}
            .disabled=${this.disabled || !this.pendingAccessGrants.length}
            .value=${this.addAccessRoleValue}
            @change=${this.onRoleChange}
          >
            ${ACCESS_ROLES.map(role => html`
                <solid-ui-combobox-option value=${role}>${role}</solid-ui-combobox-option>
              `)}
          </solid-ui-combobox>
        </div>
      </section>
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
            <span class="access-grants-pending-item-label">
              ${grant.targetKind === 'trustedApp'
                ? html`<icon-lucide-globe style="width: 13px; height: 13px; vertical-align: -2px;"></icon-lucide-globe>`
                : nothing}
              ${grant.label}
            </span>
            <solid-ui-button
              type="button"
              variant="ghost"
              class="access-grants-pending-item-remove"
              ?disabled=${this.disabled}
              @click=${() => this.onPendingGrantRemove(index)}
            >
              <span class="sr-only">Remove ${grant.label}</span>
              <icon-lucide-circle-x slot="icon"></icon-lucide-circle-x>
            </solid-ui-button>
          </div>
        `)}
      </div>
    `
  }
}
