/**
 * We need to use a custom element decorator because Lit's built-in doesn't safely skip duplicate registrations.
 * This shouldn't be necessary, but our current build process and usage in other libraries is not optimal
 * and some components get bundled twice.
 *
 * This should be removed once that problem is fixed.
 *
 * See https://github.com/SolidOS/solidos/issues/300
 */

const customElementTagNames = new WeakMap<CustomElementConstructor, string>()

function defineCustomElement (tagName: string, elementClass: CustomElementConstructor): void {
  if (customElements.get(tagName)) {
    return
  }

  customElements.define(tagName, elementClass)
}

export function getCustomElementTagName (elementClass: CustomElementConstructor): string {
  const tagName = customElementTagNames.get(elementClass)
  if (!tagName) {
    throw new Error('Cannot create dialog: the component is not registered with customElement().')
  }

  return tagName
}

export function customElement (tagName: string) {
  return (elementClass: CustomElementConstructor, context?: ClassDecoratorContext) => {
    customElementTagNames.set(elementClass, tagName)

    if (context) {
      context.addInitializer(() => defineCustomElement(tagName, elementClass))

      return
    }

    defineCustomElement(tagName, elementClass)
  }
}
