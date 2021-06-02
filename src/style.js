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
  formSelectSTyle:
    'background-color: #eef; padding: 0.5em;  border: .05em solid #88c;  border-radius:0.2em; font-size: 100%; margin:0.2em;',
  textInputStyle:
    'background-color: #eef; padding: 0.5em;  border: .05em solid #88c;  border-radius:0.2em; font-size: 100%; margin:0.2em;',
  textInputStyleUneditable: // Color difference only
    'background-color: white; padding: 0.5em;  border: .05em solid white;  border-radius:0.2em; font-size: 100%; margin:0.2em; ',
  textInputSize: 20, // Default text input size in characters roughly
  buttonStyle:
      'background-color: #fff; padding: 0.7em;  border: .01em solid white;  border-radius:0.2em; font-size: 100%; margin: 0.3em;', // 'background-color: #eef;
  commentStyle: 'padding: 0.7em;  border: none; font-size: 100%; white-space: pre-wrap;',
  iconStyle: 'width: 3em; height: 3em; margin: 0.1em; border-radius: 1em;',
  classIconStyle: 'width: 3em; height: 3em; margin: 0.1em; border-radius: 0.2em; border: 0.1em solid green; padding: 0.2em; background-color: #efe;', // combine with buttonStyle
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
  signInButtonStyle: 'padding: 1em; border-radius:0.2em; margin: 2em; font-size: 100%;', // was 0.5em radius

  // Forms
  heading1Style: 'font-size: 180%; font-weight: bold; color: #888888; padding: 0.5em; margin: 0.7em 0.0m;', // originally was brown; now grey
  heading2Style: 'font-size: 130%; font-weight: bold; color: #888888; padding: 0.4em; margin: 0.7em 0.0em;', // originally was brown; now grey
  heading3Style: 'font-size: 120%; font-weight: bold; color: #888888; padding: 0.3em; margin: 0.7em 0.0em;', // For example, in large forms or before a small form
  heading4Style: 'font-size: 110%; font-weight: bold; color: #888888; padding: 0.2em; margin: 0.7em 0.0em;', // Lowest level used by default in small things

  formBorderColor: formBorderColor, // originally was brown; now grey
  formHeadingColor: '#888888', // originally was brown; now grey
  formHeadingStyle: 'font-size: 110%; font-weight: bold; color: #888888; padding: 0.2em;  margin: 0.7em 0.0em;', // originally was brown; now grey
  formTextInput: 'font-size: 100%; margin: 0.1em; padding: 0.1em;', // originally used this
  formGroupStyle: [`padding-left: 0em; border: 0.0em solid ${formBorderColor}; border-radius: 0.2em;`, // weight 0
    `padding-left: 2em; border: 0.05em solid ${formBorderColor}; border-radius: 0.2em;`,
    `padding-left: 2em; border: 0.1em solid ${formBorderColor}; border-radius: 0.2em;`,
    `padding-left: 2em; border: 0.2em solid ${formBorderColor}; border-radius: 0.2em;` // @@ pink
  ],

  formFieldLabelStyle: `'color: ${lowProfileLinkColor}; text-decoration: none;'`,
  formFieldNameBoxWidth: formFieldNameBoxWidth,
  formFieldNameBoxStyle: `padding: 0.3em; vertical-align: middle; width:${formFieldNameBoxWidth};`,
  textInputBackgroundColor: '#eef',
  textInputBackgroundColorUneditable: '#fff',
  textInputColor: '#000',
  textInputColorPending: '#888',
  multilineTextInputStyle: 'font-size:100%; white-space: pre-wrap; background-color: #eef;' +
  ' border: 0.07em solid gray; padding: 1em 0.5em; margin: 1em 1em;',

  checkboxStyle: 'colour: black; font-size: 100%; padding-left: 0.5 em; padding-right: 0.5 em;'

}

style.setStyle = function setStyle (ele, styleName) {
  ele.style = style[styleName]
}

module.exports = style // @@ No way to do this in ESM
