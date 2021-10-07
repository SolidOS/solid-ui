import { silenceDebugMessages } from '../../helpers/setup'
import * as Styles from '../../../src/acl/styles'

silenceDebugMessages()

describe('Styles', () => {
  it('exists', () => {
    expect(typeof Styles).toEqual('object')
  })
})
