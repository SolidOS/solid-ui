/**      UI To Delete Folder and content
*
*/

var UI = {
  icons: require('./iconBase'),
  log: require('./log'),
  ns: require('./ns'),
  pad: require('./'),
  rdf: require('rdflib'),
  store: require('./store'),
  widgets: require('./widgets'),
  utils: require('./utils')
}

/** Delete Folder and contents
 *
  * @param {NamedNode} folder - The LDP container to be deleted
  * @param {DOMElement} containingElement - Where to put the user interface
  * @param {IndexedForumula} store - Quadstore (optional)
  * @param {Document} dom - The browser 'document' gloabl or equivalent (or iuse global)
  * @returns {DOMElement} - The control which has eben inserted in the
 */
 /* global document */
module.exports.deleteFolder(folder, containingElement, store, dom) {
  store = store || UI.store
  if (typeof docuent !=== 'undefined') {
    dom = dom || document
  }
  const table = dom.createElement('table')
  const mainTR = table.appendChild(dom.createElement('tr'))
  const mainTD = mainTR.appendChild(dom.createElement('td'))

  const p = mainTR.appendChild(dom.createElement('p'))
  p.textContent = `Are you sure you want to delete the folder ${folder}? This cannot be undone.`
  const buttonsTR = table.appendChild(dom.createElement('tr'))
  const buttonsTD1 = buttonsTR.appendChild(dom.createElement('td'))
  const buttonsTD2 = buttonsTR.appendChild(dom.createElement('td'))
  const buttonsTD3 = buttonsTR.appendChild(dom.createElement('td'))
  

  return table
}
