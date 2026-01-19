// Common readable consistent stylesheet
// to avoid using style sheets which are document-global
// and make programmable style toggling with selection, drag over, etc easier
// These must all end with semicolon so they can be appended to.
//
// PHASE 1: Hybrid mode - CSS variables with fallbacks
// CSS variables (--sui-*) are provided by themes/foundation/variables.css
// Fallback values preserve original appearance when themes aren't loaded

import styleConstants from './styleConstants'

export const style = { // styleModule

  checkboxStyle: 'color: var(--sui-text, black); font-size: 100%; padding-left: 0.5em; padding-right: 0.5em;',
  checkboxInputStyle: 'font-size: 100%; height: 1em; width: 1em; background-color: var(--sui-bg-input, #eef); border-radius: var(--sui-border-radius-sm, 0.2em); margin: 0.1em;',

  fieldLabelStyle: 'color: var(--sui-text-link, #3B5998); text-decoration: none;',
  formSelectStyle:
    'background-color: var(--sui-bg-input, #eef); padding: var(--sui-input-padding, 0.5em); border: var(--sui-border-width, 0.05em) solid var(--sui-form-border-color, #88c); border-radius: var(--sui-border-radius-sm, 0.2em); font-size: 100%; margin: var(--sui-input-margin, 0.4em);',
  textInputStyle:
    'background-color: var(--sui-bg-input, #eef); padding: var(--sui-input-padding, 0.5em); border: var(--sui-border-width, 0.05em) solid var(--sui-form-border-color, #88c); border-radius: var(--sui-border-radius-sm, 0.2em); font-size: 100%; margin: var(--sui-input-margin, 0.4em);',
  textInputStyleUneditable: // Color difference only
    'background-color: var(--sui-bg-panel, white); padding: var(--sui-input-padding, 0.5em); border: var(--sui-border-width, 0.05em) solid var(--sui-bg-panel, white); border-radius: var(--sui-border-radius-sm, 0.2em); font-size: 100%; margin: var(--sui-input-margin, 0.4em);',
  buttonStyle:
      'background-color: var(--sui-bg-button, #fff); padding: var(--sui-button-padding, 0.7em); border: 0.01em solid var(--sui-border-color, white); border-radius: var(--sui-border-radius-sm, 0.2em); font-size: 100%; margin: var(--sui-button-margin, 0.3em);',
  commentStyle: 'padding: var(--sui-button-padding, 0.7em); border: none; font-size: 100%; white-space: pre-wrap;',
  iconStyle: 'width: var(--sui-icon-size, 1.5em); height: var(--sui-icon-size, 1.5em); margin: 0.1em; border-radius: var(--sui-border-radius-lg, 1em);',
  smallButtonStyle: 'margin: 0.2em; width: 1em; height: 1em;',
  classIconStyle: 'width: var(--sui-icon-class-size, 3em); height: var(--sui-icon-class-size, 3em); margin: 0.1em; border-radius: var(--sui-border-radius-sm, 0.2em); border: 0.1em solid var(--sui-group-1, green); padding: 0.2em; background-color: #efe;',
  confirmPopupStyle: 'padding: var(--sui-button-padding, 0.7em); border-radius: var(--sui-border-radius-sm, 0.2em); border: 0.1em solid var(--sui-warning, orange); background-color: var(--sui-bg-panel, white); box-shadow: var(--sui-shadow, 0.5em 0.9em #888);',
  messageBodyStyle:
    'white-space: pre-wrap; width: 99%; font-size: 100%; border: 0.07em solid var(--sui-border-color, #eee); border-radius: var(--sui-border-radius-sm, 0.2em); padding: 0.3em 0.5em; margin: 0.1em;',
  pendingeditModifier: 'color: var(--sui-text-muted, #bbb);',

  // Contacts
  personaBarStyle: 'width: 100%; height: 4em; background-color: var(--sui-bg-hover, #eee); vertical-align: middle;',
  searchInputStyle: 'border: 0.1em solid var(--sui-border-color-dark, #444); border-radius: var(--sui-border-radius-sm, 0.2em); width: 100%; font-size: 100%; padding: 0.1em 0.6em; margin: 0.2em;',
  autocompleteRowStyle: 'border: 0.2em solid var(--sui-warning, straw);',

  // Login buttons
  signInAndUpButtonStyle: 'padding: 1em; border-radius: var(--sui-border-radius-sm, 0.2em); font-size: 100%;',
  headerBannerLoginInput: 'margin: 0.75em 0 0.75em 0.5em !important; padding: var(--sui-input-padding, 0.5em) !important;',
  signUpBackground: 'background-color: var(--sui-bg-input, #eef);',
  signInBackground: 'background-color: var(--sui-bg-active, #efe);',

  // Forms
  heading1Style: 'font-size: 180%; font-weight: bold; color: var(--sui-primary, #7C4DFF); padding: var(--sui-space-sm, 0.5em); margin: 0.7em 0;',
  heading2Style: 'font-size: 130%; font-weight: bold; color: var(--sui-primary, #7C4DFF); padding: 0.4em; margin: 0.7em 0;',
  heading3Style: 'font-size: 120%; font-weight: bold; color: var(--sui-primary, #7C4DFF); padding: 0.3em; margin: 0.7em 0;',
  heading4Style: 'font-size: 110%; font-weight: bold; color: var(--sui-primary, #7C4DFF); padding: 0.2em; margin: 0.7em 0;',

  formHeadingStyle: 'font-size: 110%; font-weight: bold; color: var(--sui-primary, #7C4DFF); padding: 0.2em; margin: 0.7em 0;',
  formTextInput: 'font-size: 100%; margin: 0.1em; padding: 0.1em;',
  formGroupStyle: [`padding-left: 0; border: 0 solid var(--sui-form-border-color, ${styleConstants.formBorderColor}); border-radius: var(--sui-border-radius-sm, 0.2em);`,
    `padding-left: 2em; border: var(--sui-border-width, 0.05em) solid var(--sui-form-border-color, ${styleConstants.formBorderColor}); border-radius: var(--sui-border-radius-sm, 0.2em);`,
    `padding-left: 2em; border: 0.1em solid var(--sui-form-border-color, ${styleConstants.formBorderColor}); border-radius: var(--sui-border-radius-sm, 0.2em);`,
    `padding-left: 2em; border: 0.2em solid var(--sui-form-border-color, ${styleConstants.formBorderColor}); border-radius: var(--sui-border-radius-sm, 0.2em);`
  ],

  formFieldLabelStyle: `color: var(--sui-text-link, ${styleConstants.lowProfileLinkColor}); text-decoration: none;`,
  formFieldNameBoxStyle: `padding: 0.3em; vertical-align: middle; width: ${styleConstants.formFieldNameBoxWidth};`,
  multilineTextInputStyle: 'font-size: 100%; white-space: pre-wrap; background-color: var(--sui-bg-input, #eef); border: 0.07em solid var(--sui-border-color-dark, gray); padding: 1em 0.5em; margin: 1em;',

  // Panes
  folderPaneStyle: 'border-top: solid 1px var(--sui-border-color, #777); border-bottom: solid 1px var(--sui-border-color, #777); margin-top: var(--sui-space-md, 0.5em); margin-bottom: var(--sui-space-md, 0.5em); background-color: var(--sui-bg-panel, white); color: var(--sui-text, black); font-family: var(--sui-font-family, sans-serif);',
  sidebarComponentStyle: 'padding: var(--sui-space-md, 0.5em); width: 100%; background-color: var(--sui-bg-panel, white); color: var(--sui-text, black); font-family: var(--sui-font-family, sans-serif);',
  sidebarStyle: 'overflow-x: auto; overflow-y: auto; border-radius: var(--sui-border-radius, 0.5em); border: 0.1em solid var(--sui-border-color, white); background-color: var(--sui-bg-panel, white);',
  sourcePaneStyle: 'font-family: var(--sui-font-family-mono, monospace); font-size: 100%; width: 100%; max-width: 60em; margin: 1em 0.2em 1em 0.2em; padding: var(--sui-space-lg, 1em); border: 0.1em solid var(--sui-border-color, #888); border-radius: var(--sui-border-radius, 0.5em); background-color: var(--sui-bg-panel, white); color: var(--sui-text, black);',

  // Buttons
  renderAsDivStyle: 'display: flex; align-items: center; justify-content: space-between; height: var(--sui-avatar-size, 2.5em); padding: 1em;',
  imageDivStyle: 'width: var(--sui-avatar-size, 2.5em); padding: 0.5em; height: var(--sui-avatar-size, 2.5em);',
  linkDivStyle: 'width: var(--sui-icon-size, 2em); padding: 0.5em; height: 4em;',

  // ACL
  aclControlBoxContainer: 'margin: 1em;',
  aclControlBoxHeader: 'font-size: var(--sui-space-md, 1em);',
  aclControlBoxHeader: 'font-size: 120%; margin: 0 0 1rem;',
  aclControlBoxStatus: 'display: none; margin: 1rem 0;',
  aclControlBoxStatusRevealed: 'display: block;',
  aclGroupContent: 'maxWidth: 650;',
  accessGroupList: 'display: grid; grid-template-columns: 1fr; margin: var(--sui-space-md, 1em); width: 100%;',
  accessGroupListItem: 'display: grid; grid-template-columns: 100px auto 30%;',
  defaultsController: 'display: flex;',
  defaultsControllerNotice: 'color: var(--sui-text-muted, #888); flexGrow: 1; fontSize: 80%;',
  bigButton: 'background-color: var(--sui-bg-panel, white); border: 0.1em solid var(--sui-border-color-dark, #888); border-radius: var(--sui-border-radius, 0.3em); max-width: 50%; padding-bottom: var(--sui-space-md, 1em); padding-top: var(--sui-space-md, 1em);',
  group: 'color: var(--sui-group-default, #888);',
  group1: 'color: var(--sui-group-1, green);',
  group2: 'color: var(--sui-group-2, #cc0);',
  group3: 'color: var(--sui-group-3, orange);',
  group5: 'color: var(--sui-group-5, red);',
  group9: 'color: var(--sui-group-9, blue);',
  group13: 'color: var(--sui-group-13, purple);',
  trustedAppAddApplicationsTable: 'background-color: var(--sui-bg-panel, #eee);',
  trustedAppCancelButton: 'float: right;',
  trustedAppControllerI: 'border-color: var(--sui-warning, orange); border-radius: var(--sui-border-radius-lg, 1em); border-width: 0.1em;',
  temporaryStatusInit: 'background: var(--sui-success, green);',
  temporaryStatusEnd: 'background: transparent; transition: background 5s linear;',

  // header
  headerUserMenuLink: 'background: none; border: 0; color: var(--sui-text, black); cursor: pointer; display: block; font-family: Arial; font-size: 1em; text-align: left; padding: var(--sui-space-md, 1em); width: 100%; text-decoration: none;',
  headerUserMenuLinkHover: 'background: none; border: 0; color: var(--sui-text, black); cursor: pointer; display: block; font-family: Arial; font-size: 1em; text-align: left; padding: var(--sui-space-md, 1em); width: 100%; text-decoration: none; background-image: var(--sui-header-gradient, linear-gradient(to right, #7C4DFF 0%, #18A9E6 50%, #01C9EA 100%));',
  headerUserMenuTrigger: 'background: none; border: 0; cursor: pointer; width: var(--sui-header-height, 60px); height: var(--sui-header-height, 60px);',
  headerUserMenuTriggerImg: 'border-radius: var(--sui-border-radius-full, 50%); height: 56px; width: 28px !important;',
  headerUserMenuButton: 'background: none; border: 0; color: var(--sui-text, black); cursor: pointer; display: block; font-family: Arial; font-size: 1em; text-align: left; padding: var(--sui-space-md, 1em); width: 100%;',
  headerUserMenuButtonHover: 'background: none; border: 0; color: var(--sui-text, black); cursor: pointer; display: block; font-family: Arial; font-size: 1em; text-align: left; padding: var(--sui-space-md, 1em); width: 100%; background-image: var(--sui-header-gradient, linear-gradient(to right, #7C4DFF 0%, #18A9E6 50%, #01C9EA 100%));',
  headerUserMenuList: 'list-style: none; margin: 0; padding: 0;',
  headerUserMenuListDisplay: 'list-style: none; margin: 0; padding: 0; display:true;',
  headerUserMenuNavigationMenu: 'background: var(--sui-bg-panel, white); border: solid 1px var(--sui-text, #000000); border-right: 0; position: absolute; right: 0; top: var(--sui-header-height, 60px); width: 200px; z-index: var(--sui-z-dropdown, 1); display: true;',
  headerUserMenuNavigationMenuNotDisplayed: 'background: var(--sui-bg-panel, white); border: solid 1px var(--sui-text, #000000); border-right: 0; position: absolute; right: 0; top: var(--sui-header-height, 60px); width: 200px; z-index: var(--sui-z-dropdown, 1); display: none;',
  headerUserMenuListItem: 'border-bottom: solid 1px var(--sui-text, #000000);',
  headerUserMenuPhoto: 'border-radius: var(--sui-border-radius-full, 50%); background-position: center; background-repeat: no-repeat; background-size: cover; height: 50px; width: 50px;',
  headerBanner: 'background: var(--sui-bg-header, white); box-shadow: var(--sui-header-shadow, 0px 1px 4px #000000); display: flex; justify-content: space-between; padding: 0 var(--sui-space-lg, 1.5em);',
  headerBannerRightMenu: 'display: flex;',
  headerBannerLogin: 'margin-left: auto;',
  allChildrenVisible: 'display: true;',
  headerBannerUserMenu: 'border-left: solid 1px var(--sui-text, #000000); margin-left: auto;',
  headerBannerHelpMenu: 'border-left: solid 1px var(--sui-text, #000000); margin-left: auto;',
  headerBannerIcon: 'background-size: 65px var(--sui-header-height, 60px) !important; height: var(--sui-header-height, 60px) !important; width: 65px !important;',

  // footer
  footer: 'border-top: solid 1px var(--sui-border-color, #ccc); font-size: 0.9em; padding: var(--sui-space-sm, 0.5em) var(--sui-space-lg, 1.5em);',

  // buttons
  primaryButton: 'background-color: var(--sui-primary-light, #7c4dff); color: var(--sui-text-on-primary, #ffffff); font-family: var(--sui-font-family, Raleway, Roboto, sans-serif); border-radius: var(--sui-border-radius, 0.25em); border-color: var(--sui-primary-light, #7c4dff); border: 1px solid; cursor: pointer; font-size: 0.8em; text-decoration: none; padding: var(--sui-button-padding-sm, 0.5em 4em); transition: var(--sui-transition, 0.25s all ease-in-out); outline: none;',
  primaryButtonHover: 'background-color: var(--sui-primary, #9f7dff); color: var(--sui-text-on-primary, #ffffff); font-family: var(--sui-font-family, Raleway, Roboto, sans-serif); border-radius: var(--sui-border-radius, 0.25em); border-color: var(--sui-primary-light, #7c4dff); border: 1px solid; cursor: pointer; font-size: 0.8em; text-decoration: none; padding: var(--sui-button-padding-sm, 0.5em 4em); transition: var(--sui-transition, 0.25s all ease-in-out); outline: none;',
  primaryButtonNoBorder: 'background-color: var(--sui-bg-panel, #ffffff); color: var(--sui-primary-light, #7c4dff); font-family: var(--sui-font-family, Raleway, Roboto, sans-serif); border-radius: var(--sui-border-radius, 0.25em); border-color: var(--sui-primary-light, #7c4dff); border: 1px solid; cursor: pointer; font-size: 0.8em; text-decoration: none; padding: var(--sui-button-padding-sm, 0.5em 4em); transition: var(--sui-transition, 0.25s all ease-in-out); outline: none;',
  primaryButtonNoBorderHover: 'background-color: var(--sui-primary-light, #7c4dff); color: var(--sui-text-on-primary, #ffffff); font-family: var(--sui-font-family, Raleway, Roboto, sans-serif); border-radius: var(--sui-border-radius, 0.25em); border-color: var(--sui-primary-light, #7c4dff); border: 1px solid; cursor: pointer; font-size: 0.8em; text-decoration: none; padding: var(--sui-button-padding-sm, 0.5em 4em); transition: var(--sui-transition, 0.25s all ease-in-out); outline: none;',
  secondaryButton: 'background-color: var(--sui-accent, #01c9ea); color: var(--sui-text-on-primary, #ffffff); font-family: var(--sui-font-family, Raleway, Roboto, sans-serif); border-radius: var(--sui-border-radius, 0.25em); border-color: var(--sui-accent, #01c9ea); border: 1px solid; cursor: pointer; font-size: 0.8em; text-decoration: none; padding: var(--sui-button-padding-sm, 0.5em 4em); transition: var(--sui-transition, 0.25s all ease-in-out); outline: none;',
  secondaryButtonHover: 'background-color: var(--sui-info, #37cde6); color: var(--sui-text-on-primary, #ffffff); font-family: var(--sui-font-family, Raleway, Roboto, sans-serif); border-radius: var(--sui-border-radius, 0.25em); border-color: var(--sui-primary-light, #7c4dff); border: 1px solid; cursor: pointer; font-size: 0.8em; text-decoration: none; padding: var(--sui-button-padding-sm, 0.5em 4em); transition: var(--sui-transition, 0.25s all ease-in-out); outline: none;',
  secondaryButtonNoBorder: 'background-color: var(--sui-bg-panel, #ffffff); color: var(--sui-accent, #01c9ea); font-family: var(--sui-font-family, Raleway, Roboto, sans-serif); border-radius: var(--sui-border-radius, 0.25em); border-color: var(--sui-accent, #01c9ea); border: 1px solid; cursor: pointer; font-size: 0.8em; text-decoration: none; padding: var(--sui-button-padding-sm, 0.5em 4em); transition: var(--sui-transition, 0.25s all ease-in-out); outline: none;',
  secondaryButtonNoBorderHover: 'background-color: var(--sui-accent, #01c9ea); color: var(--sui-text-on-primary, #ffffff); font-family: var(--sui-font-family, Raleway, Roboto, sans-serif); border-radius: var(--sui-border-radius, 0.25em); border-color: var(--sui-accent, #01c9ea); border: 1px solid; cursor: pointer; font-size: 0.8em; text-decoration: none; padding: var(--sui-button-padding-sm, 0.5em 4em); transition: var(--sui-transition, 0.25s all ease-in-out); outline: none;',

  // media
  controlStyle: `border-radius: var(--sui-border-radius, 0.5em); margin: 0.8em; width: ${styleConstants.mediaModuleCanvasWidth}; height: ${styleConstants.mediaModuleCanvasHeight};`,

  // dragAndDrop
  dragEvent: 'background-color: var(--sui-bg-hover, #ccc); border: 0.25em dashed var(--sui-text, black); border-radius: var(--sui-border-radius, 0.3em);',
  dropEvent: 'background-color: var(--sui-bg-panel, white); border: 0 solid var(--sui-text, black);',
  restoreStyle: 'background-color: var(--sui-bg-panel, white);',

  // errors
  errorCancelButton: 'width: var(--sui-icon-size, 2em); height: var(--sui-icon-size, 2em); align: right;',
  errorMessageBlockStyle: 'margin: 0.1em; padding: var(--sui-space-sm, 0.5em); border: var(--sui-border-width, 0.05em) solid var(--sui-border-color-dark, gray); color: var(--sui-text, black);',

  // pad
  notepadStyle: 'padding: var(--sui-space-md, 1em); overflow: auto; resize: horizontal; min-width: 40em;',
  upstreamStatus: 'width: 50%;',
  downstreamStatus: 'width: 50%;',
  baseStyle: 'font-size: 100%; font-family: var(--sui-font-family-mono, monospace); width: 100%; border: none; white-space: pre-wrap;',
  headingCore: 'font-family: var(--sui-font-family, sans-serif); font-weight: bold; border: none;',
  headingStyle: [
    'font-size: 110%; padding-top: var(--sui-space-sm, 0.5em); padding-bottom: var(--sui-space-sm, 0.5em); width: 100%;',
    'font-size: 120%; padding-top: var(--sui-space-md, 1em); padding-bottom: var(--sui-space-md, 1em); width: 100%;',
    'font-size: 150%; padding-top: var(--sui-space-md, 1em); padding-bottom: var(--sui-space-md, 1em); width: 100%;'
  ],

  // participation
  participantsStyle: 'margin: 0.8em;',
  participantsBlock: 'height: 1.5em; width: 1.5em; margin: 0.3em; border: 0.01em solid var(--sui-border-color-dark, #888);',
  personTableTD: 'vertical-align: middle;',

  // tabs
  tabsNavElement: 'margin: 0;',
  tabsRootElement: 'display: flex; height: 100%; width: 100%;',
  tabsMainElement: 'margin: 0; width: 100%; height: 100%;',
  tabContainer: 'list-style-type: none; display: flex; height: 100%; width: 100%; margin: 0; padding: 0;',
  makeNewSlot: 'background: none; border: none; font: inherit; cursor: pointer;',
  ellipsis: 'position: absolute; right: 0; bottom: 0; width: 20%; background: none; color: inherit; border: none; padding: 0; font: inherit; cursor: pointer; outline: inherit;'

}

style.setStyle = function setStyle (ele, styleName) {
  ele.style = style[styleName]
}
