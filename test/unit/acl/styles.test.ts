import { silenceDebugMessages } from '../helpers/debugger'
import * as Style from '../../../src/style'

silenceDebugMessages()

describe('Style', () => {
  it('exists', () => {
    expect(typeof Style).toEqual('object')
  })
})
