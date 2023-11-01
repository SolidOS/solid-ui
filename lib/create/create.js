"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newThingUI = newThingUI;
var _solidLogic = require("solid-logic");
var debug = _interopRequireWildcard(require("../debug"));
var _iconBase = require("../iconBase");
var _login = require("../login/login");
var ns = _interopRequireWildcard(require("../ns"));
var utils = _interopRequireWildcard(require("../utils"));
var widgets = _interopRequireWildcard(require("../widgets"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/*   create.js     UI to craete new objects in the solid-app-set world
 **
 */

var kb = _solidLogic.solidLogicSingleton.store;

/*  newThingUI -- return UI for user to select a new object, folder, etc
 **
 ** context must include:  dom, div,
 **     optional:   folder: NamedNode -- the folder where the thing is bring put
 **                (suppresses asking for a full URI or workspace)
 **
 */
function newThingUI(createContext, dataBrowserContext, thePanes) {
  var dom = createContext.dom;
  var div = createContext.div;
  if (createContext.me && !createContext.me.uri) {
    throw new Error('newThingUI:  Invalid userid: ' + createContext.me);
  }
  var iconStyle = 'padding: 0.7em; width: 2em; height: 2em;'; // was: 'padding: 1em; width: 3em; height: 3em;'
  var star = div.appendChild(dom.createElement('img'));
  var visible = false; // the inividual tools tools
  //   noun_272948.svg = black star
  // noun_34653_green.svg = green plus
  star.setAttribute('src', _iconBase.icons.iconBase + 'noun_34653_green.svg');
  star.setAttribute('style', iconStyle);
  star.setAttribute('title', 'Add another tool');
  var complain = function complain(message) {
    var pre = div.appendChild(dom.createElement('pre'));
    pre.setAttribute('style', 'background-color: pink');
    pre.appendChild(dom.createTextNode(message));
  };
  function styleTheIcons(style) {
    for (var i = 0; i < iconArray.length; i++) {
      var st = iconStyle + style;
      if (iconArray[i].disabled) {
        // @@ unused
        st += 'opacity: 0.3;';
      }
      iconArray[i].setAttribute('style', st); // eg 'background-color: #ccc;'
    }
  }

  function selectTool(icon) {
    styleTheIcons('display: none;'); // 'background-color: #ccc;'
    icon.setAttribute('style', iconStyle + 'background-color: yellow;');
  }
  function selectNewTool(_event) {
    visible = !visible;
    star.setAttribute('style', iconStyle + (visible ? 'background-color: yellow;' : ''));
    styleTheIcons(visible ? '' : 'display: none;');
  }
  star.addEventListener('click', selectNewTool);
  function makeNewAppInstance(options) {
    return new Promise(function (resolve, reject) {
      var selectUI; // , selectUIParent
      function callbackWS(ws, newBase) {
        (0, _login.ensureLoadedProfile)(createContext).then(function (_context) {
          var newPaneOptions = Object.assign({
            newBase: newBase,
            folder: options.folder || undefined,
            workspace: ws
          }, options);
          for (var opt in options) {
            // get div, dom, me, folder, pane, refreshTable
            newPaneOptions[opt] = options[opt];
          }
          debug.log("newThingUI: Minting new ".concat(newPaneOptions.pane.name, " at ").concat(newPaneOptions.newBase));
          options.pane.mintNew(dataBrowserContext, newPaneOptions).then(function (newPaneOptions) {
            if (!newPaneOptions || !newPaneOptions.newInstance) {
              throw new Error('Cannot mint new - missing newInstance');
            }
            if (newPaneOptions.folder) {
              var tail = newPaneOptions.newInstance.uri.slice(newPaneOptions.folder.uri.length);
              var isPackage = tail.includes('/');
              debug.log('  new thing is packge? ' + isPackage);
              if (isPackage) {
                kb.add(newPaneOptions.folder, ns.ldp('contains'), kb.sym(newPaneOptions.newBase), newPaneOptions.folder.doc());
              } else {
                // single file
                kb.add(newPaneOptions.folder, ns.ldp('contains'), newPaneOptions.newInstance, newPaneOptions.folder.doc()); // Ping the patch system?
              }
              // @ts-ignore @@ TODO check whether refresh can exist here. Either fix type or remove unreachable code
              if (newPaneOptions.refreshTarget && newPaneOptions.refreshTarget.refresh) {
                // @@ TODO Remove the need to cast as any
                ;
                newPaneOptions.refreshTarget.refresh(); // Refresh the containing display
              }
              // selectUI.parentNode.removeChild(selectUI) It removes itself
            } else {
              var p = options.div.appendChild(dom.createElement('p'));
              p.setAttribute('style', 'font-size: 120%;');
              // Make link to new thing
              p.innerHTML = "Your <a target='_blank' href='" + newPaneOptions.newInstance.uri + "'><b>new " + options.noun + '</b></a> is ready to be set up. ' + "<br/><br/><a target='_blank' href='" + newPaneOptions.newInstance.uri + "'>Go to your new " + options.noun + '.</a>';
              // selectUI.parentNode.removeChild(selectUI) // Clean up
              // selectUIParent.removeChild(selectUI) // Clean up
            }

            selectNewTool(); // toggle star to plain and menu vanish again
          })["catch"](function (err) {
            complain(err);
            reject(err);
          });
        }, function (err) {
          // login fails
          complain('Error logging on: ' + err);
        });
      } // callbackWS

      var pa = options.pane;
      // options.appPathSegment = pa.name // was 'edu.mit.solid.pane.'
      options.noun = pa.mintClass ? utils.label(pa.mintClass) : pa.name;
      options.appPathSegment = options.noun.slice(0, 1).toUpperCase() + options.noun.slice(1);
      if (!options.folder) {
        // No folder given? Ask user for full URI
        selectUI = (0, _login.selectWorkspace)(dom, {
          noun: options.noun,
          appPathSegment: options.appPathSegment
        }, callbackWS);
        options.div.appendChild(selectUI);
        // selectUIParent = options.div
      } else {
        var gotName = function gotName(name) {
          if (!name) {
            // selectUIParent.removeChild(selectUI)   itremves itself if cancelled
            selectNewTool(); // toggle star to plain and menu vanish again
          } else {
            var uri = options.folder.uri;
            if (!uri.endsWith('/')) {
              uri = uri + '/';
            }
            uri = uri + encodeURIComponent(name) + '/';
            callbackWS(null, uri);
          }
        };
        widgets.askName(dom, kb, options.div, ns.foaf('name'), null, options.noun).then(gotName);
        // selectUI = getNameForm(dom, kb, options.noun, gotName)
        // options.div.appendChild(selectUI)
        // selectUIParent = options.div
      }
    });
  } // makeNewAppInstance

  var iconArray = [];
  var mintingPanes = Object.values(thePanes).filter(function (pane) {
    return pane.mintNew;
  });
  var mintingClassMap = mintingPanes.reduce(function (classMap, pane) {
    if (pane.mintClass) {
      classMap[pane.mintClass.uri] = (classMap[pane.mintClass.uri] || 0) + 1;
    }
    return classMap;
  }, {});
  mintingPanes.forEach(function (pane) {
    // @@ TODO Remove the need to cast to any
    var icon = createContext.div.appendChild(dom.createElement('img'));
    icon.setAttribute('src', pane.icon);
    var noun = pane.mintClass ? mintingClassMap[pane.mintClass.uri] > 1 ? "".concat(utils.label(pane.mintClass), " (using ").concat(pane.name, " pane)") : utils.label(pane.mintClass) : pane.name + ' @@';
    icon.setAttribute('title', 'Make new ' + noun);
    icon.setAttribute('style', iconStyle + 'display: none;');
    iconArray.push(icon);
    if (!icon.disabled) {
      icon.addEventListener('click', function (e) {
        selectTool(icon);
        makeNewAppInstance({
          event: e,
          folder: createContext.folder || null,
          iconEle: icon,
          pane: pane,
          noun: noun,
          noIndexHTML: true,
          // do NOT @@ for now write a HTML file
          div: createContext.div,
          me: createContext.me,
          dom: createContext.dom,
          refreshTarget: createContext.refreshTarget
        });
      });
    }
  });
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
//# sourceMappingURL=create.js.map