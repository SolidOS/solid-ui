import {
  imageDivStyle
} from '../style'

/**
 * Wraps a Div in a TR/RD
 *
 * Takes a div and wraps it in a TR/TD to be backwards compatible to the
 * table structure of mashlib
 *
 * @param dom The HTML Document object aka Document Object Model
 * @param div the created widget will be appended to this
 * @param obj not sure what this is used for exactly
 *
 * @returns The HTML widget created
 *
 * @internal exporting this only for unit tests
 */
// eslint-disable-next-line complexity
export const wrapDivInATR = (dom: HTMLDocument, div: HTMLDivElement, obj: any) => {
  const tr = dom.createElement('tr')
  const td = tr.appendChild(dom.createElement('td'))
  td.appendChild(div)
  ;(tr as any).subject = obj
  return tr
}

/**
 * Adds a click listener to a div
 *
 * Adds a given function as a click listener on the given div
 *
 * @param dom The HTML Document object aka Document Object Model
 * @param onClickFunction the click function to add to the click listener
 *
 * @returns The HTML widget created
 *
 * @internal exporting this only for unit tests
 */
// eslint-disable-next-line complexity
export const addClickListenerToElement = (div: HTMLDivElement, onClickFunction: () => void) => {
  div.addEventListener('click', onClickFunction)
}

/**
 * Wraps a Div in a TR/RD
 *
 * Takes a div and wraps it in a TR/TD to be backwards compatible to the
 * table structure of mashlib
 *
 * @param dom The HTML Document object aka Document Object Model
 * @param linkDiv the created widget will be appended to this
 * @param linkIcon not sure what this is used for exactly
 *
 * @returns The HTML widget created
 *
 * @internal exporting this only for unit tests
 */
// eslint-disable-next-line complexity
export const createLinkForURI = (dom: HTMLDocument, linkDiv: HTMLDivElement, linkIcon: HTMLAnchorElement) => {
  const anchor = linkDiv.appendChild(linkIcon)
  anchor.classList.add('HoverControlHide')
  linkDiv.appendChild(dom.createElement('br'))
}
/**
 * Wraps a Div in a TR/RD
 *
 * Takes a div and wraps it in a TR/TD to be backwards compatible to the
 * table structure of mashlib
 *
 * @param dom The HTML Document object aka Document Object Model
 * @param div the created widget will be appended to this
 * @param obj not sure what this is used for exactly
 *
 * @returns The HTML widget created
 *
 * @internal exporting this only for unit tests
 */
// eslint-disable-next-line complexity
export const createImageDiv = (dom: HTMLDocument, div: HTMLDivElement, image: HTMLImageElement | HTMLObjectElement) => {
  const imageDiv = div.appendChild(dom.createElement('div'))

  imageDiv.setAttribute('style', imageDivStyle)
  imageDiv.appendChild(image)
  image.setAttribute('draggable', 'false') // Stop the image being dragged instead - just the TR
}
