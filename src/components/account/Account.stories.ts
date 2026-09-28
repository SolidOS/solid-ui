import { html } from 'lit'
import { USER_OPTIONS } from '@/storybook'

import './Account'

const meta = {
  title: 'Solid/Account',
  args: {
    user: 'Alice',
  },
  argTypes: {
    user: USER_OPTIONS.control,
  },
  render: () => html`<solid-ui-account></solid-ui-account>`
} as const

export const Primary = {}
export const Guest = { args: { user: 'Guest' } }
export const Initializing = { args: { user: 'Initializing' } }

export default meta
