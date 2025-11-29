/**
 * Functions for rendering the ACL User Interface.
 * See https://github.com/solidos/userguide/blob/main/views/sharing/userguide.md#view
 * for a screenshot.
 * @packageDocumentation
 */
import ns from '../ns';
import * as utils from '../utils';
import { getACLorDefault, getProspectiveHolder } from './acl';
import { AccessController } from './access-controller';
import { style } from '../style';
import { log, warn } from '../debug';
let global = window;
const preventBrowserDropEventsDone = Symbol('prevent double triggering of drop event');
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
export function preventBrowserDropEvents(document) {
    log('preventBrowserDropEvents called.');
    if (typeof global !== 'undefined') {
        if (global[preventBrowserDropEventsDone])
            return;
        global[preventBrowserDropEventsDone] = true;
    }
    document.addEventListener('drop', handleDrop, false);
    document.addEventListener('dragenter', preventDrag, false);
    document.addEventListener('dragover', preventDrag, false);
}
/** @internal */
export function preventDrag(e) {
    e.stopPropagation();
    e.preventDefault();
}
/** @internal */
export function handleDrop(e) {
    if (e.dataTransfer.files.length > 0) {
        if (!global.confirm('Are you sure you want to drop this file here? (Cancel opens it in a new tab)')) {
            e.stopPropagation();
            e.preventDefault();
            log('@@@@ document-level DROP suppressed: ' + e.dataTransfer.dropEffect);
        }
    }
}
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
export function shortNameForFolder(x) {
    let str = x.uri;
    // Strip the trailing slash
    if (str.slice(-1) === '/') {
        str = str.slice(0, -1);
    }
    // Remove the path if present, keeping only the part
    // after the last slash.
    const slash = str.lastIndexOf('/');
    if (slash >= 0) {
        str = str.slice(slash + 1);
    }
    // Return the folder's filename, or '/' if nothing found
    // (but see https://github.com/solidos/solid-ui/issues/196
    // regarding whether this happens at the domain root or
    // not)
    return str || '/';
}
/**
 * A wrapper that retrieves ACL data and uses it
 * to render an [[AccessController]] component.
 * Presumably the '5' is a version number of some sort,
 * but all we know is it was already called ACLControlBox5
 * when it was introduced into solid-ui in
 * https://github.com/solidos/solid-ui/commit/948b874bd93e7bf5160e6e224821b888f07d15f3#diff-4192a29f38a0ababd563b36b47eba5bbR54
 */
export function ACLControlBox5(subject, context, noun, kb) {
    const dom = context.dom;
    const doc = subject.doc(); // The ACL is actually to the doc describing the thing
    const container = dom.createElement('div');
    container.setAttribute('style', style.aclControlBoxContainer);
    const header = container.appendChild(dom.createElement('h1'));
    header.textContent = `Sharing for ${noun} ${utils.label(subject)}`;
    header.setAttribute('style', style.aclControlBoxHeader);
    const status = container.appendChild(dom.createElement('div'));
    status.setAttribute('style', style.aclControlBoxStatus);
    try {
        loadController(doc, kb, subject, noun, context, dom, status)
            .then(controller => container.appendChild(controller.render()));
    }
    catch (error) {
        status.innerText = error;
    }
    return container;
}
async function loadController(doc, kb, subject, noun, context, dom, status) {
    return new Promise((resolve, reject) => getACLorDefault(doc, async (ok, isDirectACL, targetDoc, targetACLDoc, defaultHolder, defaultACLDoc) => {
        if (!ok) {
            return reject(new Error(`Error reading ${isDirectACL ? '' : ' default '}ACL. status ${targetDoc}: ${targetACLDoc}`));
        }
        const targetDirectory = getDirectory(targetDoc);
        const targetIsProtected = isStorage(targetDoc, targetACLDoc, kb) || hasProtectedAcl(targetDoc);
        if (!targetIsProtected && targetDirectory) {
            try {
                const prospectiveDefaultHolder = await getProspectiveHolder(targetDirectory);
                return resolve(getController(prospectiveDefaultHolder));
            }
            catch (error) {
                // No need to show this error in status, but good to warn about it in console
                warn(error);
            }
        }
        return resolve(getController());
        function getController(prospectiveDefaultHolder) {
            return new AccessController(subject, noun, context, status, targetIsProtected, targetDoc, targetACLDoc, defaultHolder, defaultACLDoc, prospectiveDefaultHolder, kb, dom);
        }
    }));
}
function getDirectory(doc) {
    const str = doc.uri.split('#')[0];
    const p = str.slice(0, -1).lastIndexOf('/');
    const q = str.indexOf('//');
    return (q >= 0 && p < q + 2) || p < 0 ? null : str.slice(0, p + 1);
}
function isStorage(doc, aclDoc, store) {
    // @@ TODO: The methods used for targetIsStorage are HACKs - it should not be relied upon, and work is
    // @@ underway to standardize a behavior that does not rely upon this hack
    // @@ hopefully fixed as part of https://github.com/solidos/data-interoperability-panel/issues/10
    return store.holds(doc, ns.rdf('type'), ns.space('Storage'), aclDoc);
}
function hasProtectedAcl(targetDoc) {
    // @@ TODO: This is hacky way of knowing whether or not a certain ACL file can be removed
    // Hopefully we'll find a better, standardized solution to this - https://github.com/solidos/specification/issues/37
    return targetDoc.uri === targetDoc.site().uri;
}
/** @internal */
export function setGlobalWindow(window) {
    global = window;
}
//# sourceMappingURL=acl-control.js.map