// Common readable consistent stylesheet
// to avoid using style sheets which are document-global
// and make programmable style toggling with selection, drag over, etc easier

// These must all end with semicolon so they can be appended to.

const styles = {
  textInputStyle: 'background-color: #eef; padding: 0.5em;  border: .5em solid white; font-size: 100%;',
  buttonStyle: 'background-color: #fff; padding: 0.5em;  border: .01em solid white; font-size: 100%;', // 'background-color: #eef;
// The width of the text field must bot be 100% or it switches to overlapping
  messageBodyStyle: 'white-space: pre-wrap; width: 99%; font-size:100%; border: 0.07em solid #eee; padding: .3em 0.5em; margin: 0.1em;',
  pendingeditModifier: 'color: #bbb;'

}
export default styles
