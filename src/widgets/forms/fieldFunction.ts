import { Node } from 'rdflib'
import store from '../../store'
import { debug } from '../../log'
import { errorMessageBlock } from '../error'

export const field: { [classUri: string]: FieldFunction } = {} // Form field functions by URI of field type.

export type FieldFunction = (
  dom: HTMLDocument, // the DOM
  container: HTMLElement | undefined, // if defined, the box will be appended to it
  already: { }, // used to avoid looping in nested forms
  subject: Node, // the thing for which data will be loaded into the form element
  form: Node, // the RDF declaration for what the form should have
  doc: Node, // the online RDF document for data binding (form input values will be read/saved automatically)
  callbackFunction: (ok: boolean, errorMessage: string) => void // this will be called when data changes (TODO: check this with unit tests)
) => HTMLElement

/**
 * Which class of field is this?
 *
 * @param x a field
 * @returns the URI of the most specific class
 */
export function mostSpecificClassURI (x: Node): string {
  const kb = store
  const ft = kb.findTypeURIs(x)
  const bot = kb.bottomTypeURIs(ft) // most specific
  console.log(x, ft, bot)
  const bots: any[] = []
  for (const b in bot) bots.push(b)
  // if (bots.length > 1) throw "Didn't expect "+x+" to have multiple bottom types: "+bots
  return bots[0]
}

/**
 * Returns a function that creates a form widget
 * @param dom unused
 * @param fieldInQuestion the field for which to create a form, e.g. namedNode('https://timbl.com/timbl/Public/Test/Forms/individualForm.ttl#fullNameField')
 */
export function fieldFunction (dom: any /* unused */, fieldInQuestion: Node): FieldFunction {
  const uri = mostSpecificClassURI(fieldInQuestion) // What type
  // const uri = field.uri
  const fun = field[uri]
  console.log(uri, field, fieldInQuestion)
  debug(
    'paneUtils: Going to implement field ' + fieldInQuestion + ' of type ' + uri
  )
  if (!fun) {
    return function (dom2: HTMLDocument, container?: HTMLElement): HTMLElement {
      const box = errorMessageBlock(
        dom2,
        'No handler for field ' + fieldInQuestion + ' of type ' + uri
      )
      if (container) container.appendChild(box)

      return box
    }
  }
  return fun
}
