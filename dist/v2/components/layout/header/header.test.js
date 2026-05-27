import { Header } from './Header';
import './index';
describe('SolidUIHeaderElement', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        Object.defineProperty(window, 'open', {
            configurable: true,
            writable: true,
            value: jest.fn()
        });
    });
    it('is defined as a custom element', () => {
        const defined = customElements.get('solid-ui-header');
        expect(defined).toBe(Header);
    });
    it('renders a header with logo and menu slots', async () => {
        const header = new Header();
        header.setAttribute('logo', 'https://example.com/logo.png');
        header.setAttribute('help-icon', 'https://example.com/help.png');
        header.setAttribute('brand-link', '/home');
        header.authState = 'logged-out';
        header.helpMenuList = [{ label: 'Help', action: 'open-help' }];
        header.innerHTML = '<button slot="help-menu" id="helpBtn">Help</button>';
        document.body.appendChild(header);
        await header.updateComplete;
        const shadow = header.shadowRoot;
        expect(shadow).not.toBeNull();
        const brandImg = shadow === null || shadow === void 0 ? void 0 : shadow.getElementById('brandImg');
        const helpIcon = shadow === null || shadow === void 0 ? void 0 : shadow.getElementById('helpIcon');
        const brandLink = shadow === null || shadow === void 0 ? void 0 : shadow.getElementById('brandLink');
        expect(brandImg === null || brandImg === void 0 ? void 0 : brandImg.src).toContain('https://example.com/logo.png');
        expect(helpIcon === null || helpIcon === void 0 ? void 0 : helpIcon.src).toContain('https://example.com/help.png');
        expect(brandLink === null || brandLink === void 0 ? void 0 : brandLink.href).toContain('/home');
        expect(shadow === null || shadow === void 0 ? void 0 : shadow.querySelector('solid-ui-login-button')).not.toBeNull();
        expect(shadow === null || shadow === void 0 ? void 0 : shadow.querySelector('solid-ui-signup-button')).not.toBeNull();
        const helpMenuSlot = shadow === null || shadow === void 0 ? void 0 : shadow.querySelector('slot[name="help-menu"]');
        expect(helpMenuSlot).not.toBeNull();
        expect(header.querySelector('#helpBtn')).not.toBeNull();
    });
    it('renders login and sign up actions when logged out', async () => {
        const header = new Header();
        const authActionSelected = jest.fn();
        header.authState = 'logged-out';
        header.loginAction = { label: 'Log in', action: 'login', icon: 'https://example.com/login-icon.svg' };
        header.signUpAction = { label: 'Sign Up', url: '/signup', icon: 'https://example.com/signup-icon.svg' };
        header.loginIcon = 'https://example.com/login-icon-top.svg';
        header.signUpIcon = 'https://example.com/signup-icon-top.svg';
        header.addEventListener('auth-action-select', (event) => {
            authActionSelected(event.detail);
        });
        document.body.appendChild(header);
        await header.updateComplete;
        const shadow = header.shadowRoot;
        const loginButton = shadow === null || shadow === void 0 ? void 0 : shadow.querySelector('solid-ui-login-button');
        const signUpLink = shadow === null || shadow === void 0 ? void 0 : shadow.querySelector('solid-ui-signup-button');
        expect(loginButton).not.toBeNull();
        expect(signUpLink).not.toBeNull();
        expect(loginButton.getAttribute('label')).toBe('Log in');
        expect(loginButton.getAttribute('icon')).toBe('https://example.com/login-icon-top.svg');
        expect(signUpLink.getAttribute('label')).toBe('Sign Up');
        expect(signUpLink.getAttribute('signup-url')).toBe('/signup');
        expect(signUpLink.getAttribute('icon')).toBe('https://example.com/signup-icon-top.svg');
        loginButton.dispatchEvent(new CustomEvent('login-success', { bubbles: true, composed: true }));
        expect(authActionSelected).toHaveBeenCalledWith({
            role: 'login'
        });
    });
    it('does not show login or signup icons on mobile layout', async () => {
        var _a, _b;
        const header = new Header();
        header.authState = 'logged-out';
        header.layout = 'mobile';
        header.loginAction = { label: 'Log in', action: 'login', icon: 'https://example.com/login-icon.svg' };
        header.signUpAction = { label: 'Sign Up', url: '/signup', icon: 'https://example.com/signup-icon.svg' };
        header.loginIcon = 'https://example.com/login-icon-top.svg';
        header.signUpIcon = 'https://example.com/signup-icon-top.svg';
        document.body.appendChild(header);
        await header.updateComplete;
        const shadow = header.shadowRoot;
        const loginButton = shadow === null || shadow === void 0 ? void 0 : shadow.querySelector('solid-ui-login-button');
        const signUpButton = shadow === null || shadow === void 0 ? void 0 : shadow.querySelector('solid-ui-signup-button');
        expect((_a = loginButton === null || loginButton === void 0 ? void 0 : loginButton.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.login-button-icon')).toBeNull();
        expect((_b = signUpButton === null || signUpButton === void 0 ? void 0 : signUpButton.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('.signup-button-icon')).toBeNull();
    });
    it('uses a custom fallback avatar when no accountAvatar is configured', async () => {
        const header = new Header();
        header.authState = 'logged-in';
        header.accountAvatar = '';
        header.accountAvatarFallback = 'https://example.com/fallback-avatar.png';
        document.body.appendChild(header);
        await header.updateComplete;
        const shadow = header.shadowRoot;
        const avatarImg = shadow === null || shadow === void 0 ? void 0 : shadow.querySelector('.account-avatar img');
        expect(avatarImg).not.toBeNull();
        expect(avatarImg.src).toContain('https://example.com/fallback-avatar.png');
    });
    it('renders an accounts dropdown with avatar when logged in', async () => {
        var _a, _b, _c, _d;
        const header = new Header();
        const accountMenuSelected = jest.fn();
        header.authState = 'logged-in';
        header.accountIcon = 'https://example.com/account-icon.svg';
        header.accountAvatar = 'https://example.com/avatar.png';
        header.logoutIcon = 'https://example.com/logout-icon.svg';
        header.accountMenu = [
            { label: 'Personal Pod', webid: 'https://pod.example/profile/card#me', action: 'switch-personal' },
            { label: 'Work Pod', webid: 'https://work.example/profile/card#me', url: '/work' }
        ];
        header.addEventListener('account-menu-select', (event) => {
            accountMenuSelected(event.detail);
        });
        document.body.appendChild(header);
        await header.updateComplete;
        const shadow = header.shadowRoot;
        const trigger = shadow === null || shadow === void 0 ? void 0 : shadow.getElementById('accountMenuTrigger');
        expect(trigger).not.toBeNull();
        expect((_a = trigger.querySelector('img.account-menu-trigger-icon')) === null || _a === void 0 ? void 0 : _a.src).toContain('https://example.com/account-icon.svg');
        expect((_b = shadow === null || shadow === void 0 ? void 0 : shadow.querySelector('.account-avatar img')) === null || _b === void 0 ? void 0 : _b.src).toContain('https://example.com/avatar.png');
        trigger.click();
        await header.updateComplete;
        const dropdown = shadow === null || shadow === void 0 ? void 0 : shadow.getElementById('accountMenu');
        const accountButtons = shadow === null || shadow === void 0 ? void 0 : shadow.querySelectorAll('.account-menu-item-button');
        const firstItem = accountButtons[0];
        const lastItem = accountButtons[accountButtons.length - 1];
        expect(dropdown.hidden).toBe(false);
        expect(firstItem.textContent).toContain('Personal Pod');
        expect(lastItem.textContent).toContain('Log Out');
        expect((_c = lastItem.querySelector('img.logout-action-icon')) === null || _c === void 0 ? void 0 : _c.src).toContain('https://example.com/logout-icon.svg');
        firstItem.click();
        expect(accountMenuSelected).toHaveBeenCalledWith({
            label: 'Personal Pod',
            webid: 'https://pod.example/profile/card#me',
            action: 'switch-personal'
        });
        expect((_d = lastItem.textContent) === null || _d === void 0 ? void 0 : _d.trim()).toBe('Log Out');
    });
    it('does not render the logout icon on mobile layout', async () => {
        var _a;
        const header = new Header();
        header.layout = 'mobile';
        header.authState = 'logged-in';
        header.logoutIcon = 'https://example.com/logout-icon.svg';
        header.logoutLabel = 'Log Out';
        document.body.appendChild(header);
        await header.updateComplete;
        const shadow = header.shadowRoot;
        const trigger = shadow === null || shadow === void 0 ? void 0 : shadow.getElementById('accountMenuTrigger');
        expect(trigger).not.toBeNull();
        trigger.click();
        await header.updateComplete;
        const lastItem = shadow === null || shadow === void 0 ? void 0 : shadow.querySelectorAll('.account-menu-item-button')[0];
        expect(lastItem).not.toBeNull();
        expect(lastItem.querySelector('img.logout-action-icon')).toBeNull();
        expect((_a = lastItem.textContent) === null || _a === void 0 ? void 0 : _a.trim()).toBe('Log Out');
    });
    it('does not render account webid on mobile layout', async () => {
        var _a;
        const header = new Header();
        header.layout = 'mobile';
        header.authState = 'logged-in';
        header.accountMenu = [
            { label: 'Personal Pod', webid: 'https://pod.example/profile/card#me', action: 'switch-personal' }
        ];
        document.body.appendChild(header);
        await header.updateComplete;
        const shadow = header.shadowRoot;
        const trigger = shadow === null || shadow === void 0 ? void 0 : shadow.getElementById('accountMenuTrigger');
        expect(trigger).not.toBeNull();
        trigger.click();
        await header.updateComplete;
        const firstItem = shadow === null || shadow === void 0 ? void 0 : shadow.querySelector('.account-menu-item-button');
        expect(firstItem).not.toBeNull();
        expect(firstItem.querySelector('.account-menu-webid')).toBeNull();
        expect((_a = firstItem.textContent) === null || _a === void 0 ? void 0 : _a.trim()).toBe('Personal Pod');
    });
    it('supports theme and layout attributes', async () => {
        var _a;
        const header = new Header();
        header.setAttribute('theme', 'dark');
        header.setAttribute('layout', 'mobile');
        document.body.appendChild(header);
        await header.updateComplete;
        expect(header.getAttribute('theme')).toBe('dark');
        expect(header.getAttribute('layout')).toBe('mobile');
        const shadow = header.shadowRoot;
        expect(shadow === null || shadow === void 0 ? void 0 : shadow.querySelector('.headerInner')).not.toBeNull();
        expect((_a = shadow === null || shadow === void 0 ? void 0 : shadow.getElementById('brandLink')) === null || _a === void 0 ? void 0 : _a.classList.contains('brand-not-displayed')).toBe(true);
        expect(header.getAttribute('theme')).toBe('dark');
        expect(header.getAttribute('layout')).toBe('mobile');
    });
    it('toggles the brand link visibility class by layout', async () => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const header = new Header();
        header.setAttribute('brand-link', '/home');
        document.body.appendChild(header);
        await header.updateComplete;
        expect(header.layout).toBe('desktop');
        expect((_a = header.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('brandLink')).not.toBeNull();
        expect((_c = (_b = header.shadowRoot) === null || _b === void 0 ? void 0 : _b.getElementById('brandLink')) === null || _c === void 0 ? void 0 : _c.classList.contains('brand-not-displayed')).toBe(false);
        header.layout = 'mobile';
        await header.updateComplete;
        expect(header.layout).toBe('mobile');
        expect((_d = header.shadowRoot) === null || _d === void 0 ? void 0 : _d.getElementById('brandLink')).not.toBeNull();
        expect((_f = (_e = header.shadowRoot) === null || _e === void 0 ? void 0 : _e.getElementById('brandLink')) === null || _f === void 0 ? void 0 : _f.classList.contains('brand-not-displayed')).toBe(true);
        header.layout = 'desktop';
        await header.updateComplete;
        expect(header.layout).toBe('desktop');
        expect((_g = header.shadowRoot) === null || _g === void 0 ? void 0 : _g.getElementById('brandLink')).not.toBeNull();
        expect((_j = (_h = header.shadowRoot) === null || _h === void 0 ? void 0 : _h.getElementById('brandLink')) === null || _j === void 0 ? void 0 : _j.classList.contains('brand-not-displayed')).toBe(false);
    });
    it('renders helpMenuList inside the help dropdown and dispatches events', async () => {
        var _a, _b;
        const header = new Header();
        const helpMenuClicked = jest.fn();
        header.authState = 'logged-in';
        header.helpIcon = '';
        header.helpMenuList = [{ label: 'Docs', url: 'https://example.com/docs', target: '_blank' }];
        header.addEventListener('help-menu-select', (event) => {
            helpMenuClicked(event.detail);
        });
        document.body.appendChild(header);
        await header.updateComplete;
        const shadow = header.shadowRoot;
        const helpTrigger = shadow === null || shadow === void 0 ? void 0 : shadow.getElementById('helpMenuTrigger');
        expect(helpTrigger === null || helpTrigger === void 0 ? void 0 : helpTrigger.disabled).toBe(false);
        expect((_a = helpTrigger === null || helpTrigger === void 0 ? void 0 : helpTrigger.textContent) === null || _a === void 0 ? void 0 : _a.trim()).toBe('Help');
        helpTrigger === null || helpTrigger === void 0 ? void 0 : helpTrigger.click();
        await header.updateComplete;
        const helpMenu = shadow === null || shadow === void 0 ? void 0 : shadow.getElementById('helpMenu');
        const helpLink = shadow === null || shadow === void 0 ? void 0 : shadow.querySelector('a[part="help-menu-item"]');
        expect(helpMenu === null || helpMenu === void 0 ? void 0 : helpMenu.hidden).toBe(false);
        expect((_b = helpLink === null || helpLink === void 0 ? void 0 : helpLink.textContent) === null || _b === void 0 ? void 0 : _b.trim()).toBe('Docs');
        const originalWindowOpen = window.open;
        window.open = jest.fn();
        expect(helpLink === null || helpLink === void 0 ? void 0 : helpLink.getAttribute('rel')).toBe('noopener noreferrer');
        helpLink === null || helpLink === void 0 ? void 0 : helpLink.click();
        expect(helpMenuClicked).toHaveBeenCalledWith({ label: 'Docs', url: 'https://example.com/docs', target: '_blank' });
        expect(window.open).toHaveBeenCalledWith('https://example.com/docs', '_blank', 'noopener,noreferrer');
        window.open = originalWindowOpen;
    });
});
//# sourceMappingURL=header.test.js.map