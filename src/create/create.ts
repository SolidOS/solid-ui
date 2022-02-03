/*   create.js     UI to craete new objects in the solid-app-set world
 **
 */

import { DataBrowserContext, NewPaneOptions, PaneDefinition } from 'pane-registry'
import { solidLogicSingleton } from 'solid-logic'
import * as debug from '../debug'
import { icons } from '../iconBase'
import { ensureLoadedProfile, selectWorkspace } from '../login/login'
import * as ns from '../ns'
import * as utils from '../utils'
import * as widgets from '../widgets'
import { CreateContext, NewAppInstanceOptions } from './types'

const kb = solidLogicSingleton.store

/*  newThingUI -- return UI for user to select a new object, folder, etc
 **
 ** context must include:  dom, div,
 **     optional:   folder: NamedNode -- the folder where the thing is bring put
 **                (suppresses asking for a full URI or workspace)
 **
 */
export function newThingUI (
  createContext: CreateContext,
  dataBrowserContext: DataBrowserContext,
  thePanes: Array<PaneDefinition>
): void {
  const dom = createContext.dom
  const div = createContext.div
  if (createContext.me && !createContext.me.uri) {
    throw new Error('newThingUI:  Invalid userid: ' + createContext.me)
  }

  const iconStyle = 'padding: 0.7em; width: 2em; height: 2em;' // was: 'padding: 1em; width: 3em; height: 3em;'
  const star = div.appendChild(dom.createElement('img'))
  let visible = false // the inividual tools tools
  //   noun_272948.svg = black star
  // noun_34653_green.svg = green plus
  star.setAttribute('src', icons.iconBase + 'noun_34653_green.svg')
  star.setAttribute('style', iconStyle)
  star.setAttribute('title', 'Add another tool')

  const complain = function complain (message) {
    const pre = div.appendChild(dom.createElement('pre'))
    pre.setAttribute('style', 'background-color: pink')
    pre.appendChild(dom.createTextNode(message))
  }

  function styleTheIcons (style) {
    for (let i = 0; i < iconArray.length; i++) {
      let st = iconStyle + style
      if (iconArray[i].disabled) {
        // @@ unused
        st += 'opacity: 0.3;'
      }
      iconArray[i].setAttribute('style', st) // eg 'background-color: #ccc;'
    }
  }

  function selectTool (icon) {
    styleTheIcons('display: none;') // 'background-color: #ccc;'
    icon.setAttribute('style', iconStyle + 'background-color: yellow;')
  }

  function selectNewTool (_event?) {
    visible = !visible
    star.setAttribute(
      'style',
      iconStyle + (visible ? 'background-color: yellow;' : '')
    )
    styleTheIcons(visible ? '' : 'display: none;')
  }

  star.addEventListener('click', selectNewTool)

  function makeNewAppInstance (options: NewAppInstanceOptions) {
    return new Promise(function (resolve, reject) {
      let selectUI // , selectUIParent
      function callbackWS (ws, newBase) {
        ensureLoadedProfile(createContext).then(
          _context => {
            const newPaneOptions: NewPaneOptions = Object.assign({
              newBase: newBase,
              folder: options.folder || undefined,
              workspace: ws
            }, options)
            for (const opt in options) {
              // get div, dom, me, folder, pane, refreshTable
              newPaneOptions[opt] = options[opt]
            }
            debug.log(`newThingUI: Minting new ${newPaneOptions.pane.name} at ${newPaneOptions.newBase}`)
            options.pane
              .mintNew!(dataBrowserContext, newPaneOptions)
              .then(function (newPaneOptions) {
                if (!newPaneOptions || !newPaneOptions.newInstance) {
                  throw new Error('Cannot mint new - missing newInstance')
                }
                if (newPaneOptions.folder) {
                  const tail = newPaneOptions.newInstance.uri.slice(
                    newPaneOptions.folder.uri.length
                  )
                  const isPackage = tail.includes('/')
                  debug.log('  new thing is packge? ' + isPackage)
                  if (isPackage) {
                    kb.add(
                      newPaneOptions.folder,
                      ns.ldp('contains'),
                      kb.sym(newPaneOptions.newBase),
                      newPaneOptions.folder.doc()
                    )
                  } else {
                    // single file
                    kb.add(
                      newPaneOptions.folder,
                      ns.ldp('contains'),
                      newPaneOptions.newInstance,
                      newPaneOptions.folder.doc()
                    ) // Ping the patch system?
                  }
                  // @ts-ignore @@ TODO check whether refresh can exist here. Either fix type or remove unreachable code
                  if (newPaneOptions.refreshTarget && newPaneOptions.refreshTarget.refresh) {
                    // @@ TODO Remove the need to cast as any
                    ;(newPaneOptions.refreshTarget as any).refresh() // Refresh the containing display
                  }
                  // selectUI.parentNode.removeChild(selectUI) It removes itself
                } else {
                  const p = options.div.appendChild(dom.createElement('p'))
                  p.setAttribute('style', 'font-size: 120%;')
                  // Make link to new thing
                  p.innerHTML =
                    "Your <a target='_blank' href='" +
                    newPaneOptions.newInstance.uri +
                    "'><b>new " +
                    options.noun +
                    '</b></a> is ready to be set up. ' +
                    "<br/><br/><a target='_blank' href='" +
                    newPaneOptions.newInstance.uri +
                    "'>Go to your new " +
                    options.noun +
                    '.</a>'
                  // selectUI.parentNode.removeChild(selectUI) // Clean up
                  // selectUIParent.removeChild(selectUI) // Clean up
                }
                selectNewTool() // toggle star to plain and menu vanish again
              })
              .catch(function (err) {
                complain(err)
                reject(err)
              })
          },
          err => {
            // login fails
            complain('Error logging on: ' + err)
          }
        )
      } // callbackWS

      const pa = options.pane
      // options.appPathSegment = pa.name // was 'edu.mit.solid.pane.'
      options.noun = pa.mintClass ? utils.label(pa.mintClass) : pa.name
      options.appPathSegment = options.noun.slice(0, 1).toUpperCase() + options.noun.slice(1)

      if (!options.folder) {
        // No folder given? Ask user for full URI
        selectUI = selectWorkspace(dom, {
          noun: options.noun,
          appPathSegment: options.appPathSegment
        }, callbackWS)
        options.div.appendChild(selectUI)
        // selectUIParent = options.div
      } else {
        const gotName = function (name) {
          if (!name) {
            // selectUIParent.removeChild(selectUI)   itremves itself if cancelled
            selectNewTool() // toggle star to plain and menu vanish again
          } else {
            let uri = options.folder!.uri
            if (!uri.endsWith('/')) {
              uri = uri + '/'
            }
            uri = uri + encodeURIComponent(name) + '/'
            callbackWS(null, uri)
          }
        }
        widgets
          .askName(
            dom,
            kb,
            options.div,
            ns.foaf('name'),
            null,
            options.noun
          )
          .then(gotName)
        // selectUI = getNameForm(dom, kb, options.noun, gotName)
        // options.div.appendChild(selectUI)
        // selectUIParent = options.div
      }
    })
  } // makeNewAppInstance

  const iconArray: Array<any> = []
  const mintingPanes = Object.values(thePanes).filter(pane => pane.mintNew)
  const mintingClassMap = mintingPanes.reduce((classMap, pane) => {
    if (pane.mintClass) {
      classMap[pane.mintClass.uri] = (classMap[pane.mintClass.uri] || 0) + 1
    }
    return classMap
  }, {})
  mintingPanes.forEach(pane => {
    // @@ TODO Remove the need to cast to any
    const icon: any = createContext.div.appendChild(dom.createElement('img'))
    icon.setAttribute('src', pane.icon)
    const noun = pane.mintClass
      ? mintingClassMap[pane.mintClass.uri] > 1
        ? `${utils.label(pane.mintClass)} (using ${pane.name} pane)`
        : utils.label(pane.mintClass)
      : pane.name + ' @@'
    icon.setAttribute('title', 'Make new ' + noun)
    icon.setAttribute('style', iconStyle + 'display: none;')
    iconArray.push(icon)
    if (!icon.disabled) {
      icon.addEventListener('click', function (e) {
        selectTool(icon)
        makeNewAppInstance({
          event: e,
          folder: createContext.folder || null,
          iconEle: icon,
          pane,
          noun,
          noIndexHTML: true, // do NOT @@ for now write a HTML file
          div: createContext.div,
          me: createContext.me,
          dom: createContext.dom,
          refreshTarget: createContext.refreshTarget
        })
      })
    }
  })
}

