import { Namespace } from 'rdflib'
import store from './store'
import ns from './ns'

const PAD = Namespace('http://www.w3.org/ns/pim/pad#')
/**
 * Get the chunks of the notepad
 * They are stored in a RDF linked list
 */

// @ignore exporting this only for the unit test
export function getChunks (subject, kb) {
  const chunks: any[] = []
  for (
    let chunk = kb.the(subject, PAD('next'));
    !chunk.sameTerm(subject);
    chunk = kb.the(chunk, PAD('next'))
  ) {
    chunks.push(chunk)
  }
  return chunks
}

/**
 *  Encode content to be put in XML or HTML elements
 */
// @ignore exporting this only for the unit test
export function xmlEncode (str) {
  return str.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
}

/**
 * Convert a notepad to HTML
 *   @param { } pad - the notepad
 *   @param {store} pad - the data store
 */
export function notepadToHTML (pad: any, kb: store) {
  const chunks = getChunks(pad, kb)
  let html = '<html>\n  <head>\n'
  const title = kb.anyValue(pad, ns.dct('title'))
  if (title) {
    html += `    <title>${xmlEncode(title)}</title>\n`
  }
  html += '  </head>\n  <body>\n'
  let level = 0

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
    const content = xmlEncode(rawContent)
    if (indent < 0) { // negative indent levels represent heading levels
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
  html += '  </body>\n</html>\n'
  return html
}
