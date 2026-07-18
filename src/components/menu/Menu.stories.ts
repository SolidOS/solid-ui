import { html } from 'lit'
import { defineStoryRender } from '@/storybook'
import type Menu from '@/components/menu/Menu'
import type MenuItem from '@/components/menu-item/MenuItem'

import '@/components/button'
import '@/components/menu-item'

import './Menu'

const meta = {
  title: 'Menu',
} as const

function select (event: Event, message: string) {
  const selectedItem = event.target as MenuItem
  const menu = selectedItem.parentElement as Menu
  const items = menu.querySelectorAll<MenuItem>('solid-ui-menu-item')

  for (const item of items) {
    item.selected = false
  }

  selectedItem.selected = true

  alert(message)
}

const render = defineStoryRender(() => html`
    <solid-ui-menu>
        <solid-ui-button slot="trigger" style="display:inline-block">
            Open Menu
        </solid-ui-button>

        <solid-ui-menu-item @solid-ui-select=${(event: Event) => select(event, 'Selected One!')}>One</solid-ui-menu-item>
        <solid-ui-menu-item @solid-ui-select=${(event: Event) => select(event, 'Selected Two!')}>Two</solid-ui-menu-item>
        <solid-ui-menu-item href="https://solidproject.org">External Link</solid-ui-menu-item>
    </solid-ui-menu>
`)

export default meta

export const Primary = { render }
