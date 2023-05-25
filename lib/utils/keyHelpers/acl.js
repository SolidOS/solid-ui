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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
          debug.log(_solidLogic.store.statementsMatching(_solidLogic.store.sym(keyDoc), _solidLogic.store.sym('http://www.iana.org/assignments/link-relations/acl')));
          keyAclDoc = _solidLogic.store.any(_solidLogic.store.sym(keyDoc), _solidLogic.store.sym('http://www.iana.org/assignments/link-relations/acl'));
          if (keyAclDoc) {
            _context.next = 6;
            break;
          }
          throw new Error('Key ACL doc not found!');
        case 6:
          _context.prev = 6;
          _context.next = 9;
          return _solidLogic.store.fetcher.webOperation('PUT', keyAclDoc.value, {
            data: aclBody,
            contentType: 'text/turtle'
          });
        case 9:
          _context.next = 16;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](6);
          if (!((_context.t0 === null || _context.t0 === void 0 ? void 0 : (_err$response = _context.t0.response) === null || _err$response === void 0 ? void 0 : _err$response.status) !== 404)) {
            _context.next = 15;
            break;
          }
          throw new Error(_context.t0);
        case 15:
          debug.log('delete ' + keyAclDoc.value + ' ' + _context.t0.response.status); // should test 404 and 2xx
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[6, 11]]);
  }));
  return _setAcl.apply(this, arguments);
}
var keyContainerAclBody = function keyContainerAclBody(me) {
  var aclBody = "\n@prefix : <#>.\n@prefix acl: <http://www.w3.org/ns/auth/acl#>.\n@prefix foaf: <http://xmlns.com/foaf/0.1/>.\n@prefix key: <./>.\n\n:ReadWrite\n    a acl:Authorization;\n    acl:accessTo key:;\n    acl:default key:;\n    acl:agent <".concat(me, ">;\n    acl:mode acl:Read, acl:Write.\n");
  return aclBody;
};

/**
 * Read only ACL
 * @param keyDoc
 * @param me
 * @returns aclBody
 */
exports.keyContainerAclBody = keyContainerAclBody;
var keyAclBody = function keyAclBody(keyDoc, me) {
  var keyAgent = 'acl:agentClass foaf:Agent'; // publicKey
  if (me !== null && me !== void 0 && me.length) keyAgent = "acl:agent <".concat(me, ">"); // privateKey
  var aclBody = "\n@prefix foaf: <http://xmlns.com/foaf/0.1/>.\n@prefix acl: <http://www.w3.org/ns/auth/acl#>.\n<#Read>\n    a acl:Authorization;\n    ".concat(keyAgent, ";\n    acl:accessTo <").concat(keyDoc.split('/').pop(), ">;\n    acl:mode acl:Read.\n");
  return aclBody;
};
exports.keyAclBody = keyAclBody;
//# sourceMappingURL=acl.js.map