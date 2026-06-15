import { describe, expect, it } from 'vitest'
import { silenceDebugMessages } from './helpers/debugger'
import { icons } from '../../src/lib/iconBase'

const { iconBase, originalIconBase } = icons

silenceDebugMessages()

describe('iconBase', () => {
  it('exists', () => {
    expect(iconBase).toEqual('https://solidos.github.io/solid-ui/src/icons/')
  })
})

describe('originalIconBase', () => {
  it('exists', () => {
    expect(originalIconBase).toEqual('https://solidos.github.io/solid-ui/src/originalIcons/')
  })
})
