import {
  addLoadEvent, // not used anywhere
  AJARImage,
  ancestor,
  beep,
  clearVariableNames,
  emptyNode,
  escapeForXML,
  findPos,
  genUuid,
  getAbout,
  getEyeFocus,
  getTarget,
  getTerm,
  hashColor,
  include,
  label,
  labelForXML,
  labelWithOntology,
  newVariableName,
  ontologyLabel,
  predicateLabelForXML,
  predParentOf,
  RDFComparePredicateObject,
  RDFComparePredicateSubject,
  shortName,
  stackString,
  syncTableToArray,
  syncTableToArrayReOrdered
} from '../../src/utils'

jest.mock('rdflib')
jest.mock('solid-auth-client')

describe('addLoadEvent', () => {
  it('exists', () => {
    expect(addLoadEvent).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(addLoadEvent()).toBeTruthy()
  })
})

describe('AJARImage', () => {
  it('exists', () => {
    expect(AJARImage).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(AJARImage()).toBeTruthy()
  })
})

describe('ancestor', () => {
  it('exists', () => {
    expect(ancestor).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(ancestor()).toBeTruthy()
  })
})

describe('beep', () => {
  it('exists', () => {
    expect(beep).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(beep()).toBeTruthy()
  })
})

describe('clearVariableNames', () => {
  it('exists', () => {
    expect(clearVariableNames).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(clearVariableNames()).toBeTruthy()
  })
})

describe('emptyNode', () => {
  it('exists', () => {
    expect(emptyNode).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(emptyNode()).toBeTruthy()
  })
})

describe('escapeForXML', () => {
  it('exists', () => {
    expect(escapeForXML).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(escapeForXML()).toBeTruthy()
  })
})

describe('findPos', () => {
  it('exists', () => {
    expect(findPos).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(findPos()).toBeTruthy()
  })
})

describe('genUuid', () => {
  it('exists', () => {
    expect(genUuid).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(genUuid()).toBeTruthy()
  })
})

describe('getAbout', () => {
  it('exists', () => {
    expect(getAbout).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(getAbout()).toBeTruthy()
  })
})

describe('getEyeFocus', () => {
  it('exists', () => {
    expect(getEyeFocus).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(getEyeFocus()).toBeTruthy()
  })
})

describe('getTarget', () => {
  it('exists', () => {
    expect(getTarget).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(getTarget()).toBeTruthy()
  })
})

describe('getTerm', () => {
  it('exists', () => {
    expect(getTerm).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(getTerm()).toBeTruthy()
  })
})

describe('hashColor', () => {
  it('exists', () => {
    expect(hashColor).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(hashColor()).toBeTruthy()
  })
})

describe('include', () => {
  it('exists', () => {
    expect(include).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(include()).toBeTruthy()
  })
})

describe('label', () => {
  it('exists', () => {
    expect(label).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(label()).toBeTruthy()
  })
})

describe('labelForXML', () => {
  it('exists', () => {
    expect(labelForXML).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(labelForXML()).toBeTruthy()
  })
})

describe('labelWithOntology', () => {
  it('exists', () => {
    expect(labelWithOntology).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(labelWithOntology()).toBeTruthy()
  })
})

describe('newVariableName', () => {
  it('exists', () => {
    expect(newVariableName).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(newVariableName()).toBeTruthy()
  })
})

describe('ontologyLabel', () => {
  it('exists', () => {
    expect(ontologyLabel).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(ontologyLabel()).toBeTruthy()
  })
})

describe('predicateLabelForXML', () => {
  it('exists', () => {
    expect(predicateLabelForXML).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(predicateLabelForXML()).toBeTruthy()
  })
})

describe('predParentOf', () => {
  it('exists', () => {
    expect(predParentOf).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(predParentOf()).toBeTruthy()
  })
})

describe('RDFComparePredicateObject', () => {
  it('exists', () => {
    expect(RDFComparePredicateObject).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(RDFComparePredicateObject()).toBeTruthy()
  })
})

describe('RDFComparePredicateSubject', () => {
  it('exists', () => {
    expect(RDFComparePredicateSubject).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(RDFComparePredicateSubject()).toBeTruthy()
  })
})

describe('shortName', () => {
  it('exists', () => {
    expect(shortName).toBeInstanceOf(Function)
  })
  it.skip('runs', () => {
    //FIXME see https://github.com/solid/solid-ui/issues/194
    expect(shortName('a')).toBeTruthy()
  })
})

describe('stackString', () => {
  it('exists', () => {
    expect(stackString).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(stackString({
      stack: {
        toString() {
          return 'bla'
        }
      }
    })).toBeTruthy()
  })
})

describe('syncTableToArray', () => {
  it('exists', () => {
    expect(syncTableToArray).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(syncTableToArray({
      children: []
    }, [], () => {})).toEqual(undefined)
  })
})

describe('syncTableToArrayReOrdered', () => {
  it('exists', () => {
    expect(syncTableToArrayReOrdered).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(syncTableToArrayReOrdered({
      children: []
    }, [], () => {})).toEqual(undefined)
  })
})
