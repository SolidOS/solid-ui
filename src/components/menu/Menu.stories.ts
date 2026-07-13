import { html } from 'lit'
import type Menu from '@/components/menu/Menu'
import type MenuItem from '@/components/menu-item/MenuItem'

import '@/components/button'
import '@/components/menu-item'

import './Menu'

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

const meta = {
  title: 'Menu',
  render: () => html`
        <solid-ui-menu>
            <solid-ui-button slot="trigger">
                Open Menu
            </solid-ui-button>

            <solid-ui-menu-item @solid-ui-select=${(event: Event) => select(event, 'Selected One!')}>One</solid-ui-menu-item>
            <solid-ui-menu-item @solid-ui-select=${(event: Event) => select(event, 'Selected Two!')}>Two</solid-ui-menu-item>
            <solid-ui-menu-item href="https://solidproject.org">External Link</solid-ui-menu-item>
        </solid-ui-menu>
    `,
} as const

export const Primary = {}

export default meta
