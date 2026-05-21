import { AuthContext } from './context'
import Account from './Account'

export default class NoopAuth implements AuthContext {
  public get account (): Account | null {
    throw new Error('Can\'t use auth, missing context provider')
  }

  public login (): void {
    throw new Error('Can\'t use auth, missing context provider')
  }

  public signup (): void {
    throw new Error('Can\'t use auth, missing context provider')
  }

  public logout (): void {
    throw new Error('Can\'t use auth, missing context provider')
  }
}
