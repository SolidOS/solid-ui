import { customElement, WebComponent } from '@/lib/components'
import { html } from 'lit'
import { property } from 'lit/decorators.js'

import '@/components/error-state'

import styles from './AccessControlErrors.styles.css'
import type { AccessSaveError } from './types'

@customElement('solid-ui-access-control-errors')
export default class AccessControlErrors extends WebComponent {
  static styles = styles

  @property({ attribute: false })
  accessor errors: AccessSaveError[] = []

  @property({ attribute: false })
  accessor successfulChangesRefreshed = true

  private onClose (event: Event) {
    event.stopPropagation()
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      composed: true
    }))
  }

  private getScopeLabel (scope: NonNullable<Extract<AccessSaveError, { action: 'grant' | 'revoke' }>['scope']>) {
    return scope === 'folder+contents'
      ? 'folder and contents'
      : scope === 'container'
        ? 'folder'
        : scope === 'contents'
          ? 'contents'
          : 'resource'
  }

  protected render () {
    if (!this.errors.length) {
      return html``
    }

    return html`
      <solid-ui-error-state
        title="Some access changes could not be saved"
        message=${this.successfulChangesRefreshed
          ? 'Any successful changes are shown above. The list below shows only the changes that failed. Close this dialog and reopen it if you want to try again.'
          : 'Some changes may have been saved, but we could not refresh the Shared with list. The list below shows only the changes that failed. Close this dialog and reopen it if you want to try again.'}
        @close=${this.onClose}
      >
        <ul class="access-control-save-errors">
          ${this.errors.map(error => html`
            <li>
              <span class="access-control-save-error-label">${error.label}</span>
              <span class="access-control-save-error-detail">
                ${error.action === 'grant'
                ? `Could not grant ${error.role ?? 'access'} for ${error.scope ? this.getScopeLabel(error.scope) : 'resource'}`
                  : error.action === 'revoke'
                  ? `Could not remove access for ${error.scope ? this.getScopeLabel(error.scope) : 'resource'}`
                    : error.action === 'reset'
                      ? 'Could not reset sharing'
                    : 'Could not save access changes'}
              </span>
              <span class="access-control-save-error-message">${error.message}</span>
            </li>
          `)}
        </ul>
      </solid-ui-error-state>
    `
  }
}
