import { customElement, WebComponent } from '@/lib/components'
import { html } from 'lit'

import '~icons/app/solid-emblem'

import styles from './SolidEmblem.styles.css'

@customElement('solid-ui-solid-emblem')
export default class SolidEmblem extends WebComponent {
  static styles = styles

  protected render () {
    return html`<icon-app-solid-emblem></icon-app-solid-emblem>`
  }
}
