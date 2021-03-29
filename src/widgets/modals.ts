export type ListItem = {
  label: string,
  link: string
}
export type WindowOptions = {
  top: string,
  left: string,
  coverBackground: boolean
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
  const modal: HTMLDivElement | null = document.querySelector('#modal')
  if (modal) {
    modal.style.display = 'none'
  }
}
export const createWindow = (list: ListItem[], options: WindowOptions) => {
  const modal = document.createElement('div')
  modal.id = 'modal'
  const modalContent: HTMLDivElement = document.createElement('div')
  modalContent.classList.add('modal-content')
  const closeButton: HTMLSpanElement = document.createElement('span')
  closeButton.classList.add('close')
  closeButton.addEventListener('click', closeClickHandler)
  const ul: HTMLUListElement = document.createElement('ul')
  list.map(list => {
    const li:HTMLLIElement = document.createElement('li')
    const link: HTMLAnchorElement = document.createElement('a')
    link.href = list.link
    link.innerHTML = list.label
    li.appendChild(link)
    ul.appendChild(li)
    return li
  })
  modalContent.appendChild(closeButton)
  modalContent.appendChild(ul)
  modal.appendChild(modalContent)
}
