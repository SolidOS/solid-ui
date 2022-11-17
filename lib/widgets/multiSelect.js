"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconicMultiSelect = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var style = _interopRequireWildcard(require("../style_multiSelect"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/*
 * IconicMultiSelect v0.7.0
 * Licence:  MIT
 * (c) 2021 Sidney Wimart.
 * repo & configuration: https://github.com/sidneywm/iconic-multiselect
 */
/**
 * @version IconicMultiSelect v0.7.0
 * @licence  MIT
 */
var IconicMultiSelect = /*#__PURE__*/function () {
  /**
   * Iconic Multiselect constructor.
   * @param { Object[] } data - Array of objects.
   * @param { string } noData - Defines the message when there is no data input.
   * @param { string } noResults - Defines the message when there is no result if options are filtered.
   * @param { string } placeholder -  Defines the placeholder's text.
   * @param { string } select - DOM element to be selected. It must be a HTML Select tag - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
   * @param { string } textField - Field to select in the object for the text.
   * @param { string } valueField - Field to select in the object for the value.
   */
  function IconicMultiSelect(_ref) {
    var data = _ref.data,
      itemTemplate = _ref.itemTemplate,
      noData = _ref.noData,
      noResults = _ref.noResults,
      placeholder = _ref.placeholder,
      select = _ref.select,
      container = _ref.container,
      tagTemplate = _ref.tagTemplate,
      textField = _ref.textField,
      valueField = _ref.valueField;
    (0, _classCallCheck2["default"])(this, IconicMultiSelect);
    (0, _defineProperty2["default"])(this, "_data", void 0);
    (0, _defineProperty2["default"])(this, "_domElements", void 0);
    (0, _defineProperty2["default"])(this, "_event", function () {});
    (0, _defineProperty2["default"])(this, "_itemTemplate", void 0);
    (0, _defineProperty2["default"])(this, "_multiselect", void 0);
    (0, _defineProperty2["default"])(this, "_noData", void 0);
    (0, _defineProperty2["default"])(this, "_noResults", void 0);
    (0, _defineProperty2["default"])(this, "_options", []);
    (0, _defineProperty2["default"])(this, "_placeholder", void 0);
    (0, _defineProperty2["default"])(this, "_select", void 0);
    (0, _defineProperty2["default"])(this, "_selectContainer", void 0);
    (0, _defineProperty2["default"])(this, "_selectedOptions", []);
    (0, _defineProperty2["default"])(this, "_tagTemplate", void 0);
    (0, _defineProperty2["default"])(this, "_textField", void 0);
    (0, _defineProperty2["default"])(this, "_valueField", void 0);
    (0, _defineProperty2["default"])(this, "_cross", "\n    <svg\n      width=\"24\"\n      height=\"24\"\n      viewBox=\"0 0 24 24\"\n      fill=\"none\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n    >\n      <path\n        d=\"M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z\"\n        fill=\"currentColor\"\n      />\n    </svg>\n    ");
    this._data = data !== null && data !== void 0 ? data : [];
    this._itemTemplate = itemTemplate !== null && itemTemplate !== void 0 ? itemTemplate : null;
    this._noData = noData !== null && noData !== void 0 ? noData : 'No data found.';
    this._noResults = noResults !== null && noResults !== void 0 ? noResults : 'No results found.';
    this._placeholder = placeholder !== null && placeholder !== void 0 ? placeholder : 'Select...';
    this._select = select;
    // Timea added a container here
    this._selectContainer = container;
    this._tagTemplate = tagTemplate !== null && tagTemplate !== void 0 ? tagTemplate : null;
    this._textField = textField !== null && textField !== void 0 ? textField : null;
    this._valueField = valueField !== null && valueField !== void 0 ? valueField : null;
  }

  /**
   * Initialize the Iconic Multiselect component.
   * @public
   */
  (0, _createClass2["default"])(IconicMultiSelect, [{
    key: "init",
    value: function init() {
      // Timea change to use this._select instead of this._selectContainer
      if (this._select && this._select.nodeName === 'SELECT') {
        if (this._itemTemplate && this._data.length === 0) {
          throw new Error('itemTemplate must be initialized with data from the component settings');
        }
        if (this._tagTemplate && this._data.length === 0) {
          throw new Error('tagTemplate must be initialized with data from the component settings');
        }
        this._options = this._data.length > 0 ? this._getDataFromSettings() : this._getDataFromSelectTag();
        this._renderMultiselect();
        this._renderOptionsList();
        this._domElements = {
          clear: this._multiselect.querySelector('.multiselect__clear-btn'),
          input: this._multiselect.querySelector('.multiselect__input'),
          optionsContainer: this._multiselect.querySelector('.multiselect__options'),
          optionsContainerList: this._multiselect.querySelector('.multiselect__options > ul'),
          options: {
            list: this._multiselect.querySelectorAll('.multiselect__options > ul > li'),
            find: function find(callbackFn) {
              for (var i = 0; i < this.list.length; i++) {
                var node = this.list[i];
                if (callbackFn(node)) return node;
              }
              return undefined;
            },
            some: function some(callbackFn) {
              for (var i = 0; i < this.list.length; i++) {
                var node = this.list[i];
                if (callbackFn(node, i)) return true;
              }
              return false;
            }
          }
        };
        this._enableEventListenners();
        this._initSelectedList();
      } else {
        throw new Error("The selector '".concat(this._select, "' did not select any valid select tag."));
      }
    }

    /**
     * Subscribes to the emitted events.
     * @param { Function } callback - Callback function which emits a custom event object.
     * @public
     */
  }, {
    key: "subscribe",
    value: function subscribe(callback) {
      if (typeof callback === 'function') {
        this._event = callback;
      } else {
        throw new Error('parameter in the subscribe method is not a function');
      }
    }

    /**
     * Add an option to the selection list.
     * @param { Object: { text: string; value: string; }} option
     * @private
     */
  }, {
    key: "_addOptionToList",
    value: function _addOptionToList(option, index) {
      var _this = this;
      var html = "<span class=\"multiselect__selected\" style=\"".concat(style.multiselect__selected, "\" data-value=\"").concat(option.value, "\">").concat(this._tagTemplate ? this._processTemplate(this._tagTemplate, index) : option.text, "<span class=\"multiselect__remove-btn\" style=\"").concat(style.multiselect__remove_btn, "\">").concat(this._cross, "</span></span>");
      this._domElements.input.insertAdjacentHTML('beforebegin', html);
      var _this$_multiselect$qu = this._multiselect.querySelector("span[data-value=\"".concat(option.value, "\"]")),
        removeBtn = _this$_multiselect$qu.lastElementChild;
      removeBtn.addEventListener('click', function () {
        var target = _this._domElements.options.find(function (el) {
          return el.dataset.value === option.value;
        });
        _this._handleOption(target);
      });
    }

    /**
     * Clears all selected options.
     * @private
     */
  }, {
    key: "_clearSelection",
    value: function _clearSelection() {
      var _this2 = this;
      var _loop = function _loop(i) {
        var option = _this2._selectedOptions[i];
        var target = _this2._domElements.options.find(function (el) {
          return el.dataset.value === option.value;
        });
        target.classList.remove('multiselect__options--selected');
        target.setAttribute('style', style.multiselect__options);
        _this2._removeOptionFromList(target.dataset.value);
      };
      for (var i = 0; i < this._selectedOptions.length; i++) {
        _loop(i);
      }
      this._selectedOptions = [];
      this._handleClearSelectionBtn();
      this._handlePlaceholder();
      this._dispatchEvent({
        action: 'CLEAR_ALL_OPTIONS',
        selection: this._selectedOptions
      });
    }

    /**
     * Close the options container.
     * @private
     */
  }, {
    key: "_closeList",
    value: function _closeList() {
      this._domElements.input.value = '';
      this._domElements.optionsContainer.classList.remove('visible');
      this._domElements.optionsContainer.setAttribute('style', style.multiselect__options);
      this._filterOptions('');
      this._removeAllArrowSelected();
    }

    /**
     * Dispatches new events.
     * @param { object : { action: string; selection: { option: string; text: string; }[]; value?: string; } } event
     * @private
     */
  }, {
    key: "_dispatchEvent",
    value: function _dispatchEvent(event) {
      this._event(event);
    }

    /**
     * Enables all main event listenners.
     * @private
     */
  }, {
    key: "_enableEventListenners",
    value: function _enableEventListenners() {
      var _this3 = this;
      document.addEventListener('mouseup', function (_ref2) {
        var target = _ref2.target;
        if (!_this3._multiselect.contains(target)) {
          _this3._filterOptions('');
          _this3._closeList();
          _this3._handlePlaceholder();
        }
      });
      this._domElements.clear.addEventListener('click', function () {
        _this3._clearSelection();
      });
      for (var i = 0; i < this._domElements.options.list.length; i++) {
        var option = this._domElements.options.list[i];
        option.addEventListener('click', function (_ref3) {
          var target = _ref3.target;
          _this3._handleOption(target);
          _this3._closeList();
        });
      }
      this._domElements.input.addEventListener('focus', function () {
        _this3._domElements.optionsContainer.classList.add('visible');
        _this3._domElements.optionsContainer.setAttribute('style', style.multiselect__options_visible);
      });
      this._domElements.input.addEventListener('input', function (_ref4) {
        var value = _ref4.target.value;
        if (_this3._domElements.options.list.length > 0) {
          _this3._filterOptions(value);
        }
      });
      this._domElements.input.addEventListener('keydown', function (e) {
        _this3._handleArrows(e);
        _this3._handleBackspace(e);
        _this3._handleEnter(e);
      });
    }

    /**
     * Filters user input.
     * @param { string } value
     * @private
     */
  }, {
    key: "_filterOptions",
    value: function _filterOptions(value) {
      var _this4 = this;
      var isOpen = this._domElements.optionsContainer.classList.contains('visible');
      var valueLowerCase = value.toLowerCase();
      if (!isOpen && value.length > 0) {
        this._domElements.optionsContainer.classList.add('visible');
        this._domElements.optionsContainer.setAttribute('style', style.multiselect__options_visible);
      }
      if (this._domElements.options.list.length > 0) {
        for (var i = 0; i < this._domElements.options.list.length; i++) {
          var el = this._domElements.options.list[i];
          var text = this._itemTemplate ? this._data[i][this._textField] : el.textContent;
          if (text.toLowerCase().substring(0, valueLowerCase.length) === valueLowerCase) {
            this._domElements.optionsContainerList.appendChild(el);
          } else {
            el.parentNode && el.parentNode.removeChild(el);
          }
        }
        var hasResults = this._domElements.options.some(function (el, index) {
          return (_this4._itemTemplate ? _this4._data[index][_this4._textField] : el.textContent).toLowerCase().substring(0, valueLowerCase.length) === valueLowerCase;
        });
        this._showNoResults(!hasResults);
      }
    }
  }, {
    key: "_generateId",
    value: function _generateId(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }

    /**
     * Gets data from select tag.
     * @private
     */
  }, {
    key: "_getDataFromSelectTag",
    value: function _getDataFromSelectTag() {
      var arr = [];
      var options = this._select.options;
      for (var i = 0; i < options.length; i++) {
        var item = options[i];
        arr.push({
          text: item.text,
          value: item.value,
          selected: item.hasAttribute('selected')
        });
      }
      return arr;
    }

    /**
     * Gets data from settings.
     * @private
     */
  }, {
    key: "_getDataFromSettings",
    value: function _getDataFromSettings() {
      if (this._data.length > 0 && this._valueField && this._textField) {
        var isValueFieldValid = typeof this._valueField === 'string';
        var isTextFieldValid = typeof this._textField === 'string';
        var arr = [];
        if (!isValueFieldValid || !isTextFieldValid) {
          throw new Error('textField and valueField must be of type string');
        }
        for (var i = 0; i < this._data.length; i++) {
          var item = this._data[i];
          arr.push({
            value: item[this._valueField],
            text: item[this._textField],
            selected: typeof item.selected === 'boolean' ? item.selected : false
          });
        }
        return arr;
      } else {
        return null;
      }
    }

    /**
     * Handles Arrow up & Down. Selection of an option is also possible with these keys.
     * @param { Event } event
     * @private
     */
  }, {
    key: "_handleArrows",
    value: function _handleArrows(event) {
      if (event.keyCode === 40 || event.keyCode === 38) {
        event.preventDefault();
        var isOpen = this._domElements.optionsContainer.classList.contains('visible');
        // An updated view of the container is needed because of the filtering option
        var optionsContainerList = this._multiselect.querySelector('.multiselect__options > ul');
        if (!isOpen) {
          this._domElements.optionsContainer.classList.add('visible');
          this._domElements.optionsContainer.setAttribute('style', style.multiselect__options_visible);
          optionsContainerList.firstElementChild.classList.add('arrow-selected');
          optionsContainerList.firstElementChild.setAttribute('style', style.multiselect__options_ul_li_arrow_selected);
          optionsContainerList.firstElementChild.scrollIntoView(false);
        } else {
          var selected = this._multiselect.querySelector('.multiselect__options ul li.arrow-selected');
          var action = {
            ArrowUp: 'previous',
            Up: 'previous',
            ArrowDown: 'next',
            Down: 'next'
          };
          if (!selected) {
            optionsContainerList.firstElementChild.classList.add('arrow-selected');
            optionsContainerList.firstElementChild.setAttribute('style', style.multiselect__options_ul_li_arrow_selected);
            optionsContainerList.firstElementChild.scrollIntoView(false);
            return;
          }
          selected.classList.remove('arrow-selected');
          selected.setAttribute('style', style.multiselect__options_ul_li);
          selected = selected[action[event.key] + 'ElementSibling'];

          // Go to start or end of the popup list
          if (!selected) {
            selected = optionsContainerList.children[action[event.key] === 'next' ? 0 : optionsContainerList.children.length - 1];
            selected.classList.add('arrow-selected');
            selected.setAttribute('style', style.multiselect__options_ul_li_arrow_selected);
            this._scrollIntoView(optionsContainerList, selected);
            return;
          }
          selected.classList.add('arrow-selected');
          selected.setAttribute('style', style.multiselect__options_ul_li_arrow_selected);
          this._scrollIntoView(optionsContainerList, selected);
        }
      }
    }

    /**
     * Handles the backspace key event - Deletes the preceding option in the selection list.
     * @param { Event } e
     * @private
     */
  }, {
    key: "_handleBackspace",
    value: function _handleBackspace(e) {
      if (e.keyCode === 8 && e.target.value === '') {
        var lastSelectedOption = this._selectedOptions.length > 0 ? this._selectedOptions[this._selectedOptions.length - 1] : null;
        if (lastSelectedOption) {
          var targetLastSelectedOption = this._multiselect.querySelector("li[data-value=\"".concat(lastSelectedOption.value, "\"]"));
          this._handleOption(targetLastSelectedOption);
          if (this._selectedOptions.length === 0) {
            this._domElements.optionsContainer.classList.remove('visible');
            this._domElements.optionsContainer.setAttribute('style', style.multiselect__options);
          }
        }
      }
    }

    /**
     * Shows clear selection button if some options are selected.
     * @private
     */
  }, {
    key: "_handleClearSelectionBtn",
    value: function _handleClearSelectionBtn() {
      if (this._selectedOptions.length > 0) {
        this._domElements.clear.style.display = 'flex';
      } else {
        this._domElements.clear.style.display = 'none';
      }
    }

    /**
     * Handles the enter key event.
     * @param { Event } event
     * @private
     */
  }, {
    key: "_handleEnter",
    value: function _handleEnter(event) {
      if (event.keyCode === 13) {
        var selected = this._multiselect.querySelector('.multiselect__options ul li.arrow-selected');
        if (selected) {
          this._handleOption(selected);
          this._closeList();
        }
      }
    }
  }, {
    key: "_handleOption",
    value: function _handleOption(target) {
      var dispatchEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      // Remove
      for (var i = 0; i < this._selectedOptions.length; i++) {
        var el = this._selectedOptions[i];
        if (el.value === target.dataset.value) {
          target.classList.remove('multiselect__options--selected');
          target.setAttribute('style', style.multiselect__options);
          this._selectedOptions.splice(i, 1);
          this._removeOptionFromList(target.dataset.value);
          this._handleClearSelectionBtn();
          this._handlePlaceholder();
          return dispatchEvent && this._dispatchEvent({
            action: 'REMOVE_OPTION',
            value: target.dataset.value,
            selection: this._selectedOptions
          });
        }
      }

      // Add
      for (var _i = 0; _i < this._options.length; _i++) {
        var option = this._options[_i];
        if (option.value === target.dataset.value) {
          target.classList.add('multiselect__options--selected');
          target.setAttribute('style', style.multiselect__options_selected);
          this._selectedOptions = [].concat((0, _toConsumableArray2["default"])(this._selectedOptions), [option]);
          this._addOptionToList(option, _i);
          this._handleClearSelectionBtn();
          this._handlePlaceholder();
          return dispatchEvent && this._dispatchEvent({
            action: 'ADD_OPTION',
            value: target.dataset.value,
            selection: this._selectedOptions
          });
        }
      }
    }

    /**
     * Shows the placeholder if no options are selected.
     * @private
     */
  }, {
    key: "_handlePlaceholder",
    value: function _handlePlaceholder() {
      this._domElements.input.placeholder = this._placeholder;
    }
  }, {
    key: "_initSelectedList",
    value: function _initSelectedList() {
      var _this5 = this;
      var hasItemsSelected = false;
      var _loop2 = function _loop2(i) {
        var option = _this5._options[i];
        if (option.selected) {
          hasItemsSelected = true;
          var target = _this5._domElements.options.find(function (el) {
            return el.dataset.value === option.value;
          });
          target.classList.add('multiselect__options--selected');
          target.setAttribute('style', style.multiselect__options_selected);
          _this5._selectedOptions = [].concat((0, _toConsumableArray2["default"])(_this5._selectedOptions), [option]);
          _this5._addOptionToList(option, i);
        }
      };
      for (var i = 0; i < this._options.length; i++) {
        _loop2(i);
      }
      if (hasItemsSelected) {
        this._handleClearSelectionBtn();
      }
      this._handlePlaceholder();
    }

    /**
     * Process the custom template.
     * @param { string } template
     * @private
     */
  }, {
    key: "_processTemplate",
    value: function _processTemplate(template, index) {
      var processedTemplate = template;
      var objAttr = template.match(/\$\{(\w+)\}/g).map(function (e) {
        return e.replace(/\$\{|\}/g, '');
      });
      for (var i = 0; i < objAttr.length; i++) {
        var _this$_data$index$att;
        var attr = objAttr[i];
        // eslint-disable-next-line no-useless-escape
        processedTemplate = processedTemplate.replace("${".concat(attr, "}"), (_this$_data$index$att = this._data[index][attr]) !== null && _this$_data$index$att !== void 0 ? _this$_data$index$att : '');
      }
      return processedTemplate;
    }
  }, {
    key: "_removeAllArrowSelected",
    value: function _removeAllArrowSelected() {
      var className = 'arrow-selected';
      var target = this._domElements.options.find(function (el) {
        return el.classList.contains(className);
      });
      target && target.classList.remove(className) && target.setAttribute('style', style.multiselect__options_ul_li);
    }

    /**
     * Removes an option from the list.
     * @param { string } value
     * @private
     */
  }, {
    key: "_removeOptionFromList",
    value: function _removeOptionFromList(value) {
      var optionDom = this._multiselect.querySelector("span[data-value=\"".concat(value, "\"]"));
      optionDom && optionDom.parentNode && optionDom.parentNode.removeChild(optionDom);
    }

    /**
     * Renders the multiselect options list view.
     * @private
     */
  }, {
    key: "_renderOptionsList",
    value: function _renderOptionsList() {
      var _this6 = this;
      var html = "\n        <div class=\"multiselect__options\" style=\"".concat(style.multiselect__options, "\">\n          <ul style=\"").concat(style.multiselect__options_ul, "\">\n          ").concat(this._options.length > 0 && !this._itemTemplate ? this._options.map(function (option) {
        return "\n              <li data-value=\"".concat(option.value, "\" style=\"").concat(style.multiselect__options_ul_li, "\">").concat(option.text, "</li>\n            ");
      }).join('') : '', "\n\n          ").concat(this._options.length > 0 && this._itemTemplate ? this._options.map(function (option, index) {
        return "\n              <li data-value=\"".concat(option.value, "\" style=\"").concat(style.multiselect__options_ul_li, "\">").concat(_this6._processTemplate(_this6._itemTemplate, index), "</li>\n            ");
      }).join('') : '', "\n          ").concat(this._showNoData(this._options.length === 0), "\n          </ul>\n        </div>\n      ");
      this._multiselect.insertAdjacentHTML('beforeend', html);
    }

    /**
     * Renders the multiselect view.
     * @private
     */
  }, {
    key: "_renderMultiselect",
    value: function _renderMultiselect() {
      this._select.style.display = 'none';
      var id = 'iconic-' + this._generateId(20);
      // Timea created dedicated div element because previous code was not rendering
      this._multiselect = document.createElement('div');
      this._multiselect.setAttribute('id', id);
      this._multiselect.setAttribute('class', 'multiselect__container');
      this._multiselect.setAttribute('style', style.multiselect__container);
      var html = "\n        <div class=\"multiselect__wrapper\" style=\"".concat(style.multiselect__wrapper, "\">\n          <input class=\"multiselect__input\" style=\"").concat(style.multiselect__input, "\" placeholder=\"").concat(this._placeholder, "\" />\n        </div>\n        <span style=\"display: none;\" class=\"multiselect__clear-btn\" style=\"").concat(style.multiselect__clear_btn, "\">").concat(this._cross, "</span>\n    ");
      this._multiselect.innerHTML = html;
      this._selectContainer.appendChild(this._multiselect);
    }

    /**
     * ScrollIntoView - This small utility reproduces the behavior of .scrollIntoView({ block: "nearest", inline: "nearest" })
     * This is for IE compatibility without a need of a polyfill
     * @private
     */
  }, {
    key: "_scrollIntoView",
    value: function _scrollIntoView(parent, child) {
      var rectParent = parent.getBoundingClientRect();
      var rectChild = child.getBoundingClientRect();

      // Detect if not visible at top and then scroll to the top
      if (!(rectParent.top < rectChild.bottom - child.offsetHeight)) {
        parent.scrollTop = child.clientHeight + (child.offsetTop - child.offsetHeight);
      }

      // Detect if not visible at bottom and then scroll to the bottom
      if (!(rectParent.bottom > rectChild.top + child.offsetHeight)) {
        parent.scrollTop = child.clientHeight + (child.offsetTop - child.offsetHeight) - (parent.offsetHeight - (child.offsetHeight + (child.offsetHeight - child.clientHeight)));
      }
    }

    /**
     * Shows a no data message.
     * @param { boolean } condition
     * @private
     */
  }, {
    key: "_showNoData",
    value: function _showNoData(condition) {
      return condition ? "<p class=\"multiselect__options--no-data\" style=\"".concat(style.multiselect__options_ul_p_multiselect__options_no_data, "\">").concat(this._noData, "</p>") : '';
    }

    /**
     * Shows a no results message.
     * @param { boolean } condition
     * @private
     */
  }, {
    key: "_showNoResults",
    value: function _showNoResults(condition) {
      var dom = this._multiselect.querySelector('.multiselect__options--no-results');
      if (condition) {
        var html = "<p class=\"multiselect__options--no-results\" style=\"".concat(style.multiselect__options_ul_p_multiselect__options_no_results, "\">").concat(this._noResults, "</p>");
        !dom && this._domElements.optionsContainerList.insertAdjacentHTML('beforeend', html);
      } else {
        dom && dom.parentNode && dom.parentNode.removeChild(dom);
      }
    }
  }]);
  return IconicMultiSelect;
}();
exports.IconicMultiSelect = IconicMultiSelect;
//# sourceMappingURL=multiSelect.js.map