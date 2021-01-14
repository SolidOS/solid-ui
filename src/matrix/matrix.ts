//      Build a 2D matrix of values
//
//  dom      AKA document
//  query    a Query object of rdflib.js with a valid pattern
//  vx       A variable object, the one to be used for the X variable (horiz)
//  vy       A variable object, the one to be used for the Y variable (vertical)
//  vvalue       A variable object, the one to be used for the cell value
//  returns  A DOM element with the matrix in it, which has a .refresh() function.
//
// Options:
//     cellFunction(td, x, y, value)  fill the TD element of a single cell
//     xDecreasing  set true for x axis to be in decreasing order.
//     yDecreasing  set true for y axis to be in decreasing order.
//     set_x        array of X values to be define initial rows (order irrelevant)
//     set_y        array of Y values to be define initial columns
//
// Features:
//   Header row at top (x axis) and left (y-axis) generated automatically.
//   Extra rows and columns are inserted as needed to hold new data points
//   matrix.refresh() will re-run the query and adjust the display

import utils from '../utils'
import * as $rdf from 'rdflib'
import { MatrixOptions } from './types'
import { solidLogicSingleton } from '../logic'

const kb = solidLogicSingleton.store

export function matrixForQuery (
  dom: HTMLDocument,
  query: $rdf.Query,
  vx: $rdf.Variable,
  vy: $rdf.Variable,
  vvalue: $rdf.Variable,
  options: MatrixOptions,
  whenDone: () => void
) {
  // @@ TODO Remove need to cast to any
  const matrix: any = dom.createElement('table')
  const header = dom.createElement('tr')
  const corner = header.appendChild(dom.createElement('td'))
  corner.setAttribute('class', 'MatrixCorner')
  matrix.appendChild(header) // just one for now
  matrix.lastHeader = header // Element before data
  let columns: any[] = [] // Vector
  const rows: any[] = [] // Associative array

  const setCell = function (cell, x, y, value) {
    while (cell.firstChild) {
      // Empty any previous
      cell.removeChild(cell.firstChild)
    }
    cell.setAttribute('style', '')
    cell.style.textAlign = 'center'

    if (options.cellFunction) {
      options.cellFunction(cell, x, y, value)
    } else {
      cell.textContent = utils.label(value)
      cell.setAttribute('style', 'padding: 0.3em')
    }
    delete cell.old
  }

  const rowFor = function (y1) {
    const y = y1.toNT()
    if (rows[y]) return rows[y]
    // @@ TODO Remove need for casting to any
    const tr: any = dom.createElement('tr')
    const header = tr.appendChild(dom.createElement('td'))
    header.setAttribute('style', 'padding: 0.3em;')
    header.textContent = utils.label(y1) // first approximation
    if (y1.termType === 'NamedNode') {
      kb.fetcher!.nowOrWhenFetched(y1.uri.split('#')[0], undefined, function (
        ok,
        _body,
        _response
      ) {
        if (ok) header.textContent = utils.label(y1)
      })
    }
    for (let i = 0; i < columns.length; i++) {
      setCell(
        tr.appendChild(dom.createElement('td')),
        $rdf.fromNT(columns[i]),
        y1,
        null
      )
    }
    tr.dataValueNT = y
    rows[y] = tr
    for (let ele = matrix.lastHeader.nextSibling; ele; ele = ele.nextSibling) {
      // skip header
      if (
        (y > ele.dataValueNT && options && options.yDecreasing) ||
        (y < ele.dataValueNT && !(options && options.yDecreasing))
      ) {
        return matrix.insertBefore(tr, ele) // return the tr
      }
    }
    return matrix.appendChild(tr) // return the tr
  }

  const columnNumberFor = function (x1): number {
    const xNT: any = x1.toNT() // xNT is a NT string
    let col: any = null
    // These are data columns (not headings)
    for (let i = 0; i < columns.length; i++) {
      if (columns[i] === xNT) {
        return i
      }

      if (
        (xNT > columns[i] && options.xDecreasing) ||
        (xNT < columns[i] && !options.xDecreasing)
      ) {
        columns = columns
          .slice(0, i)
          .concat([xNT])
          .concat(columns.slice(i))
        col = i
        break
      }
    }

    if (col === null) {
      col = columns.length
      columns.push(xNT)
    }

    // col is the number of the new column, starting from 0
    for (let row = matrix.firstChild; row; row = row.nextSibling) {
      // For every row header or not
      const y = row.dataValueNT
      const td = dom.createElement('td') // Add a new cell
      td.style.textAlign = 'center'
      if (row === matrix.firstChild) {
        td.textContent = utils.label(x1)
      } else {
        setCell(td, x1, $rdf.fromNT(y), null)
      }
      if (col === columns.length - 1) {
        row.appendChild(td)
      } else {
        let t = row.firstChild
        for (let j = 0; j < col + 1; j++) {
          // Skip header col too
          t = t.nextSibling
        }
        row.insertBefore(td, t)
      }
    }
    return col
  }

  const markOldCells = function () {
    for (let i = 1; i < matrix.children.length; i++) {
      const row = matrix.children[i]
      for (let j = 1; j < row.children.length; j++) {
        row.children[j].old = true
      }
    }
  }

  const clearOldCells = function () {
    let row, cell
    const colsUsed: any[] = []
    const rowsUsed: any[] = []

    if (options.set_y) {
      // Knows y values create rows
      for (let k = 0; k < options.set_y.length; k++) {
        rowsUsed[options.set_y[k]] = true
      }
    }
    if (options.set_x) {
      for (let k = 0; k < options.set_x.length; k++) {
        colsUsed[columnNumberFor(options.set_x[k]) + 1] = true
      }
    }

    for (let i = 1; i < matrix.children.length; i++) {
      row = matrix.children[i]
      for (let j = 1; j < row.children.length; j++) {
        cell = row.children[j]
        if (cell.old) {
          const y = $rdf.fromNT(row.dataValueNT)
          const x = $rdf.fromNT(columns[j - 1])
          setCell(cell, x, y, null)
        } else {
          rowsUsed[row.dataValueNT] = true
          colsUsed[j] = true
        }
      }
    }

    for (let i = 0; i < matrix.children.length; i++) {
      row = matrix.children[i]
      if (i > 0 && !rowsUsed[row.dataValueNT]) {
        delete rows[row.dataValueNT]
        matrix.removeChild(row)
      } else {
        for (let j = row.children.length - 1; j > 0; j--) {
          // backwards
          const cell = row.children[j]
          if (!colsUsed[j]) {
            row.removeChild(cell)
          }
        }
      }
    }
    const newcolumns: any[] = []
    for (let j = 0; j < columns.length; j++) {
      if (colsUsed[j + 1]) {
        newcolumns.push(columns[j])
      }
    }
    columns = newcolumns
  }

  matrix.refresh = function () {
    markOldCells()
    kb.query(query, addCellFromBindings, undefined, clearOldCells)
  }

  const addCellFromBindings = function (bindings) {
    const x = bindings[vx.toString()]
    const y = bindings[vy.toString()]
    const value = bindings[(vvalue.toString())]
    const row = rowFor(y)
    const colNo = columnNumberFor(x)
    const cell = row.children[colNo + 1] // number of Y axis headings
    setCell(cell, x, y, value)
  }

  if (options.set_y) {
    // Knows y values create rows
    for (let k = 0; k < options.set_y.length; k++) {
      rowFor(options.set_y[k])
    }
  }
  if (options.set_x) {
    for (let k = 0; k < options.set_x.length; k++) {
      columnNumberFor(options.set_x[k])
    }
  }

  kb.query(query, addCellFromBindings, undefined, whenDone) // Populate the matrix
  return matrix
}
