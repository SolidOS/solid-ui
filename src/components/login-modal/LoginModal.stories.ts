import { html } from 'lit'
import { internals } from '@/storybook'
import { showDialog } from '@/lib/dialogs'

import '@/components/button'

import LoginModal from './LoginModal'

const meta = {
  title: 'Solid/Login Modal',
  parameters: {
    docs: {
      source: {
        language: 'ts',
        code: `
            import { showDialog } from 'solid-ui';
            import LoginModal from 'solid-ui/components/login-modal';

            await showDialog<LoginModal>(html\`<solid-ui-login-modal></solid-ui-login-modal>\`);
        `
      }
    }
  },
} as const

export const Primary = {
  render: () => html`
    <solid-ui-button @click=${() => showDialog(LoginModal)}>Open</solid-ui-button>
  `
}

export const Loading = {
  render: () => html`
    <solid-ui-button @click=${async () => {
        const dialog = showDialog(LoginModal)
        const dialogInternals = internals(dialog, ['submitting'])

        dialogInternals.submitting = true
    }}>Open</solid-ui-button>
  `
}

export const Failed = {
  render: () => html`
    <solid-ui-button @click=${async () => {
        const dialog = showDialog(LoginModal)
        const dialogInternals = internals(dialog, ['failed'])

        dialogInternals.failed = true
    }}>Open</solid-ui-button>
  `
}

export default meta
