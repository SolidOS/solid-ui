import { html, nothing } from 'lit'

import './ErrorState'

const args = {
  title: 'Something went wrong',
  message: 'We could not load this content. Please try again.',
  details: '',
  linkText: '',
  linkHref: ''
} as const

const meta = {
  title: 'Basic UI/Error State',
  args,
  argTypes: {
    title: { control: 'text' },
    message: { control: 'text' },
    details: { control: 'text' },
    linkText: { control: 'text' },
    linkHref: { control: 'text' }
  },
  render ({ title, message, details, linkText, linkHref }: typeof args) {
    return html`
      <solid-ui-error-state
        .title=${title}
        .message=${message}
      >
        ${details ? html`<p>${details}</p>` : nothing}
        ${linkText && linkHref
          ? html`
            <solid-ui-button
              variant="secondary"
              @click=${() => { window.location.href = linkHref }}
            >
              ${linkText}
            </solid-ui-button>
          `
          : nothing}
      </solid-ui-error-state>
    `
  }
} as const

export const Primary = {}

export const Detailed = {
  args: {
    title: 'Some people could not be added',
    message: 'Your existing sharing settings were not changed. Review these WebIDs, then try saving again.',
    details: 'The profile could not be found or is not publicly readable.'
  }
}

export const WithRecoveryLink = {
  args: {
    title: 'This page is unavailable',
    message: 'The requested resource could not be loaded.',
    linkText: 'Open help',
    linkHref: 'https://solidproject.org/'
  }
}

export default meta
