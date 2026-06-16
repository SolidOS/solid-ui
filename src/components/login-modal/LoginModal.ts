import { customElement, WebComponent } from '@/lib/components'
import { html, nothing } from 'lit'
import { consume } from '@lit/context'
import { property, query, state } from 'lit/decorators.js'
import { AuthContext, authContext, DEFAULT_AUTH_CONTEXT } from '@/lib/auth'
import { getSuggestedIssuers } from 'solid-logic'
import type Dialog from '@/components/dialog'
import type Combobox from '@/components/combobox'

import '~icons/lucide/chevron-down'
import '@/components/dialog'
import '@/components/dialog-content'
import '@/components/dialog-footer'
import '@/components/button'
import '@/components/combobox'
import '@/components/combobox-option'

import styles from './LoginModal.styles.css'

@customElement('solid-ui-login-modal')
export default class LoginModal extends WebComponent {
  static styles = styles

  @property({ type: String, reflect: true })
  accessor issuerUrl = ''

  @state()
  private accessor issuerInputValue = ''

  @state()
  private accessor failed: boolean = false

  @state()
  private accessor submitting: boolean = false

  @consume({ context: authContext, subscribe: true })
  private accessor auth: AuthContext = DEFAULT_AUTH_CONTEXT

  @query('solid-ui-dialog')
  private accessor dialog: Dialog | null = null

  connectedCallback () {
    super.connectedCallback()

    this.issuerInputValue = (typeof localStorage !== 'undefined' && localStorage.getItem('loginIssuer')) || this.issuerUrl || ''
  }

  protected render () {
    const suggestedIssuers = getSuggestedIssuers()

    return html`
        <solid-ui-dialog title="Select an identity provider">
            <form @submit=${this.onSubmit}>
                <solid-ui-dialog-content>
                    <solid-ui-combobox label="Solid Identity Provider" .value=${this.issuerInputValue} @input=${this.onIssuerInputChange}>
                        ${suggestedIssuers.map(issuer => html`<solid-ui-combobox-option value="${issuer.uri}">${issuer.name}</solid-ui-combobox-option>`)}
                    </solid-ui-combobox>

                    ${this.failed ? html`<p class="error-message">Something went wrong</p>` : nothing}
                </solid-ui-dialog-content>

                <solid-ui-dialog-footer>
                    <solid-ui-button
                        variant="secondary"
                        @click="${() => this.dialog?.close()}"
                    >
                        Cancel
                    </solid-ui-button>
                    <solid-ui-button
                        ?disabled=${!this.issuerInputValue || this.submitting}
                        ?loading=${this.submitting}
                        type="submit"
                    >
                        Login
                    </solid-ui-button>
                </solid-ui-dialog-footer>
            </form>
        </solid-ui-dialog>
    `
  }

  private onIssuerInputChange (e: Event) {
    this.issuerInputValue = (e.target as Combobox).value
  }

  private async onSubmit (e: Event) {
    e.preventDefault()

    this.failed = false

    if (!this.issuerInputValue) {
      return
    }

    this.submitting = true

    try {
      await this.auth.login(this.issuerInputValue)
    } catch (error) {
      console.error(error)

      this.failed = true
    } finally {
      this.submitting = false
    }
  }
}
