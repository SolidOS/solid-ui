import { AuthContext } from './context'
import Account from './Account'

export default class NoopAuth implements AuthContext {
  get account (): Account | null {
    return null
  }

  async login () {
    throw new Error('Can\'t use auth, missing context provider')
  }

  async signup () {
    throw new Error('Can\'t use auth, missing context provider')
  }

  async logout () {
    throw new Error('Can\'t use auth, missing context provider')
  }

  onSessionUpdated () {
    return () => undefined
  }
}
