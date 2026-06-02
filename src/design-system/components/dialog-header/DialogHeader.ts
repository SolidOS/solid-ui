import styles from './DialogHeader.styles.css'
import WebComponent from '../../../primitives/lib/WebComponent'
import { customElement } from 'lit/decorators.js'

@customElement('solid-ui-dialog-header')
export default class DialogHeader extends WebComponent {
  static styles = styles
}
