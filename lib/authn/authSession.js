"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _solidClientAuthnBrowser = require("@inrupt/solid-client-authn-browser");

var authSession; // @ts-ignore

if (!window.authSession) {
  authSession = new _solidClientAuthnBrowser.Session({
    clientAuthentication: (0, _solidClientAuthnBrowser.getClientAuthenticationWithDependencies)({})
  }, 'mySession'); // @ts-ignore

  window.authSession = authSession;
} else {
  // @ts-ignore
  authSession = window.authSession;
}

var _default = authSession;
exports["default"] = _default;
//# sourceMappingURL=authSession.js.map