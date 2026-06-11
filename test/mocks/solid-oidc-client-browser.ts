type Listener = (...args: any[]) => void

class EventEmitterLike {
  private listeners: Record<string, Listener[]> = {}

  on (event: string, listener: Listener): void {
    const list = this.listeners[event] || []
    list.push(listener)
    this.listeners[event] = list
  }

  off (event: string, listener: Listener): void {
    const list = this.listeners[event] || []
    this.listeners[event] = list.filter(item => item !== listener)
  }

  emit (event: string, ...args: any[]): void {
    const list = this.listeners[event] || []
    list.forEach(listener => listener(...args))
  }
}

export class Session {
  info: { webId?: string, isLoggedIn: boolean } = { isLoggedIn: false }
  webId?: string
  isActive = false
  events = new EventEmitterLike()

  private eventTarget = new EventTarget()

  addEventListener (type: string, listener: EventListenerOrEventListenerObject | null): void {
    if (!listener) return
    this.eventTarget.addEventListener(type, listener)
  }

  removeEventListener (type: string, listener: EventListenerOrEventListenerObject | null): void {
    if (!listener) return
    this.eventTarget.removeEventListener(type, listener)
  }

  dispatchEvent (event: Event): boolean {
    return this.eventTarget.dispatchEvent(event)
  }

  async handleIncomingRedirect (): Promise<void> {

  }

  async handleRedirectFromLogin (): Promise<void> {

  }

  async restore (): Promise<void> {

  }

  async login (_idp?: string, _redirectUri?: string): Promise<void> {
  }

  async logout (): Promise<void> {
    this.info = { isLoggedIn: false }
    this.webId = undefined
    this.isActive = false
  }

  fetch (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    return globalThis.fetch(input, init)
  }

  authFetch (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    return globalThis.fetch(input, init)
  }
}
