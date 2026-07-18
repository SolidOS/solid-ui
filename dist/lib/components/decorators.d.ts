/**
 * We need to use a custom element decorator because Lit's built-in doesn't safely skip duplicate registrations.
 * This shouldn't be necessary, but our current build process and usage in other libraries is not optimal
 * and some components get bundled twice.
 *
 * This should be removed once that problem is fixed.
 *
 * See https://github.com/SolidOS/solidos/issues/300
 */
export declare function customElement(tagName: string): (elementClass: CustomElementConstructor, context?: ClassDecoratorContext) => void;
//# sourceMappingURL=decorators.d.ts.map