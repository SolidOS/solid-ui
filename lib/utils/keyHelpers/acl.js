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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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
  _setAcl = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(keyDoc, aclBody) {
    var keyAclDoc, _err$response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _solidLogic.store.fetcher.load(keyDoc);
        case 2:
          // FIXME: check the Why value on this quad:
          // debug.log(store.statementsMatching(store.sym(keyDoc), store.sym('http://www.iana.org/assignments/link-relations/acl')))
          keyAclDoc = _solidLogic.store.any(_solidLogic.store.sym(keyDoc), _solidLogic.store.sym('http://www.iana.org/assignments/link-relations/acl'));
          if (keyAclDoc) {
            _context.next = 5;
            break;
          }
          throw new Error('Key ACL doc not found!');
        case 5:
          _context.prev = 5;
          _context.next = 8;
          return _solidLogic.store.fetcher.webOperation('PUT', keyAclDoc.value, {
            data: aclBody,
            contentType: 'text/turtle'
          });
        case 8:
          _context.next = 15;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](5);
          if (!((_context.t0 === null || _context.t0 === void 0 ? void 0 : (_err$response = _context.t0.response) === null || _err$response === void 0 ? void 0 : _err$response.status) !== 404)) {
            _context.next = 14;
            break;
          }
          throw new Error(_context.t0);
        case 14:
          debug.log('delete ' + keyAclDoc.value + ' ' + _context.t0.response.status); // should test 404 and 2xx
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[5, 10]]);
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