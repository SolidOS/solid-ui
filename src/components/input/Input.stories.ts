import { html } from 'lit'

import './Input'

const args = {
  label: 'Name',
  value: '',
  placeholder: 'Enter your name',
  type: 'text',
}

const meta = {
  title: 'Input',
  args,
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'url'],
    },
  },
  render ({ label, value, placeholder, type }: typeof args) {
    return html`
        <solid-ui-input
            label="${label}"
            .value=${value}
            placeholder="${placeholder}"
            type="${type}"
        ></solid-ui-input>
    `
  }
} as const

export const Primary = {}

export default meta
