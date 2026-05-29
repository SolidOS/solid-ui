import { html } from 'lit'
import { defineAuthStoryRender } from '../../../storybook'

import './Avatar'
import { USER_OPTIONS } from '../../../storybook/stubs'

const meta = {
  title: 'Primitives/Avatar',
  args: {
    user: 'Alice',
  },
  argTypes: {
    user: USER_OPTIONS.control,
  }
} as const

const render = defineAuthStoryRender<typeof meta.argTypes>(() => html`<solid-avatar></solid-avatar>`)

export const Primary = { render }
export const Fallback = { render, args: { user: 'Bob' } }
export const Guest = { render, args: { user: 'Guest' } }

export default meta
