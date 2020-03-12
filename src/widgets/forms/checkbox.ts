import { IndexedFormula, Node, NamedNode, Statement } from 'rdflib'
import store from '../../store'
import ns from '../../ns'
import { errorMessageBlock } from '../error'

const checkMarkCharacter = '\u2713'
const cancelCharacter = '\u2715'
const dashCharacter = '-'

/**
 * Build a checkbox from a given statement(s)
 *
 * If the source document is editable, make the checkbox editable
 *
 * ins and sel are either statements *or arrays of statements* which should be
 * made if the checkbox is checked and unchecked respectively.
 *  tristate: Allow ins, or del, or neither
 */
export function buildCheckboxForm (
  dom: HTMLDocument,
  kb: IndexedFormula,
  lab: string,
  del: Statement | Statement[],
  ins: Statement | Statement[],
  form: Node,
  doc: Node,
  tristate: boolean): HTMLElement {
  // 20190115
  const box = dom.createElement('div')
  const tx = dom.createTextNode(lab)
  const editable = store.updater.editable((doc as NamedNode).uri)
  ;(tx as any).style =
    'colour: black; font-size: 100%; padding-left: 0.5 em; padding-right: 0.5 em;'
  box.appendChild(tx)
  const input = dom.createElement('button')

  input.setAttribute(
    'style',
    'font-size: 150%; height: 1.2em; width: 1.2em; background-color: #eef; margin: 0.1em'
  )
  box.appendChild(input)

  function fix (x) {
    if (!x) return [] // no statements
    if (x.object) {
      if (!x.why) {
        x.why = doc // be back-compaitible  with old code
      }
      return [x] // one statements
    }
    if (x instanceof Array) return x
    throw new Error('buildCheckboxForm: bad param ' + x)
  }
  ins = fix(ins)
  del = fix(del)

  function holdsAll (a) {
    const missing = a.filter(
      st => !kb.holds(st.subject, st.predicate, st.object, st.why)
    )
    return missing.length === 0
  }
  function refresh () {
    let state: any = holdsAll(ins)
    let displayState = state
    if ((del as Statement[]).length) {
      const negation = holdsAll(del)
      if (state && negation) {
        box.appendChild(
          errorMessageBlock(
            dom,
            'Inconsistent data in store!\n' + ins + ' and\n' + del
          )
        )
        return box
      }
      if (!state && !negation) {
        state = null
        const defa = kb.any(form, ns.ui('default'))
        displayState = defa ? defa.value === '1' : tristate ? null : false
      }
    }
    ;(input as any).state = state
    input.textContent = {
      true: checkMarkCharacter,
      false: cancelCharacter,
      null: dashCharacter
    }[displayState]
  }

  refresh()
  if (!editable) return box

  const boxHandler = function (_e) {
    ;(tx as any).style = 'color: #bbb;' // grey -- not saved yet
    const toDelete: Statement = ((input as any).state === true ? ins : (input as any).state === false ? del : []) as Statement
    ;(input as any).newState =
      (input as any).state === null
        ? true
        : (input as any).state === true
          ? false
          : tristate
            ? null
            : true

    const toInsert: Statement =
      ((input as any).newState === true ? ins : (input as any).newState === false ? del : []) as Statement
    console.log(`  Deleting  ${toDelete}`)
    console.log(`  Inserting ${toInsert}`)
    store.updater.update(toDelete, toInsert, function (
      uri,
      success,
      errorBody
    ) {
      if (!success) {
        if (toDelete.why) {
          const hmmm = kb.holds(
            toDelete.subject,
            toDelete.predicate,
            toDelete.object,
            toDelete.why as Node
          )
          if (hmmm) {
            console.log(' @@@@@ weird if 409 - does hold statement')
          }
        }
        ;(tx as any).style = 'color: #black; background-color: #fee;'
        box.appendChild(
          errorMessageBlock(
            dom,
            `Checkbox: Error updating doc from ${(input as any).state} to ${
              (input as any).newState
            }:\n\n${errorBody}`
          )
        )
      } else {
        ;(tx as any).style = 'color: #black;'
        ;(input as any).state = (input as any).newState
        input.textContent = {
          true: checkMarkCharacter,
          false: cancelCharacter,
          null: dashCharacter
        }[(input as any).state] // @@
      }
    })
  }
  input.addEventListener('click', boxHandler, false)
  return box
}
