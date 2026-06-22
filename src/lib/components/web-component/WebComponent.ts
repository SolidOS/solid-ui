import { html, LitElement, type CSSResultGroup } from 'lit'

import styles from './WebComponent.styles.css'

export default abstract class WebComponent extends LitElement {
  static states?: Record<string, Function>

  protected static finalizeStyles (componentStyles?: CSSResultGroup) {
    const elementStyles = super.finalizeStyles(componentStyles)

    return [styles, ...elementStyles]
  }

  protected internals?: ElementInternals
  protected globalListeners: [type: string, listener: EventListener][] = []

  disconnectedCallback (): void {
    super.disconnectedCallback()

    for (const [type, listener] of this.globalListeners) {
      window.removeEventListener(type, listener)
    }

    this.globalListeners = []
  }

  protected willUpdate (changedProperties: Map<string, any>) {
    super.willUpdate(changedProperties)

    const states = this.static().states

    if (!states) {
      return
    }

    const internals = this.getInternals()

    for (const [state, condition] of Object.entries(states)) {
      const matches = condition(this)

      if (matches && !internals.states.has(state)) {
        internals.states.add(state)
      } else if (!matches && internals.states.has(state)) {
        internals.states.delete(state)
      }
    }
  }

  protected addGlobalEventListener <T extends keyof WindowEventMap>(type: T, listener: (this: Window, ev: WindowEventMap[T]) => any) {
    this.globalListeners.push([type, listener as EventListener])

    window.addEventListener(type, listener)
  }

  protected render () {
    return html`<slot></slot>`
  }

  protected getInternals (): ElementInternals {
    this.internals ??= this.attachInternals()

    return this.internals
  }

  private static (): typeof WebComponent {
    return this.constructor as typeof WebComponent
  }
}
