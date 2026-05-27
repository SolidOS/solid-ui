import { css } from 'lit';
export const listboxStyles = css `
  :host { /* default theme */
      --input-background: var(--color-background, #F8F9FB);
      --item-text: var(--color-text-heading, #000000);
      --item-selected-text: var(--color-primary, #7c4dff);
      --item-hover-background: var(--color-header-menu-item-hover, #e6dcff);
      --item-selected-background: var(--color-header-menu-item-selected, #cbb9ff);
      --listbox-z-index: 1;
    }

    :host([theme='dark']) {
      --input-background: var(--color-background, #1A1A1A);
      --item-text: var(--color-text-heading, #F8F9FB);
      --item-selected-text: var(--color-primary, #7c4dff);
      --item-hover-background: var(--color-header-menu-item-hover, #e6dcff);
      --item-selected-background: var(--color-header-menu-item-selected, #cbb9ff);
      --listbox-z-index: 1;
    }

    .listbox {
      position: relative;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      gap: 0.0625rem;
      margin: 0;
      padding: 0;
      list-style: none;
      border: none;
      border-radius: inherit;
      background: var(--input-background);
      background-color: var(--input-background);
      opacity: 1;
      overflow: hidden;
      padding: 0.25rem;
      z-index: var(--listbox-z-index);
      box-shadow: 0 4px 12px rgba(124, 77, 255, 0.12);
    }

    .listbox-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-2xs, 0.625rem);
      width: 100%;
      min-height: calc(var(--font-size-sm, 0.875rem) + 1rem);
      padding: 0.5rem var(--spacing-xs, 0.75rem);
      border: none;
      border-radius: var(--border-radius-sm, 0.2rem);
      background: transparent;
      color: var(--item-text);
      cursor: pointer;
      font: inherit;
      font-size: var(--font-size-sm, 0.875rem);
      font-weight: var(--font-weight-normal, 400);
      line-height: normal;
      text-align: left;
      text-decoration: none;
      box-sizing: border-box;
    }

    .listbox-item:hover {
      background: var(--item-hover-background);
      border-radius: var(--border-radius-sm, 0.2rem);
    }

    .listbox-item:focus {
      background: var(--item-hover-background);
      border-radius: var(--border-radius-sm, 0.2rem);
    }

    .listbox-item-active {
      background: var(--item-selected-background);
      color: var(--item-selected-text);
      border-radius: var(--border-radius-sm, 0.2rem);
      outline: none;
    }

    .listbox-item-active:hover,
    .listbox-item-active:focus {
      color: var(--item-text);
    }

    .listbox-item-disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .listbox-item-disabled:hover {
      background: transparent;
      border-radius: 0;
    }
`;
//# sourceMappingURL=listboxStyles.js.map