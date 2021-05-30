"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matrixForQuery = matrixForQuery;

var utils = _interopRequireWildcard(require("../utils"));

var $rdf = _interopRequireWildcard(require("rdflib"));

var _logic = require("../logic");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
var kb = _logic.solidLogicSingleton.store;

function matrixForQuery(dom, query, vx, vy, vvalue, options, whenDone) {
  // @@ TODO Remove need to cast to any
  var matrix = dom.createElement('table');
  var header = dom.createElement('tr');
  var corner = header.appendChild(dom.createElement('td'));
  corner.setAttribute('class', 'MatrixCorner');
  matrix.appendChild(header); // just one for now

  matrix.lastHeader = header; // Element before data

  var columns = []; // Vector

  var rows = []; // Associative array

  var setCell = function setCell(cell, x, y, value) {
    while (cell.firstChild) {
      // Empty any previous
      cell.removeChild(cell.firstChild);
    }

    cell.setAttribute('style', '');
    cell.style.textAlign = 'center';

    if (options.cellFunction) {
      options.cellFunction(cell, x, y, value);
    } else {
      cell.textContent = utils.label(value);
      cell.setAttribute('style', 'padding: 0.3em');
    }

    delete cell.old;
  };

  var rowFor = function rowFor(y1) {
    var y = y1.toNT();
    if (rows[y]) return rows[y]; // @@ TODO Remove need for casting to any

    var tr = dom.createElement('tr');
    var header = tr.appendChild(dom.createElement('td'));
    header.setAttribute('style', 'padding: 0.3em;');
    header.textContent = utils.label(y1); // first approximation

    if (y1.termType === 'NamedNode') {
      kb.fetcher.nowOrWhenFetched(y1.uri.split('#')[0], undefined, function (ok, _body, _response) {
        if (ok) header.textContent = utils.label(y1);
      });
    }

    for (var i = 0; i < columns.length; i++) {
      setCell(tr.appendChild(dom.createElement('td')), $rdf.fromNT(columns[i]), y1, null);
    }

    tr.dataValueNT = y;
    rows[y] = tr;

    for (var ele = matrix.lastHeader.nextSibling; ele; ele = ele.nextSibling) {
      // skip header
      if (y > ele.dataValueNT && options && options.yDecreasing || y < ele.dataValueNT && !(options && options.yDecreasing)) {
        return matrix.insertBefore(tr, ele); // return the tr
      }
    }

    return matrix.appendChild(tr); // return the tr
  };

  var columnNumberFor = function columnNumberFor(x1) {
    var xNT = x1.toNT(); // xNT is a NT string

    var col = null; // These are data columns (not headings)

    for (var i = 0; i < columns.length; i++) {
      if (columns[i] === xNT) {
        return i;
      }

      if (xNT > columns[i] && options.xDecreasing || xNT < columns[i] && !options.xDecreasing) {
        columns = columns.slice(0, i).concat([xNT]).concat(columns.slice(i));
        col = i;
        break;
      }
    }

    if (col === null) {
      col = columns.length;
      columns.push(xNT);
    } // col is the number of the new column, starting from 0


    for (var row = matrix.firstChild; row; row = row.nextSibling) {
      // For every row header or not
      var y = row.dataValueNT;
      var td = dom.createElement('td'); // Add a new cell

      td.style.textAlign = 'center';

      if (row === matrix.firstChild) {
        td.textContent = utils.label(x1);
      } else {
        setCell(td, x1, $rdf.fromNT(y), null);
      }

      if (col === columns.length - 1) {
        row.appendChild(td);
      } else {
        var t = row.firstChild;

        for (var j = 0; j < col + 1; j++) {
          // Skip header col too
          t = t.nextSibling;
        }

        row.insertBefore(td, t);
      }
    }

    return col;
  };

  var markOldCells = function markOldCells() {
    for (var i = 1; i < matrix.children.length; i++) {
      var row = matrix.children[i];

      for (var j = 1; j < row.children.length; j++) {
        row.children[j].old = true;
      }
    }
  };

  var clearOldCells = function clearOldCells() {
    var row, cell;
    var colsUsed = [];
    var rowsUsed = [];

    if (options.set_y) {
      // Knows y values create rows
      for (var k = 0; k < options.set_y.length; k++) {
        rowsUsed[options.set_y[k]] = true;
      }
    }

    if (options.set_x) {
      for (var _k = 0; _k < options.set_x.length; _k++) {
        colsUsed[columnNumberFor(options.set_x[_k]) + 1] = true;
      }
    }

    for (var i = 1; i < matrix.children.length; i++) {
      row = matrix.children[i];

      for (var j = 1; j < row.children.length; j++) {
        cell = row.children[j];

        if (cell.old) {
          var y = $rdf.fromNT(row.dataValueNT);
          var x = $rdf.fromNT(columns[j - 1]);
          setCell(cell, x, y, null);
        } else {
          rowsUsed[row.dataValueNT] = true;
          colsUsed[j] = true;
        }
      }
    }

    for (var _i = 0; _i < matrix.children.length; _i++) {
      row = matrix.children[_i];

      if (_i > 0 && !rowsUsed[row.dataValueNT]) {
        delete rows[row.dataValueNT];
        matrix.removeChild(row);
      } else {
        for (var _j = row.children.length - 1; _j > 0; _j--) {
          // backwards
          var _cell = row.children[_j];

          if (!colsUsed[_j]) {
            row.removeChild(_cell);
          }
        }
      }
    }

    var newcolumns = [];

    for (var _j2 = 0; _j2 < columns.length; _j2++) {
      if (colsUsed[_j2 + 1]) {
        newcolumns.push(columns[_j2]);
      }
    }

    columns = newcolumns;
  };

  matrix.refresh = function () {
    markOldCells();
    kb.query(query, addCellFromBindings, undefined, clearOldCells);
  };

  var addCellFromBindings = function addCellFromBindings(bindings) {
    var x = bindings[vx.toString()];
    var y = bindings[vy.toString()];
    var value = bindings[vvalue.toString()];
    var row = rowFor(y);
    var colNo = columnNumberFor(x);
    var cell = row.children[colNo + 1]; // number of Y axis headings

    setCell(cell, x, y, value);
  };

  if (options.set_y) {
    // Knows y values create rows
    for (var k = 0; k < options.set_y.length; k++) {
      rowFor(options.set_y[k]);
    }
  }

  if (options.set_x) {
    for (var _k2 = 0; _k2 < options.set_x.length; _k2++) {
      columnNumberFor(options.set_x[_k2]);
    }
  }

  kb.query(query, addCellFromBindings, undefined, whenDone); // Populate the matrix

  return matrix;
}
//# sourceMappingURL=matrix.js.map