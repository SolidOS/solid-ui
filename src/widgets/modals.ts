import {
  ModalWidgetStyleOptions,
  getModalStyle
} from './modalsStyle'
import { style } from '../style'

export type ListItem = {
  label: string,
  link: string
}

// Two functions that need to be implemented to use the modal
// When the user clicks the button, open the modal
/* Click handler on the button to display it.
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
Window click handler so that the modal will close
even if the user doesn't click close
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  } */
const closeClickHandler = (modal: HTMLDivElement) => {
  modal.style.display = 'none'
}

const createModal = (dom: HTMLDocument, options: ModalWidgetStyleOptions) => {
  const modal = dom.createElement('div')
  modal.classList.add('modal')
  modal.setAttribute('style', getModalStyle(options))
  return modal
}

const createModalContent = (dom: HTMLDocument) => {
  const modalContent: HTMLDivElement = dom.createElement('div')
  modalContent.setAttribute('style', style.modalContentStyle)
  return modalContent
}

const createCloseButton = (dom: HTMLDocument, modal: HTMLDivElement) => {
  const closeButton: HTMLSpanElement = dom.createElement('span')
  closeButton.addEventListener('click', () => closeClickHandler(modal))
  closeButton.addEventListener('mouseenter', () => {
    closeButton.setAttribute('style', style.modalCloseStyleHover)
  })
  closeButton.addEventListener('mouseleave', () => {
    closeButton.setAttribute('style', style.modalCloseStyle)
  })
  closeButton.addEventListener('focus', () => {
    closeButton.setAttribute('style', style.modalCloseStyleFocus)
  })
  closeButton.addEventListener('blur', () => {
    closeButton.setAttribute('style', style.modalCloseStyle)
  })
  closeButton.setAttribute('tabindex', '0')
  closeButton.setAttribute('style', style.modalCloseStyle)
  return closeButton
}

const createListItems = (dom: HTMLDocument, list: ListItem) => {
  const li:HTMLLIElement = dom.createElement('li')
  li.setAttribute('style', style.modalListItemStyle)
  const link: HTMLAnchorElement = dom.createElement('a')
  link.setAttribute('style', style.modalAnchorStyle)
  link.href = list.link
  link.innerHTML = list.label
  li.appendChild(link)
  return li
}

const createUnOrderedList = (dom: HTMLDocument, listOfLinks: ListItem[]) => {
  const ul: HTMLUListElement = dom.createElement('ul')
  ul.setAttribute('style', style.modalUnorderedListStyle)
  listOfLinks.forEach(list => {
    const li = createListItems(dom, list)
    ul.appendChild(li)
  })
  return ul
}
export const createWindow = (dom: HTMLDocument, listOfLinks: ListItem[], options: ModalWidgetStyleOptions) => {
  const modal = createModal(dom, options)
  const modalContent = createModalContent(dom)
  const closeButton = createCloseButton(dom, modal)
  const ul = createUnOrderedList(dom, listOfLinks)
  modalContent.appendChild(closeButton)
  modalContent.appendChild(ul)
  modal.appendChild(modalContent)
}
