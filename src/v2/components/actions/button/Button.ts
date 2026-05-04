import { LitElement, html, css, nothing } from 'lit'

export class Button extends LitElement {
  static properties = {
    label: { type: String, reflect: true },
    type: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    selected: { type: Boolean, reflect: true },
    ariaLabel: { type: String, attribute: 'aria-label' },
    name: { type: String, reflect: true },
    value: { type: String, reflect: true },
    variant: { type: String, reflect: true },
    size: { type: String, reflect: true },
    theme: { type: String, reflect: true },
    fullWidth: { type: Boolean, attribute: 'full-width', reflect: true },
    icon: { type: String, reflect: true },
    iconPosition: { type: String, attribute: 'icon-position', reflect: true },
    handleClick: { attribute: false },
    _hasSlottedIcon: { state: true }
  }

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      --button-background: var(--color-background, #f8f9fb);
      --button-text: var(--color-text-subheading, #101828);
      --button-border: var(--color-border-button, var(--gray-300, #D1D5DC));
      --button-hover-background: var(--color-surface-subtle, rgba(15, 23, 43, 0.04));
      --button-hover-border: var(--color-border-button-hover, var(--gray-400, #99A1AF));
      --button-hover-text: var(--color-text-subheading, #101828);
      --button-selected-background: var(--color-surface-selected, var(--color-surface-action, var(--color-primary, #7C4DFF)));
      --button-selected-text: var(--color-text-selected, var(--color-text-on-action, var(--white, #FFF)));
      --button-selected-border: var(--color-border-selected, var(--color-border-action, var(--color-primary, #7C4DFF)));
      --button-icon-color: currentColor;
      --button-focus-ring: var(--color-focus-ring, var(--color-primary, #7C4DFF));
      --button-height-sm: 1.875rem;
      --button-height-md: var(--min-touch-target, 44px);
      --button-height-lg: calc(var(--min-touch-target, 44px) + 0.5rem);
      --button-padding-x-sm: var(--spacing-xs, 0.75rem);
      --button-padding-x-md: var(--spacing-sm, 0.9375rem);
      --button-padding-x-lg: var(--spacing-md, 1.25rem);
      --button-font-size-sm: var(--font-size-sm, 0.875rem);
      --button-font-size-md: var(--font-size-md, 1rem);
      --button-font-size-lg: var(--font-size-lg, 1.125rem);
      --button-icon-size-sm: var(--icon-xxxs, 0.75rem);
      --button-icon-size-md: var(--icon-xxs, 1rem);
      --button-icon-size-lg: var(--icon-xxs, 1rem);
      --button-padding-sm: 0 var(--button-padding-x-sm);
      --button-padding-md: 0 var(--button-padding-x-md);
      --button-padding-lg: 0 var(--button-padding-x-lg);
      --button-border-width: 1px;
      --button-border-radius: var(--border-radius-base, 0.3125rem);
      --button-font-weight: var(--font-weight-bold, 600);
      --button-line-height: 1;
      --button-justify-content: center;
      --button-box-shadow: none;
      --button-hover-box-shadow: var(--button-box-shadow);
      --button-active-box-shadow: var(--button-hover-box-shadow);
      --button-active-transform: translateY(1px);
      --button-focus-outline: 2px solid var(--button-focus-ring);
      --button-focus-outline-offset: 2px;
      --button-focus-box-shadow: none;
      --button-transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    }

    :host([theme='dark']) {
      --button-background: var(--color-background, #242a31);
      --button-text: var(--color-text-subheading, #f8f9fb);
      --button-border: var(--color-border, #46515b);
      --button-hover-background: var(--color-surface-subtle, rgba(15, 23, 43, 0.04));
      --button-hover-border: var(--color-border, #46515b);
      --button-hover-text: var(--color-text-subheading, #f8f9fb);
    }

    :host([variant='primary']) {
      --button-background: var(--color-surface-action, var(--color-primary, #7C4DFF));
      --button-text: var(--color-text-on-action, var(--white, #FFF));
      --button-border: var(--color-border-action, var(--color-primary, #7C4DFF));
      --button-hover-background: var(--color-surface-action-hover, #6d3cf2);
      --button-hover-border: var(--color-border-action, var(--color-primary, #7C4DFF));
      --button-hover-text: var(--color-text-on-action, var(--white, #FFF));
    }

    :host([variant='icon']) {
      --button-padding-x-sm: var(--spacing-xxs, 0.3125rem);
      --button-padding-x-md: var(--spacing-base, 0.5rem);
      --button-padding-x-lg: var(--spacing-2xs, 0.625rem);
    }

    :host([full-width]) {
      width: 100%;
    }

    :host([selected]) {
      --button-background: var(--button-selected-background);
      --button-text: var(--button-selected-text);
      --button-border: var(--button-selected-border);
      --button-hover-background: var(--button-selected-background);
      --button-hover-border: var(--button-selected-border);
      --button-hover-text: var(--button-selected-text);
    }

    .button {
      display: inline-flex;
      width: 100%;
      min-height: var(--button-height-md);
      padding: var(--button-padding-md);
      align-items: center;
      justify-content: var(--button-justify-content);
      gap: var(--spacing-xxs, 0.375rem);
      border-radius: var(--button-border-radius);
      background: var(--button-background);
      border: var(--button-border-width) solid var(--button-border);
      box-shadow: var(--button-box-shadow);
      color: var(--button-text);
      cursor: pointer;
      font: inherit;
      font-size: var(--button-font-size-md);
      font-weight: var(--button-font-weight);
      line-height: var(--button-line-height);
      white-space: nowrap;
      text-decoration: none;
      box-sizing: border-box;
      transition: var(--button-transition);
    }

    :host([size='sm']) .button {
      min-height: var(--button-height-sm);
      padding: var(--button-padding-sm);
      font-size: var(--button-font-size-sm);
    }

    :host([size='lg']) .button {
      min-height: var(--button-height-lg);
      padding: var(--button-padding-lg);
      font-size: var(--button-font-size-lg);
    }

    .button:hover:not(:disabled) {
      background: var(--button-hover-background);
      border-color: var(--button-hover-border, var(--button-border));
      box-shadow: var(--button-hover-box-shadow, var(--button-box-shadow));
      color: var(--button-hover-text);
    }

    .button:focus-visible {
      outline: var(--button-focus-outline);
      outline-offset: var(--button-focus-outline-offset);
      box-shadow: var(--button-focus-box-shadow);
    }

    .button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .button__content {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: inherit;
      width: 100%;
    }

    :host([icon-position='end']) .button__content {
      flex-direction: row-reverse;
    }

    .button__icon {
      width: var(--button-icon-size-md);
      height: var(--button-icon-size-md);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--button-icon-color);
      flex-shrink: 0;
    }

    :host([size='sm']) .button__icon {
      width: var(--button-icon-size-sm);
      height: var(--button-icon-size-sm);
    }

    :host([size='lg']) .button__icon {
      width: var(--button-icon-size-lg);
      height: var(--button-icon-size-lg);
    }

    .button__icon ::slotted(*) {
      width: 100%;
      height: 100%;
      display: block;
    }

    .button__icon-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .button__label {
      display: inline-flex;
      align-items: center;
      min-width: 0;
    }

    :host([variant='icon']) .button__label {
      display: none;
    }

    .button:active {
      transform: var(--button-active-transform);
      box-shadow: var(--button-active-box-shadow, var(--button-hover-box-shadow, var(--button-box-shadow)));
    }
  `

  declare label: string
  declare type: 'button' | 'submit' | 'reset'
  declare disabled: boolean
  declare selected: boolean
  declare ariaLabel: string
  declare name: string
  declare value: string
  declare variant: 'primary' | 'secondary' | 'icon'
  declare size: 'sm' | 'md' | 'lg'
  declare theme: 'light' | 'dark'
  declare fullWidth: boolean
  declare icon: string
  declare iconPosition: 'start' | 'end'
  declare handleClick?: (event: MouseEvent) => void
  declare _hasSlottedIcon: boolean
  private _iconSlotObserver?: MutationObserver

  constructor () {
    super()
    this.label = ''
    this.type = 'button'
    this.disabled = false
    this.selected = false
    this.ariaLabel = ''
    this.name = ''
    this.value = ''
    this.variant = 'secondary'
    this.size = 'md'
    this.theme = 'light'
    this.fullWidth = false
    this.icon = ''
    this.iconPosition = 'start'
    this.handleClick = undefined
    this._hasSlottedIcon = false
  }

  connectedCallback () {
    super.connectedCallback()
    this._syncSlottedIconPresence()

    this._iconSlotObserver = new MutationObserver(() => {
      this._syncSlottedIconPresence()
    })

    this._iconSlotObserver.observe(this, {
      childList: true,
      attributes: true,
      attributeFilter: ['slot']
    })
  }

  disconnectedCallback () {
    this._iconSlotObserver?.disconnect()
    this._iconSlotObserver = undefined
    super.disconnectedCallback()
  }

  private _handleButtonClick (event: MouseEvent) {
    this.handleClick?.(event)
  }

  private _handleIconSlotChange (event: Event) {
    const slot = event.target as HTMLSlotElement
    this._hasSlottedIcon = slot.assignedNodes({ flatten: true }).length > 0
  }

  private _syncSlottedIconPresence () {
    this._hasSlottedIcon = this.querySelector('[slot="icon"]') !== null
  }

  private _renderIcon () {
    if (!this._hasSlottedIcon && !this.icon) {
      return nothing
    }

    return html`
      <span class="button__icon" part="icon">
        <slot name="icon" @slotchange=${this._handleIconSlotChange}></slot>
        ${!this._hasSlottedIcon && this.icon
          ? html`<img class="button__icon-image" src=${this.icon} alt="" aria-hidden="true" />`
          : nothing}
      </span>
    `
  }

  render () {
    return html`
      <button
        class="button"
        type=${this.type}
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel || nothing}
        name=${this.name || nothing}
        value=${this.value || nothing}
        part="button"
        @click=${this._handleButtonClick}
      >
        <span class="button__content">
          ${this._renderIcon()}
          <span class="button__label" part="label">
            <slot>${this.label}</slot>
          </span>
        </span>
      </button>
    `
  }
}
