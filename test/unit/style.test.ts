jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'
import { dom } from '../helpers/dom'

import {
  textInputStyle,
  buttonStyle,
  textButtonStyle,
  iconStyle,
  classIconStyle,
  messageBodyStyle,
  pendingeditModifier,
  highlightColor,
  signInButtonStyle,
  formBorderColor,
  formHeadingColor,
  formTextInput,
  multilineTextInputStyle
} from '../../src/style'

describe('textInputStyle', () => {
  it('exists', () => {
    expect(typeof textInputStyle).toEqual('string')
  })
})

describe('buttonStyle', () => {
  it('exists', () => {
    expect(typeof buttonStyle).toEqual('string')
  })
})
describe('textButtonStyle', () => {
  it('exists', () => {
    expect(typeof textButtonStyle).toEqual('string')
  })
})
describe('iconStyle', () => {
  it('exists', () => {
    expect(typeof iconStyle).toEqual('string')
  })
})
describe('classIconStyle', () => {
  it('exists', () => {
    expect(typeof classIconStyle).toEqual('string')
  })
})
describe('messageBodyStyle', () => {
  it('exists', () => {
    expect(typeof messageBodyStyle).toEqual('string')
  })
})
describe('pendingeditModifier', () => {
  it('exists', () => {
    expect(typeof pendingeditModifier).toEqual('string')
  })
})
describe('highlightColor', () => {
  it('exists', () => {
    expect(typeof highlightColor).toEqual('string')
  })
})
describe('signInButtonStyle', () => {
  it('exists', () => {
    expect(typeof signInButtonStyle).toEqual('string')
  })
})
describe('formBorderColor', () => {
  it('exists', () => {
    expect(typeof formBorderColor).toEqual('string')
  })
})
describe('formHeadingColor', () => {
  it('exists', () => {
    expect(typeof formHeadingColor).toEqual('string')
  })
})
describe('formTextInput', () => {
  it('exists', () => {
    expect(typeof formTextInput).toEqual('string')
  })
})
describe('multilineTextInputStyle', () => {
  it('exists', () => {
    expect(typeof multilineTextInputStyle).toEqual('string')
  })
})