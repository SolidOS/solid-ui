import { html, nothing } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { defineControlOptions } from '@/storybook'

import '~icons/lucide/check'
import '~icons/lucide/plus'
import '~icons/lucide/log-in'
import '~icons/lucide/help-circle'

import { BUTTON_VARIANTS } from './Button'

const ICON_OPTIONS = defineControlOptions([
  ['Check', 'check'],
  ['Plus', 'plus'],
  ['Log In', 'log-in'],
  ['Help', 'help-circle'],
  ['None', null]
])

const args = {
  text: 'Save Changes',
  title: '',
  variant: 'primary',
  icon: 'None',
  leftIcon: 'None',
  rightIcon: 'None',
  disabled: false,
  loading: false,
} as const

const meta = {
  title: 'Button',
  args,
  argTypes: {
    variant: {
      control: 'select',
      options: BUTTON_VARIANTS,
    },
    title: { control: 'text' },
    icon: ICON_OPTIONS.control,
    leftIcon: ICON_OPTIONS.control,
    rightIcon: ICON_OPTIONS.control,
    text: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  render ({ icon, leftIcon, rightIcon, variant, disabled, loading, title, text }: typeof args) {
    const resolvedIcon = ICON_OPTIONS.resolve(icon)
    const resolvedLeftIcon = ICON_OPTIONS.resolve(leftIcon)
    const resolvedRightIcon = ICON_OPTIONS.resolve(rightIcon)

    return html`
        <solid-ui-button variant="${variant}" .disabled=${disabled} ?loading=${loading} title=${title || nothing}>
            ${resolvedLeftIcon ? unsafeHTML(`<icon-lucide-${resolvedLeftIcon} slot="left-icon"></icon-lucide-${resolvedLeftIcon}>`) : nothing}
            ${resolvedIcon ? unsafeHTML(`<icon-lucide-${resolvedIcon} slot="icon"></icon-lucide-${resolvedIcon}>`) : nothing}
            ${text}
            ${resolvedRightIcon ? unsafeHTML(`<icon-lucide-${resolvedRightIcon} slot="right-icon"></icon-lucide-${resolvedRightIcon}>`) : nothing}
        </solid-ui-button>
    `
  }
} as const

export const Primary = {}

export const Secondary = {
  args: {
    text: 'Cancel',
    variant: 'secondary'
  },
}

export const Tertiary = {
  args: {
    text: 'Add More',
    variant: 'tertiary',
    leftIcon: 'Plus',
  },
}

export const Outline = {
  args: {
    text: 'Sign Up',
    variant: 'outline',
    leftIcon: 'Log In',
  },
}

export const Ghost = {
  args: {
    text: '',
    variant: 'ghost',
    icon: 'Help',
    title: 'Open help',
  },
}

export default meta
