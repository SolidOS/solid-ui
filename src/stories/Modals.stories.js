import * as UI from '../../src/index'

export default {
  title: 'Modals',
}

const demoLinks = [
  { label: 'Solid Project', link: 'https://solidproject.org/' },
  { label: 'SolidOS', link: 'https://github.com/solidos' },
  { label: 'W3C', link: 'https://www.w3.org/' },
]

export const ListModal = {
  render: () => {
    const modal = UI.widgets.createListModal(document, demoLinks, {
      withGreyedBackground: true,
      ariaLabel: 'Helpful links',
    })
    modal.style.display = 'block'
    return modal
  },
  name: 'List modal',
}

export const OpenListModal = {
  render: () => {
    const container = document.createElement('div')

    const openButton = document.createElement('button')
    openButton.setAttribute('type', 'button')
    openButton.textContent = 'Open links modal'

    const helper = document.createElement('p')
    helper.textContent = 'Open the modal, then press Escape or use the close button.'

    openButton.addEventListener('click', () => {
      const existing = container.querySelector('.modal')
      if (existing) {
        existing.remove()
      }

      const modal = UI.widgets.createListModal(document, demoLinks, {
        withGreyedBackground: true,
        ariaLabel: 'Helpful links',
      })
      modal.style.display = 'block'
      container.appendChild(modal)
    })

    container.appendChild(openButton)
    container.appendChild(helper)
    return container
  },
  name: 'Open list modal',
}
