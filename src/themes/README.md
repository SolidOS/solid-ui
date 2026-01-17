# Solid-UI Theme System

**Phase 1: Foundation** - CSS Variables & Runtime Theme Switching

## 🎨 Live Demo

**[Open Theme Demo](../../docs/theme-demo.html)** - Interactive preview of all 5 themes (no setup required, works offline)

This standalone demo file can be:
- Shared with team members via email or Slack
- Attached to GitHub issues/PRs for visual review
- Opened directly in any browser for quick testing

## Overview

The Solid-UI theme system provides modern, customizable styling using CSS custom properties (variables). It supports multiple built-in themes and allows runtime theme switching with localStorage persistence.

## Architecture

```
src/themes/
├── foundation/
│   ├── variables.css      # Base CSS custom properties
│   └── accessibility.css  # WCAG 2.1 AA compliance features
└── presets/
    ├── classic.css        # Original solid-ui appearance (default)
    ├── default.css        # Modern purple gradient (Solid style)
    ├── wave.css          # WhatsApp-style green
    ├── telegram.css      # Messenger-style blue
    └── signal.css        # Signal-style blue
```

## Usage

### Automatic Initialization

The theme system auto-initializes on page load and applies the saved theme preference (or "classic" by default):

```javascript
import { themeLoader } from 'solid-ui'

// Theme system initializes automatically
// Loads foundation CSS + saved theme from localStorage
```

### Switching Themes Programmatically

```javascript
import { themeLoader } from 'solid-ui'

// Switch to a theme
await themeLoader.loadTheme('wave')

// Get current theme
const currentTheme = themeLoader.getCurrentTheme() // 'wave'

// Get available themes
const themes = themeLoader.getAvailableThemes()
// Returns: [{ name: 'classic', label: 'Classic' }, ...]
```

### Listen for Theme Changes

```javascript
window.addEventListener('solid-ui-theme-change', (event) => {
  console.log('Theme changed to:', event.detail.theme)
})
```

### Using in Components

The `style` object now uses CSS variables with fallbacks:

```javascript
import { style } from 'solid-ui'

// Styles automatically adapt to active theme
const input = document.createElement('input')
input.style = style.textInputStyle
// Uses var(--sui-bg-input) from active theme, falls back to #eef
```

## Available Themes

### Classic (Default)
- **Colors**: Original solid-ui palette (#3B5998, #eef, #888)
- **Style**: Preserves exact original appearance
- **Use case**: Backward compatibility, no visual changes

### Default (Solid)
- **Colors**: Modern purple gradient (#667eea, #9f7aea)
- **Style**: Clean, modern with improved spacing
- **Use case**: New projects, modern look

### Wave
- **Colors**: WhatsApp green (#128c7e, #075e54)
- **Style**: Clean messenger style
- **Use case**: Familiar, friendly interface

### Telegram
- **Colors**: Telegram blue (#0088cc, #0078b8)
- **Style**: Professional messenger
- **Use case**: Business, clean interface

### Signal
- **Colors**: Signal blue (#2c6bed, #1851c4)
- **Style**: Privacy-focused, professional
- **Use case**: Security-focused apps

## CSS Variables Reference

### Colors
```css
--sui-primary: #805ad5;
--sui-accent: #9f7aea;
--sui-bg: #f7f8fc;
--sui-bg-panel: #ffffff;
--sui-text: #2d3748;
--sui-text-secondary: #4a5568;
--sui-border-color: #e2e8f0;
```

### Spacing
```css
--sui-space-xs: 0.25em;
--sui-space-sm: 0.5em;
--sui-space-md: 1em;
--sui-space-lg: 1.5em;
--sui-space-xl: 2em;
```

### Border Radius
```css
--sui-border-radius: 0.5em;
--sui-border-radius-sm: 0.3em;
--sui-border-radius-lg: 1em;
--sui-border-radius-full: 50%;
```

### Shadows
```css
--sui-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.08);
--sui-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
--sui-shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.2);
```

See `foundation/variables.css` for the complete list.

## Creating Custom Themes

Create a new CSS file in `presets/`:

```css
/* src/themes/presets/mytheme.css */
:root {
  --sui-primary: #your-color;
  --sui-accent: #your-accent;
  /* Override other variables as needed */
}
```

Register the theme:

```javascript
import { themeLoader } from 'solid-ui'

themeLoader.themes.mytheme = 'themes/presets/mytheme.css'
await themeLoader.loadTheme('mytheme')
```

## Accessibility Features

All themes include WCAG 2.1 Level AA compliance features:

- **Focus Indicators**: Visible 2px outlines
- **High Contrast Mode**: Automatic adaptation
- **Reduced Motion**: Respects user preference
- **Touch Targets**: Minimum 44x44px
- **Screen Reader Support**: `.sr-only` utility class

See `foundation/accessibility.css` for details.

## Browser Support

CSS custom properties are supported in:
- ✅ Chrome/Edge 49+
- ✅ Firefox 31+
- ✅ Safari 9.1+
- ✅ iOS Safari 9.3+
- ✅ Android Browser 76+

For older browsers, fallback values ensure basic functionality.

## Migration from Inline Styles

The style.js file now uses a hybrid approach:

**Before (hard-coded)**:
```javascript
background-color: #eef;
```

**After (with CSS variable + fallback)**:
```javascript
background-color: var(--sui-bg-input, #eef);
```

This maintains backward compatibility while enabling theming.

## Performance

- CSS variables have negligible performance impact
- Theme files are ~2-4KB each (gzipped)
- Theme switching is near-instant (<100ms)
- Foundation CSS loads once and caches

## Troubleshooting

### Theme not loading?
Check browser console for errors. Verify CSS file paths are correct relative to your build output.

### Styles not updating?
Hard refresh (Ctrl+Shift+R) to clear cached CSS. Check that CSS variables are defined in your theme file.

### Want to disable auto-init?
```javascript
// In your app's entry point, before solid-ui loads:
window.SOLID_UI_SKIP_THEME_INIT = true

// Then manually init later:
import { themeLoader } from 'solid-ui'
await themeLoader.init()
```

## Future Enhancements

Phase 1 establishes the foundation. Future phases will add:
- Theme picker widget
- Component-specific theme overrides
- Dark mode variants
- Community theme marketplace

## Contributing

When adding new styles:
1. Use CSS variables with fallbacks
2. Test with all 5 themes
3. Verify accessibility (contrast, focus, etc.)
4. Update this documentation

---

**Status**: Phase 1 Complete ✅  
**Next**: Phase 2 - Component Modernization
