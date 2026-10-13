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

  private onClose () {
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      composed: true
    }))
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
              <span>
                ${error.action === 'grant'
                  ? `Could not grant ${error.role ?? 'access'}`
                  : error.action === 'revoke'
                    ? `Could not revoke ${error.role ?? 'access'}`
                    : 'Could not save access changes'}
              </span>
            </li>
          `)}
        </ul>
      </solid-ui-error-state>
    `
  }
}
