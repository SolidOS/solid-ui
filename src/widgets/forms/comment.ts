import store from '../../store'
import ns from '../../ns'
import { mostSpecificClassURI } from './fieldFunction'
import { fieldParams } from './fieldParams'

export function commentField (
  dom,
  container,
  already,
  subject,
  form,
  _doc,
  _callbackFunction
) {
  const kb = store
  let contents = kb.any(form, ns.ui('contents'))
  if (!contents) contents = 'Error: No contents in comment field.'

  const uri = mostSpecificClassURI(form)
  let params = fieldParams[uri]
  if (params === undefined) {
    params = {}
  } // non-bottom field types can do this

  const box = dom.createElement('div')
  if (container) container.appendChild(box)
  const p = box.appendChild(dom.createElement(params.element))
  p.textContent = contents

  let style = kb.any(form, ns.ui('style'))
  if (style === undefined) {
    style = params.style ? params.style : ''
  }
  if (style) p.setAttribute('style', style)

  return box
}
