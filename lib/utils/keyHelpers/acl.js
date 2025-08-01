"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keyContainerAclBody = exports.keyAclBody = void 0;
exports.setAcl = setAcl;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var debug = _interopRequireWildcard(require("../../debug"));
var _solidLogic = require("solid-logic");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
/**
 * set ACL
 * @param keyDoc
 * @param aclBody
 */
function setAcl(_x, _x2) {
  return _setAcl.apply(this, arguments);
}
/**
 * key container ACL
 * @param me
 * @returns aclBody
 */
function _setAcl() {
  _setAcl = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(keyDoc, aclBody) {
    var keyAclDoc, _err$response, _t;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 1;
          return _solidLogic.store.fetcher.load(keyDoc);
        case 1:
          // FIXME: check the Why value on this quad:
          // debug.log(store.statementsMatching(store.sym(keyDoc), store.sym('http://www.iana.org/assignments/link-relations/acl')))
          keyAclDoc = _solidLogic.store.any(_solidLogic.store.sym(keyDoc), _solidLogic.store.sym('http://www.iana.org/assignments/link-relations/acl'));
          if (keyAclDoc) {
            _context.next = 2;
            break;
          }
          throw new Error('Key ACL doc not found!');
        case 2:
          _context.prev = 2;
          _context.next = 3;
          return _solidLogic.store.fetcher.webOperation('PUT', keyAclDoc.value, {
            data: aclBody,
            contentType: 'text/turtle'
          });
        case 3:
          _context.next = 6;
          break;
        case 4:
          _context.prev = 4;
          _t = _context["catch"](2);
          if (!((_t === null || _t === void 0 ? void 0 : (_err$response = _t.response) === null || _err$response === void 0 ? void 0 : _err$response.status) !== 404)) {
            _context.next = 5;
            break;
          }
          throw new Error(_t);
        case 5:
          debug.log('delete ' + keyAclDoc.value + ' ' + _t.response.status); // should test 404 and 2xx
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 4]]);
  }));
  return _setAcl.apply(this, arguments);
}
var keyContainerAclBody = exports.keyContainerAclBody = function keyContainerAclBody(me) {
  var aclBody = "\n@prefix : <#>.\n@prefix acl: <http://www.w3.org/ns/auth/acl#>.\n@prefix foaf: <http://xmlns.com/foaf/0.1/>.\n@prefix key: <./>.\n\n:ReadWrite\n    a acl:Authorization;\n    acl:accessTo key:;\n    acl:default key:;\n    acl:agent <".concat(me, ">;\n    acl:mode acl:Read, acl:Write.\n");
  return aclBody;
};

/**
 * Read only ACL
 * @param keyDoc
 * @param me
 * @returns aclBody
 */
var keyAclBody = exports.keyAclBody = function keyAclBody(keyDoc, me) {
  var keyAgent = 'acl:agentClass foaf:Agent'; // publicKey
  if (me !== null && me !== void 0 && me.length) keyAgent = "acl:agent <".concat(me, ">"); // privateKey
  var aclBody = "\n@prefix foaf: <http://xmlns.com/foaf/0.1/>.\n@prefix acl: <http://www.w3.org/ns/auth/acl#>.\n<#Read>\n    a acl:Authorization;\n    ".concat(keyAgent, ";\n    acl:accessTo <").concat(keyDoc.split('/').pop(), ">;\n    acl:mode acl:Read.\n");
  return aclBody;
};
//# sourceMappingURL=acl.js.map