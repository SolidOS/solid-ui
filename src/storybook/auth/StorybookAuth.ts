import { Account, AuthContext } from '@/lib/auth'

export default class StorybookAuth implements AuthContext {
  public account: Account | null = null

  async login (loginUrl?: string) {
    alert(loginUrl ? `Log in to ${loginUrl}!` : 'Log in!')
  }

  async signup () {
    alert('Sign up!')
  }

  async logout () {
    alert('Log out!')
  }

  onSessionUpdated () {
    return () => undefined
  }
}
