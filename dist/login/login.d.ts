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
 * *
 * * Vocabulary:  "load" loads a file if it exists;
 * *  'Ensure" CREATES the file if it does not exist (if it can) and then loads it.
 * @packageDocumentation
 */
import { PaneDefinition } from 'pane-registry';
import { NamedNode } from 'rdflib';
import { AppDetails, AuthenticationContext } from 'solid-logic';
/**
 * Resolves with the logged in user's WebID
 *
 * @param context
 */
export declare function ensureLoggedIn(context: AuthenticationContext): Promise<AuthenticationContext>;
/**
 * Loads preference file
 * Do this after having done log in and load profile
 *
 * @private
 *
 * @param context
 */
export declare function ensureLoadedPreferences(context: AuthenticationContext): Promise<AuthenticationContext>;
/**
 * Logs the user in and loads their WebID profile document into the store
 *
 * @param context
 *
 * @returns Resolves with the context after login / fetch
 */
export declare function ensureLoadedProfile(context: AuthenticationContext): Promise<AuthenticationContext>;
/**
  * Returns promise of context with arrays of symbols
  *
  * leaving the `isPublic` param undefined will bring in community index things, too
  */
export declare function findAppInstances(context: AuthenticationContext, theClass: NamedNode, isPublic?: boolean): Promise<AuthenticationContext>;
export declare function scopeLabel(context: any, scope: any): string;
/**
 * UI to control registration of instance
 */
export declare function registrationControl(context: AuthenticationContext, instance: any, theClass: any): Promise<AuthenticationContext | void>;
export declare function renderScopeHeadingRow(context: any, store: any, scope: any): any;
/**
  * UI to List at all registered things
  */
export declare function registrationList(context: AuthenticationContext, options: {
    private?: boolean;
    public?: boolean;
    type?: NamedNode;
}): Promise<AuthenticationContext>;
export declare function renderSignInPopup(dom: HTMLDocument): void;
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
 * See https://github.com/solidos/userguide/issues/16
 */
/**
 * Returns a UI object which, if it selects a workspace,
 * will callback(workspace, newBase).
 * See https://github.com/solidos/userguide/issues/16 for more info on workspaces.
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
//# sourceMappingURL=login.d.ts.map