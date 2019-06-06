
/** **************
*   Notepad Widget
*/

/** @module UI.pad
*/

import $rdf from 'rdflib'
const padModule = module.exports = {
  lightColorHash,
  renderPartipants,
  participationObject,
  recordParticipation,
  manageParticipation,
  notepad,
}
export default padModule
var UI = {
  authn: require('./signin'),
  icons: require('./iconBase'),
  log: require('./log'),
  ns: require('./ns'),
  pad: padModule,
  rdf: $rdf,
  store: require('./store'),
  widgets: require('./widgets')
}
const kb = UI.store
const ns = UI.ns

import utils from './utils'

/** Figure out a random color from my webid
*
* @param {NamedNode} author - The author of text being displayed
* @returns {String} The CSS color generated, constrained to be light for a background color
*/
function lightColorHash (author: $rdf.NamedNode) {
  var hash = function (x: string) { return x.split('').reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0) }
  return author && author.uri ? '#' + ((hash(author.uri) & 0xffffff) | 0xc0c0c0).toString(16) : '#ffffff' // c0c0c0  forces pale
} // no id -> white

// Manage participation in this session
//
//  This is more general tham the pad.
//
function renderPartipants (
  dom: HTMLDocument,
  table: HTMLTableElement,
  padDoc: unknown,
  subject: $rdf.Node,
  me: unknown,
  options: unknown
) {
  table.setAttribute('style', 'margin: 0.8em;')

  var newRowForParticpation = function (parp: $rdf.Node) {
    var person = kb.any(parp, ns.wf('participant'))
    var tr
    if (!person) {
      tr = dom.createElement('tr')
      tr.textContent = '???' // Don't crash - invalid part'n entry
      return tr
    }
    var bg = kb.anyValue(parp, ns.ui('backgroundColor')) || 'white'

    var block = dom.createElement('div')
    block.setAttribute('style', 'height: 1.5em; width: 1.5em; margin: 0.3em; border 0.01em solid #888; background-color: ' + bg)
    tr = UI.widgets.personTR(dom, null, person, options)
    table.appendChild(tr)
    var td = dom.createElement('td')
    td.setAttribute('style', 'vertical-align: middle;')
    td.appendChild(block)
    tr.insertBefore(td, tr.firstChild)
    return tr
  }

  var syncTable = function () {
    var parps = kb.each(subject, ns.wf('participation')).map(function (parp: $rdf.Node) {
      return [kb.anyValue(parp, UI.ns.cal('dtstart')) || '9999-12-31', parp]
    })
    parps.sort() // List in order of joining
    var participations = parps.map(function (p: any) { return p[1] })
    utils.syncTableToArray(table, participations, newRowForParticpation)
  };
  (table as any).refresh = syncTable
  syncTable()
  return table
}

/** Record, or find old, Particpation object
*
* A particpaption object is a place to record things specifically about
* subject and the user, such as preferences, start of membership, etc
* @param {Node} subject - The thing in which the participation is happening
* @param {NamedNode} document -  Where to record the data
* @param {NamedNode} me - The logged in user
*
*/
function participationObject  (subject: $rdf.Node, padDoc: $rdf.NamedNode, me: $rdf.NamedNode) {
  return new Promise(function (resolve, reject) {
    if (!me) {
      throw new Error('Not user id')
    }

    var parps = kb.each(subject, ns.wf('participation')).filter(function (pn: $rdf.Node) {
      return kb.holds(pn, ns.wf('participant'), me)
    })
    if (parps.length > 1) {
      throw new Error('Multiple records of your participation')
    }
    if (parps.length) { // If I am not already recorded
      resolve(parps[0]) // returns the particpation object
    } else {
      var participation = UI.widgets.newThing(padDoc)
      var ins = [
        UI.rdf.st(subject, ns.wf('participation'), participation, padDoc),

        UI.rdf.st(participation, ns.wf('participant'), me, padDoc),
        // TODO: Remove `as any` after using updated type definitions of rdflib.
        //       See https://github.com/DefinitelyTyped/DefinitelyTyped/pull/35783
        UI.rdf.st(participation, ns.cal('dtstart'), new Date() as any, padDoc),
        UI.rdf.st(participation, ns.ui('backgroundColor'), lightColorHash(me) as any, padDoc)
      ]
      kb.updater.update([], ins, function (uri: string, ok: boolean, errorMessage: string) {
        if (!ok) {
          reject(new Error('Error recording your partipation: ' + errorMessage))
        } else {
          resolve(participation)
        }
      })
      resolve(participation)
    }
  })
}

