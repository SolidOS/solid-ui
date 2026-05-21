import { html } from 'lit'
import { defineStoryRender } from '../../../storybook'

import './LoginButton'
import '~icons/lucide/log-in'

const meta = {
  title: 'Primitives/LoginButton',
} as const

export const Primary = {
  render: defineStoryRender(() => html`<solid-login-button></solid-login-button>`)
}

export const CustomLabel = {
  render: defineStoryRender(() => html`
    <solid-login-button>
        Sign In
        <icon-lucide-log-in style="width: 16px; height: 16px;"></icon-lucide-log-in>
    </solid-login-button>
  `)
}

export const CustomTrigger = {
  render: defineStoryRender(() => html`
    <solid-login-button>
        <button slot="trigger" type="button">
            Sign In
        </button>
    </solid-login-button>
  `)
}

export default meta
