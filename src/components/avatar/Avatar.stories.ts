import { html } from 'lit'
import { USER_OPTIONS, defineAuthStoryRender } from '@/storybook'

import './Avatar'

const meta = {
  title: 'Avatar',
  args: {
    user: 'Alice',
  },
  argTypes: {
    user: USER_OPTIONS.control,
  }
} as const

const render = defineAuthStoryRender<typeof meta.argTypes>(() => html`<solid-ui-avatar></solid-ui-avatar>`)

export const Primary = { render }
export const Fallback = { render, args: { user: 'Bob' } }
export const Guest = { render, args: { user: 'Guest' } }

export default meta
