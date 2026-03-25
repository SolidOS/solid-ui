import { silenceDebugMessages } from './helpers/debugger'
import { style } from '../../src/style'

silenceDebugMessages()

describe('textInputStyle', () => {
  it('exists', () => {
    expect(typeof style.textInputStyle).toEqual('string')
  })
})

describe('buttonStyle', () => {
  it('exists', () => {
    expect(typeof style.buttonStyle).toEqual('string')
  })
})
describe('iconStyle', () => {
  it('exists', () => {
    expect(typeof style.iconStyle).toEqual('string')
  })
})
describe('classIconStyle', () => {
  it('exists', () => {
    expect(typeof style.classIconStyle).toEqual('string')
  })
})
describe('messageBodyStyle', () => {
  it('exists', () => {
    expect(typeof style.messageBodyStyle).toEqual('string')
  })
})
describe('pendingeditModifier', () => {
  it('exists', () => {
    expect(typeof style.pendingeditModifier).toEqual('string')
  })
})
describe('signInButtonStyle', () => {
  it('exists', () => {
    expect(typeof style.signInAndUpButtonStyle).toEqual('string')
  })
})
describe('formTextInput', () => {
  it('exists', () => {
    expect(typeof style.formTextInput).toEqual('string')
  })
})
describe('multilineTextInputStyle', () => {
  it('exists', () => {
    expect(typeof style.multilineTextInputStyle).toEqual('string')
  })
})
