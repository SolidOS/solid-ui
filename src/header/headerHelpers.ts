/*
    Copied from mashlib/src/global/metadata.ts
 */
import { NamedNode, sym } from 'rdflib'
import { styleMap } from './styleMap'
import { getClasses } from '../jss'

type ThrottleOptions = {
    leading?: boolean;
    throttling?: boolean;
    trailing?: boolean;
}
/**
 * @internal
 */
function getStyle (styleClass) {
  return styleMap[styleClass]
}

/**
 * @ignore exporting this only for the unit test
 */
export function addStyleClassToElement (element: any, styleClasses: string[]) {
  styleClasses.map((styleClass) => {
    const style = getStyle(styleClass)
    const { classes } = getClasses(document.head, { [styleClass]: style })
    element.classList.add(classes[styleClass])
  })
}
/**
 * @ignore exporting this only for the unit test
 */
export function getPod (): NamedNode {
  // @@ TODO: This is given that mashlib runs on NSS - might need to change when we want it to run on other Pod servers
  return sym(document.location.origin).site()
}
/**
 * @ignore exporting this only for the unit test
 */
export function throttle (func: Function, wait: number, options: ThrottleOptions = {}): (...args: any[]) => any {
  let context: any,
    args: any,
    result: any
  let timeout: any = null
  let previous = 0
  const later = function () {
    previous = !options.leading ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  return function () {
    const now = Date.now()
    if (!previous && !options.leading) previous = now
    const remaining = wait - (now - previous)
    // @ts-ignore
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}
