import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Button } from './Button';
import './index';
describe('SolidUIButton', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });
    it('is defined as a custom element', () => {
        expect(customElements.get('solid-ui-button')).toBe(Button);
    });
    it('renders a secondary button by default', async () => {
        var _a, _b;
        const button = new Button();
        button.label = 'Upload';
        document.body.appendChild(button);
        await button.updateComplete;
        const nativeButton = (_a = button.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('button');
        expect(button.variant).toBe('secondary');
        expect(nativeButton.type).toBe('button');
        expect((_b = nativeButton.textContent) === null || _b === void 0 ? void 0 : _b.trim()).toBe('Upload');
    });
    it('supports a selected state without forcing toggle semantics', async () => {
        var _a;
        const button = new Button();
        button.selected = true;
        document.body.appendChild(button);
        await button.updateComplete;
        const nativeButton = (_a = button.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('button');
        expect(button.hasAttribute('selected')).toBe(true);
        expect(nativeButton.hasAttribute('aria-pressed')).toBe(false);
        expect(nativeButton.hasAttribute('aria-selected')).toBe(false);
    });
    it('calls the callback property and still emits the native click event', async () => {
        var _a;
        const button = new Button();
        const handleClick = jest.fn();
        const clickListener = jest.fn();
        button.handleClick = handleClick;
        button.addEventListener('click', clickListener);
        document.body.appendChild(button);
        await button.updateComplete;
        const nativeButton = (_a = button.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('button');
        nativeButton.click();
        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(clickListener).toHaveBeenCalledTimes(1);
    });
    it('renders an image icon when the icon property is provided', async () => {
        var _a;
        const button = new Button();
        button.icon = 'data:image/svg+xml,%3Csvg%3E%3C/svg%3E';
        document.body.appendChild(button);
        await button.updateComplete;
        const icon = (_a = button.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.button__icon-image');
        expect(icon.getAttribute('src')).toBe(button.icon);
    });
    it('supports an icon-only variant without rendering the label text', async () => {
        var _a, _b;
        const button = new Button();
        button.variant = 'icon';
        button.icon = 'data:image/svg+xml,%3Csvg%3E%3C/svg%3E';
        button.label = 'Settings';
        document.body.appendChild(button);
        await button.updateComplete;
        const label = (_a = button.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.button__label');
        const icon = (_b = button.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('.button__icon-image');
        expect(button.variant).toBe('icon');
        expect(label).not.toBeNull();
        expect(icon.getAttribute('src')).toBe(button.icon);
    });
    it('prefers slotted icon content over the icon property fallback', async () => {
        var _a, _b;
        const button = document.createElement('solid-ui-button');
        button.icon = 'data:image/svg+xml,%3Csvg%3E%3C/svg%3E';
        const slottedIcon = document.createElement('span');
        slottedIcon.slot = 'icon';
        slottedIcon.textContent = 'icon';
        button.appendChild(slottedIcon);
        document.body.appendChild(button);
        await button.updateComplete;
        await Promise.resolve();
        await button.updateComplete;
        expect((_a = button.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('slot[name="icon"]')).not.toBeNull();
        expect((_b = button.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('.button__icon-image')).toBeNull();
    });
    it('renders slotted icon content without requiring an icon fallback property', async () => {
        var _a, _b, _c;
        const button = document.createElement('solid-ui-button');
        const slottedIcon = document.createElement('span');
        slottedIcon.slot = 'icon';
        slottedIcon.textContent = 'icon';
        button.appendChild(slottedIcon);
        document.body.appendChild(button);
        await button.updateComplete;
        await Promise.resolve();
        await button.updateComplete;
        expect((_a = button.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('slot[name="icon"]')).not.toBeNull();
        expect((_b = button.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('.button__icon')).not.toBeNull();
        expect((_c = button.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('.button__icon-image')).toBeNull();
    });
    it('applies layout styling hooks exposed through CSS custom properties', async () => {
        const stylesheetText = Array.isArray(Button.styles)
            ? Button.styles.map((styleSheet) => styleSheet.toString()).join('\n')
            : Button.styles.toString();
        expect(stylesheetText).toContain('--button-padding-sm: 0 var(--button-padding-x-sm);');
        expect(stylesheetText).toContain('--button-border-width: 1px;');
        expect(stylesheetText).toContain('padding: var(--button-padding-md);');
        expect(stylesheetText).toContain('border: var(--button-border-width) solid var(--button-border);');
        expect(stylesheetText).toContain('border-radius: var(--button-border-radius);');
        expect(stylesheetText).toContain('font-weight: var(--button-font-weight);');
        expect(stylesheetText).toContain('line-height: var(--button-line-height);');
        expect(stylesheetText).toContain('justify-content: var(--button-justify-content);');
        expect(stylesheetText).toContain('box-shadow: var(--button-hover-box-shadow, var(--button-box-shadow));');
        expect(stylesheetText).toContain('outline: var(--button-focus-outline);');
        expect(stylesheetText).toContain('transform: var(--button-active-transform);');
    });
});
//# sourceMappingURL=Button.test.js.map