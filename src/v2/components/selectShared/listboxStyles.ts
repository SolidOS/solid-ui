import { css } from 'lit'

export const listboxStyles = css`
    :host { // default theme
      display: inline-block;
      position: relative;
      z-index: 200;
      --input-background: var(--color-background, #F8F9FB);
      --item-text: var(--color-text, #1A1A1A);
      --item-hover-background: var(--lavender-900, #7c4cff);
    }

    :host([theme='dark']) {
      display: inline-block;
      position: relative;
      z-index: 200;
      --input-background: var(--color-background, #F8F9FB);
      --item-text: var(--color-text, #1A1A1A);
      --item-hover-background: var(--lavender-900, #7c4cff);
    }

    .listbox {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      right: 0;
      border: 1px solid var(--color-border, #E5E7EB);
      border-top: none;
      border-radius: 0 0 var(--border-radius-base, 0.3125rem) var(--border-radius-base, 0.3125rem);
      background: var(--input-background);
      overflow: visible;
      z-index: 10;
      box-shadow: 0 4px 12px rgba(124, 77, 255, 0.12);
    }

    .listbox-item {
      display: block;
      width: 100%;
      padding: 0.625rem 0.75rem;
      border: none;
      border-bottom: 1px solid var(--color-border, #E5E7EB);
      background: transparent;
      color: var(--item-text);
      cursor: pointer;
      font: inherit;
      text-align: left;
      box-sizing: border-box;
    }

    .listbox-item:last-child {
      border-bottom: none;
    }

    .listbox-item:hover {
      background: var(--item-hover-background);
      border-radius: var(--border-radius-base-md, 0.5rem);
    }

    .listbox-item-active {
      background: var(--item-hover-background);
      border-radius: var(--border-radius-base-md, 0.5rem);
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
