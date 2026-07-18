import { html } from 'lit'
import { defineAsyncComboboxOptionsProvider } from './Combobox'

import '@/components/combobox-option'

import './Combobox'

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

const meta = {
  title: 'Basic UI/Combobox',
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
  render ({ label, options, asyncJSOptions, asyncHtmlOptions }) {
    if (asyncJSOptions) {
      return html`<solid-ui-combobox label="${label}" .asyncOptionsProvider=${pokemonProvider}></solid-ui-combobox>`
    }

    if (asyncHtmlOptions) {
      return html`
        <solid-ui-combobox
          label=${label}
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
        ${parsedOptions.map((option, index) => {
            const indent = index === 0 ? '' : '        '

            return html`${indent}<solid-ui-combobox-option value="${option}">${option}</solid-ui-combobox-option>\n`
        })}
      </solid-ui-combobox>
    `
  }
} as const

export const Primary = {}

export const AsyncWithJS = {
  args: {
    label: 'Who is the best Pokemon?',
    asyncJSOptions: true,
  },
}

export const AsyncWithHtml = {
  args: {
    label: 'Who is the best Disney character?',
    asyncHtmlOptions: true,
  },
}

export default meta
