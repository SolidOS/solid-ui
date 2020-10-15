import {
  Session,
  getClientAuthenticationWithDependencies
} from '@inrupt/solid-client-authn-browser'

let authSession
if (!window.authSession) {
  authSession = new Session(
    {
      clientAuthentication: getClientAuthenticationWithDependencies({})
    },
    'mySession'
  )
  window.authSession = authSession
} else {
  authSession = window.authSession
}

export default authSession
