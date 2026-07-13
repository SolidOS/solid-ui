import { html } from 'lit'

import '@/components/select-option'

import './Select'

const args = {
  label: 'What is the best food?',
  options: 'Pizza, Ramen, Tacos',
}

const meta = {
  title: 'Select',
  args,
  argTypes: {
    label: { control: 'text' },
    options: { control: 'text' },
  },
  render ({ label, options }: typeof args) {
    const parsedOptions = options.split(',').map(option => option.trim())

    return html`
        <solid-ui-select label="${label}">
            ${parsedOptions.map((option, index) => {
                const indent = index === 0 ? '' : '            '

                return html`${indent}<solid-ui-select-option value="${option}">${option}</solid-ui-select-option>\n`
            })}
        </solid-ui-select>
    `
  }
} as const

export const Primary = {}

export default meta
