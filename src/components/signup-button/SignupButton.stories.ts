import { html } from 'lit'
import { defineStoryRender } from '@/storybook'

import '~icons/lucide/user-plus'

import './SignupButton'

const meta = {
  title: 'SignupButton',
} as const

export const Primary = {
  render: defineStoryRender(() => html`<solid-ui-signup-button></solid-ui-signup-button>`)
}

export const CustomLabel = {
  render: defineStoryRender(() => html`
    <solid-ui-signup-button>
       Register
        <icon-lucide-user-plus style="width: 16px; height: 16px;"></icon-lucide-user-plus>
    </solid-ui-signup-button>
  `)
}

export const CustomTrigger = {
  render: defineStoryRender(() => html`
    <solid-ui-signup-button>
        <button slot="trigger" type="button">
           Register
        </button>
    </solid-ui-signup-button>
  `)
}

export default meta
