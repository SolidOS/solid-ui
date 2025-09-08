// Common readable consistent stylesheet
// to avoid using style sheets which are document-global
// and make programmable style toggling with selection, drag over, etc easier
// These must all end with semicolon so they can be appended to.

import styleConstants from './styleConstants'

export const style = { // styleModule

  checkboxStyle: 'color: black; font-size: 100%; padding-left: 0.5 em; padding-right: 0.5 em;',
  checkboxInputStyle: 'font-size: 150%; height: 1.2em; width: 1.2em; background-color: #eef; border-radius:0.2em; margin: 0.1em;',

  fieldLabelStyle: 'color: #3B5998; text-decoration: none;',
  formSelectStyle:
    'background-color: #eef; padding: 0.5em;  border: .05em solid #88c; border-radius:0.2em; font-size: 100%; margin:0.4em;',
  textInputStyle:
    'background-color: #eef; padding: 0.5em;  border: .05em solid #88c; border-radius:0.2em; font-size: 100%; margin:0.4em;',
  textInputStyleUneditable: // Color difference only
    'background-color: white; padding: 0.5em;  border: .05em solid white; border-radius:0.2em; font-size: 100%; margin:0.4em;',
  buttonStyle:
      'background-color: #fff; padding: 0.7em;  border: .01em solid white; border-radius:0.2em; font-size: 100%; margin: 0.3em;', // 'background-color: #eef;
  commentStyle: 'padding: 0.7em;  border: none; font-size: 100%; white-space: pre-wrap;',
  iconStyle: 'width: 3em; height: 3em; margin: 0.1em; border-radius: 1em;',
  smallButtonStyle: 'margin: 0.2em; width: 1em; height:1em;',
  classIconStyle: 'width: 3em; height: 3em; margin: 0.1em; border-radius: 0.2em; border: 0.1em solid green; padding: 0.2em; background-color: #efe;', // combine with buttonStyle
  confirmPopupStyle: 'padding: 0.7em; border-radius: 0.2em; border: 0.1em solid orange; background-color: white; box-shadow: 0.5em 0.9em #888;',
  messageBodyStyle:
    'white-space: pre-wrap; width: 99%; font-size:100%; border: 0.07em solid #eee; border-radius:0.2em; padding: .3em 0.5em; margin: 0.1em;',
  pendingeditModifier: 'color: #bbb;',

  // Contacts
  personaBarStyle: 'width: 100%; height: 4em; background-color: #eee; vertical-align: middle;',
  searchInputStyle: 'border: 0.1em solid #444; border-radius: 0.2em; width: 100%; font-size: 100%; padding: 0.1em 0.6em; margin 0.2em;',
  autocompleteRowStyle: 'border: 0.2em solid straw;',

  // Login buttons
  signInAndUpButtonStyle: 'padding: 1em; border-radius:0.2em; font-size: 100%;', // was 0.5em radius
  headerBannerLoginInput: 'margin: 0.75em 0 0.75em 0.5em !important; padding: 0.5em !important;',
  signUpBackground: 'background-color: #eef;',
  signInBackground: 'background-color: #efe;',

  // Forms
  heading1Style: 'font-size: 180%; font-weight: bold; color: #888888; padding: 0.5em; margin: 0.7em 0.0m;', // originally was brown; now grey
  heading2Style: 'font-size: 130%; font-weight: bold; color: #888888; padding: 0.4em; margin: 0.7em 0.0em;', // originally was brown; now grey
  heading3Style: 'font-size: 120%; font-weight: bold; color: #888888; padding: 0.3em; margin: 0.7em 0.0em;', // For example, in large forms or before a small form
  heading4Style: 'font-size: 110%; font-weight: bold; color: #888888; padding: 0.2em; margin: 0.7em 0.0em;', // Lowest level used by default in small things

  formHeadingStyle: 'font-size: 110%; font-weight: bold; color: #888888; padding: 0.2em;  margin: 0.7em 0.0em;', // originally was brown; now grey
  formTextInput: 'font-size: 100%; margin: 0.1em; padding: 0.1em;', // originally used this
  formGroupStyle: [`padding-left: 0em; border: 0.0em solid ${styleConstants.formBorderColor}; border-radius: 0.2em;`, // weight 0
    `padding-left: 2em; border: 0.05em solid ${styleConstants.formBorderColor}; border-radius: 0.2em;`,
    `padding-left: 2em; border: 0.1em solid ${styleConstants.formBorderColor}; border-radius: 0.2em;`,
    `padding-left: 2em; border: 0.2em solid ${styleConstants.formBorderColor}; border-radius: 0.2em;` // @@ pink
  ],

  formFieldLabelStyle: `color: ${styleConstants.lowProfileLinkColor}; text-decoration: none;`,
  formFieldNameBoxStyle: `padding: 0.3em; vertical-align: middle; width:${styleConstants.formFieldNameBoxWidth};`,
  multilineTextInputStyle: 'font-size:100%; white-space: pre-wrap; background-color: #eef;' +
  ' border: 0.07em solid gray; padding: 1em 0.5em; margin: 1em 1em;',

  // Buttons
  renderAsDivStyle: 'display: flex; align-items: center; justify-content: space-between; height: 2.5em; padding: 1em;',
  imageDivStyle: 'width:2.5em; padding:0.5em; height: 2.5em;',
  linkDivStyle: 'width:2em; padding:0.5em; height: 4em;',

  // ACL
  aclControlBoxContainer: 'margin: 1em;',
  aclControlBoxHeader: 'font-size: 120%; margin: 0 0 1rem;',
  aclControlBoxStatus: 'display: none; margin: 1rem 0;',
  aclControlBoxStatusRevealed: 'display: block;',
  aclGroupContent: 'maxWidth: 650;',
  accessGroupList: 'display: grid; grid-template-columns: 1fr; margin: 1em; width: 100%;',
  accessGroupListItem: 'display: grid; grid-template-columns: 100px auto 30%;',
  defaultsController: 'display: flex;',
  defaultsControllerNotice: 'color: #888; flexGrow: 1; fontSize: 80%;',
  bigButton: 'background-color: white; border: 0.1em solid #888; border-radius: 0.3em; max-width: 50%; padding-bottom: 1em; padding-top: 1em;',
  group: 'color: #888;',
  group1: 'color: green;',
  group2: 'color: #cc0;',
  group3: 'color: orange;',
  group5: 'color: red;',
  group9: 'color: blue;',
  group13: 'color: purple;',

  trustedAppAddApplicationsTable: 'background-color: #eee;',
  trustedAppCancelButton: 'float: right;',
  trustedAppControllerI: 'border-color: orange; border-radius: 1em; border-width: 0.1em;',
  temporaryStatusInit: 'background: green;',
  temporaryStatusEnd: 'background: transparent; transition: background 5s linear;',

  // header
  headerUserMenuLink: 'background: none; border: 0; color: black; cursor: pointer; display: block; font-family: Arial; font-size: 1em; text-align: left; padding: 1em;  width: 100%; text-decoration: none;',
  headerUserMenuLinkHover: 'background: none; border: 0; color: black; cursor: pointer; display: block; font-family: Arial; font-size: 1em; text-align: left; padding: 1em;  width: 100%; text-decoration: none; background-image: linear-gradient(to right, #7C4DFF 0%, #18A9E6 50%, #01C9EA 100%);',
  headerUserMenuTrigger: 'background: none; border: 0; cursor: pointer; width: 60px; height: 60px;',
  headerUserMenuTriggerImg: 'border-radius: 50%; height: 56px; width: 28px !important;',
  headerUserMenuButton: 'background: none; border: 0; color: black; cursor: pointer; display: block; font-family: Arial; font-size: 1em; text-align: left; padding: 1em; width: 100%;',
  headerUserMenuButtonHover: 'background: none; border: 0; color: black; cursor: pointer; display: block; font-family: Arial; font-size: 1em; text-align: left; padding: 1em; width: 100%; background-image: linear-gradient(to right, #7C4DFF 0%, #18A9E6 50%, #01C9EA 100%);',
  headerUserMenuList: 'list-style: none; margin: 0; padding: 0;',
  headerUserMenuListDisplay: 'list-style: none; margin: 0; padding: 0; display:true;',
  headerUserMenuNavigationMenu: 'background: white; border: solid 1px #000000; border-right: 0; position: absolute; right: 0; top: 60px; width: 200px; z-index: 1; display: true;',
  headerUserMenuNavigationMenuNotDisplayed: 'background: white; border: solid 1px #000000; border-right: 0; position: absolute; right: 0; top: 60px; width: 200px; z-index: 1; display: none;',
  headerUserMenuListItem: 'border-bottom: solid 1px #000000;',
  headerUserMenuPhoto: 'border-radius: 50%; background-position: center; background-repeat: no-repeat; background-size: cover; height: 50px; width: 50px;',
  headerBanner: 'box-shadow: 0px 1px 4px #000000; display: flex; justify-content: space-between; padding: 0 1.5em; margin-bottom: 4px;',
  headerBannerLink: 'display: block;',
  headerBannerRightMenu: 'display: flex;',
  headerBannerLogin: 'margin-left: auto;',
  allChildrenVisible: 'display:true;',
  headerBannerUserMenu: 'border-left: solid 1px #000000; margin-left: auto;',
  headerBannerHelpMenu: 'border-left: solid 1px #000000; margin-left: auto;',
  headerBannerIcon: 'background-size: 65px 60px !important; height: 60px !important; width: 65px !important;', // may just be 65px round($icon-size * 352 / 322);

  // footer
  footer: 'border-top: solid 1px $divider-color; font-size: 0.9em; padding: 0.5em 1.5em;',

  // buttons
  primaryButton: 'background-color: #7c4dff; color: #ffffff; font-family: Raleway, Roboto, sans-serif; border-radius: 0.25em; border-color: #7c4dff; border: 1px solid; cursor: pointer; font-size: .8em; text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none;',
  primaryButtonHover: 'background-color: #9f7dff; color: #ffffff; font-family: Raleway, Roboto, sans-serif;border-radius: 0.25em; border-color: #7c4dff; border: 1px solid; cursor: pointer; font-size: .8em; text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none; transition: 0.25s all ease-in-out;',
  primaryButtonNoBorder: 'background-color: #ffffff; color: #7c4dff; font-family: Raleway, Roboto, sans-serif;border-radius: 0.25em; border-color: #7c4dff; border: 1px solid; cursor: pointer; font-size: .8em; text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none;',
  primaryButtonNoBorderHover: 'background-color: #7c4dff; color: #ffffff; font-family: Raleway, Roboto, sans-serif; border-radius: 0.25em; border-color: #7c4dff; border: 1px solid; cursor: pointer; font-size: .8em; text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none; transition: 0.25s all ease-in-out;',
  secondaryButton: 'background-color: #01c9ea; color: #ffffff; font-family: Raleway, Roboto, sans-serif;border-radius: 0.25em; border-color: #01c9ea; border: 1px solid; cursor: pointer; font-size: .8em; text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none;',
  secondaryButtonHover: 'background-color: #37cde6; color: #ffffff; font-family: Raleway, Roboto, sans-serif;border-radius: 0.25em; border-color: #7c4dff; border: 1px solid; cursor: pointer; font-size: .8em; text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none; transition: 0.25s all ease-in-out;',
  secondaryButtonNoBorder: 'background-color: #ffffff; color: #01c9ea; font-family: Raleway, Roboto, sans-serif; border-radius: 0.25em; border-color: #01c9ea; border: 1px solid; cursor: pointer; font-size: .8em; text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none;',
  secondaryButtonNoBorderHover: 'background-color: #01c9ea; color: #ffffff; font-family: Raleway, Roboto, sans-serif; border-radius: 0.25em; border-color: #01c9ea; border: 1px solid; cursor: pointer; font-size: .8em; text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none; transition: 0.25s all ease-in-out;',

  // media
  controlStyle: `border-radius: 0.5em; margin: 0.8em; width:${styleConstants.mediaModuleCanvasWidth}; height:${styleConstants.mediaModuleCanvasHeight};`,

  // dragAndDrop
  dragEvent: 'background-color: #ccc; border: 0.25em dashed black; border-radius: 0.3em;',
  dropEvent: 'background-color: white; border: 0em solid black;',
  restoreStyle: 'background-color: white;',

  // errors
  errorCancelButton: 'width: 2em; height: 2em; align: right;',
  errorMessageBlockStyle: 'margin: 0.1em; padding: 0.5em; border: 0.05em solid gray; color:black;',

  // pad
  notepadStyle: 'padding: 1em; overflow: auto; resize: horizontal; min-width: 40em;',
  upstreamStatus: 'width: 50%;',
  downstreamStatus: 'width: 50%;',
  baseStyle: 'font-size: 100%; font-family: monospace; width: 100%; border: none; white-space: pre-wrap;',
  headingCore: 'font-family: sans-serif; font-weight: bold;  border: none;',
  headingStyle: [
    'font-size: 110%; padding-top: 0.5em; padding-bottom: 0.5em; width: 100%;',
    'font-size: 120%; padding-top: 1em; padding-bottom: 1em; width: 100%;',
    'font-size: 150%; padding-top: 1em; padding-bottom: 1em; width: 100%;'
  ],

  // participation
  participantsStyle: 'margin: 0.8em;',
  participantsBlock: 'height: 1.5em; width: 1.5em; margin: 0.3em; border 0.01em solid #888;',
  personTableTD: 'vertical-align: middle;',

  // tabs
  tabsNavElement: 'margin: 0;',
  tabsRootElement: 'display: flex; height: 100%; width: 100%;',
  tabsMainElement: 'margin: 0; width:100%; height: 100%;',
  tabContainer: 'list-style-type: none; display: flex; height: 100%; width: 100%; margin: 0; padding: 0;',
  makeNewSlot: 'background: none; border: none; font: inherit; cursor: pointer;',
  ellipsis: 'position: absolute; right: 0; bottom: 0; width: 20%; background: none; color: inherit; border: none; padding: 0; font: inherit; cursor: pointer; outline: inherit;'

}

style.setStyle = function setStyle (ele, styleName) {
  ele.style = style[styleName]
}
