import styles from './DialogFooter.styles.css'
import WebComponent from '../../../primitives/lib/WebComponent'
import { customElement } from 'lit/decorators.js'

@customElement('solid-ui-dialog-footer')
export default class DialogFooter extends WebComponent {
  static styles = styles
}
