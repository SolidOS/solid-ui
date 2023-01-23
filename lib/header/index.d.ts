import { IndexedFormula, NamedNode } from 'rdflib';
export type MenuItemLink = {
    label: string;
    url: string;
    target?: string;
};
export type MenuItemButton = {
    label: string;
    onclick: () => void;
};
export type MenuItems = MenuItemLink | MenuItemButton;
export type HeaderOptions = {
    logo?: string;
    helpIcon?: string;
    helpMenuList?: MenuItems[];
};
/**
 * Initialize header component, the header object returned depends on whether the user is authenticated.
 * @param store the data store
 * @param userMenuList a list of menu items when the user is logged in
 * @param options allow the header to be customized with a personalized logo, help icon and a help menu list of links or buttons.
 * @returns a header for an authenticated user with menu items given or a login screen
 */
export declare function initHeader(store: IndexedFormula, userMenuList: MenuItems[], options?: HeaderOptions): Promise<void>;
/**
 * @ignore exporting this only for the unit test
 */
export declare function rebuildHeader(header: HTMLElement, store: IndexedFormula, pod: NamedNode, userMenuList: MenuItems[], options?: HeaderOptions): () => Promise<void>;
/**
 * @ignore exporting this only for the unit test
 */
export declare function createBanner(store: IndexedFormula, pod: NamedNode, user: NamedNode | null, userMenuList: MenuItems[], options?: HeaderOptions): Promise<HTMLElement>;
/**
 * @ignore exporting this only for the unit test
 */
export declare function createHelpMenu(options: HeaderOptions, helpMenuItems: MenuItems[]): HTMLDivElement | undefined;
/**
 * @ignore exporting this only for the unit test
 */
export declare function createLoginSignUpButtons(): HTMLDivElement;
/**
 * @ignore exporting this only for the unit test
 */
export declare function createUserMenuButton(label: string, onClick: EventListenerOrEventListenerObject): HTMLElement;
/**
 * @ignore exporting this only for the unit test
 */
export declare function createUserMenuLink(label: string, href: string, target?: string): HTMLElement;
/**
 * @ignore exporting this only for the unit test
 */
export declare function createUserMenu(store: IndexedFormula, user: NamedNode, userMenuList: MenuItems[]): Promise<HTMLElement>;
/**
 * @ignore exporting this only for the unit test
 */
export declare function createUserMenuItem(child: HTMLElement): HTMLElement;
/**
 * @ignore exporting this only for the unit test
 */
export declare function getProfileImg(store: IndexedFormula, user: NamedNode): string | HTMLElement;
//# sourceMappingURL=index.d.ts.map