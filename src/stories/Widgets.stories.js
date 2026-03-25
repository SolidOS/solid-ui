import * as UI from '../../src/index'

export default {
  title: 'Widgets',
}

export const TwoLineTransactions = {
  render: () => {
    const twoLineTransaction =
      UI.widgets.index.twoLine[
        'http://www.w3.org/2000/10/swap/pim/qif#Transaction'
      ]
    const thing = $rdf.namedNode('http://example.com/#transaction')
    SolidLogic.store.add(
      thing,
      UI.ns.qu('payee'),
      $rdf.namedNode('https://payee.com/#me')
    )
    SolidLogic.store.add(thing, UI.ns.qu('date'), $rdf.literal('2020-01-01'))
    SolidLogic.store.add(thing, UI.ns.qu('amount'), $rdf.literal('20 USD'))
    return twoLineTransaction(document, thing)
  },

  name: 'twoLineTransactions',
}

export const TwoLineTrip = {
  render: () => {
    const twoLineTrip =
      UI.widgets.index.twoLine['http://www.w3.org/ns/pim/trip#Trip']
    const thing = $rdf.namedNode('http://example.com/#trip')
    SolidLogic.store.add(thing, UI.ns.dc('title'), 'Some trip')
    SolidLogic.store.add(
      thing,
      UI.ns.cal('dtstart'),
      $rdf.literal('2020-01-01')
    )
    SolidLogic.store.add(thing, UI.ns.cal('dtend'), $rdf.literal('2020-02-02'))
    return twoLineTrip(document, thing)
  },

  name: 'twoLineTrip',
}

export const TwoLineWidgetForClass = {
  render: () => {
    const rdfClass = UI.ns.foaf('Person')
    const thing = $rdf.namedNode(
      'https://michielbdejong.inrupt.net/profile/card#me'
    )
    const widgetFunction = UI.widgets.index.twoLine.widgetForClass(rdfClass)
    const widget = widgetFunction(document, thing)
    return widget
  },

  name: 'twoLineWidgetForClass',
}
