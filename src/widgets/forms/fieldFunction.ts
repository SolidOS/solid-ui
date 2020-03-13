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
 * Which class of field is this?
 *
 * @param x a field
 * @returns the URI of the most specific class
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
  console.log(fun, uri)

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
