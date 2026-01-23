import { silenceDebugMessages } from '../helpers/debugger'
import { style } from '../../../src/style'

silenceDebugMessages()

describe('Style', () => {
  it('exists', () => {
    expect(typeof style).toEqual('object')
  })
})
