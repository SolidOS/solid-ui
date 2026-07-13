import { html } from 'lit'
import { USER_OPTIONS, users } from './stubs'
import type { Decorator } from '@storybook/web-components-vite'

import './components/StorybookProvider'

function defineDecorator<T extends Decorator> (decorator: T) {
  return decorator
}

export type ControlOptions<TLabel extends string = string, TValue = unknown> = [TLabel, TValue][]

export type GetStoryArgs<T extends object> = {
  [K in keyof T]: T[K] extends { options: ArrayLike<infer TValue> } ? TValue : T[K] extends { control: 'text' } ? string : never
}

export const withProvider = defineDecorator((story, context) => {
  const user = USER_OPTIONS.resolve((context.args.user ?? context.parameters.user ?? 'Guest') as keyof typeof users)
  const attributes = 'initialized' in user
    ? { initialized: user.initialized }
    : { webId: user.webId, avatarUrl: user.avatarUrl, initialized: true }

  return html`
    <storybook-provider
        webId=${attributes.webId}
        avatarUrl=${attributes.avatarUrl}
        .initialized=${attributes.initialized}
    >
      ${story()}
    </storybook-provider>
  `
})

export function defineControlOptions<const T extends ControlOptions> (options: T) {
  return {
    control: {
      type: 'select',
      options: options.map(([label]) => label) as T[number][0][],
    },
    resolve (value: T[number][0]) {
      return options.find(([label]) => label === value)?.[1] as T[number][1]
    }
  }
}
