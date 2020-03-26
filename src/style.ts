// Common readable consistent stylesheet
// to avoid using style sheets which are document-global
// and make programmable style toggling with selection, drag over, etc easier

// These must all end with semicolon so they can be appended to.

const textInputStyle = 'background-color: #eef; padding: 0.5em;  border: .05em solid #88c;  border-radius:0.2em; font-size: 100%; margin:0.2em; '
const buttonStyle = 'background-color: #fff; padding: 0.7em;  border: .01em solid white;  border-radius:0.2em; font-size: 100%;' // 'background-color: #eef;
const textButtonStyle = 'background-color: #fff; padding: 0.7em;  border: .01em solid grey; border-radius:0.2em; font-size: 100%;' // 'background-color: #eef;
// The width of the text field must bot be 100% or it switches to overlapping

const iconStyle = 'width: 3em; height: 3em; margin: 0.1em; border-radius: 1em;'
const classIconStyle = 'width: 3em; height: 3em; margin: 0.1em; border-radius: 0; border: 0.1em solid green; padding: 0.2em; background-color: #efe;' // combine with buttonStyle

const messageBodyStyle = 'white-space: pre-wrap; width: 99%; font-size:100%; border: 0.07em solid #eee; border-radius:0.2em; padding: .3em 0.5em; margin: 0.1em;'
const pendingeditModifier = 'color: #bbb;'
const highlightColor = '#7C4DFF' // Solid lavendar https://design.inrupt.com/atomic-core/?cat=Core
// Login buttons
const signInButtonStyle = 'padding: 1em; border-radius:0.2em; margin: 2em; font-size: 100%;' // was 0.5em radius
// Forms
const formBorderColor = '#888888' // originall was brown now grey
const formHeadingColor = '#888888' // originall was brown now grey
const formTextInput = 'font-size: 100%; margin: 0.1em; padding: 0.1em;' // originally used this

const multilineTextInputStyle = 'font-size:100%; white-space: pre-wrap; background-color: #eef;' +
  ' border: 0.07em solid gray; padding: 1em 0.5em; margin: 1em 1em;'

export {
  textInputStyle, buttonStyle, textButtonStyle, iconStyle, classIconStyle, messageBodyStyle,
  pendingeditModifier, highlightColor, signInButtonStyle, formBorderColor, formHeadingColor, formTextInput, multilineTextInputStyle
}
