/**
 * Functions for rendering the ACL User Interface.
 * See https://github.com/solidos/userguide/blob/main/views/sharing/userguide.md#view
 * for a screenshot.
 * @packageDocumentation
 */
import { Store, NamedNode } from 'rdflib';
import { DataBrowserContext } from 'pane-registry';
/**
 * See https://coshx.com/preventing-drag-and-drop-disasters-with-a-chrome-userscript
 * Without this dropping anything onto a browser page will cause chrome etc to jump to diff page
 * throwing away all the user's work.
 *
 * In apps which may use drag and drop, this utility takes care of the fact
 * by default in a browser, an uncaught user drop into a browser window
 * causes the browser to lose all its work in that window and navigate to another page
 *
 * @param document  The DOM
 * @returns void
 */
export declare function preventBrowserDropEvents(document: HTMLDocument): void;
/** @internal */
export declare function preventDrag(e: any): void;
/** @internal */
export declare function handleDrop(e: any): void;
/**
 * Get a folder's own filename in the directory tree. Also works for
 * domain names; the URL protocol ('https://') acts as the tree root
 * with short name '/' (see also test/unit/acl/acl-control.test.ts).
 *
 * ```typescript
 * shortNameForFolder($rdf.namedNode('http://example.com/some/folder/'))
 * // 'folder'
 *
 * shortNameForFolder($rdf.namedNode('http://example.com/some/folder'))
 * // 'folder'
 *
 * shortNameForFolder($rdf.namedNode('http://example.com/'))
 * // 'example.com'
 *
 * shortNameForFolder($rdf.namedNode('http://example.com'))
 * // 'example.com'
 *
 * shortNameForFolder($rdf.namedNode('http://'))
 * // '/'
 * ```
 *
 * It also works with relative URLs:
 * ```typescript
 * shortNameForFolder($rdf.namedNode('../folder/'))
 * // 'folder'
 * ```
 *
 * @param x  RDF Node for the folder URL
 * @returns  Short name for the folder
 */
export declare function shortNameForFolder(x: NamedNode): string;
/**
 * A wrapper that retrieves ACL data and uses it
 * to render an [[AccessController]] component.
 * Presumably the '5' is a version number of some sort,
 * but all we know is it was already called ACLControlBox5
 * when it was introduced into solid-ui in
 * https://github.com/solidos/solid-ui/commit/948b874bd93e7bf5160e6e224821b888f07d15f3#diff-4192a29f38a0ababd563b36b47eba5bbR54
 */
export declare function ACLControlBox5(subject: NamedNode, context: DataBrowserContext, noun: string, kb: Store): HTMLElement;
/** @internal */
export declare function setGlobalWindow(window: Window): void;
//# sourceMappingURL=acl-control.d.ts.map