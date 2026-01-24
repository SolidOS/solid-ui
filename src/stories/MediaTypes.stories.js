import * as UI from '../../src/index'

import { rawJsonDecorator } from './decorators'

export default {
  title: 'Media Types',
}

export const IsAudio = {
  render: () => {
    const type = $rdf.namedNode('http://www.w3.org/ns/iana/media-types/audio/')
    SolidLogic.store.add(
      $rdf.namedNode('http://example.com/audio.mpeg'),
      UI.ns.rdf('type'),
      type
    )
    return UI.widgets.isAudio($rdf.namedNode('http://example.com/audio.mpeg'))
  },

  name: 'isAudio',
  decorators: [rawJsonDecorator],
}

export const IsVideo = {
  render: () => {
    const type = $rdf.namedNode('http://www.w3.org/ns/iana/media-types/video/')
    SolidLogic.store.add(
      $rdf.namedNode('http://example.com/video.mov'),
      UI.ns.rdf('type'),
      type
    )
    return UI.widgets.isVideo($rdf.namedNode('http://example.com/video.mov'))
  },

  name: 'isVideo',
  decorators: [rawJsonDecorator],
}

export const IsImage = {
  render: () => {
    const type = $rdf.namedNode('http://www.w3.org/ns/iana/media-types/image/')
    SolidLogic.store.add(
      $rdf.namedNode('http://example.com/image.jpeg'),
      UI.ns.rdf('type'),
      type
    )
    return UI.widgets.isImage($rdf.namedNode('http://example.com/image.jpeg'))
  },

  name: 'isImage',
  decorators: [rawJsonDecorator],
}
