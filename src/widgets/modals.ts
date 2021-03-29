import {
  ModalWidgetStyleOptions,
  modalStyles,
  getModalStyle,
  getModalContentStyle,
  getModalCloseStyle
} from './modalsStyle'
import { getClasses } from '../jss'

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
const closeClickHandler = () => {
  const modal: HTMLDivElement | null = document.querySelector('.modal')
  if (modal) {
    modal.style.display = 'none'
  }
}

const createModal = (dom: HTMLDocument, options: ModalWidgetStyleOptions) => {
  const modal = dom.createElement('div')
  const style = getModalStyle(options)
  const { classes } = getClasses(dom.head, {
    modal: style
  })
  modal.classList.add(classes.modal)
  return modal
}

const createModalContent = (dom: HTMLDocument) => {
  const modalContent: HTMLDivElement = dom.createElement('div')
  const style = getModalContentStyle()
  const { classes } = getClasses(dom.head, {
    modalContent: style
  })
  modalContent.classList.add(classes.modalContent)
  return modalContent
}

const createCloseButton = (dom: HTMLDocument) => {
  const closeButton: HTMLSpanElement = dom.createElement('span')
  closeButton.addEventListener('click', closeClickHandler)
  const style = getModalCloseStyle()
  const { classes } = getClasses(dom.head, {
    close: style
  })
  closeButton.classList.add(classes.close)
  return closeButton
}

const createListItems = (dom: HTMLDocument, list: ListItem) => {
  const li:HTMLLIElement = dom.createElement('li')
  li.setAttribute('style', modalStyles.listItemStyle)
  const link: HTMLAnchorElement = dom.createElement('a')
  link.setAttribute('style', modalStyles.anchorStyle)
  link.href = list.link
  link.innerHTML = list.label
  li.appendChild(link)
  return li
}

const createUnOrderedList = (dom: HTMLDocument, listOfLinks: ListItem[]) => {
  const ul: HTMLUListElement = dom.createElement('ul')
  ul.setAttribute('style', modalStyles.unorderedListStyle)
  listOfLinks.forEach(list => {
    const li = createListItems(dom, list)
    ul.appendChild(li)
  })
  return ul
}
export const createWindow = (dom: HTMLDocument, listOfLinks: ListItem[], options: ModalWidgetStyleOptions) => {
  const modal = createModal(dom, options)
  const modalContent = createModalContent(dom)
  const closeButton = createCloseButton(dom)
  const ul = createUnOrderedList(dom, listOfLinks)
  modalContent.appendChild(closeButton)
  modalContent.appendChild(ul)
  modal.appendChild(modalContent)
}
