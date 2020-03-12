import { st, UpdateManager, Collection, Node, NamedNode } from 'rdflib'
import { iconBase } from '../../iconBase'
import store from '../../store'
import ns from '../../ns'
import { debug } from '../../log'
import { errorMessageBlock } from '../error'
import { button, deleteButtonWithCheck } from '../buttons'
import { syncTableToArrayReOrdered, label } from '../../utils'
import { fieldFunction } from './fieldFunction'
import { newThing } from '.'

/**
 * Multiple field: zero or more similar subFields
 *
 * @param dom The HTML Document object aka Document Object Model
 * @param container  If present, the created widget will be appended to this
 * @param already A hash table of (form, subject) kept to prevent recursive forms looping
 * @param subject The thing about which the form displays/edits data
 * @param form The form or field to be rendered
 * @param doc The web document in which the data is
 * @param callbackFunction Called when data is changed?
 *
 * @returns The HTML widget created
 */
export function multipleField (
  dom: HTMLDocument,
  container: HTMLElement | undefined,
  already: { },
  subject: Node,
  form: Node,
  doc: Node,
  callbackFunction: (ok: boolean, errorMessage: string) => void
): HTMLElement {
  /**
   * Diagnostic function
   */
  function debugString (values) {
    return values.map(x => x.toString().slice(-7)).join(', ')
  }

  /**
   * Add an item to the local quadstore not the UI or the web
   *
   * @param object The RDF object to be represented by this item.
   */
  async function addItem (object?: Node) {
    if (!object) object = newThing(doc) // by default just add new nodes
    if (ordered) {
      createListIfNecessary() // Sets list and unsavedList
      list.elements.push(object)
      await saveListThenRefresh()
    } else {
      const toBeInserted = [st(subject, property, object, doc)]
      try {
        await kb.updater.update([], toBeInserted)
      } catch (err) {
        const msg = 'Error adding to unordered multiple: ' + err
        box.appendChild(errorMessageBlock(dom, msg))
        console.error(msg)
      }
      refresh() // 20191213
    }
  }

  /**
   * Make a dom representation for an item
   *
   * @param object The RDF object to be represented by this item.
   */
  function renderItem (object: NamedNode) {
    async function deleteThisItem () {
      if (ordered) {
        console.log('pre delete: ' + debugString(list.elements))
        for (let i = 0; i < list.elements.length; i++) {
          if (list.elements[i].sameTerm(object)) {
            list.elements.splice(i, 1)
            await saveListThenRefresh()
            return
          }
        }
      } else {
        // unordered
        if (kb.holds(subject, property, object)) {
          const del = [st(subject, property, object, doc)]
          kb.updater.update(del, [], function (uri, ok, message) {
            if (ok) {
              body.removeChild(subField)
            } else {
              body.appendChild(
                errorMessageBlock(
                  dom,
                  'Multiple: delete failed: ' + message
                )
              )
            }
          })
        }
      }
    }

    /**
     * Move the object up or down in the ordered list
     *
     * @param event if used as an event handler
     * @param upwards Move this up (true) or down (false).
     */
    async function moveThisItem (event: Event, upwards: boolean) {
      // @@ possibly, allow shift+click to do move to top or bottom?
      console.log('pre move: ' + debugString(list.elements))
      let i
      for (i = 0; i < list.elements.length; i++) {
        // Find object in array
        if (list.elements[i].sameTerm(object)) {
          break
        }
      }
      if (i === list.elements.length) {
        throw new Error('list move: not found element for ' + object)
      }
      if (upwards) {
        if (i === 0) {
          throw new Error('@@ boop - already at top   -temp message') // @@ make boop sound
        }
        list.elements.splice(i - 1, 2, list.elements[i], list.elements[i - 1])
      } else {
        // downwards
        if (i === list.elements.length - 1) {
          throw new Error('@@ boop - already at bottom   -temp message') // @@ make boop sound
        }
        list.elements.splice(i, 2, list.elements[i + 1], list.elements[i])
      }
      await saveListThenRefresh()
    }

    /**
     * A subField has been filled in
     *
     * One possibility is to not actually make the link to the thing until
     * this callback happens to avoid widow links
     */
    function itemDone (uri: string, ok: boolean, message: string): void {
      console.log(`Item ${uri} done callback for item ${object.uri.slice(-7)}`)
      if (!ok) { // when does this happen? errors typically deal with upstream
        console.error('  Item done callback: Error: ' + message)
      } else {
        linkDone(uri, ok, message)
      }
      /*  Put this as a function and call it from only one place
      const ins, del
      // throw new Error('Multiple: item calklback.' + uri)
      if (ok) {
        // @@@ Check IT hasnt alreday been written in
        if (ordered) {
          list = kb.any(subject, property, null, doc)
          if (!list) {
            list = new Collection([object])
            ins = [st(subject, property, list)] // Will this work?
          } else {
            const oldList = new Collection(list.elments)
            list.append(object)
            del = [st(subject, property, oldList)] // If this doesn't work, kb.saveBack(doc)
            ins = [st(subject, property, list)]
          }
        } else {
          if (!kb.holds(subject, property, object, doc)) {
            ins = [st(subject, property, object, doc)]
          }
          kb.updater.update(del, ins, linkDone)
        }
      } else {
        box.appendChild(
          errorMessageBlock(dom, 'Multiple: item failed: ' + body)
        )
        callbackFunction(ok, message)
      }
      */
    }
    const linkDone = function (uri, ok, message) {
      return callbackFunction(ok, message)
    }

    // if (!object) object = newThing(doc)
    debug('Multiple: render object: ' + object)
    // const tr = box.insertBefore(dom.createElement('tr'), tail)
    // const ins = []
    // const del = []

    const fn = fieldFunction(dom, element)
    const subField = fn(dom, undefined, already, object, element, doc, (ok, errorMessage) => {
      itemDone(element.uri, ok, errorMessage)
    }) // p2 was: body.  moving to not passing that
    ;(subField as any).subject = object // Keep a back pointer between the DOM array and the RDF objects

    // delete button and move buttons
    if (kb.updater.editable((doc as NamedNode).uri)) {
      deleteButtonWithCheck(dom, subField, label(property),
        deleteThisItem)
      if (ordered) {
        subField.appendChild(
          button(
            dom, iconBase + 'noun_1369237.svg', 'Move Up',
            async event => moveThisItem(event, true))
        )
        subField.appendChild(
          button(
            dom, iconBase + 'noun_1369241.svg', 'Move Down',
            async event => moveThisItem(event, false))
        )
      }
    }
    return subField // unused
  } // renderItem

  // Body of form field implementation

  const plusIconURI = iconBase + 'noun_19460_green.svg' // white plus in green circle

  const kb = store
  kb.updater = kb.updater || new UpdateManager(kb)
  const box = dom.createElement('table')
  // We don't indent multiple as it is a sort of a prefix of the next field and has contents of one.
  // box.setAttribute('style', 'padding-left: 2em; border: 0.05em solid green;')  // Indent a multiple
  if (container) container.appendChild(box)

  const orderedNode = kb.any(form, ns.ui('ordered'))
  const ordered = orderedNode ? (Node as any).toJS(orderedNode) : false

  const property = kb.any(form, ns.ui('property'))
  if (!property) {
    box.appendChild(
      errorMessageBlock(dom, 'No property to multiple: ' + form)
    ) // used for arcs in the data
    return box
  }
  let min = kb.any(form, ns.ui('min')) // This is the minimum number -- default 0
  min = min ? 0 + min.value : 0
  // const max = kb.any(form, ns.ui('max')) // This is the minimum number
  // max = max ? max.value : 99999999

  const element = kb.any(form, ns.ui('part')) // This is the form to use for each one
  if (!element) {
    box.appendChild(
      errorMessageBlock(dom, 'No part to multiple: ' + form)
    )
    return box
  }

  const body = box.appendChild(dom.createElement('tr')) // 20191207
  let list: Collection // The RDF collection which keeps the ordered version
  let values: Node[] // Initial values - an array.  Even when no list yet.

  // const unsavedList = false // Flag that
  if (ordered) {
    list = kb.any(subject, property)
    if (list) {
      values = list.elements
    } else {
      // unsavedList = true
      values = []
    }
  } else {
    values = kb.each(subject, property)
    list = (null as unknown as Collection) // FIXME
  }
  // Add control on the bottom for adding more items
  if (kb.updater.editable((doc as NamedNode).uri)) {
    const tail = box.appendChild(dom.createElement('tr'))
    tail.style.padding = '0.5em'
    const img = tail.appendChild(dom.createElement('img'))
    img.setAttribute('src', plusIconURI) //  plus sign
    img.setAttribute('style', 'margin: 0.2em; width: 1.5em; height:1.5em')
    img.title = 'Click to add one or more ' + label(property)
    const prompt = tail.appendChild(dom.createElement('span'))
    prompt.textContent =
      (values.length === 0 ? 'Add one or more ' : 'Add more ') +
      label(property)
    tail.addEventListener('click', async _eventNotUsed => {
      await addItem()
    }, true)
  }

  function createListIfNecessary () {
    if (!list) {
      list = new Collection([])
      kb.add(subject, property, list, doc)
    }
  }

  async function saveListThenRefresh () {
    console.log('save list: ' + debugString(list.elements)) // 20191214

    createListIfNecessary()
    try {
      await kb.fetcher.putBack(doc)
    } catch (err) {
      box.appendChild(
        errorMessageBlock(dom, 'Error trying to put back a list: ' + err)
      )
      return
    }
    refresh()
  }

  function refresh () {
    let vals
    if (ordered) {
      const li = kb.the(subject, property)
      vals = li ? li.elements : []
    } else {
      vals = kb.each(subject, property)
      vals.sort() // achieve consistency on each refresh
    }
    syncTableToArrayReOrdered(body, vals, renderItem)
  }
  ;(body as any).refresh = refresh // Allow live update
  refresh()

  async function asyncStuff () {
    const extra = min - values.length
    if (extra > 0) {
      for (let j = 0; j < extra; j++) {
        console.log('Adding extra: min ' + min)
        await addItem() // Add blanks if less than minimum
      }
      await saveListThenRefresh()
    }
    // if (unsavedList) {
    //     await saveListThenRefresh() // async
    // }
  }
  asyncStuff().then(
    () => { console.log(' Multiple render: async stuff ok') },
    (err) => { console.error(' Multiple render: async stuff fails. #### ', err) }
  ) // async

  return box
} // Multiple
