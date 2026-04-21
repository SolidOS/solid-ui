import { silenceDebugMessages } from '../../helpers/setup'
import * as Style from 'solid-ui-core/style'

silenceDebugMessages()

describe('Style', () => {
  it('exists', () => {
    expect(typeof Style).toEqual('object')
  })
})
