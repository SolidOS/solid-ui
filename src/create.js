/*   create.js     UI to craete new objects in the solid-app-set world
**
*/

//const SolidTls = require('solid-auth-tls')
const $rdf = require('rdflib')
// const error = require('./widgets/error')
const widgets = require('./widgets/index')
// const utils = require('./utils')
const solidAuthClient = require('solid-auth-client')

const UI = {
  authn: require('./signin'),
  icons: require('./iconBase'),
  log: require('./log'),
  ns: require('./ns'),
  store: require('./store'),
  utils: require('./utils')
}

const kb = UI.store
const buttonStyle = 'font-size: 100%; margin: 0.8em; padding:0.5em;'

module.exports = {
  newThingUI
}

/*  newThingUI -- return UI for user to select a new object, folder, etc
**
** context must include:  dom, div,
**     optional:   folder: NamedNode -- the folder where the thing is bring put
**                (suppresses asking for a full URI or workspace)
**
*/
function newThingUI(context, panes) {
  const dom = context.dom
  const div = context.div
  if (context.me && !context.me.uri) throw new Error ('newThingUI:  Invalid userid ' + me)

  var iconStyle = 'padding: 0.7em; width: 2em; height: 2em;' // was: 'padding: 1em; width: 3em; height: 3em;'
  var star = div.appendChild(dom.createElement('img'))
  var visible = false // the inividual tools tools
  //   noun_272948.svg = black star
  // noun_34653_green.svg = green plus
  star.setAttribute('src', UI.icons.iconBase + 'noun_34653_green.svg')
  star.setAttribute('style', iconStyle)
  star.setAttribute('title', 'Add another tool to the meeting')

  var complain = function complain (message) {
    var pre = div.appendChild(dom.createElement('pre'))
    pre.setAttribute('style', 'background-color: pink')
    pre.appendChild(dom.createTextNode(message))
  }

  var selectNewTool = function (event) {
    visible = !visible
    star.setAttribute('style', iconStyle + (visible ? 'background-color: yellow;' : ''))
    styleTheIcons(visible ? '' : 'display: none;')
  }
  var resetIconBar = function(){
    visibile = false
    star.setAttribute('style', iconStyle + (visible ? 'background-color: yellow;' : ''))
    styleTheIcons('display: none;')
  }
  star.addEventListener('click', selectNewTool)
  var makeNewAppInstance = function (options) {
    return new Promise(function (resolve, reject) {
      var selectUI, selectUIParent
      var callbackWS = function (ws, newBase) {
        var newPaneOptions = {
          newBase: newBase,
          workspace: ws,
        }
        for (var opt in options) { // get div, dom, me, folder, pane, refreshTable
          newPaneOptions[opt] = options[opt]
        }
        console.log("newThingUI: Minting new " + newPaneOptions.pane.name + " at " + newPaneOptions.newBase)
        options.pane.mintNew(newPaneOptions)
          .then(function (newPaneOptions) {
            if (!newPaneOptions || !newPaneOptions.newInstance) {
              throw new Error('Cannot mint new - missing newInstance')
            }
            if (newPaneOptions.folder){
              kb.add(newPaneOptions.folder, UI.ns.ldp('contains'), kb.sym(newPaneOptions.newBase),
                newPaneOptions.folder.doc()) // Ping the patch system?
              if (newPaneOptions.refreshTarget){
                newPaneOptions.refreshTarget.refresh() // Refresh the cntaining display
              }
              selectUI.parentNode.removeChild(selectUI)
            } else {
              var p = options.div.appendChild(dom.createElement('p'))
              p.setAttribute('style', 'font-size: 120%;')
              // Make link to new thing
              p.innerHTML =
                "Your <a target='_blank' href='" + newPaneOptions.newInstance.uri + "'><b>new " + options.noun + '</b></a> is ready to be set up. ' +
                "<br/><br/><a target='_blank' href='" + newPaneOptions.newInstance.uri + "'>Go to your new " + options.noun + '.</a>'
                //selectUI.parentNode.removeChild(selectUI) // Clean up
                selectUIParent.removeChild(selectUI) // Clean up
            }
            selectNewTool() // toggle star to plain and menu vanish again
          })
          .catch(function (err) {
            complain(err)
            reject(err)
          })
      }

      var pa = options.pane
      options.appPathSegment = 'edu.mit.solid.pane.' + pa.name
      options.noun = pa.mintClass ? UI.utils.label(pa.mintClass) : pa.name

      if (!options.folder){ // No folder given? Ask user for full URI
        selectUI = UI.authn.selectWorkspace(dom, options, callbackWS)
        options.div.appendChild(selectUI)
        selectUIParent = options.div
      } else {
        var gotName = function(ok, name){
          if (!ok){
            // selectUIParent.removeChild(selectUI)   itremves itself if cancelled
            selectNewTool() // toggle star to plain and menu vanish again
          } else {
            var uri = options.folder.uri
            if (!uri.endsWith('/')){
              uri = uri + '/'
            }
            uri = uri + encodeURIComponent(name) + '/'
            callbackWS(null, uri)
          }
        }
        selectUI = getNameForm(dom, UI.store, options.noun, gotName)
        options.div.appendChild(selectUI)
        selectUIParent = options.div

      }
    })
  } // makeNewAppInstance

  var iconArray = []
  for (var pn in panes) {
    var pane = panes[pn]
    if (pane.mintNew) {
      var icon = context.div.appendChild(dom.createElement('img'))
      icon.setAttribute('src', pane.icon)
      var noun = pane.mintClass ? UI.utils.label(pane.mintClass) : (pane.name + ' @@')
      icon.setAttribute('title', 'Make new ' + noun)
      icon.setAttribute('style', iconStyle + 'display: none;')
      iconArray.push(icon)
      var foo = function (pane, icon, noun) {
        var iconEle = icon
        var thisPane = pane
        var thisNoun = noun
        if (!icon.disabled) {
          icon.addEventListener('click', function (e) {
            selectTool(iconEle)
            var options = {
              event: e,
              folder: context.folder,
              iconEle: iconEle,
              pane: thisPane,
              noun: thisNoun,
              noIndexHTML: true, // do NOT @@ for now write a HTML file
              div: context.div,
              me: context.me,
              dom: context.dom,
              refreshTarget: context.refreshTarget
            }
            makeNewAppInstance(options)
          })
        }
      } // foo
      foo(pane, icon, noun)
    }
  }

  var styleTheIcons = function (style) {
    for (var i = 0; i < iconArray.length; i++) {
      var st = iconStyle + style
      if (iconArray[i].disabled) { // @@ unused
        st += 'opacity: 0.3;'
      }
      iconArray[i].setAttribute('style', st) // eg 'background-color: #ccc;'
    }
  }
  var selectTool = function (icon) {
    styleTheIcons('display: none;') // 'background-color: #ccc;'
    icon.setAttribute('style', iconStyle + 'background-color: yellow;')
  }
}

