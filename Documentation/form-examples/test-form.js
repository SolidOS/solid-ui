/* global $rdf UI debug */
if (!window.UI) {
  window.alert('Missing UI code - load mashlib first.')
}
window.$rdf = UI.rdf

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
  var base = (window.document.title = uri.slice(0, uri.lastIndexOf('/') + 1))
  // var testDocURI = base + 'test.ttl' // imaginary doc - just use its URL
  // const testDocURI = 'https://timbl.com/timbl/Public/Test/Forms/exampleData.ttl'
  const testDocURI = 'https://solidos.solidcommunity.net/public/2021/10_example_data/example.ttl'
  var testDoc = $rdf.sym(testDocURI)
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
  @prefix ex: <#>.  # Things in the examples
  @prefix : <#>.
`

  var div = dom.getElementById('UITestArea')
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

  async function doRow (prolog, row) {
    kb.removeMany(null, null, null, testDoc) // Remove previous test data
    var text, subject

    var form = ex('form') // By default

    const inputCell = row.firstElementChild
    if (inputCell.getAttribute('source')) {
      const source = inputCell.getAttribute('source')
      form = $rdf.sym(source)
      const response = await kb.fetcher.webOperation('GET', source, getOptions)
      if (response.ok) { // if HTTP-status is 200-299
        text = response.responseText;
      } else {
        const msg = "HTTP-Error: " + response.status
        output(row).textContent = msg
        alert(msg);
      }
      const pre = dom.createElement('pre')
      row.firstElementChild.appendChild(pre)
      pre.textContent = text
    } else {
      text = inputCell.firstElementChild.textContent
    }

    if (inputCell.getAttribute('subject')) {
      subject = $rdf.sym(inputCell.getAttribute('subject'))
    } else {
      subject = ex('this')
    }
    try {
      $rdf.parse(prolog + text, kb, form.doc().uri, 'text/turtle') // str, kb, base, contentType
    } catch (e) {
      output(row).textContent = e
      console.log('>>>>>>>' + prolog + text + '<<<<<<\n')
      return
    }
    renderForm(form, subject, output(row))
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

  try {
    // await kb.fetcher.load(testDoc) // To fool the form syt
  } catch (err) {
    console.warn(err)
  }
  await showResults()
})
