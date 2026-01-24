import * as UI from '../../src/index'

import { rawJsonDecorator } from './decorators'

export default {
  title: 'RDF utilities',
}

export const AllClassUris = {
  render: () => {
    SolidLogic.store.add(
      $rdf.namedNode('http://example.com/#some-thing'),
      $rdf.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      $rdf.namedNode('http://example.com/#some-class')
    )

    SolidLogic.store.add(
      $rdf.namedNode('http://example.com/#some-other-thing'),
      $rdf.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      $rdf.namedNode('http://example.com/#some-other-class')
    )

    return UI.widgets.allClassURIs()
  },

  name: 'allClassUris',
  decorators: [rawJsonDecorator],
}

export const DefaultAnnotationStore = {
  render: () => {
    const url = 'http://example.com/a/b.html'
    return UI.widgets.defaultAnnotationStore($rdf.namedNode(url))
  },

  name: 'defaultAnnotationStore',
  decorators: [rawJsonDecorator],
}

export const ExtractLogUri = {
  render: () => {
    const url =
      'https://example.com/logFile=http%3A%2F%2Fexample.org%2Flogs.ttl&rulesFile=ttp%3A%2F%2Fexample.org%2Frules.ttl'
    return decodeURIComponent(UI.widgets.extractLogURI(url))
  },

  name: 'extractLogURI',
  decorators: [rawJsonDecorator],
}

export const PropertyTriage = {
  // FIXME: make this example return actual possible properties
  render: () => {
    const kb = SolidLogic.store
    return UI.widgets.propertyTriage(kb)
  },

  name: 'propertyTriage',
  decorators: [rawJsonDecorator],
}
