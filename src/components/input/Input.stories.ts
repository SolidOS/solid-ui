import { html } from 'lit'

import './Input'

const args = {
  label: 'Name',
  value: '',
  placeholder: 'Enter your name',
  type: 'text',
  srOnlyLabel: false,
}

const meta = {
  title: 'Basic UI/Input',
  args,
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    srOnlyLabel: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'url'],
    },
  },
  render ({ label, value, placeholder, type, srOnlyLabel }: typeof args) {
    return html`
        <solid-ui-input
            label="${label}"
            .srOnlyLabel=${srOnlyLabel}
            .value=${value}
            placeholder="${placeholder}"
            type="${type}"
        ></solid-ui-input>
    `
  }
} as const

export const Primary = {}

export default meta
