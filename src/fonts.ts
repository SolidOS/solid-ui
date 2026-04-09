/**
 * Font information for solid-ui / Mashlib.
 *
 * The UI references the following font families in its inline styles:
 *
 * - **Raleway** and **Roboto**: used for primary and secondary buttons
 *   (`font-family: Raleway, Roboto, sans-serif`). These are web fonts that
 *   are _not_ bundled with the library; they must be loaded separately by the
 *   host application (e.g. via `loadFonts()`).
 *
 * - **Arial**: used for header menu links and buttons. Arial is a system font
 *   on Windows and macOS; on other platforms the browser will fall back to the
 *   next `sans-serif` font.
 *
 * - **monospace** and **sans-serif**: generic CSS font families used for the
 *   notepad / pad widget and heading elements respectively.
 *
 * Use `loadFonts()` to inject the Raleway and Roboto web fonts into the
 * document so that they are available on all platforms.
 */

import styleConstants from './styleConstants'

/** Names of the web fonts that solid-ui references in its styles. */
export const fontNames = {
  /** Primary font for buttons. */
  button: 'Raleway',
  /** Fallback font for buttons when Raleway is unavailable. */
  buttonFallback: 'Roboto'
}

/**
 * Full CSS font-family stacks as used in the inline styles.
 * These match the values in `styleConstants`.
 */
export const fontFamilies = {
  /** Font stack for primary and secondary buttons. */
  button: styleConstants.fontFamilyButton,
  /** Font stack for header menus and navigation links. */
  header: styleConstants.fontFamilyHeader
}

/**
 * Injects a `<link>` element into the document `<head>` to load Raleway and
 * Roboto from the provided base URL (defaults to Google Fonts).
 *
 * Call this once during application initialisation so that the web fonts
 * referenced in solid-ui styles are actually available to the browser.
 *
 * @param fontsUrl - The URL of the CSS file that declares `@font-face` rules
 *   for Raleway and Roboto. Defaults to a Google Fonts stylesheet. Pass a
 *   self-hosted URL to avoid sending requests to third-party servers.
 */
export function loadFonts (
  fontsUrl = 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&family=Roboto:wght@400;700&display=swap'
): void {
  if (typeof document === 'undefined') return

  // Avoid adding duplicate <link> elements.
  const existing = document.querySelector(`link[data-solid-ui-fonts]`)
  if (existing) return

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = fontsUrl
  link.setAttribute('data-solid-ui-fonts', 'true')
  document.head.appendChild(link)
}
