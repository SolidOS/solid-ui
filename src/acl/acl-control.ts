// ///////////////////////////// ACL User Interface

// See https://www.coshx.com/blog/2014/04/11/preventing-drag-and-drop-disasters-with-a-chrome-userscript/
// Without this dropping anything onto a browser page will cause chrome etc to jump to diff page
// throwing away all the user's work.

import ns from '../ns'
import utils from '../utils.js'
import { getACLorDefault, getProspectiveHolder } from './acl'
import { IndexedFormula, NamedNode } from 'rdflib'
import { DataBrowserContext } from 'pane-registry'
import { AccessController } from './access-controller'
import { getClasses } from '../jss'
import { styles } from './styles'

// In apps which may use drag and drop, this utility takes care of the fact
// by default in a browser, an uncuaght user drop into a browser window
// causes the bowser to lose all its work in tat window and navigate to another page
export function preventBrowserDropEvents (document: HTMLDocument): void {
  console.log('preventBrowserDropEvents called.')
  const global: any = window
  if (typeof global !== 'undefined') {
    if (global.preventBrowserDropEventsDone) return
    global.preventBrowserDropEventsDone = true
  }

  function preventDrag (e) {
    e.stopPropagation()
    e.preventDefault()
  }

  function handleDrop (e) {
    if (e.dataTransfer.files.length > 0) {
      if (
        !confirm(
          'Are you sure you want to drop this file here? ' +
          '(Cancel opens it in a new tab)'
        )
      ) {
        e.stopPropagation()
        e.preventDefault()
        console.log(
          '@@@@ document-level DROP suppressed: ' + e.dataTransfer.dropEffect
        )
      }
    }
  }

  document.addEventListener('drop', handleDrop, false)
  document.addEventListener('dragenter', preventDrag, false)
  document.addEventListener('dragover', preventDrag, false)
}

export function shortNameForFolder (x: NamedNode): string {
  let str = x.uri
  if (str.slice(-1) === '/') {
    str = str.slice(0, -1)
  }
  const slash = str.lastIndexOf('/')
  if (slash >= 0) {
    str = str.slice(slash + 1)
  }
  return str || '/'
}

export function ACLControlBox5 (
  subject: NamedNode,
  context: DataBrowserContext,
  noun: string,
  kb: IndexedFormula
): HTMLElement {
  const dom = context.dom
  const doc = subject.doc() // The ACL is actually to the doc describing the thing
  const classes = getClasses(dom.head, styles).classes

  const container = dom.createElement('div')
  container.classList.add(classes.aclControlBoxContainer)

  const header = container.appendChild(dom.createElement('h1'))
  header.textContent = `Sharing for ${noun} ${utils.label(subject)}`
  header.classList.add(classes.aclControlBoxHeader)

  const status = container.appendChild(dom.createElement('div'))
  status.classList.add(classes.aclControlBoxStatus)

  try {
    loadController(doc, kb, subject, noun, context, classes, dom, status)
      .then(controller => container.appendChild(controller.render()))
  } catch (error) {
    status.innerText = error
  }

  return container
}

async function loadController (
  doc: NamedNode,
  kb: IndexedFormula,
  subject: NamedNode,
  noun: string,
  context: DataBrowserContext,
  classes: Record<string, string>,
  dom: HTMLDocument,
  status: HTMLElement
): Promise<AccessController> {
  return new Promise((resolve, reject) => getACLorDefault(doc, async (
    ok,
    isDirectACL,
    targetDoc,
    targetACLDoc,
    defaultHolder,
    defaultACLDoc
  ) => {
    if (!ok) {
      return reject(new Error(`Error reading ${isDirectACL ? '' : ' default '}ACL. status ${targetDoc}: ${targetACLDoc}`))
    }
    const targetDirectory = getDirectory(targetDoc as NamedNode)
    const targetIsProtected = isStorage(targetDoc as NamedNode, targetACLDoc as NamedNode, kb) || hasProtectedAcl(targetDoc as NamedNode)
    if (!targetIsProtected && targetDirectory) {
      try {
        const prospectiveDefaultHolder = await getProspectiveHolder(targetDirectory)
        return resolve(getController(prospectiveDefaultHolder))
      } catch (error) {
        // No need to show this error in status, but good to warn about it in console
        console.warn(error)
      }
    }
    return resolve(getController())

    function getController (prospectiveDefaultHolder?: NamedNode) {
      return new AccessController(subject, noun, context, status, classes, targetIsProtected, targetDoc as NamedNode, targetACLDoc as NamedNode, defaultHolder as NamedNode,
        defaultACLDoc as NamedNode, prospectiveDefaultHolder, kb, dom)
    }
  }))
}

function getDirectory (doc: NamedNode): string | null {
  const str = doc.uri.split('#')[0]
  const p = str.slice(0, -1).lastIndexOf('/')
  const q = str.indexOf('//')
  return (q >= 0 && p < q + 2) || p < 0 ? null : str.slice(0, p + 1)
}

function isStorage (doc: NamedNode, aclDoc: NamedNode, store: IndexedFormula): boolean {
  // @@ TODO: The methods used for targetIsStorage are HACKs - it should not be relied upon, and work is
  // @@ underway to standardize a behavior that does not rely upon this hack
  // @@ hopefully fixed as part of https://github.com/solid/data-interoperability-panel/issues/10
  return store.holds(doc, ns.rdf('type'), ns.space('Storage'), aclDoc)
}

function hasProtectedAcl (targetDoc: NamedNode): boolean {
  // @@ TODO: This is hacky way of knowing whether or not a certain ACL file can be removed
  // Hopefully we'll find a better, standardized solution to this - https://github.com/solid/specification/issues/37
  return targetDoc.uri === targetDoc.site().uri
}
