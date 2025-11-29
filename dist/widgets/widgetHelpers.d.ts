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
export declare const wrapDivInATR: (dom: HTMLDocument, div: HTMLDivElement, obj: any) => HTMLTableRowElement;
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
export declare const addClickListenerToElement: (div: HTMLDivElement, onClickFunction: () => void) => void;
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
export declare const createImageDiv: (dom: HTMLDocument, div: HTMLDivElement, image: HTMLImageElement | HTMLObjectElement) => void;
//# sourceMappingURL=widgetHelpers.d.ts.map