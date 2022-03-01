'use strict';
/**
 * Provides a simple configuration object for Solid web client and other
 * modules.
 * @module config-default
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  // @@ should not use export default

  /**
   * Primary authentication endpoint
   */
  authEndpoint: '',

  /**
   * Fallback authentication endpoint
   */
  fallbackAuthEndpoint: 'https://databox.me/',

  /**
   * Default signup endpoints (list of identity providers)
   */
  signupEndpoint: 'https://solidproject.org/use-solid/',

  /**
   * Default height of the Signup popup window, in pixels
   */
  signupWindowHeight: 600,

  /**
   * Default width of the Signup popup window, in pixels
   */
  signupWindowWidth: 1024,

  /**
   * Path to the client private key (only needed when running within node)
   */
  key: '',

  /**
   * Path to the client certificate (only needed when running within node)
   */
  cert: ''
};
exports["default"] = _default;
//# sourceMappingURL=config-default.js.map