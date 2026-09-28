/**
 * We need to use a custom element decorator because Lit's built-in doesn't safely skip duplicate registrations.
 * This shouldn't be necessary, but our current build process and usage in other libraries is not optimal
 * and some components get bundled twice.
 *
 * This should be removed once that problem is fixed.
 *
 * See https://github.com/SolidOS/solidos/issues/300
 */

function defineCustomElement (tagName: string, elementClass: CustomElementConstructor): void {
  if (customElements.get(tagName)) {
    return
  }

  customElements.define(tagName, elementClass)
}

export function customElement (tagName: string) {
  return (elementClass: CustomElementConstructor, context?: ClassDecoratorContext) => {
    if (context) {
      context.addInitializer(() => defineCustomElement(tagName, elementClass))

      return
    }

    defineCustomElement(tagName, elementClass)
  }
}
