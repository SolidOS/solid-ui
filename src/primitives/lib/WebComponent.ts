import { html, LitElement } from 'lit'

export default abstract class WebComponent extends LitElement {
  static states?: Record<string, Function>

  protected internals = this.attachInternals()

  protected willUpdate (changedProperties: Map<string, any>) {
    super.updated(changedProperties)

    for (const [state, condition] of Object.entries(this.static().states ?? {})) {
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
