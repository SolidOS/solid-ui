export const wrapDivInATR = (dom: HTMLDocument, div: HTMLDivElement, obj: any) => {
  const tr = dom.createElement('tr')
  const td = tr.appendChild(dom.createElement('td'))
  td.appendChild(div)
  ;(tr as any).subject = obj
  return tr
}
// need to check that it adds to the div and doesnt need to be returned
export const addEventListenerToElement = (div: HTMLDivElement, onClickFunction: () => void) => {
  div.addEventListener('click', onClickFunction)
}

export const createLinkForURI = (dom: HTMLDocument, linkDiv: HTMLDivElement, linkIcon) => {
  const anchor = linkDiv.appendChild(linkIcon)
  anchor.classList.add('HoverControlHide')
  linkDiv.appendChild(dom.createElement('br'))
}
