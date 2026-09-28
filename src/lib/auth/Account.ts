export default class Account {
  public readonly webId: string
  public readonly avatarUrl?: string

  constructor (webId: string, avatarUrl?: string) {
    this.webId = webId
    this.avatarUrl = avatarUrl
  }
}
