import styles from './DialogContent.styles.css'
import WebComponent from '../../../primitives/lib/WebComponent'
import { customElement } from 'lit/decorators.js'

@customElement('solid-ui-dialog-content')
export default class DialogContent extends WebComponent {
  static styles = styles
}
