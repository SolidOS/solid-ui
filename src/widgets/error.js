module.exports.errorMessageBlock = errorMessageBlock

function errorMessageBlock (dom, msg, backgroundColor) {
  var div = dom.createElement('div')
  div.setAttribute(
    'style',
    'margin: 0.1em; padding: 0.5em; border: 0.05em solid gray; background-color: ' +
      (backgroundColor || '#fee') +
      '; color:black;'
  )
  div.textContent = msg
  return div
}
