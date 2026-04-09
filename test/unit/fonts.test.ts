import { fontNames, fontFamilies, loadFonts } from '../../src/fonts'

describe('fontNames', () => {
  it('exposes the primary button font name', () => {
    expect(fontNames.button).toEqual('Raleway')
  })

  it('exposes the button fallback font name', () => {
    expect(fontNames.buttonFallback).toEqual('Roboto')
  })
})

describe('fontFamilies', () => {
  it('includes the button font family string', () => {
    expect(typeof fontFamilies.button).toEqual('string')
    expect(fontFamilies.button).toContain('Raleway')
    expect(fontFamilies.button).toContain('Roboto')
    expect(fontFamilies.button).toContain('sans-serif')
  })

  it('includes the header font family string', () => {
    expect(typeof fontFamilies.header).toEqual('string')
    expect(fontFamilies.header).toContain('Arial')
    expect(fontFamilies.header).toContain('sans-serif')
  })
})

describe('loadFonts', () => {
  beforeEach(() => {
    // Clear any <link> elements added by previous tests
    document.querySelectorAll('link[data-solid-ui-fonts]').forEach(el => el.remove())
  })

  it('appends a <link> element to document.head', () => {
    loadFonts()
    const link = document.querySelector('link[data-solid-ui-fonts]')
    expect(link).not.toBeNull()
    expect(link!.getAttribute('rel')).toEqual('stylesheet')
  })

  it('uses the default Google Fonts URL when no argument is supplied', () => {
    loadFonts()
    const link = document.querySelector('link[data-solid-ui-fonts]') as HTMLLinkElement
    expect(link.href).toContain('fonts.googleapis.com')
    expect(link.href).toContain('Raleway')
    expect(link.href).toContain('Roboto')
  })

  it('accepts a custom font URL', () => {
    const customUrl = 'https://example.com/fonts.css'
    loadFonts(customUrl)
    const link = document.querySelector('link[data-solid-ui-fonts]') as HTMLLinkElement
    expect(link.href).toEqual(customUrl)
  })

  it('does not add duplicate <link> elements when called multiple times', () => {
    loadFonts()
    loadFonts()
    const links = document.querySelectorAll('link[data-solid-ui-fonts]')
    expect(links.length).toEqual(1)
  })
})
