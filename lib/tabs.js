"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tabWidget = tabWidget;
exports.TabWidgetElement = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _widgets = require("./widgets");

var _utils = require("./utils");

var _logic = require("./logic");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * @ignore
 */
var ContainerElement = /*#__PURE__*/function (_HTMLElement) {
  (0, _inherits2["default"])(ContainerElement, _HTMLElement);

  var _super = _createSuper(ContainerElement);

  function ContainerElement() {
    var _this;

    (0, _classCallCheck2["default"])(this, ContainerElement);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "asSettings", void 0);
    return _this;
  }

  return ContainerElement;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(HTMLElement));

var TabWidgetElement = /*#__PURE__*/function (_HTMLElement2) {
  (0, _inherits2["default"])(TabWidgetElement, _HTMLElement2);

  var _super2 = _createSuper(TabWidgetElement);

  function TabWidgetElement() {
    var _this2;

    (0, _classCallCheck2["default"])(this, TabWidgetElement);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _super2.call.apply(_super2, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "bodyContainer", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "refresh", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "tabContainer", void 0);
    return _this2;
  }

  return TabWidgetElement;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(HTMLElement));
/**
 * @ignore
 */


exports.TabWidgetElement = TabWidgetElement;

var TabElement = /*#__PURE__*/function (_HTMLElement3) {
  (0, _inherits2["default"])(TabElement, _HTMLElement3);

  var _super3 = _createSuper(TabElement);

  function TabElement() {
    var _this3;

    (0, _classCallCheck2["default"])(this, TabElement);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this3 = _super3.call.apply(_super3, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this3), "bodyTR", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this3), "subject", void 0);
    return _this3;
  }

  return TabElement;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(HTMLElement));
/**
 * Use this widget to generate tabs from triples set in the global store.
 *
 * [Here you can see examples of the tabs](https://solid.github.io/solid-ui/examples/tabs/).
 *
 * It assumes that items to use for tabs will be in a collection by default,
 * e.g.:
 *
 * ```turtle
 * :subject :predicate ( :item1 :item2 ) .
 * ```
 *
 * You can override this by setting `ordered: false`, in which case it expects
 * unordered triples:
 *
 * ```turtle
 * :subject :predicate :item1, :item 2 .
 * ```
 *
 * Triples that are not ordered in collection are in principle not sorted,
 * which means that tabs could change order every time you render the widget.
 * But in this case the widget will try to sort it in order to keep it
 * consistent.
 *
 * In both of these cases you need to define options `subject` and `predicate`
 * to tell the widget which triples it should be looking for.
 *
 * Finally you can set items manually, using the `items` option, e.g.:
 *
 * ```javascript
 * {
 *   items: [
 *     namedNode('https://domain.tld/#item1'),
 *     namedNode('https://domain.tld/#item2')
 *   ]
 * }
 * ```
 *
 * When you set items manually you do not need to set `subject` and
 * `predicate`.
 *
 * In any case you probably want to set the renderMain option to specify
 * what should be rendered for the various items, e.g.:
 *
 * ```javascript
 * {
 *   renderMain: (bodyMain, subject) => {
 *     bodyMain.innerHTML = renderItem(subject)
 *   }
 * }
 * ```
 *
 * **Note:** `renderItem` is a custom function that you need to define yourself.
 *
 * The option `renderTabSettings` allows you to render a custom view in the
 * body container that is shown when you hold the ALT key and click on a
 * tab. It works very much like the `renderMain` option:
 *
 * ```javascript
 * {
 *   renderTabSettings: (bodyMain, subject) => {
 *     bodyMain.innerHTML = renderTabSettings(subject)
 *   }
 * }
 * ```
 *
 * **Note:** `renderTabSettings` is a custom function that you need to define
 * yourself.
 *
 * By default the widget will try to guess the label by using the
 * [[utils.label]] function. If you want to customize this yourself, you can
 * use the `renderTab` option:
 *
 * ```javascript
 * {
 *   renderTab: (tabDiv, subject) => {
 *     tabDiv.innerText = renderTabText(subject)
 *   }
 * }
 * ```
 *
 * **Note:** `renderTabText` is a custom function you need to define yourself.
 *
 * The option renderTab is also important if you want to set which tab should
 * be selected once the widget is rendered. By default it will simply select
 * the first tab, but you can override by setting `dataset.name` on the tab
 * and referring to the same string in `selectedTab`:
 *
 * ```javascript
 * {
 *   renderTab: (tabDiv, subject)  => {
 *     tabDiv.dataset.name = subject.uri
 *   },
 *   selectedTab: item2.uri
 * }
 * ```
 *
 * You can apply a color to use for tabs and border of the container by using
 * option `background-color`. This is #ddddcc by default.
 *
 * You can override the document object that the widget uses to generate DOM
 * elements by setting the option `dom`. This is encouraged to set if you
 * intend your functionality to be used in environments that don't provide
 * a global `document` object.
 *
 * If you want to render a close button next to the tabs you can set option
 * `onClose` which takes a callback function that is triggered when the
 * button is clicked:
 *
 * ```javascript
 * {
 *   onClose: (event) => {
 *     // do something that hides the widget altogether
 *   }
 * }
 * ```
 *
 * The option `orientation` allows you to set which side the tabs should be
 * located: `'0'` = Top, `'1'` = Left, `'2'` = Bottom, `'3'` = Right
 *
 * If you don't want to render anything in the body container by default,
 * you can set the option `startEmpty` to `true`.
 *
 * @param options
 */


