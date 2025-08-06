import { silenceDebugMessages } from './helpers/debugger'
import { icons } from '../../src/iconBase'

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