/** Record my participation and display participants
 *
 * @param {NamedNode} subject - the thing in which participation is happening
 * @param {NamedNode} padDoc - The document into which the particpation should be recorded
 * @param {DOMNode} refreshable - A DOM element whose refresh() is to be called if the change works
 *
*/
function recordParticipation  (subject: $rdf.NamedNode, padDoc: $rdf.NamedNode, refreshable?: HTMLElement) {
  var me = UI.authn.currentUser()
  if (!me) return // Not logged in

  var parps = kb.each(subject, ns.wf('participation')).filter(function (pn: $rdf.Node) {
    return kb.holds(pn, ns.wf('participant'), me)
  })
  if (parps.length > 1) {
    throw new Error('Multiple records of your participation')
  }
  if (parps.length) { // If I am not already recorded
    return parps[0] // returns the particpation object
  } else {
    var participation = UI.widgets.newThing(padDoc)
    var ins = [
      UI.rdf.st(subject, ns.wf('participation'), participation, padDoc),

      UI.rdf.st(participation, ns.wf('participant'), me, padDoc),
      // TODO: Remove `as any` after using updated type definitions of rdflib.
      //       See https://github.com/DefinitelyTyped/DefinitelyTyped/pull/35783
      UI.rdf.st(participation, UI.ns.cal('dtstart'), new Date() as any, padDoc),
      UI.rdf.st(participation, ns.ui('backgroundColor'), lightColorHash(me) as any, padDoc)
    ]
    kb.updater.update([], ins, function (uri: string, ok: boolean, errorMessage: string) {
      if (!ok) {
        throw new Error('Error recording your partipation: ' + errorMessage)
      }
      if (refreshable && (refreshable as any).refresh) {
        (refreshable as any).refresh()
      }
      // renderPartipants(dom, table, padDoc, subject, me, options)
    })
    return participation
  }
}

// Record my participation and display participants
//
function manageParticipation (
  dom: HTMLDocument,
  container: HTMLElement,
  padDoc: $rdf.NamedNode,
  subject: $rdf.NamedNode,
  me: $rdf.NamedNode,
  options: unknown
) {
  var table = dom.createElement('table')
  container.appendChild(table)
  renderPartipants(dom, table, padDoc, subject, me, options)
  try {
    recordParticipation(subject, padDoc, table)
  } catch (e) {
    container.appendChild(UI.widgets.errorMessageBlock(dom, 'Error recording your partipation: ' + e)) // Clean up?
  }
  return table
}

