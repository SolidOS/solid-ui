import { css } from 'lit'

export const listboxStyles = css`
    :host { // default theme
      --input-background: var(--color-background, #F8F9FB);
      --item-text: var(--color-text, #1A1A1A);
      --item-selected-text: var(--color-primary, #7c4dff);
      --item-hover-background: var(--lavender-300, #e6dcff);
      --item-selected-background: var(--lavender-400, #cbb9ff);
      --listbox-z-index: 1;
    }

    :host([theme='dark']) {
      --input-background: var(--color-background, #1A1A1A);
      --item-text: var(--color-text, #F8F9FB);
      --item-selected-text: var(--color-primary, #7c4dff);
      --item-hover-background: var(--lavender-300, #e6dcff);
      --item-selected-background: var(--lavender-400, #cbb9ff);
      --listbox-z-index: 1;
    }

    .listbox {
      position: relative;
      top: 0;
      left: 0;
      right: 0;
      margin: 0;
      padding: 0;
      list-style: none;
      border: none;
      border-radius: inherit;
      background: var(--input-background);
      background-color: var(--input-background);
      opacity: 1;
      overflow: hidden;
      z-index: var(--listbox-z-index);
      box-shadow: 0 4px 12px rgba(124, 77, 255, 0.12);
    }

    .listbox-item {
      display: flex;
      align-items: center;
      width: 100%;
      min-height: var(--select-trigger-height, var(--min-touch-target, 44px));
      padding: var(--spacing-xxs, 0.3125rem) var(--spacing-xs, 0.75rem);
      border: none;
      border-bottom: 1px solid var(--color-border, #E5E7EB);
      background: var(--input-background);
      color: var(--item-text);
      cursor: pointer;
      font: inherit;
      line-height: normal;
      text-align: left;
      box-sizing: border-box;
    }

    .listbox-item:last-child {
      border-bottom: none;
    }

    .listbox-item:hover {
      background: var(--item-hover-background);
      border-radius: var(--border-radius-sm, 0.2rem);
    }

    .listbox-item-active {
      background: var(--item-selected-background);
      color: var(--item-selected-text);
      border-radius: var(--border-radius-sm, 0.2rem);
      outline: none;
    }

    .listbox-item-selected {
      font-weight: var(--font-weight-bold, 600);
    }

    .listbox-item-disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .listbox-item-disabled:hover {
      background: transparent;
      border-radius: 0;
    }
`
