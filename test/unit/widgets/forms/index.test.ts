import { namedNode, graph } from 'rdflib'
import ns from '../../../../src/ns'
import uiStore from '../../../../src/store'

import {
  appendForm,
  buildCheckboxForm,
  editFormButton,
  field,
  fieldFunction,
  fieldLabel,
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
} from '../../../../src/widgets/forms'

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
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
    const callbackFunction = () => {}

    // FIXME: https://github.com/solid/solid-ui/issues/239
    ;(document as any).outlineManager = {
      appendPropertyTRs: () => {}
    }
    field[ns.ui('Form').uri](
      document,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )

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
     <div
       style="padding-left: 2em; border: 0.05em solid #888888;"
     />
    `)
  })
  // @@ TODO check this further what test could I use to make sure
  // to test that the form gets added but obviously not in the container passed in
  it.skip('still returns an element if the container is null', () => {
    // debugger
    const container = document.createElement('div')
    const already = {}
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
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
  it.skip('returns.. if the subject has already been processed...', () => {
    const dubSubject = namedNode('subject')
    const container = document.createElement('container')
    const already = { dubSubject }
    const subject = dubSubject
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
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
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
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
    ).toMatchInlineSnapshot('<div />')
  })
})

describe('Multiple field', () => {
  it('exists', () => {
    expect(field[ns.ui('Multiple').uri]).toBeInstanceOf(Object)
  })
  it.skip('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
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

describe('PhoneField', () => {
  it('exists', () => {
    expect(field[ns.ui('PhoneField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    uiStore.add(form, ns.ui('property'), namedNode('http://example.com/#bla'), namedNode('http://example.com/'))
    const store = namedNode('http://example.com/#store')
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
      <tr>
        <td
          class="formFieldName"
          style="  vertical-align: middle;"
        >
          <a
            href="http://example.com/#bla"
            style="color: #3B5998; text-decoration: none;"
          >
            Bla
          </a>
        </td>
        <td
          class="formFieldValue"
        >
          <input
            maxlength="4096"
            size="20"
            style="background-color: #eef; padding: 0.5em;  border: .05em solid #88c;  border-radius:0.2em; font-size: 100%; margin:0.2em; "
            type="text"
          />
        </td>
      </tr>
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
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
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
      <tr>
        <td
          class="formFieldName"
          style="  vertical-align: middle;"
        >
          <a
            href="http://example.com/#bla"
            style="color: #3B5998; text-decoration: none;"
          >
            Bla
          </a>
        </td>
        <td
          class="formFieldValue"
        >
          <input
            maxlength="4096"
            size="20"
            style="background-color: #eef; padding: 0.5em;  border: .05em solid #88c;  border-radius:0.2em; font-size: 100%; margin:0.2em; "
            type="text"
          />
        </td>
      </tr>
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
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
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
      <tr>
        <td
          class="formFieldName"
          style="  vertical-align: middle;"
        >
          <a
            href="http://example.com/#bla"
            style="color: #3B5998; text-decoration: none;"
          >
            Bla
          </a>
        </td>
        <td
          class="formFieldValue"
        >
          <input
            maxlength="4096"
            size="20"
            style="background-color: #eef; padding: 0.5em;  border: .05em solid #88c;  border-radius:0.2em; font-size: 100%; margin:0.2em; "
            type="text"
          />
        </td>
      </tr>
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
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
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
      <tr>
        <td
          class="formFieldName"
          style="  vertical-align: middle;"
        >
          <a
            href="http://example.com/#bla"
            style="color: #3B5998; text-decoration: none;"
          >
            Bla
          </a>
        </td>
        <td
          class="formFieldValue"
        >
          <input
            maxlength="4096"
            size="20"
            style="background-color: #eef; padding: 0.5em;  border: .05em solid #88c;  border-radius:0.2em; font-size: 100%; margin:0.2em; "
            type="text"
          />
        </td>
      </tr>
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
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
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
      <tr>
        <td
          class="formFieldName"
          style="  vertical-align: middle;"
        >
          <a
            href="http://example.com/#bla"
            style="color: #3B5998; text-decoration: none;"
          >
            Bla
          </a>
        </td>
        <td
          class="formFieldValue"
        >
          <input
            maxlength="4096"
            size="20"
            style="background-color: #eef; padding: 0.5em;  border: .05em solid #88c;  border-radius:0.2em; font-size: 100%; margin:0.2em; "
            type="text"
          />
        </td>
      </tr>
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
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
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
      <tr>
        <td
          class="formFieldName"
          style="  vertical-align: middle;"
        >
          <a
            href="http://example.com/#bla"
            style="color: #3B5998; text-decoration: none;"
          >
            Bla
          </a>
        </td>
        <td
          class="formFieldValue"
        >
          <input
            maxlength="4096"
            size="20"
            style="background-color: #eef; padding: 0.5em;  border: .05em solid #88c;  border-radius:0.2em; font-size: 100%; margin:0.2em; "
            type="text"
          />
        </td>
      </tr>
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
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
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
      <tr>
        <td
          class="formFieldName"
          style="  vertical-align: middle;"
        >
          <a
            href="http://example.com/#bla"
            style="color: #3B5998; text-decoration: none;"
          >
            Bla
          </a>
        </td>
        <td
          class="formFieldValue"
        >
          <input
            maxlength="4096"
            size="20"
            style="background-color: #eef; padding: 0.5em;  border: .05em solid #88c;  border-radius:0.2em; font-size: 100%; margin:0.2em; "
            type="text"
          />
        </td>
      </tr>
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
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
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
      <tr>
        <td
          class="formFieldName"
          style="  vertical-align: middle;"
        >
          <a
            href="http://example.com/#bla"
            style="color: #3B5998; text-decoration: none;"
          >
            Bla
          </a>
        </td>
        <td
          class="formFieldValue"
        >
          <input
            maxlength="4096"
            size="20"
            style="background-color: #eef; padding: 0.5em;  border: .05em solid #88c;  border-radius:0.2em; font-size: 100%; margin:0.2em; "
            type="text"
          />
        </td>
      </tr>
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
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
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
      <tr>
        <td
          class="formFieldName"
          style="  vertical-align: middle;"
        >
          <a
            href="http://example.com/#bla"
            style="color: #3B5998; text-decoration: none;"
          >
            Bla
          </a>
        </td>
        <td
          class="formFieldValue"
        >
          <input
            maxlength="4096"
            size="20"
            style="background-color: #eef; padding: 0.5em;  border: .05em solid #88c;  border-radius:0.2em; font-size: 100%; margin:0.2em; "
            type="text"
          />
        </td>
      </tr>
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
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
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
      <tr>
        <td
          class="formFieldName"
          style="  vertical-align: middle;"
        >
          <a
            href="http://example.com/#bla"
            style="color: #3B5998; text-decoration: none;"
          >
            Bla
          </a>
        </td>
        <td
          class="formFieldValue"
        >
          <input
            maxlength="4096"
            size="20"
            style="background-color: #eef; padding: 0.5em;  border: .05em solid #88c;  border-radius:0.2em; font-size: 100%; margin:0.2em; "
            type="text"
          />
        </td>
      </tr>
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
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
    const callbackFunction = () => {}
    uiStore.add(form, ns.rdf('type'), namedNode('http://example.com/#type'), namedNode('http://example.com/'))
    uiStore.add(form, ns.ui('property'), namedNode('http://example.com/#bla'), namedNode('http://example.com/'))

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
      <tr>
        <td
          class="formFieldName"
          style="  vertical-align: middle;"
        >
          <a
            href="http://example.com/#bla"
            style="color: #3B5998; text-decoration: none;"
          >
            Bla
          </a>
        </td>
        <td
          class="formFieldValue"
        >
          <input
            maxlength="4096"
            size="20"
            style="background-color: #eef; padding: 0.5em;  border: .05em solid #88c;  border-radius:0.2em; font-size: 100%; margin:0.2em; "
            type="text"
          />
        </td>
      </tr>
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
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
    const callbackFunction = () => {}
    uiStore.add(form, ns.rdf('type'), namedNode('http://example.com/#type'), namedNode('http://example.com/'))
    uiStore.add(form, ns.ui('property'), namedNode('http://example.com/#bla'), namedNode('http://example.com/'))

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
      <tr>
        <td
          class="formFieldName"
          style="  vertical-align: middle;"
        >
          <a
            href="http://example.com/#bla"
            style="color: #3B5998; text-decoration: none;"
          >
            Bla
          </a>
        </td>
        <td
          class="formFieldValue"
        >
          <input
            maxlength="4096"
            size="20"
            style="background-color: #eef; padding: 0.5em;  border: .05em solid #88c;  border-radius:0.2em; font-size: 100%; margin:0.2em; "
            type="text"
          />
        </td>
      </tr>
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
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
    const callbackFunction = () => {}
    uiStore.add(form, ns.rdf('type'), namedNode('http://example.com/#type'), namedNode('http://example.com/'))
    uiStore.add(form, ns.ui('property'), namedNode('http://example.com/#bla'), namedNode('http://example.com/'))

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
      <tr>
        <td
          class="formFieldName"
          style="  vertical-align: middle;"
        >
          <a
            href="http://example.com/#bla"
            style="color: #3B5998; text-decoration: none;"
          >
            Bla
          </a>
        </td>
        <td
          class="formFieldValue"
        >
          <input
            maxlength="4096"
            size="20"
            style="background-color: #eef; padding: 0.5em;  border: .05em solid #88c;  border-radius:0.2em; font-size: 100%; margin:0.2em; "
            type="text"
          />
        </td>
      </tr>
    `)
  })
})

