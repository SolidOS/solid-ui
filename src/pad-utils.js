
const $rdf = require('rdflib')
const ns = require('./ns')
const utils = require('./utils')

const PAD = $rdf.Namespace('http://www.w3.org/ns/pim/pad#')

/* Get the chunbks of the noepad
*
* They are stored in a RDF linked list
*/
export function getChunks (subject, kb) {
  var chunks = []
  for (
    let chunk = kb.the(subject, PAD('next'));
    !chunk.sameTerm(subject);
    chunk = kb.the(chunk, PAD('next'))
  ) {
    chunks.push(chunk)
  }
  return chunks
}

/** Export a HTML string version of a notepad
* @@ no style at the moment
*
*/
export function notePadToHTML (pad, kb) {
  const chunks = getChunks(pad, kb)
  var html = '<html>\n<head>\n'
  const title = kb.anyValue(pad, ns.dct('title')) || kb.anyValue(pad, ns.dc('title'))
  if (title) {
    html += `  <title>${utils.escapeForXML(title)}</title>\n`
  }
  html += '</head>\n<body>\n'
  var level = 0
  function increaseLevel (indent) {
    for (; level < indent; level++) {
      html += '<ul>\n'
    }
  }
  function decreaseLevel (indent) {
    for (; level > indent; level--) {
      html += '</ul>\n'
    }
  }
  chunks.forEach(chunk => {
    const indent = kb.anyJS(chunk, PAD('indent'))
    const rawContent = kb.anyJS(chunk, ns.sioc('content'))
    if (!rawContent) return // seed chunk is dummy
    const content = utils.escapeForXML(rawContent)
    if (indent < 0) { // negative indent levels represenmt heading levels
      decreaseLevel(0)
      const h = indent >= -3 ? 4 + indent : 1 // -1 -> h4, -2 -> h3
      html += `\n<h${h}>${content}</h${h}>\n`
    } else { // >= 0
      if (indent > 0) { // Lists
        decreaseLevel(indent)
        increaseLevel(indent)
        html += `<li>${content}</li>\n`
      } else { // indent 0
        decreaseLevel(indent)
        html += `<p>${content}</p>\n`
      }
    }
  }) // foreach chunk
  // At the end decreaseLevel any open ULs
  decreaseLevel(0)
  html += '</body>\n</html>\n'
  return html
}
