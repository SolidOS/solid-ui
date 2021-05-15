import * as ns from '../../ns'
import { Node } from 'rdflib'
import { kb } from '../../logic'
import { fieldParams } from './fieldParams'

import { mostSpecificClassURI } from './fieldFunction'

const STYLE_URI_PREFIX = 'https://www.w3.org/ns/css/attribute#'

/* eslint-disable no-console */

export function setFieldStyle (ele:HTMLElement, field:Node) {
  const classUri = mostSpecificClassURI(field)
  const params = fieldParams[classUri] || {}

  const style = kb.any(field as any, ns.ui('style'))
  if (!style) {
    if (params.style) {
      ele.setAttribute('style', params.style)
    }
    return
  }
  if (style.termType === 'Literal') {
    if (style) ele.setAttribute('style', style.value)
  } else {
    const sts = kb.statementsMatching(style as any, null, null, (field as any).doc())
    sts.forEach(st => {
      if (st.predicate.uri && st.predicate.uri.startsWith(STYLE_URI_PREFIX)) {
        const cssAttribute = st.predicate.uri.slice(STYLE_URI_PREFIX.length)
        try {
          ele.style[cssAttribute] = st.object.value
        } catch (err) {
          console.warn(`setFieldStyle: Error setting element style ${cssAttribute} to "${st.object.value}"`)
          console.warn(`setFieldStyle:   ... Element tagName was "${ele.tagName || '???'}"`)
        }
      }
    })
  }
}
