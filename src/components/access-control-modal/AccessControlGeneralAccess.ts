import { customElement, WebComponent } from '@/lib/components'
import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { ACCESS_ROLES, PUBLIC_ACCESS_ROLES, type AccessRole } from 'solid-logic'
import * as debug from '@/lib/debug'
import type { ComboboxChangeEvent } from '@/components/combobox'

import '~icons/lucide/link'
import '~icons/lucide/globe'
import '@/components/button'
import '@/components/combobox'
import '@/components/combobox-option'

import styles from './AccessControlGeneralAccess.styles.css'
import type { RoleChangedDetail } from './types'

@customElement('solid-ui-access-control-general-access')
export default class AccessControlGeneralAccess extends WebComponent {
  static styles = styles

  @property({ attribute: false })
  accessor subjectUri: string | undefined = undefined

  @property({ attribute: false })
  accessor authenticatedAccessRoleValue: AccessRole = 'No Access'

  @property({ attribute: false })
  accessor publicAccessRoleValue: AccessRole = 'No Access'

  private onAuthenticatedRoleChange (event: ComboboxChangeEvent) {
    this.dispatchRoleChange('authenticated-role-changed', event, ACCESS_ROLES)
  }

  private onPublicRoleChange (event: ComboboxChangeEvent) {
    this.dispatchRoleChange('public-role-changed', event, PUBLIC_ACCESS_ROLES)
  }

  private dispatchRoleChange (
    eventName: 'authenticated-role-changed' | 'public-role-changed',
    event: ComboboxChangeEvent,
    roles: readonly string[]
  ) {
    const value = event.detail.option.value
    if (typeof value !== 'string' || !roles.includes(value)) {
      return
    }

    const detail: RoleChangedDetail = { role: value as AccessRole }
    this.dispatchEvent(new CustomEvent<RoleChangedDetail>(eventName, {
      detail,
      bubbles: true,
      composed: true
    }))
  }

  private async onCopyLinkClick (event: Event) {
    event.preventDefault()

    if (!this.subjectUri) {
      return
    }

    try {
      await navigator.clipboard.writeText(this.subjectUri)
    } catch (error) {
      debug.error('Failed to copy resource link', error)
    }
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

  private renderAuthenticatedModeSelector () {
    return html`
      <solid-ui-combobox
        class="access-role-select access-role-select--compact access-role-select--general access-grants-role access-grants-role--editable access-role-select--authenticated"
        .value=${this.authenticatedAccessRoleValue}
        @change=${this.onAuthenticatedRoleChange}
      >
        ${this.renderAuthenticatedRoleOptions()}
      </solid-ui-combobox>
    `
  }

  private renderPublicModeSelector () {
    return html`
      <solid-ui-combobox
        class="access-role-select access-role-select--compact access-role-select--general access-grants-role access-grants-role--editable access-role-select--public"
        .value=${this.publicAccessRoleValue}
        @change=${this.onPublicRoleChange}
      >
        ${this.renderPublicRoleOptions()}
      </solid-ui-combobox>
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
        ${options.variant === 'authenticated'
          ? this.renderAuthenticatedModeSelector()
          : this.renderPublicModeSelector()}
      </div>
    `
  }

  protected render () {
    return html`
      <section class="access-grants-general" aria-labelledby="general-access-heading">
        <div class="access-grants-general-header">
          <h2 id="general-access-heading">General Access</h2>
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
      </section>
    `
  }
}
