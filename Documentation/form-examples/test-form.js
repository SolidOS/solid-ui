
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

  var uri = window.location.href

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
  @prefix ex: <#>.  # Things in the examples
  @prefix : <#>.
`

  // var div = dom.getElementById('UITestArea')

  const getOptions = {
    credentials: 'omit', withCredentials: false
  }

  function output (row) {
    return row.children[1]
  }
  function renderForm (form, subject, container) {
    async function callback() {
    }
    const doc = subject.doc()

    var ele =  UI.widgets.appendForm(dom, container, {}, subject, form, doc, callback)
    return ele
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

    async function loadTextIntoCell(cell) {
      
      //TODO: need to take the sources from all cells not just the first one
      const source = cell.getAttribute('source')
      if (!source) return
      const response = await kb.fetcher.webOperation('GET', addStoHTTP(source), getOptions)
      if (!response.ok) { // if HTTP-status is 200-299
        const msg = "HTTP-Error: " + response.status
        cell.textContent = msg
        cell.style.backgroundColor = '#fee'
        alert(msg);
        return
      }
      const text = response.responseText;
      const pre = dom.createElement('pre')
      cell.appendChild(pre)
      pre.textContent = text
    }

    const cellForClass = []

    for (var cell of row.children) {
      await loadTextIntoCell(cell)
      if (cell.getAttribute('class')) {
        for (const c of cell.getAttribute('class').split(' ')) {
          cellForClass[c] = cell
          console.log('   cellForClass: ' + c)
        }
      }
    }
    const inputCell = cellForClass['input']
    const targetCell  = cellForClass['target']
    const outputCell = cellForClass['output']
  
    const inputText = inputCell.firstElementChild.textContent
    if (inputCell.getAttribute('source')) {
      form = $rdf.sym(inputCell.getAttribute('source'))
    }
    if (targetCell.getAttribute('source')) {
      subject = $rdf.sym(targetCell.getAttribute('source'))
    }

    try {
      $rdf.parse(prolog + inputText, kb, form.doc().uri, 'text/turtle') // str, kb, base, contentType
    } catch (e) {
      outputCell.textContent = e
      //console.log('>>>>>>>' + prolog + inputText + '<<<<<<\n')
      return
    }

    if (true) {
      const subjectText = "" // targetCell.firstElementChild.textContent
      try {
        $rdf.parse(prolog + subjectText, kb, subject.doc().uri, 'text/turtle') // str, kb, base, contentType
      } catch (e) {
        outputCell.textContent = e
        //console.log('>>>>>>>' + prolog + subjectText + '<<<<<<\n')
        return
      }
    }
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
  } // showResults

  await showResults()
})
