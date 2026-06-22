import { html } from 'lit'
import { defineStoryRender, internals } from '@/storybook'
import { showDialog } from '@/lib/dialogs'

import '@/components/button'

import LoginModal from './LoginModal'

const meta = {
  title: 'Login Modal',
} as const

export default meta

export const Primary = {
  render: defineStoryRender(() => html`
    <solid-ui-button @click=${() => showDialog(html`<solid-ui-login-modal></solid-ui-login-modal>`)}>Open</solid-ui-button>
  `)
}

export const Loading = {
  render: defineStoryRender(() => html`
    <solid-ui-button @click=${async () => {
        const dialog = await showDialog<LoginModal>(html`<solid-ui-login-modal></solid-ui-login-modal>`)
        const dialogInternals = internals(dialog, ['submitting'])

        dialogInternals.submitting = true
    }}>Open</solid-ui-button>
  `)
}

export const Failed = {
  render: defineStoryRender(() => html`
    <solid-ui-button @click=${async () => {
        const dialog = await showDialog<LoginModal>(html`<solid-ui-login-modal></solid-ui-login-modal>`)
        const dialogInternals = internals(dialog, ['failed'])

        dialogInternals.failed = true
    }}>Open</solid-ui-button>
  `)
}
