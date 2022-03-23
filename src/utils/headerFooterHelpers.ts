/*
    Copied from mashlib/src/global/metadata.ts
 */
import { IndexedFormula, LiveStore, NamedNode, sym } from 'rdflib'
import { ns } from '..'
import { styleMap as headerStyleMap } from '../header/styleMap'
import { styleMap as footerStyleMap } from '../footer/styleMap'
import { getClasses } from '../jss'

/* @ts-ignore  no-console */
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
 */
export async function getPodOwner (pod: NamedNode, store: LiveStore): Promise<NamedNode | null> {
  // This is a massive guess.  In future
  // const podOwner = sym(`${pod.uri}profile/card#me`)
/* eslint-disable no-console */
  try {
    // @ts-ignore  LiveStore always has fetcher
    store.fetcher.load(pod)
  } catch (err) {
    console.error('Error loading pod ' + pod + ': ' + err)
    return null
  }
  if (!store.holds(pod, ns.rdf('type'), ns.space('Storage'), pod)) {
    console.warn('Pod  ' + pod + ' does not declare itself as a space:Storage')
    return null
  }
  const podOwner = store.any(pod, ns.solid('owner'), null, pod) ||
        store.any(null, ns.space('storage'), pod, pod)
  if (podOwner) {
    try {
      // @ts-ignore  LiveStore always has fetcher
      store.fetcher.load(podOwner.doc())
    } catch (err) {
      console.warn('Unable to load profile of pod owner ' + podOwner)
      return null
    }
    if (!store.holds(podOwner, ns.space('storage'), pod, (podOwner as NamedNode).doc())) {
      console.warn(`Pod owner ${podOwner} does NOT list pod ${pod} as their storage`)
    }
    return podOwner as NamedNode// Success!
  } else { // pod owner not declared in pod
    // @@ TODO: This is given the structure that NSS provides
    // This is a massive guess.  For old pods which don't have owner link
    const guess = sym(`${pod.uri}profile/card#me`)
    try {
      // @ts-ignore  LiveStore always has fetcher
      store.fetcher.load(guess)
    } catch (err) {
      console.error('Ooops. Guessed wrong pod owner webid {$guess} : can\'t load it.')
      return null
    }
    if (store.holds(guess, ns.space('storage'), pod, guess.doc())) {
      console.warn('Using guessed pod owner webid but it links back.')
      return guess
    }
    return null
  }
  /* eslint-enable no-console */
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
