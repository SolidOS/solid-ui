import { html, nothing } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { defineControlOptions, defineStoryRender } from '../../../storybook'

import '~icons/lucide/check'
import '~icons/lucide/plus'
import '~icons/lucide/log-in'
import { BUTTON_VARIANTS } from './Button'

const ICON_OPTIONS = defineControlOptions([['Check', 'check'], ['Plus', 'plus'], ['Log In', 'log-in'], ['None', null]])

const meta = {
  title: 'Design System/Button',
  args: {
    text: 'Save Changes',
    variant: 'primary',
    leftIcon: 'None',
    rightIcon: 'None',
    disabled: false,
    loading: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: BUTTON_VARIANTS,
    },
    leftIcon: ICON_OPTIONS.control,
    rightIcon: ICON_OPTIONS.control,
    text: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} as const

const render = defineStoryRender<typeof meta.argTypes>(({ text, variant, leftIcon, rightIcon, disabled, loading }) => {
  const resolvedLeftIcon = ICON_OPTIONS.resolve(leftIcon)
  const resolvedRightIcon = ICON_OPTIONS.resolve(rightIcon)

  return html`
        <solid-ui-button variant="${variant}" .disabled=${disabled} ?loading=${loading}>
            ${resolvedLeftIcon ? unsafeHTML(`<icon-lucide-${resolvedLeftIcon} slot="left-icon"></icon-lucide-${resolvedLeftIcon}>`) : nothing}
            ${text}
            ${resolvedRightIcon ? unsafeHTML(`<icon-lucide-${resolvedRightIcon} slot="right-icon"></icon-lucide-${resolvedRightIcon}>`) : nothing}
        </solid-ui-button>
    `
})

export default meta

export const Primary = { render }

export const Secondary = {
  render,
  args: {
    text: 'Cancel',
    variant: 'secondary'
  },
}

export const Tertiary = {
  render,
  args: {
    text: 'Add More',
    variant: 'tertiary',
    leftIcon: 'Plus',
  },
}

export const Outline = {
  render,
  args: {
    text: 'Sign Up',
    variant: 'outline',
    leftIcon: 'Log In',
  },
}
