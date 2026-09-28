import { describe, expect, it } from 'vitest'
import { silenceDebugMessages } from '../helpers/debugger'
import { style } from '../../../src/lib/style'

silenceDebugMessages()

describe('Style', () => {
  it('exists', () => {
    expect(typeof style).toEqual('object')
  })
})
