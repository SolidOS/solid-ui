/**
 * Create an error message block
 * @param dom The DOM on which dom.createElement will be called
 * @param err The error message string to display (or an error object)
 * @param backgroundColor Background color. Default: '#fee'
 * @param err2 Is the second param is a string, you can put the original Error in here
 * @returns A div element with the err string
 *
 * This will return a DOM element you can put in the UI as a notice for the user
 *  Meanwhile the stack is dumped to the console for the developer, so you actually know
 *  where it happened!
 */
/* eslint-disable no-console */

export function errorMessageBlock (dom: HTMLDocument, err: string | Error, backgroundColor?: string, err2?: Error): HTMLDivElement {
  const div = dom.createElement('div')

  /* tslint:disable-next-line */ // Too complex for TS?
  // @ts-ignore
  const errorObject:Error = err2 || err instanceof Error ? err : null

  if (errorObject) {
    console.error(`errorMessageBlock: ${errorObject} at: ${errorObject.stack || '??'}`, errorObject) // @@ pick one
    div.textContent = errorObject.message
  } else {
    div.textContent = err as string
  }
  div.setAttribute(
    'style',
    'margin: 0.1em; padding: 0.5em; border: 0.05em solid gray; background-color: ' +
      (backgroundColor || '#fee') +
      '; color:black;'
  )
  return div
}
