import { html } from 'lit'
import { DataBrowserContext } from 'pane-registry'
import { defineAuthStoryRender, USER_OPTIONS } from '@/storybook'

import './ButtonAddFriend'

type StoryArgs = {
	user: typeof USER_OPTIONS.control
	subject: string
	friendExists: boolean
	simulateError: boolean
}

const meta = {
	title: 'ButtonAddFriend',
	args: {
		user: 'Guest',
		subject: 'https://example.com/profile/card#me',
		friendExists: false,
		simulateError: false,
	},
	argTypes: {
		user: USER_OPTIONS.control,
		subject: { control: 'text' },
		friendExists: { control: 'boolean' },
		simulateError: { control: 'boolean' },
	},
} as const

function createMockContext (friendExists: boolean, simulateError: boolean): DataBrowserContext {
	const store = {
		fetcher: {
			load: async () => undefined,
		},
		updater: {
			update: async () => {
				if (simulateError) {
					throw new Error('Error adding friend, friend not added')
				}
				return undefined
			},
		},
		whether: () => (friendExists ? 1 : 0),
	}

	return {
		dom: document,
		environment: { layout: 'desktop' },
		session: { store },
	} as unknown as DataBrowserContext
}

const render = defineAuthStoryRender<StoryArgs>(({ subject, friendExists, simulateError }) => {
	const context = createMockContext(friendExists, simulateError)

	return html`
		<solid-ui-button-add-friend .context=${context} subject=${subject}></solid-ui-button-add-friend>
	`
})

export default meta

export const Guest = {
	render,
}

export const LoggedIn = {
	render,
	args: {
		user: 'Alice',
	},
}

export const FriendExists = {
	render,
	args: {
		user: 'Alice',
		friendExists: true,
	},
}

export const ErrorStatus = {
	render,
	args: {
		user: 'Alice',
		simulateError: true,
	},
	play: async ({ canvasElement }) => {
		await Promise.resolve()

		const button = canvasElement.querySelector('solid-ui-button-add-friend') as HTMLElement & { shadowRoot?: ShadowRoot | null } | null
		const innerButton = button?.shadowRoot?.querySelector('solid-ui-button') as HTMLElement & { shadowRoot?: ShadowRoot | null } | null
		const nativeButton = innerButton?.shadowRoot?.querySelector('button') as HTMLButtonElement | null

		nativeButton?.click()
		await Promise.resolve()
	}
}
