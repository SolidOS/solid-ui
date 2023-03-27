// Common readable consistent stylesheet
// to avoid using style sheets which are document-global
// and make programmable style toggling with selection, drag over, etc easier

// These must all end with semicolon so they can be appended to.

const formBorderColor = '#888888' // Mid-grey
const lowProfileLinkColor = '#3B5998' // Grey-blue, e.g., for field labels linking to ontology
const formFieldNameBoxWidth = '8em' // The fixed amount to get form fields to line up
// The latter we put in when switching awy from using tables.  Getting allignment between
// fields in different groups though is hard problem.

export const style = { // styleModule

  checkboxStyle: 'color: black; font-size: 100%; padding-left: 0.5 em; padding-right: 0.5 em;',
  checkboxInputStyle: 'font-size: 150%; height: 1.2em; width: 1.2em; background-color: #eef; border-radius:0.2em; margin: 0.1em',

  fieldLabelStyle: 'color: #3B5998; text-decoration: none;',
  formSelectSTyle:
    'background-color: #eef; padding: 0.5em;  border: .05em solid #88c;  border-radius:0.2em; font-size: 100%; margin:0.4em;',
  textInputStyle:
    'background-color: #eef; padding: 0.5em;  border: .05em solid #88c;  border-radius:0.2em; font-size: 100%; margin:0.4em;',
  textInputStyleUneditable: // Color difference only
    'background-color: white; padding: 0.5em;  border: .05em solid white;  border-radius:0.2em; font-size: 100%; margin:0.4em;',
  textInputSize: 20, // Default text input size in characters roughly
  buttonStyle:
      'background-color: #fff; padding: 0.7em;  border: .01em solid white;  border-radius:0.2em; font-size: 100%; margin: 0.3em;', // 'background-color: #eef;
  commentStyle: 'padding: 0.7em;  border: none; font-size: 100%; white-space: pre-wrap;',
  iconStyle: 'width: 3em; height: 3em; margin: 0.1em; border-radius: 1em;',
  smallButtonStyle: 'margin: 0.2em; width: 1em; height:1em;',
  classIconStyle: 'width: 3em; height: 3em; margin: 0.1em; border-radius: 0.2em; border: 0.1em solid green; padding: 0.2em; background-color: #efe;', // combine with buttonStyle
  confirmPopupStyle: 'padding: 0.7em; border-radius: 0.2em; border: 0.1em solid orange; background-color: white; box-shadow: 0.5em 0.9em #888;',
  tabBorderRadius: '0.2em',
  messageBodyStyle:
    'white-space: pre-wrap; width: 99%; font-size:100%; border: 0.07em solid #eee; border-radius:0.2em; padding: .3em 0.5em; margin: 0.1em;',
  pendingeditModifier: 'color: #bbb;',
  highlightColor: '#7C4DFF', // Solid lavendar https://design.inrupt.com/atomic-core/?cat=Core

  // Contacts
  personaBarStyle: 'width: 100%; height: 4em; background-color: #eee; vertical-align: middle;',
  searchInputStyle: 'border: 0.1em solid #444; border-radius: 0.2em; width: 100%; font-size: 100%; padding: 0.1em 0.6em; margin 0.2em;',
  autocompleteRowStyle: 'border: 0.2em solid straw;',

  // Login buttons
  signInButtonStyle: 'padding: 1em; border-radius:0.2em; font-size: 100%;', // was 0.5em radius

  // Forms
  heading1Style: 'font-size: 180%; font-weight: bold; color: #888888; padding: 0.5em; margin: 0.7em 0.0m;', // originally was brown; now grey
  heading2Style: 'font-size: 130%; font-weight: bold; color: #888888; padding: 0.4em; margin: 0.7em 0.0em;', // originally was brown; now grey
  heading3Style: 'font-size: 120%; font-weight: bold; color: #888888; padding: 0.3em; margin: 0.7em 0.0em;', // For example, in large forms or before a small form
  heading4Style: 'font-size: 110%; font-weight: bold; color: #888888; padding: 0.2em; margin: 0.7em 0.0em;', // Lowest level used by default in small things

  formBorderColor, // originally was brown; now grey
  formHeadingColor: '#888888', // originally was brown; now grey
  formHeadingStyle: 'font-size: 110%; font-weight: bold; color: #888888; padding: 0.2em;  margin: 0.7em 0.0em;', // originally was brown; now grey
  formTextInput: 'font-size: 100%; margin: 0.1em; padding: 0.1em;', // originally used this
  formGroupStyle: [`padding-left: 0em; border: 0.0em solid ${formBorderColor}; border-radius: 0.2em;`, // weight 0
    `padding-left: 2em; border: 0.05em solid ${formBorderColor}; border-radius: 0.2em;`,
    `padding-left: 2em; border: 0.1em solid ${formBorderColor}; border-radius: 0.2em;`,
    `padding-left: 2em; border: 0.2em solid ${formBorderColor}; border-radius: 0.2em;` // @@ pink
  ],

  formFieldLabelStyle: `'color: ${lowProfileLinkColor}; text-decoration: none;'`,
  formFieldNameBoxWidth,
  formFieldNameBoxStyle: `padding: 0.3em; vertical-align: middle; width:${formFieldNameBoxWidth};`,
  textInputBackgroundColor: '#eef',
  textInputBackgroundColorUneditable: '#fff',
  textInputColor: '#000',
  textInputColorPending: '#888',
  multilineTextInputStyle: 'font-size:100%; white-space: pre-wrap; background-color: #eef;' +
  ' border: 0.07em solid gray; padding: 1em 0.5em; margin: 1em 1em;',

  // Buttons
  renderAsDivStyle: 'display: flex; align-items: center; justify-content: space-between; height: 2.5em; padding: 1em;',
  imageDivStyle: 'width:2.5em; padding:0.5em; height: 2.5em;',
  linkDivStyle: 'width:2em; padding:0.5em; height: 4em;',

  // ACL
  aclControlBoxContainer: 'margin: 1em',
  aclControlBoxHeader: 'fontSize: 120%, margin: 0 0 1rem',
  aclControlBoxStatus: 'display: none, margin: 1rem 0',
  aclControlBoxStatusRevealed: 'display: block',
  aclGroupContent: 'maxWidth: 650',
  accessGroupList: 'display: grid, gridTemplateColumns: 1fr, margin: 1em, width: 100%',
  accessGroupListItem: 'display: grid, gridTemplateColumns: 100px auto 30%',
  defaultsController: 'display: flex',
  defaultsControllerNotice: 'color: #888, flexGrow: 1, fontSize: 80%',
  bigButton: 'backgroundColor: white, border: 0.1em solid #888, borderRadius: 0.3em, maxWidth: 50%, paddingBottom: 1em, paddingTop: 1em',
  group: 'color: #888',
  group1: 'color: green',
  group2: 'color: #cc0',
  group3: 'color: orange',
  group5: 'color: red',
  group9: 'color: blue',
  group13: 'color: purple',

  trustedAppAddApplicationsTable: 'backgroundColor: #eee',
  trustedAppCancelButton: 'float: right',
  trustedAppControllerI: 'borderColor: orange, borderRadius: 1em, borderWidth: 0.1em',
  temporaryStatusInit: 'background: green',
  temporaryStatusEnd: 'background: transparent, transition: background 5s linear',

  // header
  headerUserMenuLink: 'background: none, border: 0, color: black, cursor: pointer, display: block, fontFamily: Arial, fontSize: 1em, textAlign: left, padding: 1em,  width: 100%, textDecoration: none',
  headerUserMenuLinkHover: 'backgroundColor: linear-gradient(to right, #7C4DFF 0%, #18A9E6 50%, #01C9EA 100%)',

  headerUserMenuTrigger: 'background: none, border: 0, cursor: pointer, width: 60px, height: 60px',
  headerUserMenuTriggerImg: 'borderRadius: 50%, height: 56px, width: 56px, width: 28px !important',
  headerUserMenuButton: 'background: none, border: 0, color: black, cursor: pointer, display: block, fontFamily: Arial, fontSize: 1em, textAlign: left, padding: 1em, width: 100%',
  headerUserMenuButtonHover: 'backgroundColor: linear-gradient(to right, #7C4DFF 0%, #18A9E6 50%, #01C9EA 100%)',
  headerUserMenuList: 'listStyle: none, margin: 0, padding: 0',
  headerUserMenuNavigationMenu: 'background: white, border: solid 1px #000000, borderRight: 0,position: absolute, right: 0, top: 60px, width: 200px, z-index: 1',
  headerUserMenuListItem: 'borderBottom: solid 1px #000000',
  headerUserMenuPhoto: 'borderRadius: 50%, backgroundPosition: center, backgroundRepeat: no-repeat,backgroundSize: cover,height: 50px, width: 50px',
  headerBanner: 'boxShadow: 0px 1px 4px #000000, display: flex, justifyContent: space-between,padding: 0 1.5em, marginBottom: 4px',
  headerBannerLink: 'display: block',
  headerBannerRightMenu: 'display: flex',
  headerBannerLogin: 'marginLeft: auto',
  headerBannerLoginInput: 'margin: 0.75em 0 0.75em 0.5em !important, padding: 0.5em !important',
  headerBannerUserMenu: 'borderLeft: solid 1px #000000, marginLeft: auto',
  headerBannerHelpMenu: 'borderLeft: solid 1px #000000, marginLeft: auto',
  headerBannerIcon: 'backgroundSize: 65px 60px, height: 60px !important, width: 65px !important', // may just be 65px round($icon-size * 352 / 322);

  // footer
  footer: 'borderTop: solid 1px $divider-color, fontSize: 0.9em, padding: 0.5em 1.5em',

  // buttons
  primaryButton: 'background-color: #7c4dff; color: #ffffff; font-family: Raleway, Roboto, sans-serif;border-radius: 0.25em; border-color: #7c4dff; border: 1px solid; cursor: pointer; font-size: .8em;text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none',

  primaryButtonHover: 'background-color: #9f7dff; color: #ffffff; font-family: Raleway, Roboto, sans-serif;border-radius: 0.25em; border-color: #7c4dff; border: 1px solid; cursor: pointer; font-size: .8em;text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none; transition: 0.25s all ease-in-out',

  primaryButtonNoBorder: 'background-color: #ffffff; color: #7c4dff; font-family: Raleway, Roboto, sans-serif;border-radius: 0.25em; border-color: #7c4dff; border: 1px solid; cursor: pointer; font-size: .8em;text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none',

  primaryButtonNoBorderHover: 'background-color: #7c4dff; color: #ffffff; font-family: Raleway, Roboto, sans-serif; border-radius: 0.25em; border-color: #7c4dff; border: 1px solid; cursor: pointer; font-size: .8em; text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none; transition: 0.25s all ease-in-out',

  secondaryButton: 'background-color: #01c9ea; color: #ffffff; font-family: Raleway, Roboto, sans-serif;border-radius: 0.25em; border-color: #01c9ea; border: 1px solid; cursor: pointer; font-size: .8em;text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none',

  secondaryButtonHover: 'background-color: #37cde6; color: #ffffff; font-family: Raleway, Roboto, sans-serif;border-radius: 0.25em; border-color: #7c4dff; border: 1px solid; cursor: pointer; font-size: .8em;text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none; transition: 0.25s all ease-in-out',

  secondaryButtonNoBorder: 'background-color: #ffffff; color: #01c9ea; font-family: Raleway, Roboto, sans-serif; border-radius: 0.25em; border-color: #01c9ea; border: 1px solid; cursor: pointer; font-size: .8em; text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none',

  secondaryButtonNoBorderHover: 'background-color: #01c9ea; color: #ffffff; font-family: Raleway, Roboto, sans-serif; border-radius: 0.25em; border-color: #01c9ea; border: 1px solid; cursor: pointer; font-size: .8em; text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none; transition: 0.25s all ease-in-out'

}

style.setStyle = function setStyle (ele, styleName) {
  ele.style = style[styleName]
}

module.exports = style // @@ No way to do this in ESM
