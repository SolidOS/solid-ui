import * as UI from '../../src/index'

import { rawJsonDecorator } from './decorators'

const imageDecorator = (Story) => {
  const result = Story()
  return `
            <div>Returns:</div>
            <pre>${result}</pre>
            <p>Preview:</p>
            <img src="${result}" width="80" />
`
}

export default {
  title: 'Images',
}

export const ForFoafAgent = {
  render: () => UI.widgets.findImage(UI.ns.foaf('Agent')),
  name: 'for foaf:Agent',
  decorators: [imageDecorator],
}

export const ForRdfResource = {
  render: () => UI.widgets.findImage(UI.ns.rdf('Resource')),
  name: 'for rdf:Resource',
  decorators: [imageDecorator],
}

export const WithVcardHasPhoto = {
  render: () => {
    const person = $rdf.namedNode('https://person.example/1#me')
    const photo = $rdf.namedNode('https://michielbdejong.com/img/me.jpg')
    SolidLogic.store.add(person, UI.ns.vcard('hasPhoto'), photo)
    return UI.widgets.findImage(person)
  },

  name: 'with vcard:hasPhoto',
  decorators: [imageDecorator],
}

export const WithFoafImg = {
  render: () => {
    const person = $rdf.namedNode('https://person.example/2#me')
    const photo = $rdf.namedNode('https://michielbdejong.com/img/me.jpg')
    SolidLogic.store.add(person, UI.ns.foaf('img'), photo)
    return UI.widgets.findImage(person)
  },

  name: 'with foaf:img',
  decorators: [imageDecorator],
}

export const WithoutFavicon = {
  render: () =>
    UI.widgets.findImageFromURI($rdf.namedNode('https://example.com/')),
  name: 'without favicon',
  decorators: [imageDecorator],
}

export const Favicon = {
  render: () =>
    UI.widgets.findImageFromURI(
      $rdf.namedNode('https://solidproject.org/some/file.html')
    ),
  name: 'favicon',
  decorators: [imageDecorator],
}

export const MessageId = {
  render: () => UI.widgets.findImageFromURI($rdf.namedNode('mid:example')),
  name: 'Message-ID',
  decorators: [imageDecorator],
}

export const EMail = {
  render: () =>
    UI.widgets.findImageFromURI($rdf.namedNode('mailto:user@mail.example')),
  name: 'E-Mail',
  decorators: [imageDecorator],
}

export const ImagesOf = {
  render: () => {
    const store = $rdf.graph()
    const thing = $rdf.namedNode('http://thing.example/resource#it')
    const avatar = $rdf.namedNode('https://pod.example/image1.png')
    const image = $rdf.namedNode('https://pod.example/image2.jpg')
    store.add(thing, UI.ns.sioc('avatar'), avatar)
    store.add(thing, UI.ns.foaf('img'), image)
    return UI.widgets.imagesOf(thing, store)
  },

  name: 'imagesOf',
  decorators: [rawJsonDecorator],
}

export const SetImage = {
  render: () => {
    const myTrip = $rdf.namedNode('http://example.com/#trip')
    $rdf.graph().add(myTrip, UI.ns.rdf('type'), UI.ns.trip('Trip'))
    const img = document.createElement('img')
    img.setAttribute('style', 'height:50px;width:50px;')
    UI.widgets.setImage(img, myTrip)
    return img
  },

  name: 'setImage',
}
