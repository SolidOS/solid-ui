import * as UI from '../../src/index'

import { action } from '@storybook/addon-actions'

const loadTurtleDecorator = (Story) => {
  const { render, data } = Story()
  $rdf.parse(
    data,
    SolidLogic.store,
    location.origin,
    'text/turtle',
    (error) => {
      if (error) console.error(error)
    }
  )
  const div = document.createElement('div')
  const pre = document.createElement('pre')
  pre.appendChild(document.createTextNode(data))
  div.appendChild(pre)
  div.appendChild(render())
  return div
}

export default {
  title: 'Tabs',
}

export const RdfCollection = {
  render: () => {
    const subject = $rdf.namedNode(location.origin + '#subject1')
    const predicate = $rdf.namedNode(location.origin + '#predicate1')

    return {
      data: `
@prefix : <#> .
:subject1
    :predicate1 ( :item1A :item1B ) .
        `,

      render: () =>
        UI.tabs.tabWidget({
          subject,
          predicate,

          renderMain: (bodyMain, subject) => {
            bodyMain.innerText = `Content of ${subject.uri}`
          },
        }),
    }
  },

  name: 'rdf collection',
  decorators: [loadTurtleDecorator],
}

export const UnsortedTriples = {
  render: () => {
    const subject = $rdf.namedNode(location.origin + '#subject2')
    const predicate = $rdf.namedNode(location.origin + '#predicate2')

    return {
      data: `
@prefix :     <#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
:subject2
    :predicate2 :item2A, :item2B .
:item2A
    rdfs:label "Tab 1" .
:item2B
    rdfs:label "Tab 2" .
        `,

      render: () =>
        UI.tabs.tabWidget({
          subject,
          predicate,
          ordered: false,

          renderMain: (bodyMain, subject) => {
            bodyMain.innerText = `Content of ${UI.utils.label(subject)}`
          },
        }),
    }
  },

  name: 'unsorted triples',
  decorators: [loadTurtleDecorator],
}

export const OptionItems = {
  render: () => {
    const item1 = $rdf.namedNode(location.origin + '#item3A')
    const item2 = $rdf.namedNode(location.origin + '#item3B')

    return UI.tabs.tabWidget({
      items: [item1, item2],

      renderMain: (bodyMain, subject) => {
        bodyMain.innerText = `Content of ${subject}`
      },
    })
  },

  name: 'option items',
}

export const BackgroundColor = {
  render: ({ backgroundColor }) => {
    const item1 = $rdf.namedNode(location.origin + '#item3A')
    const item2 = $rdf.namedNode(location.origin + '#item3B')

    return UI.tabs.tabWidget({
      backgroundColor,
      items: [item1, item2],

      renderMain: (bodyMain, subject) => {
        bodyMain.innerText = `Content of ${subject}`
      },
    })
  },

  name: 'background color',

  args: {
    backgroundColor: '#ff0000',
  },

  argTypes: {
    backgroundColor: {
      control: {
        type: 'select',
        options: ['#ff0000', '#00ff00', '#0000ff'],
      },
    },
  },
}

export const OnClose = {
  render: () => {
    const item1 = $rdf.namedNode(location.origin + '#item3A')
    const item2 = $rdf.namedNode(location.origin + '#item3B')

    return UI.tabs.tabWidget({
      onClose: action('closed'),
      items: [item1, item2],

      renderMain: (bodyMain, subject) => {
        bodyMain.innerText = `Content of ${subject}`
      },
    })
  },

  name: 'on close',
}

export const Orientation = {
  render: ({ orientation }) => {
    const item1 = $rdf.namedNode(location.origin + '#item3A')
    const item2 = $rdf.namedNode(location.origin + '#item3B')

    return UI.tabs.tabWidget({
      orientation,
      items: [item1, item2],

      renderMain: (bodyMain, subject) => {
        bodyMain.innerText = `Content of ${subject}`
      },
    })
  },

  name: 'orientation',

  args: {
    orientation: '1',
  },

  argTypes: {
    orientation: {
      control: {
        type: 'select',
        options: ['0', '1', '2', '3'],
      },
    },
  },
}

export const RenderTab = {
  render: () => {
    const item1 = $rdf.namedNode(location.origin + '#item3A')
    const item2 = $rdf.namedNode(location.origin + '#item3B')

    return UI.tabs.tabWidget({
      items: [item1, item2],

      renderMain: (bodyMain, subject) => {
        bodyMain.innerText = `Content of ${subject}`
      },

      renderTab: (tabDiv, subject) => {
        tabDiv.innerText = `Go to ${subject.uri}`
      },
    })
  },

  name: 'renderTab',
}

export const RenderTabSettings = {
  render: () => {
    const item1 = $rdf.namedNode(location.origin + '#item3A')
    const item2 = $rdf.namedNode(location.origin + '#item3B')

    return UI.tabs.tabWidget({
      items: [item1, item2],

      renderMain: (bodyMain, subject) => {
        bodyMain.innerText = `Content of ${subject}`
      },

      renderTabSettings: (bodyMain, subject) => {
        bodyMain.innerText = `Settings for ${subject.uri}`
      },
    })
  },

  name: 'renderTabSettings',
}

export const SelectedTab = {
  render: () => {
    const item1 = $rdf.namedNode(location.origin + '#item3A')
    const item2 = $rdf.namedNode(location.origin + '#item3B')

    return UI.tabs.tabWidget({
      items: [item1, item2],

      renderMain: (bodyMain, subject) => {
        bodyMain.innerText = `Content of ${subject}`
      },

      renderTab: (tabDiv, subject) => {
        tabDiv.dataset.name = subject.uri
        tabDiv.innerText = UI.utils.label(subject)
      },

      selectedTab: item2.uri,
    })
  },

  name: 'selectedTab',
}

export const StartEmpty = {
  render: () => {
    const item1 = $rdf.namedNode(location.origin + '#item3A')
    const item2 = $rdf.namedNode(location.origin + '#item3B')

    return UI.tabs.tabWidget({
      items: [item1, item2],
      startEmpty: true,

      renderMain: (bodyMain, subject) => {
        bodyMain.innerText = `Content of ${subject}`
      },
    })
  },

  name: 'startEmpty',
}
