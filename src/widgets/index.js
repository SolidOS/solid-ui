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
/* eslint-disable no-console */

// Each widget should ideally live in its own file.  In order to break up this
// monolithic widget index over time, we should add new widgets to the
// 'lib/widgets/' directory, and re-export them by merging the module namespaces:
//
// (In order to avoid name collisions, it is safely assumed that modules don't
// export widgets with the same name)

export * from './peoplePicker'
export * from './dragAndDrop'
export * from './buttons'
export * from './buttons/iconLinks'
export * from './error'
export * from './forms'

export * from './forms/autocomplete/autocompleteBar'
export * from './forms/autocomplete/autocompletePicker'

export * as publicData from './forms/autocomplete/publicData'

/*
import * as peoplePicker from './peoplePicker'
import * as dragAndDrop from './dragAndDrop'
import * as buttons from './buttons'
import * as error from './error'
import { forms } from './forms'

const widgets = Object.assign(
  {},
  buttons,
  peoplePicker,
  dragAndDrop,
  error,
  forms
)

// export default widgets .. Policy is not to use exports default
module.export = widgets // @@ Apparently no way to do this (yet?) in esm
console.log('widgets exported:', widgets)
*/
// ends
