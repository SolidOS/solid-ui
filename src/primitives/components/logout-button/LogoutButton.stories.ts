import { html } from 'lit'
import { defineStoryRender } from '../../../storybook'

import '~icons/lucide/log-out'

import './LogoutButton'

const meta = {
  title: 'Primitives/LogoutButton',
} as const

export const Primary = {
  render: defineStoryRender(() => html`<solid-logout-button></solid-logout-button>`)
}

export const CustomLabel = {
  render: defineStoryRender(() => html`
    <solid-logout-button>
        Sign Out
        <icon-lucide-log-out style="width: 16px; height: 16px;"></icon-lucide-log-out>
    </solid-logout-button>
  `)
}

export const CustomTrigger = {
  render: defineStoryRender(() => html`
    <solid-logout-button>
        <button slot="trigger" type="button">
            Sign Out
        </button>
    </solid-logout-button>
  `)
}

export default meta
