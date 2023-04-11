import { silenceDebugMessages } from '../../helpers/setup'
import * as Style from '../../../src/style'

silenceDebugMessages()

describe('Style', () => {
  it('exists', () => {
    expect(typeof Style).toEqual('object')
  })
})
