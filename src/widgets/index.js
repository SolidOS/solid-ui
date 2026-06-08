/**
 * General purpose utility functions used in the panes
 * oshani@csail.mit.edu
 *
 * Includes form-oriented widgets  timbl@w3.org
 *
 * sign-in sign-up widgets are in signin.js
 *
 *  Note... For pointers to posssible text-editing code, see
 *  http://stackoverflow.com/questions/6756407/what-contenteditable-editors
 */

// Each widget should ideally live in its own file.  In order to break up this
// monolithic widget index over time, we should add new widgets to the
// 'lib/widgets/' directory, and re-export them by merging the module namespaces:
//
// (In order to avoid name collisions, it is safely assumed that modules don't
// export widgets with the same name)

import * as $rdf from 'rdflib'

export * from './peoplePicker'
export * from './dragAndDrop'
export * from './buttons'
export * from './buttons/iconLinks'
export * from './error'

/** Mint local ID using timestamp
 * @param {NamedNode} doc - the document in which the ID is to be generated
 */
export function newThing (doc) {
  const now = new Date()
  return $rdf.sym(doc.uri + '#' + 'id' + ('' + now.getTime()))
}
