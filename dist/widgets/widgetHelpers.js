import { style } from '../style';
/**
 * Wraps a Div in a TR/RD
 *
 * Takes a div and wraps it in a TR/TD to be backwards compatible to the
 * table structure of mashlib
 *
 * @param dom The HTML Document object aka Document Object Model
 * @param div the created widget will be appended to this
 * @param obj not sure what this is used for exactly
 *
 * @returns The HTML widget created
 *
 * @internal exporting this only for unit tests
 */
export const wrapDivInATR = (dom, div, obj) => {
    const tr = dom.createElement('tr');
    const td = tr.appendChild(dom.createElement('td'));
    td.appendChild(div);
    tr.subject = obj;
    return tr;
};
/**
 * Adds a click listener to a div
 *
 * Adds a given function as a click listener on the given div
 *
 * @param dom The HTML Document object aka Document Object Model
 * @param onClickFunction the click function to add to the click listener
 *
 * @returns The HTML widget created
 *
 * @internal exporting this only for unit tests
 */
export const addClickListenerToElement = (div, onClickFunction) => {
    div.addEventListener('click', onClickFunction);
};
/**
 * Wraps a Div in a TR/RD
 *
 * Takes a div and wraps it in a TR/TD to be backwards compatible to the
 * table structure of mashlib
 *
 * @param dom The HTML Document object aka Document Object Model
 * @param div the created widget will be appended to this
 * @param obj not sure what this is used for exactly
 *
 * @returns The HTML widget created
 *
 * @internal exporting this only for unit tests
 */
export const createImageDiv = (dom, div, image) => {
    const imageDiv = div.appendChild(dom.createElement('div'));
    imageDiv.setAttribute('style', style.imageDivStyle);
    imageDiv.appendChild(image);
    image.setAttribute('draggable', 'false'); // Stop the image being dragged instead - just the TR
};
//# sourceMappingURL=widgetHelpers.js.map