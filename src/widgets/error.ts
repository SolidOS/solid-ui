/**
 * Create an error message block
 * @param dom The DOM on which dom.createElement will be called
 * @param err The error message string to display
 * @param backgroundColor Background color. Default: '#fee'
 * @returns A div element with the err string
 */
/* eslint-disable no-console */

export function errorMessageBlock (dom: HTMLDocument, err: string | Error, backgroundColor?: string): HTMLDivElement {
  const div = dom.createElement('div')
  if (err instanceof Error) {
    console.error(`errorMessageBlock: Error ${err} at: ${err.stack || '??'}`, err) // @@ pick one
    div.textContent = err.message
  } else {
    div.textContent = err
  }
  div.setAttribute(
    'style',
    'margin: 0.1em; padding: 0.5em; border: 0.05em solid gray; background-color: ' +
      (backgroundColor || '#fee') +
      '; color:black;'
  )
  return div
}
