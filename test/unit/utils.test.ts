jest.mock('rdflib')
jest.mock('solid-auth-client')
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

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
import { on } from 'cluster'

describe('addLoadEvent', () => {
  it('exists', () => {
    expect(addLoadEvent).toBeInstanceOf(Function)
  })
})

describe('AJARImage', () => {
  it('exists', () => {
    expect(AJARImage).toBeInstanceOf(Function)
  })
})

describe('ancestor', () => {
  it('exists', () => {
    expect(ancestor).toBeInstanceOf(Function)
  })
})

describe('beep', () => {
  it('exists', () => {
    expect(beep).toBeInstanceOf(Function)
  })
})

describe('clearVariableNames', () => {
  it('exists', () => {
    expect(clearVariableNames).toBeInstanceOf(Function)
  })
})

describe('emptyNode', () => {
  it('exists', () => {
    expect(emptyNode).toBeInstanceOf(Function)
  })
})

describe('escapeForXML', () => {
  it('exists', () => {
    expect(escapeForXML).toBeInstanceOf(Function)
  })
})

describe('findPos', () => {
  it('exists', () => {
    expect(findPos).toBeInstanceOf(Function)
  })
})

describe('genUuid', () => {
  it('exists', () => {
    expect(genUuid).toBeInstanceOf(Function)
  })
})

describe('getAbout', () => {
  it('exists', () => {
    expect(getAbout).toBeInstanceOf(Function)
  })
})

describe('getEyeFocus', () => {
  it('exists', () => {
    expect(getEyeFocus).toBeInstanceOf(Function)
  })
})

describe('getTarget', () => {
  it('exists', () => {
    expect(getTarget).toBeInstanceOf(Function)
  })
})

describe('getTerm', () => {
  it('exists', () => {
    expect(getTerm).toBeInstanceOf(Function)
  })
})

describe('hashColor', () => {
  it('exists', () => {
    expect(hashColor).toBeInstanceOf(Function)
  })
})

describe('include', () => {
  it('exists', () => {
    expect(include).toBeInstanceOf(Function)
  })
})

describe('label', () => {
  it('exists', () => {
    expect(label).toBeInstanceOf(Function)
  })
})

describe('labelForXML', () => {
  it('exists', () => {
    expect(labelForXML).toBeInstanceOf(Function)
  })
})

describe('labelWithOntology', () => {
  it('exists', () => {
    expect(labelWithOntology).toBeInstanceOf(Function)
  })
})

describe('newVariableName', () => {
  it('exists', () => {
    expect(newVariableName).toBeInstanceOf(Function)
  })
})

describe('ontologyLabel', () => {
  it('exists', () => {
    expect(ontologyLabel).toBeInstanceOf(Function)
  })
})

describe('predicateLabelForXML', () => {
  it('exists', () => {
    expect(predicateLabelForXML).toBeInstanceOf(Function)
  })
})

describe('predParentOf', () => {
  it('exists', () => {
    expect(predParentOf).toBeInstanceOf(Function)
  })
})

describe('RDFComparePredicateObject', () => {
  it('exists', () => {
    expect(RDFComparePredicateObject).toBeInstanceOf(Function)
  })
})

describe('RDFComparePredicateSubject', () => {
  it('exists', () => {
    expect(RDFComparePredicateSubject).toBeInstanceOf(Function)
  })
})

describe('shortName', () => {
  it('exists', () => {
    expect(shortName).toBeInstanceOf(Function)
  })
})

describe('stackString', () => {
  it('exists', () => {
    expect(stackString).toBeInstanceOf(Function)
  })
})

describe('syncTableToArray', () => {
  it('exists', () => {
    expect(syncTableToArray).toBeInstanceOf(Function)
  })
})

describe('syncTableToArrayReOrdered', () => {
  it('exists', () => {
    expect(syncTableToArrayReOrdered).toBeInstanceOf(Function)
  })
})
