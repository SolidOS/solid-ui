import { Node } from 'rdflib'
import store from '../../store'
import { debug } from '../../log'
import { errorMessageBlock } from '../error'

export const field: { [classUri: string]: FieldFunction } = {} // Form field functions by URI of field type.

export type FieldFunction = (
  dom: HTMLDocument,
  container: HTMLElement | undefined,
  already: { },
  subject: Node,
  form: Node,
  doc: Node,
  callbackFunction: (ok: boolean, errorMessage: string) => void
) => HTMLElement

/**
 * Which class of field is this? Relies on http://www.w3.org/2000/01/rdf-schema#subClassOf and
 * https://linkeddata.github.io/rdflib.js/doc/classes/formula.html#bottomtypeuris
 * to find the most specific RDF type if there are multiple.
 *
 * @param x a form field, e.g. `namedNode('https://timbl.com/timbl/Public/Test/Forms/individualForm.ttl#fullNameField')`
 * @returns the URI of the most specific known class, e.g. `http://www.w3.org/ns/ui#SingleLineTextField`
 */
export function mostSpecificClassURI (x: Node): string {
  const kb = store
  const ft = kb.findTypeURIs(x)
  const bot = kb.bottomTypeURIs(ft) // most specific
  const bots: any[] = []
  for (const b in bot) bots.push(b)
  // if (bots.length > 1) throw "Didn't expect "+x+" to have multiple bottom types: "+bots
  return bots[0]
}

export function fieldFunction (dom: HTMLDocument, fieldInQuestion: Node): FieldFunction {
  const uri = mostSpecificClassURI(fieldInQuestion) // What type
  // const uri = field.uri
  const fun = field[uri]

  debug(
    'paneUtils: Going to implement field ' + fieldInQuestion + ' of type ' + uri
  )
  if (!fun) {
    return function () {
      return errorMessageBlock(
        dom,
        'No handler for field ' + fieldInQuestion + ' of type ' + uri
      )
    }
  }
  return fun
}
