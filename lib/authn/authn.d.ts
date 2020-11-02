/**
 * Signing in, signing up, profile and preferences reloading
 * Type index management
 *
 * Many functions in this module take a context object which
 * holds various RDF symbols, add to it, and return a promise of it.
 *
 * * `me`                RDF symbol for the user's WebID
 * * `publicProfile`     The user's public profile, iff loaded
 * * `preferencesFile`   The user's personal preference file, iff loaded
 * * `index.public`      The user's public type index file
 * * `index.private`     The user's private type index file
 *
 * Not RDF symbols:
 * * `noun`            A string in english for the type of thing -- like "address book"
 * * `instance`        An array of nodes which are existing instances
 * * `containers`      An array of nodes of containers of instances
 * * `div`             A DOM element where UI can be displayed
 * * `statusArea`      A DOM element (opt) progress stuff can be displayed, or error messages
 * @packageDocumentation
 */
import { NamedNode } from 'rdflib';
import solidAuthClient from 'solid-auth-client';
import { PaneDefinition } from 'pane-registry';
import { AppDetails, AuthenticationContext } from './types';
export { solidAuthClient };
/**
 * Look for and load the User who has control over it
 */
export declare function findOriginOwner(doc: NamedNode | string): string | boolean;
/**
 * Saves `webId` in `context.me`
 * @param webId
 * @param context
 *
 * @returns Returns the WebID, after setting it
 */
export declare function saveUser(webId: NamedNode | string | null, context?: AuthenticationContext): NamedNode | null;
/**
 * Wrapper around [[offlineTestID]]
 * @returns {NamedNode|null}
 */
export declare function defaultTestUser(): NamedNode | null;
/**
 * Checks synchronously whether user is logged in
 *
 * @returns Named Node or null
 */
export declare function currentUser(): NamedNode | null;
/**
 * Resolves with the logged in user's WebID
 *
 * @param context
 */
export declare function logIn(context: AuthenticationContext): Promise<AuthenticationContext>;
/**
 * Logs the user in and loads their WebID profile document into the store
 *
 * @param context
 *
 * @returns Resolves with the context after login / fetch
 */
export declare function logInLoadProfile(context: AuthenticationContext): Promise<AuthenticationContext>;
/**
 * Loads preference file
 * Do this after having done log in and load profile
 *
 * @private
 *
 * @param context
 */
export declare function logInLoadPreferences(context: AuthenticationContext): Promise<AuthenticationContext>;
/**
 * Resolves with the same context, outputting
 * output: index.public, index.private
 *
 * @see https://github.com/solid/solid/blob/master/proposals/data-discovery.md#discoverability
 */
export declare function loadTypeIndexes(context: AuthenticationContext): Promise<AuthenticationContext>;
/**
 * Returns promise of context with arrays of symbols
 *
 * 2016-12-11 change to include forClass arc a la
 * https://github.com/solid/solid/blob/master/proposals/data-discovery.md
 */
export declare function findAppInstances(context: AuthenticationContext, theClass: NamedNode, isPublic: boolean): Promise<AuthenticationContext>;
/**
 * Register a new app in a type index
 */
export declare function registerInTypeIndex(context: AuthenticationContext, instance: NamedNode, theClass: NamedNode, isPublic: boolean): Promise<AuthenticationContext>;
/**
 * UI to control registration of instance
 */
export declare function registrationControl(context: AuthenticationContext, instance: any, theClass: any): Promise<AuthenticationContext | void>;
/**
 * UI to List at all registered things
 */
export declare function registrationList(context: AuthenticationContext, options: {
    private?: boolean;
    public?: boolean;
    type?: NamedNode;
}): Promise<AuthenticationContext>;
/**
 * Simple Access Control
 *
 * This function sets up a simple default ACL for a resource, with
 * RWC for the owner, and a specified access (default none) for the public.
 * In all cases owner has read write control.
 * Parameter lists modes allowed to public
 *
 * @param options
 * @param options.public eg ['Read', 'Write']
 *
 * @returns Resolves with aclDoc uri on successful write
 */
export declare function setACLUserPublic(docURI: string, me: NamedNode, options: {
    defaultForNew?: boolean;
    public?: [];
}): Promise<NamedNode>;
/**
 * Returns `sym($SolidTestEnvironment.username)` if
 * `$SolidTestEnvironment.username` is defined as a global
 * @returns {NamedNode|null}
 */
export declare function offlineTestID(): NamedNode | null;
/**
 * @returns {Promise<string|null>} Resolves with WebID URI or null
 */
/**
 * Retrieves currently logged in webId from either
 * defaultTestUser or SolidAuthClient
 * @param [setUserCallback] Optional callback
 *
 * @returns Resolves with webId uri, if no callback provided
 */
export declare function checkUser<T>(setUserCallback?: (me: NamedNode | null) => T): Promise<NamedNode | T>;
/**
 * Login status box
 *
 * A big sign-up/sign in box or a logout box depending on the state
 *
 * @param dom
 * @param listener
 *
 * @returns
 */
export declare function loginStatusBox(dom: HTMLDocument, listener?: ((uri: string | null) => void) | null, options?: {
    buttonStyle?: string;
}): HTMLElement;
/**
 * Workspace selection etc
 * See https://github.com/solid/userguide/issues/16
 */
/**
 * Returns a UI object which, if it selects a workspace,
 * will callback(workspace, newBase).
 * See https://github.com/solid/userguide/issues/16 for more info on workspaces.
 *
 * If necessary, will get an account, preference file, etc. In sequence:
 *
 *   - If not logged in, log in.
 *   - Load preference file
 *   - Prompt user for workspaces
 *   - Allows the user to just type in a URI by hand
 *
 * Calls back with the workspace and the base URI
 *
 * @param dom
 * @param appDetails
 * @param callbackWS
 */
export declare function selectWorkspace(dom: HTMLDocument, appDetails: AppDetails, callbackWS: (workspace: string | null, newBase: string) => void): HTMLElement;
/**
 * Creates a new instance of an app.
 *
 * An instance of an app could be e.g. an issue tracker for a given project,
 * or a chess game, or calendar, or a health/fitness record for a person.
 *
 * Note that this use of the term 'app' refers more to entries in the user's
 * type index than to actual software applications that use the personal data
 * to which these entries point.
 *
 * @param dom
 * @param appDetails
 * @param callback
 *
 * @returns A div with a button in it for making a new app instance
 */
export declare function newAppInstance(dom: HTMLDocument, appDetails: AppDetails, callback: (workspace: string | null, newBase: string) => void): HTMLElement;
/**
 * Retrieves whether the currently logged in user is a power user
 * and/or a developer
 */
export declare function getUserRoles(): Promise<Array<NamedNode>>;
/**
 * Filters which panes should be available, based on the result of [[getUserRoles]]
 */
export declare function filterAvailablePanes(panes: Array<PaneDefinition>): Promise<Array<PaneDefinition>>;
//# sourceMappingURL=authn.d.ts.map