describe('MultiLineTextField', () => {
  it('exists', () => {
    expect(field[ns.ui('MultiLineTextField').uri]).toBeInstanceOf(Object)
  })
  it.skip('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
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
        <a
          href="http://example.com/#bla"
          style="color: #3B5998; text-decoration: none;"
        >
          Bla
        </a>
        <div>
          <textarea
            cols="80"
            rows="2"
            style="font-size:100%; white-space: pre-wrap; background-color: #eef; border: 0.07em solid gray; padding: 1em 0.5em; margin: 1em 1em;"
          />
          <br />
          <input
            disabled=""
            style="visibility: hidden; float: right;"
            type="submit"
            value="Save bla"
          />
        </div>
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
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
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
        Bla
        <button
          style="font-size: 150%; height: 1.2em; width: 1.2em; background-color: #eef; margin: 0.1em"
        >
          ✕
        </button>
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
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
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
  Bla
  <button
    style="font-size: 150%; height: 1.2em; width: 1.2em; background-color: #eef; margin: 0.1em"
  >
    -
  </button>
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
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
    uiStore.add(form, ns.ui('category'), namedNode('http://example.com/#bla'), namedNode('http://example.com/'))

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
<span>
  <div
    style="margin: 0.1em; padding: 0.5em; border: 0.05em solid gray; background-color: #fee; color:black;"
  >
    Can't do multiple selector with no subclasses of category: &lt;http://example.com/#bla&gt;
  </div>
</span>
`)
  })
})

describe('Choice', () => {
  it('exists', () => {
    expect(field[ns.ui('Choice').uri]).toBeInstanceOf(Object)
  })
  it.skip('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
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

describe('Heading', () => {
  it('exists', () => {
    expect(field[ns.ui('Heading').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
    uiStore.add(form, ns.ui('contents'), namedNode('http://example.com/#bla'), namedNode('http://example.com/'))
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
  <undefined>
    &lt;http://example.com/#bla&gt;
  </undefined>
</div>
`)
  })
})

