import { html } from 'lit'
import type { SelectOption } from './optionTypes'

export interface RenderListboxArgs {
  options: SelectOption[]
  selectedOption?: SelectOption
  activeOption?: SelectOption
  listboxId?: string
  getOptionId?: (option: SelectOption, index: number) => string
  onOptionSelect: (option: SelectOption) => void
}

export function renderListbox(args: RenderListboxArgs) {
  const {
    options,
    selectedOption,
    activeOption,
    listboxId,
    getOptionId,
    onOptionSelect
  } = args

  return html`
    <ul
      class="listbox"
      id="${listboxId ?? ''}"
      role="listbox"
      aria-orientation="vertical"
    >
      ${options.map((option, index) => {
        const isSelected = option.value === selectedOption?.value
        const isActive = option.value === activeOption?.value
        const optionId = getOptionId?.(option, index)

        return html`
          <li
            id="${optionId ?? ''}"
            class="listbox-item${isSelected ? ' listbox-item-selected' : ''}${isActive ? ' listbox-item-active' : ''}${option.disabled ? ' listbox-item-disabled' : ''}"
            role="option"
            aria-selected="${isSelected}"
            aria-disabled="${option.disabled ? 'true' : 'false'}"
            @click="${() => {
              if (!option.disabled) {
                onOptionSelect(option)
              }
            }}"
          >
            ${option.label}
          </li>
        `
      })}
    </ul>
  `
}