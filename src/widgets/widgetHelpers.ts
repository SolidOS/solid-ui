import {
  imageDivStyle
} from '../style'
export const wrapDivInATR = (dom: HTMLDocument, div: HTMLDivElement, obj: any) => {
  const tr = dom.createElement('tr')
  const td = tr.appendChild(dom.createElement('td'))
  td.appendChild(div)
  ;(tr as any).subject = obj
  return tr
}
// need to check that it adds to the div and doesnt need to be returned
export const addClickListenerToElement = (div: HTMLDivElement, onClickFunction: () => void) => {
  div.addEventListener('click', onClickFunction)
}

export const createLinkForURI = (dom: HTMLDocument, linkDiv: HTMLDivElement, linkIcon) => {
  const anchor = linkDiv.appendChild(linkIcon)
  anchor.classList.add('HoverControlHide')
  linkDiv.appendChild(dom.createElement('br'))
}

export const createImageDiv = (dom: HTMLDocument, div: HTMLDivElement, image: HTMLImageElement | HTMLObjectElement) => {
  const imageDiv = div.appendChild(dom.createElement('div'))

  imageDiv.setAttribute('style', imageDivStyle)
  imageDiv.appendChild(image)
  image.setAttribute('draggable', 'false') // Stop the image being dragged instead - just the TR
}
