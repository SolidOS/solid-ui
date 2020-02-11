import * as RdfLib from 'rdflib'
import { JSDOM } from 'jsdom'

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
import * as ns from '../../../src/ns'
jest.mock('rdflib')
jest.mock('solid-auth-client')
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document
const element = dom.createElement('div')

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
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('Form').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
  })
})

describe('Options field', () => {
  it('exists', () => {
    expect(field[ns.ui('Options').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('Options').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
  })
})

describe('Multiple field', () => {
  it('exists', () => {
    expect(field[ns.ui('Multiple').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('Multiple').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
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
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('PhoneField').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
  })
})

describe('EmailField', () => {
  it('exists', () => {
    expect(field[ns.ui('EmailField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('EmailField').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
  })
})

describe('ColorField', () => {
  it('exists', () => {
    expect(field[ns.ui('ColorField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('ColorField').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
  })
})

describe('DateField', () => {
  it('exists', () => {
    expect(field[ns.ui('DateField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('DateField').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
  })
})

describe('DateTimeField', () => {
  it('exists', () => {
    expect(field[ns.ui('DateTimeField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('DateTimeField').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
  })
})

describe('TimeField', () => {
  it('exists', () => {
    expect(field[ns.ui('TimeField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('TimeField').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
  })
})

describe('NumericField', () => {
  it('exists', () => {
    expect(field[ns.ui('NumericField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('NumericField').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
  })
})

describe('IntegerField', () => {
  it('exists', () => {
    expect(field[ns.ui('IntegerField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('IntegerField').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
  })
})

describe('DecimalField', () => {
  it('exists', () => {
    expect(field[ns.ui('DecimalField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('DecimalField').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
  })
})

describe('FloatField]', () => {
  it('exists', () => {
    expect(field[ns.ui('FloatField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('FloatField').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
  })
})

describe('TextField', () => {
  it('exists', () => {
    expect(field[ns.ui('TextField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('TextField').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
  })
})

describe('SingleLineTextField', () => {
  it('exists', () => {
    expect(field[ns.ui('SingleLineTextField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('SingleLineTextField').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
  })
})

describe('NamedNodeURIField', () => {
  it('exists', () => {
    expect(field[ns.ui('NamedNodeURIField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('NamedNodeURIField').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
  })
})

describe('MultiLineTextField', () => {
  it('exists', () => {
    expect(field[ns.ui('MultiLineTextField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('MultiLineTextField').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
  })
})

describe('BooleanField', () => {
  it('exists', () => {
    expect(field[ns.ui('BooleanField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('BooleanField').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
  })
})

describe('TristateField', () => {
  it('exists', () => {
    expect(field[ns.ui('TristateField').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('TristateField').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
  })
})

describe('Classifier', () => {
  it('exists', () => {
    expect(field[ns.ui('Classifier').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('Classifier').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
  })
})

describe('Choice', () => {
  it('exists', () => {
    expect(field[ns.ui('Choice').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('Choice').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
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
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('Heading').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
  })
})

describe('Comment]', () => {
  it('exists', () => {
    expect(field[ns.ui('Comment').uri]).toBeInstanceOf(Object)
  })
  it('runs', () => {
    const container = element
    const already = {}
    const subject = RdfLib.sym('')
    const form = element
    const store = RdfLib.graph()
    const callbackFunction = () => {}
    expect(field[ns.ui('Comment').uri](
      dom,
      container,
      already,
      subject,
      form,
      store,
      callbackFunction
    )).toBeTruthy()
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
    expect(fieldFunction(dom, null)).toBeInstanceOf(Function)
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
    expect(editFormButton(
      dom,
      container,
      form,
      store,
      callbackFunction
    )).toBeInstanceOf(Object)
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
    expect(appendForm(
      dom,
      container,
      already,
      subject,
      form,
      store,
      itemDone
    )).toBeInstanceOf(Object)
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
    expect(newButton(
      dom,
      RdfLib.graph(),
      null,
      null,
      null,
      null,
      RdfLib.graph(),
      () => {}
    )).toBeInstanceOf(Object)
  })
})

describe('promptForNew', () => {
  it('exists', () => {
    expect(promptForNew).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(promptForNew(
      dom,
      RdfLib.graph(),
      RdfLib.sym(''),
      RdfLib.sym(''),
      RdfLib.sym(''),
      null,
      RdfLib.graph(),
      () => {}
    )).toBeInstanceOf(Object)
  })
})

describe('makeDescription', () => {
  it('exists', () => {
    expect(makeDescription).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(makeDescription(
      dom,
      RdfLib.graph(),
      null,
      null,
      RdfLib.graph(),
      () => {}
    )).toBeInstanceOf(Object)
  })
})

describe('makeSelectForOptions', () => {
  it('exists', () => {
    expect(makeSelectForOptions).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(makeSelectForOptions(
      dom,
      RdfLib.graph(),
      null,
      null,
      {},
      {},
      RdfLib.graph(),
      () => {}
    )).toBeInstanceOf(Object)
  })
})

describe('makeSelectForCategory', () => {
  it('exists', () => {
    expect(makeSelectForCategory).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(makeSelectForCategory(
      dom,
      RdfLib.graph(),
      null,
      null,
      RdfLib.graph(),
      () => {}
    )).toBeInstanceOf(Object)
  })
})

describe('makeSelectForNestedCategory', () => {
  it('exists', () => {
    expect(makeSelectForNestedCategory).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(makeSelectForNestedCategory(
      dom,
      RdfLib.graph(),
      RdfLib.sym(''),
      RdfLib.sym(''),
      RdfLib.graph(),
      () => {}
    )).toBeInstanceOf(Object)
  })
})

describe('buildCheckboxForm', () => {
  it('exists', () => {
    expect(buildCheckboxForm).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(buildCheckboxForm(
      dom,
      RdfLib.graph(),
      null,
      [],
      [],
      null,
      RdfLib.graph(),
      false
    )).toBeInstanceOf(Object)
  })
})

describe('fieldLabel', () => {
  it('exists', () => {
    expect(fieldLabel).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(fieldLabel(
      dom,
      RdfLib.sym(''),
      null
    )).toBeInstanceOf(Object)
  })
  it.skip(' ...', () => {
    expect(fieldLabel('dom', undefined, 'form').toBe())
  })
})

describe('fieldStore', () => {
  it('exists', () => {
    expect(fieldStore).toBeInstanceOf(Object)
  })
  it('runs', () => {
    expect(fieldStore(
      null,
      null,
      null
    )).toEqual(null)
  })
  it('returns def when there is no matching statement', () => {
    const statementMatching = jest.fn()
    statementMatching.mockReturnValueOnce(null)
    expect(fieldStore('subject', 'predicate', 'def')).toBe('def')
  })
})

describe('newThing', () => {
  console.log(window)
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
