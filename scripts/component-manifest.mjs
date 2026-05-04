export const v2Components = [
  {
    sourceDir: 'header',
    sourcePath: 'layout/header',
    exportNames: ['header', 'layout/header']
  },
  {
    sourceDir: 'loginButton',
    sourcePath: 'auth/loginButton',
    exportNames: ['loginButton', 'login-button', 'auth/login-button']
  },
  {
    sourceDir: 'signupButton',
    sourcePath: 'auth/signupButton',
    exportNames: ['auth/signup-button', 'signup-button']
  },
  {
    sourceDir: 'photoCapture',
    sourcePath: 'media/photoCapture',
    exportNames: ['media/photo-capture', 'photo-capture']
  },
  {
    sourceDir: 'button',
    sourcePath: 'actions/button',
    exportNames: ['actions/button', 'button']
  },
  {
    sourceDir: 'footer',
    sourcePath: 'layout/footer',
    exportNames: ['footer', 'layout/footer']
  },
  {
    sourceDir: 'select',
    sourcePath: 'forms/select',
    exportNames: ['forms/select', 'select']
  },
  {
    sourceDir: 'combobox',
    sourcePath: 'forms/combobox',
    exportNames: ['forms/combobox', 'combobox']
  },
  {
    sourceDir: 'peopleSearch',
    sourcePath: 'forms/peopleSearch',
    exportNames: ['forms/people-search', 'people-search']
  }
]

export const componentEntries = Object.fromEntries(
  v2Components.map(({ sourceDir, sourcePath = sourceDir }) => [
    sourceDir,
    {
      import: `./src/v2/components/${sourcePath}/index.ts`
    }
  ])
)

export const componentExports = Object.fromEntries(
  v2Components.flatMap(({ sourceDir, exportNames }) =>
    exportNames.map(exportName => [
      `./components/${exportName}`,
      {
        types: `./dist/components/${sourceDir}/index.d.ts`,
        import: `./dist/components/${sourceDir}/index.esm.js`,
        require: `./dist/components/${sourceDir}/index.js`
      }
    ])
  )
)
