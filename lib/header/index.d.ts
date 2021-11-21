import { IndexedFormula, NamedNode } from 'rdflib';
export declare type MenuItemLink = {
    label: string;
    url: string;
};
export declare type MenuItemButton = {
    label: string;
    onclick: () => {};
};
export declare type MenuItems = MenuItemLink | MenuItemButton;
export declare type HeaderOptions = {
    logo?: string;
    menuList?: MenuItems[];
};
/**
 * Initialize header component, the header object returned depends on whether the user is authenticated.
 * @param store the data store
 * @param options allow the header to be customized with a personalized logo and a menu list of links or buttons.
 * @returns a header for an authenticated user with menu items given or a login screen
 */
export declare function initHeader(store: IndexedFormula, options?: HeaderOptions): Promise<void>;
/**
 * @ignore exporting this only for the unit test
 */
export declare function rebuildHeader(header: HTMLElement, store: IndexedFormula, pod: NamedNode, options?: HeaderOptions): () => Promise<void>;
/**
 * @ignore exporting this only for the unit test
 */
export declare function createBanner(store: IndexedFormula, pod: NamedNode, user: NamedNode | null, options?: HeaderOptions): Promise<HTMLElement>;
/**
 * @ignore exporting this only for the unit test
 */
export declare function createHelpMenu(): HTMLDivElement;
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
export declare function createUserMenu(store: IndexedFormula, user: NamedNode, options?: HeaderOptions): Promise<HTMLElement>;
/**
 * @ignore exporting this only for the unit test
 */
export declare function createUserMenuItem(child: HTMLElement): HTMLElement;
/**
 * @ignore exporting this only for the unit test
 */
export declare function getProfileImg(store: IndexedFormula, user: NamedNode): string | HTMLElement;
//# sourceMappingURL=index.d.ts.map