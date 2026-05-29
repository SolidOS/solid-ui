import { html, LitElement } from 'lit'

export default abstract class WebComponent extends LitElement {
  static states?: Record<string, Function>

  protected internals?: ElementInternals

  protected willUpdate (changedProperties: Map<string, any>) {
    super.willUpdate(changedProperties)

    const states = this.static().states

    if (!states) {
      return
    }

    this.internals ??= this.attachInternals()

    for (const [state, condition] of Object.entries(states)) {
      const matches = condition(this)

      if (matches && !this.internals.states.has(state)) {
        this.internals.states.add(state)
      } else if (!matches && this.internals.states.has(state)) {
        this.internals.states.delete(state)
      }
    }
  }

  protected render () {
    return html`<slot></slot>`
  }

  private static (): typeof WebComponent {
    return this.constructor as typeof WebComponent
  }
}
