import { html } from 'lit'
import { defineStoryRender } from '@/storybook'
import { defineAsyncComboboxOptionsProvider } from './Combobox'

import '@/components/combobox-option'

import './Combobox'

const meta = {
  title: 'Combobox',
  args: {
    label: 'What is the best food?',
    options: 'Pizza, Ramen, Tacos',
    asyncJSOptions: false,
    asyncHtmlOptions: false,
  },
  argTypes: {
    label: { control: 'text' },
    options: { control: 'text' },
    asyncJSOptions: { control: 'boolean' },
    asyncHtmlOptions: { control: 'boolean' },
  },
} as const

const pokemonProvider = defineAsyncComboboxOptionsProvider(async (query) => {
  const response = await fetch('https://beta.pokeapi.co/graphql/v1beta', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query searchPokemon($search: String!) {
          pokemon_v2_pokemon(where: {name: {_ilike: $search}}, limit: 20) {
            id
            name
          }
        }
      `,
      variables: { search: `%${query}%` },
    }),
  })

  const { data } = await response.json()

  return data.pokemon_v2_pokemon.map(pokemon => ({
    value: pokemon.id.toString(),
    label: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
  }))
})

const render = defineStoryRender<typeof meta.argTypes>(
  ({ label, options, asyncJSOptions, asyncHtmlOptions }) => {
    if (asyncJSOptions) {
      return html`<solid-ui-combobox label="${label}" .asyncOptionsProvider=${pokemonProvider}></solid-ui-combobox>`
    }

    if (asyncHtmlOptions) {
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

    const parsedOptions = options.split(',').map((option) => option.trim())

    return html`
      <solid-ui-combobox label="${label}">
        ${parsedOptions.map((option) => html`<solid-ui-combobox-option value="${option}">${option}</solid-ui-combobox-option>`)}
      </solid-ui-combobox>
    `
  }
)

export default meta

export const Primary = { render }

export const AsyncWithJS = {
  args: {
    label: 'Who is the best Pokemon?',
    asyncJSOptions: true,
  },
  render,
}

export const AsyncWithHtml = {
  args: {
    label: 'Who is the best Disney character?',
    asyncHtmlOptions: true,
  },
  render,
}
