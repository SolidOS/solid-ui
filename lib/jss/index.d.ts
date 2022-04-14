/**
 * Contains [[getClasses]] and [[getStylesheet]] functions,
 * usable as wrappers around JSS (A CSS authoring tool).
 * See https://cssinjs.org/
 * @packageDocumentation
 */
import { Jss, Styles, StyleSheet } from 'jss';
/**
 * returns a StyleSheet object.
 * See https://cssinjs.org/ for more info about JSS.
 * (despite the name, see https://github.com/solidos/solid-ui/issues/199)
 */
export declare function getClasses(insertionPoint: HTMLElement, styles: Partial<Styles>): StyleSheet;
/**
 * returns a JSS object.
 * See https://cssinjs.org/ for more info about JSS.
 * (despite the name, see https://github.com/solidos/solid-ui/issues/199)
 */
export declare function getStylesheet(insertionPoint: HTMLElement): Jss;
//# sourceMappingURL=index.d.ts.map