import * as RdfLib from 'rdflib'
import * as ns from '../../../src/ns'
import {
  appendForm,
  buildCheckboxForm,
  editFormButton,
  field,
  fieldFunction,
  fieldLabel,
  fieldParams,
  fieldStore,
  findClosest,
  formsFor,
  makeDescription,
  makeSelectForCategory,
  makeSelectForNestedCategory,
  makeSelectForOptions,
  mostSpecificClassURI,
  newButton,
  newThing,
  promptForNew,
  propertiesForClass,
  sortByLabel,
  sortBySequence
} from '../../../src/widgets/forms'

// jest.mock('rdflib')
// jest.mock('solid-auth-client')

describe('field', () => {
  it('exists', () => {
    expect(field).toBeInstanceOf(Object)
  })
})

describe('Form field', () => {
  it('exists', () => {
    expect(field[ns.ui('Form').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('form')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    console.log(ns.ui('Form').uri, field[ns.ui('Form').uri])
    console.log(ns.ui('Comment').uri, field[ns.ui('Comment').uri])
    field[ns.ui('Form').uri](
      document,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )
    // @@ TODO goes to comment instead of Form...
    expect(
      field[ns.ui('Form').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
      <div>
        <h3
          style="[object Object]"
        >
          [object Object]
        </h3>
      </div>
    `)
  })
  // @@ TODO check this further what test could I use to make sure
  // to test that the form gets added but obviously not in the container passed in
  it('still returns an element if the container is null', () => {
    // debugger
    const container = null
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('div')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('Form').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
<div>
  <h3
    style="[object Object]"
  >
    [object Object]
  </h3>
</div>
`)
  })
  // @@ TODO need to double check proper subjects and what gets returned
  it('returns.. if the subject has already been processed...', () => {
    const dubSubject = RdfLib.sym('subject')
    const container = document.createElement('container')
    const already = { dubSubject }
    const subject = dubSubject
    const form = document.createElement('div')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('Form').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
      <div>
        <h3
          style="[object Object]"
        >
          [object Object]
        </h3>
      </div>
    `)
  })
})

describe('Options field', () => {
  it('exists', () => {
    expect(field[ns.ui('Options').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('form')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('Options').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
      <div>
        <h3
          style="[object Object]"
        >
          [object Object]
        </h3>
      </div>
    `)
  })
})

describe('Multiple field', () => {
  it('exists', () => {
    expect(field[ns.ui('Multiple').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('form')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('Multiple').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
      <div>
        <h3
          style="[object Object]"
        >
          [object Object]
        </h3>
      </div>
    `)
  })
})

describe('fieldParams', () => {
  it('exists', () => {
    expect(fieldParams).toBeInstanceOf(Object)
  })
})

describe('ColorField params', () => {
  it('exists', () => {
    expect(fieldParams[ns.ui('ColorField').uri]).toBeInstanceOf(Object)
  })
})

describe('DateField params', () => {
  it('exists', () => {
    expect(fieldParams[ns.ui('DateField').uri]).toBeInstanceOf(Object)
  })
})

describe('DateTimeField params', () => {
  it('exists', () => {
    expect(fieldParams[ns.ui('DateTimeField').uri]).toBeInstanceOf(Object)
  })
})

describe('TimeField params', () => {
  it('exists', () => {
    expect(fieldParams[ns.ui('TimeField').uri]).toBeInstanceOf(Object)
  })
})

describe('IntegerField params', () => {
  it('exists', () => {
    expect(fieldParams[ns.ui('IntegerField').uri]).toBeInstanceOf(Object)
  })
})

describe('DecimalField params', () => {
  it('exists', () => {
    expect(fieldParams[ns.ui('DecimalField').uri]).toBeInstanceOf(Object)
  })
})

describe('FloatField params', () => {
  it('exists', () => {
    expect(fieldParams[ns.ui('FloatField').uri]).toBeInstanceOf(Object)
  })
})

describe('SingleLineTextField params', () => {
  it('exists', () => {
    expect(fieldParams[ns.ui('SingleLineTextField').uri]).toBeInstanceOf(Object)
  })
})

describe('NamedNodeURIField params', () => {
  it('exists', () => {
    expect(fieldParams[ns.ui('NamedNodeURIField').uri]).toBeInstanceOf(Object)
  })
})

describe('TextField params', () => {
  it('exists', () => {
    expect(fieldParams[ns.ui('TextField').uri]).toBeInstanceOf(Object)
  })
})

describe('PhoneField params', () => {
  it('exists', () => {
    expect(fieldParams[ns.ui('PhoneField').uri]).toBeInstanceOf(Object)
  })
})

describe('EmailField params', () => {
  it('exists', () => {
    expect(fieldParams[ns.ui('EmailField').uri]).toBeInstanceOf(Object)
  })
})

describe('PhoneField', () => {
  it('exists', () => {
    expect(field[ns.ui('PhoneField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('form')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('PhoneField').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
      <div>
        <h3
          style="[object Object]"
        >
          [object Object]
        </h3>
      </div>
    `)
  })
})

describe('EmailField', () => {
  it('exists', () => {
    expect(field[ns.ui('EmailField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('form')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('EmailField').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
      <div>
        <h3
          style="[object Object]"
        >
          [object Object]
        </h3>
      </div>
    `)
  })
})

describe('ColorField', () => {
  it('exists', () => {
    expect(field[ns.ui('ColorField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('form')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('ColorField').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
<div>
  <h3
    style="[object Object]"
  >
    [object Object]
  </h3>
</div>
`)
  })
})

describe('DateField', () => {
  it('exists', () => {
    expect(field[ns.ui('DateField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('form')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('DateField').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
<div>
  <h3
    style="[object Object]"
  >
    [object Object]
  </h3>
</div>
`)
  })
})

describe('DateTimeField', () => {
  it('exists', () => {
    expect(field[ns.ui('DateTimeField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('form')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('DateTimeField').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
<div>
  <h3
    style="[object Object]"
  >
    [object Object]
  </h3>
</div>
`)
  })
})

describe('TimeField', () => {
  it('exists', () => {
    expect(field[ns.ui('TimeField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('form')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('TimeField').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
      <div>
        <h3
          style="[object Object]"
        >
          [object Object]
        </h3>
      </div>
    `)
  })
})

describe('NumericField', () => {
  it('exists', () => {
    expect(field[ns.ui('NumericField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('form')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('NumericField').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
      <div>
        <h3
          style="[object Object]"
        >
          [object Object]
        </h3>
      </div>
    `)
  })
})

describe('IntegerField', () => {
  it('exists', () => {
    expect(field[ns.ui('IntegerField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('form')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('IntegerField').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
      <div>
        <h3
          style="[object Object]"
        >
          [object Object]
        </h3>
      </div>
    `)
  })
})

describe('DecimalField', () => {
  it('exists', () => {
    expect(field[ns.ui('DecimalField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('form')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('DecimalField').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
      <div>
        <h3
          style="[object Object]"
        >
          [object Object]
        </h3>
      </div>
    `)
  })
})

describe('FloatField]', () => {
  it('exists', () => {
    expect(field[ns.ui('FloatField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('form')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('FloatField').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
      <div>
        <h3
          style="[object Object]"
        >
          [object Object]
        </h3>
      </div>
    `)
  })
})

describe('TextField', () => {
  it('exists', () => {
    expect(field[ns.ui('TextField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('form')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('TextField').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
      <div>
        <h3
          style="[object Object]"
        >
          [object Object]
        </h3>
      </div>
    `)
  })
})

describe('SingleLineTextField', () => {
  it('exists', () => {
    expect(field[ns.ui('SingleLineTextField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('form')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('SingleLineTextField').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
      <div>
        <h3
          style="[object Object]"
        >
          [object Object]
        </h3>
      </div>
    `)
  })
})

describe('NamedNodeURIField', () => {
  it('exists', () => {
    expect(field[ns.ui('NamedNodeURIField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('div')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('NamedNodeURIField').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
      <div>
        <h3
          style="[object Object]"
        >
          [object Object]
        </h3>
      </div>
    `)
  })
})

describe('MultiLineTextField', () => {
  it('exists', () => {
    expect(field[ns.ui('MultiLineTextField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('form')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('MultiLineTextField').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
      <div>
        <h3
          style="[object Object]"
        >
          [object Object]
        </h3>
      </div>
    `)
  })
})

describe('BooleanField', () => {
  it('exists', () => {
    expect(field[ns.ui('BooleanField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('form')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('BooleanField').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
      <div>
        <h3
          style="[object Object]"
        >
          [object Object]
        </h3>
      </div>
    `)
  })
})

describe('TristateField', () => {
  it('exists', () => {
    expect(field[ns.ui('TristateField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('form')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('TristateField').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
      <div>
        <h3
          style="[object Object]"
        >
          [object Object]
        </h3>
      </div>
    `)
  })
})

describe('Classifier', () => {
  it('exists', () => {
    expect(field[ns.ui('Classifier').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('form')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('Classifier').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
      <div>
        <h3
          style="[object Object]"
        >
          [object Object]
        </h3>
      </div>
    `)
  })
})

describe('Choice', () => {
  it('exists', () => {
    expect(field[ns.ui('Choice').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('form')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('Choice').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
      <div>
        <h3
          style="[object Object]"
        >
          [object Object]
        </h3>
      </div>
    `)
  })
})

describe('Comment params', () => {
  it('exists', () => {
    expect(fieldParams[ns.ui('Comment').uri]).toBeInstanceOf(Object)
  })
})

describe('Heading', () => {
  it('exists', () => {
    expect(field[ns.ui('Heading').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('form')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('Heading').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
      <div>
        <h3
          style="[object Object]"
        >
          [object Object]
        </h3>
      </div>
    `)
  })
})

describe('Comment]', () => {
  it('exists', () => {
    expect(field[ns.ui('Comment').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = RdfLib.sym('')
    const form = document.createElement('form')
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      field[ns.ui('Comment').uri](
        document,
        container,
        already,
        subject,
        form,
        store,
        callbackFunction
      )
    ).toMatchInlineSnapshot(`
<div>
  <h3
    style="[object Object]"
  >
    [object Object]
  </h3>
</div>
`)
  })
})

describe('mostSpecificClassURI', () => {
  it('exists', () => {
    expect(mostSpecificClassURI).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(mostSpecificClassURI(null)).toEqual(undefined)
  })
})

describe('fieldFunction', () => {
  it('exists', () => {
    expect(fieldFunction).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(fieldFunction(document, null)).toBeInstanceOf(Function)
  })
})

describe('editFormButton', () => {
  it('exists', () => {
    expect(editFormButton).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = null
    const form = null
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(
      editFormButton(document, container, form, store, callbackFunction)
    ).toBeInstanceOf(HTMLButtonElement)
  })
})

describe('appendForm', () => {
  it('exists', () => {
    expect(appendForm).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = null
    const already = {}
    const subject = null
    const form = null
    const store = RdfLib.graph()
    const itemDone = () => {}
    expect(
      appendForm(document, container, already, subject, form, store, itemDone)
    ).toBeInstanceOf(HTMLDivElement)
  })
})

describe('propertiesForClass', () => {
  it('exists', () => {
    expect(propertiesForClass).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(propertiesForClass(RdfLib.graph(), null)).toBeInstanceOf(Object)
  })
})

describe('findClosest', () => {
  it('exists', () => {
    expect(findClosest).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(findClosest(RdfLib.graph(), null, null)).toBeInstanceOf(Object)
  })
})

describe('formsFor', () => {
  it('exists', () => {
    expect(formsFor).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(formsFor(null)).toBeInstanceOf(Object)
  })
})

describe('sortBySequence', () => {
  it('exists', () => {
    expect(sortBySequence).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(sortBySequence([])).toBeInstanceOf(Object)
  })
})

describe('sortByLabel', () => {
  it('exists', () => {
    expect(sortByLabel).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(sortByLabel([])).toBeInstanceOf(Object)
  })
})

describe('newButton', () => {
  it('exists', () => {
    expect(newButton).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(
      newButton(
        document,
        RdfLib.graph(),
        null,
        null,
        null,
        null,
        RdfLib.graph(),
        () => {}
      )
    ).toBeInstanceOf(HTMLButtonElement)
  })
})

describe('promptForNew', () => {
  it('exists', () => {
    expect(promptForNew).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(
      promptForNew(
        document,
        RdfLib.graph(),
        RdfLib.sym(''),
        RdfLib.sym(''),
        RdfLib.sym(''),
        null,
        RdfLib.graph(),
        () => {}
      )
    ).toBeInstanceOf(HTMLFormElement)
  })
})

describe('makeDescription', () => {
  it('exists', () => {
    expect(makeDescription).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(
      makeDescription(
        document,
        RdfLib.graph(),
        null,
        null,
        RdfLib.graph(),
        () => {}
      )
    ).toBeInstanceOf(HTMLDivElement)
  })
})

describe('makeSelectForOptions', () => {
  it('exists', () => {
    expect(makeSelectForOptions).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(
      makeSelectForOptions(
        document,
        RdfLib.graph(),
        null,
        null,
        {},
        {},
        RdfLib.graph(),
        () => {}
      )
    ).toBeInstanceOf(HTMLDivElement)
  })
})

describe('makeSelectForCategory', () => {
  it('exists', () => {
    expect(makeSelectForCategory).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(
      makeSelectForCategory(
        document,
        RdfLib.graph(),
        null,
        null,
        RdfLib.graph(),
        () => {}
      )
    ).toBeInstanceOf(HTMLDivElement)
  })
})

describe('makeSelectForNestedCategory', () => {
  it('exists', () => {
    expect(makeSelectForNestedCategory).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(
      makeSelectForNestedCategory(
        document,
        RdfLib.graph(),
        RdfLib.sym(''),
        RdfLib.sym(''),
        RdfLib.graph(),
        () => {}
      )
    ).toBeInstanceOf(HTMLSpanElement)
  })
})

describe('buildCheckboxForm', () => {
  it('exists', () => {
    expect(buildCheckboxForm).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(
      buildCheckboxForm(
        document,
        RdfLib.graph(),
        null,
        [],
        [],
        null,
        RdfLib.graph(),
        false
      )
    ).toBeInstanceOf(HTMLDivElement)
  })
})

describe('fieldLabel', () => {
  it('exists', () => {
    expect(fieldLabel).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(fieldLabel(document, RdfLib.sym(''), null)).toBeInstanceOf(
      HTMLAnchorElement
    )
  })
  it.skip(' ...', () => {
    expect(fieldLabel('document', undefined, 'form').toBe())
  })
})

describe('fieldStore', () => {
  it('exists', () => {
    expect(fieldStore).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(fieldStore(null, null, null)).toEqual(null)
  })
  it('returns def when there is no matching statement', () => {
    const statementMatching = jest.fn()
    statementMatching.mockReturnValueOnce(null)
    expect(fieldStore('subject', 'predicate', 'def')).toBe('def')
  })
})

describe('newThing', () => {
  it('exists', () => {
    expect(newThing).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(newThing(RdfLib.sym(''))).toBeInstanceOf(Object)
  })
  /* need to also mock or figure out doc - which is a NamedNode
  it('returns the correct .', () => {
    const Date = jest.fn()
    Date.mockReturnValueOnce('Thu Feb 06 2020 19:42:59 GMT+1100')
    expect(newThing('doc').toBe(''))
  }) */
})
