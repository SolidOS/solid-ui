import { html } from 'lit'
import { defineAuthStoryRender } from '@/storybook'

import './Guard'
import { USER_OPTIONS } from '@/storybook/stubs'

const meta = {
  title: 'Guard',
  args: {
    user: 'Alice',
  },
  argTypes: {
    user: USER_OPTIONS.control,
  }
} as const

const render = defineAuthStoryRender<typeof meta.argTypes>(() => html`
    <solid-guard>
        <span slot="guest">Guest content</span>
        <span>Logged in content</span>
    </solid-guard>
`)

export const Primary = { render }
export const Guest = { render, args: { user: 'Guest' } }

export default meta
