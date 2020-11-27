/**
 * Contains [[getClasses]] and [[getStylesheet]] functions,
 * usable as wrappers around JSS (A CSS authoring tool).
 * See https://cssinjs.org/
 * @packageDocumentation
 */

import { create, Jss, Styles, StyleSheet } from 'jss'
import preset from 'jss-preset-default'

const stylesheetsMap = new Map<HTMLElement, Jss>()

/**
 * returns a StyleSheet object.
 * See https://cssinjs.org/ for more info about JSS.
 * (despite the name, see https://github.com/solid/solid-ui/issues/199)
 */
export function getClasses (insertionPoint: HTMLElement, styles: Partial<Styles>): StyleSheet {
  const stylesheet = getStylesheet(insertionPoint)
  return stylesheet.createStyleSheet(styles).attach()
}

/**
 * returns a JSS object.
 * See https://cssinjs.org/ for more info about JSS.
 * (despite the name, see https://github.com/solid/solid-ui/issues/199)
 */
export function getStylesheet (insertionPoint: HTMLElement): Jss {
  const cachedStylesheet = stylesheetsMap.get(insertionPoint)
  if (cachedStylesheet) {
    return cachedStylesheet
  }
  const stylesheet = create({
    insertionPoint,
    plugins: preset().plugins
  })
  stylesheetsMap.set(insertionPoint, stylesheet)
  return stylesheet
}
