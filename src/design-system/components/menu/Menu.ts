import { customElement, queryAssignedElements } from 'lit/decorators.js'
import WebComponent from '../../../primitives/lib/WebComponent'
import { html } from 'lit'
import MenuItems from '../menu-items'
import { MenuContext, menuContext } from './context'
import { provide } from '@lit/context'
import { generateId } from '../../lib/ids'

@customElement('solid-ui-menu')
export default class Menu extends WebComponent {
  @queryAssignedElements({ slot: 'trigger' })
  private triggers?: HTMLButtonElement[]

  @queryAssignedElements({ selector: '[popover]' })
  private popovers?: MenuItems[]

  @provide({ context: menuContext })
  private context?: MenuContext

  private triggerClickedWhilstOpen = false

  constructor () {
    super()

    this.context = { id: generateId() }
  }

  protected updated () {
    const trigger = this.triggers?.[0]
    const popover = this.popovers?.[0]

    if (!trigger || !popover) {
      return
    }

    trigger.setAttribute('aria-haspopup', 'menu')
    trigger.setAttribute('aria-controls', popover.id)
    trigger.style.anchorName = '--menu-anchor'
  }

  protected render () {
    return html`
        <slot
          name="trigger"
          @pointerdown=${this.onTriggerPointerDown}
          @click=${this.onTriggerClick}
        ></slot>
        <slot @click=${this.onMenuClick}></slot>
    `
  }

  private onTriggerPointerDown (e: PointerEvent) {
    e.preventDefault()

    this.triggerClickedWhilstOpen = this.popovers?.[0]?.matches(':popover-open') ?? false
  }

  private onTriggerClick (e: MouseEvent) {
    e.preventDefault()

    if (this.triggerClickedWhilstOpen) {
      this.triggerClickedWhilstOpen = false

      return
    }

    this.popovers?.[0]?.togglePopover()
  }

  private onMenuClick (e: MouseEvent) {
    const target = e.target
    const targetIsClickable =
        target instanceof HTMLElement && (
          target.tagName === 'BUTTON' ||
            target.tagName === 'A' ||
            target.tagName === 'SOLID-UI-MENU-ITEM' ||
            target.closest('button, a, [role="menuitem"]')
        )

    if (!targetIsClickable) {
      return
    }

    this.popovers?.[0]?.hidePopover()
  }
}
