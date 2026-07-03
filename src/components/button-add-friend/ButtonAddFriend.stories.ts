import { html } from 'lit'
import { sym } from 'rdflib'
import { DataBrowserContext } from 'pane-registry'
import { defineAuthStoryRender, USER_OPTIONS } from '@/storybook'

import './ButtonAddFriend'

type StoryArgs = {
	user: typeof USER_OPTIONS.control
	subjectUri: string
	friendExists: boolean
}

const meta = {
	title: 'ButtonAddFriend',
	args: {
		user: 'Guest',
		subjectUri: 'https://example.com/profile/card#me',
		friendExists: false,
	},
	argTypes: {
		user: USER_OPTIONS.control,
		subjectUri: { control: 'text' },
		friendExists: { control: 'boolean' },
	},
} as const

function createMockContext(friendExists: boolean): DataBrowserContext {
	const store = {
		fetcher: {
			load: async () => undefined,
		},
		updater: {
			update: async () => undefined,
		},
		whether: () => (friendExists ? 1 : 0),
	}

	return {
		dom: document,
		environment: { layout: 'desktop' },
		session: { store },
	} as unknown as DataBrowserContext
}

const render = defineAuthStoryRender<StoryArgs>(({ subjectUri, friendExists }) => {
	const context = createMockContext(friendExists)
	const subject = sym(subjectUri)

	return html`
		<div style="padding: 1rem; display: inline-flex; flex-direction: column; align-items: flex-start; gap: 0.75rem;">
			<solid-ui-button-add-friend .context=${context} .subject=${subject}></solid-ui-button-add-friend>
		</div>
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