function tabWidget(options) {
  var subject = options.subject;
  var dom = options.dom || document;
  var orientation = parseInt(options.orientation || '0');
  var backgroundColor = options.backgroundColor || '#ddddcc';
  var flipped = orientation & 2;
  var vertical = orientation & 1;
  var onClose = options.onClose;

  var _getColors = getColors(backgroundColor),
      _getColors2 = (0, _slicedToArray2["default"])(_getColors, 2),
      selectedColor = _getColors2[0],
      color = _getColors2[1];

  var bodyMainStyle = "flex: 2; width: auto; height: 100%; border: 0.1em; border-style: solid; border-color: ".concat(selectedColor, "; padding: 1em;");
  var rootElement = dom.createElement('div'); // 20200117a

  rootElement.setAttribute('style', 'display: flex; height: 100%; width: 100%; flex-direction: ' + (vertical ? 'row' : 'column') + (flipped ? '-reverse;' : ';'));
  var navElement = rootElement.appendChild(dom.createElement('nav'));
  navElement.setAttribute('style', 'margin: 0;');
  var mainElement = rootElement.appendChild(dom.createElement('main'));
  mainElement.setAttribute('style', 'margin: 0; width:100%; height: 100%;'); // override tabbedtab.css

  var tabContainer = navElement.appendChild(dom.createElement('ul'));
  tabContainer.setAttribute('style', "\n    list-style-type: none;\n    display: flex;\n    height: 100%;\n    width: 100%;\n    margin: 0;\n    padding: 0;\n    flex-direction: ".concat(vertical ? 'column' : 'row', "\n  "));
  var tabElement = 'li';
  var bodyContainer = mainElement;
  rootElement.tabContainer = tabContainer;
  rootElement.bodyContainer = bodyContainer;
  var corners = ['0.2em', '0.2em', '0', '0']; // top left, TR, BR, BL

  var cornersPrepped = corners.concat(corners).slice(orientation, orientation + 4);
  var cornersStyle = "border-radius: ".concat(cornersPrepped.join(' '), ";");
  var margins = ['0.3em', '0.3em', '0', '0.3em']; // top, right, bottom, left

  var marginsPrepped = margins.concat(margins).slice(orientation, orientation + 4);
  var marginsStyle = "margin: ".concat(marginsPrepped.join(' '), ";");
  var paddingStyle = "padding: ".concat(marginsPrepped.join(' '), ";");
  var tabStyle = cornersStyle + "padding: 0.7em; max-width: 20em; color: ".concat(color, ";");
  var unselectedStyle = "".concat(tabStyle + marginsStyle, "opacity: 50%; background-color: ").concat(backgroundColor, ";");
  var selectedStyle = "".concat(tabStyle + marginsStyle, "background-color: ").concat(selectedColor, ";");
  var shownStyle = 'height: 100%; width: 100%;';
  var hiddenStyle = shownStyle + 'display: none;';
  rootElement.refresh = orderedSync;
  orderedSync();

  if (!options.startEmpty && tabContainer.children.length && options.selectedTab) {
    var selectedTab = Array.from(tabContainer.children).map(function (tab) {
      return tab.firstChild;
    }).find(function (tab) {
      return tab.dataset.name === options.selectedTab;
    });
    var tab = selectedTab || tabContainer.children[0].firstChild;
    tab.click();
  } else if (!options.startEmpty) {
    tabContainer.children[0].firstChild.click(); // Open first tab
  }

  return rootElement;

  function addCancelButton(tabContainer) {
    if (tabContainer.dataset.onCloseSet) {
      // @@ TODO: this is only here to make the browser tests work
      // Discussion at https://github.com/solid/solid-ui/pull/110#issuecomment-527080663
      var existingCancelButton = tabContainer.querySelector('.unstyled');
      tabContainer.removeChild(existingCancelButton);
    }

    var extraTab = dom.createElement(tabElement);
    extraTab.classList.add('unstyled');
    var tabCancelButton = (0, _widgets.cancelButton)(dom, onClose);
    tabCancelButton.setAttribute('style', tabCancelButton.getAttribute('style') + paddingStyle);
    extraTab.appendChild(tabCancelButton);
    tabContainer.appendChild(extraTab);
    tabContainer.dataset.onCloseSet = 'true';
  }

  function getItems() {
    if (options.items) return options.items;

    if (options.ordered !== false) {
      // options.ordered defaults to true
      return _logic.store.the(subject, options.predicate).elements;
    } else {
      return _logic.store.each(subject, options.predicate);
    }
  }

  function makeNewSlot(item) {
    var ele = dom.createElement(tabElement);
    ele.subject = item;
    var div = ele.appendChild(dom.createElement('div'));
    div.setAttribute('style', unselectedStyle);
    div.addEventListener('click', function (e) {
      if (!e.metaKey) {
        resetTabStyle();
        resetBodyStyle();
      }

      div.setAttribute('style', selectedStyle);
      if (!ele.bodyTR) return;
      ele.bodyTR.setAttribute('style', shownStyle);
      var bodyMain = getOrCreateContainerElement(ele);

      if (options.renderTabSettings && e.altKey && ele.subject && bodyMain.asSettings !== true) {
        bodyMain.innerHTML = 'loading settings ...' + item;
        options.renderTabSettings(bodyMain, ele.subject);
        bodyMain.asSettings = true;
      } else if (options.renderMain && ele.subject && bodyMain.asSettings !== false) {
        bodyMain.innerHTML = 'loading item ...' + item;
        options.renderMain(bodyMain, ele.subject);
        bodyMain.asSettings = false;
      }
    });

    if (options.renderTab) {
      options.renderTab(div, item);
    } else {
      div.textContent = (0, _utils.label)(item);
    }

    return ele;

    function getOrCreateContainerElement(ele) {
      var _ele$bodyTR;

      var bodyMain = (_ele$bodyTR = ele.bodyTR) === null || _ele$bodyTR === void 0 ? void 0 : _ele$bodyTR.children[0];
      if (bodyMain) return bodyMain;
      var newBodyMain = ele.bodyTR.appendChild(dom.createElement('main'));
      newBodyMain.setAttribute('style', bodyMainStyle);
      return newBodyMain;
    }
  } // @@ Use common one from utils?


  function orderedSync() {
    var items = getItems();
    var slot, i, j, left, right;
    var differ = false; // Find how many match at each end

    for (left = 0; left < tabContainer.children.length; left++) {
      slot = tabContainer.children[left];

      if (left >= items.length || slot.subject && !slot.subject.sameTerm(items[left])) {
        differ = true;
        break;
      }
    }

    if (!differ && items.length === tabContainer.children.length) {
      return; // The two just match in order: a case to optimize for
    }

    for (right = tabContainer.children.length - 1; right >= 0; right--) {
      slot = tabContainer.children[right];
      j = right - tabContainer.children.length + items.length;

      if (slot.subject && !slot.subject.sameTerm(items[j])) {
        break;
      }
    } // The elements left ... right in tabContainer.children do not match


    var insertables = items.slice(left, right - tabContainer.children.length + items.length + 1);

    while (right >= left) {
      // remove extra
      tabContainer.removeChild(tabContainer.children[left]);
      bodyContainer.removeChild(bodyContainer.children[left]);
      right -= 1;
    }

    for (i = 0; i < insertables.length; i++) {
      var newSlot = makeNewSlot(insertables[i]);
      var newBodyDiv = dom.createElement('div');
      newSlot.bodyTR = newBodyDiv;

      if (left === tabContainer.children.length) {
        // None left of original on right
        tabContainer.appendChild(newSlot);
        bodyContainer.appendChild(newBodyDiv);
      } else {
        tabContainer.insertBefore(newSlot, tabContainer.children[left + i]);
        bodyContainer.insertBefore(newBodyDiv, bodyContainer.children[left + i]);
      }
    }

    if (onClose) {
      addCancelButton(tabContainer);
    }
  }

  function resetTabStyle() {
    for (var i = 0; i < tabContainer.children.length; i++) {
      var _tab = tabContainer.children[i];

      if (_tab.classList.contains('unstyled')) {
        continue;
      }

      if (_tab.children[0]) {
        _tab.children[0].setAttribute('style', unselectedStyle);
      }
    }
  }

  function resetBodyStyle() {
    for (var i = 0; i < bodyContainer.children.length; i++) {
      bodyContainer.children[i].setAttribute('style', hiddenStyle);
    }
  }
}
/**
 * @internal
 */


