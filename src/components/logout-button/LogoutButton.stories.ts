import { html } from 'lit'

import '~icons/lucide/log-out'

import './LogoutButton'

const meta = {
  title: 'LogoutButton',
} as const

export const Primary = {
  render: () => html`<solid-ui-logout-button></solid-ui-logout-button>`
}

export const CustomLabel = {
  render: () => html`
    <solid-ui-logout-button>
        Sign Out
        <icon-lucide-log-out style="width: 16px; height: 16px;"></icon-lucide-log-out>
    </solid-ui-logout-button>
  `
}

export const CustomTrigger = {
  render: () => html`
    <solid-ui-logout-button>
        <button slot="trigger" type="button">
            Sign Out
        </button>
    </solid-ui-logout-button>
  `
}

export default meta
