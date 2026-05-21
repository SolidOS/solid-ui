import { html, nothing } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { BUTTON_VARIANTS } from './Button'
import '~icons/lucide/check'
import '~icons/lucide/plus'
import { defineControlOptions, defineStoryRender } from '../../../storybook'

const ICON_OPTIONS = defineControlOptions([['Check', 'check'], ['Plus', 'plus'], ['None', null]])

const meta = {
  title: 'Design System/Button',
  args: {
    text: 'Save Changes',
    variant: 'primary',
    leftIcon: 'None',
    rightIcon: 'None',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: BUTTON_VARIANTS,
    },
    leftIcon: ICON_OPTIONS.control,
    rightIcon: ICON_OPTIONS.control,
    text: { control: 'text' },
  },
} as const

const render = defineStoryRender<typeof meta.argTypes>(({ text, variant, leftIcon, rightIcon }) => {
  const resolvedLeftIcon = ICON_OPTIONS.resolve(leftIcon)
  const resolvedRightIcon = ICON_OPTIONS.resolve(rightIcon)

  return html`
        <solid-ui-button variant="${variant}">
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