describe('Comment', () => {
  it('exists', () => {
    expect(field[ns.ui('Comment').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = document.createElement('div')
    const already = {}
    const subject = namedNode('http://example.com/#this')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
    const callbackFunction = () => {}
    uiStore.add(form, ns.ui('contents'), namedNode('http://example.com/#bla'), namedNode('http://example.com/'))
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
  <undefined>
    &lt;http://example.com/#bla&gt;
  </undefined>
</div>
`)
  })
})

describe('mostSpecificClassURI', () => {
  it('exists', () => {
    expect(mostSpecificClassURI).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const form = namedNode('http://example.com/#form')
    uiStore.add(form, ns.rdf('type'), namedNode('http://example.com/#type'), namedNode('http://example.com/'))
    expect(mostSpecificClassURI(form)).toEqual('http://example.com/#type')
  })
})

describe('fieldFunction', () => {
  it('exists', () => {
    expect(fieldFunction).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(fieldFunction(document, namedNode('http://example.com/#this'))).toBeInstanceOf(Function)
  })
})

describe('editFormButton', () => {
  it('exists', () => {
    expect(editFormButton).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = null
    const form = null
    const store = namedNode('http://example.com/#store')
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
    const container = document.createElement('div')
    const already = {}
    const subject = namedNode('http://example.com/#subject')
    const form = namedNode('http://example.com/#form')
    const store = namedNode('http://example.com/#store')
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
    expect(propertiesForClass(graph(), namedNode('http://example.com/#class'))).toBeInstanceOf(Object)
  })
})

describe('findClosest', () => {
  it('exists', () => {
    expect(findClosest).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const kb = graph()
    kb.sym = namedNode
    expect(findClosest(kb, 'http://example.com/#cla', namedNode('http://example.com/#prop'))).toBeInstanceOf(Object)
  })
})

describe('formsFor', () => {
  it('exists', () => {
    expect(formsFor).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(formsFor(namedNode('http://example.com/#sub'))).toBeInstanceOf(Object)
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
        graph(),
        namedNode('http://example.com/#subject'),
        namedNode('http://example.com/#predicate'),
        namedNode('http://example.com/#class'),
        namedNode('http://example.com/#form'),
        namedNode('http://example.com/#store'),
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
        graph(),
        namedNode('http://example.com/#this'),
        namedNode('http://example.com/#this'),
        namedNode('http://example.com/#this'),
        null,
        graph(),
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
        graph(),
        namedNode('http://example.com/#subject'),
        namedNode('http://example.com/#predicate'),
        namedNode('http://example.com/#store'),
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
        graph(),
        namedNode('http://example.com/#subject'),
        namedNode('http://example.com/#predicate'),
        [],
        {},
        namedNode('http://example.com/#doc'),
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
        graph(),
        null,
        null,
        graph(),
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
        graph(),
        namedNode('http://example.com/#this'),
        namedNode('http://example.com/#this'),
        graph(),
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
        graph(),
        'label',
        [],
        [],
        namedNode('http://example.com/#form'),
        namedNode('http://example.com/#doc'),
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
    expect(fieldLabel(document, namedNode('http://example.com/#this'), null)).toBeInstanceOf(
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
    expect(fieldStore(null, null, null)).toEqual({
      termType: 'NamedNode',
      value: 'http://example.com/'
    })
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
    expect(newThing(namedNode('http://example.com/#this'))).toBeInstanceOf(Object)
  })
  // need to also mock or figure out doc - which is a NamedNode
  it.skip('returns the correct .', () => {
    const Date = jest.fn()
    Date.mockReturnValueOnce('Thu Feb 06 2020 19:42:59 GMT+1100')
    expect(newThing(namedNode('doc'))).toBe('')
  })
})
