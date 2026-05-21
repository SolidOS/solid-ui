import { html } from 'lit'
import { defineStoryRender } from '../../../storybook'

import './SignupButton'
import '~icons/lucide/user-plus'

const meta = {
  title: 'Primitives/SignupButton',
} as const

export const Primary = {
  render: defineStoryRender(() => html`<solid-signup-button></solid-signup-button>`)
}

export const CustomLabel = {
  render: defineStoryRender(() => html`
    <solid-signup-button>
       Register
        <icon-lucide-user-plus style="width: 16px; height: 16px;"></icon-lucide-user-plus>
    </solid-signup-button>
  `)
}

export const CustomTrigger = {
  render: defineStoryRender(() => html`
    <solid-signup-button>
        <button slot="trigger" type="button">
           Register
        </button>
    </solid-signup-button>
  `)
}

export default meta
