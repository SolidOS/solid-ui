import { html } from 'lit'
import { defineStoryRender } from '@/storybook'

import '~icons/lucide/log-in'

import './LoginButton'

const meta = {
  title: 'LoginButton',
} as const

export const Primary = {
  render: defineStoryRender(() => html`<solid-ui-login-button></solid-ui-login-button>`)
}

export const CustomLabel = {
  render: defineStoryRender(() => html`
    <solid-ui-login-button>
        Sign In
        <icon-lucide-log-in style="width: 16px; height: 16px;"></icon-lucide-log-in>
    </solid-ui-login-button>
  `)
}

export const CustomTrigger = {
  render: defineStoryRender(() => html`
    <solid-ui-login-button>
        <button slot="trigger" type="button">
            Sign In
        </button>
    </solid-ui-login-button>
  `)
}

export default meta