// Form to get the name of a new thing before we create it
//
// Used in contacts for new groups, individuals.
//
function getNameForm(dom, kb, classLabel, gotNameCallback) {
  var form = dom.createElement('div') // form is broken as HTML behaviour can resurface on js error
  form.innerHTML = '<p>Name of new ' + classLabel + ':</p>'
  var namefield = dom.createElement('input')
  namefield.setAttribute('type', 'text')
  namefield.setAttribute('size', '30')
  namefield.setAttribute('style', buttonStyle)
  namefield.setAttribute('maxLength', '2048') // No arbitrary limits
  namefield.select() // focus next user input

  var gotName = function () {
    namefield.setAttribute('class', 'pendingedit')
    namefield.disabled = true
    gotNameCallback(true, namefield.value)
  }

  namefield.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
      gotName()
    }
  }, false)
  form.appendChild(namefield)

  var br = form.appendChild(dom.createElement('br'))

  var cancel = form.appendChild(dom.createElement('button'))
  cancel.setAttribute('type', 'button')
  cancel.style.cssText = buttonStyle
  cancel.innerHTML = 'Cancel'
  cancel.addEventListener('click', function (e) {
    form.parentNode.removeChild(form)
    gotNameCallback(false)
  }, false)

  var b = form.appendChild(dom.createElement('button'))
  b.setAttribute('type', 'button')
  b.innerHTML = 'Continue'
  b.style.cssText = buttonStyle
  b.addEventListener('click', function (e) {
    gotName()
  }, false)

  return form
}
