import { html } from 'lit'

import './Account'
import { USER_OPTIONS } from '../../../storybook/stubs'
import { defineAuthStoryRender } from '../../../storybook'

const meta = {
  title: 'Design System/Account',
  args: {
    user: 'Alice',
  },
  argTypes: {
    user: USER_OPTIONS.control,
  }
} as const

const render = defineAuthStoryRender<typeof meta.argTypes>(() => html`<solid-ui-account></solid-ui-account>`)

export default meta

export const Primary = { render }
export const Guest = {
  render,
  args: {
    user: 'Guest',
  }
}
