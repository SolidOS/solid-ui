import { html } from 'lit'
import { USER_OPTIONS } from '@/storybook'

import './Avatar'

const meta = {
  title: 'Avatar',
  args: {
    user: 'Alice',
  },
  argTypes: {
    user: USER_OPTIONS.control,
  },
  render: () => html`<solid-ui-avatar></solid-ui-avatar>`
} as const

export const Primary = {}
export const Fallback = { args: { user: 'Bob' } }
export const Guest = { args: { user: 'Guest' } }

export default meta
