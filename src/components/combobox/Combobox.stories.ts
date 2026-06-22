import { html } from 'lit'
import { defineStoryRender } from '@/storybook'

import '@/components/combobox-option'

import './Combobox'

const meta = {
  title: 'Combobox',
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
    <solid-ui-combobox label="${label}">
      ${parsedOptions.map(option => html`<solid-ui-combobox-option value="${option}">${option}</solid-ui-combobox-option>`)}
    </solid-ui-combobox>
  `
})

export default meta

export const Primary = { render }
