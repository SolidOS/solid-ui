import { customElement, WebComponent } from '@/lib/components'
import { consume } from '@lit/context'
import { html, nothing } from 'lit'
import { property, state } from 'lit/decorators.js'
import '@/components/button'
import '~icons/lucide/x'
import '~icons/lucide/user-round-plus'
import styles from './ButtonAddFriend.styles.css'
import * as debug from '../../lib/debug'
import { authContext, AuthContext, DEFAULT_AUTH_CONTEXT } from '@/lib/auth'
import { DataBrowserContext } from 'pane-registry'
import { LiveStore, NamedNode, st, sym } from 'rdflib'
import ns from '../../lib/ns'
import { ensureStandardMutationPrefixes } from './helpers'

const addMeToYourFriendsButtonText = 'Add as Friend'
const logInAddMeToYourFriendsButtonText = 'Log in to add as friend'
const friendExistsMessage = 'This friend is already in your list'
const friendNotAddedMessage = 'Error adding friend, friend not added'
const userNotLoggedInErrorMessage = 'Please log in first'

@customElement('solid-ui-button-add-friend')
export default class ButtonAddFriend extends WebComponent {
  static styles = styles

  @consume({ context: authContext, subscribe: true })
  private accessor auth: AuthContext = DEFAULT_AUTH_CONTEXT

  @property({ type: Boolean })
  accessor disabled: boolean | undefined = undefined

  @property({ type: String, reflect: true })
  accessor subject = ''

  @property({ attribute: false })
  accessor context: DataBrowserContext | undefined = undefined

  @state()
  private accessor buttonLabel = addMeToYourFriendsButtonText

  @state()
  private accessor statusMessage = ''

  private checkIfAnyUserLoggedIn(me: NamedNode | null): me is NamedNode {
    return Boolean(me)
  }

  private currentUser (): NamedNode | null {
    return this.auth.account ? sym(this.auth.account.webId) : null
  }

  protected firstUpdated () {
    void this.refreshButton()
  }

  protected updated (changedProperties: Map<PropertyKey, unknown>) {
    super.updated(changedProperties)

    if (changedProperties.has('subject') || changedProperties.has('context') || changedProperties.has('auth')) {
      void this.refreshButton()
    }
  }

  private async refreshButton() {
    const subject = this.getSubjectNode()

    if (!subject || !this.context) {
      this.buttonLabel = logInAddMeToYourFriendsButtonText
      this.disabled = true
      this.statusMessage = ''
      return
    }

    const me = this.currentUser()
    const store = this.context.session.store as unknown as LiveStore

    if (!this.checkIfAnyUserLoggedIn(me)) {
      this.buttonLabel = logInAddMeToYourFriendsButtonText
      this.disabled = true
      this.statusMessage = ''
      return
    }

    const friendExists = await this.checkIfThingExists(store, me, subject, ns.foaf('knows'))
    if (friendExists) {
      this.buttonLabel = friendExistsMessage
      this.disabled = true
      this.statusMessage = ''
      return
    }

    this.buttonLabel = addMeToYourFriendsButtonText
    this.disabled = false
    this.statusMessage = ''
  }

  private async saveNewThing(
    subject: NamedNode,
    context: DataBrowserContext,
    predicate: NamedNode
  ): Promise<void> {
    const me = this.currentUser()
    const store = context.session.store as unknown as LiveStore

    if (this.checkIfAnyUserLoggedIn(me)) {
      if (!(await this.checkIfThingExists(store, me, subject, predicate))) {
        await store.fetcher.load(me)
        const updater = store.updater
        if (!updater) {
          throw new Error('Store updater is unavailable')
        }
        const toBeInserted = [st(me, predicate, subject, me.doc())]
        try {
          ensureStandardMutationPrefixes(store)
          await updater.update([], toBeInserted)
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error)
          const message = errorMessage.includes('Unauthenticated') ? userNotLoggedInErrorMessage : errorMessage
          throw new Error(message)
        }
      } else {
        throw new Error(friendExistsMessage)
      }
    } else {
      throw new Error(userNotLoggedInErrorMessage)
    }
  }

  private async checkIfThingExists(
    store: LiveStore,
    me: NamedNode,
    subject: NamedNode,
    predicate: NamedNode
  ): Promise<boolean> {
    await store.fetcher.load(me)
    return store.whether(me, predicate, subject, me.doc()) !== 0
  }

  render () {
    return html`
      <solid-ui-button
        variant="secondary"
        ?disabled=${this.disabled}
        @click=${this.onClick}
      >
        <icon-lucide-user-round-plus slot="left-icon"></icon-lucide-user-round-plus>
        ${this.buttonLabel}
      </solid-ui-button>
      ${this.statusMessage
        ? html`
            <div role="status" aria-live="polite" class="button-add-friend__status">
              <span>${this.statusMessage}</span>
              <solid-ui-button variant="ghost" @click=${this.clearStatusMessage}>
                <span class="sr-only">Close</span>
                <icon-lucide-x slot="icon"></icon-lucide-x>
              </solid-ui-button>
            </div>
          `
        : nothing}
    `
  }

  private async onClick (event: Event) {
    event.preventDefault()

    const subject = this.getSubjectNode()

    if (!subject || !this.context) {
      this.disabled = true
      return
    }

    try {
      await this.saveNewThing(subject, this.context, ns.foaf('knows'))
      await this.refreshButton()
    } catch (error) {
      this.disabled = true
      this.statusMessage = error instanceof Error ? error.message : friendNotAddedMessage
      debug.error(error)
    }
  }

  private clearStatusMessage () {
    this.statusMessage = ''
  }

  private getSubjectNode (): NamedNode | undefined {
    return this.subject ? sym(this.subject) : undefined
  }
}
