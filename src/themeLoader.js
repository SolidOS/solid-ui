/**
 * Theme Loader for Solid-UI
 * Handles dynamic theme loading and switching
 */

const STORAGE_KEY = 'solid-ui-theme'
const DEFAULT_THEME = 'classic'

class ThemeLoader {
  constructor () {
    this.themes = {
      classic: 'theme-classic.css',
      default: 'theme-default.css',
      wave: 'theme-wave.css',
      telegram: 'theme-telegram.css',
      signal: 'theme-signal.css'
    }

    this.currentTheme = this.getSavedTheme()
    this.linkElements = {}
    this.initialized = false
  }

  /**
   * Initialize the theme system
   * Loads foundation CSS and current theme
   */
  async init () {
    if (this.initialized) return

    try {
      // Load foundation styles first
      await this.loadFoundation()

      // Load current theme
      await this.loadTheme(this.currentTheme)

      this.initialized = true
    } catch (error) {
      console.error('Failed to initialize theme system:', error)
      // Continue without themes - use inline styles as fallback
    }
  }

  /**
   * Load foundation CSS (variables + accessibility)
   */
  async loadFoundation () {
    // Variables
    const variablesLink = this.createLinkElement('solid-ui-variables', 'theme-variables.css')
    document.head.insertBefore(variablesLink, document.head.firstChild)
    this.linkElements.variables = variablesLink

    // Accessibility
    const a11yLink = this.createLinkElement('solid-ui-accessibility', 'theme-accessibility.css')
    document.head.insertBefore(a11yLink, document.head.firstChild)
    this.linkElements.accessibility = a11yLink

    // Wait for CSS to load
    await Promise.all([
      this.waitForStylesheet(variablesLink),
      this.waitForStylesheet(a11yLink)
    ])
  }

  /**
   * Load a theme by name
   * @param {string} themeName - Name of theme to load
   */
  async loadTheme (themeName) {
    const themeFile = this.themes[themeName] || this.themes[DEFAULT_THEME]

    try {
      // Create or update theme link
      let themeLink = this.linkElements.theme
      if (!themeLink) {
        themeLink = this.createLinkElement('solid-ui-theme', themeFile)
        document.head.appendChild(themeLink)
        this.linkElements.theme = themeLink
      } else {
        themeLink.href = this.resolveThemePath(themeFile)
      }

      // Wait for theme to load
      await this.waitForStylesheet(themeLink)

      // Update state
      this.currentTheme = themeName
      this.saveTheme(themeName)

      // Emit event for listeners
      this.emitThemeChange(themeName)
    } catch (error) {
      console.error(`Failed to load theme "${themeName}":`, error)
      throw error
    }
  }

  /**
   * Get list of available themes
   * @returns {Array<{name: string, label: string}>}
   */
  getAvailableThemes () {
    return Object.keys(this.themes).map(name => ({
      name,
      label: this.formatThemeName(name)
    }))
  }

  /**
   * Get currently active theme
   * @returns {string}
   */
  getCurrentTheme () {
    return this.currentTheme
  }

  /**
   * Create a link element for CSS
   * @private
   */
  createLinkElement (id, href) {
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href = this.resolveThemePath(href)
    return link
  }

  /**
   * Resolve theme path relative to solid-ui
   * @private
   */
  resolveThemePath (path) {
    // In development, path might need adjustment
    // In production (dist), themes should be copied alongside
    if (typeof __webpack_public_path__ !== 'undefined') {
      return __webpack_public_path__ + path
    }

    // Try to find solid-ui base path
    const scripts = document.getElementsByTagName('script')
    for (const script of scripts) {
      if (script.src && script.src.includes('solid-ui')) {
        const baseUrl = script.src.substring(0, script.src.lastIndexOf('/') + 1)
        return baseUrl + path
      }
    }

    // Fallback to relative path
    return path
  }

  /**
   * Wait for stylesheet to load
   * @private
   */
  waitForStylesheet (link) {
    return new Promise((resolve, reject) => {
      link.onload = () => resolve()
      link.onerror = () => reject(new Error(`Failed to load: ${link.href}`))

      // Timeout after 10 seconds
      setTimeout(() => reject(new Error('Theme load timeout')), 10000)
    })
  }

  /**
   * Get saved theme from localStorage
   * @private
   */
  getSavedTheme () {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME
    } catch (error) {
      return DEFAULT_THEME
    }
  }

  /**
   * Save theme to localStorage
   * @private
   */
  saveTheme (themeName) {
    try {
      localStorage.setItem(STORAGE_KEY, themeName)
    } catch (error) {
      console.warn('Failed to save theme preference:', error)
    }
  }

  /**
   * Format theme name for display
   * @private
   */
  formatThemeName (name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  /**
   * Emit theme change event
   * @private
   */
  emitThemeChange (themeName) {
    const event = new CustomEvent('solid-ui-theme-change', {
      detail: { theme: themeName }
    })
    window.dispatchEvent(event)
  }
}

// Create singleton instance
export const themeLoader = new ThemeLoader()

// Auto-initialize on load (can be disabled if manual control needed)
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => themeLoader.init())
  } else {
    themeLoader.init()
  }
}

export default themeLoader
