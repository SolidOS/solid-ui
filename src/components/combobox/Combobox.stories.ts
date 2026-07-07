import { html } from 'lit'
import { defineStoryRender } from '@/storybook'

import '@/components/combobox-option'

import './Combobox'

const meta = {
  title: 'Combobox',
  args: {
    label: 'What is the best food?',
    options: 'Pizza, Ramen, Tacos',
    asyncOptions: false
  },
  argTypes: {
    label: { control: 'text' },
    options: { control: 'text' },
    asyncOptions: { control: 'boolean' },
  },
} as const

const render = defineStoryRender<typeof meta.argTypes>(({ label, options, asyncOptions }) => {
  const parsedOptions = options.split(',').map(option => option.trim())

  if (asyncOptions) {
    return html`
      <solid-ui-combobox
        label="${label}"
        async-options-url="https://api.disneyapi.dev/character?name=%search%"
        async-options-results-field="data"
        async-options-label-field="name"
        async-options-value-field="_id"
      ></solid-ui-combobox>
    `
  }

  return html`
    <solid-ui-combobox label="${label}">
      ${parsedOptions.map(option => html`<solid-ui-combobox-option value="${option}">${option}</solid-ui-combobox-option>`)}
    </solid-ui-combobox>
  `
})

export default meta

export const Primary = { render }

export const Async = {
  args: {
    label: 'Who is the best Disney character?',
    asyncOptions: true
  },
  render
}