function getColors(backgroundColor) {
  return isLight(backgroundColor) ? [colorBlend(backgroundColor, '#ffffff', 0.3), '#000000'] : [colorBlend(backgroundColor, '#000000', 0.3), '#ffffff'];
}
/**
 * @internal
 */


function colorBlend(a, b, mix) {
  var ca, cb, res;
  var str = '#';
  var hex = '0123456789abcdef';

  for (var i = 0; i < 3; i++) {
    ca = parseInt(a.slice(i * 2 + 1, i * 2 + 3), 16);
    cb = parseInt(b.slice(i * 2 + 1, i * 2 + 3), 16);
    res = ca * (1.0 - mix) + cb * mix; // @@@ rounding

    var res2 = parseInt(('' + res).split('.')[0]); // @@ ugh

    var h = parseInt(('' + res2 / 16).split('.')[0]); // @@ ugh

    var l = parseInt(('' + res2 % 16).split('.')[0]); // @@ ugh

    str += hex[h] + hex[l];
  }

  return str;
}
/**
 * @internal
 */


function isLight(x) {
  var total = 0;

  for (var i = 0; i < 3; i++) {
    total += parseInt(x.slice(i * 2 + 1, i * 2 + 3), 16);
  }

  return total > 128 * 3;
}
//# sourceMappingURL=tabs.js.map