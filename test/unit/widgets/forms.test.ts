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
  sortBySequence,
} from '../../../src/widgets/forms'
import * as ns from '../../../src/ns'

describe('field', () => {
  it('exists', () => {
    expect(field).toBeInstanceOf(Object)
  })
})

describe('Form field', () => {
  it('exists', () => {
    expect(field[ns.ui('Form').uri]).toBeInstanceOf(Object)
  })
})

describe('Options field', () => {
  it('exists', () => {
    expect(field[ns.ui('Options').uri]).toBeInstanceOf(Object)
  })
})

describe('Multiple field', () => {
  it('exists', () => {
    expect(field[ns.ui('Multiple').uri]).toBeInstanceOf(Object)
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
})

describe('EmailField', () => {
  it('exists', () => {
    expect(field[ns.ui('EmailField').uri]).toBeInstanceOf(Object)
  })
})

describe('ColorField', () => {
  it('exists', () => {
    expect(field[ns.ui('ColorField').uri]).toBeInstanceOf(Object)
  })
})

describe('DateField', () => {
  it('exists', () => {
    expect(field[ns.ui('DateField').uri]).toBeInstanceOf(Object)
  })
})

describe('DateTimeField', () => {
  it('exists', () => {
    expect(field[ns.ui('DateTimeField').uri]).toBeInstanceOf(Object)
  })
})

describe('TimeField', () => {
  it('exists', () => {
    expect(field[ns.ui('TimeField').uri]).toBeInstanceOf(Object)
  })
})

describe('NumericField', () => {
  it('exists', () => {
    expect(field[ns.ui('NumericField').uri]).toBeInstanceOf(Object)
  })
})

describe('IntegerField', () => {
  it('exists', () => {
    expect(field[ns.ui('IntegerField').uri]).toBeInstanceOf(Object)
  })
})

describe('DecimalField', () => {
  it('exists', () => {
    expect(field[ns.ui('DecimalField').uri]).toBeInstanceOf(Object)
  })
})

describe('FloatField]', () => {
  it('exists', () => {
    expect(field[ns.ui('FloatField').uri]).toBeInstanceOf(Object)
  })
})

describe('TextField', () => {
  it('exists', () => {
    expect(field[ns.ui('TextField').uri]).toBeInstanceOf(Object)
  })
})

describe('SingleLineTextField', () => {
  it('exists', () => {
    expect(field[ns.ui('SingleLineTextField').uri]).toBeInstanceOf(Object)
  })
})

describe('NamedNodeURIField', () => {
  it('exists', () => {
    expect(field[ns.ui('NamedNodeURIField').uri]).toBeInstanceOf(Object)
  })
})

describe('MultiLineTextField', () => {
  it('exists', () => {
    expect(field[ns.ui('MultiLineTextField').uri]).toBeInstanceOf(Object)
  })
})

describe('BooleanField', () => {
  it('exists', () => {
    expect(field[ns.ui('BooleanField').uri]).toBeInstanceOf(Object)
  })
})

describe('TristateField', () => {
  it('exists', () => {
    expect(field[ns.ui('TristateField').uri]).toBeInstanceOf(Object)
  })
})

describe('Classifier', () => {
  it('exists', () => {
    expect(field[ns.ui('Classifier').uri]).toBeInstanceOf(Object)
  })
})

describe('Choice', () => {
  it('exists', () => {
    expect(field[ns.ui('Choice').uri]).toBeInstanceOf(Object)
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
})

describe('Comment]', () => {
  it('exists', () => {
    expect(field[ns.ui('Choice').uri]).toBeInstanceOf(Object)
  })
})

describe('mostSpecificClassURI', () => {
  it('exists', () => {
    expect(mostSpecificClassURI).toBeInstanceOf(Function)
  })
})

describe('fieldFunction', () => {
  it('exists', () => {
    expect(fieldFunction).toBeInstanceOf(Object)
  })
})

describe('editFormButton', () => {
  it('exists', () => {
    expect(editFormButton).toBeInstanceOf(Object)
  })
})

describe('appendForm', () => {
  it('exists', () => {
    expect(appendForm).toBeInstanceOf(Object)
  })
})

describe('propertiesForClass', () => {
  it('exists', () => {
    expect(propertiesForClass).toBeInstanceOf(Object)
  })
})

describe('findClosest', () => {
  it('exists', () => {
    expect(findClosest).toBeInstanceOf(Object)
  })
})

describe('formsFor', () => {
  it('exists', () => {
    expect(formsFor).toBeInstanceOf(Object)
  })
})

describe('sortBySequence', () => {
  it('exists', () => {
    expect(sortBySequence).toBeInstanceOf(Object)
  })
})

describe('sortByLabel', () => {
  it('exists', () => {
    expect(sortByLabel).toBeInstanceOf(Object)
  })
})

describe('newButton', () => {
  it('exists', () => {
    expect(newButton).toBeInstanceOf(Object)
  })
})

describe('promptForNew', () => {
  it('exists', () => {
    expect(promptForNew).toBeInstanceOf(Object)
  })
})

describe('makeDescription', () => {
  it('exists', () => {
    expect(makeDescription).toBeInstanceOf(Object)
  })
})

describe('makeSelectForOptions', () => {
  it('exists', () => {
    expect(makeSelectForOptions).toBeInstanceOf(Object)
  })
})

describe('makeSelectForCategory', () => {
  it('exists', () => {
    expect(makeSelectForCategory).toBeInstanceOf(Object)
  })
})

describe('makeSelectForNestedCategory', () => {
  it('exists', () => {
    expect(makeSelectForNestedCategory).toBeInstanceOf(Object)
  })
})

describe('buildCheckboxForm', () => {
  it('exists', () => {
    expect(buildCheckboxForm).toBeInstanceOf(Object)
  })
})

describe('fieldLabel', () => {
  it('exists', () => {
    expect(fieldLabel).toBeInstanceOf(Object)
  })
})

describe('fieldStore', () => {
  it('exists', () => {
    expect(fieldStore).toBeInstanceOf(Object)
  })
})

describe('newThing', () => {
  it('exists', () => {
    expect(newThing).toBeInstanceOf(Object)
  })
})

