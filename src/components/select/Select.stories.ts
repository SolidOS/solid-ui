import { html } from 'lit'
import { defineStoryRender } from '@/storybook'

import '@/components/select-option'

import './Select'

const meta = {
  title: 'Select',
  args: {
    label: 'What is the best food?',
    options: 'Pizza, Ramen, Tacos'
  },
  argTypes: {
    label: { control: 'text' },
    options: { control: 'text' },
  },
} as const

const render = defineStoryRender<typeof meta.argTypes>(({ label, options }) => {
  const parsedOptions = options.split(',').map(option => option.trim())

  return html`
    <solid-ui-select label="${label}">
      ${parsedOptions.map(option => html`<solid-ui-select-option value="${option}">${option}</solid-ui-select-option>`)}
    </solid-ui-select>
  `
})

export default meta

export const Primary = { render }
