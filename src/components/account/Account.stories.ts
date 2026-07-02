import { html } from 'lit'
import { USER_OPTIONS, defineAuthStoryRender } from '@/storybook'

import './Account'

const meta = {
  title: 'Account',
  args: {
    user: 'Alice',
  },
  argTypes: {
    user: USER_OPTIONS.control,
  }
} as const

const render = defineAuthStoryRender(() => html`<solid-ui-account></solid-ui-account>`)

export default meta

export const Primary = { render }
export const Guest = {
  render,
  args: {
    user: 'Guest',
  }
}
