import { SignupButton } from './SignupButton';
import './index';
describe('SolidUISignupButton', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        Object.defineProperty(window, 'open', {
            configurable: true,
            writable: true,
            value: jest.fn()
        });
    });
    it('is defined as a custom element', () => {
        expect(customElements.get('solid-ui-signup-button')).toBe(SignupButton);
    });
    it('renders the signup button and opens the signup URL in a new tab', async () => {
        var _a, _b;
        const signupButton = new SignupButton();
        signupButton.signupUrl = 'https://example.com/register';
        document.body.appendChild(signupButton);
        await signupButton.updateComplete;
        const button = (_a = signupButton.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('button.signup-button');
        expect(button).not.toBeNull();
        expect((_b = button.textContent) === null || _b === void 0 ? void 0 : _b.trim()).toBe('Sign Up');
        button.click();
        expect(window.open).toHaveBeenCalledWith('https://example.com/register', '_blank', 'noopener,noreferrer');
    });
    it('renders an icon when the icon property is set', async () => {
        var _a;
        const signupButton = new SignupButton();
        signupButton.icon = 'https://example.com/icon.svg';
        document.body.appendChild(signupButton);
        await signupButton.updateComplete;
        const icon = (_a = signupButton.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('img.signup-button-icon');
        expect(icon).not.toBeNull();
        expect(icon.src).toContain('https://example.com/icon.svg');
    });
    it('applies mobile layout styles by removing the border on mobile', async () => {
        var _a, _b;
        const signupButton = new SignupButton();
        signupButton.layout = 'mobile';
        document.body.appendChild(signupButton);
        await signupButton.updateComplete;
        const style = (_b = (_a = signupButton.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('style')) === null || _b === void 0 ? void 0 : _b.textContent;
        expect(style).toContain(':host([layout=\'mobile\']) .signup-button');
        expect(style).toContain('border: none;');
        expect(signupButton.getAttribute('layout')).toBe('mobile');
    });
});
//# sourceMappingURL=SignupButton.test.js.map