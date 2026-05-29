import { html, LitElement } from 'lit'

export default abstract class WebComponent extends LitElement {
  protected render () {
    return html`<slot></slot>`
  }
}
