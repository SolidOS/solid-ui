import { Footer } from './Footer'
import './index'
import { authn } from 'solid-logic'

describe('SolidUIFooterElement', () => {
  it('is defined as a custom element', () => {
    const defined = customElements.get('solid-ui-footer')
    expect(defined).toBe(Footer)
  })

  it('renders a public view when not logged in', async () => {
    const footer = new Footer()
    document.body.appendChild(footer)
    await footer.updateComplete

    const shadow = footer.shadowRoot
    expect(shadow).not.toBeNull()
    expect(shadow?.textContent).toContain('Public View')
    expect(shadow?.textContent).toContain('You are viewing this profile as a guest.')
  })

  it('renders a logged in view when the user is authenticated', async () => {
    const currentUser = { uri: 'https://alice.example/profile/card#me', equals: jest.fn(() => true) }
    const currentUserSpy = jest.spyOn(authn, 'currentUser').mockReturnValue(currentUser as any)

    const footer = new Footer()
    document.body.appendChild(footer)
    await footer.updateComplete

    const shadow = footer.shadowRoot
    expect(shadow).not.toBeNull()
    expect(shadow?.textContent).toContain('Logged in View')
    expect(shadow?.textContent).toContain('You are logged in as')
    const link = shadow?.querySelector('a')
    expect(link?.getAttribute('href')).toBe('https://alice.example/profile/card#me')
    expect(link?.textContent).toBe('https://alice.example/profile/card#me')

    currentUserSpy.mockRestore()
  })

  it('defaults layout to desktop', async () => {
    const footer = new Footer()
    document.body.appendChild(footer)
    await footer.updateComplete

    expect(footer.layout).toBe('desktop')
    expect(footer.getAttribute('layout')).toBe('desktop')
  })

  it('applies mobile layout styles by removing border, box-shadow and border-radius', async () => {
    const footer = new Footer()
    footer.layout = 'mobile'
    document.body.appendChild(footer)
    await footer.updateComplete

    const style = footer.shadowRoot?.querySelector('style')?.textContent
    expect(style).toContain(':host([layout=\'mobile\'])')
    expect(style).toContain('border: none;')
    expect(style).toContain('box-shadow: none;')
    expect(footer.getAttribute('layout')).toBe('mobile')
  })
})