// Form to get the name of a new thing before we create it
//
// Used in contacts for new groups, individuals.
//
/*
function getNameForm (dom, kb, classLabel, gotNameCallback) {
  const form = dom.createElement('div') // form is broken as HTML behaviour can resurface on js error
  form.innerHTML = '<p>Name of new ' + classLabel + ':</p>'
  const namefield = dom.createElement('input')
  namefield.setAttribute('type', 'text')
  namefield.setAttribute('size', '30')
  namefield.setAttribute('style', style.textInputStyle)
  namefield.setAttribute('maxLength', '2048') // No arbitrary limits
  namefield.select() // focus next user input

  const gotName = function () {
    namefield.setAttribute('class', 'pendingedit')
    namefield.disabled = true
    continueButton.disabled = true
    cancel.disabled = true
    gotNameCallback(true, namefield.value)
  }

  namefield.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
      gotName()
    }
  }, false)
  form.appendChild(namefield)

  form.appendChild(dom.createElement('br'))

  const cancel = form.appendChild(widgets.cancelButton(dom))
  cancel.addEventListener('click', function (e) {
    form.parentNode.removeChild(form)
    gotNameCallback(false)
  }, false)

  const continueButton = form.appendChild(widgets.continueButton(dom))
  continueButton.addEventListener('click', function (e) {
    gotName()
  }, false)

  return form
}
*/
