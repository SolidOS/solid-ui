/**
 * Get the button style, based on options.
 * See https://design.inrupt.com/atomic-core/?cat=Atoms#Buttons
 */
export type ModalWidgetStyleOptions = {
  topPosition?: string,
  leftPosition?: string,
  withGreyedBackground?: boolean
}

export const modalStyles = {
  unorderedListStyle: 'padding: 0 .2em;',
  listItemStyle: 'list-style: none; box-shadow: 1px 1px 1px 1px #888888; padding: .5em',
  anchorStyle: 'text-decoration: none'
}

export const getModalStyle = (options: ModalWidgetStyleOptions = {}) => {
  const topPosition = (options.topPosition) ? options.topPosition : '50px'
  const leftPosition = (options.leftPosition) ? options.leftPosition : '50px'

  if (options.withGreyedBackground) {
    return {
      display: 'none',
      position: 'fixed',
      'z-index': '1',
      overflow: 'auto', /* Enable scroll if needed */
      'background-color': 'rgba(0,0,0,0.4)', /* Black w/ opacity */
      'padding-top': '100px',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%'
    }
  }

  return {
    display: 'none',
    position: 'fixed',
    'z-index': '1',
    top: `${topPosition}`,
    left: `${leftPosition}`,
    overflow: 'auto', /* Enable scroll if needed */
    'background-color': 'rgba(0,0,0,0.4)' /* Black w/ opacity */
  }
}

export const getModalContentStyle = () => {
  return {
    display: 'flex',
    'flex-direction': 'column',
    'background-color': '#fefefe'
  }
}

export const getModalCloseStyle = () => {
  return {
    color: '#aaaaaa',
    'align-self': 'flex-end',
    'font-size': '20px',
    'font-weight': 'bold',
    'margin-right': '.2em',
    'margin-top': '.2em',
    '&:hover': {
      'text-decoration': 'none',
      cursor: 'pointer'
    },
    '&:focus': {
      'text-decoration': 'none',
      cursor: 'pointer'
    }
  }
}
