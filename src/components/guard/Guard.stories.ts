import { html } from 'lit'
import { USER_OPTIONS } from '@/storybook/stubs'

import './Guard'

const meta = {
  title: 'Solid/Guard',
  args: {
    user: 'Alice',
  },
  argTypes: {
    user: USER_OPTIONS.control,
  },
  render () {
    return html`
        <solid-guard>
            <span slot="initializing">Initializing content</span>
            <span slot="guest">Guest content</span>
            <span>Logged in content</span>
        </solid-guard>
    `
  }
} as const

export const Primary = {}
export const Guest = { args: { user: 'Guest' } }
export const Initializing = { args: { user: 'Initializing' } }

export default meta
