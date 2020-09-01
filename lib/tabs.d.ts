import { NamedNode } from 'rdflib';
declare type TabWidgetOptions = {
    backgroundColor?: string;
    dom?: HTMLDocument;
    items?: Array<NamedNode>;
    onClose?: (event: Event) => void;
    ordered?: boolean;
    orientation?: '0' | '1' | '2' | '3';
    predicate?: NamedNode;
    renderMain?: (bodyMain: HTMLElement, subject: NamedNode) => void;
    renderTab?: (tabDiv: HTMLDivElement, subject: NamedNode) => void;
    renderTabSettings?: (bodyMain: ContainerElement, subject: NamedNode) => void;
    selectedTab?: string;
    startEmpty?: boolean;
    subject?: NamedNode;
};
export declare class TabWidgetElement extends HTMLElement {
    bodyContainer?: HTMLElement;
    refresh?: () => void;
    tabContainer?: HTMLElement;
}
/**
 * @ignore
 */
declare class ContainerElement extends HTMLElement {
    asSettings?: boolean;
}
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
export declare function tabWidget(options: TabWidgetOptions): TabWidgetElement;
export {};
//# sourceMappingURL=tabs.d.ts.map