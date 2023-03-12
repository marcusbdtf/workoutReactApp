import * as msal from "@azure/msal-browser";

export default class AuthService {
  constructor() {
    const config = {
      auth: {
        clientId: "e361266f-0540-4d57-bb2f-688d0d8b4953",
        authority: `https://login.microsoftonline.com/5b679921-53f7-4642-a251-8a603608d21c`
      },
    };

    this.myMsal = new msal.PublicClientApplication(config);
    this.request = {
      scopes: ['user.read'],
    };

    this.idToken = "";
    this.accessToken = "";
  }

  login = async () => {
    try {
      const response = await this.myMsal.loginPopup(this.request);
      this.idToken = response.idToken;
      this.accessToken = response.accessToken;
    } catch (error) {
      console.log(error);
    }
  };

  logout = async () => {
    await this.myMsal.logout();
  };

  getToken = async () => {
    try {
      const accounts = this.myMsal.getAllAccounts();

      if (accounts.length === 0) throw new Error("login_required");

      const silentRequest = {
        scopes: this.request.scopes,
        account: accounts[0],
      };

      const authResult = await this.myMsal.acquireTokenSilent(silentRequest);

      return authResult.accessToken;
    } catch (error) {
      if (error instanceof msal.InteractionRequiredAuthError) {
        const interactiveRequest = {
          scopes: this.request.scopes,
        };

        const authResult = await this.myMsal.acquireTokenPopup(interactiveRequest);

        return authResult.accessToken;
      } else {
        console.log(error);
        throw error;
      }
    }
  };

  getMsalInstance = () => {
    return this.myMsal;
  };
}
