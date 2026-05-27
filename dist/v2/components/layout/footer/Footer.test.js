import { Footer } from './Footer';
import './index';
import { authn } from 'solid-logic';
describe('SolidUIFooterElement', () => {
    it('is defined as a custom element', () => {
        const defined = customElements.get('solid-ui-footer');
        expect(defined).toBe(Footer);
    });
    it('renders a public view when not logged in', async () => {
        const footer = new Footer();
        document.body.appendChild(footer);
        await footer.updateComplete;
        const shadow = footer.shadowRoot;
        expect(shadow).not.toBeNull();
        expect(shadow === null || shadow === void 0 ? void 0 : shadow.textContent).toContain('Public View');
        expect(shadow === null || shadow === void 0 ? void 0 : shadow.textContent).toContain('You are viewing this profile as a guest.');
    });
    it('renders a logged in view when the user is authenticated', async () => {
        const currentUser = { uri: 'https://alice.example/profile/card#me', equals: jest.fn(() => true) };
        const currentUserSpy = jest.spyOn(authn, 'currentUser').mockReturnValue(currentUser);
        const footer = new Footer();
        document.body.appendChild(footer);
        await footer.updateComplete;
        const shadow = footer.shadowRoot;
        expect(shadow).not.toBeNull();
        expect(shadow === null || shadow === void 0 ? void 0 : shadow.textContent).toContain('Logged in View');
        expect(shadow === null || shadow === void 0 ? void 0 : shadow.textContent).toContain('You are logged in as');
        const link = shadow === null || shadow === void 0 ? void 0 : shadow.querySelector('a');
        expect(link === null || link === void 0 ? void 0 : link.getAttribute('href')).toBe('https://alice.example/profile/card#me');
        expect(link === null || link === void 0 ? void 0 : link.textContent).toBe('https://alice.example/profile/card#me');
        currentUserSpy.mockRestore();
    });
    it('defaults layout to desktop', async () => {
        const footer = new Footer();
        document.body.appendChild(footer);
        await footer.updateComplete;
        expect(footer.layout).toBe('desktop');
        expect(footer.getAttribute('layout')).toBe('desktop');
    });
    it('applies mobile layout styles by removing border, box-shadow and border-radius', async () => {
        var _a, _b;
        const footer = new Footer();
        footer.layout = 'mobile';
        document.body.appendChild(footer);
        await footer.updateComplete;
        const style = (_b = (_a = footer.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('style')) === null || _b === void 0 ? void 0 : _b.textContent;
        expect(style).toContain(':host([layout=\'mobile\'])');
        expect(style).toContain('border: none;');
        expect(style).toContain('box-shadow: none;');
        expect(footer.getAttribute('layout')).toBe('mobile');
    });
});
//# sourceMappingURL=Footer.test.js.map