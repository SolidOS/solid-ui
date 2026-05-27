import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Combobox } from './Combobox';
import './index';
function getPortalRoot() {
    var _a;
    const portalHost = document.querySelector('[data-solid-ui-combobox-portal]');
    return (_a = portalHost === null || portalHost === void 0 ? void 0 : portalHost.shadowRoot) !== null && _a !== void 0 ? _a : null;
}
async function flushUpdates() {
    await Promise.resolve();
    await Promise.resolve();
}
describe('SolidUICombobox', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });
    it('is defined as a custom element', () => {
        expect(customElements.get('solid-ui-combobox')).toBe(Combobox);
    });
    it('renders the input with label and placeholder', async () => {
        var _a, _b, _c;
        const combobox = new Combobox();
        combobox.label = 'Person';
        combobox.placeholder = 'Search people';
        document.body.appendChild(combobox);
        await combobox.updateComplete;
        const label = (_a = combobox.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('label.text-label');
        const input = (_b = combobox.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('input.text-input');
        const toggle = (_c = combobox.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('button.dropdown-toggle');
        expect(label).not.toBeNull();
        expect(label.textContent).toContain('Person');
        expect(input).not.toBeNull();
        expect(input.placeholder).toBe('Search people');
        expect(input.getAttribute('part')).toBe('input');
        expect(input.getAttribute('role')).toBe('combobox');
        expect(input.getAttribute('aria-expanded')).toBe('false');
        expect(toggle).not.toBeNull();
    });
    it('loads suggestions from suggestionProvider and emits input events', async () => {
        var _a;
        const combobox = new Combobox();
        const inputEvents = jest.fn();
        const suggestionProvider = jest.fn(async (query) => [
            { label: `Alice ${query}`, value: 'alice' },
            { label: `Bob ${query}`, value: 'bob' }
        ]);
        combobox.suggestionProvider = suggestionProvider;
        combobox.addEventListener('input', (event) => {
            inputEvents(event.detail);
        });
        document.body.appendChild(combobox);
        await combobox.updateComplete;
        const input = (_a = combobox.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('input.text-input');
        input.value = 'al';
        input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        await flushUpdates();
        await combobox.updateComplete;
        const portalRoot = getPortalRoot();
        const options = Array.from(portalRoot === null || portalRoot === void 0 ? void 0 : portalRoot.querySelectorAll('[role="option"]'));
        expect(suggestionProvider).toHaveBeenCalledWith('al');
        expect(inputEvents).toHaveBeenCalledWith({ value: 'al' });
        expect(combobox.inputValue).toBe('al');
        expect(options).toHaveLength(2);
        expect(options[0].textContent).toContain('Alice al');
    });
    it('renders the selected option first in the popup', async () => {
        var _a;
        const combobox = new Combobox();
        combobox.options = [
            { label: 'English', value: 'en' },
            { label: 'French', value: 'fr' },
            { label: 'Spanish', value: 'es' }
        ];
        combobox.value = 'fr';
        document.body.appendChild(combobox);
        await combobox.updateComplete;
        const input = (_a = combobox.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('input.text-input');
        input.dispatchEvent(new Event('focus'));
        await combobox.updateComplete;
        const portalRoot = getPortalRoot();
        const options = Array.from(portalRoot === null || portalRoot === void 0 ? void 0 : portalRoot.querySelectorAll('[role="option"]'));
        expect(options).toHaveLength(3);
        expect(options[0].textContent).toContain('French');
        expect(options[0].getAttribute('aria-selected')).toBe('true');
    });
    it('updates value and emits change when an option is clicked', async () => {
        var _a;
        const combobox = new Combobox();
        const changed = jest.fn();
        combobox.options = [
            { label: 'Alice', value: 'alice', publicId: 'https://example.com/alice' },
            { label: 'Bob', value: 'bob' }
        ];
        combobox.addEventListener('change', (event) => {
            changed(event.detail);
        });
        document.body.appendChild(combobox);
        await combobox.updateComplete;
        const input = (_a = combobox.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('input.text-input');
        input.dispatchEvent(new Event('focus'));
        await combobox.updateComplete;
        const portalRoot = getPortalRoot();
        const options = portalRoot === null || portalRoot === void 0 ? void 0 : portalRoot.querySelectorAll('[role="option"]');
        options[1].click();
        await combobox.updateComplete;
        expect(combobox.value).toBe('bob');
        expect(combobox.inputValue).toBe('Bob');
        expect(input.getAttribute('aria-expanded')).toBe('false');
        expect(changed).toHaveBeenCalledWith({
            value: 'bob',
            label: 'Bob',
            option: { label: 'Bob', value: 'bob' }
        });
    });
    it('opens the popup when clicking the dropdown toggle button', async () => {
        var _a, _b, _c;
        const combobox = new Combobox();
        combobox.options = [
            { label: 'Alice', value: 'alice' },
            { label: 'Bob', value: 'bob' }
        ];
        document.body.appendChild(combobox);
        await combobox.updateComplete;
        const toggle = (_a = combobox.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('button.dropdown-toggle');
        expect(toggle).not.toBeNull();
        toggle.click();
        await combobox.updateComplete;
        const input = (_b = combobox.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('input.text-input');
        expect(input.getAttribute('aria-expanded')).toBe('true');
        expect((_c = getPortalRoot()) === null || _c === void 0 ? void 0 : _c.querySelector('[role="listbox"]')).not.toBeNull();
    });
    it('supports keyboard selection from the input', async () => {
        var _a;
        const combobox = new Combobox();
        const changed = jest.fn();
        combobox.options = [
            { label: 'Alice', value: 'alice' },
            { label: 'Bob', value: 'bob' },
            { label: 'Carol', value: 'carol' }
        ];
        combobox.addEventListener('change', (event) => {
            changed(event.detail);
        });
        document.body.appendChild(combobox);
        await combobox.updateComplete;
        const input = (_a = combobox.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('input.text-input');
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await combobox.updateComplete;
        expect(input.getAttribute('aria-expanded')).toBe('true');
        expect(input.getAttribute('aria-activedescendant')).toBeTruthy();
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await combobox.updateComplete;
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await combobox.updateComplete;
        expect(combobox.value).toBe('bob');
        expect(combobox.inputValue).toBe('Bob');
        expect(changed).toHaveBeenCalledWith({
            value: 'bob',
            label: 'Bob',
            option: { label: 'Bob', value: 'bob' }
        });
    });
    it('does not treat space as a selection while typing', async () => {
        var _a;
        const combobox = new Combobox();
        combobox.options = [
            { label: 'Self Employed', value: 'self-employed' },
            { label: 'Microsoft', value: 'microsoft' }
        ];
        document.body.appendChild(combobox);
        await combobox.updateComplete;
        const input = (_a = combobox.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('input.text-input');
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await combobox.updateComplete;
        const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });
        input.dispatchEvent(event);
        await combobox.updateComplete;
        expect(event.defaultPrevented).toBe(false);
        expect(combobox.value).toBe('');
        expect(input.getAttribute('aria-expanded')).toBe('true');
    });
    it('closes the popup when clicking outside the component', async () => {
        var _a;
        const combobox = new Combobox();
        combobox.options = [
            { label: 'Alice', value: 'alice' },
            { label: 'Bob', value: 'bob' }
        ];
        document.body.appendChild(combobox);
        await combobox.updateComplete;
        const input = (_a = combobox.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('input.text-input');
        input.dispatchEvent(new Event('focus'));
        await combobox.updateComplete;
        expect(input.getAttribute('aria-expanded')).toBe('true');
        expect(getPortalRoot()).not.toBeNull();
        document.body.dispatchEvent(new Event('pointerdown', { bubbles: true, composed: true }));
        await combobox.updateComplete;
        expect(input.getAttribute('aria-expanded')).toBe('false');
    });
});
//# sourceMappingURL=Combobox.test.js.map