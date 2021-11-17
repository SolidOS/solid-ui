/* global $rdf UI debug */
if (!window.UI) {
  window.alert('Missing UI code - load mashlib first.')
}
window.$rdf = UI.rdf

document.addEventListener('DOMContentLoaded', async function () {
  /// ///////////////////////////////////////////

  var kb = UI.store
  var dom = document

  var uri = window.location.href
  var base = (window.document.title = uri.slice(0, uri.lastIndexOf('/') + 1))
  // var testDocURI = base + 'test.ttl' // imaginary doc - just use its URL
  // const testDocURI = 'https://timbl.com/timbl/Public/Test/Forms/exampleData.ttl'
  const testDocURI = 'https://solidos.solidcommunity.net/public/2021/10_example_data/example.ttl'
  var testDoc = $rdf.sym(testDocURI)
  const ex = $rdf.Namespace(testDocURI + "#")

  var div = dom.getElementById('UITestArea')

  function inputText (tr) {
    return tr.children[0].children[0].textContent
  }
  function output (tr) {
    return tr.children[1]
  }
  function renderForm (container) {
    async function callback() {
    }
    const form = ex('form')
    const subject = ex('this')
    const doc = subject.doc()

    var ele =  UI.widgets.appendForm(dom, container, {}, subject, form, doc, callback)
    return ele
  }

  function doRow (prologue, test) {
    kb.removeMany(null, null, null, testDoc) // Remove previous test data
    try {
      $rdf.parse(prologue + inputText(test), kb, testDocURI, 'text/turtle') // str, kb, base, contentType
    } catch (e) {
      output(test).textContent = e
      return
    }
    renderForm(output(test))
  }
  var showResults = function () {
    var prologue = dom.getElementById('Prologue').textContent

    var tests = dom.getElementById('TestData').children
    for (var test of tests) {
      doRow(prologue, test)
    }

  } // showResults

  await kb.fetcher.load(testDoc)
  showResults()
})
