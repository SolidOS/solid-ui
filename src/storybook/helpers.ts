import { html } from 'lit'
import { USER_OPTIONS, users } from './stubs'
import type { Decorator } from '@storybook/web-components-vite'

import './components/StorybookProvider'

function defineDecorator<T extends Decorator> (decorator: T) {
  return decorator
}

const COLORS = {
  black: {
    primary: '#131722',
    hover: '#dcdcde',
    selected: '#b8b9bd',
  },
  purple: {
    primary: '#8e54ff',
    hover: '#eee5ff',
    selected: '#ddccff',
  },
  blue: {
    primary: '#1e6bff',
    hover: '#dde9ff',
    selected: '#bcd3ff',
  },
  pink: {
    primary: '#e9127c',
    hover: '#fcdbeb',
    selected: '#f8b8d8',
  },
  indigo: {
    primary: '#6236ff',
    hover: '#e7e1ff',
    selected: '#d0c3ff',
  },
  orange: {
    primary: '#ff4e00',
    hover: '#ffe4d9',
    selected: '#ffcab3',
  },
  mint: {
    primary: '#00c0b0',
    hover: '#d9f6f3',
    selected: '#b3ece7',
  },
}

export type ControlOptions<TLabel extends string = string, TValue = unknown> = [TLabel, TValue][]

export type GetStoryArgs<T extends object> = {
  [K in keyof T]: T[K] extends { options: ArrayLike<infer TValue> } ? TValue : T[K] extends { control: 'text' } ? string : never
}

export const withProvider = defineDecorator((story, context) => {
  const { primaryColor } = context.globals
  const colors = COLORS[primaryColor] ?? COLORS.purple
  const user = USER_OPTIONS.resolve((context.args.user ?? context.parameters.user ?? 'Guest') as keyof typeof users)
  const attributes = 'initialized' in user
    ? { initialized: user.initialized }
    : { webId: user.webId, avatarUrl: user.avatarUrl, initialized: true }

  return html`
    <storybook-provider
        webId=${attributes.webId}
        avatarUrl=${attributes.avatarUrl}
        .initialized=${attributes.initialized}
        style="
          --solid-ui-color-primary: ${colors.primary};
          --solid-ui-color-primary-hover: ${colors.hover};
          --solid-ui-color-primary-selected: ${colors.selected};
        "
    >
      ${story()}
    </storybook-provider>
  `
})

export function getThemeColors (): string[] {
  return Object.keys(COLORS)
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
