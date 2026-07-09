import { html } from 'lit'

import './PhotoCapture'

const meta = {
  title: 'PhotoCapture',
  render: () => html`
    <solid-ui-photo-capture
        heading="Profile photo"
        confirm-label="Use profile photo"
        show-trigger
        auto-close-on-capture
        presentation="dialog"
    ></solid-ui-photo-capture>
  `,
} as const

export const Primary = {}

export default meta
