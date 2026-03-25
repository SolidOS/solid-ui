/**
 * Get the modal styles, based on options such as position and background overlay.
 * See https://design.inrupt.com/atomic-core/?cat=Organisms#Modals for modal design guidelines.
 */
export type ModalWidgetStyleOptions = {
  topPosition?: string,
  leftPosition?: string,
  withGreyedBackground?: boolean
}

export const getModalStyle = (options: ModalWidgetStyleOptions = {}) => {
  const topPosition = (options.topPosition) ? options.topPosition : '50px'
  const leftPosition = (options.leftPosition) ? options.leftPosition : '50px'

  if (options.withGreyedBackground) {
    return 'display: none; position: fixed; z-index: 1; overflow: auto; background-color: rgba(0,0,0,0.4); padding-top: 100px; left: 0; top: 0; width: 100%; height: 100%;'
  }

  return `display: none; position: fixed; z-index: 1; top: ${topPosition}; left: ${leftPosition}; overflow: auto; background-color: rgba(0,0,0,0.4);`
}
