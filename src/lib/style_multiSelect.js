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
export const style = {

  multiselect__container: `
        -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
        background-color: #fff;
        border-radius: 2px;
        -webkit-box-shadow: 0 1px 3px 0 #d1d1d2, 0 0 0 1px #d1d1d2;
                box-shadow: 0 1px 3px 0 #d1d1d2, 0 0 0 1px #d1d1d2;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        min-height: 36px;
        padding: 4px 8px 0 8px;
        position: relative;
        width: 354px;
        margin-bottom: 5px;
        font-size: 100%
    `,

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
  multiselect__wrapper: `
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
            flex-wrap: wrap;
        height: 100%;
        width: 100%;
    `,

  multiselect__clear_btn: `
        cursor: pointer;
        align-items: center;
        margin-bottom: 4px;
        margin-left: 4px;
    `,

  multiselect__options: `
        background-color: #f6f6f6;
        border-radius: 2px;
        left: 0;
        max-height: 0;
        overflow: hidden;
        position: absolute;
        top: calc(100% + 3px);
        z-index: 9999;
        width: 100%;
        opacity: 0;
        transition: max-height 0.1s ease;
    `,

  multiselect__options_visible: `
        background-color: #f6f6f6;
        border-radius: 2px;
        left: 0;
        max-height: 0;
        overflow: hidden;
        position: absolute;
        top: calc(100% + 3px);
        z-index: 9999;
        width: 100%;
        opacity: 0;
        transition: max-height 0.1s ease;
        max-height: 200px;
        -webkit-box-shadow: 0 1px 3px 0 #d1d1d2, 0 0 0 1px #d1d1d2;
        box-shadow: 0 1px 3px 0 #d1d1d2, 0 0 0 1px #d1d1d2;
        opacity: 1;
        transition: max-height 0.2s ease;
    `,

  multiselect__options_ul: `
        list-style: none;
        margin: 0;
        padding: 2px 0;
        max-height: 200px;
        overflow: auto;
    `,

  multiselect__options_ul_li: `
        cursor: pointer;
        padding: 4px 8px;
    `,

  // multiselect__options ul li:hover: `
  multiselect__options_ul_li_hover: `
        background-color: #dedede;
    `,

  /*
    multiselect__options ul li *: `
    pointer-events: none;
    `,
*/

  multiselect__options_ul_p_multiselect__options_no_results: `
        margin: 0;
        padding: 8px;
        text-align: center;
    `,

  multiselect__options_ul_p_multiselect__options_no_data: `
        margin: 0;
        padding: 8px;
        text-align: center;
    `,

  // multiselect__options ul li.multiselect__options--selected: `
  multiselect__options_ul_li_multiselect__options_selected: `
        background-color: #656565;
        color: #fff;
    `,

  // multiselect__options ul li.multiselect__options--selected:hover: `
  multiselect__options_ul_li_multiselect__options_selected_hover: `
    background-color: #656565;
    `,

  // multiselect__options ul li.arrow-selected: `
  multiselect__options_ul_li_arrow_selected: `
        border: 2px solid rgba(101, 101, 101, 0.5);
    `,

  multiselect__selected: `
        background-color: #656565;
        border-radius: 2px;
        color: #fff;
        margin-bottom: 4px;
        margin-right: 4px;
        padding: 4px 8px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    `,

  multiselect__selected_multiselect__remove_btn: `
        cursor: pointer;
        display: flex;
        margin-left: 6px;
    `,

  multiselect__input: `
        border: none;
        -ms-flex-preferred-size: 40%;
            flex-basis: 40%;
        -webkit-box-flex: 1;
            -ms-flex-positive: 1;
                flex-grow: 1;
        height: 5px;        
        margin-bottom: 4px;
        min-width: 40%;
        outline: none;      
    `
}

style.setStyle = function setStyle (ele, styleName) {
  ele.style = style[styleName]
}
