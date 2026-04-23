import { LoginButton } from './LoginButton';
import './index';
jest.mock('solid-logic', () => ({
    authSession: { login: jest.fn() },
    authn: { saveUser: jest.fn() },
    getSuggestedIssuers: jest.fn(() => []),
    offlineTestID: jest.fn(() => false),
    solidLogicSingleton: { store: { updater: { flagAuthorizationMetadata: jest.fn() } } }
}));
describe('SolidUILoginButton', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        Object.defineProperty(window, 'open', {
            configurable: true,
            writable: true,
            value: jest.fn()
        });
        HTMLDialogElement.prototype.showModal = jest.fn();
        HTMLDialogElement.prototype.close = jest.fn();
        localStorage.clear();
    });
    it('is defined as a custom element', () => {
        expect(customElements.get('solid-ui-login-button')).toBe(LoginButton);
    });
    it('renders the login button and opens a popup with an associated label and input', async () => {
        var _a, _b, _c, _d;
        const loginButton = new LoginButton();
        document.body.appendChild(loginButton);
        await loginButton.updateComplete;
        const button = (_a = loginButton.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('button.login-button');
        expect(button).not.toBeNull();
        expect((_b = button.textContent) === null || _b === void 0 ? void 0 : _b.trim()).toBe('Log In');
        button.click();
        await loginButton.updateComplete;
        const label = (_c = loginButton.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('label.issuer-text-label');
        const input = (_d = loginButton.shadowRoot) === null || _d === void 0 ? void 0 : _d.querySelector('input.issuer-text-input');
        expect(label).not.toBeNull();
        expect(input).not.toBeNull();
        expect(label === null || label === void 0 ? void 0 : label.getAttribute('for')).toBe(input === null || input === void 0 ? void 0 : input.id);
        expect(input === null || input === void 0 ? void 0 : input.id).toBeTruthy();
    });
    it('renders an icon when the icon property is set', async () => {
        var _a;
        const loginButton = new LoginButton();
        loginButton.icon = 'https://example.com/login-icon.svg';
        document.body.appendChild(loginButton);
        await loginButton.updateComplete;
        const icon = (_a = loginButton.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('img.login-button-icon');
        expect(icon).not.toBeNull();
        expect(icon.src).toContain('https://example.com/login-icon.svg');
    });
});
//# sourceMappingURL=LoginButton.test.js.map