import { html, render, TemplateResult } from 'lit'
import { USER_OPTIONS, users } from './stubs'

import './components/StorybookProvider'

export type ControlOptions<TLabel extends string = string, TValue = unknown> = [TLabel, TValue][]

export type GetStoryArgs<T extends object> = {
  [K in keyof T]: T[K] extends { options: ArrayLike<infer TValue> } ? TValue : T[K] extends { control: 'text' } ? string : never
}

function renderStorybook (content: TemplateResult, user: ReturnType<typeof USER_OPTIONS.resolve> = null) {
  const container = document.createElement('div')

  render(html`
        <storybook-provider webId="${user?.webId}" avatarUrl="${user?.avatarUrl}">
            ${content}
        </storybook-provider>
    `, container)

  return container
}

export function defineStoryRender<T extends object> (renderStory: (args: GetStoryArgs<T>) => TemplateResult) {
  return (args: GetStoryArgs<T>) => renderStorybook(renderStory(args))
}

export function defineAuthStoryRender<T extends { user: typeof USER_OPTIONS.control }> (renderStory: (args: GetStoryArgs<T>) => TemplateResult) {
  return (args: GetStoryArgs<T>) => {
    const resolvedUser = USER_OPTIONS.resolve(args.user as keyof typeof users)

    return renderStorybook(renderStory(args), resolvedUser)
  }
}

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
