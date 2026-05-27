import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Select } from './Select';
import './index';
function getPortalRoot() {
    var _a;
    const portalHost = document.querySelector('[data-solid-ui-select-portal]');
    return (_a = portalHost === null || portalHost === void 0 ? void 0 : portalHost.shadowRoot) !== null && _a !== void 0 ? _a : null;
}
describe('SolidUISelect', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });
    it('is defined as a custom element', () => {
        expect(customElements.get('solid-ui-select')).toBe(Select);
    });
    it('renders the trigger with the first option label by default', async () => {
        var _a, _b;
        const select = new Select();
        select.label = 'Language';
        select.options = [
            { label: 'English', value: 'en' },
            { label: 'French', value: 'fr' }
        ];
        document.body.appendChild(select);
        await select.updateComplete;
        const trigger = (_a = select.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('button.select-trigger');
        const triggerIcon = (_b = select.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('.select-trigger-icon svg');
        expect(trigger).not.toBeNull();
        expect(triggerIcon).not.toBeNull();
        expect(trigger.getAttribute('aria-haspopup')).toBe('listbox');
        expect(trigger.getAttribute('aria-expanded')).toBe('false');
        expect(trigger.textContent).toContain('English');
    });
    it('renders the fallback label when no options are provided', async () => {
        var _a;
        const select = new Select();
        select.label = 'Language';
        document.body.appendChild(select);
        await select.updateComplete;
        const trigger = (_a = select.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('button.select-trigger');
        expect(trigger).not.toBeNull();
        expect(trigger.textContent).toContain('Language');
        expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });
    it('opens the popup and updates the value when an option is clicked', async () => {
        var _a;
        const select = new Select();
        const changed = jest.fn();
        select.label = 'Language';
        select.options = [
            { label: 'English', value: 'en' },
            { label: 'French', value: 'fr' }
        ];
        select.addEventListener('change', (event) => {
            changed(event.detail);
        });
        document.body.appendChild(select);
        await select.updateComplete;
        const trigger = (_a = select.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('button.select-trigger');
        trigger.click();
        await select.updateComplete;
        const portalRoot = getPortalRoot();
        const listbox = portalRoot === null || portalRoot === void 0 ? void 0 : portalRoot.querySelector('[role="listbox"]');
        const options = portalRoot === null || portalRoot === void 0 ? void 0 : portalRoot.querySelectorAll('[role="option"]');
        expect(listbox).not.toBeNull();
        expect(options).toHaveLength(2);
        options[1].click();
        await select.updateComplete;
        expect(select.value).toBe('fr');
        expect(trigger.textContent).toContain('French');
        expect(trigger.getAttribute('aria-expanded')).toBe('false');
        expect(changed).toHaveBeenCalledWith({ value: 'fr' });
    });
    it('opens the popup when clicking the visible trigger toggle', async () => {
        var _a, _b, _c;
        const select = new Select();
        select.label = 'Language';
        select.options = [
            { label: 'English', value: 'en' },
            { label: 'French', value: 'fr' }
        ];
        document.body.appendChild(select);
        await select.updateComplete;
        const toggle = (_a = select.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.select-trigger-toggle');
        expect(toggle).not.toBeNull();
        toggle.click();
        await select.updateComplete;
        const trigger = (_b = select.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('button.select-trigger');
        expect(trigger.getAttribute('aria-expanded')).toBe('true');
        expect((_c = getPortalRoot()) === null || _c === void 0 ? void 0 : _c.querySelector('[role="listbox"]')).not.toBeNull();
    });
    it('renders the selected option first in the popup', async () => {
        var _a, _b;
        const select = new Select();
        select.options = [
            { label: 'English', value: 'en' },
            { label: 'French', value: 'fr' },
            { label: 'Spanish', value: 'es' }
        ];
        select.value = 'fr';
        document.body.appendChild(select);
        await select.updateComplete;
        const trigger = (_a = select.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('button.select-trigger');
        trigger.click();
        await select.updateComplete;
        const options = Array.from((_b = getPortalRoot()) === null || _b === void 0 ? void 0 : _b.querySelectorAll('[role="option"]'));
        expect(options).toHaveLength(3);
        expect(options[0].textContent).toContain('French');
        expect(options[0].getAttribute('aria-selected')).toBe('true');
    });
    it('does not reflect options to an HTML attribute', async () => {
        const select = new Select();
        select.options = [
            { label: 'English', value: 'en' },
            { label: 'French', value: 'fr' }
        ];
        document.body.appendChild(select);
        await select.updateComplete;
        expect(select.hasAttribute('options')).toBe(false);
    });
    it('supports keyboard selection from the trigger', async () => {
        var _a;
        const select = new Select();
        const changed = jest.fn();
        select.label = 'Language';
        select.options = [
            { label: 'English', value: 'en' },
            { label: 'French', value: 'fr' },
            { label: 'Spanish', value: 'es' }
        ];
        select.addEventListener('change', (event) => {
            changed(event.detail);
        });
        document.body.appendChild(select);
        await select.updateComplete;
        const trigger = (_a = select.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('button.select-trigger');
        trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await select.updateComplete;
        expect(trigger.getAttribute('aria-expanded')).toBe('true');
        expect(trigger.getAttribute('aria-activedescendant')).toBeTruthy();
        trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await select.updateComplete;
        trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await select.updateComplete;
        expect(select.value).toBe('fr');
        expect(trigger.textContent).toContain('French');
        expect(changed).toHaveBeenCalledWith({ value: 'fr' });
    });
    it('closes the popup when clicking outside the component', async () => {
        var _a;
        const select = new Select();
        select.options = [
            { label: 'English', value: 'en' },
            { label: 'French', value: 'fr' }
        ];
        document.body.appendChild(select);
        await select.updateComplete;
        const trigger = (_a = select.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('button.select-trigger');
        trigger.click();
        await select.updateComplete;
        expect(trigger.getAttribute('aria-expanded')).toBe('true');
        expect(getPortalRoot()).not.toBeNull();
        document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }));
        await select.updateComplete;
        expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });
});
//# sourceMappingURL=Select.test.js.map