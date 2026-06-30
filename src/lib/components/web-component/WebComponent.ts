import { html, LitElement, type CSSResultGroup } from 'lit'
import type { WebComponentTrait, WebComponentTraitMethodKey } from '@/lib/components/traits/WebComponentTrait'

import styles from './WebComponent.styles.css'

export default abstract class WebComponent extends LitElement {
  static states?: Record<string, Function>

  protected static finalizeStyles (componentStyles?: CSSResultGroup) {
    const elementStyles = super.finalizeStyles(componentStyles)

    return [styles, ...elementStyles]
  }

  protected internals?: ElementInternals
  protected globalListeners: [type: string, listener: EventListener][] = []
  protected traits: WebComponentTrait[] = []

  disconnectedCallback (): void {
    super.disconnectedCallback()

    for (const [type, listener] of this.globalListeners) {
      window.removeEventListener(type, listener)
    }

    this.globalListeners = []
  }

  protected addTrait<T extends WebComponentTrait>(trait: T): T {
    this.traits.push(trait)

    return trait
  }

  protected firstUpdated () {
    this.forwardMethodCall('firstUpdated')
  }

  protected updated (changedProperties: Map<PropertyKey, unknown>) {
    this.forwardMethodCall('updated', changedProperties)
  }

  protected formResetCallback () {
    this.forwardMethodCall('formResetCallback')
  }

  protected willUpdate (changedProperties: Map<string, any>) {
    super.willUpdate(changedProperties)

    const states = this.static().states

    if (!states) {
      return
    }

    for (const [state, condition] of Object.entries(states)) {
      // FIXME when browser support is good enough, use the internals API instead with :state() selectors
      this.toggleAttribute(`data-state-${state}`, !!condition(this))
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

  private forwardMethodCall<T extends WebComponentTraitMethodKey>(method: T, ...args: Parameters<Required<WebComponentTrait>[T]>) {
    for (const trait of this.traits) {
      (trait[method] as Function | undefined)?.(...args)
    }
  }
}
