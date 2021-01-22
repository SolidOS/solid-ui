"use strict";

// Common readable consistent stylesheet
// to avoid using style sheets which are document-global
// and make programmable style toggling with selection, drag over, etc easier
// These must all end with semicolon so they can be appended to.
var styleModule = {
  textInputStyle: 'background-color: #eef; padding: 0.5em;  border: .05em solid #88c;  border-radius:0.2em; font-size: 100%; margin:0.2em; ',
  textInputStyleUneditable: // Color difference only
  'background-color: white; padding: 0.5em;  border: .05em solid white;  border-radius:0.2em; font-size: 100%; margin:0.2em; ',
  buttonStyle: 'background-color: #fff; padding: 0.7em;  border: .01em solid white;  border-radius:0.2em; font-size: 100%; margin: 0.3em;',
  // 'background-color: #eef;
  commentStyle: 'padding: 0.7em;  border: none; font-size: 100%; white-space: pre-wrap;',
  iconStyle: 'width: 3em; height: 3em; margin: 0.1em; border-radius: 1em;',
  classIconStyle: 'width: 3em; height: 3em; margin: 0.1em; border-radius: 0; border: 0.1em solid green; padding: 0.2em; background-color: #efe;',
  // combine with buttonStyle
  tabBorderRadius: '0.2em',
  messageBodyStyle: 'white-space: pre-wrap; width: 99%; font-size:100%; border: 0.07em solid #eee; border-radius:0.2em; padding: .3em 0.5em; margin: 0.1em;',
  pendingeditModifier: 'color: #bbb;',
  highlightColor: '#7C4DFF',
  // Solid lavendar https://design.inrupt.com/atomic-core/?cat=Core
  // Contacts
  personaBarStyle: 'width: 100%; height: 4em; background-color: #eee; vertical-align: middle;',
  searchInputStyle: 'border: 0.1em solid #444; border-radius: 0.5em; width: 100%; font-size: 100%; padding: 0.1em 0.6em; margin 0.2em;',
  autocompleteRowStyle: 'border: 0.2em solid straw;',
  // Login buttons
  signInButtonStyle: 'padding: 1em; border-radius:0.2em; margin: 2em; font-size: 100%;',
  // was 0.5em radius
  // Forms
  heading1Style: 'font-size: 180%; font-weight: bold; color: #888888; padding: 0.5em; margin: 0.2em 0.7em;',
  // originally was brown; now grey
  heading2Style: 'font-size: 130%; font-weight: bold; color: #888888; padding: 0.4em; margin: 0.2em 0.7em;',
  // originally was brown; now grey
  heading3Style: 'font-size: 120%; font-weight: bold; color: #888888; padding: 0.3em; margin: 0.2em 0.7em;',
  // For example, in large forms or before a small form
  heading4Style: 'font-size: 110%; font-weight: bold; color: #888888; padding: 0.2em; margin: 0.2em 0.7em;',
  // Lowest level used by default in small things
  formBorderColor: '#888888',
  // originally was brown; now grey
  formHeadingColor: '#888888',
  // originally was brown; now grey
  formHeadingStyle: 'font-size: 110%; font-weight: bold; color: #888888; padding: 0.2em;  margin: 0.2em 0.7em;',
  // originally was brown; now grey
  formTextInput: 'font-size: 100%; margin: 0.1em; padding: 0.1em;',
  // originally used this
  textInputBackgroundColor: '#eef',
  textInputBackgroundColorUneditable: '#fff',
  multilineTextInputStyle: 'font-size:100%; white-space: pre-wrap; background-color: #eef;' + ' border: 0.07em solid gray; padding: 1em 0.5em; margin: 1em 1em;',
  checkboxStyle: 'colour: black; font-size: 100%; padding-left: 0.5 em; padding-right: 0.5 em;',
  setStyle: function setStyle(ele, styleName) {
    ele.style = styleModule[styleName];
  }
};
module.exports = styleModule;
//# sourceMappingURL=style.js.map