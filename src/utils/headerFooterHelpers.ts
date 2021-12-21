/*
    Copied from mashlib/src/global/metadata.ts
 */
import { IndexedFormula, NamedNode, sym } from 'rdflib'
import { ns } from '..'
import { styleMap as headerStyleMap } from '../header/styleMap'
import { styleMap as footerStyleMap } from '../footer/styleMap'
import { getClasses } from '../jss'

type ThrottleOptions = {
    leading?: boolean;
    throttling?: boolean;
    trailing?: boolean;
}
/**
 * @internal
 */
function getStyle (styleClass, type?) {
  if (type && type === 'footer') {
    return footerStyleMap[styleClass]
  } else {
    return headerStyleMap[styleClass]
  }
}

/**
 * @ignore exporting this only for the unit test
 */
export function addStyleClassToElement (element: any, styleClasses: string[], type?: string) {
  styleClasses.forEach((styleClass) => {
    const style = getStyle(styleClass, type)
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
export async function getPodOwner (pod: NamedNode, store: IndexedFormula): Promise<NamedNode | null> {
  // @@ TODO: This is given the structure that NSS provides - might need to change for other Pod servers
  const podOwner = sym(`${pod.uri}profile/card#me`)

  try {
    if (store.fetcher) {
      await store.fetcher.load(podOwner.doc())
    } else {
      console.log('There was a problem loading the Fetcher')
      return null
    }
    // @@ TODO: check back links to storage
  } catch (err) {
    console.log('Did NOT find pod owners profile at ' + podOwner)
    return null
  }
  if (podOwner) {
    const storageIsListedInPodOwnersProfile = store.holds(podOwner, ns.space('storage'), pod, podOwner.doc())
    if (!storageIsListedInPodOwnersProfile) {
      console.log(`** Pod owner ${podOwner} does NOT list pod ${pod} as storage`)
      return null
    }
  }
  return podOwner
}
/**
 * @ignore exporting this only for the unit test
 */
export function getName (store: IndexedFormula, user: NamedNode): string {
  return store.anyValue(user, ns.vcard('fn'), null, user.doc()) ||
    store.anyValue(user, ns.foaf('name'), null, user.doc()) ||
    user.uri
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
