import { AuthContext } from './context'

export default class NoopAuth implements AuthContext {
  public readonly initialized = false
  public readonly account = null

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
