import * as testAuthn from "../src/authn/authn";

const mockAppContext = {
    viewingNoAuthPage: true,
    webId: "https://timea-test.solidcommunity.net/profile/card#me"
}

describe('logIn', () => {
    afterAll(() => {
        jest.restoreAllMocks()
    })
    it('exists', () => {
      expect(testAuthn.logIn).toBeInstanceOf(Function)
    })
    it('runs', () => {
      expect(testAuthn.logIn({})).toBeInstanceOf(Object)
    })
    it('user logged in already, through appContext', async () => {
       jest.spyOn(testAuthn, 'appContext').mockReturnValue(mockAppContext)
       const call = await testAuthn.logIn({})
       expect(call).toBeInstanceOf(Object)
       console.log(call)
       expect(testAuthn.appContext).toHaveBeenCalledTimes(1);
        
    })
  })