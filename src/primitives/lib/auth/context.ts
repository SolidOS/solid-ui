import NoopAuth from './NoopAuth'
import { createContext } from '@lit/context'
import Account from './Account'

export interface AuthContext {
  account: Account | null;
  login(): unknown;
  signup(): unknown;
  logout(): unknown;
}

export const DEFAULT_AUTH_CONTEXT = new NoopAuth()
export const authContext = createContext<AuthContext>(Symbol('auth'))
