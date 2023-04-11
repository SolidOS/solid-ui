/**
 * Non-UI functions for access control.
 * See https://github.com/solidos/web-access-control-spec
 * for the spec that defines how ACL documents work.
 * @packageDocumentation
 */
import { AgentMapMap, AgentMapUnion, ComboList } from './types';
import { Store, NamedNode, LiveStore } from 'rdflib';
/**
 * Take the "default" ACL and convert it into the equivalent ACL
 * which the resource would have had. Return it as a new separate store.
 * The "defaultForNew" predicate is also accepted, as a deprecated
 * synonym for "default".
 */
export declare function adoptACLDefault(doc: NamedNode, aclDoc: NamedNode, defaultResource: NamedNode, defaultACLDoc: NamedNode): Store;
/**
 * Read and canonicalize the ACL for x in aclDoc
 *
 * Accumulate the access rights which each agent or class has
 */
export declare function readACL(doc: NamedNode, aclDoc: NamedNode, kb2?: Store, getDefaults?: boolean): AgentMapMap;
/**
 * Compare two ACLs
 */
export declare function sameACL(a: AgentMapMap | AgentMapUnion, b: AgentMapMap | AgentMapUnion): boolean;
/**
 * Union N ACLs
 */
export declare function ACLunion(list: Array<AgentMapMap | AgentMapUnion>): AgentMapUnion;
type loadUnionACLCallback = (ok: boolean, message?: string | NamedNode | AgentMapUnion | AgentMapMap) => void;
/**
 * Merge ACLs lists from things to form union
 */
export declare function loadUnionACL(subjectList: Array<NamedNode>, callbackFunction: loadUnionACLCallback): void;
/**
 * Represents these as an RDF graph by combination of modes
 *
 * Each agent can only be in one place in this model, one combination of modes.
 * Combos are like full control, read append, read only etc.
 */
export declare function ACLbyCombination(ac: AgentMapMap | AgentMapUnion): ComboList;
/**
 * Write ACL graph to store from AC
 */
export declare function makeACLGraph(kb: Store, x: NamedNode, ac: AgentMapMap, aclDoc: NamedNode): void;
/**
 * Write ACL graph to store from combo
 */
export declare function makeACLGraphbyCombo(kb: Store, x: NamedNode, byCombo: ComboList, aclDoc: NamedNode, main?: boolean, defa?: boolean): void;
/**
 * Debugging short strings for dumping ACL
 * and possibly in the UI
 */
export declare function ACLToString(ac: AgentMapMap): string;
/**
 * Convert a [[ComboList]] to a string
 */
export declare function comboToString(byCombo: ComboList): string;
/**
 * Write ACL graph as Turtle
 */
export declare function makeACLString(x: NamedNode, ac: AgentMapMap, aclDoc: NamedNode): string;
/**
 * Write ACL graph to web
 */
export declare function putACLObject(kb: LiveStore, x: NamedNode, ac: AgentMapMap | AgentMapUnion, aclDoc: NamedNode, callbackFunction: (ok: boolean, message?: string) => void): void;
/**
 * Write ACL graph to web from a [[ComboList]]
 */
export declare function putACLbyCombo(kb: LiveStore, x: NamedNode, byCombo: ComboList, aclDoc: NamedNode, callbackFunction: (ok: boolean, message?: string) => void): void;
type fixIndividualCardACLCallback = (ok: boolean, message?: string | NamedNode | AgentMapUnion | AgentMapMap) => void;
type fixIndividualACLCallback = (ok: boolean, message?: string | NamedNode | AgentMapUnion | AgentMapMap) => void;
/**
 * Fix the ACl for an individual card as a function of the groups it is in
 *
 * All group files must be loaded first
 */
export declare function fixIndividualCardACL(person: NamedNode, log: Function, callbackFunction: fixIndividualCardACLCallback): void;
/**
 * This function is used by [[fixIndividualCardACL]]
 */
export declare function fixIndividualACL(item: NamedNode, subjects: Array<NamedNode>, log: Function, callbackFunction: fixIndividualACLCallback): void;
/**
 * Set an ACL
 */
export declare function setACL(docURI: NamedNode, aclText: string, callbackFunction: (ok: boolean, message: string) => void): void;
/**
 * Get ACL file or default if necessary
 *
 * @param callbackFunction  Will be called in the following ways, in the following cases:
 * * `callbackFunction(true, true, doc, aclDoc)` if the ACL did exist
 * * `callbackFunction(true, false, doc, aclDoc, defaultHolder, defaultACLDoc)` if the ACL file did not exist but a default did
 * * `callbackFunction(false, false, status, message)` when there was an error getting the original
 * * `callbackFunction(false, true, status, message)` when there was an error getting the default
 */
export declare function getACLorDefault(doc: NamedNode, callbackFunction: (a: boolean, b: boolean, statusOrMessage: number | NamedNode, message: string | NamedNode, c?: NamedNode, d?: NamedNode) => void): void;
/**
 * Calls back `(ok, status, acldoc, message)` as follows
 *
 * * `(false, 900, errormessage)` if no link header
 * * `(true, 403, documentSymbol, fileaccesserror)` if not authorized
 * * `(true, 404, documentSymbol, fileaccesserror)` if does not exist
 * * `(true, 200, documentSymbol)` if file exists and read OK
 */
export declare function getACL(doc: NamedNode, callbackFunction: (ok: boolean, messageOrStatus: number | string, messageOrDoc?: NamedNode | string, message?: string) => void): void;
/**
 * Calls [[getACLorDefault]] and then (?)
 */
export declare function getProspectiveHolder(targetDirectory: string): Promise<NamedNode | undefined>;
export {};
//# sourceMappingURL=acl.d.ts.map