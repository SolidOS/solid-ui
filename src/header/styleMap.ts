export const styleMap = {
  'header-user-menu': {
  },
  'header-user-menu__link': {
    background: 'none',
    border: '0',
    color: 'black',
    cursor: 'pointer',
    display: 'block',
    fontFamily: 'Arial',
    fontSize: '1em',
    textAlign: 'left',
    padding: '1em',
    width: '100%',
    '&:focus': {
      backgroundColor: '#eee'
    },
    '&:hover': {
      backgroundColor: '#eee'
    }
  },
  'header-user-menu__trigger': {
    background: 'none',
    border: '0',
    cursor: 'pointer',
    width: '60px',
    height: '60px',
    img: {
      borderRadius: '50%',
      height: '56px',
      width: '56px'
    }
  },
  'header-user-menu__button': {
    background: 'none',
    border: '0',
    color: 'black',
    cursor: 'pointer',
    display: 'block',
    fontFamily: 'Arial',
    fontSize: '1em',
    textAlign: 'left',
    padding: '1em',
    width: '100%',
    '&:focus': {
      backgroundColor: '#eee'
    },
    '&:hover': {
      backgroundColor: '#eee'
    }
  },
  'header-user-menu__list': {
    listStyle: 'none',
    margin: '0',
    padding: '0'
  },
  'header-user-menu__navigation-menu': {
    background: 'white',
    border: 'solid 1px #000000',
    borderRight: '0',
    position: 'absolute',
    right: '0',
    top: '60px',
    width: '200px',
    'z-index': '1',
    '&[aria-hidden = true]': {
      display: 'none'
    }
  },
  'header-user-menu__list-item': {
    borderBottom: 'solid 1px #000000',
    '&:last-child': {
      border: '0'
    }
  },
  'header-user-menu__photo': {
    borderRadius: '50%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    margin: '5px',
    height: '50px',
    width: '50px'
  },
  'header-banner': {
    boxShadow: '0px 1px 4px #000000',
    display: 'flex',
    padding: '0 1.5em',
    marginBottom: '4px'
  },
  'header-banner__link': {
    boxShadow: '0px 1px 4px #000000',
    padding: '0 1.5em',
    marginBottom: '4px',
    display: 'block'
  },

  'header-banner__login': {
    boxShadow: '0px 1px 4px #000000',
    display: 'flex',
    padding: '0 1.5em',
    marginBottom: '4px',
    marginLeft: 'auto',
    input: {
      // hacks to override the default style of login and signup button from solid-ui
      margin: '0.75em 0 0.75em 0.5em !important',
      padding: '0.5em !important'
    }
  },
  'header-banner__user-menu': {
    boxShadow: '0px 1px 4px #000000',
    display: 'flex',
    padding: '0 1.5em',
    marginBottom: '4px',
    borderLeft: 'solid 1px #000000',
    marginLeft: 'auto'
  }
}
