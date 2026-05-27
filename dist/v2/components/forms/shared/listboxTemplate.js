import { html } from 'lit';
export function renderListbox(args) {
    const { options, selectedOption, activeOption, listboxId, getOptionId, onOptionSelect } = args;
    return html `
    <ul
      class="listbox"
      id="${listboxId !== null && listboxId !== void 0 ? listboxId : ''}"
      part="listbox"
      role="listbox"
      aria-orientation="vertical"
    >
      ${options.map((option, index) => {
        const isSelected = option.value === (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.value);
        const isActive = option.value === (activeOption === null || activeOption === void 0 ? void 0 : activeOption.value);
        const optionId = getOptionId === null || getOptionId === void 0 ? void 0 : getOptionId(option, index);
        return html `
          <li
            id="${optionId !== null && optionId !== void 0 ? optionId : ''}"
            class="listbox-item${isSelected ? ' listbox-item-selected' : ''}${isActive ? ' listbox-item-active' : ''}${option.disabled ? ' listbox-item-disabled' : ''}"
            part="option${isSelected ? ' selected-option' : ''}${isActive ? ' active-option' : ''}${option.disabled ? ' disabled-option' : ''}"
            role="option"
            aria-selected="${isSelected}"
            aria-disabled="${option.disabled ? 'true' : 'false'}"
            @click="${() => {
            if (!option.disabled) {
                onOptionSelect(option);
            }
        }}"
          >
            ${option.label}
          </li>
        `;
    })}
    </ul>
  `;
}
//# sourceMappingURL=listboxTemplate.js.map