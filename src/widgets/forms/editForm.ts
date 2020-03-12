import ns from '../../ns'
import { label } from '../../utils'
import { appendForm } from './fieldFunction'

/**
 * A button for editing a form (in place, at the moment)
 *
 * When editing forms, make it yellow, when editing thr form form, pink
 * Help people understand how many levels down they are.
 */
export function editFormButton (
  dom,
  container,
  form,
  doc,
  callbackFunction
) {
  const b = dom.createElement('button')
  b.setAttribute('type', 'button')
  b.innerHTML = 'Edit ' + label(ns.ui('Form'))
  b.addEventListener(
    'click',
    function (_e) {
      const ff = appendForm(
        dom,
        container,
        {},
        form,
        ns.ui('FormForm'),
        doc,
        callbackFunction
      )
      ff.setAttribute(
        'style',
        ns.ui('FormForm').sameTerm(form)
          ? 'background-color: #fee;'
          : 'background-color: #ffffe7;'
      )
      b.parentNode.removeChild(b)
    },
    true
  )
  return b
}
