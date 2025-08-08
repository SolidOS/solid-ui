if (!window.UI) {
  window.alert('Please run "npm install && npm run build" in your repo root first.')
}
window.$rdf = UI.rdf

document.addEventListener('DOMContentLoaded', function () {
  /// ///////////////////////////////////////////

  const kb = UI.store
  const dom = document

  const ICAL = $rdf.Namespace('http://www.w3.org/2002/12/cal/ical#')
  const SCHED = $rdf.Namespace('http://www.w3.org/ns/pim/schedule#')
  const DC = $rdf.Namespace('http://purl.org/dc/elements/1.1/')

  const uri = window.location.href
  const base = (window.document.title = uri.slice(0, uri.lastIndexOf('/') + 1))
  const testDocURI = base + 'test.ttl' // imaginary doc - just use its URL
  const testDoc = $rdf.sym(testDocURI)
  const subjectURI = testDocURI + '#event1'
  const meURI = testDocURI + '#a0'
  const me = kb.sym(meURI)

  //    var forms_uri = window.document.title = base+ 'forms.ttl';

  const subject = kb.sym(subjectURI)
  const div = dom.getElementById('UITestArea')

  const showResults = function () {
    //       Now the form for responsing to the poll
    //

    // div.appendChild(dom.createElement('hr'))

    const invitation = subject

    const query = new $rdf.Query('Responses')
    const v = {}
    ;['time', 'author', 'value', 'resp', 'cell'].map(function (x) {
      query.vars.push((v[x] = $rdf.variable(x)))
    })
    query.pat.add(invitation, SCHED('response'), v.resp)
    query.pat.add(v.resp, DC('author'), v.author)
    query.pat.add(v.resp, SCHED('cell'), v.cell)
    query.pat.add(v.cell, SCHED('availabilty'), v.value)
    query.pat.add(v.cell, ICAL('dtstart'), v.time)
    /*
        var prologue = "    @prefix foaf:  <http://xmlns.com/foaf/0.1/>.\n\
    @prefix sched: <http://www.w3.org/ns/pim/schedule#>.\n\
    @prefix ical:  <http://www.w3.org/2002/12/cal/icaltzd#>.\n\
    @prefix dc:    <http://purl.org/dc/elements/1.1/>.\n";
    */
    const prologue = dom.getElementById('Prologue').textContent

    // var config = dom.getElementById('Config').textContent;
    // $rdf.parse(prologue + config, kb, testDocURI, 'text/turtle') // str, kb, base, contentType

    const tests = dom.getElementById('TestData').children
    const inputText = function (tr) {
      return tr.children[0].children[0].textContent
    }
    const output = function (tr) {
      return tr.children[1]
    }
    let t = 0
    $rdf.parse(prologue + inputText(tests[t]), kb, testDocURI, 'text/turtle') // str, kb, base, contentType

    const options = {}

    const setAxes = function () {
      options.set_x = kb.each(subject, SCHED('option')) // @@@@@ option -> dtstart in future
      options.set_x = options.set_x.map(function (opt) {
        return kb.any(opt, ICAL('dtstart'))
      })

      options.set_y = kb.each(subject, SCHED('response'))
      options.set_y = options.set_y.map(function (resp) {
        return kb.any(resp, DC('author'))
      })
    }
    setAxes()

    // var possibleTimes = kb.each(invitation, SCHED('option'))
    //         .map(function (opt) { return kb.any(opt, ICAL('dtstart')) })

    const displayTheMatrix = function () {
      const matrix = div.appendChild(
        UI.matrix.matrixForQuery(
          dom,
          query,
          v.time,
          v.author,
          v.value,
          options,
          function () {}
        )
      )

      matrix.setAttribute('class', 'matrix')

      const refreshButton = dom.createElement('button')
      refreshButton.textContent = 'refresh'
      refreshButton.addEventListener(
        'click',
        function (_event) {
          matrix.refresh()
        },
        false
      )
      return matrix
    }

    // @@ Give other combos too-- see schedule ontology
    const possibleAvailabilities = [SCHED('No'), SCHED('Maybe'), SCHED('Yes')]

    const dataPointForNT = []

    // var doc = testDoc
    options.set_y = options.set_y.filter(function (z) {
      return !z.sameTerm(me)
    })
    options.set_y.push(me) // Put me on the end

    options.cellFunction = function (cell, x, y, value) {
      const refreshColor = function () {
        const bg = kb.any(value, UI.ns.ui('backgroundColor'))
        if (bg) {
          cell.setAttribute(
            'style',
            'text-align: center; background-color: ' + bg + ';'
          )
        }
      }
      if (value !== null) {
        refreshColor()
      }
      if (y.sameTerm(me)) {
        const callback = function () {
          refreshColor()
        } //  @@ may need that
        const selectOptions = {}
        const predicate = SCHED('availabilty')
        const cellSubject = dataPointForNT[x.toNT()]
        const selector = UI.widgets.makeSelectForOptions(
          dom,
          kb,
          cellSubject,
          predicate,
          possibleAvailabilities,
          selectOptions,
          testDoc,
          callback
        )
        cell.appendChild(selector)
      } else if (value !== null) {
        cell.textContent = UI.utils.label(value)
      }
    }

    const matrix = displayTheMatrix()

    const agenda = []

    const nextTest = function nextTest () {
      // First take a copy of the DOM the klast test produced
      output(tests[t]).appendChild(matrix.cloneNode(true))

      t += 1
      const test = tests[t]
      if (!test) return

      kb.removeMany(undefined, undefined, undefined, testDoc) // Flush out previous test data
      $rdf.parse(prologue + inputText(tests[t]), kb, testDocURI, 'text/turtle')
      setAxes()
      matrix.refresh()

      setTimeout(nextTest, 2000)
    }

    agenda.push(nextTest)

    setTimeout(function () {
      agenda.shift()()
    }, 2000)
  } // showResults

  showResults()
})
