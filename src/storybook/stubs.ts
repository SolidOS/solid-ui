import { defineControlOptions } from '.'
import { objectEntries } from '../utils/objects'

export const users = {
  Alice: {
    webId: 'https://alice.example/profile/card#me',
    avatarUrl: 'https://placecats.com/300/200',
  },
  Bob: {
    webId: 'https://bob.example/profile/card#me',
    avatarUrl: undefined,
  },
} as const

export const USER_OPTIONS = defineControlOptions([
  ...objectEntries(users).map(([label, value]) => [label, value]) as [keyof typeof users | 'Guest', typeof users[keyof typeof users] | null][],
  ['Guest', null],
])
