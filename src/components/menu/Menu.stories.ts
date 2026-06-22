import { html } from 'lit'
import { defineStoryRender } from '@/storybook'

import '@/components/button'
import '@/components/menu-item'

import './Menu'

const meta = {
  title: 'Menu',
} as const

const render = defineStoryRender(() => html`
    <solid-ui-menu>
        <solid-ui-button slot="trigger" style="display:inline-block">
            Open Menu
        </solid-ui-button>

        <solid-ui-menu-item @solid-ui-select=${() => alert('Selected One!')}>One</solid-ui-menu-item>
        <solid-ui-menu-item @solid-ui-select=${() => alert('Selected Two!')}>Two</solid-ui-menu-item>
        <solid-ui-menu-item href="https://solidproject.org">External Link</solid-ui-menu-item>
    </solid-ui-menu>
`)

export default meta

export const Primary = { render }
