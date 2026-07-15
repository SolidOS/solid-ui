import { html } from 'lit'

import '~icons/lucide/user-plus'

import './SignupButton'

const meta = {
  title: 'Solid/SignupButton',
} as const

export const Primary = {
  render: () => html`<solid-ui-signup-button></solid-ui-signup-button>`
}

export const CustomLabel = {
  render: () => html`
    <solid-ui-signup-button>
       Register
        <icon-lucide-user-plus style="width: 16px; height: 16px;"></icon-lucide-user-plus>
    </solid-ui-signup-button>
  `
}

export const CustomTrigger = {
  render: () => html`
    <solid-ui-signup-button>
        <button slot="trigger" type="button">
           Register
        </button>
    </solid-ui-signup-button>
  `
}

export default meta