function notepad  (
  dom: HTMLDocument,
  padDoc: $rdf.NamedNode,
  subject: $rdf.Node,
  me: $rdf.NamedNode,
  options: Partial<{ exists: boolean, statusArea: HTMLElement }>
) {
  options = options || {}
  var exists = options.exists
  var table = dom.createElement('table')
  var kb = UI.store
  var ns = UI.ns

  if (me && !me.uri) throw new Error('UI.pad.notepad:  Invalid userid')

  var updater = UI.store.updater

  var PAD = $rdf.Namespace('http://www.w3.org/ns/pim/pad#')

  table.setAttribute('style', 'padding: 1em; overflow: auto; resize: horizontal; min-width: 40em;')

  var upstreamStatus: null | HTMLTableDataCellElement = null
  var downstreamStatus: null | HTMLTableDataCellElement = null

  if (options.statusArea) {
    var t = options.statusArea.appendChild(dom.createElement('table'))
    var tr: HTMLTableRowElement = t.appendChild(dom.createElement('tr'))
    upstreamStatus = tr.appendChild(dom.createElement('td'))
    downstreamStatus = tr.appendChild(dom.createElement('td'))
    upstreamStatus.setAttribute('style', 'width:50%')
    downstreamStatus.setAttribute('style', 'width:50%')
  }

  var complain = function (message: string, upstream?: boolean) {
    console.log(message)
    if (options.statusArea) {
      (upstream ? upstreamStatus! : downstreamStatus!).appendChild(
            UI.widgets.errorMessageBlock(dom, message, 'pink'))
    }
  }

  var clearStatus = function (upstream?: boolean) {
    if (options.statusArea) {
      options.statusArea.innerHTML = ''
    }
  }

  var setPartStyle = function (
    part: HTMLElement & { subject?: $rdf.Node },
    colors?: string,
    pending?: boolean
  ) {
    var chunk = part.subject
    colors = colors || ''
    var baseStyle = 'font-size: 100%; font-family: monospace; width: 100%; border: none; white-space: pre-wrap;'
    var headingCore = 'font-family: sans-serif; font-weight: bold;  border: none;'
    var headingStyle = [ 'font-size: 110%;  padding-top: 0.5em; padding-bottom: 0.5em; width: 100%;',
      'font-size: 120%; padding-top: 1em; padding-bottom: 1em; width: 100%;',
      'font-size: 150%; padding-top: 1em; padding-bottom: 1em; width: 100%;' ]

    var author = kb.any(chunk, ns.dc('author'))
    if (!colors && author) { // Hash the user webid for now -- later allow user selection!
      var bgcolor = lightColorHash(author)
      colors = 'color: ' + (pending ? '#888' : 'black') + '; background-color: ' + bgcolor + ';'
    }

    var indent = kb.any(chunk, PAD('indent'))

    indent = indent ? indent.value : 0
    var style = (indent >= 0) //
            // baseStyle + 'padding-left: ' + (indent * 3) + 'em;'
            ? baseStyle + 'text-indent: ' + (indent * 3) + 'em;'
            : headingCore + headingStyle[ -1 - indent ]
    part.setAttribute('style', style + colors)
  }

  var removePart = function (part: $rdf.Statement & HTMLInputElement) {
    var chunk = part.subject
    if (!chunk) throw new Error('No chunk for line to be deleted!') // just in case
    var prev = kb.any(undefined, PAD('next'), chunk)
    var next = kb.any(chunk, PAD('next'))
    if (prev.sameTerm(subject) && next.sameTerm(subject)) { // Last one
      console.log("You can't delete the only line.")
      return
    }

    var del = kb.statementsMatching(chunk, undefined, undefined, padDoc)
                .concat(kb.statementsMatching(undefined, undefined, chunk, padDoc))
    var ins = [ $rdf.st(prev, PAD('next'), next, padDoc) ]
    var label = (chunk as $rdf.NamedNode).uri.slice(-4)
    console.log('Deleting line ' + label)

    updater.update(del, ins, function (uri: string, ok: boolean, errorMessage: string, response: { status: number }) {
      if (ok) {
        var row = part.parentNode as HTMLElement
        var before = row.previousSibling
        row.parentNode!.removeChild(row)
        console.log('    deleted line ' + label + ' ok ' + part.value)
        if (before && before.firstChild) {
          (before.firstChild as HTMLElement).focus()
        }
      } else if (response && response.status === 409) { // Conflict
        setPartStyle(part, 'color: black;  background-color: #ffd;'); // yellow
        (part as any).state = 0 // Needs downstream refresh
        const beeper = utils.beep()
        if (beeper) { beeper(0.5, 512) } // Ooops clash with other person
        setTimeout(function () { // Ideally, beep! @@
          reloadAndSync()  // Throw away our changes and
          // updater.requestDownstreamAction(padDoc, reloadAndSync)
        }, 1000)
      } else {
        console.log('    removePart FAILED ' + chunk + ': ' + errorMessage)
        console.log("    removePart was deleteing :'" + del)
        setPartStyle(part, 'color: black;  background-color: #fdd;')// failed
        let res = response ? response.status : ' [no response field] '
        complain('Error ' + res + ' saving changes: ' + (errorMessage as any).true) // upstream,
                // updater.requestDownstreamAction(padDoc, reloadAndSync);
      };
    })
  }// removePart

  var changeIndent = function (part: HTMLElement, chunk: $rdf.Node, delta: number) {
    var del = kb.statementsMatching(chunk, PAD('indent'))
    var current = del.length ? Number(del[0].object.value) : 0
    if (current + delta < -3) return //  limit negative indent
    var newIndent = current + delta
    var ins = $rdf.st(chunk, PAD('indent'), newIndent as any, padDoc)
    updater.update(del, ins, function (uri: string, ok: boolean, errorBody: string) {
      if (!ok) {
        console.log("Indent change FAILED '" + newIndent + "' for " + padDoc + ': ' + errorBody)
        setPartStyle(part, 'color: black;  background-color: #fdd;') // failed
        updater.requestDownstreamAction(padDoc, reloadAndSync)
      } else {
        setPartStyle(part) // Implement the indent
      }
    })
  }

    // Use this sort of code to split the line when return pressed in the middle @@
/*
  function doGetCaretPosition doGetCaretPosition (oField) {
    var iCaretPos = 0
        // IE Support
    if (document.selection) {
            // Set focus on the element to avoid IE bug
      oField.focus()

            // To get cursor position, get empty selection range
      var oSel = document.selection.createRange()

            // Move selection start to 0 position
      oSel.moveStart('character', -oField.value.length)

            // The caret position is selection length
      iCaretPos = oSel.text.length

        // Firefox suppor
    } else if (oField.selectionStart || oField.selectionStart === '0') {
      iCaretPos = oField.selectionStart
    }
        // Return results
    return (iCaretPos)
  }
*/
  var addListeners = function (
    part: HTMLInputElement & $rdf.Statement & { state: number },
    chunk: $rdf.NamedNode
  ) {
    part.addEventListener('keydown', function (event) {
      var queueProperty, queue
            //  up 38; down 40; left 37; right 39     tab 9; shift 16; escape 27
      switch (event.keyCode) {
        case 13:                    // Return
          var before = event.shiftKey
          console.log('enter')   // Shift-return inserts before -- only way to add to top of pad.
          if (before) {
            queue = kb.any(undefined, PAD('next'), chunk)
            queueProperty = 'newlinesAfter'
          } else {
            queue = kb.any(chunk, PAD('next'))
            queueProperty = 'newlinesBefore'
          }
          queue[queueProperty] = queue[queueProperty] || 0
          queue[queueProperty] += 1
          if (queue[queueProperty] > 1) {
            console.log('    queueing newline queue = ' + queue[queueProperty])
            return
          }
          console.log('    go ahead line before ' + queue[queueProperty])
          newChunk(part, before) // was document.activeElement
          break

        case 8: // Delete
          if (part.value.length === 0) {
            console.log('Delete key line ' + chunk.uri.slice(-4) + ' state ' + part.state)

            switch (part.state) {
              case 1: // contents being sent
              case 2: // contents need to be sent again
                part.state = 4 // delete me
                return
              case 3: // being deleted already
              case 4: // already deleme state
                return
              case undefined:
              case 0:
                part.state = 3 // being deleted
                removePart(part)
                event.preventDefault()
                break // continue
              default:
                throw new Error('pad: Unexpected state ' + part)
            }
          }
          break
        case 9: // Tab
          var delta = event.shiftKey ? -1 : 1
          changeIndent(part, chunk, delta)
          event.preventDefault() // default is to highlight next field
          break
        case 27:  // ESC
          console.log('escape')
          updater.requestDownstreamAction(padDoc, reloadAndSync)
          event.preventDefault()
          break

        case 38: // Up
          if (part.parentNode!.previousSibling) {
            (part.parentNode!.previousSibling.firstChild as HTMLElement).focus()
            event.preventDefault()
          }
          break

        case 40: // Down
          if (part.parentNode!.nextSibling) {
            (part.parentNode!.nextSibling.firstChild as HTMLElement).focus()
            event.preventDefault()
          }
          break

        default:
      }
    })

    var updateStore = function (part: HTMLInputElement & $rdf.Statement & { state: number, lastSent?: string }) {
      var chunk = part.subject as $rdf.NamedNode
      setPartStyle(part, undefined, true)
      var old = kb.any(chunk, ns.sioc('content')).value
      var del = [ $rdf.st(chunk, ns.sioc('content'), old, padDoc) ]
      var ins = [ $rdf.st(chunk, ns.sioc('content'), part.value as any, padDoc) ]
      var newOne = part.value

            // DEBUGGING ONLY
      if (part.lastSent) {
        if (old !== part.lastSent) {
          throw new Error("Out of order, last sent expected '" + old +
            "' but found '" + part.lastSent + "'")
        }
      }
      part.lastSent = newOne

      console.log(' Patch proposed to ' + chunk.uri.slice(-4) + " '" + old + "' -> '" + newOne + "' ")
      updater.update(del, ins, function (uri: string, ok: boolean, errorBody: string, xhr: XMLHttpRequest) {
        if (!ok) {
                    // alert("clash " + errorBody);
          console.log('    patch FAILED ' + xhr.status + " for '" + old + "' -> '" + newOne + "': " + errorBody)
          if (xhr.status === 409) { // Conflict -  @@ we assume someone else
            setPartStyle(part, 'color: black;  background-color: #fdd;')
            part.state = 0 // Needs downstream refresh
            const beeper = utils.beep()
            if (beeper) { beeper(0.5, 512) } // Ooops clash with other person
            setTimeout(function () {
              updater.requestDownstreamAction(padDoc, reloadAndSync)
            }, 1000)
          } else {
            setPartStyle(part, 'color: black;  background-color: #fdd;') // failed pink
            part.state = 0
            complain('    Error ' + xhr.status + ' sending data: ' + errorBody, true)
            const beeper = utils.beep()
            if (beeper) { beeper(1.0, 128) } // Other
                        // @@@   Do soemthing more serious with other errors eg auth, etc
          }
        } else {
          clearStatus(true)// upstream
          setPartStyle(part) // synced
          console.log("    Patch ok '" + old + "' -> '" + newOne + "' ")

          if (part.state === 4) { //  delete me
            part.state = 3
            removePart(part)
          } else if (part.state === 3) { // being deleted
                        // pass
          } else if (part.state === 2) {
            part.state = 1  // pending: lock
            updateStore(part)
          } else {
            part.state = 0 // clear lock
          }
        }
      })
    }

    part.addEventListener('input', function inputChangeListener (event) {
            // console.log("input changed "+part.value);
      setPartStyle(part, undefined, true) // grey out - not synced
      console.log('Input event state ' + part.state + " value '" + part.value + "'")
      switch (part.state) {
        case 3: // being deleted
          return
        case 4: // needs to be deleted
          return
        case 2: // needs content updating, we know
          return
        case 1:
          part.state = 2 // lag we need another patch
          return
        case 0:
        case undefined:
          part.state = 1 // being upadted
          updateStore(part)
      }
    }) // listener
  } // addlisteners

  var newPartAfter = function (tr1: HTMLTableRowElement, chunk: $rdf.NamedNode, before?: boolean) { // @@ take chunk and add listeners
    var text = kb.any(chunk, ns.sioc('content'))
    text = text ? text.value : ''
    var tr = dom.createElement('tr')
    if (before) {
      table.insertBefore(tr, tr1)
    } else { // after
      if (tr1 && tr1.nextSibling) {
        table.insertBefore(tr, tr1.nextSibling)
      } else {
        table.appendChild(tr)
      }
    }
    var part: HTMLInputElement & { subject?: $rdf.Node } = tr.appendChild(dom.createElement('input'))
    part.subject = chunk
    part.setAttribute('type', 'text')
    part.value = text
    if (me) {
      setPartStyle(part, '')
      addListeners(part as any, chunk)
    } else {
      setPartStyle(part, 'color: #222; background-color: #fff')
      console.log("Note can't add listeners - not logged in")
    }
    return part
  }

  var newChunk = function (ele?: HTMLElement & { subject?: $rdf.Node }, before?: boolean) { // element of chunk being split
    var kb = UI.store
    var indent = 0
    var queueProperty: null | string = null
    var here: $rdf.Node, prev: $rdf.Node, next: $rdf.Node, queue: $rdf.Node, tr1: HTMLTableRowElement | undefined

    if (ele) {
      if (ele.tagName.toLowerCase() !== 'input') {
        console.log('return pressed when current document is: ' + ele.tagName)
      }
      here = ele.subject!
      var kbIndent = kb.any(here, PAD('indent'))
      indent = kbIndent ? Number(kbIndent.value) : 0
      if (before) {
        prev = kb.any(undefined, PAD('next'), here)
        next = here
        queue = prev
        queueProperty = 'newlinesAfter'
      } else {
        prev = here
        next = kb.any(here, PAD('next'))
        queue = next
        queueProperty = 'newlinesBefore'
      }
      tr1 = ele.parentNode as HTMLTableRowElement
    } else {
      prev = subject
      next = subject
      tr1 = undefined
    }

    var chunk = UI.widgets.newThing(padDoc)
    var label = chunk.uri.slice(-4)

    var del = [$rdf.st(prev, PAD('next'), next, padDoc)]
    var ins = [$rdf.st(prev, PAD('next'), chunk, padDoc),
      $rdf.st(chunk, PAD('next'), next, padDoc),
      $rdf.st(chunk, ns.dc('author'), me, padDoc),
      // TODO: Remove `as any` after using updated type definitions of rdflib.
      //       See https://github.com/DefinitelyTyped/DefinitelyTyped/pull/35783
      $rdf.st(chunk, ns.sioc('content'), '' as any, padDoc)]
    if (indent > 0) { // Do not inherit
      ins.push($rdf.st(chunk, PAD('indent'), indent as any, padDoc))
    }

    console.log('    Fresh chunk ' + label + ' proposed')
    updater.update(del, ins, function (uri: string, ok: boolean, errorBody: string, xhr: XMLHttpRequest) {
      if (!ok) {
                // alert("Error writing new line " + label + ": " + errorBody);
        console.log('    ERROR writing new line ' + label + ': ' + errorBody)
      } else {
        var newPart = newPartAfter(tr1!, chunk, before)
        setPartStyle(newPart)
        newPart.focus() // Note this is delayed
        // It's not quite clear how this code can ever have worked, given that queue is set to a
        // single node rather than an object above, so to preserve the current behaviour,
        // it's cast to `any`:
        if (queueProperty) {
          console.log('    Fresh chunk ' + label + ' updated, queue = ' + (queue as any)[queueProperty]);
          (queue as any)[queueProperty] -= 1
          if ((queue as any)[queueProperty] > 0) {
            console.log('    Implementing queued newlines = ' + (next as any).newLinesBefore)
            newChunk(newPart, before)
          }
        }
      }
    })
  }

  var consistencyCheck = function () {
    var found: boolean[] = []
    var failed = 0
    function complain2 (msg: string) {
      complain(msg)
      failed++
    }

    if (!kb.the(subject, PAD('next'))) {
      complain2('No initial next pointer')
      return false // can't do linked list
    }
        // var chunk = kb.the(subject, PAD('next'))
    var prev = subject
    var chunk
    for (;;) {
      chunk = kb.the(prev, PAD('next'))
      if (!chunk) {
        complain2('No next pointer from ' + prev)
      }
      if (chunk.sameTerm(subject)) {
        break
      }
      prev = chunk
      var label = chunk.uri.split('#')[1]
      if (found[chunk.uri]) {
        complain2('Loop!')
        return false
      }

      found[chunk.uri] = true
      var k = kb.each(chunk, PAD('next')).length
      if (k !== 1) complain2('Should be 1 not ' + k + ' next pointer for ' + label)

      k = kb.each(chunk, PAD('indent')).length
      if (k > 1) complain2('Should be 0 or 1 not ' + k + ' indent for ' + label)

      k = kb.each(chunk, ns.sioc('content')).length
      if (k !== 1) complain2('Should be 1 not ' + k + ' contents for ' + label)

      k = kb.each(chunk, ns.dc('author')).length
      if (k !== 1) complain2('Should be 1 not ' + k + ' author for ' + label)

      var sts = kb.statementsMatching(undefined, ns.sioc('contents'))
      sts.map(function (st: any) {
        if (!found[st.subject.uri]) {
          complain2('Loose chunk! ' + st.subject.uri)
        }
      })
    }
    return !failed
  }

    // Ensure that the display matches the current state of the
  var sync = function () {
    // var first = kb.the(subject, PAD('next'))
    if (kb.each(subject, PAD('next')).length !== 1) {
      var msg = 'Pad: Inconsistent data - NEXT pointers: ' +
                (kb.each(subject, PAD('next')).length)
      console.log(msg)
      if (options.statusArea) {
        options.statusArea.textContent += msg
      }
      return
    }
    // var last = kb.the(undefined, PAD('previous'), subject)
    // var chunk = first //  = kb.the(subject, PAD('next'));
    var row

        // First see which of the logical chunks have existing physical manifestations
    var manif: Array<ChildNode | null> = []
        // Find which lines correspond to existing chunks

    for (let chunk = kb.the(subject, PAD('next'));
            !chunk.sameTerm(subject);
            chunk = kb.the(chunk, PAD('next'))) {
      for (let i = 0; i < table.children.length; i++) {
        var tr = table.children[i]
        if ((tr.firstChild as any).subject.sameTerm(chunk)) {
          manif[chunk.uri] = tr.firstChild
        }
      }
    }

        // Remove any deleted lines
    for (let i = table.children.length - 1; i >= 0; i--) {
      row = table.children[i]
      if (!manif[(row.firstChild as any).subject.uri]) {
        table.removeChild(row)
      }
    }
        // Insert any new lines and update old ones
    row = table.firstChild // might be null
    for (let chunk = kb.the(subject, PAD('next'));
            !chunk.sameTerm(subject);
            chunk = kb.the(chunk, PAD('next'))) {
      var text = kb.any(chunk, ns.sioc('content')).value
            // superstitious -- don't mess with unchanged input fields
            // which may be selected by the user
      if (row && manif[chunk.uri]) {
        var part = row.firstChild
        if (text !== (part as any).value) {
          (part as any).value = text
        }
        setPartStyle(part as any);
        (part as any).state = 0 // Clear the state machine
        delete (part as any).lastSent // DEBUG ONLY
        row = row.nextSibling
      } else {
        newPartAfter(row as HTMLTableRowElement, chunk, true) // actually before
      }
    };
  }

    // Refresh the DOM tree

  var refreshTree = function (root: HTMLElement & { refresh: Function }) {
    if (root.refresh) {
      root.refresh()
      return
    }
    for (var i = 0; i < root.children.length; i++) {
      refreshTree(root.children[i] as any)
    }
  }

  var reloading = false

  var checkAndSync = function () {
    console.log('    reloaded OK')
    clearStatus()
    if (!consistencyCheck()) {
      complain('CONSITENCY CHECK FAILED')
    } else {
      refreshTree(table as any)
    }
  }

  var reloadAndSync = function () {
    if (reloading) {
      console.log('   Already reloading - stop')
      return // once only needed
    }
    reloading = true
    var retryTimeout = 1000 // ms
    var tryReload = function () {
      console.log('try reload - timeout = ' + retryTimeout)
      updater.reload(updater.store, padDoc, function (ok: boolean, message: string, xhr: XMLHttpRequest) {
        reloading = false
        if (ok) {
          checkAndSync()
        } else {
          if (xhr.status === 0) {
            complain('Network error refreshing the pad. Retrying in ' +
                                            retryTimeout / 1000)
            reloading = true
            retryTimeout = retryTimeout * 2
            setTimeout(tryReload, retryTimeout)
          } else {
            complain('Error ' + xhr.status + 'refreshing the pad:' +
                            message + '. Stopped. ' + padDoc)
          }
        }
      })
    }
    tryReload()
  };

  (table as any).refresh = sync; // Catch downward propagating refresh events
  (table as any).reloadAndSync = reloadAndSync

  if (!me) console.log('Warning: must be logged in for pad to be edited')

  if (exists) {
    console.log('Existing pad.')
    if (consistencyCheck()) {
      sync()
      if (kb.holds(subject, PAD('next'), subject)) { // Empty list untenable
        newChunk() // require at least one line
      }
    } else {
      console.log(table.textContent = 'Inconsistent data. Abort')
    }
  } else { // Make new pad
    console.log('No pad exists - making new one.')
    var insertables = [
      $rdf.st(subject, ns.rdf('type'), PAD('Notepad'), padDoc),
      $rdf.st(subject, ns.dc('author'), me, padDoc),
      // TODO: Remove `as any` after using updated type definitions of rdflib.
      //       See https://github.com/DefinitelyTyped/DefinitelyTyped/pull/35783
      $rdf.st(subject, ns.dc('created'), new Date() as any, padDoc),
      $rdf.st(subject, PAD('next'), subject, padDoc)]

    updater.update([], insertables, function (uri: string, ok: boolean, errorBody: string) {
      if (!ok) {
        complain(errorBody)
      } else {
        console.log('Initial pad created')
        newChunk() // Add a first chunck
                // getResults();
      }
    })
  }
  return table
}