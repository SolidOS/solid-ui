import { html } from 'lit'

import './LoginModal'
import './../button'
import { defineStoryRender } from '../../../storybook'
import { showDialog } from '../../lib/dialogs'
import LoginModal from './LoginModal'
import { internals } from '../../lib/internals'

const meta = {
  title: 'Design System/Login Modal',
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
