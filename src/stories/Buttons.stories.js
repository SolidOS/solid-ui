import * as UI from '../../src/index'

import { action } from '@storybook/addon-actions'

export default {
  title: 'Buttons',
}

export const Primary = {
  render: () =>
    UI.widgets.button(document, undefined, 'Primary', action('clicked')),
  name: 'Primary',
}

export const Secondary = {
  render: () =>
    UI.widgets.button(document, undefined, 'Secondary', action('clicked'), {
      buttonColor: 'Secondary',
    }),

  name: 'Secondary',
}

export const PrimaryNeedsBorder = {
  render: () =>
    UI.widgets.button(document, undefined, 'Secondary', action('clicked'), {
      needsBorder: true,
    }),

  name: 'Primary (needs border)',
}

export const SecondaryNeedsBorder = {
  render: () =>
    UI.widgets.button(document, undefined, 'Secondary', action('clicked'), {
      buttonColor: 'Secondary',
      needsBorder: true,
    }),

  name: 'Secondary (needs border)',
}

export const ContinueButton = {
  render: () => UI.widgets.continueButton(document, action('clicked')),
  name: 'Continue button',
}

export const CancelButton = {
  render: () => UI.widgets.cancelButton(document, action('clicked')),
  name: 'Cancel button',
}

export const DeleteButton = {
  render: () => {
    const div = document.createElement('div')
    const result = UI.widgets.deleteButtonWithCheck(
      document,
      div,
      'something',
      action('deleted')
    )
    return div
  },

  name: 'Delete button',
}

export const ButtonWithIcon = {
  render: () =>
    UI.widgets.button(
      document,
      'https://solidproject.org/assets/img/solid-emblem.svg',
      'test',
      action('clicked!')
    ),

  name: 'Button with icon',
}

export const FileUploadButton = {
  render: () => UI.widgets.fileUploadButtonDiv(document, action('uploaded')),
  name: 'File upload button',
}

export const LinkButton = {
  render: () => {
    document.outlineManager = {
      GotoSubject: action('go to subject'),
    }

    return UI.widgets.linkButton(
      document,
      $rdf.namedNode('http://example.com/')
    )
  },

  name: 'Link button',
}

export const LinkIcon = {
  render: () =>
    UI.widgets.linkIcon(document, $rdf.namedNode('https://solidproject.org/')),
  name: 'Link icon',
}

export const LinkCustomIcon = {
  render: () =>
    UI.widgets.linkIcon(
      document,
      $rdf.namedNode('https://solidproject.org/'),
      'https://solidproject.org/favicon.ico'
    ),

  name: 'Link custom icon',
}

export const RemoveButton = {
  render: () => {
    const div = document.createElement('div')
    const p = document.createElement('p')
    p.appendChild(document.createTextNode('click x to remove me'))
    const button = UI.widgets.removeButton(document, p)
    div.appendChild(p)
    div.appendChild(button)
    return div
  },

  name: 'Remove button',
}
