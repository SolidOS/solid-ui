import { html } from 'lit'

import './Input'
import { defineStoryRender } from '@/storybook'

const meta = {
  title: 'Input',
  args: {
    label: 'Name',
    value: '',
    placeholder: 'Enter your name',
    type: 'text',
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'url'],
    },
  },
} as const

const render = defineStoryRender<typeof meta.argTypes>(({ label, value, placeholder, type }) => html`
  <solid-ui-input
    label="${label}"
    .value=${value}
    placeholder="${placeholder}"
    type="${type}"
  ></solid-ui-input>
`)

export default meta

export const Primary = { render }
