"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.field = void 0;
exports.fieldFunction = fieldFunction;
exports.mostSpecificClassURI = mostSpecificClassURI;

var _logic = require("../../logic");

var _log = require("../../log");

var _error = require("../error");

var store = _logic.solidLogicSingleton.store;
var field = {}; // Form field functions by URI of field type.

/**
 * Which class of field is this? Relies on http://www.w3.org/2000/01/rdf-schema#subClassOf and
 * https://linkeddata.github.io/rdflib.js/doc/classes/formula.html#bottomtypeuris
 * to find the most specific RDF type if there are multiple.
 *
 * @param x a form field, e.g. `namedNode('https://timbl.com/timbl/Public/Test/Forms/individualForm.ttl#fullNameField')`
 * @returns the URI of the most specific known class, e.g. `http://www.w3.org/ns/ui#SingleLineTextField`
 */

exports.field = field;

function mostSpecificClassURI(x) {
  var kb = store;
  var ft = kb.findTypeURIs(x);
  var bot = kb.bottomTypeURIs(ft); // most specific

  var bots = [];

  for (var b in bot) {
    bots.push(b);
  } // if (bots.length > 1) throw "Didn't expect "+x+" to have multiple bottom types: "+bots


  return bots[0];
}
/**
 * Returns a function that creates a form widget
 * @param dom unused
 * @param fieldInQuestion the field for which to create a form, e.g. namedNode('https://timbl.com/timbl/Public/Test/Forms/individualForm.ttl#fullNameField')
 */


function fieldFunction(dom, fieldInQuestion) {
  var uri = mostSpecificClassURI(fieldInQuestion); // What type
  // const uri = field.uri

  var fun = field[uri];
  (0, _log.debug)('paneUtils: Going to implement field ' + fieldInQuestion + ' of type ' + uri);

  if (!fun) {
    return function (dom2, container) {
      var box = (0, _error.errorMessageBlock)(dom2, 'No handler for field ' + fieldInQuestion + ' of type ' + uri);
      if (container) container.appendChild(box);
      return box;
    };
  }

  return fun;
}
//# sourceMappingURL=fieldFunction.js.map