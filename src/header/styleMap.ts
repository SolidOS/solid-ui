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
    '&:focus, &:hover': {
      // backgroundColor: 'linear-gradient(to right, #7C4DFF 0%, #18A9E6 50%, #01C9EA 100%)'
      backgroundColor: 'rgba(48.6, 30.2, 100, 5%)'
    },
    a: {
      textDecoration: 'none'
    }
  },
  'header-user-menu__trigger': {
    background: 'none',
    border: '0',
    cursor: 'pointer',
    width: '60px', // defined in mashlib as a SASS variable $icon_size
    height: '60px', // defined in mashlib as a SASS variable $icon_size
    img: {
      borderRadius: '50%',
      height: '56px', // defined in mashlib as a SASS variable $icon_size - 4px
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
    '&:focus, &:hover': {
      // backgroundColor: 'linear-gradient(to right, #7C4DFF 0%, #18A9E6 50%, #01C9EA 100%)'
      backgroundColor: 'rgba(48.6, 30.2, 100, 5%)'
    }
  },
  'header-user-menu__list': {
    listStyle: 'none',
    margin: '0',
    padding: '0'
  },
  'header-user-menu__navigation-menu': {
    background: 'white',
    border: 'solid 1px #C8C8C8', // the color was defined in mashlib as a SASS variable $divider_color
    borderRadius: '0.5rem',
    borderRight: 'solid 1px #C8C8C8',
    position: 'absolute',
    right: '0.5em',
    top: '60px', // defined in mashlib as a SASS variable $icon_size
    width: '200px',
    'z-index': '1',
    '&[aria-hidden = true]': {
      display: 'none'
    }
  },
  'header-user-menu__list-item': {
    borderBottom: 'solid 1px #D8D8D8', // the color was defined in mashlib as a SASS variable $divider_color
    '&:last-child': {
      border: '0'
    }
  },
  'header-user-menu__photo': {
    borderRadius: '50%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '50px', // $icon-size - $image-margin * 2 image-margin was 5px in mashlib and icon size 60px
    width: '50px'
  },
  'header-banner': {
    border: 'solid 1px #C8C8C8',
    boxShadow: '0px 1px 4px #C8C8C8', // the color was defined in mashlib as a SASS variable $divider_color
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 1.5em',
    marginBottom: '4px'
  },
  'header-banner__link': {
    display: 'block'
  },
  'header-banner__right-menu': {
    display: 'flex'
  },
  'header-banner__login': {
    marginLeft: 'auto',
    input: {
      // hacks to override the default style of login and signup button from solid-ui
      margin: '0.75em 0 0.75em 0.5em !important',
      padding: '0.5em !important'
    }
  },
  'header-banner__user-menu': {
    borderLeft: 'solid 1px #C8C8C8', // the color was defined in mashlib as a SASS variable $divider_color
    marginLeft: 'auto',
    marginRight: '0.5em'
  },
  'header-banner__help-menu': {
    borderLeft: 'solid 1px #000000', // the color was defined in mashlib as a SASS variable $divider_color
    marginLeft: 'auto',
    marginRight: '0.5em'
  },
  'header-banner__icon': {
    backgroundSize: '65px 60px',
    height: '60px !important', // this is the icon size
    width: '65px !important' // may just be 65px round($icon-size * 352 / 322);
  },
  'header-banner__help-icon': {
    width: '28px !important'
  }
}
