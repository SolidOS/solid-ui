import { silenceDebugMessages } from '../helpers/setup'
import { NamedNode, Namespace, parse, Query, sym, variable } from 'rdflib'
import { solidLogicSingleton } from 'solid-logic'
// @ts-ignore
import { renderTableViewPane } from '../../src/table'

const kb = solidLogicSingleton.store

silenceDebugMessages()

const tableData = `@prefix : <https://example.com/tests#> .
 :Alice   :age 21; :name "Alice"; :hobby "Fishing"; :dob 1999-07-04Z .
 :Bob     :age 18; :name "Bob"; :hobby "Hockey"; :dob 2002-05-12Z .
 :Charlie :age 15; :name "Charlie"; :hobby "Gym"; :dob 2005-01-31Z .
`

const doc = sym('https://example.com/tests')
parse(tableData, kb, doc.uri) // should be able  to omit tcontent type and callback
// const query = $rdf.SPARQLToQuery(tableQuery) // TypeError: $rdf.SPARQLToQuery is not a function

const query = new Query('List people')
const vars = ['person', 'name', 'age', 'hobby']

export interface Person {
    person: NamedNode,
    name: string,
    age: number,
    hobby: string
}

const v = <Person> {} // The RDF variable objects for each variable name
vars.forEach(function (x) {
  query.vars.push((v[x] = variable(x)))
})
const EX = Namespace('https://example.com/tests#')
query.pat.add(v.person, EX('name'), v.name, doc)
query.pat.add(v.person, EX('age'), v.age as any, doc) // @@ TODO remove `as any` Pending fix rdflib https://github.com/linkeddata/rdflib.js/issues/416
query.pat.add(v.person, EX('hobby'), v.hobby, doc)

const tableOptions = { query }

kb.fetcher = null // @@@@@ kludge turn off link following

describe('renderTableViewPane', () => {
  it('exists', () => {
    expect(renderTableViewPane).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const options = { sourceDocument: null, tableClass: null, query: null }
    expect(renderTableViewPane(document, options).innerHTML).toMatch(/.*<table.*/)
  })
  it('makes the table header', () => {
    expect(renderTableViewPane(document, tableOptions).innerHTML).toMatch(/.*<table.*person.*name.*age.*hobby.*/)
  })
  it('calls onDone', async () => {
    const onDone = jest.fn() // mock function
    const _ = renderTableViewPane(document, { query, onDone }).innerHTML
    await new Promise(resolve => setTimeout(resolve, 1000))
    expect(onDone).toHaveBeenCalled()
  })
  it('includes the data', async () => {
    let result = null
    const _ = renderTableViewPane(document, { query, onDone })

    function onDone (ele) {
      result = ele.innerHTML
      // console.log('***** onDone called! ' + result)
    }

    await new Promise(resolve => setTimeout(resolve, 3000))
    expect(result).toMatch(/.*Alice.*/)
    // console.log('@@@ >>>> ' + renderTableViewPane(document, tableOptions).innerHTML + '<<<<<')
    // expect(renderTableViewPane(document, tableOptions).innerHTML).toMatch(/.*<table.*person.*name.*age.*hobby.*/)
  })
  it('includes the data', async () => {
    let result = null
    const _ = renderTableViewPane(document, { query, onDone })

    function onDone (ele) {
      result = ele.innerHTML
    }

    await new Promise(resolve => setTimeout(resolve, 3000))
    expect(result).toMatch(/.*Alice.*/)
  })
  it('orders by age', async () => {
    const options = { query, onDone, sortBy: '?age', sortReverse: false }
    let result = null
    const widget = renderTableViewPane(document, options)
    function onDone () {
      result = widget.innerHTML
    }
    await new Promise(resolve => setTimeout(resolve, 3000))
    expect(result).toMatch(/.*Charlie.*Bob.*Alice.*/)
  })

  it('orders by reverse age', async () => {
    const options = { query, onDone, sortBy: '?age', sortReverse: true }
    let result = null
    const _ = renderTableViewPane(document, options)
    function onDone (ele) {
      result = ele.innerHTML
    }
    await new Promise(resolve => setTimeout(resolve, 3000))
    expect(result).toMatch(/.*Alice.*Bob.*Charlie.*/)
  })

  it('orders by name', async () => {
    const options = { query, onDone, sortBy: '?name', sortReverse: false }
    let result = null
    const _ = renderTableViewPane(document, options)
    function onDone (ele) {
      result = ele.innerHTML
    }
    await new Promise(resolve => setTimeout(resolve, 3000))
    // console.log('After delay, widget.innerHTML = ' + widget.innerHTML)
    expect(result).toMatch(/.*Alice.*Bob.*Charlie.*/)
  })

  it('orders by hobby', async () => {
    const options = { query, onDone, sortBy: '?hobby', sortReverse: false }
    let result = null
    const _ = renderTableViewPane(document, options)
    function onDone (ele) {
      result = ele.innerHTML
    }
    await new Promise(resolve => setTimeout(resolve, 3000))
    // console.log('After delay, widget.innerHTML = ' + widget.innerHTML)
    expect(result).toMatch(/.*Alice.*Charlie.*Bob.*/)
  })

  it('renames columns', async () => {
    const options = {
      query,
      onDone,
      hints: {
        '?person': { label: 'WHO' },
        '?name': { label: 'WHAT' },
        '?age': { label: 'WHEN' },
        '?hobby': { label: 'WHY' }
      }
    }
    let result = null
    const _ = renderTableViewPane(document, options)
    function onDone (ele) {
      result = ele.innerHTML
    }
    await new Promise(resolve => setTimeout(resolve, 3000))
    // console.log('After delay, widget.innerHTML = ' + widget.innerHTML)
    expect(result).toMatch(/.*WHO.*WHAT.*WHEN.*WHY.*/)
  })
})
