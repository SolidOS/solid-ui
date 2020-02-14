
const $rdf = require('rdflib')
const ns = require('./ns')
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

/** Encode content to be put in XML or HTML elements
*/
export function xmlEncode (str) {
  return str.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
}

/** Export a HTML string version of a notepad
* @@ no style at the moment
*
*/
export function notePadToHTML (pad, kb) {
  const chunks = getChunks(pad, kb)
  var html = '<html>\n  <head>\n'
  const title = kb.anyValue(pad, ns.DCT('title'))
  if (title) {
    html += `    <title>${xmlEncode(title)}</title>\n`
  }
  html += '  </head>\n  <body>\n'
  var level = 0
  chunks.forEach(chunk => {
    const indent = kb.anyJS(chunk, PAD('indent'))
    const rawContent = kb.anyJS(chunk, PAD('content'))
    const content = xmlEncode(rawContent)
    if (indent < 0) { // negative indent levels represenmt headding levels
      for (; level > 0; level--) {
        html += '</ul>\n'
      }
      const h = level >= -4 ? 5 + level : 1 // -1 -> h4, -2 -> h3
      html += `\n<h${h}>${content}</h${h}>\n`
    } else { // >= 0
      if (indent > 0) {
        for (; level < indent; level++) {
          html += '<ul>\n'
        }
        html += `<li>${content}</li/\n`
      } else {
        html += `<p>${content}</p/\n`
      }
    }
    for (; level > 0; level--) {
      html += '</ul>\n'
    }
  }) // foreach chunk
  html += '  </body>\n</html>\n'
  return html
}
