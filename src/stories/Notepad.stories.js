import * as UI from '../../src/index'


export default {
  title: 'Notepad',
}

export const Notepad = {
  render: () => {
    const pad = $rdf.namedNode(
      'https://example-user.inrupt.net/public/example-notepad/index.ttl#this'
    )
    const me = new $rdf.NamedNode(
      'https://example-user.inrupt.net/profile/card#me'
    )
    const subject = SolidLogic.store.sym('https://test.test#')
    const options = {}
    return UI.pad.notepad(document, pad.doc(), subject, me, options)
  },

  name: 'notepad',
}

export const ManageParticipation = {
  render: () => {
    const me = new $rdf.NamedNode(
      'https://example-user.inrupt.net/profile/card#me'
    )
    const structure = document.createElement('div')
    const container = document.createElement('div')
    const subject = SolidLogic.store.sym('https://test.test#')

    const pad = $rdf.namedNode(
      'https://sharonstrats.inrupt.net/public/edu.mit.solid.pane.pad/id1584238219755/index.ttl#this'
    )

    const options = {
      statusArea: container,
    }

    return UI.pad.manageParticipation(
      document,
      structure,
      pad.doc(),
      subject,
      me,
      options
    )
  },

  name: 'manageParticipation',
}

export const NotepadToHtml = {
  render: () => {
    const div = document.createElement('div')
    const kb = SolidLogic.store
    const fetcher = $rdf.fetcher(kb)

    const pad = $rdf.namedNode(
      'https://sharonstrats.inrupt.net/public/edu.mit.solid.pane.pad/id1584238219755/index.ttl#this'
    )

    fetcher.load(pad.doc()).then(() => {
      const htmlStr = UI.pad.notepadToHTML(pad, kb)
      div.appendChild(document.createTextNode(htmlStr))
    })

    return div
  },

  name: 'notepadToHTML',
}

export const LightColorHash = {
  render: () => {
    const colorStr = UI.pad.lightColorHash(
      new $rdf.NamedNode('https://sharonstrats.inrupt.net/profile/card#me')
    )
    const inputBox = document.createElement('INPUT')
    inputBox.setAttribute('type', 'text')
    inputBox.style.backgroundColor = colorStr
    return inputBox
  },

  name: 'lightColorHash',
}

export const RenderParticipants = {
  // subject = new NamedNode('test') // this i think the page where a list.. ns.ws('participants') are stored
  render:
    // what to put in options
    // options are used in the button personTR there are the following properties can be defined deleteFunction, link, draggable
    () => {
      const div = document.createElement('div')
      const table = document.createElement('table')
      const kb = SolidLogic.store
      const fetcher = $rdf.fetcher(kb)

      const pad = $rdf.namedNode(
        'https://sharonstrats.inrupt.net/public/edu.mit.solid.pane.pad/id1584238219755/index.ttl#this'
      )

      fetcher.load(pad.doc()).then(() => {
        const subject = kb.sym('https://test.test#')
        const options = {}

        const tableOfParticipants = UI.pad.renderParticipants(
          document,
          table,
          pad,
          subject,
          new $rdf.NamedNode('https://sharonstrats.inrupt.net/profile/card#me'),
          options
        )

        div.appendChild(tableOfParticipants)
      })

      return div
    },

  name: 'renderParticipants',
}

export const ParticipationObject = {
  render: () => {
    const container = document.createElement('pre')
    const kb = SolidLogic.store
    const subject = kb.sym('https://test.test#')
    const fetcher = $rdf.fetcher(kb)

    const pad = $rdf.namedNode(
      'https://sharonstrats.inrupt.net/public/edu.mit.solid.pane.pad/id1584238219755/index.ttl#this'
    )

    fetcher
      .load(pad.doc())
      .then(() => {
        const me = new $rdf.NamedNode(
          'https://sharonstrats.inrupt.net/profile/card#me'
        )
        return UI.pad.participationObject(subject, pad, me)
      })
      .then((node) => {
        container.appendChild(
          document.createTextNode(JSON.stringify(node, null, 2))
        )
      })

    return container
  },

  name: 'participationObject',
}
