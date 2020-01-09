import { create, Jss, Styles, StyleSheet } from 'jss'
import preset from 'jss-preset-default'

const stylesheetsMap = new Map<HTMLElement, Jss>()

export function getClasses (insertionPoint: HTMLElement, styles: Partial<Styles>): StyleSheet {
  const stylesheet = getStylesheet(insertionPoint)
  return stylesheet.createStyleSheet(styles).attach()
}

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
