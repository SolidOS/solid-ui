import { customElement, WebComponent } from '@/lib/components'
import { html } from 'lit'
import { property, query, state } from 'lit/decorators.js'
import type WaDropdown from '@awesome.me/webawesome/dist/components/dropdown/dropdown.js'
import type WaDropdownItem from '@awesome.me/webawesome/dist/components/dropdown-item/dropdown-item.js'
import type { WaDropdownSelectEvent } from '@awesome.me/webawesome'

import '@awesome.me/webawesome/dist/components/dropdown/dropdown.js'
import '@awesome.me/webawesome/dist/components/dropdown-item/dropdown-item.js'

import styles from './Menu.styles.css'

@customElement('solid-ui-menu')
export default class Menu extends WebComponent {
  static styles = styles

  @property({ type: String, reflect: true })
  accessor placement: WaDropdown['placement'] = 'bottom-start';

  @property({ type: Number, reflect: true })
  accessor distance: number = 5;

  @query('wa-dropdown')
  private accessor dropdown: WaDropdown | null = null;

  @state()
  private accessor items: { slot: string; disabled: boolean }[] = []

  private observer: MutationObserver = new MutationObserver(() => this.syncItems())

  connectedCallback () {
    super.connectedCallback()

    this.syncItems()
    this.observer.observe(this, {
      childList: true,
      attributes: true,
      subtree: true,
      attributeFilter: ['disabled', 'slot']
    })
  }

  disconnectedCallback () {
    super.disconnectedCallback()

    this.observer.disconnect()
  }

  protected render () {
    return html`
      <wa-dropdown
        placement=${this.placement}
        distance=${this.distance}
        @wa-select=${this.onWaSelect}
      >
        <slot name="trigger" slot="trigger"></slot>

        ${this.items.map(
          (item) =>
            html`<wa-dropdown-item ?disabled=${item.disabled} @click=${this.onItemClick}>
                <slot name=${item.slot}></slot>
            </wa-dropdown-item>`
        )}
      </wa-dropdown>
    `
  }

  private syncItems (): void {
    // Exclude only the trigger element; include all other children
    // regardless of whether they already have a slot assigned.
    const items = Array.from(this.children).filter(
      (child) => child.getAttribute('slot') !== 'trigger'
    )

    this.items = items.map((item, index) => {
      const slotName = `menu-item-${index}`
      const disabled = item.hasAttribute('disabled')

      if (item.getAttribute('slot') !== slotName) {
        item.setAttribute('slot', slotName)
      }

      return { slot: slotName, disabled }
    })
  }

  private onItemClick (event: Event) {
    const waItem = event.currentTarget as WaDropdownItem

    event.stopPropagation()

    if (waItem.disabled) {
      return
    }

    const selectedEvent = this.dispatchSelectEvent(waItem)

    if (selectedEvent.defaultPrevented || !this.dropdown) {
      return
    }

    this.dropdown.open = false
  }

  private onWaSelect (event: WaDropdownSelectEvent) {
    const selectedEvent = this.dispatchSelectEvent(event.detail.item)

    if (selectedEvent.defaultPrevented) {
      event.preventDefault()

      return
    }

    const slotName = event.detail.item.children[0].getAttribute('name')
    const item = this.querySelector<{ click?: () => void } & Element>(`[slot="${slotName}"]`)

    item?.click?.()
  }

  private dispatchSelectEvent (waItem: WaDropdownItem) {
    const slotName = waItem.children[0].getAttribute('name')
    const item = this.querySelector(`[slot="${slotName}"]`)
    const event = new CustomEvent('solid-ui-select', {
      bubbles: true,
      composed: true,
      cancelable: true,
    })

    item?.dispatchEvent(event)

    return event
  }
}
