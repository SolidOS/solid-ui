declare module '@awesome.me/webawesome' {
  import type WaDropdownItem from '@awesome.me/webawesome/dist/components/dropdown/dropdown-item.js'

  export interface WaDropdownSelectEvent extends Event {
    detail: {
      item: WaDropdownItem;
    };
  }
}
