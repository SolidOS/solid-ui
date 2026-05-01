export const v2Components = [
  {
    sourceDir: 'header',
    exportName: 'header'
  },
  {
    sourceDir: 'loginButton',
    exportName: 'login-button'
  },
  {
    sourceDir: 'signupButton',
    exportName: 'signup-button'
  },
  {
    sourceDir: 'photoCapture',
    exportName: 'photo-capture'
  },
  {
    sourceDir: 'footer',
    exportName: 'footer'
  },
  {
    sourceDir: 'select',
    exportName: 'select'
  },
  {
    sourceDir: 'combobox',
    exportName: 'combobox'
  }
]

export const componentEntries = Object.fromEntries(
  v2Components.map(({ sourceDir }) => [
    sourceDir,
    {
      import: `./src/v2/components/${sourceDir}/index.ts`
    }
  ])
)

export const componentExports = Object.fromEntries(
  v2Components.map(({ sourceDir, exportName }) => [
    `./components/${exportName}`,
    {
      types: `./dist/components/${sourceDir}/index.d.ts`,
      import: `./dist/components/${sourceDir}/index.esm.js`,
      require: `./dist/components/${sourceDir}/index.js`
    }
  ])
)