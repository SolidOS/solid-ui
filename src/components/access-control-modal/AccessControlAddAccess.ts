import { customElement, WebComponent } from '@/lib/components'
import { html, nothing } from 'lit'
import { property } from 'lit/decorators.js'
import { ACCESS_ROLES, type AccessRole, type DirectoryEntry } from 'solid-logic'
import type { AsyncComboboxOptionsProvider, ComboboxChangeEvent } from '@/components/combobox'

import '~icons/lucide/book-user'
import '~icons/lucide/user-round'
import '~icons/lucide/users'
import '~icons/lucide/circle-x'
import '@/components/button'
import '@/components/combobox'
import '@/components/combobox-option'

import styles from './AccessControlAddAccess.styles.css'
import type { PendingAccessGrant, PendingGrantRemovedDetail, RoleChangedDetail, TargetInputDetail, TargetSelectedDetail } from './types'

export function directoryEntryOptionTemplate (entry: DirectoryEntry) {
  return html`
    <span class="access-grants-directory-entry">
      ${renderDirectoryEntryIcon(entry)}
      <span>${entry.label}</span>
    </span>
  `
}

function renderDirectoryEntryIcon (entry: DirectoryEntry) {
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

@customElement('solid-ui-access-control-add-access')
export default class AccessControlAddAccess extends WebComponent {
  static styles = styles

  @property({ attribute: false })
  accessor principalInputValue = ''

  @property({ attribute: false })
  accessor addAccessRoleValue: AccessRole = 'Viewer'

  @property({ attribute: false })
  accessor pendingAccessGrants: PendingAccessGrant[] = []

  @property({ attribute: false })
  accessor inputError = ''

  @property({ attribute: false })
  accessor asyncOptionsProvider: AsyncComboboxOptionsProvider | null = null

  private onPrincipalInput (event: Event) {
    const value = this.getEventValue(event)
    this.dispatchEvent(new CustomEvent<TargetInputDetail>('target-input', {
      detail: { value },
      bubbles: true,
      composed: true
    }))
  }

  private onPrincipalSelect (event: ComboboxChangeEvent) {
    const option = event.detail.option
    if (typeof option.value !== 'string') {
      return
    }

    this.dispatchEvent(new CustomEvent<TargetSelectedDetail>('target-selected', {
      detail: {
        value: option.value,
        label: option.label
      },
      bubbles: true,
      composed: true
    }))
  }

  private onRoleChange (event: ComboboxChangeEvent) {
    const role = event.detail.option.value
    if (typeof role !== 'string' || !ACCESS_ROLES.includes(role as AccessRole)) {
      return
    }

    this.dispatchEvent(new CustomEvent<RoleChangedDetail>('role-changed', {
      detail: { role: role as AccessRole },
      bubbles: true,
      composed: true
    }))
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
        <p>Add person, group or software agent URL.</p>
        <div class="access-grants-form-main">
          <div class="access-grants-input">
            <solid-ui-combobox
              class="access-principal-combobox"
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
            .value=${this.addAccessRoleValue}
            @change=${this.onRoleChange}
          >
            ${ACCESS_ROLES
              .filter(role => role !== 'No Access')
              .map(role => html`
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
            <span class="access-grants-pending-item-label">${grant.label}</span>
            <solid-ui-button
              type="button"
              variant="ghost"
              class="access-grants-pending-item-remove"
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
