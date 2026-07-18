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
    <solid-ui-guard>
        <span slot="initializing">Initializing content</span>
        <span slot="guest">Guest content</span>
        <span>Logged in content</span>
    </solid-ui-guard>
`)

export const Primary = { render }
export const Guest = { render, args: { user: 'Guest' } }
export const Initializing = { render, args: { user: 'Initializing' } }

export default meta
