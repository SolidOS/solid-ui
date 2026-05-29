import { html } from 'lit'
import { consume } from '@lit/context'
import { customElement, property, query, state } from 'lit/decorators.js'
import WebComponent from '../../../primitives/lib/WebComponent'
import { AuthContext, authContext, DEFAULT_AUTH_CONTEXT } from '../../../primitives/lib/auth/context'

import { getSuggestedIssuers } from 'solid-logic'

import type Dialog from '../../../design-system/components/dialog'
import type Combobox from '../../../design-system/components/combobox'

import '~icons/lucide/chevron-down'
import '../../../design-system/components/dialog'
import '../../../design-system/components/dialog-content'
import '../../../design-system/components/dialog-footer'
import '../../../design-system/components/button'
import '../../../design-system/components/combobox'
import '../../../design-system/components/combobox-option'
import styles from './LoginModal.styles.css'

@customElement('solid-ui-login-modal')
export default class LoginModal extends WebComponent {
  static styles = styles

  @property({ type: String, reflect: true })
  accessor issuerUrl = ''

  @state()
  private accessor issuerInputValue = ''

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
                </solid-ui-dialog-content>

                <solid-ui-dialog-footer>
                    <solid-ui-button
                        variant="secondary"
                        size="small"
                        @click="${() => this.dialog?.close()}"
                    >
                        Cancel
                    </solid-ui-button>
                    <solid-ui-button
                        ?disabled="${!this.issuerInputValue}"
                        type="submit"
                    >
                        Login
                    </solid-ui-button>
                </solid-ui-dialog-footer>
            </form>
        </solid-ui-dialog>
    `
  }

  private async loginToIssuer (issuerUri: string) {
    if (!issuerUri) {
      return
    }

    await this.auth.login(issuerUri)
  }

  private onIssuerInputChange (e: Event) {
    this.issuerInputValue = (e.target as Combobox).value
  }

  private onSubmit (e: Event) {
    e.preventDefault()

    this.loginToIssuer(this.issuerInputValue)
  }
}
