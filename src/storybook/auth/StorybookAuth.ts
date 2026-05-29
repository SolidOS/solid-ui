import { AuthContext } from '../../primitives/lib/auth/context'
import Account from '../../primitives/lib/auth/Account'

export default class StorybookAuth implements AuthContext {
  public account: Account | null = null
}
