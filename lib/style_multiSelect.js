"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.style = void 0;

/*
 * BASED ON:
 * IconicMultiSelect v0.7.0
 * Licence:  MIT
 * (c) 2021 Sidney Wimart.
 * repo & configuration: https://github.com/sidneywm/iconic-multiselect
 */

/**
 * @version IconicMultiSelect v0.7.0
 * @licence  MIT
 */
var style = {
  multiselect__container: "\n        -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n        background-color: #fff;\n        border-radius: 2px;\n        -webkit-box-shadow: 0 1px 3px 0 #d1d1d2, 0 0 0 1px #d1d1d2;\n                box-shadow: 0 1px 3px 0 #d1d1d2, 0 0 0 1px #d1d1d2;\n        -webkit-box-sizing: border-box;\n                box-sizing: border-box;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        min-height: 36px;\n        padding: 4px 8px 0 8px;\n        position: relative;\n        width: 354px;\n        margin-bottom: 5px;\n        font-size: 100%\n    ",

  /*
    multiselect__container:after: `
        content: '';
        min-height:inherit;
        font-size:0;
    `,
     multiselect__container > *: `
    color: #656565;
    font-size: 14px;
    `,
  */
  multiselect__wrapper: "\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n        height: 100%;\n        width: 100%;\n    ",
  multiselect__clear_btn: "\n        cursor: pointer;\n        align-items: center;\n        margin-bottom: 4px;\n        margin-left: 4px;\n    ",
  multiselect__options: "\n        background-color: #f6f6f6;\n        border-radius: 2px;\n        left: 0;\n        max-height: 0;\n        overflow: hidden;\n        position: absolute;\n        top: calc(100% + 3px);\n        z-index: 9999;\n        width: 100%;\n        opacity: 0;\n        transition: max-height 0.1s ease;\n    ",
  multiselect__options_visible: "\n        background-color: #f6f6f6;\n        border-radius: 2px;\n        left: 0;\n        max-height: 0;\n        overflow: hidden;\n        position: absolute;\n        top: calc(100% + 3px);\n        z-index: 9999;\n        width: 100%;\n        opacity: 0;\n        transition: max-height 0.1s ease;\n        max-height: 200px;\n        -webkit-box-shadow: 0 1px 3px 0 #d1d1d2, 0 0 0 1px #d1d1d2;\n        box-shadow: 0 1px 3px 0 #d1d1d2, 0 0 0 1px #d1d1d2;\n        opacity: 1;\n        transition: max-height 0.2s ease;\n    ",
  multiselect__options_ul: "\n        list-style: none;\n        margin: 0;\n        padding: 2px 0;\n        max-height: 200px;\n        overflow: auto;\n    ",
  multiselect__options_ul_li: "\n        cursor: pointer;\n        padding: 4px 8px;\n    ",
  // multiselect__options ul li:hover: `
  multiselect__options_ul_li_hover: "\n        background-color: #dedede;\n    ",

  /*
    multiselect__options ul li *: `
    pointer-events: none;
    `,
  */
  multiselect__options_ul_p_multiselect__options_no_results: "\n        margin: 0;\n        padding: 8px;\n        text-align: center;\n    ",
  multiselect__options_ul_p_multiselect__options_no_data: "\n        margin: 0;\n        padding: 8px;\n        text-align: center;\n    ",
  // multiselect__options ul li.multiselect__options--selected: `
  multiselect__options_ul_li_multiselect__options_selected: "\n        background-color: #656565;\n        color: #fff;\n    ",
  // multiselect__options ul li.multiselect__options--selected:hover: `
  multiselect__options_ul_li_multiselect__options_selected_hover: "\n    background-color: #656565;\n    ",
  // multiselect__options ul li.arrow-selected: `
  multiselect__options_ul_li_arrow_selected: "\n        border: 2px solid rgba(101, 101, 101, 0.5);\n    ",
  multiselect__selected: "\n        background-color: #656565;\n        border-radius: 2px;\n        color: #fff;\n        margin-bottom: 4px;\n        margin-right: 4px;\n        padding: 4px 8px;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n        -ms-flex-align: center;\n        align-items: center;\n    ",
  multiselect__selected_multiselect__remove_btn: "\n        cursor: pointer;\n        display: flex;\n        margin-left: 6px;\n    ",
  multiselect__input: "\n        border: none;\n        -ms-flex-preferred-size: 40%;\n            flex-basis: 40%;\n        -webkit-box-flex: 1;\n            -ms-flex-positive: 1;\n                flex-grow: 1;\n        height: 5px;        \n        margin-bottom: 4px;\n        min-width: 40%;\n        outline: none;      \n    "
};
exports.style = style;

style.setStyle = function setStyle(ele, styleName) {
  ele.style = style[styleName];
};

module.exports = style;
//# sourceMappingURL=style_multiSelect.js.map