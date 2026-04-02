import {
  ModalWidgetStyleOptions,
  getModalStyle
} from './modalsStyle'
import { style } from '../style'

export type ListItem = {
  label: string,
  link: string
}

// Two functions that need to be implemented to use the modal.
// When the user clicks the button, open the modal.
/* Click handler on the button to display it.
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it.
// Window click handler so that the modal will close
// even if the user doesn't click close.
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  } */
const closeClickHandler = (modal: HTMLDivElement, returnFocusTo?: Element | null) => {
  modal.style.display = 'none'
  if (returnFocusTo && returnFocusTo instanceof HTMLElement) {
    returnFocusTo.focus()
  }
}

const createModal = (dom: HTMLDocument, options: ModalWidgetStyleOptions, returnFocusTo?: Element | null) => {
  const modal = dom.createElement('div')
  modal.classList.add('modal')
  modal.setAttribute('role', 'dialog')
  modal.setAttribute('aria-modal', options.withGreyedBackground ? 'true' : 'false')
  modal.setAttribute('aria-label', options.ariaLabel || 'List dialog')
  modal.setAttribute('tabindex', '-1')
  modal.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeClickHandler(modal, returnFocusTo)
    }
  })
  modal.setAttribute('style', getModalStyle(options))
  return modal
}

const createModalContent = (dom: HTMLDocument) => {
  const modalContent: HTMLDivElement = dom.createElement('div')
  modalContent.setAttribute('style', style.modalContentStyle)
  return modalContent
}

const createCloseButton = (dom: HTMLDocument, modal: HTMLDivElement, returnFocusTo?: Element | null) => {
  const closeButton: HTMLButtonElement = dom.createElement('button')
  closeButton.setAttribute('type', 'button')
  closeButton.setAttribute('aria-label', 'Close modal')
  closeButton.setAttribute('title', 'Close')
  closeButton.textContent = 'x'
  closeButton.addEventListener('click', () => closeClickHandler(modal, returnFocusTo))
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
  closeButton.setAttribute('style', style.modalCloseStyle)
  return closeButton
}

const createListItems = (dom: HTMLDocument, list: ListItem) => {
  const li:HTMLLIElement = dom.createElement('li')
  li.setAttribute('style', style.modalListItemStyle)
  const link: HTMLAnchorElement = dom.createElement('a')
  link.setAttribute('style', style.modalAnchorStyle)
  link.href = list.link
  link.textContent = list.label
  li.appendChild(link)
  return li
}

const createUnorderedList = (dom: HTMLDocument, listOfLinks: ListItem[]) => {
  const ul: HTMLUListElement = dom.createElement('ul')
  ul.setAttribute('role', 'list')
  ul.setAttribute('style', style.modalUnorderedListStyle)
  listOfLinks.forEach(list => {
    const li = createListItems(dom, list)
    ul.appendChild(li)
  })
  return ul
}
export const createListModal = (dom: HTMLDocument, listOfLinks: ListItem[], options: ModalWidgetStyleOptions) => {
  const returnFocusTo = dom.activeElement
  const modal = createModal(dom, options, returnFocusTo)
  const modalContent = createModalContent(dom)
  const closeButton = createCloseButton(dom, modal, returnFocusTo)
  const ul = createUnorderedList(dom, listOfLinks)
  modalContent.appendChild(closeButton)
  modalContent.appendChild(ul)
  modal.appendChild(modalContent)

  setTimeout(() => {
    if (closeButton.isConnected) {
      closeButton.focus()
    }
  }, 0)

  return modal
}
