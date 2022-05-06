
/* global $rdf UI debug */
if (!window) {
  window.alert('Missing UI code - load mashlib first.')
}
window.$rdf = window.UI.rdf

document.addEventListener('DOMContentLoaded', async function () {
  /// ///////////////////////////////////////////

  var kb = UI.store

  kb.updater.editable = // uri => true // Force modifyable UX // @@@
    function (uri) {
      console.log(' @@ fudging editable for ' + uri)
      return 'SPARQL'
    }

  var dom = document

  // this is used for the example files like structures.html that do not have a URI which is mandatory for a form
  const testDocURI = 'https://solidos.solidcommunity.net/public/2021/solidUiFormTestData/dummyFormTestFile.ttl'
  const ex = $rdf.Namespace(testDocURI + "#")

  const defaultProlog = `
  @prefix foaf:  <http://xmlns.com/foaf/0.1/>.
  @prefix sched: <http://www.w3.org/ns/pim/schedule#>.
  @prefix cal:   <http://www.w3.org/2002/12/cal/ical#>.
  @prefix dc:    <http://purl.org/dc/elements/1.1/>.
  @prefix rdfs:  <http://www.w3.org/2000/01/rdf-schema#>.
  @prefix ui:    <http://www.w3.org/ns/ui#>.
  @prefix trip:  <http://www.w3.org/ns/pim/trip#>.
  @prefix vcard: <http://www.w3.org/2006/vcard/ns#>.
  @prefix xsd:   <http://www.w3.org/2001/XMLSchema#>.
  @prefix : <#>.
`

  const getOptions = {
    credentials: 'omit', withCredentials: false
  }

  function renderForm(form, subject, container) {
    return UI.widgets.appendForm(dom, container, {}, subject, form, subject.doc(), {})
  }

  /* For loading eg ontologies from w3.org
  */
  function addStoHTTP (str) {
    if (str.startsWith('http:')) {
      return 'https:' + str.slice(5)
    }
    return str
  }

  async function doRow (prolog, row) {

    async function loadTextIntoCell(cell, doc) {
      let text = cell.textContent
      const source = cell.getAttribute('source')
      if (source) {
        const response = await kb.fetcher.webOperation('GET', addStoHTTP(source), getOptions)
        if (!response.ok) { // if HTTP-status is 200-299
          const msg = "HTTP-Error: " + response.status
          cell.textContent = msg
          cell.style.backgroundColor = '#fee'
          alert(msg);
          return
        }
        text = response.responseText;
        const pre = dom.createElement('pre')
        cell.appendChild(pre)
        pre.textContent = text
        try {
          $rdf.parse(prolog + text, kb, doc.doc().uri, 'text/turtle') // str, kb, base, contentType
        } catch (e) {
          pre.textContent = e
          //console.log('>>>>>>>' + prolog + inputText + '<<<<<<\n')
          return
        }
      }
      else {
        try {
          $rdf.parse(prolog + text, kb, testDocURI, 'text/turtle') // str, kb, base, contentType
        } catch (e) {
          cell.textContent = e
          //console.log('>>>>>>>' + prolog + inputText + '<<<<<<\n')
          return
        }
      }
    }

    const cellForClass = []

    for (var cell of row.children) {
      //await loadTextIntoCell(cell)
      if (cell.getAttribute('class')) {
        for (const c of cell.getAttribute('class').split(' ')) {
          cellForClass[c] = cell
          console.log('   cellForClass: ' + c)
        }
      }
    }
    const inputCell = cellForClass['input']
    const targetCell = cellForClass['target']
    const outputCell = cellForClass['output']
  
    let form
    if (inputCell.getAttribute('source')) {
      form = $rdf.sym(inputCell.getAttribute('source'))
    } else {
      form = ex('this')
    }
    await loadTextIntoCell(inputCell, form)
    let subject
    if (targetCell.getAttribute('source')) {
      subject = $rdf.sym(targetCell.getAttribute('source'))
    } else {
      subject = ex('org1')
    }
    await loadTextIntoCell(targetCell, subject)
    renderForm(form, subject, outputCell)
  }

  async function showResults () {
    var prologEle = dom.getElementById('Prolog')
    const prolog = defaultProlog + (prologEle ? prologEle.textContent : "")

    const testRows = dom.getElementsByClassName('form-demo')
    for (var row of testRows) {
      await doRow(prolog, row)
    }
    if (dom.getElementById('TestData')) {
      for (var row of dom.getElementById('TestData').children) {
        await doRow(prolog, row)
      }
    }
  }

  await showResults()

})
